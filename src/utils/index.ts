import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  success: boolean;
  message: string;
};

export type TApiResponse<T> = TResponse<T> & BaseQueryApi;

// export type TUser = {
//   _id: string;
//   name: string;
//   email: string;
//   password: string;
//   role: string;
//   img: string;
//   verified: boolean;
//   followers: any[];
//   following: any[];
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// };

export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  gender: string;
  role: string;
  profileImage: string;
  bio: any;
  birthDate: string;
  status: string;
  mobileNumber: string;
  address: any;
  isVerified: boolean;
  followers: any[];
  following: any[];
  bookmarkPosts: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};



export type TComment = {
  _id: string;
  post: string;
  commenter: TUser;
  comment: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};




// export interface TPayment {
//   _id: string;
//   user: TUser;
//   amount: number;
//   paymentMethod?: string;
//   status: "Active" | "Expired";
//   transactionId: string;
//   planTitle: string;
//   planPrice: number;
//   expiryDate: Date;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }