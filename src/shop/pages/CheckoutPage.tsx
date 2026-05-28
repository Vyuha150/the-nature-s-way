import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { shopApi } from "../api/shop";
import { useCart } from "../context/CartContext";
import { loadRazorpayScript } from "../utils/razorpay";
import { formatRupee } from "../utils/currency";
import { toast } from "@/hooks/use-toast";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Checkout — The Nature's Way";
  }, []);

  const handlePayment = async () => {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded || !window.Razorpay) {
        toast({ title: "Payment failed", description: "Razorpay SDK failed to load.", variant: "destructive" });
        return;
      }

      const payload = {
        items: items.map((i) => ({ productId: i.product._id, quantity: i.quantity })),
        source: "Direct",
      };

      const order = await shopApi.createRazorpayOrder(payload);

      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "The Nature's Way",
        description: "Harvest lot purchase",
        order_id: order.razorpayOrderId,
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          await shopApi.verifyRazorpayPayment({
            orderId: order.orderId,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });
          clear();
          toast({ title: "Payment captured", description: `Order ${order.orderNumber} confirmed.` });
          navigate("/orders");
        },
        modal: {
          ondismiss: () => {
            toast({ title: "Payment cancelled", description: "You can retry from orders page." });
          },
        },
        theme: { color: "#d29b5e" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Payment failed";
      toast({ title: "Payment failed", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-linen">
      <Nav />
      <section className="mx-auto max-w-4xl px-6 py-24">
        <h1 className="font-display text-4xl text-umber">Checkout</h1>
        <div className="mt-8 rounded-sm border border-umber/10 bg-linen p-6 shadow-soft">
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.product._id} className="flex items-center justify-between text-sm text-earth/80">
                <span>{item.product.name} × {item.quantity}</span>
                <span>{formatRupee(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-umber/10 pt-4">
            <span className="text-earth/70">Total</span>
            <span className="font-display text-2xl text-umber">{formatRupee(total)}</span>
          </div>
          <Button className="mt-6 w-full" disabled={loading || items.length === 0} onClick={handlePayment}>
            {loading ? "Opening Razorpay..." : "Pay securely"}
          </Button>
        </div>
      </section>
      <Footer />
    </main>
  );
}
