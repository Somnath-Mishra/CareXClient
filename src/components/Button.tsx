
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: string;
  textColor?: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  bgColor = "bg-blue-500",
  textColor = "text-white",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`${bgColor} ${textColor} py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
