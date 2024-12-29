"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

// This is for testing only
export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { status } = useSession(); //data:session

  useEffect(() => {
    if (status === "authenticated") {
      setIsMounted(true);
    }

    if (status === "unauthenticated") {
      redirect("/");
    }
  }, [status]);

  if (!isMounted) return null;

  return children;
};
