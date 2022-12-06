import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import {
    getFirestore,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    enableIndexedDbPersistence
} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCoL_4r-ocOVfRcIuLVkKUmTJmPCfjTYUg",
    authDomain: "plant-app-22072.firebaseapp.com",
    projectId: "plant-app-22072",
    storageBucket: "plant-app-22072.appspot.com",
    messagingSenderId: "1087568887121",
    appId: "1:1087568887121:web:e71627ff1088e07ffda770",
    measurementId: "G-S2DPME61MB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function getPlants(db) {
    const plantsCol = collection(db, "plants");
    const plantsnapshot = await getDocs(plantsCol);
    const plantList = plantsnapshot.docs.map((doc) => doc);
    return plantList;
}

    enableIndexedDbPersistence(db)
    .catch((err) => {
        if (err.code == 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
            console.log("Persistence failed.")
        } else if (err.code == 'unimplemented') {
            // The current browser does not support all of the
            // features required to enable persistence
            console.log("Persistence is not valid.")
        }
    });
// Subsequent queries will use persistence, if it was enabled successfully


const unsub = onSnapshot(collection(db, "plants"), (doc) => {
  //   console.log(doc.docChanges());
    doc.docChanges().forEach((change) => {
    // console.log(change, change.doc.data(), change.doc.id);
    if (change.type === "added") {
      //Call render function in UI
        renderPlant(change.doc.data(), change.doc.id);
    }
    if (change.type === "removed") {
        removePlant(change.doc.id);
    }
    });
});

//add new plant
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    addDoc(collection(db, "plants"), {
    title: form.title.value,
    description: form.description.value,
    }).catch((error) => console.log(error));
    form.title.value = "";
    form.description.value = "";
});

//delete plant
const plantContainer = document.querySelector(".plants");
plantContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "I") {
    const id = event.target.getAttribute("data-id");
    deleteDoc(doc(db, "plants", id));
    }
});

// //listen for auth status changes
// onAuthStateChanged(auth, (user) => {
//     if(user) {
//         console.log("User logged in: ", user.email);
//         getPlants(db).then((snapshot) => {
//             setupPlants(snapshot);
//         });
//         setupUI(user);
//         const form = document.querySelector("form");
//         form.addEventListener('submit', (event)=>{
//             event.preventDefault();

//                 addDoc(collection(db, "plants"), {
//                 title: form.title.value,
//                 description: form.description.value,
//                 }).catch((error) => console.log(error));
//                 form.title.value = "";
//                 form.description.value = "";
//             });
//     } else {
//         console.log("User logged out");
//         setupUI();
//         setupPlants([]);
//     }
// })