function SpinnerButton() {
  return (
    <div className="spinner-border spinner-border-sm" role="status">
      <span className="visually-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-spin h-5 w-5 mr-2"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray="80"
            strokeDashoffset="60"
          />
        </svg>
      </span>
    </div>
  );
}

export default SpinnerButton;
