import axios from "axios";
export const login = async (data) => {
  try {
    const res = await axios.post("http://localhost:3000/api/login", data);
    return res;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};

export const register = async (data) => {
  try {
    const res = await axios.post("http://localhost:3000/api/register", data);
    return res;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};

export const checkRole = async (token) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/checkrole",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};
