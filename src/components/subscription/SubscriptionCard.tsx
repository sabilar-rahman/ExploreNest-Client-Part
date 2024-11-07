"use client";

import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
// import { useAppSelector } from "@/src/redux/hook";
import { useCurrentUser } from "@/src/redux/featureApi/auth/authSlice";
import { useCreatePaymentMutation } from "@/src/redux/featureApi/payment/paymentApi";
import { useAppSelector } from "@/src/redux/hooks";

interface SubscriptionCardProps {
  title: string;
  price: string;
  features: string[];
  expiry: string;
  recommended?: boolean;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  title,
  price,
  features,
  expiry,
  recommended = false,
}) => {
  const [createPayment] = useCreatePaymentMutation();
  const user = useAppSelector(useCurrentUser);

  const handlePayment = async () => {
    const subscriptionData = {
      user: user?._id,
      title,
      price,
      expiry,
    };

    const res = await createPayment(subscriptionData);

    if (res) {
      window.location.href = res?.data?.data?.payment_url;
    }
  };

  return (
    <Card
      className={` ${recommended ? " border-2" : ""}`}
      shadow="lg"
    >
      <CardHeader className="flex flex-col items-center pb-0 pt-2 px-4">
        <h2 className="text-2xl font-bold ">{title}</h2>
        {recommended && (
          <Chip className="mt-2" color="warning" variant="flat">
            Recommended
          </Chip>
        )}
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <div className="flex justify-center items-baseline my-8">
          <span className="text-5xl font-extrabold">${price}</span>
          <span className="text-xl text-default-500 ml-1">/{expiry}</span>
        </div>
        <ul className="space-y-4 mb-6">
          {features.map((feature, index) => (
            <span className="break-words"> {feature}</span>
          ))}
        </ul>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          className="w-full"
          color="primary"
          size="lg"
          onClick={handlePayment}
        >
          Click to payment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionCard;
