
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/integrations/supabase/client'
import { Category } from '@/types/database'
import * as Icons from 'lucide-react'

interface CategoryFilterProps {
  selectedCategory?: string
  onCategoryChange: (categoryId?: string) => void
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('productivity_hunt.categories')
        .select('*')
        .eq('is_active', true)
        .order('name')

      if (error) throw error
      return data as Category[]
    },
  })

  if (isLoading) {
    return (
      <div className="flex space-x-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-10 w-20 bg-muted rounded-md animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={!selectedCategory ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange(undefined)}
        className="h-10"
      >
        All
      </Button>
      
      {categories?.map((category) => {
        const IconComponent = Icons[category.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>
        
        return (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className="h-10 space-x-2"
          >
            {IconComponent && <IconComponent className="h-4 w-4" />}
            <span>{category.name}</span>
          </Button>
        )
      })}
    </div>
  )
}
