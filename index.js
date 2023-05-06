function submitForm(event) {
  event.preventDefault();
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var phoneNumber = document.getElementById("phone_number").value;
  var courseOfInterest = document
    .getElementById("course_of_interest")
    .selectedOptions[0].getAttribute("data-name"); // retrieve course name from data attribute
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

  var formdata = new FormData();
  formdata.append("name", name);
  formdata.append("email", email);
  formdata.append("phone_number", phoneNumber);
  formdata.append("course_of_interest", courseOfInterest);
  console.log(courseOfInterest);
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
    .then((result) => {
      if (result.status === "success") {
        Swal.fire({
          icon: "success",
          confirmButtonColor: "#222057",
        }).then((result) => {
          if (result.isConfirmed) {
            // Clear form fields
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone_number").value = "";
            document.getElementById("course_of_interest").value = "";
            document.getElementById("address").value = "";
            document.getElementById("city").value = "";
            document.getElementById("state_of_residence").value = "";
            document.getElementById("reference_name").value = "";
            document.getElementById("reference_phone").value = "";
            document.getElementById("program_type").value = "";
            document.getElementById("passport_photograph").value = "";
            document.getElementById("personal_id_photograph").value = "";
            document.getElementById("reference_email").value = "";
            document.getElementById("country").value = "";
            // Reload page
            window.location.reload();
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "All fields are required",
          confirmButtonColor: "#222057",
        });
      }
    })
    .catch((error) => {
      console.log("error", error);
      Swal.fire({
        icon: "error",
        text: "All fields are required",
        confirmButtonColor: "#222057",
      });
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

// BUTTON CHECKER
const checkbox = document.getElementById("flexCheckDefault");
checkbox.checked = false;

const submitBtn = document.getElementById("submitBtn");

window.addEventListener("load", function () {
  submitBtn.classList.add("btn-primary-pl");
});

checkbox.addEventListener("change", function () {
  if (this.checked) {
    submitBtn.classList.remove("btn-primary-pl");
    submitBtn.classList.add("btn-warning-pl");
  } else {
    submitBtn.classList.remove("btn-warning-pl");
    submitBtn.classList.add("btn-primary-pl");
  }
  submitBtn.disabled = !this.checked;
});
