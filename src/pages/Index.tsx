
import { useState } from 'react'
import { ProductList } from '@/components/products/ProductList'
import { CategoryFilter } from '@/components/categories/CategoryFilter'

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          The best productivity tools, curated daily
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover amazing productivity apps, templates, tools, and gear to boost your efficiency and get more done.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <ProductList filter="popular" categoryId={selectedCategory} />
      </div>
    </div>
  )
}
