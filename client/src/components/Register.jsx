import React, { useState } from "react";
import "../index.css";
import { toast } from "react-toastify";
import { register } from "../api/Auth";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
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
      if (res.status == 400) {
        return toast.warning(res.data.message);
      }
      if (res.status == 200) {
        navigate("/login")
        return toast.success("สมัครบัญชีสำเร็จ");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-gray-100 h-screen w-full flex justify-center">
      <form
        onSubmit={submitLogin}
        className="mt-20 text-center bg-white w-[400px] h-[440px] py-6 space-y-2 shadow-2xl rounded-2xl"
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
        <p className="text-xl">Confirm password</p>
        <input
          type="password"
          className="border border-gray-200 shadow-md h-[40px] px-2 rounded-md"
          onChange={(e) =>
            setData({ ...data, confirmPassword: e.target.value })
          }
        ></input>
        <p className="text-xl">Email</p>
        <input
          className="border border-gray-200 shadow-md h-[40px] px-2 rounded-md"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        ></input>
        <p className="text-xl mt-2">
          <button
            className="border p-2 shadow-md border-gray-100 hover:cursor-pointer hover:bg-gray-200 rounded-md"
            type="submit"
          >
            สมัครสมาชิก
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
