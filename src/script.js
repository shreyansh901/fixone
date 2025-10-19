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
const thankYouScreen = document.querySelector(".thank-you");

// Helper to format card number with spaces after every 4 digits
function formatNumber(value) {
  return value
    .replace(/\s/g, "")
    .replace(/(.{4})(?=.)/g, "$1 ")
    .trim();
}

// Real-time updates
nameInput.addEventListener("input", () => {
  nameOutput.textContent = nameInput.value || "JANE APPLESEED";
});

numberInput.addEventListener("input", () => {
  const formatted = formatNumber(numberInput.value);
  numberOutput.textContent = formatted || "0000 0000 0000 0000";
  numberInput.value = formatted;
});

monthInput.addEventListener("input", () => {
  let month = monthInput.value.replace(/\s/g, "").slice(0, 2);
  monthInput.value = month;
  monthOutput.textContent = month ? month.padStart(2, "0") : "00";
});

yearInput.addEventListener("input", () => {
  let year = yearInput.value.replace(/\s/g, "").slice(0, 2);
  yearInput.value = year;
  yearOutput.textContent = year ? year.padStart(2, "0") : "00";
});

cvcInput.addEventListener("input", () => {
  let cvc = cvcInput.value.replace(/\s/g, "").slice(0, 3);
  cvcInput.value = cvc;
  cvcOutput.textContent = cvc || "000";
});

// Submit button logic (no form used)
submitButtons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault(); // prevent default behavior
    let valid = true;

    // Clear previous errors
    document.querySelectorAll(".error").forEach((el) => {
      el.textContent = "";
      el.style.display = "none";
    });

    // Validation logic
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
    } else if (
      !/^\d{2}$/.test(monthInput.value) ||
      +monthInput.value < 1 ||
      +monthInput.value > 12
    ) {
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
      document.querySelector(".card-form-wrapper").style.display = "none"; // hide the form container
      thankYouScreen.classList.remove("hidden");
    }
  });
});

// Helper to display error messages
function showError(inputEl, message) {
  let errorSpan;
  if (inputEl.closest(".date-input")) {
    errorSpan = inputEl.closest(".date-input").nextElementSibling;
  } else {
    errorSpan = inputEl.nextElementSibling;
  }
  if (errorSpan) {
    errorSpan.textContent = message;
    errorSpan.style.display = "block";
  }
}

// Reset function (no form element reference)
window.resetForm = function () {
  document.querySelector(".card-form-wrapper").style.display = "flex";
  thankYouScreen.classList.add("hidden");

  // Reset all inputs
  [nameInput, numberInput, monthInput, yearInput, cvcInput].forEach(
    (input) => (input.value = "")
  );

  // Reset outputs
  nameOutput.textContent = "JANE APPLESEED";
  numberOutput.textContent = "0000 0000 0000 0000";
  monthOutput.textContent = "00";
  yearOutput.textContent = "00";
  cvcOutput.textContent = "000";

  // Clear all errors
  document.querySelectorAll(".error").forEach((el) => {
    el.textContent = "";
    el.style.display = "none";
  });
};
