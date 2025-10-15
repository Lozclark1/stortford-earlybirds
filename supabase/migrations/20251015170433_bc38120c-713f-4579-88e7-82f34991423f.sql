-- Fix 1: Restrict member access to profiles table to prevent PII exposure
-- Drop the overly permissive policy that allows members to view all profile data
DROP POLICY IF EXISTS "Members can view public profile data" ON public.profiles;

-- Create restrictive policy: users can only view their own profile, admins can view all
CREATE POLICY "Members can only see own profile"
ON public.profiles 
FOR SELECT
USING (
  id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role)
);

-- Fix 2: Add role management policies to user_roles table
-- Allow users to assign themselves 'member' role during signup
CREATE POLICY "Users can be assigned member role on signup"
ON public.user_roles 
FOR INSERT
TO authenticated
WITH CHECK (
  user_id = auth.uid() AND 
  role = 'member'::app_role
);

-- Allow admins to assign any role to any user
CREATE POLICY "Admins can assign roles"
ON public.user_roles 
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to modify any role
CREATE POLICY "Admins can modify roles"
ON public.user_roles 
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to remove any role
CREATE POLICY "Admins can remove roles"
ON public.user_roles 
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));