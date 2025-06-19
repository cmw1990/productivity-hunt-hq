
-- Create productivity_hunt schema and all necessary tables
CREATE SCHEMA IF NOT EXISTS productivity_hunt;

-- Enable RLS on schema
ALTER SCHEMA productivity_hunt OWNER TO postgres;

-- Users table (extends auth.users)
CREATE TABLE productivity_hunt.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  website_url TEXT,
  twitter_handle VARCHAR(50),
  linkedin_url TEXT,
  location VARCHAR(100),
  is_maker BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  points INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE productivity_hunt.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  color VARCHAR(20),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE productivity_hunt.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  tagline VARCHAR(300) NOT NULL,
  description TEXT NOT NULL,
  website_url VARCHAR(500) NOT NULL,
  logo_url TEXT,
  gallery_urls TEXT[],
  maker_comment TEXT,
  pricing_model VARCHAR(50), -- free, freemium, paid, subscription
  launch_date DATE,
  is_featured BOOLEAN DEFAULT false,
  is_coming_soon BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'draft', -- draft, pending, approved, rejected
  category_id UUID REFERENCES productivity_hunt.categories(id),
  maker_id UUID REFERENCES productivity_hunt.users(id) ON DELETE CASCADE,
  votes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product tags table
CREATE TABLE productivity_hunt.product_tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES productivity_hunt.products(id) ON DELETE CASCADE,
  tag VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(product_id, tag)
);

-- Votes table
CREATE TABLE productivity_hunt.votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES productivity_hunt.products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES productivity_hunt.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(product_id, user_id)
);

-- Comments table
CREATE TABLE productivity_hunt.comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES productivity_hunt.products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES productivity_hunt.users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES productivity_hunt.comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  votes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Comment votes table
CREATE TABLE productivity_hunt.comment_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  comment_id UUID REFERENCES productivity_hunt.comments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES productivity_hunt.users(id) ON DELETE CASCADE,
  vote_type VARCHAR(10) CHECK (vote_type IN ('up', 'down')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(comment_id, user_id)
);

-- Collections table
CREATE TABLE productivity_hunt.collections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  is_public BOOLEAN DEFAULT true,
  curator_id UUID REFERENCES productivity_hunt.users(id) ON DELETE CASCADE,
  products_count INTEGER DEFAULT 0,
  followers_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Collection products table
CREATE TABLE productivity_hunt.collection_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  collection_id UUID REFERENCES productivity_hunt.collections(id) ON DELETE CASCADE,
  product_id UUID REFERENCES productivity_hunt.products(id) ON DELETE CASCADE,
  added_by UUID REFERENCES productivity_hunt.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(collection_id, product_id)
);

-- Collection followers table
CREATE TABLE productivity_hunt.collection_followers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  collection_id UUID REFERENCES productivity_hunt.collections(id) ON DELETE CASCADE,
  user_id UUID REFERENCES productivity_hunt.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(collection_id, user_id)
);

