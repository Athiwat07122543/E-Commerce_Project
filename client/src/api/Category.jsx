import axios from "axios";

export const addCategory = async (token, data) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/createcategory",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const listCategory = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/getcategory");
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const editCategory = async (token,id, data) => {
  try {
    const res = await axios.put(
      "http://localhost:3000/api/editcategory/" + id,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const deleteCategory = async (token,id) => {
  try {
    const res = await axios.delete(
      "http://localhost:3000/api/deletecategory/" + id,
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
  }
};
