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
}

async function getCategories(setCategoryList) {
    const categoriesCollection = collection(db, "categories");
    const categoriesSnapshot = await getDocs(categoriesCollection);
    const categoryList = categoriesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    setCategoryList(categoryList);
}

async function editProduct(productId, newInfo) {
    const productRef = doc(db, "products", productId);

    try {
        await updateDoc(productRef, newInfo); //Obs objekt!!!
        console.log("Dokument uppdaterat!");
    } catch (e) {
        console.error("Fel vid uppdatering av dokument: ", e);
    }
}

async function addNewProduct(newProduct) {
    try {
        const productCollection = collection(db, "products");

        const newProductRef = await addDoc(productCollection, newProduct);

        console.log("Produkt uppladdad med ID: ", newProductRef.id);
    } catch (error) {
        console.error("Fel vid uppladdninging ", error);
        throw error;
    }
}

async function deleteMessage(messageId, setMessages) {
    // Skapa referens till dokumentet som ska tas bort
    const messageDocRef = doc(db, "messages", messageId);

    // Ta bort dokumentet
    await deleteDoc(messageDocRef);

    console.log(`Dokumentet med ID ${messageId} har tagits bort.`);

    getMessages(setMessages);
}

export { getProducts, getCategories, editProduct, addNewProduct };
