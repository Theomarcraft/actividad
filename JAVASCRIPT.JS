<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
    // Inicializa EmailJS con tu PUBLIC KEY
    emailjs.init("kPhxowMBPGG1imCuk"); // ← Tu user ID (public key)

    // Mostrar formulario de registro
    function mostrarFormulario() {
        document.getElementById("bienvenida").classList.remove("activo");
        document.getElementById("formulario").classList.add("activo");
    }

    // Continuar con el registro
    function continuarRegistro() {
        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!nombre || !correo || !password) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        document.getElementById("btnContinuar").classList.add("deshabilitado");
        document.getElementById("btnContinuar").disabled = true;

        const usuario = { nombre, correo, password, verificado: false };
        localStorage.setItem("usuario", JSON.stringify(usuario));

        enviarCorreoVerificacion(correo);

        setTimeout(() => {
            alert("¡Registro exitoso! Revisa tu correo para verificar tu cuenta.");
            document.getElementById("formulario").classList.remove("activo");
            document.getElementById("inicioSesion").classList.add("activo");
        }, 2000);
    }

    // Enviar correo de verificación con EmailJS
    function enviarCorreoVerificacion(correo) {
        const templateParams = {
            to_email: correo, // ← Este campo se debe usar en la plantilla
            mensaje: Hola, por favor verifica tu cuenta haciendo clic en este enlace: https://tusitio.com/verificar?correo=${encodeURIComponent(correo)}
        };

        emailjs.send("service_2cpdzyp", "template_v3fokk8", templateParams)
            .then(function (response) {
                console.log("✅ Correo enviado con éxito", response);
                alert("Se ha enviado un correo de verificación a: " + correo);
            })
            .catch(function (error) {
                console.error("❌ Error al enviar el correo:", error);
                alert("Hubo un error al intentar enviar el correo. Revisa la consola para más detalles.");
            });
    }

    // Iniciar sesión
    function iniciarSesion() {
        const correoLogin = document.getElementById("correoLogin").value.trim();
        const passwordLogin = document.getElementById("passwordLogin").value.trim();

        const usuario = JSON.parse(localStorage.getItem("usuario"));

        if (!usuario || usuario.correo !== correoLogin || usuario.password !== passwordLogin) {
            alert("Credenciales incorrectas o no verificado.");
            return;
        }

        if (!usuario.verificado) {
            alert("Por favor, verifica tu correo antes de iniciar sesión.");
            return;
        }

        alert("¡Inicio de sesión exitoso!");
        document.getElementById("inicioSesion").classList.remove("activo");
        document.getElementById("bienvenida").classList.add("activo");
    }

    // Activar botón cuando se marca "No soy un robot"
    document.getElementById('noRobot').addEventListener('change', function () {
        document.getElementById('btnContinuar').disabled = !this.checked;
    });
</script>