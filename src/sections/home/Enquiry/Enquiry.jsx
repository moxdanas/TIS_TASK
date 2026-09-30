"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button/Button";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import { site, toTelHref } from "@/data/site";
import { fadeUp } from "@/lib/motion";
import { validateEnquiry } from "@/lib/validateEnquiry";

const GRADE_OPTIONS = ["Pre-primary", "Grades 1–5", "Grades 6–8", "Grades 9–10", "Grades 11–12"];
const EMPTY_FORM = {
  parentName: "",
  phone: "",
  email: "",
  grade: "",
  studyMode: "Boarding",
  message: "",
};

const inputClasses =
  "w-full rounded-2xl border border-line bg-paper-raised px-4 py-3.5 text-base text-ink placeholder:text-ink-muted/70 focus:border-ink focus:outline-none aria-[invalid=true]:border-danger";

// Label, control and error message wired together with ids so screen readers
// announce the error with the field.
function Field({ id, label, error, optional, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-medium">
        {label}
        {optional && <span className="font-normal text-ink-muted"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Enquiry() {
  const formRef = useRef(null);
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submittedName, setSubmittedName] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    // Clear a field's error as soon as it is edited, instead of nagging mid-typing.
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateEnquiry(values);
    setErrors(validationErrors);

    const firstInvalidField = Object.keys(validationErrors)[0];
    if (firstInvalidField) {
      formRef.current.elements[firstInvalidField].focus();
      return;
    }

    setSubmittedName(values.parentName.trim());
    setValues(EMPTY_FORM);
  }

  const fieldProps = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: handleChange,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <section
      id="enquire"
      aria-labelledby="enquire-title"
      className="bg-paper-sunken py-28 sm:py-36"
    >
      <div className="container-page grid gap-16 lg:grid-cols-12">
        <div className="flex flex-col gap-10 lg:col-span-5">
          <SectionHeading
            id="enquire-title"
            label="Admissions"
            title="Start your child's journey at Tulas"
            description="Share a few details and the admissions team will call you back to talk through the next steps."
          />
          <dl className="grid gap-6">
            <div>
              <dt className="text-sm text-ink-muted">Admission helpline</dt>
              <dd className="mt-1 font-condensed text-3xl font-semibold tracking-tight">
                <a href={toTelHref(site.admissionHelpline)} className="hover:text-accent-ink">
                  {site.admissionHelpline}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-ink-muted">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${site.email}`} className="hover:text-accent-ink">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-ink-muted">Campus</dt>
              <dd className="mt-1 max-w-sm leading-relaxed">{site.address}</dd>
            </div>
          </dl>
          <iframe
            title="Map showing Tulas International School in Dehradun"
            src="https://www.google.com/maps?q=Tulas+International+School,+Dehradun&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="aspect-[4/3] w-full rounded-[2rem] border border-line"
          />
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-[2rem] bg-paper p-6 sm:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {submittedName ? (
                <motion.div
                  key="confirmation"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  role="status"
                  className="flex flex-col items-start gap-6 py-10"
                >
                  <p className="font-condensed text-5xl font-bold tracking-tight">
                    Thank you, {submittedName}.
                  </p>
                  <p className="max-w-md text-lg text-ink-muted">
                    This is a design demo, so your details were not sent anywhere. To reach
                    admissions today, call {site.admissionHelpline}.
                  </p>
                  <Button variant="secondary" onClick={() => setSubmittedName(null)}>
                    Send another enquiry
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  noValidate
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid gap-6 sm:grid-cols-2"
                >
                  <div className="sm:col-span-2">
                    <Field id="parentName" label="Parent's name" error={errors.parentName}>
                      <input
                        type="text"
                        autoComplete="name"
                        className={inputClasses}
                        {...fieldProps("parentName")}
                      />
                    </Field>
                  </div>
                  <Field id="phone" label="Mobile number" error={errors.phone}>
                    <input
                      type="tel"
                      autoComplete="tel"
                      className={inputClasses}
                      {...fieldProps("phone")}
                    />
                  </Field>
                  <Field id="email" label="Email" error={errors.email}>
                    <input
                      type="email"
                      autoComplete="email"
                      className={inputClasses}
                      {...fieldProps("email")}
                    />
                  </Field>
                  <Field id="grade" label="Applying for" error={errors.grade}>
                    <select className={inputClasses} {...fieldProps("grade")}>
                      <option value="">Choose a grade</option>
                      {GRADE_OPTIONS.map((grade) => (
                        <option key={grade}>{grade}</option>
                      ))}
                    </select>
                  </Field>
                  <fieldset className="flex flex-col gap-2">
                    <legend className="mb-2 font-medium">Interested in</legend>
                    <div className="flex gap-3">
                      {["Boarding", "Day school"].map((mode) => (
                        <label
                          key={mode}
                          className="flex flex-1 cursor-pointer items-center gap-2 rounded-2xl border border-line bg-paper-raised px-4 py-3.5 has-[:checked]:border-ink"
                        >
                          <input
                            type="radio"
                            name="studyMode"
                            value={mode}
                            checked={values.studyMode === mode}
                            onChange={handleChange}
                            className="accent-accent"
                          />
                          {mode}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <div className="sm:col-span-2">
                    <Field id="message" label="Anything you'd like us to know" optional>
                      <textarea rows={4} className={inputClasses} {...fieldProps("message")} />
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      Send enquiry
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
