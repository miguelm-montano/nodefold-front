import api from "./api";

export const getResources = (params) => api.get("/resources", { params });
export const getResource = (id) => api.get(`/resources/${id}`);
export const createResource = (folderId, data) =>
  api.post(`/folders/${folderId}/resources`, data);
export const updateResource = (id, data) => api.put(`/resources/${id}`, data);
export const deleteResource = (id) => api.delete(`/resources/${id}`);
