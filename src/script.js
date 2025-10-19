const nameInput = document.querySelector(".name-input");
const numberInput = document.querySelector(".number-input");
const monthInput = document.querySelector(".date-input .month-input");
const yearInput = document.querySelector(".date-input .year-input");
const cvcInput = document.querySelector(".cvc-input");

const nameOutput = document.querySelector(".name-output");
const numberOutput = document.querySelector(".number-output");
const monthOutput = document.querySelector(".month-output");
const yearOutput = document.querySelector(".year-output");
const cvcOutput = document.querySelector(".cvc-output");

const submitButtons = document.querySelectorAll('button[type="submit"]');
const form = document.getElementById("card-form");
const thankYouScreen = document.querySelector(".thank-you");

// Helper to format card number with spaces after every 4 digits
function formatNumber(value) {
  return value
    .replace(/\s/g, "") // Only digits
    .replace(/(.{4})(?=.)/g, "$1 ") // Space every 4 digits
    .trim();
}

// ✓ Issue: should update the cardholder name in real-time
nameInput.addEventListener("input", () => {
  nameOutput.textContent = nameInput.value || "JANE APPLESEED";
});

// ✓ Issue: should update the card number with formatted spacing in real-time
numberInput.addEventListener("input", () => {
  const formatted = formatNumber(numberInput.value);
  numberOutput.textContent = formatted || "0000 0000 0000 0000";
  console.log(numberOutput.textContent);
  numberInput.value = formatted;
  console.log(numberInput.value);
});

// 1) ✓ Issue: should update the expiry month in real-time
monthInput.addEventListener("input", () => {
  let month = monthInput.value.replace(/\s/g, "").slice(0, 2); // allow digits only, max 2 chars
  monthInput.value = month;
  monthOutput.textContent = month ? month.padStart(2, "0") : "00";
});

// 2) ✓ Issue: should update the expiry year in real-time
yearInput.addEventListener("input", () => {
  let year = yearInput.value.replace(/\s/g, "").slice(0, 2); // allow digits only, max 2 chars
  yearInput.value = year;
  yearOutput.textContent = year ? year.padStart(2, "0") : "00";
});

// ✓ Issue: should update the CVC in real-time
cvcInput.addEventListener("input", () => {
  let cvc = cvcInput.value.replace(/\s/g, "").slice(0, 3);
  cvcInput.value = cvc;
  cvcOutput.textContent = cvc || "000";
});

submitButtons.forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault(); // prevent the form from submitting
    let valid = true;

    // Clear all previous errors
    form.querySelectorAll(".error").forEach(el => {
      el.textContent = "";
      el.style.display = "none";
    });

    // Validation logic (same as current form submit)
    if (!nameInput.value.trim()) {
      showError(nameInput, "Can't be blank");
      valid = false;
    } else if (!/^[A-Za-z\s]+$/.test(nameInput.value)) {
      showError(nameInput, "Wrong format, letters only");
      valid = false;
    }

    if (!numberInput.value.trim()) {
      showError(numberInput, "Can't be blank");
      valid = false;
    } else {
      const numClean = numberInput.value.replace(/\s/g, "");
      if (!/^\d{16}$/.test(numClean)) {
        showError(numberInput, "Wrong format, numbers only");
        valid = false;
      }
    }

    if (!monthInput.value.trim()) {
      showError(monthInput, "Can't be blank");
      valid = false;
    } else if (!/^\d{2}$/.test(monthInput.value) || +monthInput.value < 1 || +monthInput.value > 12) {
      showError(monthInput, "Wrong format, numbers only");
      valid = false;
    }

    if (!yearInput.value.trim()) {
      showError(yearInput, "Can't be blank");
      valid = false;
    } else if (!/^\d{2}$/.test(yearInput.value)) {
      showError(yearInput, "Wrong format, numbers only");
      valid = false;
    }

    if (!cvcInput.value.trim()) {
      showError(cvcInput, "Can't be blank");
      valid = false;
    } else if (!/^\d{3}$/.test(cvcInput.value)) {
      showError(cvcInput, "Wrong format, numbers only");
      valid = false;
    }

    // Show thank-you screen if valid
    if (valid) {
      form.style.display = "none";
      thankYouScreen.classList.remove("hidden");
    }
  });
});

// Helper to display error messages near the inputs
function showError(inputEl, message) {
  let errorSpan;
  if (inputEl.closest('.date-input')) {
    // use the error span that comes *after* .date-input
    const dateContainer = inputEl.closest('.date-input');
    errorSpan = dateContainer.nextElementSibling;
  } else {
    errorSpan = inputEl.nextElementSibling;
  } // Always selects the next span
  if (errorSpan) {
    errorSpan.textContent = message;
    errorSpan.style.display = "block";
  }
}

window.resetForm = function () {
  form.style.display = "flex";
  thankYouScreen.classList.add("hidden");
  form.reset();

  nameOutput.textContent = "JANE APPLESEED";
  numberOutput.textContent = "0000 0000 0000 0000";
  monthOutput.textContent = "00";
  yearOutput.textContent = "00";
  cvcOutput.textContent = "000";

  form.querySelectorAll(".error").forEach((el) => {
    el.textContent = "";
    el.style.display = "none";
  });
};
