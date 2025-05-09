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
    const productRef = doc(db, "products", productId); // Referens till dokumentet

    try {
        await updateDoc(productRef, newInfo); //Obs objekt!!!
        console.log("Dokument uppdaterat!");
    } catch (e) {
        console.error("Fel vid uppdatering av dokument: ", e);
    }
}

async function sendMessage(draft, name, setMessages) {
    try {
        const messagesCollection = collection(db, "messages"); // Referera till "messages"-collectionen

        // Skapa ett nytt dokument i "messages"-collectionen
        const messageObject = {
            text: draft, // Innehållet i meddelandet
            timestamp: Date.now(), // Tidsstämpel för när meddelandet skickades
            sender: name,
            receiver: "random",
        };
        const newMessageRef = await addDoc(messagesCollection, messageObject);

        console.log("Meddelande skickat med ID: ", newMessageRef.id);
        getMessages(setMessages);
        return newMessageRef; // Returnera referensen till det nya dokumentet
    } catch (error) {
        console.error("Fel vid skickande av meddelande: ", error);
        throw error; // Kasta felet vidare för att hantera det högre upp i anropsstacken
    }
}

export { getProducts, getCategories, editProduct };
