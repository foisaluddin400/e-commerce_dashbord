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
import { useGetEarningGrowthQuery, useGetUserGrowthQuery } from "../../page/redux/api/metaApi";

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const ShopRegister = () => {
  const { data: userGrowthData, isLoading } = useGetEarningGrowthQuery();
  const currentYear = new Date().getFullYear();

  const [year, setYear] = useState(currentYear);
  const [years, setYears] = useState([]);

  useEffect(() => {
    const startYear = 2024;
    setYears(
      Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => startYear + i
      )
    );
  }, [currentYear]);

const { monthlyData, maxUsers } = useMemo(() => {
  if (!userGrowthData?.data) {
    return { monthlyData: [], maxUsers: 100 };
  }

  const formattedData = userGrowthData.data.map(item => ({
    name: MONTH_NAMES[item.month - 1],
    totalUser: item.total === 0 ? 1 : item.total,
    originalValue: item.total,
  }));

  const maxValue = Math.max(
    ...userGrowthData.data.map(d => d.total),
    0
  );

  return {
    monthlyData: formattedData,
    maxUsers: maxValue === 0 ? 10 : maxValue + 100,
  };
}, [userGrowthData]);


  if (isLoading) return <p>Loading...</p>;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">📈 Earning Growth</h3>

        <Select
          value={year}
          onChange={setYear}
          options={years.map(y => ({ value: y, label: y }))}
          style={{ width: 150 }}
        />
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, maxUsers]} />
         <Tooltip
  formatter={(value, name, props) => {
    return props.payload.originalValue;
  }}
/>

          <Legend />

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

export default ShopRegister;
