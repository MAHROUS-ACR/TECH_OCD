const firebaseConfig = {
  apiKey: "AIzaSyACFHbMr19jQI8t39FvABCSuMpSz6TR5hY",
  authDomain: "tch-o-5e243.firebaseapp.com",
  databaseURL: "https://tch-o-5e243-default-rtdb.firebaseio.com",
  projectId: "tch-o-5e243",
  storageBucket: "tch-o-5e243.appspot.com",
  messagingSenderId: "356977983925",
  appId: "1:356977983925:web:0e8669180f9d664a49d9fc",
  measurementId: "G-9X82V7SXPX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Login with Google
document.getElementById('login').addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(result => {
        const user = result.user;
        document.getElementById('user-info').innerText = Hello, ${user.displayName};
        
        // Record user activity
        const userRef = db.collection('user_activities').doc(user.uid);
        userRef.set({
            last_active: firebase.firestore.FieldValue.serverTimestamp(),
            email: user.email,
            displayName: user.displayName
        }, { merge: true });
    }).catch(error => {
        console.error("Error during login: ", error);
    });
});

// Listen for user activity
window.addEventListener('mousemove', () => {
    const user = auth.currentUser;
    if (user) {
        const userRef = db.collection('user_activities').doc(user.uid);
        userRef.update({
            last_active: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
});
