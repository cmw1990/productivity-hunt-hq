
import { useState } from 'react';
import { Search, TrendingUp, Calendar, Filter, Star, ArrowUp, MessageSquare, Share, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All', count: 124 },
    { id: 'apps', name: 'Apps', count: 45 },
    { id: 'templates', name: 'Templates', count: 32 },
    { id: 'tools', name: 'Tools', count: 28 },
    { id: 'gear', name: 'Gear', count: 19 }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "FocusFlow",
      tagline: "AI-powered focus sessions with ambient soundscapes",
      votes: 234,
      comments: 45,
      category: "Apps",
      maker: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
      badges: ["Featured", "New"],
      isLaunching: true
    },
    {
      id: 2,
      name: "TaskMaster Pro",
      tagline: "The ultimate project management tool for productivity enthusiasts",
      votes: 189,
      comments: 32,
      category: "Apps",
      maker: "David Kumar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
      badges: ["Trending"],
      isLaunching: false
    },
    {
      id: 3,
      name: "Minimal Notion Templates",
      tagline: "Beautiful, clean templates for your productivity workspace",
      votes: 156,
      comments: 28,
      category: "Templates",
      maker: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop",
      badges: ["Popular"],
      isLaunching: false
    }
  ];

  const todayProducts = [
    {
      id: 4,
      name: "DeepWork Timer",
      tagline: "Pomodoro technique with AI-powered break suggestions",
      votes: 142,
      comments: 23,
      category: "Apps",
      maker: "Alex Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
      badges: ["New"],
      isLaunching: true
    },
    {
      id: 5,
      name: "Productivity Desk Setup",
      tagline: "Ergonomic standing desk with built-in wireless charging",
      votes: 98,
      comments: 15,
      category: "Gear",
      maker: "Tech Innovations",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
      badges: ["Gear"],
      isLaunching: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Productivity Hunt</span>
              </div>
              <div className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">Products</a>
                <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">Collections</a>
                <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">Stories</a>
                <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">Jobs</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-10 w-64 bg-gray-50 border-gray-200 focus:border-orange-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 hover:border-orange-300">
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
                Submit Product
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Discover the best{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              productivity tools
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The ultimate destination for productivity enthusiasts. Find apps, templates, tools, and gear to supercharge your workflow.
          </p>
        </div>

        {/* Today's Date */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200">
            <Calendar className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-gray-700">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white rounded-full p-1 shadow-sm border border-gray-200">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">🏆 Featured Products</h2>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product, index) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border-gray-200 hover:border-orange-200">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex space-x-1">
                    {product.badges.map((badge) => (
                      <Badge 
                        key={badge} 
                        variant="secondary" 
                        className={`text-xs ${
                          badge === 'Featured' ? 'bg-orange-100 text-orange-700' : 
                          badge === 'New' ? 'bg-blue-100 text-blue-700' :
                          badge === 'Trending' ? 'bg-green-100 text-green-700' :
                          'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  {product.isLaunching && (
                    <div className="absolute top-3 right-3">
                      <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                        LIVE
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{product.tagline}</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-3 hover:bg-orange-50 hover:border-orange-300">
                      <ArrowUp className="w-4 h-4 mr-1" />
                      {product.votes}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img 
                        src={product.avatar} 
                        alt={product.maker}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-gray-600">{product.maker}</span>
                      <Badge variant="outline" className="text-xs">{product.category}</Badge>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-500">
                      <button className="flex items-center space-x-1 hover:text-orange-600 transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-sm">{product.comments}</span>
                      </button>
                      <button className="hover:text-orange-600 transition-colors">
                        <Share className="w-4 h-4" />
                      </button>
                      <button className="hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Today's Products */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🚀 Launching Today</h2>
        <div className="space-y-4">
          {todayProducts.map((product, index) => (
            <Card key={product.id} className="group hover:shadow-md transition-all duration-300 bg-white border-gray-200 hover:border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="text-2xl font-bold text-orange-600">#{index + 4}</div>
                  </div>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 mt-1">{product.tagline}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <img 
                            src={product.avatar} 
                            alt={product.maker}
                            className="w-4 h-4 rounded-full"
                          />
                          <span className="text-sm text-gray-500">{product.maker}</span>
                          <Badge variant="outline" className="text-xs">{product.category}</Badge>
                          {product.badges.map((badge) => (
                            <Badge 
                              key={badge} 
                              variant="secondary" 
                              className="text-xs bg-blue-100 text-blue-700"
                            >
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3 text-gray-500">
                          <button className="flex items-center space-x-1 hover:text-orange-600 transition-colors">
                            <MessageSquare className="w-4 h-4" />
                            <span className="text-sm">{product.comments}</span>
                          </button>
                          <button className="hover:text-orange-600 transition-colors">
                            <Share className="w-4 h-4" />
                          </button>
                          <button className="hover:text-red-500 transition-colors">
                            <Heart className="w-4 h-4" />
                          </button>
                        </div>
                        <Button variant="outline" className="hover:bg-orange-50 hover:border-orange-300">
                          <ArrowUp className="w-4 h-4 mr-1" />
                          {product.votes}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Have a productivity tool to share?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of makers and hunters discovering the best productivity tools
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-50">
              Submit Your Product
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
              Join the Community
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Productivity Hunt</span>
              </div>
              <p className="text-gray-400">
                The best place to discover productivity tools, apps, and gear.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">Browse</a>
                <a href="#" className="block hover:text-white transition-colors">Submit</a>
                <a href="#" className="block hover:text-white transition-colors">Collections</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">Stories</a>
                <a href="#" className="block hover:text-white transition-colors">Newsletter</a>
                <a href="#" className="block hover:text-white transition-colors">Jobs</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">About</a>
                <a href="#" className="block hover:text-white transition-colors">Privacy</a>
                <a href="#" className="block hover:text-white transition-colors">Terms</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Productivity Hunt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
