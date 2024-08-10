const errorMessage = document.getElementsByClassName("error")[0];

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('my-form-login').addEventListener('submit', async(e) => {
        e.preventDefault();
        const user = document.getElementById('user').value;
        const password = document.getElementById('password').value;
        const res = await fetch("/api/login", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                user,
                password
            })
        });
        if(!res.ok) return errorMessage.classList.toggle("escondido", false);
        const resJson = await res.json();
        if (resJson.redirect) {
            window.location.href = resJson.redirect;
        }
    })
})