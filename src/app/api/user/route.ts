import { readPayloadJose } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token");

  if (token) {
    try {
      const tokenData = await readPayloadJose<{ roles: string }>(token.value);
      console.log("Decoded token data:", tokenData);

      // Send only the roles from the payload
      return NextResponse.json({
        roles: tokenData.roles,
      });
    } catch (error) {
      console.error("Failed to decode token:", error);
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 } // Unauthorized
      );
    }
  }

  console.warn("No token found.");
  return NextResponse.json(
    { message: "No token provided" },
    { status: 400 } // Bad request
  );
}
