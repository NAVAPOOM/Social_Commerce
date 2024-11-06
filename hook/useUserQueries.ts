// react-query/userQueries.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js'; // import User type

const supabase = createClient();

interface CustomUser extends User {
  display_name?: string; // Include custom fields from user_metadata
}

// Function to fetch the current user
const fetchUser = async (): Promise<CustomUser | null> => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  if (data?.user) {
    return {
      ...data.user,
      display_name: data.user.user_metadata?.display_name || "Anonymous",
    };
  }
  return null; // return null if user not found
};

// Custom hook to use the fetchUser function
export const useUserQuery = () => {
  return useQuery<CustomUser | null>({
    queryKey: ['user'],
    queryFn: fetchUser,
  });
};

// Function to update the user information
const updateUser = async (user: Partial<User>) => {
  const { data, error } = await supabase.auth.updateUser(user);
  if (error) throw new Error(error.message);
  return data.user;
};

// Custom hook to use the updateUser function
export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] }); // Invalidate the user query to refetch
    },
  });
};