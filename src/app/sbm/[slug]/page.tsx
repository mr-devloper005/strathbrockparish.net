import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { BookmarkActions } from "@/components/sbm/bookmark-actions";
import { FollowButton } from "@/components/sbm/follow-button";
import { RichContent, formatRichHtml } from "@/components/shared/rich-content";
import { buildPostUrl } from "@/lib/task-data";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG } from "@/lib/site-config";
import {
  ArrowUpRight,
  Tag,
  Globe,
  ChevronLeft,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 3;

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("sbm", 50);
  if (!posts.length) {
    return [{ slug: "placeholder" }];
  }
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("sbm", resolvedParams.slug);
  return post ? await buildPostMetadata("sbm", post) : await buildTaskMetadata("sbm");
}

const decodeBasicHtmlEntities = (value: string) =>
  value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

export default async function BookmarkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("sbm", resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const content = (post.content || {}) as Record<string, any>;
  const title = post.title;
  const description = content.description || post.summary || "";
  const descriptionHtml = formatRichHtml(decodeBasicHtmlEntities(description), "");
  const url = content.url || content.website || "#";
  const domain = url !== "#" ? url.replace(/^https?:\/\//, "").replace(/\/.*$/, "") : "";
  const category = content.category || post.tags?.[0] || "Bookmark";
  const tags = Array.isArray(post.tags) ? post.tags.filter((t): t is string => typeof t === "string") : [];
  const authorName = post.authorName || "Anonymous";
  const authorAvatar = content.authorAvatar as string | undefined;

  const relatedBookmarks = (await fetchTaskPosts("sbm", 6))
    .filter((item) => item.slug !== post.slug)
    .slice(0, 4);

  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Bookmarks", item: `${baseUrl}/sbm` },
      { "@type": "ListItem", position: 3, name: title, item: `${baseUrl}/sbm/${post.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />

        {/* Back Link */}
        <Link
          href="/sbm"
          className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to bookmarks
        </Link>

        {/* Profile Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={authorAvatar} alt={authorName} />
              <AvatarFallback className="text-xl font-semibold">{authorName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{authorName}</h1>
              <p className="text-sm text-muted-foreground">Bookmark curator</p>
            </div>
          </div>
          <FollowButton authorName={authorName} />
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Title Section */}
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 leading-tight">{title}</h2>
            {category && (
              <Badge className="bg-primary/10 text-primary border-primary/20 text-sm px-3 py-1">
                <Tag className="mr-1 h-3 w-3" />
                {category}
              </Badge>
            )}
          </div>

          {/* Main Content Card */}
          <Card className="border-border/60 shadow-lg">
            <CardContent className="p-6 sm:p-8">
              {/* Description */}
              {descriptionHtml ? (
                <RichContent
                  html={descriptionHtml}
                  className="mb-6 text-muted-foreground prose-p:text-muted-foreground prose-a:text-primary"
                />
              ) : null}

              {/* Meta Information - Only domain */}
              {domain && (
                <div className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <span>{domain}</span>
                </div>
              )}

              {/* Keywords/Tags */}
              {tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-foreground mb-3">Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs px-2 py-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Secondary Actions - Only Save and Share */}
              <BookmarkActions currentUrl={`${baseUrl}/sbm/${post.slug}`} />
            </CardContent>
          </Card>

          {/* Related Bookmarks Section */}
          {relatedBookmarks.length > 0 && (
            <Card className="border-border/60">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Related bookmarks</h3>
                <div className="space-y-3">
                  {relatedBookmarks.slice(0, 3).map((bookmark) => {
                    const bmContent = bookmark.content as Record<string, any> || {};
                    const bmDomain = (bmContent.url || "").replace(/^https?:\/\//, "").replace(/\/.*$/, "");
                    return (
                      <Link
                        key={bookmark.id}
                        href={`/sbm/${bookmark.slug}`}
                        className="group block"
                      >
                        <div className="rounded-lg border border-border/60 p-4 hover:border-primary/50 transition-colors">
                          <h4 className="font-medium text-sm text-foreground group-hover:text-primary line-clamp-2 mb-2">
                            {bookmark.title}
                          </h4>
                          {bmDomain && (
                            <p className="text-xs text-muted-foreground mb-2">{bmDomain}</p>
                          )}
                          {bookmark.summary && (
                            <p className="text-xs text-muted-foreground line-clamp-2">{bookmark.summary}</p>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-6 text-center">
                  <Link
                    href="/sbm"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    Browse all bookmarks
                    <ChevronLeft className="h-4 w-4 rotate-180" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
