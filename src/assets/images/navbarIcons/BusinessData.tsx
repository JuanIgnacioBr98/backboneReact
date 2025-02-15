import React from "react";

const BusinessData = ({ color }: { color?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_911_140)">
        <path
          d="M3 21.3253H21M3 7.32532V8.32532C3 9.12097 3.31607 9.88403 3.87868 10.4466C4.44129 11.0092 5.20435 11.3253 6 11.3253C6.79565 11.3253 7.55871 11.0092 8.12132 10.4466C8.68393 9.88403 9 9.12097 9 8.32532M3 7.32532H21M3 7.32532L5 3.32532H19L21 7.32532M9 8.32532V7.32532M9 8.32532C9 9.12097 9.31607 9.88403 9.87868 10.4466C10.4413 11.0092 11.2044 11.3253 12 11.3253C12.7956 11.3253 13.5587 11.0092 14.1213 10.4466C14.6839 9.88403 15 9.12097 15 8.32532M15 8.32532V7.32532M15 8.32532C15 9.12097 15.3161 9.88403 15.8787 10.4466C16.4413 11.0092 17.2044 11.3253 18 11.3253C18.7956 11.3253 19.5587 11.0092 20.1213 10.4466C20.6839 9.88403 21 9.12097 21 8.32532V7.32532M5 21.3253V11.1753M19 21.3253V11.1753M9 21.3253V17.3253C9 16.7949 9.21071 16.2862 9.58579 15.9111C9.96086 15.536 10.4696 15.3253 11 15.3253H13C13.5304 15.3253 14.0391 15.536 14.4142 15.9111C14.7893 16.2862 15 16.7949 15 17.3253V21.3253"
          stroke={color || "#DAC4FB"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_911_140">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default BusinessData;
