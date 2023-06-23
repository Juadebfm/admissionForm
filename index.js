function submitForm(event) {
  event.preventDefault();

  // get form data
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var phoneNumber = document.getElementById("phone_number").value;
  var courseOfInterest = document
    .getElementById("course_of_interest")
    .selectedOptions[0].getAttribute("data-name");
  var address = document.getElementById("address").value;
  var city = document.getElementById("city").value;
  var stateOfResidence = document.getElementById("state_of_residence").value;
  var referenceName = document.getElementById("reference_name").value;
  var referencePhone = document.getElementById("reference_phone").value;
  var programType = document.getElementById("program_type").value;
  var passportPhotograph = document.getElementById("passport_photograph")
    .files[0];
  var personalIdPhotograph = document.getElementById("personal_id_photograph")
    .files[0];
  var referenceEmail = document.getElementById("reference_email").value;
  var country = document.getElementById("country").value;
  var agreeCheckbox = document.getElementById("agree_checkbox");

  // create form data object
  var formdata = new FormData();
  formdata.append("name", name);
  formdata.append("email", email);
  formdata.append("phone_number", phoneNumber);
  formdata.append("course_of_interest", courseOfInterest);
  formdata.append("address", address);
  formdata.append("city", city);
  formdata.append("state_of_residence", stateOfResidence);
  formdata.append("reference_name", referenceName);
  formdata.append("reference_phone", referencePhone);
  formdata.append("program_type", programType);
  formdata.append("passport_photograph", passportPhotograph);
  formdata.append("personal_id_photograph", personalIdPhotograph);
  formdata.append("reference_email", referenceEmail);
  formdata.append("country", country);

  var requiredFields = [
    "name",
    "email",
    "phone_number",
    "course_of_interest",
    "address",
    "city",
    "state_of_residence",
    "program_type",
    "country",
    "agree_checkbox",
    "reference_name",
    "reference_phone",
    "reference_email",
  ];

  var requiredCheckboxes = ["agree_checkbox"];

  var filledFields = true;
  var errorFields = [];

  requiredFields.forEach(function (field) {
    if (field == "course_of_interest" && !formdata.get(field)) {
      filledFields = false;
      errorFields.push(field);
    } else if (requiredCheckboxes.includes(field)) {
      if (!document.getElementById(field).checked) {
        filledFields = false;
        errorFields.push(field);
      }
    } else if (!formdata.get(field)) {
      filledFields = false;
      errorFields.push(field);
    }
  });

  if (!passportPhotograph || !personalIdPhotograph) {
    filledFields = false;
    if (!passportPhotograph) errorFields.push("passport_photograph");
    if (!personalIdPhotograph) errorFields.push("personal_id_photograph");
  }

  if (!filledFields) {
    var errorMessage = "";

    if (!formdata.get("course_of_interest")) {
      errorMessage = "Please select a course of interest.";
    } else if (!document.getElementById("agree_checkbox").checked) {
      errorMessage =
        "Please ensure that you have agreed to our student policy.";
    } else {
      errorMessage = "Please fill in the following fields: ";
      errorFields.forEach(function (field) {
        errorMessage += field + ", ";
      });
      errorMessage = errorMessage.slice(0, -2) + ".";
    }

    Swal.fire({
      icon: "info",
      // title: "Error",
      text: errorMessage,
      confirmButtonText: "OK",

      confirmButtonColor: "#f59e0b",
    });
    return;
  }

  var submitBtn = document.getElementById("submitBtn");
  submitBtn.innerHTML = "Submitting...";

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(
    "https://pluralcode.academy/pluralcode_apis/api/enroll_student",
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // log response to console for debugging purposes
      // change button text back to "submit form"
      submitBtn.innerHTML = "Submit Form";
      const getForm = document.getElementById("enrollmentForm");

      if (data.message && data.status) {
        Swal.fire({
          icon: "success",
          text: `${data.status} ${data.message}`,
          confirmButtonText: "OK",
          confirmButtonColor: "#f59e0b",
        });
        setTimeout(() => {
          getForm.reset();
        }, 5000);
      } else if (data.error) {
        Swal.fire({
          icon: "info",
          text: `${data.message}`,
          confirmButtonText: "OK",
          confirmButtonColor: "#f59e0b",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "An error occurred",
          html: "Please try again in an hour.",
          confirmButtonText: "OK",
          confirmButtonColor: "#f59e0b",
        });
      }
    })
    .catch((error) => {
      console.log("error", error);
      Swal.fire({
        icon: "error",
        text: "Please make sure you filled the course of interest. If you have filled it and still encounter an error, please try again later.",
        confirmButtonText: "OK",
        confirmButtonColor: "#f59e0b",
      });
      submitBtn.innerHTML = "Submit Form";
    });
}

