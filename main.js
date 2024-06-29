// main.js
const messaging = firebase.messaging();

const messageDiv = document.getElementById('message');

function showMessage(message) {
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
}

// طلب الإذن لعرض الإشعارات
messaging.requestPermission()
    .then(() => {
        console.log('Notification permission granted.');
        return messaging.getToken();
    })
    .then((token) => {
        console.log('FCM Token:', token);
        // يمكنك إرسال الرمز المميز إلى الخادم الخاص بك إذا كنت ترغب في ذلك
    })
    .catch((error) => {
        console.error('Unable to get permission to notify.', error);
    });

// التعامل مع الرسائل الواردة أثناء تشغيل التطبيق
messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
    showMessage(Notification: ${payload.notification.title} - ${payload.notification.body});
});
