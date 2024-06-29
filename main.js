// main.js
const messaging = firebase.messaging();

const messageDiv = document.getElementById('message');

function showMessage(message) {
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
}

// تسجيل Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
}

// طلب الإذن لعرض الإشعارات
Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
        console.log('Notification permission granted.');
        return messaging.getToken();
    } else {
        console.error('Unable to get permission to notify.');
    }
}).then((token) => {
    console.log('FCM Token:', token);
    // يمكنك إرسال الرمز المميز إلى الخادم الخاص بك إذا كنت ترغب في ذلك
}).catch((error) => {
    console.error('Error getting FCM token:', error);
});

// التعامل مع الرسائل الواردة أثناء تشغيل التطبيق
messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
    showMessage(Notification: ${payload.notification.title} - ${payload.notification.body});
});
