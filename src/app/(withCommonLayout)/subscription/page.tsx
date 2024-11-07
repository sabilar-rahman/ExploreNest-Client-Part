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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8 justify-items-center">
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
