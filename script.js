const firebaseConfig = {
    apiKey: "AIzaSyDfsn-DQgIzKeyA-tBqf-P56kA1tGSVscw",
    authDomain: "datos-formulario-ecef0.firebaseapp.com",
    projectId: "datos-formulario-ecef0",
    storageBucket: "datos-formulario-ecef0.appspot.com",
    messagingSenderId: "800261448447",
    appId: "1:800261448447:web:a045a558b799f170b0e2ca",
    measurementId: "G-EZ5H6FFSFW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault()

    //validar nombre
    let nombreEntrda = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if (nombreEntrda.value.trim() === '') {
        errorNombre.textContent = 'Por favor introduci tu nombre'
        errorNombre.classList.add('error-message')
    } else {
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }
    //validar email
    let emailEntrada = document.getElementById('email')
    let errorEmail = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Patrón de validación básico

    if (!emailPattern.test(emailEntrada.value)) {
        errorEmail.textContent = 'Por favor, introducí un email válido'
        errorEmail.classList.add('error-message')
    } else {
        errorEmail.textContent = ''
        errorEmail.classList.remove('error-message')
    }
    //validar contraseña
    let contrasenaEntrada = document.getElementById('password')
    let errorContrasena = document.getElementById('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/

    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
        errorContrasena.textContent = 'La contraseña debe contener al menos 8 carateres, números, mayúsculas, minúsculas y caracteres especiales'
        errorContrasena.classList.add('error-message')
    } else {
        errorContrasena.textContent = ''
        errorContrasena.classList.remove('error-message')
    }

    //si todos los campos son validos enviar formulario
    if (!errorNombre.textContent && !errorEmail.textContent && !errorContrasena.textContent) {
        
        db.collection("users").add({
            name: nombreEntrda.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            alert('Formulario enviado', docRef.id)
            document.getElementById('formulario').reset()
        })
        .catch((error) => {
            alert(error)
        });
    }
})