import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { adminApi } from "../api/admin";
import type { Page, Section } from "../api/types";

const statusColor = { Published: "bg-emerald-50 text-emerald-700 border-emerald-200", Draft: "bg-amber-50 text-amber-700 border-amber-200" };

type SectionDraft = { pageSlug: string; pageTitle: string; key: string; heading: string; body: string };
const emptySection: SectionDraft = { pageSlug: "", pageTitle: "", key: "", heading: "", body: "" };

export default function AdminContent() {
  const queryClient = useQueryClient();
  const { data: pagesData } = useQuery({ queryKey: ["admin", "pages"], queryFn: adminApi.listPages });
  const { data: sectionsData } = useQuery({ queryKey: ["admin", "sections"], queryFn: () => adminApi.listSections() });

  const pages = pagesData ?? [];
  const sections = sectionsData ?? [];
  const [editing, setEditing] = useState<Section | null>(null);
  const [draft, setDraft] = useState<SectionDraft>(emptySection);
  const [open, setOpen] = useState(false);

  const updatePageMutation = useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: Partial<Page> }) => adminApi.updatePage(slug, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "pages"] }),
  });

  const createSectionMutation = useMutation({
    mutationFn: adminApi.createSection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "sections"] });
      toast({ title: "Section created" });
    },
  });

  const updateSectionMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<SectionDraft> }) => adminApi.updateSection(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "sections"] });
      toast({ title: "Section updated" });
    },
  });

  const deleteSectionMutation = useMutation({
    mutationFn: adminApi.deleteSection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "sections"] });
      toast({ title: "Section deleted" });
    },
  });

  const togglePage = async (slug: string) => {
    const page = pages.find((p) => p.slug === slug);
    if (!page) return;
    try {
      await updatePageMutation.mutateAsync({ slug, data: { status: page.status === "Published" ? "Draft" : "Published" } });
      toast({ title: "Page status updated" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Update failed";
      toast({ title: "Update failed", description: message, variant: "destructive" });
    }
  };

  const openCreate = () => {
    const first = pages[0];
    setEditing(null);
    setDraft(first ? { pageSlug: first.slug, pageTitle: first.title, key: "", heading: "", body: "" } : emptySection);
    setOpen(true);
  };
  const openEdit = (s: Section) => { setEditing(s); setDraft({ pageSlug: s.pageSlug, pageTitle: s.pageTitle, key: s.key, heading: s.heading, body: s.body }); setOpen(true); };

  const save = async () => {
    if (!draft.heading.trim() || !draft.key.trim() || !draft.pageSlug.trim()) {
      toast({ title: "Key and heading required", variant: "destructive" });
      return;
    }
    try {
      if (editing) {
        await updateSectionMutation.mutateAsync({ id: editing._id, data: draft });
      } else {
        await createSectionMutation.mutateAsync(draft);
      }
      setOpen(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Save failed";
      toast({ title: "Save failed", description: message, variant: "destructive" });
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteSectionMutation.mutateAsync(id);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Delete failed";
      toast({ title: "Delete failed", description: message, variant: "destructive" });
    }
  };

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
                  <span className="text-xs text-muted-foreground">Updated {new Date(p.updatedAt).toISOString().slice(0, 10)}</span>
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
              <Card key={s._id}>
                <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{s.pageTitle}</Badge>
                      <span className="font-mono text-xs text-muted-foreground">{s.key}</span>
                    </div>
                    <CardTitle className="text-base">{s.heading}</CardTitle>
                  </div>
                  <div className="flex">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(s)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => remove(s._id)}><Trash2 className="h-4 w-4" /></Button>
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
                  value={draft.pageSlug} onChange={(e) => {
                    const page = pages.find((p) => p.slug === e.target.value);
                    setDraft({ ...draft, pageSlug: e.target.value, pageTitle: page?.title ?? "" });
                  }}>
                  <option value="" disabled>Select page</option>
                  {pages.map((p) => <option key={p.slug} value={p.slug}>{p.title}</option>)}
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
