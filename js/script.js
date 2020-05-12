window.onload = () => {
    const inputs = document.querySelectorAll('.input');
    const eye = document.querySelector('.label .far.fa-eye');

    inputs.forEach(input => {
        input.addEventListener("focus", (event) => {
            event.target.parentElement.classList.add('focus');
        });

        input.addEventListener("blur", (event) => {
            if(!event.target.value) event.target.parentElement.classList.remove('focus');
        });
    });

    eye.addEventListener("click", (event) => {
        let input = event.target.previousElementSibling;
        (input.type == "password") ? input.type = "text" : input.type = "password";
    });
}