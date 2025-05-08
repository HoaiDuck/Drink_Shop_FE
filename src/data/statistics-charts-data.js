import { chartsConfig } from "@/configs";

// Định nghĩa cấu trúc chart, không có data cứng
export const chartConfigs = {
  websiteViews: {
    type: "bar",
    height: 220,
    options: {
      ...chartsConfig,
      colors: "#388e3c",
      plotOptions: {
        bar: {
          columnWidth: "16%",
          borderRadius: 5,
        },
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    },
  },

  revenue: {
    type: "line",
    height: 220,
    options: {
      ...chartsConfig,
      colors: ["#0288d1"],
      stroke: {
        lineCap: "round",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        labels: {
          formatter: (value) => `$${value.toLocaleString()}`,
        },
      },
    },
  },

  tasks: {
    type: "line",
    height: 220,
    options: {
      ...chartsConfig,
      colors: ["#388e3c"],
      stroke: {
        lineCap: "round",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
  },
};

// Export cấu trúc cơ bản của charts, data sẽ được cập nhật sau
export const statisticsChartsData = [
  {
    color: "white",
    title: "Sản phẩm bán chạy",
    description: "Last Campaign Performance",
    footer: "campaign sent 2 days ago",
    chart: {
      ...chartConfigs.websiteViews,
      series: [{ name: "Views", data: [] }],
    },
  },
  {
    color: "white",
    title: "Monthly Revenue",
    description: "Revenue performance by month",
    footer: "updated just now",
    chart: {
      ...chartConfigs.revenue,
      series: [{ name: "Revenue", data: [] }],
    },
  },
  {
    color: "white",
    title: "Số lượng truy cập",
    description: "Last Campaign Performance",
    footer: "just updated",
    chart: {
      ...chartConfigs.tasks,
      series: [{ name: "Tasks", data: [] }],
    },
  },
];

export default statisticsChartsData;
