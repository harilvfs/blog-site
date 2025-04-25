export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  content: string;
  coverImage?: string;
  tags?: string[];
}

export interface BlogPostMeta {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  coverImage?: string;
  tags?: string[];
} 