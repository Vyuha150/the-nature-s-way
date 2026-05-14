import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "Active" | "Draft" | "Archived";
  description?: string;
};

const seed: Product[] = [
  { id: "p1", name: "Cold-Pressed Turmeric", category: "Spices", price: 18, stock: 124, status: "Active" },
  { id: "p2", name: "Stone-Ground Moringa", category: "Herbs", price: 22, stock: 98, status: "Active" },
  { id: "p3", name: "Sun-Dried Dates", category: "Sweeteners", price: 14, stock: 56, status: "Active" },
  { id: "p4", name: "Heritage Whole Flour", category: "Grains", price: 12, stock: 210, status: "Active" },
  { id: "p5", name: "Raw Pumpkin Seeds", category: "Seeds", price: 16, stock: 142, status: "Active" },
  { id: "p6", name: "Wild Forest Honey", category: "Sweeteners", price: 28, stock: 0, status: "Draft" },
];

const statusColor: Record<Product["status"], string> = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Draft: "bg-amber-50 text-amber-700 border-amber-200",
  Archived: "bg-slate-100 text-slate-600 border-slate-200",
};

const empty: Omit<Product, "id"> = { name: "", category: "", price: 0, stock: 0, status: "Draft", description: "" };

export default function AdminProducts() {
  const [items, setItems] = useState<Product[]>(seed);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Product | null>(null);
  const [draft, setDraft] = useState<Omit<Product, "id">>(empty);
  const [open, setOpen] = useState(false);

  const filtered = items.filter((p) =>
    [p.name, p.category, p.status].join(" ").toLowerCase().includes(query.toLowerCase()),
  );

  const openCreate = () => {
    setEditing(null);
    setDraft(empty);
    setOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setDraft({ name: p.name, category: p.category, price: p.price, stock: p.stock, status: p.status, description: p.description ?? "" });
    setOpen(true);
  };

  const save = () => {
    if (!draft.name.trim()) {
      toast({ title: "Name required", variant: "destructive" });
      return;
    }
    if (editing) {
      setItems((arr) => arr.map((p) => (p.id === editing.id ? { ...editing, ...draft } : p)));
      toast({ title: "Product updated" });
    } else {
      setItems((arr) => [{ id: `p${Date.now()}`, ...draft }, ...arr]);
      toast({ title: "Product created" });
    }
    setOpen(false);
  };

  const remove = (id: string) => {
    setItems((arr) => arr.filter((p) => p.id !== id));
    toast({ title: "Product deleted" });
  };

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
          <p className="text-sm text-muted-foreground">Manage your catalog, pricing, and inventory.</p>
        </div>
        <Button size="sm" onClick={openCreate}><Plus className="h-4 w-4" /> New product</Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <CardTitle className="text-base">Catalog ({filtered.length})</CardTitle>
            <div className="relative w-64">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9 h-9" placeholder="Search products…" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="text-muted-foreground">{p.category}</TableCell>
                  <TableCell className="text-right">${p.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{p.stock}</TableCell>
                  <TableCell><Badge variant="outline" className={statusColor[p.status]}>{p.status}</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => remove(p.id)}><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-10">No products found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit product" : "New product"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <div className="space-y-1.5"><Label>Name</Label><Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>Category</Label><Input value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>Status</Label>
                <select className="h-10 rounded-md border border-input bg-background px-3 text-sm w-full"
                  value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as Product["status"] })}>
                  <option>Active</option><option>Draft</option><option>Archived</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>Price ($)</Label><Input type="number" value={draft.price} onChange={(e) => setDraft({ ...draft, price: +e.target.value })} /></div>
              <div className="space-y-1.5"><Label>Stock</Label><Input type="number" value={draft.stock} onChange={(e) => setDraft({ ...draft, stock: +e.target.value })} /></div>
            </div>
            <div className="space-y-1.5"><Label>Description</Label><Textarea rows={3} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save}>{editing ? "Save changes" : "Create product"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
