"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth-context";

interface FollowButtonProps {
  authorName: string;
}

export function FollowButton({ authorName }: FollowButtonProps) {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);

  // Load follow state from localStorage on mount
  useEffect(() => {
    const followedUsers = JSON.parse(localStorage.getItem("followedUsers") || "[]");
    setIsFollowing(followedUsers.includes(authorName));
  }, [authorName]);

  const handleFollow = () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to follow this curator.",
        variant: "destructive",
      });
      return;
    }

    const followedUsers = JSON.parse(localStorage.getItem("followedUsers") || "[]");
    
    if (isFollowing) {
      // Unfollow
      const updated = followedUsers.filter((name: string) => name !== authorName);
      localStorage.setItem("followedUsers", JSON.stringify(updated));
      setIsFollowing(false);
      toast({
        title: "Unfollowed",
        description: `You unfollowed ${authorName}.`,
      });
    } else {
      // Follow
      followedUsers.push(authorName);
      localStorage.setItem("followedUsers", JSON.stringify(followedUsers));
      setIsFollowing(true);
      toast({
        title: "Following",
        description: `You are now following ${authorName}.`,
      });
    }
  };

  return (
    <Button
      className="gap-2 w-full sm:w-auto"
      size="lg"
      variant={isFollowing ? "outline" : "default"}
      onClick={handleFollow}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
}
