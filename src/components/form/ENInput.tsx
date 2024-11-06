// "use client";

// import { Input } from "@nextui-org/input";
// import { useFormContext } from "react-hook-form";

// interface IProps {
//   variant?: "flat" | "bordered" | "faded" | "underlined";
//   size?: "sm" | "md" | "lg";
//   required?: boolean;
//   type?: string;
//   label: string;
//   name: string;
// }

// export default function ENInput({
//   variant = "bordered",
//   size = "md",
//   required = false,
//   type = "text",
//   label,
//   name,
// }: IProps) {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   return (
//     <Input
//       {...register(name)}
//       // errorMessage={errors[name] ? (errors[name].message as string) : ""}
//       errorMessage={(errors[name]?.message as string) ?? ""}
//       isInvalid={!!errors[name]}
//       variant={variant}
//       size={size}
//       required={required}
//       type={type}
//       label={label}
//     />
//   );
// }


"use client";

import { Input } from "@nextui-org/input";
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

interface IProps extends ENInput {}

const ENInput = ({
  variant = "bordered",
  size = "md",
  isRequired = false,
  placeholder,
  type = "text",
  label,
  name,
  isReadOnly,
  isDisabled,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      // errorMessage={errors[name] ? (errors[name].message as string) : ""}
      errorMessage={(errors[name]?.message as string) ?? ""}
      isInvalid={!!errors[name]}
      {...register(name)}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      label={label}
      placeholder={placeholder}
      size={size}
      type={type}
      variant={variant}
    />
  );
};

export default ENInput;


