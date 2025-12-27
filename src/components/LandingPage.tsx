import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { UserPlus, ArrowRightLeft, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-[#2563eb]">SwapCash</h1>
          <div className="flex gap-3">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-[#2563eb] hover:bg-[#1d4ed8]">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="mb-6">Exchange Cash & Online Money Safely Near You</h2>
            <p className="text-muted-foreground mb-8">
              Connect with trusted users nearby to swap physical cash for online money or vice versa. 
              Safe, simple, and convenient.
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-[#10b981] hover:bg-[#059669]">
                Get Started
              </Button>
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1732258355921-4d9f948aed36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwYXltZW50JTIwZXhjaGFuZ2V8ZW58MXx8fHwxNzY2MjI4ODg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Mobile payment exchange"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-[#2563eb]" />
              </div>
              <h3 className="mb-3">1. Sign Up</h3>
              <p className="text-muted-foreground">
                Create your account with basic details and get verified
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <ArrowRightLeft className="w-8 h-8 text-[#10b981]" />
              </div>
              <h3 className="mb-3">2. Choose Swap Mode</h3>
              <p className="text-muted-foreground">
                Select whether you have cash or online money to exchange
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#2563eb]" />
              </div>
              <h3 className="mb-3">3. Connect Nearby</h3>
              <p className="text-muted-foreground">
                Find and message verified users near you to complete the swap
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground">© 2025 SwapCash. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground">About</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Terms</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
