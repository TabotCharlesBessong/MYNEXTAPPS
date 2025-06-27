import React from "react";
import { MdErrorOutline } from "react-icons/md";

interface FormErrorProps {
  message?: string;
}

const FormError: React.FC<FormErrorProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-center space-x-2 rounded-md bg-red-600 p-2 text-white">
      <MdErrorOutline className="h-5 w-5" />
      <span>{message}</span>
    </div>
  );
};

export default FormError;