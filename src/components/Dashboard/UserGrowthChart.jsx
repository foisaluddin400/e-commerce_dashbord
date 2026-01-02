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
import { useGetUserGrowthQuery } from "../../page/redux/api/metaApi";

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const UserGrowthChart = () => {
  const { data: userGrowthData, isLoading } = useGetUserGrowthQuery();
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
      return { monthlyData: [], maxUsers: 0 };
    }

    const formattedData = userGrowthData.data.map(item => ({
      name: MONTH_NAMES[item.month - 1],
      totalUser: item.total,
    }));

    const maxUsers =
      Math.max(...formattedData.map(d => d.totalUser), 0) + 100;

    return { monthlyData: formattedData, maxUsers };
  }, [userGrowthData]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">📈 User Growth</h3>

        <Select
          value={year}
          onChange={setYear}
          options={years.map(y => ({ value: y, label: y }))}
          style={{ width: 150 }}
        />
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, maxUsers]} />
          <Tooltip />
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

export default UserGrowthChart;
