// 1. არსებულ ფორმში დაამატეთ 3 ველი personal_number, mobile_number, job_description

// 2.  personal_number - ვალიდაცია:  სავალდებულოა, უნდა შეიცავდეს მხოლოდ რიცხვებს, შეყვანილი სიმბოლოების რაოდენობა უნდა იყოს 11 ის ტოლი.

// 3.  mobile_number - ვალიდაცია: სავალდებულოა, უნდა შედგებოდეს 9 სიმბოლოსგან (მაგ. 599123456).

// 4.

// job_description   - ვალიდაცია: არ არის სავალდებულო, მაქსიმალური სიმბოლების რაოდენობა 50.

const form = document.querySelector("#sign-up");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const personalNumber = document.querySelector("#personal_number"),
	mobileNumber = document.querySelector("#mobile_number"),
	jobDescription = document.querySelector("#job-description");

const usernameError = document.querySelector("#username-error");
const emailError = document.querySelector("#email-error");
const passwordError = document.querySelector("#password-error");
const personalNumberError = document.querySelector("#personal_number-error"),
	mobileNumberError = document.querySelector("#mobile_number-error"),
	jobDescriptionError = document.querySelector("#job_description-error");

let isUserNameValid = false;
let isEmailValid = false;
let isPasswordValid = false;

function validatePersonalNumber() {
	// /^\d+$/.test(str);
	if (!personalNumber.validity.valid) {
		personalNumber.classList.remove("correct");
		personalNumber.classList.add("error");
		personalNumberError.innerText = "empty";
		return false;
	} else if (
		// personalNumber.value.length < 11 ||
		// personalNumber.value.length > 11

		personalNumber.value.length !== 11
	) {
		personalNumber.classList.remove("correct");
		personalNumber.classList.add("error");
		personalNumberError.innerText = "must be 11 charachter";
		return false;
	} else {
		personalNumber.classList.add("correct");
		personalNumber.classList.remove("error");
		personalNumberError.innerText = "";

		return true;
	}
}

function validateMobileNumber() {
	if (!mobileNumber.validity.valid) {
		mobileNumber.classList.remove("correct");
		mobileNumber.classList.add("error");
		mobileNumberError.innerText = "empty";
		return false;
	} else if (
		// personalNumber.value.length < 9 ||
		// personalNumber.value.length > 9
		mobileNumber.value.length !== 9
	) {
		mobileNumber.classList.remove("correct");
		mobileNumber.classList.add("error");
		mobileNumberError.innerText = "must be 9 charachter";
		return false;
	} else {
		mobileNumber.classList.add("correct");
		mobileNumber.classList.remove("error");
		mobileNumberError.innerText = "";
		return true;
	}
}

function validateJobDescription() {
	if (jobDescription.value.length > 50) {
		jobDescription.classList.remove("correct");
		jobDescription.classList.add("error");
		jobDescriptionError.innerText = "must not be more than 50 charachter";
		return false;
	} else {
		jobDescription.classList.add("correct");
		jobDescription.classList.remove("error");
		jobDescriptionError.innerText = "";
		return true;
	}
}

function validateUserName() {
	if (!username.validity.valid) {
		username.classList.remove("correct");
		username.classList.add("error");
		usernameError.innerText = "empty";
		isUserNameValid = false;
	} else {
		username.classList.remove("error");
		username.classList.add("correct");
		usernameError.innerText = "";
		isUserNameValid = true;
	}

	return isUserNameValid;
}

function validateUserEmail() {
	if (!email.validity.valid) {
		email.classList.remove("correct");
		email.classList.add("error");

		if (email.validity.typeMismatch) {
			emailError.innerText = "not valid format";
		} else {
			emailError.innerText = "empty";
		}
		isEmailValid = false;
	} else {
		email.classList.add("correct");
		email.classList.remove("error");
		emailError.innerText = "";
		isEmailValid = true;
	}

	return isEmailValid;
}

function validatePassword() {
	if (password.value.length < 5) {
		passwordError.innerText = "only 5 char";
		password.classList.remove("correct");
		password.classList.add("error");
		isPasswordValid = false;
	} else if (password.value.length >= 5 && password.value.length < 10) {
		passwordError.innerText = "less than 10";
		password.classList.add("correct");
		password.classList.remove("error");
		isPasswordValid = true;
	} else {
		passwordError.innerText = "> 10";
		isPasswordValid = true;
	}

	return isPasswordValid;
}

form.addEventListener("submit", (e) => {
	e.preventDefault();

	const isValidName = validateUserName();
	const isValidEmail = validateUserEmail();
	const isValidPassword = validatePassword();
	const isPersonalNumberValid = validatePersonalNumber();
	const isMobileNumberValid = validateMobileNumber();
	const isJobDescriptionValid = validateJobDescription();
	if (
		isValidName &&
		isValidEmail &&
		isValidPassword &&
		isPersonalNumberValid &&
		isMobileNumberValid &&
		isJobDescriptionValid
	) {
		console.log("submit form");
		// form.submit();

		showSelectedModal("#sign-in");

		form.reset();
	}
});

username.addEventListener("input", validateUserName);
email.addEventListener("input", validateUserEmail);
password.addEventListener("input", validatePassword);
mobileNumber.addEventListener("input", validateMobileNumber);
personalNumber.addEventListener("input", validatePersonalNumber);
jobDescription.addEventListener("input", validateJobDescription);

function showSelectedModal(selector) {
	const modal = document.querySelector(selector);
	const closeModalBtn = modal.querySelector(".modal-close");
	// console.log(closeModalBtn, modal);
	modal.classList.add("open");
	closeModalBtn.addEventListener("click", () => {
		modal.classList.remove("open");
	});
}
