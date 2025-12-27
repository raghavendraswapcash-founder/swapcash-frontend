import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { useAuth } from '../context/AuthContext';
import { Header } from './Header';
import { User, LogOut } from 'lucide-react';

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user, navigate]);

  const handleSave = () => {
    updateProfile(formData.name, formData.email, formData.phone);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
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
            <h2 className="mb-2">My Profile</h2>
            <p className="text-muted-foreground">Manage your account details</p>
          </div>

          <Card className="p-8">
            {/* Profile Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                <User className="w-12 h-12 text-[#2563eb]" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                  className="bg-input-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                  className="bg-input-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  className="bg-input-background"
                />
              </div>

              {user.swapMode && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <Label className="block mb-1">Current Swap Preference</Label>
                  <p className="text-muted-foreground">
                    {user.swapMode === 'cash-to-online' 
                      ? 'Has Cash, wants Online Money'
                      : 'Has Online Money, wants Cash'
                    }
                  </p>
                  <p className="text-muted-foreground">
                    Amount: ₹{user.amount?.toLocaleString('en-IN')}
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                {isEditing ? (
                  <>
                    <Button 
                      onClick={handleSave}
                      className="flex-1 bg-[#10b981] hover:bg-[#059669]"
                    >
                      Save Changes
                    </Button>
                    <Button 
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: user.name,
                          email: user.email,
                          phone: user.phone,
                        });
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button 
                    onClick={() => setIsEditing(true)}
                    className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8]"
                  >
                    Edit Profile
                  </Button>
                )}
              </div>

              <div className="pt-4 border-t border-border">
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full text-destructive hover:bg-destructive/10 flex items-center gap-2 justify-center"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
