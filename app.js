// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// Login with Google
document.getElementById('login').addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(result => {
        const user = result.user;
        document.getElementById('user-info').innerText = Hello, ${user.displayName};
        
        // Record user activity
        const userRef = database.ref('user_activities/' + user.uid);
        userRef.set({
            last_active: firebase.database.ServerValue.TIMESTAMP,
            email: user.email,
            displayName: user.displayName
        });

        startTrackingActivity(user.uid);
    }).catch(error => {
        console.error("Error during login: ", error);
    });
});

// Start tracking user activity
function startTrackingActivity(uid) {
    ['mousemove', 'click', 'keypress'].forEach(event => {
        window.addEventListener(event, () => {
            const userRef = database.ref('user_activities/' + uid);
            userRef.update({
                last_active: firebase.database.ServerValue.TIMESTAMP
            });
        });
    });
}
