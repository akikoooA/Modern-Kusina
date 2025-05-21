// Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyASHJfEJF_vJGkYaPUAjqJu4hj2DAdMOr0",
  authDomain: "modern-kusina.firebaseapp.com",
  projectId: "modern-kusina",
  storageBucket: "modern-kusina.firebasestorage.app",
  messagingSenderId: "387721623993",
  appId: "1:387721623993:web:a1ced7169342e2c4c9de68",
  measurementId: "G-4KXQ17T3WX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Submit comment
window.postComment = async function () {
  const commentText = document.getElementById("commentInput").value.trim();
  if (!commentText) return alert("Comment can't be empty.");

  await addDoc(collection(db, "commentSection"), {
    text: commentText,
    timestamp: new Date()
  });

  document.getElementById("commentInput").value = "";
};

// Display comments
const commentsContainer = document.getElementById("commentsContainer");
const q = query(collection(db, "commentSection"), orderBy("timestamp", "desc"));

onSnapshot(q, (snapshot) => {
  commentsContainer.innerHTML = "";
  snapshot.forEach((doc) => {
    const data = doc.data();
    const p = document.createElement("p");
    p.textContent = data.text;
    commentsContainer.appendChild(p);
  });
});
