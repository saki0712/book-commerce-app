"use client";

import React from "react";
import { ClipLoader } from "react-spinners";
import colors from "tailwindcss/colors";

const LoadingSpinner = () => {
  const size = 50;
  const color = colors.emerald[500];

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ClipLoader size={size} color={color} />
    </div>
  );
};

export default LoadingSpinner;
