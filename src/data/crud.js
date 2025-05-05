import {
    collection,
    getDocs,
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

export { getProducts };
