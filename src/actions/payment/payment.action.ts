"use server";

import nexiosInstance from "@/src/config/nexios.config";

export const getPaymentStats = async () => {
  try {
    const response = await nexiosInstance.get("/payment/paymentStats");

    return response?.data;
  } catch (error) {
    console.log("payment stats error =>", error);
  }
};

export const getDashboardData = async () => {
  try {
    const dashboardData = await nexiosInstance.get("/payment/dashboard-data");

    return dashboardData?.data;
  } catch (error) {
    console.log("error dashboard data fetch =>", error);
  }
};