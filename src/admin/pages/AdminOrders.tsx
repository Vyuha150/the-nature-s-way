import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Eye, Trash2, RefreshCcw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { adminApi } from "../api/admin";
import type { Order, OrderStatus } from "../api/types";

const statusColor: Record<OrderStatus, string> = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Shipped: "bg-blue-50 text-blue-700 border-blue-200",
  Delivered: "bg-violet-50 text-violet-700 border-violet-200",
  Refunded: "bg-red-50 text-red-700 border-red-200",
};

const flow: OrderStatus[] = ["Pending", "Paid", "Shipped", "Delivered", "Refunded"];

export default function AdminOrders() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<OrderStatus | "All">("All");
  const [view, setView] = useState<Order | null>(null);

  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin", "orders", { query, filter }],
    queryFn: () => adminApi.listOrders({ search: query || undefined, status: filter === "All" ? undefined : filter, limit: 100 }),
  });

  const items = data?.items ?? [];

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) => adminApi.updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminApi.deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
      toast({ title: "Order deleted" });
    },
  });

  const refreshMutation = useMutation({
    mutationFn: adminApi.refreshOrderPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
      toast({ title: "Payment status refreshed" });
    },
  });

  const filtered = items;

  const setStatus = async (id: string, status: OrderStatus) => {
    try {
      await statusMutation.mutateAsync({ id, status });
      toast({ title: `Order ${id} → ${status}` });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Update failed";
      toast({ title: "Update failed", description: message, variant: "destructive" });
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Delete failed";
      toast({ title: "Delete failed", description: message, variant: "destructive" });
    }
  };

  const refreshPayment = async (id: string) => {
    try {
      await refreshMutation.mutateAsync(id);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Refresh failed";
      toast({ title: "Refresh failed", description: message, variant: "destructive" });
    }
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
                <TableHead>Payment</TableHead>
                <TableHead className="text-right w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((o) => (
                  <TableRow key={o._id}>
                    <TableCell className="font-medium">{o.orderNumber}</TableCell>
                  <TableCell>
                    <div className="flex flex-col leading-tight">
                        <span>{o.customerName}</span>
                        <span className="text-xs text-muted-foreground">{o.customerEmail}</span>
                    </div>
                  </TableCell>
                    <TableCell className="text-muted-foreground">{new Date(o.createdAt).toISOString().slice(0, 10)}</TableCell>
                    <TableCell className="text-right">{o.items.length}</TableCell>
                  <TableCell className="text-right">${o.total.toFixed(2)}</TableCell>
                    <TableCell>
                    <select value={o.status} onChange={(e) => setStatus(o._id, e.target.value as OrderStatus)}
                      className={`text-xs rounded border px-2 py-1 ${statusColor[o.status]}`}>
                      {flow.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{o.paymentStatus ?? "created"}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setView(o)}><Eye className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => refreshPayment(o._id)}><RefreshCcw className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => remove(o._id)}><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-10">No orders found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!view} onOpenChange={(o) => !o && setView(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Order {view?.orderNumber}</DialogTitle></DialogHeader>
          {view && (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Customer</span><span className="font-medium">{view.customerName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span>{view.customerEmail}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span>{new Date(view.createdAt).toISOString().slice(0, 10)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Items</span><span>{view.items.length}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><Badge variant="outline" className={statusColor[view.status]}>{view.status}</Badge></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Payment</span><span>{view.paymentStatus ?? "created"}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Payment updated</span><span>{view.paymentUpdatedAt ? new Date(view.paymentUpdatedAt).toISOString().slice(0, 10) : "-"}</span></div>
              <div className="flex justify-between border-t pt-3 font-medium"><span>Total</span><span>${view.total.toFixed(2)}</span></div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
