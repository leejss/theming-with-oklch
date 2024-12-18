const primaryBgClasses = [
  "bg-primary-50",
  "bg-primary-100",
  "bg-primary-200",
  "bg-primary-300",
  "bg-primary-400",
  "bg-primary-500",
  "bg-primary-600",
  "bg-primary-700",
  "bg-primary-800",
  "bg-primary-900",
  "bg-primary-950",
];

const accentBgClasses = [
  "bg-accent-50",
  "bg-accent-100",
  "bg-accent-200",
  "bg-accent-300",
  "bg-accent-400",
  "bg-accent-500",
  "bg-accent-600",
  "bg-accent-700",
  "bg-accent-800",
  "bg-accent-900",
  "bg-accent-950",
];

const secondaryBgClasses = [
  "bg-secondary-50",
  "bg-secondary-100",
  "bg-secondary-200",
  "bg-secondary-300",
  "bg-secondary-400",
  "bg-secondary-500",
  "bg-secondary-600",
  "bg-secondary-700",
  "bg-secondary-800",
  "bg-secondary-900",
  "bg-secondary-950",
];

const errorBgClasses = [
  "bg-error-50",
  "bg-error-100",
  "bg-error-200",
  "bg-error-300",
  "bg-error-400",
  "bg-error-500",
  "bg-error-600",
  "bg-error-700",
  "bg-error-800",
  "bg-error-900",
  "bg-error-950",
];

export default function HomePage() {
  return (
    <div className="grid grid-cols-3">
      <div>
        {primaryBgClasses.map((className) => (
          <div className={className + " p-4 text-bold text-xl"} key={className}>
            {className}
          </div>
        ))}
      </div>
      <div>
        {accentBgClasses.map((className) => (
          <div className={className + " p-4 text-bold text-xl"} key={className}>
            {className}
          </div>
        ))}
      </div>
      <div>
        {secondaryBgClasses.map((className) => (
          <div className={className + " p-4 text-bold text-xl"} key={className}>
            {className}
          </div>
        ))}
      </div>
      <div>
        {errorBgClasses.map((className) => (
          <div className={className + " p-4 text-bold text-xl"} key={className}>
            {className}
          </div>
        ))}
      </div>
    </div>
  );
}
