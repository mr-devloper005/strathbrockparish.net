import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { ContentImage } from "@/components/shared/content-image";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { buildPostUrl } from "@/lib/task-data";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG } from "@/lib/site-config";
import {
  ArrowUpRight,
  Clock,
  Bookmark,
  Share2,
  ExternalLink,
  ArrowUp,
  MessageSquare,
  Tag,
  Globe,
  ChevronLeft,
  Link as LinkIcon,
  Copy,
  Check
} from "lucide-react";

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

const formatTimeAgo = (dateString?: string) => {
  if (!dateString) return "Recently";
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffInDays < 1) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 30) return `${diffInDays} days ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
};

export default async function BookmarkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("sbm", resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const content = (post.content || {}) as Record<string, any>;
  const title = post.title;
  const description = content.description || post.summary || "";
  const url = content.url || content.website || "#";
  const domain = url !== "#" ? url.replace(/^https?:\/\//, "").replace(/\/.*$/, "") : "";
  const image = content.image || (post.media?.[0]?.url as string) || "/placeholder.svg";
  const category = content.category || post.tags?.[0] || "Bookmark";
  const tags = Array.isArray(post.tags) ? post.tags.filter((t): t is string => typeof t === "string") : [];
  const createdAt = post.publishedAt;
  const authorName = post.authorName || "Anonymous";
  const authorAvatar = content.authorAvatar as string | undefined;
  const upvotes = content.upvotes as number | undefined || 0;
  const saves = content.saves as number | undefined || 0;
  const commentsCount = content.commentsCount as number | undefined || 0;

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
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />

        {/* Back Link */}
        <Link
          href="/sbm"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to bookmarks
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Bookmark Preview Card */}
            <Card className="overflow-hidden border-border/60">
              {/* Image Header */}
              <div className="relative aspect-[21/9] w-full overflow-hidden">
                <ContentImage
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  intrinsicWidth={1200}
                  intrinsicHeight={500}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-white/90 text-foreground">
                      <Tag className="mr-1 h-3 w-3" />
                      {category}
                    </Badge>
                    {domain && (
                      <Badge variant="secondary" className="bg-black/60 text-white">
                        <Globe className="mr-1 h-3 w-3" />
                        {domain}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Title & Meta */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                    <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <span>{formatTimeAgo(createdAt || undefined)}</span>
                      </div>
                      <Separator orientation="vertical" className="h-4" />
                      <div className="flex items-center gap-1.5">
                        <ArrowUp className="h-4 w-4" />
                        <span>{upvotes} upvotes</span>
                      </div>
                      <Separator orientation="vertical" className="h-4" />
                      <div className="flex items-center gap-1.5">
                        <Bookmark className="h-4 w-4" />
                        <span>{saves} saves</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <p className="text-base leading-relaxed text-muted-foreground">{description}</p>
                </div>

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button className="gap-2" size="lg" asChild>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Visit Website
                      <ArrowUpRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" className="gap-2" size="lg">
                    <ArrowUp className="h-4 w-4" />
                    Upvote ({upvotes})
                  </Button>
                  <Button variant="outline" className="gap-2" size="lg">
                    <Bookmark className="h-4 w-4" />
                    Save ({saves})
                  </Button>
                  <Button variant="outline" className="gap-2" size="lg">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Author Card */}
            <Card className="border-border/60">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground">Submitted by</h2>
                <div className="mt-4 flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={authorAvatar} alt={authorName} />
                    <AvatarFallback className="text-lg">{authorName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{authorName}</p>
                    <p className="text-sm text-muted-foreground">Bookmark curator</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto gap-2" asChild>
                    <Link href={`/profile/${authorName.toLowerCase().replace(/\s+/g, "-")}`}>
                      <ExternalLink className="h-4 w-4" />
                      View profile
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section Placeholder */}
            <Card className="border-border/60">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Comments</h2>
                  <Badge variant="secondary">{commentsCount}</Badge>
                </div>
                <div className="mt-4 rounded-lg border border-dashed p-8 text-center">
                  <MessageSquare className="mx-auto h-10 w-10 text-muted-foreground/40" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Join the discussion on this bookmark
                  </p>
                  <Button className="mt-4" variant="outline" size="sm">
                    Add a comment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-4">
            {/* Quick Actions Card */}
            <Card className="border-border/60">
              <CardContent className="space-y-3 p-4">
                <Button className="w-full gap-2" size="lg" asChild>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <LinkIcon className="h-4 w-4" />
                    Open Link
                    <ArrowUpRight className="ml-auto h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" className="w-full gap-2" size="lg">
                  <Copy className="h-4 w-4" />
                  Copy URL
                </Button>
              </CardContent>
            </Card>

            {/* Related Bookmarks */}
            {relatedBookmarks.length > 0 && (
              <Card className="border-border/60">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground">Related bookmarks</h3>
                  <div className="mt-4 space-y-4">
                    {relatedBookmarks.slice(0, 3).map((bookmark) => {
                      const bmContent = bookmark.content as Record<string, any> || {};
                      const bmDomain = (bmContent.url || "").replace(/^https?:\/\//, "").replace(/\/.*$/, "");
                      return (
                        <Link
                          key={bookmark.id}
                          href={`/sbm/${bookmark.slug}`}
                          className="group block"
                        >
                          <div className="flex items-start gap-3">
                            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                              <ContentImage
                                src={bmContent.image || bookmark.media?.[0]?.url || "/placeholder.svg"}
                                alt={bookmark.title}
                                fill
                                className="object-cover"
                                sizes="56px"
                                intrinsicWidth={56}
                                intrinsicHeight={56}
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-foreground group-hover:text-primary">
                                {bookmark.title}
                              </p>
                              {bmDomain && (
                                <p className="mt-0.5 text-xs text-muted-foreground">{bmDomain}</p>
                              )}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <Separator className="my-4" />
                  <Link
                    href="/sbm"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Browse all bookmarks
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Collections Card */}
            <Card className="border-border/60">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground">Bookmark collections</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Save this bookmark to your collections for easy access later.
                </p>
                <Button className="mt-4 w-full gap-2" variant="outline">
                  <Bookmark className="h-4 w-4" />
                  Add to collection
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
