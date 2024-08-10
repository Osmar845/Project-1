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





// document.getElementsByTagName("button")[0].addEventListener("click",() => {
//     document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
//     document.location.href = "/";
// })