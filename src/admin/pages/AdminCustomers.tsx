import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Tier = "VIP" | "Returning" | "New";
type Customer = { id: string; name: string; email: string; orders: number; spent: number; tier: Tier; joined: string };

const seed: Customer[] = [
  { id: "u1", name: "Aarav Mehta", email: "aarav@example.com", orders: 18, spent: 2240, tier: "VIP", joined: "2024-03-12" },
  { id: "u2", name: "Priya Shah", email: "priya@example.com", orders: 14, spent: 1890, tier: "VIP", joined: "2024-05-04" },
  { id: "u3", name: "Liam Carter", email: "liam@example.com", orders: 12, spent: 1620, tier: "Returning", joined: "2024-08-22" },
  { id: "u4", name: "Noor Hassan", email: "noor@example.com", orders: 11, spent: 1490, tier: "Returning", joined: "2024-11-09" },
  { id: "u5", name: "Sofia Rossi", email: "sofia@example.com", orders: 9, spent: 1310, tier: "Returning", joined: "2025-01-18" },
  { id: "u6", name: "Kenji Watanabe", email: "kenji@example.com", orders: 1, spent: 96, tier: "New", joined: "2026-04-30" },
];

const tierColor: Record<Tier, string> = {
  VIP: "bg-violet-50 text-violet-700 border-violet-200",
  Returning: "bg-blue-50 text-blue-700 border-blue-200",
  New: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const empty: Omit<Customer, "id" | "orders" | "spent" | "joined"> = { name: "", email: "", tier: "New" };

export default function AdminCustomers() {
  const [items, setItems] = useState<Customer[]>(seed);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Customer | null>(null);
  const [draft, setDraft] = useState(empty);
  const [open, setOpen] = useState(false);

  const filtered = items.filter((c) => [c.name, c.email, c.tier].join(" ").toLowerCase().includes(query.toLowerCase()));

  const openCreate = () => { setEditing(null); setDraft(empty); setOpen(true); };
  const openEdit = (c: Customer) => { setEditing(c); setDraft({ name: c.name, email: c.email, tier: c.tier }); setOpen(true); };

  const save = () => {
    if (!draft.name.trim() || !draft.email.trim()) {
      toast({ title: "Name and email required", variant: "destructive" });
      return;
    }
    if (editing) {
      setItems((arr) => arr.map((c) => (c.id === editing.id ? { ...c, ...draft } : c)));
      toast({ title: "Customer updated" });
    } else {
      setItems((arr) => [{ id: `u${Date.now()}`, orders: 0, spent: 0, joined: new Date().toISOString().slice(0, 10), ...draft }, ...arr]);
      toast({ title: "Customer added" });
    }
    setOpen(false);
  };

  const remove = (id: string) => { setItems((arr) => arr.filter((c) => c.id !== id)); toast({ title: "Customer deleted" }); };

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Customers</h1>
          <p className="text-sm text-muted-foreground">Profiles, segments, and lifetime value.</p>
        </div>
        <Button size="sm" onClick={openCreate}><Plus className="h-4 w-4" /> Add customer</Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <CardTitle className="text-base">Directory ({filtered.length})</CardTitle>
            <div className="relative w-64">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9 h-9" placeholder="Search customers…" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead className="text-right">Orders</TableHead>
                <TableHead className="text-right">Spent</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-accent/10 text-accent grid place-items-center text-xs font-semibold">
                        {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <span className="font-medium">{c.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{c.email}</TableCell>
                  <TableCell><Badge variant="outline" className={tierColor[c.tier]}>{c.tier}</Badge></TableCell>
                  <TableCell className="text-right">{c.orders}</TableCell>
                  <TableCell className="text-right">${c.spent.toLocaleString()}</TableCell>
                  <TableCell className="text-muted-foreground">{c.joined}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(c)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => remove(c.id)}><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-10">No customers found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>{editing ? "Edit customer" : "Add customer"}</DialogTitle></DialogHeader>
          <div className="grid gap-3 py-2">
            <div className="space-y-1.5"><Label>Name</Label><Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>Email</Label><Input type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>Tier</Label>
              <select className="h-10 rounded-md border border-input bg-background px-3 text-sm w-full"
                value={draft.tier} onChange={(e) => setDraft({ ...draft, tier: e.target.value as Tier })}>
                <option>New</option><option>Returning</option><option>VIP</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save}>{editing ? "Save changes" : "Add customer"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
