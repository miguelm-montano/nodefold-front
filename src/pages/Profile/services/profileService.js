import { updateProfile, deleteAccount } from "../../../services/userService";

/**
 * Update a single profile field (name, email, etc.)
 */
export const updateUserField = async (field, value) => {
  const response = await updateProfile({ [field]: value });
  return response.data;
};

/**
 * Update user password
 */
export const updateUserPassword = async (password, confirmation) => {
  const response = await updateProfile({
    password,
    password_confirmation: confirmation,
  });

  return response.data;
};

/**
 * Delete user account
 */
export const deleteUserAccount = async () => {
  return await deleteAccount();
};
