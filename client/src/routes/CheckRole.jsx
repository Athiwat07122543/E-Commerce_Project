import React, { useEffect, useState } from "react";
import useStore from "../store/useStore";
import { checkRole } from "../api/Auth";
import { useNavigate } from "react-router";
import LayoutAdmin from "../layouts/LayoutAdmin";

const CheckRole = () => {
  const navigate = useNavigate();
  const token = useStore((state) => state.token);
  const [isAdmin, setIsAdmin] = useState(true);
  const [time, setTime] = useState(3);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await checkRole(token);
        if(!res.data.payload || res.data.payload == null){
          return;
        }
        if (res.data.payload.role !== "admin") {
          setIsAdmin(false);
        }
      } catch (err) {
        console.log(err);
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, []);

  useEffect(() => {
    if (isAdmin) return;
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isAdmin]);

  useEffect(() => {
    if (time === 0 && !isAdmin) {
      navigate("/");
    }
  }, [time]);

  if (!isAdmin) {
    return <div>กำลังไปเส้นทางที่ถูกต้อง {time}</div>;
  }

  return <LayoutAdmin />;
};

export default CheckRole;
