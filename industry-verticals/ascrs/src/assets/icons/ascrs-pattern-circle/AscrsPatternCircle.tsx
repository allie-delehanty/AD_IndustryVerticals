const AscrsPatternCircle = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="60" cy="60" r="60" fill="#003b6e" />
    <g stroke="#8bd4d6" strokeWidth="1.5" opacity="0.9">
      <circle cx="60" cy="60" r="48" />
      <circle cx="60" cy="60" r="36" />
      <circle cx="60" cy="60" r="24" />
      <circle cx="60" cy="60" r="12" />
      <path d="M12 60 Q36 36 60 60 T108 60" />
      <path d="M12 60 Q36 84 60 60 T108 60" />
      <path d="M60 12 Q84 36 60 60 T60 108" />
      <path d="M60 12 Q36 36 60 60 T60 108" />
    </g>
  </svg>
);

export default AscrsPatternCircle;
