import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Eye, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Status = "Pending" | "Paid" | "Shipped" | "Delivered" | "Refunded";
type Order = { id: string; customer: string; email: string; items: number; total: number; status: Status; date: string };

const seed: Order[] = [
  { id: "#10284", customer: "Aarav Mehta", email: "aarav@example.com", items: 3, total: 124.5, status: "Paid", date: "2026-05-13" },
  { id: "#10283", customer: "Priya Shah", email: "priya@example.com", items: 2, total: 86.0, status: "Shipped", date: "2026-05-13" },
  { id: "#10282", customer: "Liam Carter", email: "liam@example.com", items: 5, total: 212.3, status: "Pending", date: "2026-05-12" },
  { id: "#10281", customer: "Noor Hassan", email: "noor@example.com", items: 1, total: 54.9, status: "Paid", date: "2026-05-12" },
  { id: "#10280", customer: "Sofia Rossi", email: "sofia@example.com", items: 4, total: 178.4, status: "Refunded", date: "2026-05-11" },
  { id: "#10279", customer: "Kenji Watanabe", email: "kenji@example.com", items: 2, total: 96.2, status: "Delivered", date: "2026-05-11" },
];

const statusColor: Record<Status, string> = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Shipped: "bg-blue-50 text-blue-700 border-blue-200",
  Delivered: "bg-violet-50 text-violet-700 border-violet-200",
  Refunded: "bg-red-50 text-red-700 border-red-200",
};

const flow: Status[] = ["Pending", "Paid", "Shipped", "Delivered", "Refunded"];

export default function AdminOrders() {
  const [items, setItems] = useState<Order[]>(seed);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Status | "All">("All");
  const [view, setView] = useState<Order | null>(null);

  const filtered = items.filter((o) => {
    const matches = [o.id, o.customer, o.email].join(" ").toLowerCase().includes(query.toLowerCase());
    const matchStatus = filter === "All" || o.status === filter;
    return matches && matchStatus;
  });

  const setStatus = (id: string, status: Status) => {
    setItems((arr) => arr.map((o) => (o.id === id ? { ...o, status } : o)));
    toast({ title: `Order ${id} → ${status}` });
  };

  const remove = (id: string) => {
    setItems((arr) => arr.filter((o) => o.id !== id));
    toast({ title: "Order deleted" });
  };

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
        <p className="text-sm text-muted-foreground">Track, fulfill, and manage customer orders.</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <CardTitle className="text-base">All orders ({filtered.length})</CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex gap-1 rounded-md border border-border bg-muted/40 p-0.5">
                {(["All", ...flow] as const).map((s) => (
                  <button key={s} onClick={() => setFilter(s)}
                    className={`px-2.5 py-1 text-xs rounded ${filter === s ? "bg-card shadow-sm font-medium" : "text-muted-foreground hover:text-foreground"}`}>
                    {s}
                  </button>
                ))}
              </div>
              <div className="relative w-56">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-9 h-9" placeholder="Search orders…" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Items</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-medium">{o.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col leading-tight">
                      <span>{o.customer}</span>
                      <span className="text-xs text-muted-foreground">{o.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{o.date}</TableCell>
                  <TableCell className="text-right">{o.items}</TableCell>
                  <TableCell className="text-right">${o.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <select value={o.status} onChange={(e) => setStatus(o.id, e.target.value as Status)}
                      className={`text-xs rounded border px-2 py-1 ${statusColor[o.status]}`}>
                      {flow.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setView(o)}><Eye className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => remove(o.id)}><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-10">No orders found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!view} onOpenChange={(o) => !o && setView(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Order {view?.id}</DialogTitle></DialogHeader>
          {view && (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Customer</span><span className="font-medium">{view.customer}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span>{view.email}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span>{view.date}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Items</span><span>{view.items}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><Badge variant="outline" className={statusColor[view.status]}>{view.status}</Badge></div>
              <div className="flex justify-between border-t pt-3 font-medium"><span>Total</span><span>${view.total.toFixed(2)}</span></div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
