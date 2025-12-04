/*
  # Remove User Authentication

  1. Cleanup
    - Drop user_profiles table
    - Drop handle_new_user function
    - Drop trigger on auth.users
  
  2. Notes
    - This removes all authentication and role-based access control
    - Application will be accessible without login
*/

-- Drop trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop function
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Drop table
DROP TABLE IF EXISTS user_profiles;