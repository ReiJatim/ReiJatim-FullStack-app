"use server"

import { getUserByEmailOrUsername } from "@/db/models/user";
import { createToken } from "@/lib/jwt";
import { compare } from "@/utils/bcrypt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


export async function GET() {
  return NextResponse.json("berhasil get /api/login");
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  const result = await request.json();

  const loginInputSchema = z
    .object({
      identifier: z.string(),
      password: z.string(),
    })
    .refine(
      (data) => {
        const isEmail = z.string().email().safeParse(data.identifier).success;
        const isUsername = /^[a-zA-Z0-9_.-]+$/.test(data.identifier);
        return isEmail || isUsername;
      },
      {
        message: "Must put a valid email or username",
        path: ["identifier"],
      }
    );

  const parsedData = loginInputSchema.safeParse(result);

  if (!parsedData.success) {
    const error = parsedData.error.issues[0];
    return NextResponse.json(
      { error: `${error.path[0]} - ${error.message}` },
      { status: 400 }
    );
  }

  const { identifier, password } = parsedData.data;

  const user = await getUserByEmailOrUsername(identifier);

  if (!user || !compare(password, user.password)) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const payload = {
    id: user._id,
    email: user.email,
    username: user.username,
    roles: user.role
  };

  console.log(payload);

  const token = createToken(payload)

  

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    sameSite: "strict"
  })

  return NextResponse.json({
    message: "Success Login",
    user: payload,
    access_token: token
  });
}
