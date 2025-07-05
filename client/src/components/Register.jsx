import React, { useState } from "react";
import "../index.css";
import { toast } from "react-toastify";
import { register } from "../api/Auth";

const Register = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await register(data);
      if (!res.data.success) {
        if (res.data.error == "NO_USERNAME_INPUT") {
          return toast.warning(res.data.message);
        }
        if (res.data.error == "NO_PASSWORD_INPUT") {
          return toast.warning(res.data.message);
        }
        if (res.data.error == "NO_CONFIRMPASSWORD_INPUT") {
          return toast.warning(res.data.message);
        }
        if (res.data.error == "NO_EMAIL_INPUT") {
          return toast.warning(res.data.message);
        }
        if (res.data.error == "PASSWORD_NOT_MATCH") {
          return toast.warning(res.data.message);
        }
        if (res.data.error == "USERNAME_IS_ALREADY_EXIST") {
          return toast.warning(res.data.message);
        }
        if (res.data.error == "Email_IS_ALREADY_EXISTS") {
          return toast.warning(res.data.message);
        }
      }
      return toast.success("สมัครบัญชีสำเร็จ");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div>
        <form onSubmit={submitLogin}>
          <p>Username</p>
          <input
            className="border"
            onChange={(e) => setData({ ...data, username: e.target.value })}
          ></input>
          <p>Password</p>
          <input
            type="password"
            className="border"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          ></input>
          <p>Confirm password</p>
          <input
            type="password"
            className="border"
            onChange={(e) =>
              setData({ ...data, confirmPassword: e.target.value })
            }
          ></input>
          <p>Email</p>
          <input
            className="border"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          ></input>
          <p>
            <button className="border" type="submit">
              เข้าสู่ระบบ
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
