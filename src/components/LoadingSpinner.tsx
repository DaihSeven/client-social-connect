// components/LoadingSpinner.tsx
'use client';

import React from 'react';

type LoadingSpinnerProps = {
  text?: string;
};

export default function LoadingSpinner({ text = 'Carregando...' }: LoadingSpinnerProps) {
  return (
    <div className="flex justify-center items-center mt-6">
      <svg
        className="animate-spin h-8 w-8 text-[#40200E]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <span className="ml-2 text-[#40200E] font-medium">{text}</span>
    </div>
  );
}
