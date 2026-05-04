"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, Share2, Check } from "lucide-react";

interface BookmarkActionsProps {
  currentUrl: string;
}

export function BookmarkActions({ currentUrl }: BookmarkActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleSave = () => {
    // Redirect to login page
    window.location.href = "/login";
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Button variant="outline" className="gap-2" onClick={handleSave}>
        <Bookmark className="h-4 w-4" />
        Save
      </Button>
      <Button variant="outline" className="gap-2" onClick={handleShare}>
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            Copied!
          </>
        ) : (
          <>
            <Share2 className="h-4 w-4" />
            Share
          </>
        )}
      </Button>
    </div>
  );
}
