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

    toggleAdmin: () => set((state) => ({ isAdmin: !state.isAdmin })),
}))

const useCartStore = create((set) => ({
    cart: [],

    addCartItem: (item) =>
        set((state) => ({
            cart: [...state.cart, item]
        })),
    plusQuantity: (id) =>
        set((state) => ({
            cart: state.cart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            ),
        })),

    minusQuantity: (id) =>
        set((state) => {
            const updatedCart = state.cart
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: Math.max(0, item.quantity - 1) }
                        : item
                )
                .filter((item) => item.quantity > 0);
            return { cart: updatedCart };
        }),

    emptyCart: () => set({ cart: [] }),

    removeFromCart: (id) =>
        set((state) => ({
            cart: state.cart.filter((item) => item.id !== id),
        })),

}));

export { useProductsStore, useAdminStore, useCartStore };
