const inputs = document.querySelectorAll('.input');

inputs.forEach(input => {
	input.addEventListener("focus", (event) => {
        event.target.parentElement.classList.toggle('focus');
    });

	input.addEventListener("blur", (event) => {
        event.target.parentElement.classList.toggle('focus');
    });
});