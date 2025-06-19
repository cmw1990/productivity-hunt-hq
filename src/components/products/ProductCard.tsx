
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChevronUp, MessageCircle, ExternalLink, Share2 } from 'lucide-react'
import { Product, User, Category } from '@/types/database'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

interface ProductCardProps {
  product: Product & {
    maker?: User
    category?: Category
    user_voted?: boolean
  }
  rank?: number
}

export function ProductCard({ product, rank }: ProductCardProps) {
  const [votes, setVotes] = useState(product.votes_count)
  const [hasVoted, setHasVoted] = useState(product.user_voted || false)
  const [isVoting, setIsVoting] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  const handleVote = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!user) {
      toast({
        title: "Sign in required",
        description: "You need to sign in to vote for products.",
        variant: "destructive",
      })
      return
    }

    setIsVoting(true)

    try {
      if (hasVoted) {
        // Remove vote
        const { error } = await supabase
          .from('productivity_hunt.votes')
          .delete()
          .eq('product_id', product.id)
          .eq('user_id', user.id)

        if (error) throw error

        setVotes(votes - 1)
        setHasVoted(false)
        toast({
          title: "Vote removed",
          description: "Your vote has been removed.",
        })
      } else {
        // Add vote
        const { error } = await supabase
          .from('productivity_hunt.votes')
          .insert({
            product_id: product.id,
            user_id: user.id,
          })

        if (error) throw error

        setVotes(votes + 1)
        setHasVoted(true)
        toast({
          title: "Voted!",
          description: "Thanks for your vote!",
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsVoting(false)
    }
  }

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.tagline,
          url: `${window.location.origin}/products/${product.id}`,
        })
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/products/${product.id}`)
      toast({
        title: "Link copied!",
        description: "Product link copied to clipboard.",
      })
    }
  }

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <Link to={`/products/${product.id}`} className="block">
          <div className="flex items-start space-x-4">
            {rank && (
              <div className="flex-shrink-0 w-8 text-center">
                <span className="text-2xl font-bold text-muted-foreground">
                  {rank}
                </span>
              </div>
            )}
            
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden">
                {product.logo_url ? (
                  <img
                    src={product.logo_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 text-white font-bold text-lg">
                    {product.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg leading-6 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground mt-1 line-clamp-2">
                    {product.tagline}
                  </p>
                  
                  <div className="flex items-center space-x-4 mt-3">
                    {product.category && (
                      <Badge variant="secondary" className="text-xs">
                        {product.category.name}
                      </Badge>
                    )}
                    
                    {product.pricing_model && (
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs",
                          product.pricing_model === 'free' && "border-green-200 text-green-700",
                          product.pricing_model === 'freemium' && "border-blue-200 text-blue-700",
                          product.pricing_model === 'paid' && "border-orange-200 text-orange-700"
                        )}
                      >
                        {product.pricing_model}
                      </Badge>
                    )}
                  </div>

                  {product.maker && (
                    <div className="flex items-center space-x-2 mt-3">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={product.maker.avatar_url || ''} />
                        <AvatarFallback className="text-xs">
                          {product.maker.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">
                        by @{product.maker.username}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end space-y-2 ml-4">
                  <Button
                    variant={hasVoted ? "default" : "outline"}
                    size="sm"
                    className="flex flex-col items-center h-auto py-2 px-3 min-w-[60px]"
                    onClick={handleVote}
                    disabled={isVoting}
                  >
                    <ChevronUp className="h-4 w-4" />
                    <span className="text-xs font-medium mt-1">{votes}</span>
                  </Button>

                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/products/${product.id}#comments`}>
                        <MessageCircle className="h-4 w-4" />
                        <span className="ml-1 text-xs">{product.comments_count}</span>
                      </Link>
                    </Button>
                    
                    <Button variant="ghost" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                    
                    <Button variant="ghost" size="sm" asChild>
                      <a href={product.website_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}
