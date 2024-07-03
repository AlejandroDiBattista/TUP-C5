document.addEventListener('DOMContentLoaded', function() {
    const registerButton = document.getElementById('registerButton');
    const loginButton = document.getElementById('loginButton');
    const registerFormContainer = document.getElementById('registerFormContainer');
    const loginFormContainer = document.getElementById('loginFormContainer');
    const logoutContainer = document.getElementById('logout');

    // Mostrar formulario de registro al hacer clic en "Registrarse"
    registerButton.addEventListener('click', function() {
        registerFormContainer.style.display = 'block';
        loginFormContainer.style.display = 'none';
        logoutContainer.style.display = 'none';
    });

    // Mostrar formulario de inicio de sesión al hacer clic en "Iniciar Sesión"
    loginButton.addEventListener('click', function() {
        loginFormContainer.style.display = 'block';
        registerFormContainer.style.display = 'none';
        logoutContainer.style.display = 'none';
    });

    // Funcionalidad para el formulario de registro
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(registerForm);
        const userData = {
            username: formData.get('username'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            phone: formData.get('phone'),
            email: formData.get('email')
        };

        // Validar que las contraseñas coincidan
        if (userData.password !== userData.confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        // Enviar los datos al servidor
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Verificar respuesta del servidor en consola
            alert(data.message); // Mostrar mensaje de éxito o error
            registerForm.reset(); // Limpiar el formulario después del registro
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al registrar el usuario.');
        });
    });

    // Funcionalidad para el formulario de inicio de sesión
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(loginForm);
        const userData = {
            username: formData.get('loginUsername'),
            password: formData.get('loginPassword')
        };

        // Enviar los datos al servidor
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Verificar respuesta del servidor en consola
            alert(data.message); // Mostrar mensaje de éxito o error
            if (data.message === 'Inicio de sesión exitoso.') {
                // Mostrar el botón de cerrar sesión y ocultar formularios de registro e inicio de sesión
                logoutContainer.style.display = 'block';
                registerFormContainer.style.display = 'none';
                loginFormContainer.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al iniciar sesión.');
        });
    });

    // Funcionalidad para el botón de cerrar sesión
    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', function() {
        // Enviar solicitud al servidor para cerrar sesión
        fetch('/logout', {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Verificar respuesta del servidor en consola
            alert(data.message); // Mostrar mensaje de éxito o error
            // Ocultar el botón de cerrar sesión y mostrar los formularios de inicio de sesión y registro
            logoutContainer.style.display = 'none';
            registerFormContainer.style.display = 'block';
            loginFormContainer.style.display = 'none';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al cerrar sesión.');
        });
    });
});
