import React from "react";
import { style } from "./style";

const SvgIcon = ({ onClick, disabled }) => (
  <div
    onClick={!disabled ? onClick : undefined}
    style={{
      ...style.btn,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <g fill="#065496" clipPath="url(#clip0_3164_944)">
        <path d="M10.666 13.253V9.667c0-2.764-.004-5.528-.003-8.293 0-.818.546-1.377 1.329-1.374.786.003 1.327.56 1.327 1.376q.002 5.784.001 11.566v.4c.18-.156.308-.26.427-.371 1.303-1.236 2.601-2.475 3.907-3.709.65-.612 1.59-.55 2.092.127.393.53.321 1.157-.213 1.67-1.03.985-2.068 1.963-3.101 2.944-1.136 1.08-2.273 2.157-3.406 3.24-.61.583-1.424.604-2.018.04l-6.533-6.205c-.518-.493-.626-1.091-.29-1.612.482-.747 1.467-.846 2.146-.205a958 958 0 0 1 4.001 3.799c.084.08.123.203.184.305l.152-.113z"></path>
        <path d="M11.978 23.99c-2.725 0-5.45.024-8.176-.007C1.795 23.96.08 22.319.02 20.414c-.03-.9-.018-1.8-.009-2.7.007-.744.574-1.288 1.317-1.294.732-.006 1.324.537 1.343 1.273.02.752 0 1.504.002 2.256 0 1.063.5 1.532 1.615 1.531H19.4c.157 0 .313.003.47-.001.914-.024 1.43-.507 1.443-1.372.011-.646-.002-1.292 0-1.938 0-.222-.006-.447.025-.666.088-.625.672-1.095 1.322-1.083.678.012 1.273.466 1.295 1.103.037 1.068.095 2.149-.032 3.205-.234 1.94-1.928 3.269-4.003 3.27-2.646.003-5.294 0-7.94 0z"></path>
      </g>
      <defs>
        <clipPath id="clip0_3164_944">
          <path fill="#fff" d="M0 0h24v24H0z"></path>
        </clipPath>
      </defs>
    </svg>
  </div>
);

export default SvgIcon;
