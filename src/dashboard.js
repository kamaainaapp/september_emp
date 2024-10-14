import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const employeeData = [
  { name: "Cheryl", orderCount: 176, orderTotal: 8252.31, avgOrderValue: 46.89, avgTurnTime: 40 },
  { name: "Taryn", orderCount: 158, orderTotal: 10423.03, avgOrderValue: 65.97, avgTurnTime: 42 },
  { name: "Hannah", orderCount: 462, orderTotal: 31878.52, avgOrderValue: 69.00, avgTurnTime: 40 },
  { name: "Shannon", orderCount: 164, orderTotal: 12230.62, avgOrderValue: 74.58, avgTurnTime: 46 },
  { name: "Hailey", orderCount: 335, orderTotal: 18390.11, avgOrderValue: 54.90, avgTurnTime: 32 },
  { name: "Nikki", orderCount: 145, orderTotal: 11425.71, avgOrderValue: 78.80, avgTurnTime: 48 },
  { name: "Carey", orderCount: 450, orderTotal: 19259.50, avgOrderValue: 42.80, avgTurnTime: 21 },
  { name: "Warren", orderCount: 121, orderTotal: 4633.04, avgOrderValue: 38.29, avgTurnTime: 60 },
  { name: "Nick", orderCount: 42, orderTotal: 2047.30, avgOrderValue: 48.75, avgTurnTime: 40 },
  { name: "Noe", orderCount: 19, orderTotal: 932.57, avgOrderValue: 49.08, avgTurnTime: 35 },
  { name: "Amija", orderCount: 64, orderTotal: 3401.39, avgOrderValue: 53.15, avgTurnTime: 54 },
  { name: "Andrew", orderCount: 113, orderTotal: 8760.31, avgOrderValue: 77.52, avgTurnTime: 46 },
  { name: "Makoa", orderCount: 93, orderTotal: 4998.26, avgOrderValue: 53.74, avgTurnTime: 37 }
];

const salesData = {
  "Food": [
    { name: "Hannah", value: 23160.00 },
    { name: "Carey", value: 19254.00 },
    { name: "Hailey", value: 16458.50 },
    { name: "Shannon", value: 8835.00 },
    { name: "Nikki", value: 8061.00 },
    { name: "Taryn", value: 7973.00 },
    { name: "Andrew", value: 6312.00 },
    { name: "Cheryl", value: 4868.50 },
    { name: "Makoa", value: 4046.50 },
    { name: "Warren", value: 2396.00 },
    { name: "Amija", value: 1910.25 },
    { name: "Nick", value: 1387.50 },
    { name: "Noe", value: 829.00 }
  ],
  "NA Beverage": [
    { name: "Hannah", value: 1924.00 },
    { name: "Hailey", value: 889.00 },
    { name: "Shannon", value: 605.00 },
    { name: "Taryn", value: 538.00 },
    { name: "Nikki", value: 651.00 },
    { name: "Makoa", value: 498.00 },
    { name: "Carey", value: 344.00 },
    { name: "Andrew", value: 382.00 },
    { name: "Cheryl", value: 401.00 },
    { name: "Nick", value: 90.00 },
    { name: "Amija", value: 83.00 },
    { name: "Noe", value: 50.00 },
    { name: "Warren", value: 49.00 }
  ],
  "Liquor": [
    { name: "Hannah", value: 4018.12 },
    { name: "Warren", value: 2410.38 },
    { name: "Shannon", value: 2148.35 },
    { name: "Cheryl", value: 1873.60 },
    { name: "Amija", value: 1387.63 },
    { name: "Nikki", value: 1460.55 },
    { name: "Taryn", value: 1238.20 },
    { name: "Andrew", value: 1158.11 },
    { name: "Hailey", value: 1073.10 },
    { name: "Makoa", value: 517.00 },
    { name: "Nick", value: 454.80 },
    { name: "Carey", value: 308.00 },
    { name: "Noe", value: 42.00 }
  ],
  "Bottled Beer": [
    { name: "Hannah", value: 636.00 },
    { name: "Warren", value: 547.00 },
    { name: "Shannon", value: 281.00 },
    { name: "Nikki", value: 236.00 },
    { name: "Cheryl", value: 223.00 },
    { name: "Hailey", value: 176.00 },
    { name: "Andrew", value: 137.00 },
    { name: "Amija", value: 112.00 },
    { name: "Taryn", value: 78.00 },
    { name: "Carey", value: 45.00 },
    { name: "Nick", value: 33.00 },
    { name: "Makoa", value: 25.00 },
    { name: "Noe", value: 16.00 }
  ],
  "Wine": [
    { name: "Hannah", value: 1045.00 },
    { name: "Nikki", value: 465.00 },
    { name: "Andrew", value: 379.00 },
    { name: "Warren", value: 316.00 },
    { name: "Cheryl", value: 351.00 },
    { name: "Amija", value: 286.00 },
    { name: "Shannon", value: 281.00 },
    { name: "Hailey", value: 269.00 },
    { name: "Taryn", value: 310.00 },
    { name: "Carey", value: 91.00 },
    { name: "Nick", value: 55.00 },
    { name: "Noe", value: 28.00 },
    { name: "Makoa", value: 26.00 }
  ],
  "Draft Beer": [
    { name: "Hannah", value: 1999.00 },
    { name: "Cheryl", value: 1217.00 },
    { name: "Nikki", value: 872.00 },
    { name: "Andrew", value: 682.00 },
    { name: "Warren", value: 674.00 },
    { name: "Shannon", value: 670.00 },
    { name: "Taryn", value: 557.00 },
    { name: "Hailey", value: 481.00 },
    { name: "Carey", value: 301.00 },
    { name: "Amija", value: 197.00 },
    { name: "Nick", value: 162.00 },
    { name: "Makoa", value: 114.00 },
    { name: "Noe", value: 20.00 }
  ]
};

const calculateAverage = (data, key) => {
  const sum = data.reduce((acc, curr) => acc + curr[key], 0);
  return Number((sum / data.length).toFixed(2)); // Round to 2 decimal places
};

const PerformanceChart = ({ data, dataKey, title }) => {
  const sortedData = [...data].sort((a, b) => b[dataKey] - a[dataKey]);
  const average = calculateAverage(data, dataKey);

  return (
    <Card className="w-full mt-4">
      <CardHeader>{title}</CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sortedData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={80} />
            <Tooltip />
            <Legend />
            <Bar dataKey={dataKey} fill="#8884d8" name={title} />
            <Bar dataKey={() => average} fill="#82ca9d" name={`Company Average (${average})`} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const SalesCategoryChart = ({ data, category }) => {
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  return (
    <Card className="w-full mt-4">
      <CardHeader>{category} Sales</CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sortedData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={80} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" name={`${category} Sales`} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("Food");

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Employee Performance Dashboard</h1>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales by Category</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <PerformanceChart data={employeeData} dataKey="orderCount" title="Order Count" />
          <PerformanceChart data={employeeData} dataKey="orderTotal" title="Order Total ($)" />
          <PerformanceChart data={employeeData} dataKey="avgOrderValue" title="Average Order Value ($)" />
          <PerformanceChart data={employeeData} dataKey="avgTurnTime" title="Average Turn Time (minutes)" />
        </TabsContent>
        <TabsContent value="sales">
          <Select onValueChange={setSelectedCategory} defaultValue={selectedCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select sales category" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(salesData).map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <SalesCategoryChart data={salesData[selectedCategory]} category={selectedCategory} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;