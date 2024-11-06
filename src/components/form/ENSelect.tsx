"use client";
import { Select, SelectItem } from "@nextui-org/select";
import { useFormContext } from "react-hook-form";

// import { IInput } from "@/src/types";

export interface ENInput {
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

interface IProps extends ENInput {
  options: {
    key: string;
    label: string;
  }[];
  placeholder: string;
}

const ENSelect = ({
  options,
  label,
  name,
  placeholder,
  disabled,
  variant = "bordered",
  size = "md",
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Select
        {...register(name)}
        className="min-w-full sm:min-w-[225px]"
        errorMessage={(errors[name]?.message as string) ?? ""}
        isDisabled={disabled}
        isInvalid={!!errors[name]}
        label={label}
        placeholder={placeholder}
        size={size}
        variant={variant}
      >
        {options.map((option) => (
          <SelectItem key={option.key}>{option.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default ENSelect;
