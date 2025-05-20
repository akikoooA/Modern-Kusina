// Import the required functions from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, onSnapshot, arrayUnion } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";



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

// Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// === SIGNUP ===
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      window.location.href = 'Recipes.html';
    } catch (err) {
      alert(err.message);
    }
  });
}

// === LOGIN ===
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = 'Recipes.html';
    } catch (err) {
      alert(err.message);
    }
  });
}

// === RECIPES PAGE LOGIC ===
const uploadForm = document.getElementById('upload-form');
const recipeGrid = document.getElementById('user-recipe-grid');
const likedGrid = document.getElementById('liked-recipe-grid');
const userInfo = document.getElementById('user-info');

onAuthStateChanged(auth, (user) => {
  if (!user && uploadForm) {
    alert("Please log in.");
    window.location.href = 'index.html';
  }

  if (user && uploadForm) {
    // Handle Upload
    uploadForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = document.getElementById('recipe-title').value;
      const desc = document.getElementById('recipe-desc').value;
      const imageFile = document.getElementById('recipe-image').files[0];

      const imageRef = ref(storage, `recipes/${Date.now()}_${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, 'recipes'), {
        uid: user.uid,
        title,
        desc,
        imageUrl,
        hearts: [],
        comments: []
      });

      uploadForm.reset();
    });

    // Show recipes
    onSnapshot(collection(db, 'recipes'), (snapshot) => {
      recipeGrid.innerHTML = '';
      likedGrid.innerHTML = '';
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        const docId = docSnap.id;

        const card = document.createElement('div');
        card.className = 'user-recipe-card';
        card.innerHTML = `
          <img src="${data.imageUrl}" />
          <h4>${data.title}</h4>
          <p>${data.desc}</p>
          <div class="like">
            ❤️ <span>${data.hearts.length}</span>
            <button data-id="${docId}" class="like-btn">Like</button>
          </div>
          <div class="comments">
            <input type="text" placeholder="Add comment..." data-id="${docId}" class="comment-input" />
          </div>
        `;

        recipeGrid.appendChild(card);
        if (data.hearts.includes(user.uid)) {
          likedGrid.appendChild(card.cloneNode(true));
        }
      });
    });

    // Handle Like
    recipeGrid.addEventListener('click', async (e) => {
      if (e.target.classList.contains('like-btn')) {
        const docId = e.target.dataset.id;
        const refDoc = doc(db, 'recipes', docId);
        const recipe = await getDocs(collection(db, 'recipes'));
        const docData = recipe.docs.find(d => d.id === docId);
        if (docData && !docData.data().hearts.includes(user.uid)) {
          await updateDoc(refDoc, {
            hearts: arrayUnion(user.uid)
          });
        }
      }
    });

    // Handle Comment
    recipeGrid.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter' && e.target.classList.contains('comment-input')) {
        const docId = e.target.dataset.id;
        const comment = e.target.value.trim();
        if (comment) {
          await updateDoc(doc(db, 'recipes', docId), {
            comments: arrayUnion(comment)
          });
          e.target.value = '';
        }
      }
    });

    // Show account info
    if (userInfo) {
      userInfo.innerHTML = `
        <p><strong>Email:</strong> ${user.email}</p>
        <button onclick="logout()">Logout</button>
      `;
    }
  }
});

// Logout function
window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = 'index.html';
  });
}
