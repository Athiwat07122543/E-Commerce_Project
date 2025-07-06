import axios from "axios";

export const addAddress = async (token, form) => {
  try {
    const res = await axios.post("http://localhost:3000/api/address", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};

export const getAddress = async (token) => {
  try {
    const res = await axios.get("http://localhost:3000/api/address", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};

export const changeAddressId = async (token, addressId) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/changeaddress",
      { addressId },
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

export const addCart = async (token, productId) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/addCart",
      { productId },
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

export const reduceCart = async (token, productId) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/reduceCart",
      { productId },
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

export const getCart = async (token) => {
  try {
    const res = await axios.get("http://localhost:3000/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};
export const updateStock = async (token) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/updatestock",
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

export const clearCart = async (token) => {
  try {
    const res = await axios.delete("http://localhost:3000/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};

export const getOrderBy = async (token) => {
  try {
    const res = await axios.get("http://localhost:3000/api/orderby", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};
