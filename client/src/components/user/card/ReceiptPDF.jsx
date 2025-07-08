import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

const ReceiptPDF = ({ getData, onClose }) => {
  const [detail, setDetail] = useState(null);
  const printRef = React.useRef(null);
  const setData = async () => {
    try {
      setDetail(getData);
      return;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setData();
  }, [getData]);

  const handleDownloadPDF = async () => {
    const element = printRef.current;
    if (!element) {
      return;
    }
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    const pdfBlob = pdf.output("blob");
    const blobUrl = URL.createObjectURL(pdfBlob);
    window.open(blobUrl, "_blank");
  };

  return (
    <div
      style={{ color: "#000" }}
      className="fixed inset-0 flex justify-center mt-4 mb-8 backdrop-blur-md z-50 rounded-2xl"
    >
      <div className="bg-white shadow-2xl w-[800px] rounded-2xl h-fit">
        <div className="flex justify-between items-center bg-sky-500 text-white px-4 py-2 font-semibold rounded-t-2xl">
          <span>เพิ่มสินค้า</span>
          <button onClick={onClose} className="hover:cursor-pointer">
            X
          </button>
        </div>
        <div className="py-4 px-8" ref={printRef}>
          {detail ? (
            <div>
              <div className="font-bold text-4xl">ใบเสร็จ</div>
              <div className="text-xl mt-2">{detail.createdAt}</div>
              <div className="mt-4">
                <div className="font-bold text-xl">ข้อมูลที่จัดส่งสินค้า</div>
                <div>ชื่อ: {detail.address.recipientName} </div>
                <div>เบอร์โทรศัพท์: {detail.address.phone}</div>
                <div>ที่อยู่จัดส่ง</div>
                <label>{detail.address.addressDetail}</label>
              </div>
              <div className="mt-4">
                <table className="table-auto px-2 p-2 w-full ">
                  <thead className="">
                    <tr className="bg-sky-500 h-[50px]">
                      <th className="text-white border border-gray-400">
                        ลำดับ
                      </th>
                      <th className="text-white border border-gray-400">
                        รายการ
                      </th>
                      <th className="text-white border border-gray-400">
                        จำนวน
                      </th>
                      <th className="text-white border border-gray-400">
                        ราคา
                      </th>
                      <th className="text-white border border-gray-400">
                        จำนวนเงิน
                      </th>
                    </tr>
                  </thead>
                  <tbody className="mt-2">
                    {detail.orderDetails.length > 0 ? (
                      detail.orderDetails.map((item, index) => (
                        <tr className="h-[40px]" key={index}>
                          <td className="text-center border border-gray-400">
                            {index + 1}
                          </td>
                          <td className="border border-gray-400 px-2">
                            {item.product.name}
                          </td>
                          <td className="text-center border border-gray-400">
                            {item.quantity}
                          </td>
                          <td className="text-center border border-gray-400">
                            {item.price}
                          </td>
                          <td className="text-center border border-gray-400">
                            {item.quantity * item.price}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center p-4 text-gray-500"
                        >
                          ไม่พบรายละเอียดการสั่งซื้อ
                        </td>
                      </tr>
                    )}

                    <tr className="h-[40px]">
                      <td colSpan="4" className="text-right font-bold text-xl">
                        ราคารวม
                      </td>
                      <td colSpan="1" className="text-center font-bold text-xl">
                        {detail.totalPrice}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>ไม่พบข้อมูล</div>
          )}
        </div>
        <div className="flex justify-center mb-4">
          <button
            className="flex justify-center hover:cursor-pointer hover:bg-sky-600 items-center text-center mb-4 font-bold text-4xl  bg-sky-500 w-fit p-2 text-white h-fit "
            onClick={handleDownloadPDF}
          >
            ดาวน์โหลดใบเสร็จ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPDF;
