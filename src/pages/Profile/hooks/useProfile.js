import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

import {
  updateUserField,
  updateUserPassword,
  deleteUserAccount,
} from "../services/profileService";

export function useProfile(onClose) {
  const { user, login, token, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleClose = () => onClose();

  // 🔹 Update name / email
  const handleSaveField = async (field, value) => {
    if (!value.trim()) return;

    setSaveError(null);
    setSaveSuccess(null);

    try {
      const data = await updateUserField(field, value);

      if (field === "name") setName(data.name);
      if (field === "email") setEmail(data.email);

      login(token, data);

      setSaveSuccess(
        `${field.charAt(0).toUpperCase() + field.slice(1)} updated`,
      );

      setTimeout(() => setSaveSuccess(null), 2500);
    } catch (err) {
      setSaveError(err.response?.data?.message || "Something went wrong");
    }
  };

  // 🔹 Update password
  const handleSavePassword = async (e) => {
    e.preventDefault();

    setSaveError(null);
    setSaveSuccess(null);

    if (passwords.new !== passwords.confirm) {
      setSaveError("Passwords do not match");
      return;
    }

    try {
      await updateUserPassword(passwords.new, passwords.confirm);

      setPasswords({ current: "", new: "", confirm: "" });

      setSaveSuccess("Password updated");
      setTimeout(() => setSaveSuccess(null), 2500);
    } catch (err) {
      setSaveError(err.response?.data?.message || "Something went wrong");
    }
  };

  // 🔹 Delete account
  const handleDeleteAccount = async () => {
    try {
      await deleteUserAccount();
      logout();
      navigate("/");
    } catch (err) {
      setSaveError(err.response?.data?.message || "Something went wrong");
    }
  };

  return {
    // state
    name,
    email,
    passwords,
    setPasswords,
    saveError,
    saveSuccess,
    showConfirmDelete,
    setShowConfirmDelete,

    // actions
    handleSaveField,
    handleSavePassword,
    handleDeleteAccount,
    handleClose,
  };
}
