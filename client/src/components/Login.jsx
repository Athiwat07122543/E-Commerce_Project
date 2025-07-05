import React, { use, useEffect, useState } from "react";
import "../index.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useStore from "../store/useStore";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const login = useStore((state) => state.actionLogin);

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(data);
      if (!res?.data?.success) {
        if (res.data.error == "NO_USERNAME_INPUT") {
          return toast.warning(res.data.message);
        }
        if (res.data.error == "NO_PASSWORD_INPUT") {
          return toast.warning(res.data.message);
        }
        if (res.data.error == "NO_USERNAME") {
          return toast.warning(res.data.message);
        }
        if (res.data.error == "PASSWORD_NOT_MATCH") {
          return toast.warning(res.data.message);
        }
        if (res.data.error == "ENABLED_FALSE") {
          return toast.warning(res.data.message);
        }
      } else {
        if (res.data.user.role == "admin") {
          navigate("/admin");
          return toast.success("เข้าสู่ระบบสำเร็จ");
        } else {
          navigate("/user");
          return toast.success("เข้าสู่ระบบสำเร็จ");
        }
      }
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

export default Login;
