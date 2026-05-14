import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { KpiCard } from "../components/KpiCard";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie, Legend,
} from "recharts";
import { kpis, salesByMonth, trafficSources, topProducts, recentOrders } from "../mockData";

const PIE_COLORS = ["hsl(221 83% 53%)", "hsl(262 83% 58%)", "hsl(160 70% 40%)", "hsl(38 92% 50%)", "hsl(0 72% 51%)"];

const statusVariant: Record<string, string> = {
  Paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Shipped: "bg-blue-50 text-blue-700 border-blue-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Refunded: "bg-red-50 text-red-700 border-red-200",
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview of sales, traffic, and operations.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Last 30 days</Button>
          <Button size="sm">Export report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Revenue" value={`$${kpis.revenue.value.toLocaleString()}`} delta={kpis.revenue.delta} series={kpis.revenue.series} />
        <KpiCard label="Orders" value={kpis.orders.value.toLocaleString()} delta={kpis.orders.delta} series={kpis.orders.series} color="hsl(160 70% 40%)" />
        <KpiCard label="Customers" value={kpis.customers.value.toLocaleString()} delta={kpis.customers.delta} series={kpis.customers.series} color="hsl(262 83% 58%)" />
        <KpiCard label="Conversion" value={`${kpis.conversion.value}%`} delta={kpis.conversion.delta} series={kpis.conversion.series} color="hsl(38 92% 50%)" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Sales vs Visitors</CardTitle>
            <CardDescription>Monthly performance, last 12 months</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesByMonth} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
                <defs>
                  <linearGradient id="sales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(221 83% 53%)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="hsl(221 83% 53%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="visitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(262 83% 58%)" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="hsl(262 83% 58%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="visitors" stroke="hsl(262 83% 58%)" strokeWidth={2} fill="url(#visitors)" />
                <Area type="monotone" dataKey="sales" stroke="hsl(221 83% 53%)" strokeWidth={2} fill="url(#sales)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Traffic Sources</CardTitle>
            <CardDescription>Sessions by channel</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={trafficSources} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={2}>
                  {trafficSources.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Recent Orders</CardTitle>
              <CardDescription>Latest activity from your storefront</CardDescription>
            </div>
            <Button variant="ghost" size="sm">View all</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-medium">{o.id}</TableCell>
                    <TableCell>{o.customer}</TableCell>
                    <TableCell className="text-muted-foreground">{o.date}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusVariant[o.status]}>{o.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">${o.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Top Products</CardTitle>
            <CardDescription>By units sold</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} layout="vertical" margin={{ top: 0, right: 10, bottom: 0, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} width={110} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="sales" fill="hsl(221 83% 53%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
