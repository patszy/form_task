class User {
    constructor(name, sname, email, password, bdate, gender) {
        this.name = name;
        this.sname = sname;
        this.email = email;
        this.password = password;
        this.bdate = bdate;
        this.gender = gender;
    }
}

let usersTab = [];
let user = new User("admin", "admin1", "admin@let.mein", "admin", "01.01.1970", "male");

usersTab.push(user);

window.onload = () => {
    const inputs = document.querySelectorAll('.form-container input');
    const eyes = document.querySelectorAll('.label .far.fa-eye');
    const door = document.querySelectorAll('.door')[0];
    const register = document.querySelectorAll('.section-register')[0];
    const login = document.querySelectorAll('.section-login')[0];
    const formRegister = document.getElementById('form-register');
    const formLogin = document.getElementById('form-login');

    inputs.forEach(input => {
        if(input.type=="radio") {
            input.addEventListener("focus", (event) => {
                event.target.parentElement.parentElement.classList.add('focus');
            });

            input.addEventListener("blur", (event) => {
                if(!event.target.value) event.target.parentElement.parentElement.classList.remove('focus');
            });
        } else if(input.classList.contains('input-big')) {
            input.addEventListener("focus", (event) => {
                let input = event.target;
                input.parentElement.classList.add('focus');
                (input.type == "text") ? input.type = "date" : false;
            });

            input.addEventListener("blur", (event) => {
                let input = event.target;

                if(input.type == "date" && !event.target.value){
                    input.parentElement.classList.remove('focus');
                    input.type = "text";
                }
            });
        } else {
            input.addEventListener("focus", (event) => {
                event.target.parentElement.classList.add('focus');
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

    const formRegisterValidate = () => {
        formRegister.setAttribute("novalidate", true);

        const inputName = formRegister.querySelector("input[name=name]");
        const inputSname = formRegister.querySelector("input[name=surname]");
        const inputEmail = formRegister.querySelector("input[name=email]");
        const inputPassword = formRegister.querySelector("input[name=password]");
        const inputPasswordConfirm = formRegister.querySelector("input[name=password-confirm]");
        const inputBdate = formRegister.querySelector("input[name=bdate]");
        const inputGender = formRegister.querySelectorAll("input[name=gender]");
        const inputGuardian = formRegister.querySelector("input[name=guardian]");
        let formErrors = [];

        console.log(inputName, inputSname, inputEmail, inputPassword, inputPasswordConfirm, inputBdate.value, inputGender.value, inputGuardian);

        formRegister.addEventListener("submit", (event) => {
            event.preventDefault();

            if(!inputName.checkValidity()) console.log("error name");
            if(!inputSname.checkValidity()) console.log("error sname");
            if(!inputEmail.checkValidity()) console.log("error email");
            if(!inputPassword.checkValidity()) console.log("error password");
            if(inputPassword.value !== inputPasswordConfirm.value || inputPassword.value == '' || inputPasswordConfirm.value == '') console.log("error diffrent passwords");
            let inputGenderCheck = false, gender;
            inputGender.forEach(input => {
                if(input.checked) {
                    inputGenderCheck = true;
                    gender = input.value;
                }
            })
            if(!inputGenderCheck) console.log("error gender");
            if(inputBdate.value == '') console.log("error bdate");
            if(inputGuardian.checked) console.log("congratulations");

            console.log(Date.parse(inputBdate.value));
        });
    }

    formRegisterValidate();
}

/*
1. Add validation API.
2. Add forgot passowrd.
3. Add Logging in.
4. Handling register and login.
 */