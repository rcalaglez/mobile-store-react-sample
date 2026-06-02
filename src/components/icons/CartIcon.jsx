export default function CartIcon({ className = "" }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`stroke-current ${className}`}
    >
      <path
        d="M6.5 6.5h13l-1.4 7.2a2 2 0 0 1-2 1.6H8.7a2 2 0 0 1-2-1.7L5.3 3.8H3"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="20" r="1.2" fill="currentColor" />
      <circle cx="17" cy="20" r="1.2" fill="currentColor" />
    </svg>
  );
}