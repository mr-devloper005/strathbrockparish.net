'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { UserPlus, UserCheck, Share2, Link2, ArrowUpRight, Check } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/lib/auth-context'

interface ProfileActionButtonsProps {
  username: string
  website?: string
  domain?: string
}

export function ProfileActionButtons({ username, website, domain }: ProfileActionButtonsProps) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [shareLabel, setShareLabel] = useState('Share')
  const { toast } = useToast()
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  const handleFollow = () => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    setIsFollowing(!isFollowing)
    toast({
      title: isFollowing ? 'Unfollowed' : 'Following',
      description: isFollowing
        ? `You are no longer following ${username}`
        : `You are now following ${username}`,
    })
  }

  const handleShare = async () => {
    try {
      const url = window.location.href
      await navigator.clipboard.writeText(url)
      setShareLabel('Copied!')
      toast({
        title: 'Link copied',
        description: 'Profile URL copied to clipboard',
      })
      setTimeout(() => setShareLabel('Share'), 2000)
    } catch {
      toast({
        title: 'Copy failed',
        description: 'Could not copy link to clipboard',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card className="border-border/60">
      <CardContent className="space-y-3 p-4">
        <Button
          className={`w-full gap-2 ${
            isFollowing
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-red-500 text-white hover:bg-red-600'
          }`}
          size="lg"
          onClick={handleFollow}
        >
          {isFollowing ? (
            <>
              <UserCheck className="h-4 w-4" />
              Following
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4" />
              Follow
            </>
          )}
        </Button>

        <Button
          variant="outline"
          className="w-full gap-2"
          size="lg"
          onClick={handleShare}
        >
          {shareLabel === 'Copied!' ? (
            <Check className="h-4 w-4" />
          ) : (
            <Share2 className="h-4 w-4" />
          )}
          {shareLabel}
        </Button>

        {website && (
          <Button variant="outline" className="w-full gap-2" size="lg" asChild>
            <Link href={website} target="_blank" rel="noopener noreferrer">
              <Link2 className="h-4 w-4" />
              {domain}
              <ArrowUpRight className="ml-auto h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
