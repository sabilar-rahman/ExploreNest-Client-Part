// import SubscriptionCard from "@/src/components/subscription/SubscriptionCard";

// const subscriptionPlans = [
//   {
//     title: "Explorer Nest",
//     price: "10",
//     features: ["You can access Premium post"],
//     expiry: "lifetime",
//     recommended: false,
//   },
// ];

// const SubscriptionPage = () => {
//   return (
//     <div className="container mx-auto">
//       <h1 className="text-4xl md:text-5xl  text-center mb-4">
//         Payment Here
//       </h1>

//       <div className="flex flex-col items-center gap-4">
//         {subscriptionPlans.map((plan, index) => (
//           <SubscriptionCard
//             key={index}
//             expiry={plan.expiry}
//             features={plan.features}
//             price={plan.price}
//             recommended={plan.recommended}
//             title={plan.title}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SubscriptionPage;

/* eslint-disable react/no-unescaped-entities */
"use client";
import { RxCross2 } from "react-icons/rx";
import { useForm } from "react-hook-form";

import Link from "next/link";

import { useRouter } from "next/navigation";
import { useCreatePaymentMutation } from "@/src/redux/featureApi/payment/paymentApi";
import { useAppSelector } from "@/src/redux/hooks";
import { IUser, useCurrentUser } from "@/src/redux/featureApi/auth/authSlice";
import { Button } from "@nextui-org/button";
import { useGetCurrentUserQuery } from "@/src/redux/featureApi/auth/authApi";
import { ReactNode } from "react";
// import { TUser } from "@/src/utils";
// import { TUser } from "@/src/utils";

// type PaymentModalProps = {
//   setOpenPaymentModal: (openPaymentModal: boolean) => void;
// };

type TPaymentData = {
  name: string;
  email: string;
  phoneNumber: string;
  userId: string;
  amount: string;
  address: string;
};

const PaymentModal = () => {
  const router = useRouter();
  const [makePayment, { isLoading }] = useCreatePaymentMutation() as any;
  // const user = (useAppSelector(useCurrentUser) as IUser) || null;

  const { data: user, isError } = useGetCurrentUserQuery({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPaymentData>();

  const handleMakePayment = async (data: TPaymentData) => {
    const paymentData = {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      userId: user?.data?._id,
      amount: "49",
      address: data.address,
    };
    console.log(paymentData);

    try {
      const response = await makePayment(paymentData).unwrap();
      console.log(response);
      if (response?.success) {
        router.push(response?.data?.payment_url);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="font-Lato">
      {/* Header */}
      <div className="bg-primary-gradient px-5 py-4 rounded-t-lg text-white flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Make Payment Securly.</h1>
          <p className="text-sm">Unlock premium contents and explore more.</p>
        </div>

        <RxCross2
          // onClick={() => setOpenPaymentModal(false)}
          className="text-2xl cursor-pointer"
        />
      </div>

      <form
        onSubmit={handleSubmit(handleMakePayment)}
        className="flex flex-col gap-4 w-full p-5"
      >
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Name */}
          <div className="flex flex-col gap-1 w-full">
            <p className="text-body-text font-medium text-sm text-[#364F53] dark:text-[#D9D9D9]/70">
              Your Name
            </p>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              id="name"
              className="bg-primary-70 px-3 py-2 rounded-md border focus:outline-none focus:border-primary-20 transition duration-300 focus:shadow flex-1 w-full pr-10"
              placeholder="Enter your name"
            />
            {errors.name && (
              <span className="text-rose-500 text-start">
                {errors.name.message as string}
              </span>
            )}
          </div>

          {/* phoneNumber */}
          <div className="flex flex-col gap-1 w-full">
            <p className="text-body-text font-medium text-sm text-[#364F53] dark:text-[#D9D9D9]/70">
              Phone Number
            </p>
            <input
              {...register("phoneNumber", {
                required: "Phone Number is required",
              })}
              type="text"
              id="phoneNumber"
              className="bg-primary-70 px-3 py-2 rounded-md border focus:outline-none focus:border-primary-20 transition duration-300 focus:shadow flex-1 w-full pr-10"
              placeholder="Enter your phoneNumber"
            />
            {errors.phoneNumber && (
              <span className="text-rose-500 text-start">
                {errors.phoneNumber.message as string}
              </span>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1 w-full">
          <p className="text-body-text font-medium text-sm text-[#364F53] dark:text-[#D9D9D9]/70">
            Email
          </p>
          <input
            {...register("email", { required: "Email is required" })}
            type="text"
            id="email"
            className="bg-primary-70 px-3 py-2 rounded-md border focus:outline-none focus:border-primary-20 transition duration-300 focus:shadow flex-1 w-full pr-10"
            placeholder="Enter your email"
          />
          {errors.email && (
            <span className="text-rose-500 text-start">
              {errors.email.message as string}
            </span>
          )}
        </div>

        {/* Address */}
        <div className="flex flex-col gap-1 w-full">
          <p className="text-body-text font-medium text-sm text-[#364F53] dark:text-[#D9D9D9]/70">
            Address
          </p>
          <input
            {...register("address", { required: "Address is required" })}
            type="text"
            id="address"
            className="bg-primary-70 px-3 py-2 rounded-md border focus:outline-none focus:border-primary-20 transition duration-300 focus:shadow flex-1 w-full pr-10"
            placeholder="Enter your address"
          />
          {errors.address && (
            <span className="text-rose-500 text-start">
              {errors.address.message as string}
            </span>
          )}
        </div>

        {/* amount */}
        <div className="flex flex-col gap-1 w-full">
          <p className="text-body-text font-medium text-sm text-[#364F53] dark:text-[#D9D9D9]/70">
            Amount
          </p>
          <div className="bg-primary-70 px-3 py-2 rounded-md border focus:outline-none focus:border-primary-20 transition duration-300 focus:shadow flex-1 w-full pr-10">
            $100
          </div>
        </div>

        {/* <button type="submit" className="w-full">
          <Button color="primary" className="w-full">
            {isLoading ? "Loading..." : "PAY NOW"}
          </Button>
        </button> */}

        {/* Submit Button */}
        <Button
          color="primary"
          className="w-full"
          isLoading={isLoading}
          type="submit"
        >
          {isLoading ? "Loading..." : "PAY NOW"}
        </Button>

        <p className="text-sm text-[#364F53] dark:text-[#D9D9D9]/50 text-center">
          Don't want to pay now?
          <Link
            // onClick={() => setOpenPaymentModal(false)}
            href={"/"}
            className="font-semibold text-primary-30"
          >
            {" "}
            Cancel
          </Link>
        </p>
      </form>
    </div>
  );
};

export default PaymentModal;
