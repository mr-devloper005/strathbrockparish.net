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
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { ProfileActionButtons } from "@/components/profile/profile-action-buttons";
import { buildPostUrl } from "@/lib/task-data";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG } from "@/lib/site-config";
import {
  MapPin,
  Facebook,
  ExternalLink,
  UserPlus,
  UserCheck,
  Share2,
  ArrowUpRight,
  Link2,
  Copy,
  Check
} from "lucide-react";

export const revalidate = 3;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sanitizeRichHtml = (html: string) =>
  html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\shref\s*=\s*(['"])javascript:.*?\1/gi, ' href="#"');

const formatRichHtml = (raw?: string | null, fallback = "Profile details will appear here once available.") => {
  const source = typeof raw === "string" ? raw.trim() : "";
  if (!source) return `<p>${escapeHtml(fallback)}</p>`;
  if (/<[a-z][\s\S]*>/i.test(source)) return sanitizeRichHtml(source);
  return source
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph.replace(/\n/g, " ").trim())}</p>`)
    .join("");
};

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

const maskPhone = (phone?: string) => {
  if (!phone || phone.length < 4) return "**** ****";
  const visible = phone.slice(-4);
  return `${phone.slice(0, phone.length - 4).replace(/\d/g, "*")}${visible}`;
};

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("profile", 50);
  if (!posts.length) {
    return [{ username: "placeholder" }];
  }
  return posts.map((post) => ({ username: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  try {
    const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
    return post ? await buildPostMetadata("profile", post) : await buildTaskMetadata("profile");
  } catch (error) {
    console.warn("Profile metadata lookup failed", error);
    return await buildTaskMetadata("profile");
  }
}

export default async function ProfileDetailPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
  if (!post) {
    notFound();
  }
  const content = (post.content || {}) as Record<string, any>;
  const logoUrl = typeof content.logo === "string" ? content.logo : undefined;
  const brandName =
    (content.brandName as string | undefined) ||
    (content.companyName as string | undefined) ||
    (content.name as string | undefined) ||
    post.title;
  const website = content.website as string | undefined;
  const domain = website ? website.replace(/^https?:\/\//, "").replace(/\/.*$/, "") : undefined;
  const description =
    (content.description as string | undefined) ||
    post.summary ||
    "Profile details will appear here once available.";
  const descriptionHtml = formatRichHtml(description);
  const location = content.location as string | undefined;
  const phone = content.phone as string | undefined;
  const email = content.email as string | undefined;
  const isCompany = content.isCompany === true || content.type === "company";
  const activeListings = content.activeListings as number | undefined;
  const joinedDate = content.joinedDate as string | undefined;
  const lastOnline = content.lastOnline as string | undefined;
  const socialLinks = content.socialLinks as { facebook?: string; twitter?: string; pinterest?: string; linkedin?: string } | undefined;

  const suggestedArticles = await fetchTaskPosts("article", 6);
  const userListings = await fetchTaskPosts("classified", 6);
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Profiles",
        item: `${baseUrl}/profile`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: brandName,
        item: `${baseUrl}/profile/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            {/* Profile Header Card */}
            <Card className="overflow-hidden border-border/60">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                  {/* Avatar */}
                  <div className="flex justify-center md:justify-start">
                    <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-background bg-muted shadow-lg md:h-40 md:w-40">
                      {logoUrl ? (
                        <ContentImage
                          src={logoUrl}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="160px"
                          intrinsicWidth={160}
                          intrinsicHeight={160}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-muted-foreground">
                          {brandName.slice(0, 1).toUpperCase()}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-2xl font-bold text-foreground md:text-3xl">{brandName}</h1>

                    {/* Location */}
                    {location && (
                      <div className="mt-2 flex items-center justify-center gap-1.5 text-sm text-muted-foreground md:justify-start">
                        <MapPin className="h-4 w-4" />
                        <span>{location}</span>
                      </div>
                    )}

                    {/* Social Links */}
                    {(socialLinks?.facebook || socialLinks?.twitter || socialLinks?.pinterest) && (
                      <div className="mt-4 flex items-center justify-center gap-2 md:justify-start">
                        {socialLinks?.facebook && (
                          <a
                            href={socialLinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1877F2] text-white transition-opacity hover:opacity-90"
                          >
                            <Facebook className="h-4 w-4" />
                          </a>
                        )}
                        {socialLinks?.twitter && (
                          <a
                            href={socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-opacity hover:opacity-90"
                          >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                          </a>
                        )}
                        {socialLinks?.pinterest && (
                          <a
                            href={socialLinks.pinterest}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#BD081C] text-white transition-opacity hover:opacity-90"
                          >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* About */}
                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-foreground">About</h2>
                  <article
                    className="article-content prose prose-slate mt-3 max-w-none text-sm leading-relaxed text-muted-foreground prose-p:my-2 prose-a:text-primary prose-a:underline prose-strong:font-semibold"
                    dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                  />
                </div>

              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Action Buttons */}
          <aside className="space-y-4">
            <ProfileActionButtons
              username={post.slug}
              website={website}
              domain={domain}
            />

            {/* Suggested Articles */}
            {suggestedArticles.length > 0 && (
              <Card className="border-border/60">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground">Suggested articles</h3>
                  <div className="mt-3 space-y-3">
                    {suggestedArticles.slice(0, 3).map((article) => (
                      <Link
                        key={article.id}
                        href={buildPostUrl("article", article.slug)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-foreground group-hover:text-primary">
                          {article.title}
                        </p>
                        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                          {article.summary}
                        </p>
                      </Link>
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <Link
                    href="/articles"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    View all articles
                  </Link>
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
