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

  // check if all required fields are filled
  var requiredFields = [
    "name",
    "email",
    "phone_number",
    "course_of_interest",
    "address",
    "city",
    "state_of_residence",
    "reference_name",
    "reference_phone",
    "program_type",
    "passport_photograph",
    "personal_id_photograph",
    "reference_email",
    "country",
  ];
  var filledFields = true;
  var errorFields = [];
  requiredFields.forEach(function (field) {
    if (
      (field == "passport_photograph" || field == "personal_id_photograph") &&
      !formdata.get(field)
    ) {
      filledFields = false;
      errorFields.push(field);
    } else if (formdata.get(field) == "") {
      filledFields = false;
      errorFields.push(field);
    }
  });
  if (!filledFields) {
    var errorMessage = "Please fill in the following fields: ";
    errorFields.forEach(function (field) {
      errorMessage += field + ", ";
    });
    errorMessage = errorMessage.slice(0, -2) + ".";
    var errorAlert =
      '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
      errorMessage +
      '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
    document.getElementById("form-messages").innerHTML = errorAlert;
    return;
  }

  // set up fetch request options
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
      // display response to user
      alert("Your enrollment was successful!");
    })
    .catch((error) => console.log("error", error));
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
