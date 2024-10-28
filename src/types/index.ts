import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};


export interface ENInput {
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined'
  size?: 'sm' | 'md' | 'lg'
  required?: boolean
  type?: string
  placeholder?: string
  label: string
  name: string
  isRequired?: boolean
  disabled?: boolean
}