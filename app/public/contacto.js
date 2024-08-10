const formEmail = document.getElementById("contacto-form");

formEmail.addEventListener("submit", sendEmail);

function sendEmail(event) {
    event.preventDefault();
    
    // Inicializa EmailJS con tu clave pública
    emailjs.init('Gg99TgxuT2Pf1Vt3C');

    // Envía el correo usando el serviceID, templateID y los datos del formulario
    emailjs.send('service_3cylgzm', 'template_09mcy16', {
        name: formEmail.querySelector('[name="name"]').value,
        email: formEmail.querySelector('[name="email"]').value,
        message: formEmail.querySelector('[name="message"]').value,
    })
    .then(result => {
        Swal.fire({
            icon: 'successfully',
            title: 'Good',
            text: '"Your Message Has Been Sent Successfully"'
        });
    })
    .catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'It Was Not Possible To Send Your Message'
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById("btn-logout"); // Asegúrate de que el botón tenga un ID específico
    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            await fetch('/api/logout', {
                method: 'POST',
                credentials: 'include'
            });
            document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            document.location.href = "/";
        });
    }
});