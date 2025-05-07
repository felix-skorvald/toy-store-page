import { create } from "zustand";

const useProductsStore = create((set) => ({
    productList: [],
    categoryList: [],

    setProductList: (list) =>
        set((state) => ({
            productList: list,
        })),

    setCategoryList: (list) =>
        set((state) => ({
            categoryList: list,
        })),
}));

export { useProductsStore };
