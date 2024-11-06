import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { useRouter } from "next/navigation";
import { FaCrown } from "react-icons/fa";

const PremiumCard = () => {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-lg flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center gap-3 py-6">
          <h2 className="text-3xl font-bold">🌍 Discover the World🌍</h2>
          <span>with, Explore Nest Premium! </span>
        </CardHeader>

        <CardBody className="flex flex-col items-center justify-center py-4 px-6">
          {/* <p className="text-lg text-default-600 mb-6 text-center">
          Discover ways to make your trip smooth, budget-friendly, and hassle-free
          </p> */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full">
            <Button
              className="w-full sm:w-auto"
              size="lg"
              variant="bordered"
              onClick={() => router.back()}
            >
              Go Back
            </Button>
            <Button
              className="w-full sm:w-auto"
              color="warning"
              size="lg"
              onClick={() => router.push("/subscription")}
            >
              Pay Now
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default PremiumCard;
