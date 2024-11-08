import { Textarea } from "@nextui-org/input";
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

const ENTextarea = ({ label, name, variant = "bordered" }: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Textarea
      label={label}
      {...register(name)}
      errorMessage={(errors[name]?.message as string) ?? ""}
      isInvalid={!!errors[name]}
      maxRows={6}
      variant={variant}
    />
  );
};

export default ENTextarea;
