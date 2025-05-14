import React, { useEffect, useState } from "react";
import { StatisticsChart } from "@/components";
import { statisticsChartsData } from "@/data";
import { OrderAPI, ProductAPI } from "@/service";

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

      const start = new Date(startDate);
      const end = new Date(endDate);
      const now = new Date();

      if (end < start) {
        alert("Ngày kết thúc không được nhỏ hơn ngày bắt đầu");
        return;
      }

      if (start > now || end > now) {
        alert("Không được chọn ngày trong tương lai");
        return;
      }

      const data = { startDate, endDate };

      const [responseRevenue, responseTopSelling] = await Promise.all([
        OrderAPI.makeRevenue(data),
        ProductAPI.getTopSellingProduct(data),
      ]);

      const orders = responseRevenue.data.result;
      const topSelling = responseTopSelling.data.result;

      // === 1. Doanh thu theo ngày ===
      const revenueByDate = orders.reduce((acc, order) => {
        const date = new Date(order.createAt).toISOString().split("T")[0];
        acc[date] = (acc[date] || 0) + Number(order.totalPrice);
        return acc;
      }, {});

      const sortedDates = Object.keys(revenueByDate).sort();
      const dailyRevenue = sortedDates.map((date) => revenueByDate[date]);

      // === 2. Dữ liệu sản phẩm bán chạy ===
      const topProductNames = topSelling.map((p) => p.name);
      const topProductQuantities = topSelling.map((p) => p.quantity);

      // === 3. Cập nhật cả hai chart: revenue + sản phẩm bán chạy ===
      setChartsData((prevChartsData) =>
        prevChartsData.map((chart) => {
          const title = chart.title.toLowerCase();

          if (title.includes("revenue")) {
            return {
              ...chart,
              title: "Doanh thu theo ngày",
              description: `Từ ${startDate} đến ${endDate}`,
              chart: {
                ...chart.chart,
                series: [{ name: "Doanh thu", data: dailyRevenue }],
                options: {
                  ...chart.chart.options,
                  xaxis: {
                    ...chart.chart.options.xaxis,
                    categories: sortedDates,
                    labels: {
                      formatter: (value) =>
                        new Date(value).toLocaleDateString("vi-VN"),
                    },
                  },
                },
              },
            };
          }

          if (title.includes("sản phẩm")) {
            return {
              ...chart,
              title: "Sản phẩm bán chạy",
              description: `Từ ${startDate} đến ${endDate}`,
              chart: {
                ...chart.chart,
                series: [{ name: "Số lượng bán", data: topProductQuantities }],
                options: {
                  ...chart.chart.options,
                  xaxis: {
                    categories: topProductNames,
                  },
                },
              },
            };
          }

          return chart;
        })
      );
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu cho thống kê:", error);
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