-- User follows table
CREATE TABLE productivity_hunt.user_follows (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  follower_id UUID REFERENCES productivity_hunt.users(id) ON DELETE CASCADE,
  following_id UUID REFERENCES productivity_hunt.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Notifications table
CREATE TABLE productivity_hunt.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES productivity_hunt.users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- vote, comment, follow, mention, product_approved
  title VARCHAR(200) NOT NULL,
  message TEXT,
  is_read BOOLEAN DEFAULT false,
  related_product_id UUID REFERENCES productivity_hunt.products(id) ON DELETE CASCADE,
  related_user_id UUID REFERENCES productivity_hunt.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO productivity_hunt.categories (name, slug, description, icon, color) VALUES
('Apps', 'apps', 'Mobile and web applications for productivity', 'Smartphone', 'blue'),
('Templates', 'templates', 'Ready-to-use templates and workflows', 'FileText', 'green'),
('Tools', 'tools', 'Software tools and utilities', 'Tool', 'purple'),
('Gear', 'gear', 'Physical products and hardware', 'Settings', 'orange'),
('Books', 'books', 'Productivity books and guides', 'Book', 'red'),
('Courses', 'courses', 'Online courses and training', 'GraduationCap', 'indigo');

-- Create indexes for better performance
CREATE INDEX idx_products_launch_date ON productivity_hunt.products(launch_date DESC);
CREATE INDEX idx_products_votes_count ON productivity_hunt.products(votes_count DESC);
CREATE INDEX idx_products_category ON productivity_hunt.products(category_id);
CREATE INDEX idx_products_maker ON productivity_hunt.products(maker_id);
CREATE INDEX idx_votes_product ON productivity_hunt.votes(product_id);
CREATE INDEX idx_votes_user ON productivity_hunt.votes(user_id);
CREATE INDEX idx_comments_product ON productivity_hunt.comments(product_id);
CREATE INDEX idx_notifications_user ON productivity_hunt.notifications(user_id, is_read);

-- Enable Row Level Security
ALTER TABLE productivity_hunt.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE productivity_hunt.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE productivity_hunt.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE productivity_hunt.product_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE productivity_hunt.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE productivity_hunt.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE productivity_hunt.comment_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE productivity_hunt.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE productivity_hunt.collection_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE productivity_hunt.collection_followers ENABLE ROW LEVEL SECURITY;
ALTER TABLE productivity_hunt.user_follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE productivity_hunt.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users policies
CREATE POLICY "Users can view all profiles" ON productivity_hunt.users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON productivity_hunt.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON productivity_hunt.users FOR INSERT WITH CHECK (auth.uid() = id);

-- Categories policies
CREATE POLICY "Anyone can view categories" ON productivity_hunt.categories FOR SELECT USING (is_active = true);

-- Products policies
CREATE POLICY "Anyone can view approved products" ON productivity_hunt.products FOR SELECT USING (status = 'approved');
CREATE POLICY "Makers can view their own products" ON productivity_hunt.products FOR SELECT USING (auth.uid() = maker_id);
CREATE POLICY "Makers can insert products" ON productivity_hunt.products FOR INSERT WITH CHECK (auth.uid() = maker_id);
CREATE POLICY "Makers can update their own products" ON productivity_hunt.products FOR UPDATE USING (auth.uid() = maker_id);

-- Product tags policies
CREATE POLICY "Anyone can view product tags" ON productivity_hunt.product_tags FOR SELECT USING (true);
CREATE POLICY "Product owners can manage tags" ON productivity_hunt.product_tags FOR ALL USING (
  EXISTS (SELECT 1 FROM productivity_hunt.products WHERE id = product_id AND maker_id = auth.uid())
);

-- Votes policies
CREATE POLICY "Anyone can view votes" ON productivity_hunt.votes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can vote" ON productivity_hunt.votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own votes" ON productivity_hunt.votes FOR DELETE USING (auth.uid() = user_id);

-- Comments policies
CREATE POLICY "Anyone can view comments" ON productivity_hunt.comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can comment" ON productivity_hunt.comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own comments" ON productivity_hunt.comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own comments" ON productivity_hunt.comments FOR DELETE USING (auth.uid() = user_id);

-- Comment votes policies
CREATE POLICY "Anyone can view comment votes" ON productivity_hunt.comment_votes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can vote on comments" ON productivity_hunt.comment_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own comment votes" ON productivity_hunt.comment_votes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own comment votes" ON productivity_hunt.comment_votes FOR DELETE USING (auth.uid() = user_id);

-- Collections policies
CREATE POLICY "Anyone can view public collections" ON productivity_hunt.collections FOR SELECT USING (is_public = true);
CREATE POLICY "Curators can view their own collections" ON productivity_hunt.collections FOR SELECT USING (auth.uid() = curator_id);
CREATE POLICY "Authenticated users can create collections" ON productivity_hunt.collections FOR INSERT WITH CHECK (auth.uid() = curator_id);
CREATE POLICY "Curators can update their own collections" ON productivity_hunt.collections FOR UPDATE USING (auth.uid() = curator_id);
CREATE POLICY "Curators can delete their own collections" ON productivity_hunt.collections FOR DELETE USING (auth.uid() = curator_id);

-- Collection products policies
CREATE POLICY "Anyone can view collection products" ON productivity_hunt.collection_products FOR SELECT USING (
  EXISTS (SELECT 1 FROM productivity_hunt.collections WHERE id = collection_id AND is_public = true)
);
CREATE POLICY "Collection curators can manage products" ON productivity_hunt.collection_products FOR ALL USING (
  EXISTS (SELECT 1 FROM productivity_hunt.collections WHERE id = collection_id AND curator_id = auth.uid())
);

-- Collection followers policies
CREATE POLICY "Anyone can view collection followers" ON productivity_hunt.collection_followers FOR SELECT USING (true);
CREATE POLICY "Users can follow collections" ON productivity_hunt.collection_followers FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unfollow collections" ON productivity_hunt.collection_followers FOR DELETE USING (auth.uid() = user_id);

-- User follows policies
CREATE POLICY "Anyone can view user follows" ON productivity_hunt.user_follows FOR SELECT USING (true);
CREATE POLICY "Users can follow others" ON productivity_hunt.user_follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can unfollow others" ON productivity_hunt.user_follows FOR DELETE USING (auth.uid() = follower_id);

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON productivity_hunt.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own notifications" ON productivity_hunt.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Functions to update counts
CREATE OR REPLACE FUNCTION productivity_hunt.update_product_votes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE productivity_hunt.products 
    SET votes_count = votes_count + 1 
    WHERE id = NEW.product_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE productivity_hunt.products 
    SET votes_count = votes_count - 1 
    WHERE id = OLD.product_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION productivity_hunt.update_product_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE productivity_hunt.products 
    SET comments_count = comments_count + 1 
    WHERE id = NEW.product_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE productivity_hunt.products 
    SET comments_count = comments_count - 1 
    WHERE id = OLD.product_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER update_product_votes_count_trigger
  AFTER INSERT OR DELETE ON productivity_hunt.votes
  FOR EACH ROW EXECUTE FUNCTION productivity_hunt.update_product_votes_count();

CREATE TRIGGER update_product_comments_count_trigger
  AFTER INSERT OR DELETE ON productivity_hunt.comments
  FOR EACH ROW EXECUTE FUNCTION productivity_hunt.update_product_comments_count();

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION productivity_hunt.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON productivity_hunt.users FOR EACH ROW EXECUTE FUNCTION productivity_hunt.update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON productivity_hunt.products FOR EACH ROW EXECUTE FUNCTION productivity_hunt.update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON productivity_hunt.comments FOR EACH ROW EXECUTE FUNCTION productivity_hunt.update_updated_at_column();
CREATE TRIGGER update_collections_updated_at BEFORE UPDATE ON productivity_hunt.collections FOR EACH ROW EXECUTE FUNCTION productivity_hunt.update_updated_at_column();
