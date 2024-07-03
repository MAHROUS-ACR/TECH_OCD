

// Register new user
document.getElementById('register').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User registered: ', user);
            document.getElementById('user-info').innerText = `Hello, ${user.email}`;

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
            document.getElementById('user-info').innerText = `Hello, ${user.email}`;

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
