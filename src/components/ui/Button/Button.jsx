const baseClasses =
  "group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium";

// Each variant = resting colours + the colour of the fill that sweeps in on hover
// + the text colour once the fill is behind it (hover and keyboard focus alike).
const variants = {
  primary: {
    rest: "bg-accent text-on-accent",
    fill: "bg-ink",
    hover: "group-hover:text-paper group-focus-visible:text-paper",
  },
  secondary: {
    rest: "border border-line text-ink",
    fill: "bg-ink",
    hover: "group-hover:text-paper group-focus-visible:text-paper",
  },
  inverse: {
    rest: "border border-on-band/30 text-on-band",
    fill: "bg-accent",
    hover: "group-hover:text-on-accent group-focus-visible:text-on-accent",
  },
};

const sizes = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

// Renders a real <a> when given an href and a real <button> otherwise, so
// links navigate and actions act — never a div pretending to be either.
export default function Button({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}) {
  const { rest: restClasses, fill, hover } = variants[variant];
  const classes = `${baseClasses} ${restClasses} ${sizes[size]} ${className}`;

  // The fill is scaled on X from the left edge, so the hover is a pure transform.
  const content = (
    <>
      <span
        aria-hidden="true"
        className={`absolute inset-0 -z-10 origin-left scale-x-0 ${fill} transition-transform duration-500 ease-out-expo group-hover:scale-x-100 group-focus-visible:scale-x-100`}
      />
      <span className={hover}>{children}</span>
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
