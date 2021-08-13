import { Request, Response, RequestHandler } from "express";
import { User } from "../../entity/User";
import { UserInfo } from "../../@type/tokenUserInfo";
import { checkPassword } from "../../utils/validate";
import hash from "../../utils/hash";

const updatePassword: RequestHandler = async (req: Request, res: Response) => {
  const { userId }: { userId: number } = req.userInfo as UserInfo;
  const { password, newPassword } = req.body;

  try {
    //* 파라미터 검사
    if (!password) {
      return res.status(400).json({ message: "Invalid password(body)" });
    }
    if (!newPassword || !checkPassword(newPassword)) {
      return res.status(400).json({ message: "Invalid newPassword(body)" });
    }

    const hashedPassword: string = hash(password);
    
    //* 유저 조회
    const userInfo: User | undefined = await User.findOne(userId);

    if (!userInfo) {
      return res.status(404).json({ message: "User not found" });
    }

    //* (1) 이메일 가입 or 통합 유저 (기존 비밀번호 존재)
    if (userInfo.signUpType === "email" || userInfo.signUpType === "intergration") {
      if (userInfo.password !== hashedPassword) {
        return res.status(403).json({ message: "Incorrect password" });
      }

      const hashedNewPassword = hash(newPassword);
      if (userInfo.password === hashedNewPassword) {
        return res.status(409).json({ message: "Same password" });
      }
      // 비밀번호 변경
      userInfo.password = hashedNewPassword;
      await userInfo.save();
    }
    //* (2) 소셜 로그인으로 가입하고 아직 비빌번호를 바꾸지 않은 유저
    else {
      //? 기존 빈 문자열 패스워드 검사 필요
      const hashedNewPassword: string = hash(newPassword);
      userInfo.password = hashedNewPassword;
      userInfo.signUpType = "intergration";
      // 비밀번호 변경 -> 일반 로그인 사용 가능
      await userInfo.save();
    }

    return res.status(200).json({ message: "User password successfully updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update password" });
  }
};

export default updatePassword;
