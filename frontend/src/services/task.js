import apiClient from "./api";

export async function getTasks() {
  const response = await apiClient.get("/tasks");
  return response.data;
}

export async function createTask(data) {
  const response = await apiClient.post("/tasks", data);
  return response.data;
}

export async function updateTask(id, data) {
  const response = await apiClient.put(`/tasks/${id}`, data);
  return response.data;
}

export async function toggleTask(id) {
  await apiClient.patch(`/tasks/${id}/toggle`);
}

export async function deleteTask(id) {
  await apiClient.delete(`/tasks/${id}`);
}
