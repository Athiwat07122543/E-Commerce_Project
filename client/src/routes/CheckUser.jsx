import React, { useEffect, useState } from "react";
import useStore from "../store/useStore";
import { checkRole } from "../api/Auth";
import { useNavigate } from "react-router";
import Layout from "../layouts/Layout";

const CheckUser = () => {
  const navigate = useNavigate();
  const actionUpdateCart = useStore((state) => state.actionUpdateCart);
  const token = useStore((state) => state.token);
  const [isUser, setIsUser] = useState(null);
  const [time, setTime] = useState(3);

  useEffect(() => {
    const checkUser = async () => {
      if (!token) {
        setIsUser(false);
        return;
      }
      try {
        const res = await checkRole(token);
        if (!res.data.payload.enabled || res.data.payload.enabled == false) {
          setIsUser(false);
        } else {
          setIsUser(true);
        }
      } catch (err) {
        console.log(err);
        setIsUser(false);
      }
    };

    checkUser();
  }, []);

  useEffect(() => {
    if (isUser !== false) return;
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isUser]);

  useEffect(() => {
    if (time === 0 && !isUser) {
      navigate("/");
    }
  }, [time]);

  if (!isUser) {
    return <div>กำลังไปเส้นทางที่ถูกต้อง {time}</div>;
  }

  return <Layout />;
};

export default CheckUser;
