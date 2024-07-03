// Firebase configuration
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
const database = firebase.database();

// Register new user
document.getElementById('register').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User registered: ', user);
            document.getElementById('user-info').innerText = Hello, ${user.email};

            // Record user activity
            const userRef = database.ref('user_activities/' + user.uid);
            userRef.set({
                last_active: firebase.database.ServerValue.TIMESTAMP,
                email: user.email
            });

            startTrackingActivity(user.uid);
        })
        .catch((error) => {
            console.error('Error registering user: ', error);
        });
});

// Login existing user
document.getElementById('login').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User logged in: ', user);
            document.getElementById('user-info').innerText = Hello, ${user.email};

            // Record user activity
            const userRef = database.ref('user_activities/' + user.uid);
            userRef.set({
                last_active: firebase.database.ServerValue.TIMESTAMP,
                email: user.email
            });

            startTrackingActivity(user.uid);
        })
        .catch((error) => {
            console.error('Error logging in user: ', error);
        });
});

// Start tracking user activity
function startTrackingActivity(uid) {
    ['mousemove', 'click', 'keypress'].forEach((event) => {
        window.addEventListener(event, () => {
            const userRef = database.ref('user_activities/' + uid);
            userRef.update({
                last_active: firebase.database.ServerValue.TIMESTAMP
            });
        });
    });
}
