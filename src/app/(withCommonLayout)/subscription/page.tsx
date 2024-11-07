import SubscriptionCard from "@/src/components/subscription/SubscriptionCard";

const subscriptionPlans = [
  {
    title: "Explorer Nest",
    price: "10",
    features: ["You can access Premium post"],
    expiry: "lifetime",
    recommended: false,
  },
];

const SubscriptionPage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl md:text-5xl  text-center mb-4">
        Payment Here
      </h1>

      <div className="flex flex-col items-center gap-4">
        {subscriptionPlans.map((plan, index) => (
          <SubscriptionCard
            key={index}
            expiry={plan.expiry}
            features={plan.features}
            price={plan.price}
            recommended={plan.recommended}
            title={plan.title}
          />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPage;
