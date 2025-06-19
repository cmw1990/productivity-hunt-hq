
import { ProductList } from '@/components/products/ProductList'

export default function Featured() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Featured Productivity Tools
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Hand-picked by our team, these exceptional productivity tools represent the best of what's available.
        </p>
      </div>

      <ProductList filter="featured" />
    </div>
  )
}
