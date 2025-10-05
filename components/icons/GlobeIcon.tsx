import React from 'react';

const GlobeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12,2 C14.76,5.33 14.76,18.67 12,22 C9.24,18.67 9.24,5.33 12,2 Z" />
  </svg>
);

export default GlobeIcon;