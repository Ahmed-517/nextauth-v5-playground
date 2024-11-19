import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <nav className="bg-red-500 text-white">This is an Auth Navbar</nav>
      {children}
    </div>
  );
};

export default AuthLayout;
