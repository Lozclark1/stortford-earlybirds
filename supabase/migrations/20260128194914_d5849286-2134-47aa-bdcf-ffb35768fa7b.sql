-- Allow admins to delete photos from the gallery
CREATE POLICY "Admins can delete photos"
ON public.member_photos
FOR DELETE
USING (has_role(auth.uid(), 'admin'));