"use client";
import { Controller } from "react-hook-form";
import { Checkbox } from "@nextui-org/checkbox";

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

const ENCheckbox = ({ label, name }: IProps) => {
  return (
    <Controller
      name={name}
      render={({ field: { value, ...fields } }) => (
        <Checkbox {...fields} radius="full" value="premium">
          <span className="text-sm">{label}</span>
        </Checkbox>
      )}
    />
  );
};

export default ENCheckbox;