// COURSES
window.onload = function () {
  // Fetch data from API endpoint
  fetch("https://pluralcode.academy/pluralcode_apis/api/bot_course_list")
    .then((response) => response.json())
    .then((data) => {
      // Get select element by ID
      const select = document.getElementById("course_of_interest");

      // Loop through data and add options to select element
      data.forEach((course) => {
        const option = document.createElement("option");
        option.value = course.id;
        option.text = course.name;
        option.setAttribute("data-name", course.name); // add data attribute with course name

        select.add(option);
      });
    })
    .catch((error) => console.error(error));
};

//email valid
var emailInput = document.getElementById("email");
emailInput.addEventListener("input", validateEmail);

function validateEmail() {
  var referenceEmail = emailInput.value;
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var isValid = emailRegex.test(referenceEmail);
  var errorDiv = document.getElementById("emailError");

  if (isValid) {
    emailInput.classList.remove("is-invalid");
    errorDiv.style.display = "none";
  } else {
    emailInput.classList.add("is-invalid");
    errorDiv.style.display = "block";
  }
}

// referernce email
var referenceEmailInput = document.getElementById("reference_email");
referenceEmailInput.addEventListener("input", validateReferenceEmail);

function validateReferenceEmail() {
  var referenceEmail = referenceEmailInput.value;
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var isValid = emailRegex.test(referenceEmail);
  var errorDiv = document.getElementById("emailRefError");

  if (isValid) {
    referenceEmailInput.classList.remove("is-invalid");
    errorDiv.style.display = "none";
  } else {
    referenceEmailInput.classList.add("is-invalid");
    errorDiv.style.display = "block";
  }
}

//phone number
var phoneInput = document.getElementById("phone_number");
phoneInput.addEventListener("input", validatePhone);

function validatePhone() {
  var phoneValue = phoneInput.value;
  var isValid = /^\d{11}$/.test(phoneValue);
  var errorDiv = document.getElementById("phoneError");

  if (isValid) {
    phoneInput.classList.remove("is-invalid");
    errorDiv.style.display = "none";
  } else {
    phoneInput.classList.add("is-invalid");
    errorDiv.style.display = "block";
  }
}

//reference phone number
var referencePhoneInput = document.getElementById("reference_phone");
referencePhoneInput.addEventListener("input", validateReferencePhone);

function validateReferencePhone() {
  var phoneValue = referencePhoneInput.value;
  var isValid = /^\d{11}$/.test(phoneValue);
  var errorDiv = document.getElementById("phoneRefError");

  if (isValid) {
    referencePhoneInput.classList.remove("is-invalid");
    errorDiv.style.display = "none";
  } else {
    referencePhoneInput.classList.add("is-invalid");
    errorDiv.style.display = "block";
  }
}

//file size valid
var fileInput = document.getElementById("passport_photograph");
var maxFileSize = 400 * 1024; // Maximum file size in bytes (400kb)

// Add an event listener to the file input field
fileInput.addEventListener("change", function () {
  var file = fileInput.files[0];
  if (file && file.size > maxFileSize) {
    // Clear the file input field
    fileInput.value = "";
    // Show an error message to the user
    Swal.fire({
      icon: "info",
      title: "File Size Exceeded",
      text: "Please choose an image file that is less than 400kb.",
      confirmButtonText: "OK",
      confirmButtonColor: "#f59e0b",
    });
  }
});

//file size valid
var fileIdInput = document.getElementById("personal_id_photograph");
var maxFileSize = 400 * 1024; // Maximum file size in bytes (400kb)

// Add an event listener to the file input field
fileIdInput.addEventListener("change", function () {
  var file = fileIdInput.files[0];
  if (file && file.size > maxFileSize) {
    // Clear the file input field
    fileIdInput.value = "";
    // Show an error message to the user
    Swal.fire({
      icon: "info",
      title: "File Size Exceeded",
      text: "Please choose an image file that is less than 400kb.",
      confirmButtonText: "OK",
      confirmButtonColor: "#f59e0b",
    });
  }
});

// Radio buttons
const fullPaymentRadio = document.getElementById("fullPayment");
const partPaymentRadio = document.getElementById("partPayment");
const notification = document.getElementById("notification");

// Event listener for the "Part Payment" radio button
partPaymentRadio.addEventListener("click", () => {
  if (partPaymentRadio.checked) {
    fullPaymentRadio.checked = false; // Uncheck "Full Payment"
    notification.textContent =
      "Kindly note that installment payment requires 70% down payment and Balance 4 weeks into the start of class";
  } else {
    notification.textContent = ""; // Clear the notification if unchecked
  }
});

// Event listener for the "Full Payment" radio button
fullPaymentRadio.addEventListener("click", () => {
  if (fullPaymentRadio.checked) {
    partPaymentRadio.checked = false; // Uncheck "Part Payment"
    notification.textContent = ""; // Clear the notification for full payment
  }
});
