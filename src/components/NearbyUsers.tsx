import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { MessageCircle, MapPin } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Header } from "./Header";
import { useEffect, useState } from "react";
import { getNearbyUsers } from "../services/nearbyService";
import { cancelSwapRequest, completeSwapRequest } from "../services/swapService";

export function NearbyUsers() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [nearbyUsers, setNearbyUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchNearbyUsers = async () => {
      try {
        const response = await getNearbyUsers(user.id, 3);

        if (response.data?.success) {
          setNearbyUsers(response.data.data || []);
        }
      } catch (err) {
        console.error("Error fetching nearby:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyUsers();
    const interval = setInterval(fetchNearbyUsers, 5000);
    return () => clearInterval(interval);

  }, [user, navigate]);


  // ❌ Cancel Swap
  const handleCancelSwap = async () => {
    if (!user) return;
    const confirmCancel = window.confirm("Cancel this swap request?");
    if (!confirmCancel) return;

    try {
      setActionLoading(true);
      const response = await cancelSwapRequest(user.id);

      if (response.success) {
        alert("Swap request cancelled ❌");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("Error cancelling swap");
    } finally {
      setActionLoading(false);
    }
  };


  // ✅ Complete Swap
  const handleCompleteSwap = async () => {
    if (!user) return;
    const confirmComplete = window.confirm("Confirm: swap completed successfully?");
    if (!confirmComplete) return;

    try {
      setActionLoading(true);
      const response = await completeSwapRequest(user.id);

      if (response.success) {
        alert("Swap marked as completed ✔️");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating swap status");
    } finally {
      setActionLoading(false);
    }
  };


  if (!user) return null;

  const handleContact = (mobile: string) => {
  const confirmAction = window.confirm(
    "⚠️ Are you sure?\nThey will see your number and you will see theirs."
  );

  if (confirmAction) {
    alert(`📞 Contact Number: ${mobile}`);
  }
};


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">

          {/* HEADER BUTTONS */}
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <h2 className="mb-2 font-bold">Users Near You</h2>
              {!loading && (
                <p className="text-muted-foreground">
                  {nearbyUsers.length} user
                  {nearbyUsers.length !== 1 ? "s" : ""} available for swap
                </p>
              )}
            </div>

            <div className="flex gap-2">
              
              {/* 🔵 Complete Swap */}
              <Button
                onClick={handleCompleteSwap}
                disabled={actionLoading}
                variant="outline"
                className="bg-white hover:bg-blue-700 text-black"
              >
                {actionLoading ? "Updating..." : "Swap Completed"}
              </Button>

              {/* ❌ Cancel Swap */}
              <Button
                onClick={handleCancelSwap}
                variant="outline"
                disabled={actionLoading}
                className="border-red-500 text-red-600 hover:bg-red-50"
              >
                Cancel Swap
              </Button>
            </div>
          </div>

          {/* LOADING */}
          {loading && <p className="text-center text-muted-foreground">Loading nearby users...</p>}

          {/* USERS LIST */}
          {!loading && nearbyUsers.length > 0 && (
            <div className="space-y-4">
              {nearbyUsers.map((u) => (
                <Card key={u.userId} className="p-6 hover:shadow-md transition">
  <div className="flex items-start justify-between gap-6">
    
    {/* LEFT CONTENT */}
    <div className="flex-1 space-y-2">
      <h3 className="text-lg font-semibold">{u.name}</h3>

      <p className="text-sm text-muted-foreground">
        {u.swapMode === "CASH_TO_ONLINE"
          ? "Has Cash → Wants Online"
          : "Has Online → Wants Cash"}
      </p>

      <p className="text-sm">₹{u.amount}</p>

      {/* Distance */}
      <p className="text-sm flex items-center gap-1 text-muted-foreground">
        <MapPin className="w-4 h-4" /> {u.distanceKm.toFixed(2)} km away
      </p>

      {/* CONTACT BUTTON */}
      <Button
        onClick={() => handleContact(u.mobileNumber)}
        variant="outline"
        className="border-red-500 text-red-600 hover:bg-red-50"
      >
        Contact Swap Partner
      </Button>
    </div>
  </div>
</Card>

              ))}
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && nearbyUsers.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground mb-4">No nearby matches found</p>
              <Button onClick={() => navigate("/dashboard")} variant="outline">
                Update Preferences
              </Button>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}
