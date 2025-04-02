'use client';

import React from 'react';

export default function Star({ favorite }) {
  return (
    <svg width="28.000000" height="28.000000" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="clip18002_331">
          <rect id="star" width="28.000000" height="28.000000" fill="white" fillOpacity="0" />
        </clipPath>
      </defs>
      <rect id="State=not rated" width="28.000000" height="28.000000" fill="#FFFFFF" fillOpacity="0" />
      <g clipPath="url(#clip18002_331)">
        <path
          id="Vector"
          d="M14 20.7L6.79 24.49L8.17 16.47L2.34 10.79L10.39 9.63L13.99 2.33L17.59 9.63L25.64 10.79L19.8 16.47L21.18 24.49L14 20.7Z"
          fill={favorite ? 'rgb(152, 84, 246)' : 'rgb(213, 214, 220)'}
          fillOpacity="1.000000"
          fillRule="nonzero"
        />
        <path
          id="Vector"
          d="M6.79 24.49L8.17 16.47L2.34 10.79L10.39 9.63L13.99 2.33L17.59 9.63L25.64 10.79L19.8 16.47L21.18 24.49L14 20.7L6.79 24.49Z"
          stroke={favorite ? 'rgb(152, 84, 246)' : 'rgb(213, 214, 220)'}
          strokeOpacity="1.000000"
          strokeWidth="2.000000"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
