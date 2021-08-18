import { Request, Response, RequestHandler, NextFunction } from "express";
import { BubbleComment } from "../../entity/BubbleComment";
import { UserInfo } from "../../@type/userInfo";
import { logError } from "../../utils/log";

const deleteBubbleComment: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	const { userId, accountType }: { userId: number; accountType: string } = req.userInfo as UserInfo;
	const commentId: number | string = req.body;
	const bubbleId: string = req.params.id as string;

	try {
		//* 파라미터 검사
		if (isNaN(Number(bubbleId))) {
			return res.status(400).json({ message: `Invalid bubbleId(param), input 'bubbleId': ${bubbleId}` });
		}
		
		if (!commentId) {
			return res.status(400).json({ message: `Invalid commentId(body), input 'commentId': ${commentId}` });
		}

		//* 댓글 조회. 존재하는 댓글인지 확인
		const commentInfo: BubbleComment | undefined = await BubbleComment.findOne({
			where: {
				id: commentId,
				bubbleId: bubbleId,
			},
		});

		if (!commentInfo) {
			return res.status(404).json({ message: "Comment not found" });
		}

		//* 댓글 삭제
		// 관리자 권한 -> 모든 댓글 삭제 가능
		if (accountType === "admin") {
			await commentInfo.remove();
		}
		// 일반 유저 -> 본인이 작성한 버블만 삭제 가능
		else {
			if (commentInfo.userId !== userId) {
				return res.status(403).json({ message: "Not authorized" });
			} else {
				await commentInfo.remove();
			}
		}

		//* 갱신된 댓글 목록 조회
		const comments: BubbleComment[] = await BubbleComment.findComments(Number(bubbleId));

		res.json({ data: { comments }, message: "Comment successfully deleted" });
	} catch (err) {
		logError("Failed to delete comment");
		next(err);
	}
};

export default deleteBubbleComment;
