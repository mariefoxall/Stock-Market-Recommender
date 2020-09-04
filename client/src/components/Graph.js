import React from "react";
import {
  AreaChart,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";

const Graph = ({ stockPriceArray }) => {
  const data = stockPriceArray;

  return (
    <AreaChart
      width={450}
      height={380}
      data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="price" stroke="#8884d8" fill="#8884d8" />
      <Area
        type="monotone"
        dataKey="socialMediaCount"
        stroke="var(--mint-green)"
        fill="var(--mint-green)"
      />
    </AreaChart>
  );
};

export default Graph;
