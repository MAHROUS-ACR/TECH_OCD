// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyACFHbMr19jQI8t39FvABCSuMpSz6TR5hY",
  authDomain: "tch-o-5e243.firebaseapp.com",
  projectId: "tch-o-5e243",
  storageBucket: "tch-o-5e243.appspot.com",
  messagingSenderId: "356977983925",
  appId: "1:356977983925:web:0e8669180f9d664a49d9fc",
 
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
