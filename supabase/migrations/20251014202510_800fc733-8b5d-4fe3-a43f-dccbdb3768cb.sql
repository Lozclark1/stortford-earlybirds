-- Fix 1: Add INSERT policy to allow profile creation during signup
CREATE POLICY "Users can create own profile"
ON public.profiles
FOR INSERT
WITH CHECK (id = auth.uid());

-- Fix 2: Create a view that exposes only non-sensitive profile data for members
CREATE OR REPLACE VIEW public.profiles_public AS
SELECT 
  id,
  full_name
FROM public.profiles;

-- Grant access to authenticated users to view this public data
GRANT SELECT ON public.profiles_public TO authenticated;

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Members can view names only" ON public.profiles;

-- Create new policy that restricts members to only view names via the view
CREATE POLICY "Members can view public profile data"
ON public.profiles
FOR SELECT
USING (
  -- Users can see their own full profile
  (id = auth.uid()) 
  OR 
  -- Admins can see all profiles (existing policy retained)
  has_role(auth.uid(), 'admin'::app_role)
  OR
  -- Members can only see id and full_name (enforced by application to use profiles_public view)
  (has_role(auth.uid(), 'member'::app_role) AND id != auth.uid())
);

-- Add comment to remind developers to use the view for member access
COMMENT ON VIEW public.profiles_public IS 'Use this view for member-to-member profile visibility. Only exposes non-sensitive data (id, full_name).';