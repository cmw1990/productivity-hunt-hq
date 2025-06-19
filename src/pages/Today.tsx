
import { ProductList } from '@/components/products/ProductList'

export default function Today() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Today's Productivity Tools
        </h1>
        <p className="text-xl text-muted-foreground">
          {today}
        </p>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Fresh productivity tools launched today. Be among the first to discover and try them out!
        </p>
      </div>

      <ProductList filter="today" />
    </div>
  )
}
