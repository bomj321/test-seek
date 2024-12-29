"use client";

import { signOut } from "next-auth/react";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import React from "react";

const Dashboard = () => {
  const start = (
    <img
      alt="logo"
      src="https://primefaces.org/cdn/primereact/images/logo.png"
      height="40"
      className="mr-2"
    ></img>
  );

  const handleLogout = () => {
    signOut({ callbackUrl: "/", redirect: true });
  };

  const end = (
    <div className="flex align-items-center gap-2">
      <Button label="Salir" onClick={() => handleLogout()} />
    </div>
  );

  return (
    <div className="card">
      <Menubar start={start} end={end} />
    </div>
  );
};

export default Dashboard;
