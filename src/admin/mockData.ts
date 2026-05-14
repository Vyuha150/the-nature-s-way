// Mock data for admin panel (UI-only prototype)

export const kpis = {
  revenue: { value: 84291, delta: 12.4, series: [42, 48, 51, 55, 60, 62, 68, 72, 75, 78, 82, 84] },
  orders: { value: 1284, delta: 8.2, series: [80, 95, 110, 102, 120, 130, 128, 140, 150, 160, 170, 175] },
  customers: { value: 642, delta: 3.1, series: [40, 45, 48, 52, 55, 58, 60, 62, 64, 65, 66, 67] },
  conversion: { value: 3.84, delta: -0.4, series: [4.1, 4.0, 3.9, 4.0, 3.95, 3.88, 3.9, 3.85, 3.84, 3.86, 3.84, 3.84] },
};

export const salesByMonth = [
  { month: "Jan", sales: 4200, visitors: 12400 },
  { month: "Feb", sales: 4800, visitors: 13100 },
  { month: "Mar", sales: 5100, visitors: 14000 },
  { month: "Apr", sales: 5500, visitors: 13800 },
  { month: "May", sales: 6000, visitors: 15200 },
  { month: "Jun", sales: 6200, visitors: 15900 },
  { month: "Jul", sales: 6800, visitors: 16400 },
  { month: "Aug", sales: 7200, visitors: 17100 },
  { month: "Sep", sales: 7500, visitors: 17800 },
  { month: "Oct", sales: 7800, visitors: 18500 },
  { month: "Nov", sales: 8200, visitors: 19200 },
  { month: "Dec", sales: 8400, visitors: 19800 },
];

export const trafficSources = [
  { name: "Organic", value: 4200 },
  { name: "Direct", value: 3100 },
  { name: "Social", value: 2400 },
  { name: "Referral", value: 1500 },
  { name: "Email", value: 900 },
];

export const topProducts = [
  { id: "p1", name: "Cold-Pressed Turmeric", sales: 412, revenue: 8240, stock: 124 },
  { id: "p2", name: "Stone-Ground Moringa", sales: 388, revenue: 7760, stock: 98 },
  { id: "p3", name: "Sun-Dried Dates", sales: 341, revenue: 6820, stock: 56 },
  { id: "p4", name: "Heritage Whole Flour", sales: 298, revenue: 5960, stock: 210 },
  { id: "p5", name: "Raw Pumpkin Seeds", sales: 264, revenue: 5280, stock: 142 },
];

export const recentOrders = [
  { id: "#10284", customer: "Aarav Mehta", total: 124.5, status: "Paid", date: "2026-05-13" },
  { id: "#10283", customer: "Priya Shah", total: 86.0, status: "Shipped", date: "2026-05-13" },
  { id: "#10282", customer: "Liam Carter", total: 212.3, status: "Pending", date: "2026-05-12" },
  { id: "#10281", customer: "Noor Hassan", total: 54.9, status: "Paid", date: "2026-05-12" },
  { id: "#10280", customer: "Sofia Rossi", total: 178.4, status: "Refunded", date: "2026-05-11" },
  { id: "#10279", customer: "Kenji Watanabe", total: 96.2, status: "Paid", date: "2026-05-11" },
];

export const topCustomers = [
  { id: "u1", name: "Aarav Mehta", orders: 18, spent: 2240, ltv: 3100 },
  { id: "u2", name: "Priya Shah", orders: 14, spent: 1890, ltv: 2640 },
  { id: "u3", name: "Liam Carter", orders: 12, spent: 1620, ltv: 2200 },
  { id: "u4", name: "Noor Hassan", orders: 11, spent: 1490, ltv: 1980 },
  { id: "u5", name: "Sofia Rossi", orders: 9, spent: 1310, ltv: 1820 },
];

export const cohortRetention = [
  { week: "W1", retention: 100 },
  { week: "W2", retention: 64 },
  { week: "W3", retention: 48 },
  { week: "W4", retention: 38 },
  { week: "W5", retention: 32 },
  { week: "W6", retention: 28 },
  { week: "W7", retention: 26 },
  { week: "W8", retention: 24 },
];

export const categoryPerformance = [
  { category: "Spices", sales: 18400 },
  { category: "Grains", sales: 14200 },
  { category: "Seeds", sales: 11800 },
  { category: "Sweeteners", sales: 9400 },
  { category: "Herbs", sales: 7600 },
];
