import { create } from "zustand";

const useProductsStore = create((set) => ({
    productList: [],

    setProductList: (list) =>
        set((state) => ({
            productList: list,
        })),
}));

export { useProductsStore };
