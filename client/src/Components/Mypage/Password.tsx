import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Password = () => {
  const [password, setPassword] = useState("");
  const [passwordRe, setPasswordRe] = useState("");
  const history = useHistory();
  const URL = process.env.REACT_APP_API_URL;

  const handleChangePassword = () => {

  }

  return (
    <>
      <h2>Change Password</h2>
      <form action="" method="POST">
        <label>
          <input type="text" name="changePassword" placeholder="기존 비밀번호"/>
        </label>
        <label>
          <input type="text" name="changePassword" placeholder="새 비밀번호"/>
        </label>
        <label>
          <input type="text" name="same-changePassword" placeholder="새 비밀번호 확인"/>
        </label>
        <button onClick={handleChangePassword}>비밀번호 변경</button>
      </form>
    </>
  )
};

export default Password;
