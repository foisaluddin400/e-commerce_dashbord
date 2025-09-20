import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import React, { useEffect, useMemo, useState } from "react";
import { Select } from "antd";

const UserGrowthChart = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [years, setYears] = useState([]);

  useEffect(() => {
    const startYear = 2024;
    const yearsArray = Array.from(
      { length: currentYear - startYear + 1 },
      (_, index) => startYear + index
    );
    setYears(yearsArray);
  }, [currentYear]);

  const { monthlyData, maxUsers } = useMemo(() => {
    const monthMap = {
      Jan: 450,
      Feb: 200,
      Mar: 800,
      Apr: 400,
      May: 230,
      Jun: 400,
      Jul: 450,
      Aug: 500,
      Sep: 550,
      Oct: 600,
      Nov: 650,
      Dec: 700,
    };

    const maxUsers = Math.max(...Object.values(monthMap), 0) + 4;

    return {
      monthlyData: Object.keys(monthMap).map((month) => ({
        name: month,
        totalUser: monthMap[month],
      })),
      maxUsers,
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <div className="flex justify-between items-center">
        <h3
          style={{
            textAlign: "left",
            marginBottom: "15px",
            color: "#333",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          📈 User Growth
        </h3>
        <Select
          className="min-w-32"
          value={year}
          placeholder="Select year"
          onChange={setYear}
          style={{
            marginBottom: "15px",
            width: "150px",
            fontWeight: "500",
          }}
          options={years.map((item) => ({ value: item, label: item }))}
        />
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={monthlyData}
          margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="url(#colorValue)" stopOpacity={1} />
              <stop offset="95%" stopColor="#14803c" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#edc4c500" />
          <XAxis
            dataKey="name"
            stroke="#333"
            tick={{ fontSize: 12, fontWeight: 500 }}
          />
          <YAxis
            stroke="#333"
            domain={[0, maxUsers]}
            tick={{ fontSize: 12, fontWeight: 500 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "8px",
            }}
            cursor={{ fill: "#edc4c52d" }}
          />
          <Legend wrapperStyle={{ fontSize: "13px", fontWeight: "bold" }} />
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E63946" stopOpacity={0.9} />

              <stop offset="95%" stopColor="#ffd4d8" stopOpacity={0.7} />
            </linearGradient>
          </defs>

          <Bar
            dataKey="totalUser"
            fill="url(#colorValue)"
            barSize={45}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserGrowthChart;
