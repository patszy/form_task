window.onload = () => {
    const inputs = document.querySelectorAll('.form-container input');
    const eyes = document.querySelectorAll('.label .far.fa-eye');
    const door = document.querySelectorAll('.door')[0];
    const register = document.querySelectorAll('.section-register')[0];
    const login = document.querySelectorAll('.section-login')[0];
    const inputBig = document.querySelectorAll('.input-big');

    inputs.forEach(input => {
        if(input.type=="radio") {
            input.addEventListener("focus", (event) => {
                event.target.parentElement.parentElement.classList.add('focus');
                console.log(event.target);
            });

            input.addEventListener("blur", (event) => {
                if(!event.target.value) event.target.parentElement.parentElement.classList.remove('focus');
            });
        } else {
            input.addEventListener("focus", (event) => {
                event.target.parentElement.classList.add('focus');
                console.log(event.target);
            });

            input.addEventListener("blur", (event) => {
                if(!event.target.value) event.target.parentElement.classList.remove('focus');
            });
        }
    });

    eyes.forEach(eye => {
        eye.addEventListener("click", (event) => {
            event.preventDefault();
            let input = event.target.previousElementSibling;
            (input.type == "password") ? input.type = "text" : input.type = "password";
        });
    });

    inputBig.forEach(input => {
        input.addEventListener("focus", (event) => {
            let input = event.target;
            (input.type == "text") ? input.type = "date" : false;
        });

        input.addEventListener("blur", (event) => {
            let input = event.target;
            (input.type == "date" && !event.target.value) ? input.type = "text" : false;
        });
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