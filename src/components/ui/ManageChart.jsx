import React, { useEffect, useState } from "react";
import { StatisticsChart } from "@/components";
import { statisticsChartsData } from "@/data";
import { OrderAPI } from "@/service";

const ManageChart = () => {
  const [chartsData, setChartsData] = useState(statisticsChartsData);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchRevenueData = async (startDate, endDate) => {
    try {
      if (!startDate || !endDate) {
        alert("Vui lòng chọn cả ngày bắt đầu và kết thúc");
        return;
      }

      const data = { startDate, endDate };
      const response = await OrderAPI.makeRevenue(data);
      const orders = response.data.result;

      // Xử lý dữ liệu doanh thu theo ngày
      const revenueByDate = orders.reduce((acc, order) => {
        const date = new Date(order.createAt).toISOString().split("T")[0];
        acc[date] = (acc[date] || 0) + Number(order.totalPrice);
        return acc;
      }, {});

      const sortedDates = Object.keys(revenueByDate).sort();
      const dailyRevenue = sortedDates.map((date) => revenueByDate[date]);

      // Cập nhật chỉ chart Revenue
      setChartsData((prevChartsData) =>
        prevChartsData.map((chart) => {
          if (chart.title.toLowerCase().includes("revenue")) {
            return {
              ...chart,
              title: "Doanh thu theo ngày",
              description: `Từ ${startDate} đến ${endDate}`,
              chart: {
                ...chart.chart,
                series: [
                  {
                    name: "Doanh thu",
                    data: dailyRevenue,
                  },
                ],
                options: {
                  ...chart.chart.options,
                  xaxis: {
                    ...chart.chart.options.xaxis,
                    categories: sortedDates,
                    labels: {
                      formatter: function (value) {
                        return new Date(value).toLocaleDateString("vi-VN");
                      },
                    },
                  },
                },
              },
            };
          }
          return chart;
        })
      );
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu doanh thu:", error);
    }
  };

  useEffect(() => {
    console.log("Dữ liệu chart hiện tại:", chartsData);
  }, [chartsData]);

  return (
    <div className="mt-12">
      <div className="mb-6 flex items-center gap-4 justify-end">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm"
        />
        <button
          onClick={() => fetchRevenueData(startDate, endDate)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
          Xem doanh thu
        </button>
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {chartsData.map((props, index) => (
          <StatisticsChart key={`${props.title}-${index}`} {...props} />
        ))}
      </div>
    </div>
  );
};

export default ManageChart;
