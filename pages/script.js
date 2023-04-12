const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const formData = new FormData(signupForm);

	fetch("/api/signup.php", {
		method: "POST",
		body: formData,
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.success) {
				// If the form submission was successful, display a success message
				alert("Sign up successful!");
			} else {
				// If there were validation errors, display the error messages next to the corresponding form fields
				const errors = data.errors;
				Object.keys(errors).forEach((fieldName) => {
					const field = signupForm.querySelector(`[name="${fieldName}"]`);
					const errorElement = document.createElement("div");
					errorElement.className = "error-message";
					errorElement.innerText = errors[fieldName];
					field.parentElement.appendChild(errorElement);
				});
			}
		})
		.catch((error) => {
			// If there was a network error or some other problem, display an error message
			alert("An error occurred: " + error.message);
		});
});
