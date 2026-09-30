// Pure function: takes the form values, returns { fieldName: message } for every
// field that fails. An empty object means the enquiry is valid.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEnquiry(values) {
  const errors = {};

  if (values.parentName.trim().length < 2) {
    errors.parentName = "Enter the parent's full name.";
  }

  // Count digits only, so "+91 98379-83791" and "9837983791" are both accepted.
  const phoneDigits = values.phone.replace(/\D/g, "");
  if (phoneDigits.length < 10 || phoneDigits.length > 13) {
    errors.phone = "Enter a 10-digit mobile number, with country code if outside India.";
  }

  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter an email address like name@example.com.";
  }

  if (!values.grade) {
    errors.grade = "Choose the grade your child is applying for.";
  }

  return errors;
}
