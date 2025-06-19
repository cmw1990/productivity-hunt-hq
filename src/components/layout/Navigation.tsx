
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { TrendingUp, Calendar, Star, Users, BookOpen } from 'lucide-react'

const navigationItems = [
  { name: 'Popular', href: '/', icon: TrendingUp },
  { name: 'Today', href: '/today', icon: Calendar },
  { name: 'Featured', href: '/featured', icon: Star },
  { name: 'Collections', href: '/collections', icon: BookOpen },
  { name: 'Community', href: '/community', icon: Users },
]

export function Navigation() {
  const location = useLocation()

  return (
    <nav className="border-b bg-background">
      <div className="container">
        <div className="flex space-x-8">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center space-x-2 py-4 text-sm font-medium border-b-2 border-transparent transition-colors hover:text-foreground/80',
                  isActive
                    ? 'text-foreground border-primary'
                    : 'text-foreground/60'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
