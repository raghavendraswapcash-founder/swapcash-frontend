import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSwapRequest } from "../services/swapService";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Card } from './ui/card';
import { useAuth } from '../context/AuthContext';
import { Header } from './Header';
import { startLocationTracking } from "../utils/locationTracker";

export function Dashboard() {
  const navigate = useNavigate();
  const { user, updateSwapPreferences } = useAuth();
  const [swapMode, setSwapMode] = useState(
    user?.swapMode || 'cash-to-online'
  );
  const [amount, setAmount] = useState(user?.amount?.toString() || '');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

const handleSave = async () => {
  const amountNum = parseFloat(amount);
  if (amountNum <= 0) return;

  const backendSwapMode =
    swapMode === "cash-to-online"
      ? "CASH_TO_ONLINE"
      : "ONLINE_TO_CASH";

  try {
    const response = await createSwapRequest({
      userId: user.id,
      swapMode: backendSwapMode,
      amount: amountNum,
    });

    if (!response.success) {
      alert(response.message);
      return;
    }

    updateSwapPreferences(swapMode, amountNum);

    // 🔥 fire-and-forget
    startLocationTracking(user.id);

    // ✅ never block navigation
    navigate("/nearby");

  } catch (error) {
    alert("Failed to save swap");
    console.error(error);
  }
};




  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="mb-2">Welcome, {user.name}!</h2>
            <p className="text-muted-foreground">
              Set your swap preferences to find matching users nearby
            </p>
          </div>

          <Card className="p-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>What do you want to exchange?</Label>
                <RadioGroup value={swapMode} onValueChange={(value) => setSwapMode(value)}>
                  <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-lg border-2 border-transparent data-[state=checked]:border-[#2563eb]">
                    <RadioGroupItem value="cash-to-online" id="cash-to-online" />
                    <Label htmlFor="cash-to-online" className="flex-1 cursor-pointer">
                      I have Cash, want Online Money
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 bg-green-50 p-4 rounded-lg border-2 border-transparent data-[state=checked]:border-[#10b981]">
                    <RadioGroupItem value="online-to-cash" id="online-to-cash" />
                    <Label htmlFor="online-to-cash" className="flex-1 cursor-pointer">
                      I have Online Money, want Cash
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  className="bg-input-background"
                />
              </div>

              <Button 
                onClick={handleSave} 
                className="w-full bg-[#10b981] hover:bg-[#059669]"
                disabled={!amount || parseFloat(amount) <= 0}
              >
                Save & Find Users
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
