
import React from 'react';

const BrainCircuitIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2a2.5 2.5 0 0 1 2.5 2.5V7a2.5 2.5 0 0 1-5 0V4.5A2.5 2.5 0 0 1 12 2z" />
    <path d="M7 12a2.5 2.5 0 0 1 2.5-2.5h5A2.5 2.5 0 0 1 17 12v2.5a2.5 2.5 0 0 1-2.5 2.5h-5A2.5 2.5 0 0 1 7 14.5z" />
    <path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H12" />
    <path d="M19 4.5A2.5 2.5 0 0 0 16.5 2H12" />
    <path d="M5 19.5A2.5 2.5 0 0 0 7.5 22H12" />
    <path d="M19 19.5A2.5 2.5 0 0 1 16.5 22H12" />
    <path d="M12 7v2.5" />
    <path d="M12 17v2.5" />
    <path d="M9.5 9.5H7" />
    <path d="M14.5 9.5H17" />
    <path d="M9.5 14.5H7" />
    <path d="M14.5 14.5H17" />
  </svg>
);

export default BrainCircuitIcon;