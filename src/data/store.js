import { create } from "zustand";

const useProductsStore = create((set) => ({
    productList: [],
    categoryList: [],
    productsToRender: [],

    setProductList: (list) =>
        set((state) => ({
            productList: list,
        })),

    setCategoryList: (list) =>
        set((state) => ({
            categoryList: list,
        })),

    setProductsToRender: (list) =>
        set((state) => ({
            productsToRender: list,
        })),
}));

export { useProductsStore };
