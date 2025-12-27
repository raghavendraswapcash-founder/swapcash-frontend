import API from "./api";

export const createSwapRequest = async (swapData) => {
  const response = await API.post("/swaps/create", swapData);
  return response.data;
};

// ✅ ADD THIS
export const cancelSwapRequest = async (userId) => {
  const response = await API.delete(`/swaps/cancel/${userId}`);
  return response.data;
};

export const completeSwapRequest = async (userId) => {
  const response = await API.post(`/swaps/complete/${userId}`);
  return response.data;
};
