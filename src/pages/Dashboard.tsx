
import React, { useState } from 'react';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Tooltip, ResponsiveContainer, 
  XAxis, YAxis, CartesianGrid, Legend, Cell
} from 'recharts';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card';
import {
  ArrowUpRight, ArrowDownRight, Users, DollarSign, 
  ShoppingCart, CreditCard, Activity, TrendingUp, MoreHorizontal
} from 'lucide-react';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger, DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

// Mock data
const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 7000 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 9000 },
  { name: 'Jul', revenue: 8000 },
  { name: 'Aug', revenue: 10000 },
  { name: 'Sep', revenue: 11000 },
  { name: 'Oct', revenue: 12000 },
  { name: 'Nov', revenue: 15000 },
  { name: 'Dec', revenue: 18000 },
];

const usersByDevice = [
  { name: 'Desktop', value: 45 },
  { name: 'Mobile', value: 35 },
  { name: 'Tablet', value: 20 },
];

const salesData = [
  { name: 'Mon', sales: 5400 },
  { name: 'Tue', sales: 6200 },
  { name: 'Wed', sales: 7800 },
  { name: 'Thu', sales: 6800 },
  { name: 'Fri', sales: 9200 },
  { name: 'Sat', sales: 11000 },
  { name: 'Sun', sales: 9000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const Dashboard = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('This Month');
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1 h-9">
                {timeRange}
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-50"><path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem onClick={() => setTimeRange('Today')}>
                Today
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange('Last 7 Days')}>
                Last 7 Days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange('This Month')}>
                This Month
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange('Last Quarter')}>
                Last Quarter
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange('This Year')}>
                This Year
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button className="h-9">Download Report</Button>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard 
          title="Total Revenue" 
          value="$85,200" 
          change="+12.5%" 
          trend="up" 
          icon={<DollarSign />} 
        />
        <StatsCard 
          title="New Users" 
          value="1,240" 
          change="+8.2%" 
          trend="up" 
          icon={<Users />} 
        />
        <StatsCard 
          title="Orders" 
          value="852" 
          change="-2.4%" 
          trend="down" 
          icon={<ShoppingCart />} 
        />
        <StatsCard 
          title="Conversion Rate" 
          value="3.24%" 
          change="+4.7%" 
          trend="up" 
          icon={<Activity />} 
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend */}
        <Card className="lg:col-span-2 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue for the current year</CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Download CSV</DropdownMenuItem>
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Share</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={revenueData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3498db" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3498db" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis 
                    tick={{ fontSize: 12 }} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => formatCurrency(value)} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                      border: 'none'
                    }}
                    formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3498db" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Users by Device */}
        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Users by Device</CardTitle>
              <CardDescription>Distribution across platforms</CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Download CSV</DropdownMenuItem>
                <DropdownMenuItem>View Details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={usersByDevice}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {usersByDevice.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Users']}
                    contentStyle={{ 
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                      border: 'none'
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sales Breakdown */}
        <Card className="lg:col-span-3 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Weekly Sales</CardTitle>
              <CardDescription>Sales performance for the current week</CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Download CSV</DropdownMenuItem>
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Share</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis 
                    tick={{ fontSize: 12 }} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => formatCurrency(value)} 
                  />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), 'Sales']}
                    contentStyle={{ 
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                      border: 'none'
                    }}
                  />
                  <Bar dataKey="sales" radius={[4, 4, 0, 0]} fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-6">
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest transactions and system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {RECENT_ACTIVITY.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`p-2 rounded-full ${activity.iconBg}`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon 
}: { 
  title: string; 
  value: string; 
  change: string; 
  trend: 'up' | 'down'; 
  icon: React.ReactNode;
}) => (
  <Card className="hover-lift">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          
          <div className="flex items-center mt-1">
            <div className={`flex items-center ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
              <span className="text-xs font-medium">{change}</span>
            </div>
            <span className="text-xs text-muted-foreground ml-2">vs previous period</span>
          </div>
        </div>
        
        <div className="p-3 rounded-full bg-primary/10">
          {React.cloneElement(icon as React.ReactElement, { className: 'h-5 w-5 text-primary' })}
        </div>
      </div>
    </CardContent>
  </Card>
);

// Recent Activity Data
const RECENT_ACTIVITY = [
  {
    icon: <CreditCard className="h-4 w-4 text-white" />,
    iconBg: 'bg-blue-500',
    title: 'New transaction complete',
    description: 'Payment received from John Doe for Premium Plan subscription.',
    time: '2 min ago'
  },
  {
    icon: <Users className="h-4 w-4 text-white" />,
    iconBg: 'bg-green-500',
    title: 'New user registered',
    description: 'Sarah Johnson created a new account with a business profile.',
    time: '40 min ago'
  },
  {
    icon: <ShoppingCart className="h-4 w-4 text-white" />,
    iconBg: 'bg-purple-500',
    title: 'New order placed',
    description: 'Order #38295 was placed for 3 items totaling $154.99.',
    time: '1 hour ago'
  },
  {
    icon: <TrendingUp className="h-4 w-4 text-white" />,
    iconBg: 'bg-amber-500',
    title: 'Milestone achieved',
    description: 'Monthly sales goal of $75,000 was reached and exceeded by 20%.',
    time: '5 hours ago'
  },
];

export default Dashboard;
