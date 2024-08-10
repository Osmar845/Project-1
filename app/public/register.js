const errorMessage = document.getElementsByClassName("error")[0];

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('my-form-register').addEventListener('submit', async(e) => {
        e.preventDefault();
        const name = document.getElementById('fullname');
        // console.log(name.value);
        const user = document.getElementById('user');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const res = await fetch("http://localhost:4000/api/register", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                fullname: name.value,
                user: user.value,
                email: email.value,
                password: password.value
            })
        });
        if(!res.ok) return errorMessage.classList.toggle("escondido", false);
        const resJson = await res.json();
        if (resJson.redirect) {
            window.location.href = resJson.redirect;
        }
    })
})