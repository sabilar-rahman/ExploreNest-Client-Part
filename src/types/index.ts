import { SVGProps } from "react";
import { TUser } from "../utils";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// export interface ENInput {
//   variant?: 'flat' | 'bordered' | 'faded' | 'underlined'
//   size?: 'sm' | 'md' | 'lg'
//   required?: boolean
//   type?: string
//   placeholder?: string
//   label: string
//   name: string
//   isRequired?: boolean
//   disabled?: boolean
// }

// export interface TPost {
//   _id: string;
//   title: string;
//   content: string;
//   description: string;
//   author: TUser;
//   image: string[];
//   category: string;
//   upvote: string[];
//   downvote: string[];
//   premium: boolean;
//   delete: boolean;
//   commentCount: number;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }


export interface TPost {
  _id: string;
  title: string;
  content: string;
  description: string;
  author: TUser;
  images: string[];
  category: string;
  upvote: string[];
  downvote: string[];
  isPremium: boolean;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  location: string;
  commentCount: number;
}
