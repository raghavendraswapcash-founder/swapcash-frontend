import API from "./api";

export const updateUserLocation = async (locationData) => {
  const response = await API.post("/location/update", locationData);
  return response.data;
};