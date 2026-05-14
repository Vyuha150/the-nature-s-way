import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, FileText, Globe } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Page = { slug: string; title: string; route: string; status: "Published" | "Draft"; updated: string };
type Section = { id: string; page: string; key: string; heading: string; body: string };

const seedPages: Page[] = [
  { slug: "home", title: "Home", route: "/", status: "Published", updated: "2026-05-12" },
  { slug: "philosophy", title: "Philosophy", route: "/philosophy", status: "Published", updated: "2026-05-10" },
  { slug: "promise", title: "Promise", route: "/promise", status: "Published", updated: "2026-05-08" },
  { slug: "range", title: "Range", route: "/range", status: "Published", updated: "2026-05-09" },
  { slug: "trace", title: "Trace", route: "/trace", status: "Published", updated: "2026-05-07" },
  { slug: "contact", title: "Contact", route: "/contact", status: "Published", updated: "2026-05-06" },
];

const seedSections: Section[] = [
  { id: "s1", page: "Home", key: "hero", heading: "Nothing Hidden", body: "Whole foods. Honest origins. Crafted by The Nature's Way." },
  { id: "s2", page: "Home", key: "philosophy", heading: "Our Philosophy", body: "Every bite tells the story of soil, sun, and skilled hands." },
  { id: "s3", page: "Philosophy", key: "intro", heading: "Rooted in Truth", body: "We believe food should be traceable from seed to spoon." },
  { id: "s4", page: "Promise", key: "intro", heading: "Our Promise", body: "No shortcuts. No fillers. No secrets." },
  { id: "s5", page: "Contact", key: "cta", heading: "Get in Touch", body: "We'd love to hear your story." },
];

const statusColor = { Published: "bg-emerald-50 text-emerald-700 border-emerald-200", Draft: "bg-amber-50 text-amber-700 border-amber-200" };

const emptySection: Omit<Section, "id"> = { page: "Home", key: "", heading: "", body: "" };

export default function AdminContent() {
  const [pages, setPages] = useState<Page[]>(seedPages);
  const [sections, setSections] = useState<Section[]>(seedSections);
  const [editing, setEditing] = useState<Section | null>(null);
  const [draft, setDraft] = useState<Omit<Section, "id">>(emptySection);
  const [open, setOpen] = useState(false);

  const togglePage = (slug: string) => {
    setPages((arr) => arr.map((p) => (p.slug === slug ? { ...p, status: p.status === "Published" ? "Draft" : "Published", updated: new Date().toISOString().slice(0, 10) } : p)));
    toast({ title: "Page status updated" });
  };

  const openCreate = () => { setEditing(null); setDraft(emptySection); setOpen(true); };
  const openEdit = (s: Section) => { setEditing(s); setDraft({ page: s.page, key: s.key, heading: s.heading, body: s.body }); setOpen(true); };

  const save = () => {
    if (!draft.heading.trim() || !draft.key.trim()) {
      toast({ title: "Key and heading required", variant: "destructive" });
      return;
    }
    if (editing) {
      setSections((arr) => arr.map((s) => (s.id === editing.id ? { ...editing, ...draft } : s)));
      toast({ title: "Section updated" });
    } else {
      setSections((arr) => [{ id: `s${Date.now()}`, ...draft }, ...arr]);
      toast({ title: "Section created" });
    }
    setOpen(false);
  };

  const remove = (id: string) => { setSections((arr) => arr.filter((s) => s.id !== id)); toast({ title: "Section deleted" }); };

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Content</h1>
        <p className="text-sm text-muted-foreground">Manage pages and on-page sections of the website.</p>
      </div>

      <Tabs defaultValue="pages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pages"><Globe className="h-3.5 w-3.5 mr-1.5" />Pages</TabsTrigger>
          <TabsTrigger value="sections"><FileText className="h-3.5 w-3.5 mr-1.5" />Sections</TabsTrigger>
        </TabsList>

        <TabsContent value="pages">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pages.map((p) => (
              <Card key={p.slug}>
                <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle className="text-base">{p.title}</CardTitle>
                    <CardDescription className="font-mono text-xs">{p.route}</CardDescription>
                  </div>
                  <Badge variant="outline" className={statusColor[p.status]}>{p.status}</Badge>
                </CardHeader>
                <CardContent className="flex items-center justify-between pt-2">
                  <span className="text-xs text-muted-foreground">Updated {p.updated}</span>
                  <Button variant="outline" size="sm" onClick={() => togglePage(p.slug)}>
                    {p.status === "Published" ? "Unpublish" : "Publish"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sections" className="space-y-4">
          <div className="flex justify-end">
            <Button size="sm" onClick={openCreate}><Plus className="h-4 w-4" /> New section</Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {sections.map((s) => (
              <Card key={s.id}>
                <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{s.page}</Badge>
                      <span className="font-mono text-xs text-muted-foreground">{s.key}</span>
                    </div>
                    <CardTitle className="text-base">{s.heading}</CardTitle>
                  </div>
                  <div className="flex">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(s)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => remove(s.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">{s.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>{editing ? "Edit section" : "New section"}</DialogTitle></DialogHeader>
          <div className="grid gap-3 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>Page</Label>
                <select className="h-10 rounded-md border border-input bg-background px-3 text-sm w-full"
                  value={draft.page} onChange={(e) => setDraft({ ...draft, page: e.target.value })}>
                  {pages.map((p) => <option key={p.slug}>{p.title}</option>)}
                </select>
              </div>
              <div className="space-y-1.5"><Label>Key</Label><Input value={draft.key} placeholder="hero, intro, cta…" onChange={(e) => setDraft({ ...draft, key: e.target.value })} /></div>
            </div>
            <div className="space-y-1.5"><Label>Heading</Label><Input value={draft.heading} onChange={(e) => setDraft({ ...draft, heading: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>Body</Label><Textarea rows={4} value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save}>{editing ? "Save changes" : "Create section"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
