import * as React from "react";

function SvgComponent(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx={12} cy={12} r={12} transform="rotate(180 12 12)" fill="#065496" />
      <path
        d="M7.2 12.133l3.133 3.134L16.599 9"
        stroke="#fff"
        strokeWidth={1.95}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;
