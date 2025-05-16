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

async function deleteProduct(productId, setProductList) {
    const productRef = doc(db, "products", productId);

    await deleteDoc(productRef);

    console.log(`Dokumentet med ID ${productId} har tagits bort.`);
    getProducts(setProductList);
}

async function addNewCategory(newCategory) {
    try {
        const categoryCollection = collection(db, "categories");

        const newCategoryRef = await addDoc(categoryCollection, newCategory);

        console.log("Ketegori uppladdad med ID: ", newCategoryRef.id);
    } catch (error) {
        console.error("Fel vid uppladdninging ", error);
        throw error;
    }
}

export { getProducts, getCategories, editProduct, addNewProduct, deleteProduct, addNewCategory };
