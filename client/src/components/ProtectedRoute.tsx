import { useLocation } from "wouter";
import { useAuth } from "@/contexts/auth-context";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const [location, setLocation] = useLocation();

  // If we're still loading, show a loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    // Store the current location to redirect back after login
    localStorage.setItem('redirectAfterLogin', location);
    setLocation('/login');
    return null;
  }

  // If authenticated, render the protected content
  return <>{children}</>;
}
