import API from "./api";

export const getNearbyUsers = async (userId, radius = 3) => {
  return await API.get("/nearby/users", {
    params: { userId, radius },
  });
};
