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

const useAdminStore = create((set) => ({
    isAdmin: false,
    isEditing: false,

    setIsAdmin: () => set((state) => ({ isAdmin: !state.isAdmin })),
}))

const useCartStore = create((set) => ({
    cart: [],

    addCartItem: (item) =>
        set((state) => ({
            cart: [...state.cart, item]
        })),
    plusQuantity: (id) =>
        set((state) => {
            const index = state.cart.findIndex((item) => item.id === id);
            if (index !== -1) {
                state.cart[index].quantity++;
                return { cart: [...state.cart] };
            } else {
                return { cart: [...state.cart, { id, quantity: 1 }] };
            }
        }),
    emptyCart: () => set({ cart: [] }),


}));

export { useProductsStore, useAdminStore, useCartStore };
