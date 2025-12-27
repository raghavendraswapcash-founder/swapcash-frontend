import { updateUserLocation } from "../services/locationService";

let watchId = null;

export const startLocationTracking = (userId) => {
  if (!navigator.geolocation) {
    console.warn("Geolocation not supported");
    return;
  }

  console.log("📍 Starting location tracking for user:", userId);

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        await updateUserLocation({
          userId,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        console.log("📌 Location saved");
      } catch (err) {
        console.error("❌ Location API failed", err);
      }
    },
    (error) => {
      console.warn("⚠️ Location unavailable, continuing without GPS");
    },
    {
      enableHighAccuracy: false,
      timeout: 30000,
      maximumAge: 60000,
    }
  );
};


export const stopLocationTracking = () => {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
    console.log("🛑 Location tracking stopped");
  }
};
