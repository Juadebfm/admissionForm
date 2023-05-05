function submitForm(event) {
  event.preventDefault();
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var phoneNumber = document.getElementById("phone_number").value;
  var courseOfInterest = document.getElementById("course_of_interest").value;
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
    // .then((response) => {
    //   if (response.status === "success") {
    //     return response.json();
    //   } else {
    //     throw new Error("All fields required");
    //   }
    // })
    // .then((result) => {
    //   console.log(result);
    //   Swal.fire({
    //     icon: "success",
    //     text: "Records successfully created",
    //     confirmButtonColor: "#2d85de",
    //   });
    // })
    // .catch((error) => {
    //   console.error(error);

    //   Swal.fire({
    //     icon: "error",
    //     text: error.message,
    //     confirmButtonColor: "#2d85de",
    //   });
    // });
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

// COURSES
window.onload = function () {
  // Fetch data from API endpoint
  fetch("http://pluralcode.academy/pluralcode_apis/api/bot_course_list")
    .then((response) => response.json())
    .then((data) => {
      // Get select element by ID
      const select = document.getElementById("course_of_interest");

      // Loop through data and add options to select element
      data.forEach((course) => {
        const option = document.createElement("option");
        option.value = course.id;
        option.text = course.name;
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
