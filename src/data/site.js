// School-wide facts reused by metadata, the top bar, footer and enquiry section.
export const site = {
  name: "Tulas International School",
  url: "https://tis.edu.in",
  description:
    "TIS is one of India's top boarding and day schools in Dehradun, India. Our CBSE curriculum focuses on academic excellence, holistic development, and preparing students to be global leaders.",
  admissionHelpline: "+91-9837983791",
  landlines: ["0135-2699444", "0135-2699666"],
  email: "info@tis.edu.in",
  address: "Dhoolkot, P.O – Selaqui, Chakrata Road, Dehradun-248011 (Uttarakhand)",
  applyUrl: "https://admission.tis.edu.in",
};

// "+91-9837983791" -> "tel:+919837983791" so phone links work on every device.
export function toTelHref(phoneNumber) {
  return `tel:${phoneNumber.replace(/[^\d+]/g, "")}`;
}
