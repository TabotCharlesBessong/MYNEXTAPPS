import React from "react";
import { MdCheckCircle } from "react-icons/md";

interface FormSuccessProps {
  message?: string;
}

const FormSuccess: React.FC<FormSuccessProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-center space-x-2 rounded-md bg-green-600 p-2 text-white">
      <MdCheckCircle className="h-5 w-5" />
      <span>{message}</span>
    </div>
  );
};

export default FormSuccess;