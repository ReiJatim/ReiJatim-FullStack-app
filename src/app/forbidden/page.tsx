'use client';

import React from "react";
import { useRouter } from "next/navigation";

const ForbiddenPage = () => {
  const router = useRouter();

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", textAlign: "center" }}>
      <h1 style={{ fontSize: "3rem", color: "#ff4d4f" }}>403 - Forbidden</h1>
      <p style={{ fontSize: "1.25rem", color: "#555" }}>
        You do not have the required permissions to access this page.
      </p>
      <button
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={() => router.push("/")}
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default ForbiddenPage;
