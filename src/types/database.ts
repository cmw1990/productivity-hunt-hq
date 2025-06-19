
export interface Database {
  productivity_hunt: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string
          full_name: string | null
          bio: string | null
          avatar_url: string | null
          website_url: string | null
          twitter_handle: string | null
          linkedin_url: string | null
          location: string | null
          is_maker: boolean
          is_verified: boolean
          points: number
          streak_days: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          full_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          website_url?: string | null
          twitter_handle?: string | null
          linkedin_url?: string | null
          location?: string | null
          is_maker?: boolean
          is_verified?: boolean
          points?: number
          streak_days?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          website_url?: string | null
          twitter_handle?: string | null
          linkedin_url?: string | null
          location?: string | null
          is_maker?: boolean
          is_verified?: boolean
          points?: number
          streak_days?: number
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          color: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          color?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          color?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          tagline: string
          description: string
          website_url: string
          logo_url: string | null
          gallery_urls: string[] | null
          maker_comment: string | null
          pricing_model: string | null
          launch_date: string | null
          is_featured: boolean
          is_coming_soon: boolean
          status: string
          category_id: string | null
          maker_id: string | null
          votes_count: number
          comments_count: number
          views_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          tagline: string
          description: string
          website_url: string
          logo_url?: string | null
          gallery_urls?: string[] | null
          maker_comment?: string | null
          pricing_model?: string | null
          launch_date?: string | null
          is_featured?: boolean
          is_coming_soon?: boolean
          status?: string
          category_id?: string | null
          maker_id?: string | null
          votes_count?: number
          comments_count?: number
          views_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          tagline?: string
          description?: string
          website_url?: string
          logo_url?: string | null
          gallery_urls?: string[] | null
          maker_comment?: string | null
          pricing_model?: string | null
          launch_date?: string | null
          is_featured?: boolean
          is_coming_soon?: boolean
          status?: string
          category_id?: string | null
          maker_id?: string | null
          votes_count?: number
          comments_count?: number
          views_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      votes: {
        Row: {
          id: string
          product_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          user_id?: string
          created_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          product_id: string
          user_id: string
          parent_id: string | null
          content: string
          votes_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          user_id: string
          parent_id?: string | null
          content: string
          votes_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          user_id?: string
          parent_id?: string | null
          content?: string
          votes_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      collections: {
        Row: {
          id: string
          name: string
          description: string | null
          cover_image_url: string | null
          is_public: boolean
          curator_id: string
          products_count: number
          followers_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          cover_image_url?: string | null
          is_public?: boolean
          curator_id: string
          products_count?: number
          followers_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          cover_image_url?: string | null
          is_public?: boolean
          curator_id?: string
          products_count?: number
          followers_count?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type Product = Database['productivity_hunt']['Tables']['products']['Row']
export type User = Database['productivity_hunt']['Tables']['users']['Row']
export type Category = Database['productivity_hunt']['Tables']['categories']['Row']
export type Vote = Database['productivity_hunt']['Tables']['votes']['Row']
export type Comment = Database['productivity_hunt']['Tables']['comments']['Row']
export type Collection = Database['productivity_hunt']['Tables']['collections']['Row']
