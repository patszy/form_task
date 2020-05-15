window.onload = () => {
    const inputs = document.querySelectorAll('.input');
    const eye = document.querySelector('.label .far.fa-eye');
    const door = document.querySelectorAll('.door')[0];
    const register = document.querySelectorAll('.section-register')[0];
    const login = document.querySelectorAll('.section-login')[0];

    inputs.forEach(input => {
        input.addEventListener("focus", (event) => {
            event.target.parentElement.classList.add('focus');
        });

        input.addEventListener("blur", (event) => {
            if(!event.target.value) event.target.parentElement.classList.remove('focus');
        });
    });

    eye.addEventListener("click", (event) => {
        event.preventDefault();
        let input = event.target.previousElementSibling;
        (input.type == "password") ? input.type = "text" : input.type = "password";
    });

    door.querySelector('.door-register').addEventListener("click", (event) => {
        door.classList.add('login');
        register.style.display = 'block';
        login.style.display = 'none';
    });

    door.querySelector('.door-login').addEventListener("click", (event) => {
        door.classList.remove('login');
        register.style.display = 'none';
        login.style.display = 'block';
    });
}