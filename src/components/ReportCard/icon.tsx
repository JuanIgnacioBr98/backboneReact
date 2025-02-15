import * as React from "react";

function SvgComponent(props) {
  return (
    <svg width={24} height={22} viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#clip0_3155_3939)" fill="#596275">
        <path d="M2.007 6.152c.54 1.052 1.41 1.68 2.4 2.168 2.31 1.134 4.787 1.467 7.323 1.461 2.483-.005 4.91-.344 7.172-1.446 1.004-.489 1.888-1.126 2.403-2.304 0 1.085.059 2.057-.019 3.019-.064.799-.62 1.362-1.238 1.83-1.324 1-2.862 1.489-4.462 1.789-3.338.624-6.646.528-9.89-.551-1.036-.345-2.01-.817-2.81-1.586-.587-.563-.912-1.23-.884-2.067.024-.77.005-1.542.005-2.314v.001zM21.33 15.085c0 .878.02 1.757-.005 2.634-.027.924-.569 1.569-1.26 2.096-1.394 1.06-3.022 1.55-4.712 1.845-3.22.561-6.412.462-9.542-.554-1.088-.353-2.112-.837-2.948-1.649-.57-.554-.886-1.208-.862-2.025.023-.784.005-1.57.005-2.493.712 1.555 1.97 2.268 3.348 2.74 4.301 1.475 8.619 1.472 12.897-.105 1.272-.47 2.422-1.17 3.08-2.489z" />
        <path d="M2.007 10.62c.536 1.06 1.417 1.705 2.425 2.187 2.647 1.265 5.47 1.562 8.356 1.424 2.09-.102 4.136-.46 6.042-1.385 1.036-.502 1.953-1.142 2.49-2.366 0 1.072.048 2.012-.014 2.945-.054.825-.587 1.414-1.217 1.9-1.3 1.002-2.819 1.5-4.4 1.8-3.405.644-6.781.56-10.089-.565-1-.34-1.938-.807-2.712-1.55-.587-.563-.914-1.23-.886-2.066.024-.774.005-1.549.005-2.323zM11.663 8.6c5.337 0 9.664-1.925 9.664-4.3S17 0 11.663 0 2 1.925 2 4.3s4.326 4.3 9.663 4.3z" />
      </g>
      <defs>
        <clipPath id="clip0_3155_3939">
          <path fill="#fff" transform="translate(2)" d="M0 0H19.3381V22H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgComponent;
