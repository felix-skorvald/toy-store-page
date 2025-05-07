import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    doc,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";
import { db } from "./database.js";

async function getProducts(setProductList) {
    const productCollection = collection(db, "products");
    const productSnapshot = await getDocs(productCollection);
    const productList = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    setProductList(productList);
    console.log(productList);
}

async function getCategories(setCategoryList) {
    const categoriesCollection = collection(db, "categories");
    const categoriesSnapshot = await getDocs(categoriesCollection);
    const categoryList = categoriesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    setCategoryList(categoryList);
    console.log(categoryList);
}

export { getProducts, getCategories };
