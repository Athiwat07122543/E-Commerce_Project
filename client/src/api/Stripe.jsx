import axios from "axios";

export const checkOut = async (token, data) => {
  try {
    const res = await axios.post("http://localhost:3000/api/checkout", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
};
