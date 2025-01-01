"use client";

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Make a POST request to logout and delete the token
      const response = await fetch("/api/logout", { method: "POST" });

      if (response.ok) {
        // Redirect to login page after successful logout
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}
