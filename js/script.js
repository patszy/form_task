class FormValidate {
    constructor(form, options) {
        const defaultOptions = {
            classError: `error`
        }

        this.form = form;
        this.options = Object.assign({}, defaultOptions, options);

        this.form.setAttribute(`novalidate`, true);
        this.prepareElements();
        this.handleSubmit();
    }

    getFields() {
        const inputs = [...this.form.querySelectorAll(`input:not(:disabled), select:not(:disabled), textarea:not(:disabled)`)];
        const result = [];

        for (const element of inputs) if (element.willValidate && element.type != `submit` && element.name != `guardian`) result.push(element);

        return result;
    }

    prepareElements() {
        const elements = this.getFields();

        for(const element of elements){
            const type = element.type.toLowerCase();
            let eventName = `input`;

            if(type == `checkbox` || type == `radio` || type == `select`) eventName = `change`;
            if(type == `date`) {
                const currentDate = new Date();
                const maxYear = currentDate.getFullYear()-9;
                element.setAttribute(`max`, `${maxYear}-01-01`);
            }

            element.addEventListener(eventName, event => this.testInput(event.target));
        }
    }

    testInput(input) {
        let valid = input.checkValidity();
        if(input.type == `date`) console.log(input.max);
        this.toggleErrorField(input, !valid);
        return valid;
    }

    getErrorText = (element) => {
        const validity = element.validity;
        let text = `Wrong value.`;

        if (!validity.valid) {
            if (validity.valueMissing) text = `Fill field.`;
            if (validity.typeMismatch) {
                if (el.type === `email`) text = `Write right email.`;
                if (el.type === `url`) text = `Write right URL.`;
            }
            if (validity.tooShort) text = `Value is too short.`;
            if (validity.tooLong) text = `Value is too long.`;
            if (validity.badInput) text = `Write Nubmer.`;
            if (validity.stepMismatch) text = `Choose right value.`;
            if (validity.rangeOverflow) {
                text = `Choose lower value.`;
                if(element.name == `bdate`) text = `You must be older 10 years.`;
            }
            if (validity.rangeUnderflow) text = `Choose higher value.`;
            if (validity.patternMismatch) {
                text = `Value does not match to requirements.`;

                if(element.name == `name` || element.name == `sname`) {
                    text = `Value should start from big letter and have more than 2 chars.`
                }
                if(element.name == `password`) {
                    text = `Value should have letter, number, special char and being longer than 8 chars.`;
                }
            }
        }

        return text;
    };

    toggleErrorField(field, show, text = ``){
        const formRow = field.closest(`.form-row`);

        text = this.getErrorText(field);

        if(show) {
            formRow.classList.add(`error-field`);
            formRow.setAttribute(`title`, text);
        } else {
            formRow.classList.remove(`error-field`);
            formRow.removeAttribute(`title`);
        }
    }

    handleSubmit() {
        this.form.addEventListener(`submit`, event => {
            event.preventDefault();
            const elements = this.getFields();

            for (const element of elements) {
                this.toggleErrorField(element, !element.checkValidity());
            }
        });
    }
}

window.onload = () => {
    const inputs = document.querySelectorAll(`.form-container input:not([type="submit"])`);
    const eyes = document.querySelectorAll(`.form-row .far.fa-eye`);
    const door = document.querySelector(`.door`);
    const register = document.querySelector(`.section-register`);
    const login = document.querySelector(`.section-login`);
    const formRegister = document.getElementById(`form-register`);
    const formLogin = document.getElementById(`form-login`);

    const formLoginValidation = new FormValidate(formLogin, {});
    const formRegisterValidation = new FormValidate(formRegister, {});

    inputs.forEach(input => {
        input.addEventListener(`focus`, (event) => {
            event.target.closest('.form-row').classList.add(`focus`);
        });

        input.addEventListener(`blur`, (event) => {
            if(!event.target.value) event.target.closest('.form-row').classList.remove(`focus`);
        });
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
}

/*
2. Add forgot password.
3. Add Logging in.
4. Handling register and login.
 */