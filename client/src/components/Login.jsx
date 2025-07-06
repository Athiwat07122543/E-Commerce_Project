import React, { use, useEffect, useState } from "react";
import "../index.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useStore from "../store/useStore";

const Login = () => {
  const navigate = useNavigate();
  const login = useStore((state) => state.actionLogin);
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(data);
      if (res.status == 400) {
        return toast.warning(res.data.message);
      }

      if (res.status == 401) {
        return toast.warning(res.data.message);
      }

      if (res.status == 200) {
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
    <div className="bg-gray-100 h-screen w-full flex justify-center">
      <form
        onSubmit={submitLogin}
        className="mt-20 text-center bg-white w-[400px] h-[260px] py-6 space-y-2 shadow-2xl rounded-2xl"
      >
        <p className="text-xl">Username</p>
        <input
          className="border border-gray-200 shadow-md h-[40px] px-2 rounded-md"
          onChange={(e) => setData({ ...data, username: e.target.value })}
        ></input>
        <p className="text-xl">Password</p>
        <input
          type="password"
          className="border border-gray-200 shadow-md h-[40px] px-2 rounded-md"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        ></input>
        <p>
          <button
            className="border p-2 shadow-md border-gray-100 hover:cursor-pointer hover:bg-gray-200 mt-2 rounded-md"
            type="submit"
          >
            เข้าสู่ระบบ
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
