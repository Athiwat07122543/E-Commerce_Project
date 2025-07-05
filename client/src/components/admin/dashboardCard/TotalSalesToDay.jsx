import React, { useEffect, useState } from 'react'
import useStore from "../../../store/useStore";
import { getTotalSalesToDay } from "../../../api/Admin";

const TotalSalesToDay = () => {
  const token = useStore((state)=>state.token)
  const [orders,setOrders] = useState(null)

  const getData = async()=>{
    try{
      const res = await getTotalSalesToDay(token)
      setOrders(res.data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <div>
      <div className="py-4 text-center font-bold text-4xl">
        รายการสั่งซื้อวันนี้
      </div>
      {orders &&
        (orders ? (
          <div className="font-bold text-6xl text-green-500 text-center">{orders}</div>
        ) : (
          <div className="font-bold text-6xl text-green-500 text-center">ไม่มีข้อมูล</div>
        ))}
    </div>
  )
}

export default TotalSalesToDay