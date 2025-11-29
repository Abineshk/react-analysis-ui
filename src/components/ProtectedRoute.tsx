import React, { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { username } = useAuth();

  if (!username) {
    // Redirect to login page if not logged in
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen pb-[75px] bg-linear-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <Header />
      {children}
      <Footer />
    </div>
  );
};
