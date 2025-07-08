import { create } from "zustand";
import { login } from "../api/Auth";
import { persist, createJSONStorage } from "zustand/middleware";
import { listProduct, filters } from "../api/Product";
import { listCategory } from "../api/Category";
import {
  addCart,
  clearCart,
  getCart,
  reduceCart,
  updateStock,
} from "../api/User";


const useStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      products: null,
      categorys: null,
      cart: [],
      actionLogin: async (data) => {
        try {
          const res = await login(data);
          if (res?.data?.user) {
            const token = get().token;
            set({
              user: res.data.user.username,
              token: res.data.user.token,
            });
            await get().actionUpdateCart();
            return res;
          } else if (!res?.data?.success) {
            return res;
          }
        } catch (err) {
          console.log(err);
        }
      },
      actionLogout: (async) => {

        try {
          set({
            user: null,
            token: null,
            cart: null,
          });
        } catch (err) {
          console.log(err);
        }
      },
      actionUpdateCart: async () => {
        try {
          const token = get().token;
          if (!token) {
            return;
          }
          const getListCart = await getCart(token);
          const listCart = getListCart?.data || [];
          set({
            cart: listCart.map((item) => ({
              id: item.productId,
              name: item.product.name,
              price: item.price,
              count: item.quantity,
              images: (item.product.images || []).map((img) =>
                typeof img === "string" ? { imageUrl: img } : img
              ),
            })),
          });
        } catch (err) {
          console.log(err);
        }
      },
      getProduct: async () => {
        try {
          const res = await listProduct();
          const productList = Array.isArray(res.data)
            ? res.data
            : res.data.data || [];
          set({ products: productList });
        } catch (err) {
          console.log(err);
        }
      },

      actionAfterPayment: async () => {
        const token = get().token;

        try {
          const result = await clearCart(token);

          set({
            cart: [],
          });
        } catch (err) {
          console.log(err);
        }
      },

      getCategory: async () => {
        try {
          const res = await listCategory();
          set({ categorys: res.data });
        } catch (err) {
          console.log(err);
        }
      },
      actionAddCart: async (formData) => {
        const token = get().token;
        addCart(token, formData.id);
        set((state) => {
          const checkID = state.cart.find((item) => item.id === formData.id);
          if (checkID) {
            return {
              cart: state.cart.map((item) =>
                item.id === formData.id
                  ? { ...item, count: item.count + 1 }
                  : item
              ),
            };
          } else {
            return {
              cart: [...state.cart, { ...formData, count: 1 }],
            };
          }
        });
      },
      actionRemoveCountCart: async (id) => {
        const token = get().token;
        await reduceCart(token, id);
        set((state) => {
          const updateCart = state.cart
            .map((item) => {
              if (item.id === id) {
                if (item.count > 1) {
                  return { ...item, count: item.count - 1 };
                } else {
                  return null;
                }
              }
              return item;
            })
            .filter(Boolean);
          return { cart: updateCart };
        });
      },

      actionAddCountCart: (id) => {
        try {
          set((state) => {
            const updateCart = state.cart.map((item) => {
              if (item.id === id) {
                return { ...item, count: item.count + 1 };
              }
              return item;
            });
            return { cart: updateCart };
          });
        } catch (err) {
          console.log(err);
        }
      },

      getTotalPrice: () => {
        const cart = get().cart;
        return cart.reduce((total, item) => total + item.price * item.count, 0);
      },
      getFilters: async (data) => {
        try {
          const res = await filters(data);
          set({ products: res.data });
        } catch (err) {
          console.log(err);
        }
      },
    }),
    {
      name: "ecommerce",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStore;
