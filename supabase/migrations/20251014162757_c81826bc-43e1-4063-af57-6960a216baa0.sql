-- Create member_photos table
CREATE TABLE public.member_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  member_name TEXT NOT NULL,
  caption TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.member_photos ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view member photos" 
ON public.member_photos 
FOR SELECT 
USING (true);

-- Create policy for inserting photos (public can upload)
CREATE POLICY "Anyone can upload member photos" 
ON public.member_photos 
FOR INSERT 
WITH CHECK (true);

-- Create policy for updating likes
CREATE POLICY "Anyone can update photo likes" 
ON public.member_photos 
FOR UPDATE 
USING (true);

-- Create storage bucket for member photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('member-photos', 'member-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for member photos
CREATE POLICY "Public can view member photos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'member-photos');

CREATE POLICY "Anyone can upload member photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'member-photos');
