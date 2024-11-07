"use client";

import { Input } from "@nextui-org/input";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { IoMdEyeOff } from "react-icons/io";
import { BsEyeFill } from "react-icons/bs";

interface IInput {
    variant?: "flat" | "bordered" | "faded" | "underlined";
    size?: "sm" | "md" | "lg";
    required?: boolean;
    type?: string;
    placeholder?: string;
    label: string;
    name: string;
    isRequired?: boolean;
    disabled?: boolean;
    isReadOnly?: boolean;
    isDisabled?: boolean;
  }

interface IProps extends IInput {}

const PasswordManageFormInput = ({
  variant = "bordered",
  size = "md",
  placeholder,
  isRequired = false,
  type = "text",
  label,
  name,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      errorMessage={(errors[name]?.message as string) ?? ""}
      isInvalid={!!errors[name]}
      {...register(name)}
      endContent={
        <button
          aria-label="toggle password visibility"
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <IoMdEyeOff className=" text-default-400 pointer-events-none" />
          ) : (
            <BsEyeFill className=" text-default-400 pointer-events-none" />
          )}
        </button>
      }
      isRequired={isRequired}
      label={label}
      placeholder={placeholder}
      size={size}
      type={isVisible ? "text" : type}
      variant={variant}
    />
  );
};

export default PasswordManageFormInput;
