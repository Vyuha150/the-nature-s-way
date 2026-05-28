import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { shopApi } from "../api/shop";
import { formatRupee } from "../utils/currency";
import { toast } from "@/hooks/use-toast";
import { userLogout } from "../auth";

export default function OrdersPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: ["shop", "orders"], queryFn: shopApi.listOrders });
  const orders = data?.items ?? [];

  const refreshMutation = useMutation({
    mutationFn: shopApi.refreshRazorpayPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shop", "orders"] });
      toast({ title: "Payment status refreshed" });
    },
  });

  useEffect(() => {
    document.title = "Orders — The Nature's Way";
  }, []);

  return (
    <main className="min-h-screen bg-linen">
      <Nav />
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-4xl text-umber">Your orders</h1>
          <Button variant="outline" onClick={async () => {
            await userLogout();
            navigate("/login");
          }}>Sign out</Button>
        </div>
        <div className="mt-8 space-y-6">
          {orders.length === 0 && (
            <div className="rounded-sm border border-umber/15 bg-grain/30 p-10 text-center text-earth/70">
              No orders yet.
            </div>
          )}

          {orders.map((o) => (
            <div key={o._id} className="rounded-sm border border-umber/10 bg-linen p-6 shadow-soft">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-honey">{o.orderNumber}</div>
                  <div className="font-display text-2xl text-umber">{formatRupee(o.total)}</div>
                  <div className="text-sm text-earth/70">Placed {new Date(o.createdAt).toISOString().slice(0, 10)}</div>
                </div>
                <div className="text-sm text-earth/70">
                  <div>Status: <span className="text-umber">{o.status}</span></div>
                  <div>Payment: <span className="text-umber">{o.paymentStatus ?? "created"}</span></div>
                </div>
                <Button variant="outline" onClick={() => refreshMutation.mutate(o._id)}>Refresh payment</Button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
