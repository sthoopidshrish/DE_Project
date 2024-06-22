const loginForm = document.querySelector('#login-form');
const signupForm = document.querySelector('#signup-form');
const loginErrorP = document.querySelector('#login-error-p');
const signupErrorP = document.querySelector('#signup-error-p');
const errorDivLogin = document.querySelector('#error-login');
const errorDivSignup = document.querySelector('#error-signup');
const loginIcon = document.querySelector('#login-icon');
const signupIcon = document.querySelector('#signup-icon');

let wrapper = document.querySelector('.wrapper'),
	signUpLink = document.querySelector('.link .signup-link'),
	signInLink = document.querySelector('.link .signin-link');

signUpLink.addEventListener('click', () => {
	wrapper.classList.add('animated-signin');
	wrapper.classList.remove('animated-signup');
});

signInLink.addEventListener('click', () => {
	wrapper.classList.add('animated-signup');
	wrapper.classList.remove('animated-signin');
});

loginForm.onsubmit = async (e) => {
	e.preventDefault();

	const formData = new FormData(loginForm);
	const data = new URLSearchParams(formData);

	const response = await fetch('/sendForLogin', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: data,
	});
	const result = await response.json();
	errorDivLogin.style.display = `block`;
	if (result.success) {
		loginIcon.classList.remove(`fa-exclamation-circle`);
		loginIcon.classList.add(`fa-check-circle`);
		loginErrorP.innerHTML = `You have logged in successfully!`;
		errorDivLogin.style.color = `#0e9700`;

		setTimeout(() => {
			window.location.href = '/';
		}, 3300);
	} else {
		loginIcon.classList.remove(`fa-check-circle`);
		loginIcon.classList.add(`fa-exclamation-circle`);
		loginErrorP.innerHTML = `${result.error}`;
		errorDivLogin.style.color = `#ff3333`;
	}
};

signupForm.onsubmit = async (e) => {
	e.preventDefault();

	const formData = new FormData(signupForm);
	const data = new URLSearchParams(formData);

	const response = await fetch('/sendForSignup', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: data,
	});
	const result = await response.json();
	if (result.success) {
		signupIcon.classList.remove(`fa-exclamation-circle`);
		signupIcon.classList.add(`fa-check-circle`);
		signupErrorP.innerHTML = `You have logged in successfully!`;
		errorDivSignup.style.color = `#0e9700`;

		setTimeout(() => {
			window.location.href = '/';
		}, 3300);
	} else {
		signupIcon.classList.remove(`fa-check-circle`);
		signupIcon.classList.add(`fa-exclamation-circle`);
		signupErrorP.innerHTML = `${result.error}`;
		errorDivSignup.style.color = `#ff3333`;
	}
};
