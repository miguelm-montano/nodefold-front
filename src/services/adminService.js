import api from "./api";

export const getUsers = (params) => api.get("/admin/users", { params });
export const deleteUser = (id) => api.delete(`/admin/users/${id}`);
export const getStats = () => api.get("/admin/stats");
