import { Select } from "antd";
import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = {
  2024: [
    { month: "Jan", value: 100 },
    { month: "Feb", value: 90 },
    { month: "Mar", value: 300 },
    { month: "Apr", value: 250 },
    { month: "May", value: 300 },
    { month: "Jun", value: 20 },
    { month: "Jul", value: 400 },
    { month: "Aug", value: 250 },
    { month: "Sep", value: 700 },
    { month: "Oct", value: 50 },
    { month: "Nov", value: 600 },
    { month: "Dec", value: 155 },
  ],
  2023: [
    { month: "Jan", value: 100 },
    { month: "Feb", value: 90 },
    { month: "Mar", value: 300 },
    { month: "Apr", value: 250 },
    { month: "May", value: 300 },
    { month: "Jun", value: 20 },
    { month: "Jul", value: 400 },
    { month: "Aug", value: 250 },
    { month: "Sep", value: 700 },
    { month: "Oct", value: 50 },
    { month: "Nov", value: 600 },
    { month: "Dec", value: 155 },
  ],
  2022: [
    { month: "Jan", value: 80 },
    { month: "Feb", value: 130 },
    { month: "Mar", value: 180 },
    { month: "Apr", value: 230 },
    { month: "May", value: 280 },
    { month: "Jun", value: 330 },
    { month: "Jul", value: 380 },
    { month: "Aug", value: 430 },
    { month: "Sep", value: 480 },
    { month: "Oct", value: 530 },
    { month: "Nov", value: 580 },
    { month: "Dec", value: 630 },
  ],
};

const BookingGrowth = () => {
  const [year, setYear] = useState("2024");

  const handleYearChange = (value) => {
    setYear(value);
  };

  const items = [
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
  ];

  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold text-gray-800">
          Booking Growth
        </p>

        <Select
          defaultValue="2024"
          onChange={handleYearChange}
          options={items}
          className="w-32"
        />
      </div>

      {/* Chart */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data[year]}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E63946" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#E63946" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#edc4c500" />
            <XAxis dataKey="month" stroke="#6b7280"  tick={{ fontSize: 12, fontWeight: 500 }}/>
            <YAxis stroke="#6b7280"  tick={{ fontSize: 12, fontWeight: 500 }}/>
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", borderRadius: "8px" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="white"
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BookingGrowth;
