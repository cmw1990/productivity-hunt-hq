
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { ProductCard } from './ProductCard'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'

interface ProductListProps {
  filter?: 'popular' | 'today' | 'featured'
  categoryId?: string
  limit?: number
}

export function ProductList({ filter = 'popular', categoryId, limit }: ProductListProps) {
  const { user } = useAuth()

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', filter, categoryId, user?.id],
    queryFn: async () => {
      let query = supabase
        .from('productivity_hunt.products')
        .select(`
          *,
          maker:productivity_hunt.users!products_maker_id_fkey(
            id,
            username,
            avatar_url,
            is_verified
          ),
          category:productivity_hunt.categories!products_category_id_fkey(
            id,
            name,
            color
          )
        `)
        .eq('status', 'approved')

      if (categoryId) {
        query = query.eq('category_id', categoryId)
      }

      if (filter === 'today') {
        const today = new Date().toISOString().split('T')[0]
        query = query.eq('launch_date', today)
      } else if (filter === 'featured') {
        query = query.eq('is_featured', true)
      }

      if (filter === 'popular') {
        query = query.order('votes_count', { ascending: false })
      } else {
        query = query.order('created_at', { ascending: false })
      }

      if (limit) {
        query = query.limit(limit)
      }

      const { data, error } = await query

      if (error) throw error

      // Check if user has voted for each product
      if (user && data) {
        const productIds = data.map(p => p.id)
        const { data: userVotes } = await supabase
          .from('productivity_hunt.votes')
          .select('product_id')
          .eq('user_id', user.id)
          .in('product_id', productIds)

        const votedProductIds = new Set(userVotes?.map(v => v.product_id) || [])
        
        return data.map(product => ({
          ...product,
          user_voted: votedProductIds.has(product.id)
        }))
      }

      return data?.map(product => ({
        ...product,
        user_voted: false
      })) || []
    },
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Skeleton className="w-16 h-16 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <Skeleton className="w-16 h-20" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Error loading products. Please try again.</p>
      </div>
    )
  }

  if (!products?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No products found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          rank={filter === 'popular' ? index + 1 : undefined}
        />
      ))}
    </div>
  )
}
