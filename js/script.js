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
let user = new User(`admin`, `admin1`, `admin@let.mein`, `admin`, `01.01.1970`, `male`);

usersTab.push(user);

window.onload = () => {
    const inputs = document.querySelectorAll(`.form-container input`);
    const eyes = document.querySelectorAll(`.form-row .far.fa-eye`);
    const door = document.querySelectorAll(`.door`)[0];
    const register = document.querySelectorAll(`.section-register`)[0];
    const login = document.querySelectorAll(`.section-login`)[0];
    const formRegister = document.getElementById(`form-register`);
    const formLogin = document.getElementById(`form-login`);

    inputs.forEach(input => {
        if(input.type==`radio`) {
            input.addEventListener(`focus`, (event) => {
                event.target.parentElement.parentElement.classList.add(`focus`);
            });

            input.addEventListener(`blur`, (event) => {
                if(!event.target.value) event.target.parentElement.parentElement.classList.remove(`focus`);
            });
        } else if(input.classList.contains(`input-big`)) {
            input.addEventListener(`focus`, (event) => {
                let input = event.target;
                input.parentElement.classList.add(`focus`);
                (input.type == `text`) ? input.type = `date` : false;
            });

            input.addEventListener(`blur`, (event) => {
                let input = event.target;

                if(input.type == `date` && !event.target.value){
                    input.parentElement.classList.remove(`focus`);
                    input.type = `text`;
                }
            });
        } else {
            input.addEventListener(`focus`, (event) => {
                event.target.parentElement.classList.add(`focus`);
            });

            input.addEventListener(`blur`, (event) => {
                if(!event.target.value) event.target.parentElement.classList.remove(`focus`);
            });
        }
    });

    eyes.forEach(eye => {
        eye.addEventListener(`click`, (event) => {
            event.preventDefault();
            let input = event.target.previousElementSibling;
            (input.type == `password`) ? input.type = `text` : input.type = `password`;
        });
    });

    door.querySelector(`.door-register`).addEventListener(`click`, (event) => {
        door.classList.add(`login`);
        register.style.display = `block`;
        login.style.display = `none`;
    });

    door.querySelector(`.door-login`).addEventListener(`click`, (event) => {
        door.classList.remove(`login`);
        register.style.display = `none`;
        login.style.display = `block`;
    });

    const toggleErrorField = (field, show, text = ``) => {
        if (show) {
            field.classList.add(`error-field`);
            field.setAttribute(`title`, text);
        } else {
            field.classList.remove(`error-field`);
            field.removeAttribute(`title`);
        }
    };

    const getErrorText = (element) => {
        const validity = element.validity;

        if (validity.valid) return true;
        if (validity.valueMissing) return `Fill field.`;
        if (validity.typeMismatch) {
            if (el.type === `email`) return `Write right email.`;
            if (el.type === `url`) return `Write right URL.`;
        }
        if (validity.tooShort) return `Value is too short.`;
        if (validity.tooLong) return `Value is too long.`;
        if (validity.badInput) return `Write Nubmer.`;
        if (validity.stepMismatch) return `Choose right value.`;
        if (validity.rangeOverflow) return `Choose lower value.`;
        if (validity.rangeUnderflow) return `Choose higher value.`;
        if (validity.patternMismatch) return `Value does not match to requirements.`;
        return `Write right value.`;
    };

    const formRegisterValidate = () => {
        formRegister.setAttribute(`novalidate`, true);

        const inputName = formRegister.querySelector(`input[name=name]`);
        const inputSname = formRegister.querySelector(`input[name=surname]`);
        const inputEmail = formRegister.querySelector(`input[name=email]`);
        const inputPassword = formRegister.querySelector(`input[name=password]`);
        const inputPasswordConfirm = formRegister.querySelector(`input[name=password-confirm]`);
        const inputBdate = formRegister.querySelector(`input[name=bdate]`);
        const inputGender = formRegister.querySelectorAll(`input[name=gender]`);
        const inputGuardian = formRegister.querySelector(`input[name=guardian]`);
        let formErrors = [];

        console.log(inputName, inputSname, inputEmail, inputPassword, inputPasswordConfirm, inputBdate.value, inputGender.value, inputGuardian);

        formRegister.addEventListener(`submit`, (event) => {
            event.preventDefault();

            let checkErrors = false;

            if(!inputName.checkValidity()) {
                toggleErrorField(inputName.closest(`.form-row`), true, getErrorText(inputName));
                checkErrors = true;
            }
            else toggleErrorField(inputName.closest(`.form-row`), false);

            if(!inputSname.checkValidity()) toggleErrorField(inputSname.closest(`.form-row`), true, getErrorText(inputSname));
            else toggleErrorField(inputSname.closest(`.form-row`), false);

            if(!inputEmail.checkValidity()) toggleErrorField(inputEmail.closest(`.form-row`), true, getErrorText(inputEmail));
            else toggleErrorField(inputEmail.closest(`.form-row`), false);

            if(!inputPassword.checkValidity()) toggleErrorField(inputPassword.closest(`.form-row`), true, getErrorText(inputPassword));
            else toggleErrorField(inputPassword.closest(`.form-row`), false);

            if(inputPassword.value !== inputPasswordConfirm.value || inputPassword.value == `` || inputPasswordConfirm.value == ``) toggleErrorField(inputPassword.closest(`.form-row`), true, getErrorText(inputPassword));
            else toggleErrorField(inputPassword.closest(`.form-row`), false);

            if(inputBdate.value == ``) toggleErrorField(inputBdate.closest(`.form-row`), true, getErrorText(inputBdate));
            else toggleErrorField(inputBdate.closest(`.form-row`), false);

            let inputGenderCheck = false, gender;
            inputGender.forEach(input => {
                if(input.checked) {
                    inputGenderCheck = true;
                    gender = input.value;
                }
            })

            if(!inputGenderCheck) toggleErrorField(inputGender[0].closest(`.form-row`), true, getErrorText(inputGender[0]));
            else toggleErrorField(inputGender[0].closest(`.form-row`), false);

            if(inputGuardian.checked) console.log("Congratulations!");

            if(!checkErrors) {
                event.target.submit();
            }
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

 /*  Errors
 1. Form dostaje klase label nie powinien.
  */