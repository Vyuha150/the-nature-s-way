import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { adminApi } from "../api/admin";
import type { Customer } from "../api/types";

type Tier = "VIP" | "Returning" | "New";

const tierColor: Record<Tier, string> = {
  VIP: "bg-violet-50 text-violet-700 border-violet-200",
  Returning: "bg-blue-50 text-blue-700 border-blue-200",
  New: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

type CustomerDraft = { name: string; email: string; tier: Tier; password?: string };
const empty: CustomerDraft = { name: "", email: "", tier: "New", password: "" };

export default function AdminCustomers() {
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Customer | null>(null);
  const [draft, setDraft] = useState(empty);
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin", "customers", { query }],
    queryFn: () => adminApi.listCustomers({ search: query || undefined, limit: 100 }),
  });

  const items = data?.items ?? [];

  const createMutation = useMutation({
    mutationFn: adminApi.createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "customers"] });
      toast({ title: "Customer added" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CustomerDraft> }) => adminApi.updateCustomer(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "customers"] });
      toast({ title: "Customer updated" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminApi.deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "customers"] });
      toast({ title: "Customer deleted" });
    },
  });

  const filtered = items;

  const openCreate = () => { setEditing(null); setDraft(empty); setOpen(true); };
  const openEdit = (c: Customer) => { setEditing(c); setDraft({ name: c.name, email: c.email, tier: c.tier, password: "" }); setOpen(true); };

  const save = async () => {
    if (!draft.name.trim() || !draft.email.trim()) {
      toast({ title: "Name and email required", variant: "destructive" });
      return;
    }
    try {
      if (editing) {
        const payload = { ...draft };
        if (!payload.password) delete payload.password;
        await updateMutation.mutateAsync({ id: editing._id, data: payload });
      } else {
        if (!draft.password) {
          toast({ title: "Password required", variant: "destructive" });
          return;
        }
        await createMutation.mutateAsync({ name: draft.name, email: draft.email, password: draft.password, tier: draft.tier });
      }
      setOpen(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Save failed";
      toast({ title: "Save failed", description: message, variant: "destructive" });
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
                <TableRow key={c._id}>
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
                  <TableCell className="text-right">{c.ordersCount ?? 0}</TableCell>
                  <TableCell className="text-right">${(c.spent ?? 0).toLocaleString()}</TableCell>
                  <TableCell className="text-muted-foreground">{new Date(c.createdAt).toISOString().slice(0, 10)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(c)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => remove(c._id)}><Trash2 className="h-4 w-4" /></Button>
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
            <div className="space-y-1.5"><Label>Password</Label><Input type="password" value={draft.password ?? ""} placeholder={editing ? "Leave blank to keep" : "Set initial password"} onChange={(e) => setDraft({ ...draft, password: e.target.value })} /></div>
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
