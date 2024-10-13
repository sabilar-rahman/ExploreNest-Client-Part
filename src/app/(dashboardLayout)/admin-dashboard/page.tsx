"use client";
import {
  FaUsers,
  FaChartLine,
  FaMoneyBillWave,
  FaFileAlt,
} from "react-icons/fa";
import { Card } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import {
  getDashboardData,
  getPaymentStats,
} from "@/src/actions/payment/payment.action";

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [payments, setPayments] = useState({
    success: true || false,
    message: "",
    data: { totalPayments: 0, paymentsPerMonth: [] },
  });
  const [dashboardData, setDashboardData] = useState({
    success: true || false,
    message: "",
    data: {
      activeUsersCount: 0,
      totalPayments: [{ totalAmount: 0 }],
      monthlyActivity: 0,
      monthlyPosts: 0,
    },
  });

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const payments: any = await getPaymentStats();

        if (payments?.success) {
          setPayments(payments);
        }
        const dashboardData: any = await getDashboardData();

        if (dashboardData?.success) {
          setDashboardData(dashboardData);
        }
      } catch (error) {
        console.error("Error fetching payment stats:", error);
      }
    };

    fetchData();
  }, []);
  // Prepare data for the line chart
  const chartData = {
    labels: payments?.data?.paymentsPerMonth.map(
      (monthData: any) => `Month ${monthData._id}`
    ),
    datasets: [
      {
        label: "Monthly Payments",
        data: payments?.data?.paymentsPerMonth.map(
          (monthData: any) => monthData.totalAmount
        ),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  return (
    <div className="w-full max w-5xl mx-auto">
      <div className="flex flex-wrap gap-4">
        <div className="w-full sm:w-1/2 lg:w-1/4">
          <Card>
            <div className="p-4">
              <div className="flex items-center">
                <FaUsers className="text-4xl mr-4" />
                <div>
                  <h3 className="text-xl font-bold">Active Users</h3>
                  <p className="text-lg">
                    {dashboardData?.data?.activeUsersCount}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="w-full sm:w-1/2 lg:w-1/4">
          <Card>
            <div className="p-4">
              <div className="flex items-center">
                <FaFileAlt className="text-4xl mr-4" />
                <div>
                  <h3 className="text-xl font-bold">Total Posts</h3>
                  <p className="text-lg">{dashboardData?.data?.monthlyPosts}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="w-full sm:w-1/2 lg:w-1/4">
          <Card>
            <div className="p-4">
              <div className="flex items-center">
                <FaMoneyBillWave className="text-4xl mr-4" />
                <div>
                  <h3 className="text-xl font-bold">Total Payments</h3>
                  <p className="text-lg">
                    {dashboardData?.data?.totalPayments[0].totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="w-full sm:w-1/2 lg:w-1/4">
          <Card>
            <div className="p-4">
              <div className="flex items-center">
                <FaChartLine className="text-4xl mr-4" />
                <div>
                  <h3 className="text-xl font-bold">Monthly Activity</h3>
                  <p className="text-lg">
                    {dashboardData?.data?.monthlyActivity}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Payment Overview</h2>
        {chartData.datasets.length && <Line data={chartData} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
