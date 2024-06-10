// Abre el modal de chat
document.getElementById('chat-btn').onclick = function() {
    document.getElementById('chat-modal').classList.add('show');
};

// Cierra el modal de chat
function closeChatModal() {
    document.getElementById('chat-modal').classList.remove('show');
}

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyATSV6O5u6Wr0wUOjkZfyP-Bkx_CPBl_Zk",
    authDomain: "comentarios-radio-9727e.firebaseapp.com",
    projectId: "comentarios-radio-9727e",
    storageBucket: "comentarios-radio-9727e.appspot.com",
    messagingSenderId: "746508664126",
    appId: "1:746508664126:web:a13f5ed7707310083b406f",
    measurementId: "G-E3KD1F6ZCM"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Referencia a la colección de mensajes en Firestore
var chatRef = firebase.firestore().collection('chat');

// Enviar un mensaje
function sendMessage() {
    var message = document.getElementById('chat-input').value;
    if (message.trim() !== "") {
        chatRef.add({
            "message": message,
            "timestamp": firebase.firestore.FieldValue.serverTimestamp()
        });
        document.getElementById('chat-input').value = '';
    }
}

// Mostrar mensajes en tiempo real
chatRef.orderBy('timestamp').onSnapshot(function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
        if (change.type === 'added') {
            var message = change.doc.data().message;
            var messageElement = document.createElement('div');
            messageElement.textContent = message;
            document.getElementById('chat-messages').appendChild(messageElement);
        }
    });
});

