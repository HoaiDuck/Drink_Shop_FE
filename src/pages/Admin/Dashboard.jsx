import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { StatisticsCard, StatisticsChart } from "@/components/componentsAdmin";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import { billApi } from "@/service";

export function Dashboard() {
  const [chartsData, setChartsData] = useState(statisticsChartsData);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchData(year);
  }, [year]);

  const fetchData = async (selectedYear) => {
    try {
      // Fetch bill data for the selected year
      const billResponse = await billApi.getByYear(selectedYear);
      const bills = billResponse.data;
      console.log(">>>>CHECK Revenue by year:", billResponse);
      // Tính toán doanh thu theo tháng
      const revenueByMonth = {};
      bills.forEach((bill) => {
        // if (bill.status === "Paid") {
        if (bill.status) {
          const date = new Date(bill.createdAt);
          const month = date.getMonth();
          const amount = Number(bill.totalAmount);

          if (revenueByMonth[month]) {
            revenueByMonth[month] += amount;
          } else {
            revenueByMonth[month] = amount;
          }
        }
      });

      const monthlyData = Array(12)
        .fill(0)
        .map((_, index) => revenueByMonth[index] || 0);

      // Cập nhật data cho charts
      const updatedChartsData = chartsData.map((chart, index) => {
        if (index === 1) {
          // Revenue chart
          return {
            ...chart,
            chart: {
              ...chart.chart,
              series: [{ name: "Revenue", data: monthlyData }],
            },
          };
        }
        return chart;
      });

      setChartsData(updatedChartsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleYearChange = (event) => {
    setYear(Number(event.target.value));
  };

  // Tạo danh sách các năm để chọn
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i);

  return (
    <div className="mt-12">
      <div className="mb-6 flex justify-end">
        <select
          value={year}
          onChange={handleYearChange}
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {chartsData.map((props) => (
          <StatisticsChart key={props.title} {...props} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
