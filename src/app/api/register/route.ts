import { createUser } from "@/db/models/user";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
    return NextResponse.json("berhasil get /api/register")
}

export async function POST(request: NextRequest) {
    const result = await request.json();

    const userInputData = {
        ...result,
        types: "origin",
        role: "user"
    }

    const registerInputSchema = z.object({
        firstName: z.string().optional(), 
        lastName: z.string().optional(),  
        username: z
          .string()
          .min(3, "Username must be at least 3 characters")
          .max(20, "Username must be at most 20 characters"),
        email: z.string().email("Invalid email address"),
        birthday: z
          .string()
          .optional()
          .refine(
            (value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value),
            "Birthday must be in the format YYYY-MM-DD"
          ),
        contact: z
          .string()
          .optional(),
        password: z
          .string()
          .min(6, "Password must be at least 6 characters")
          .max(100, "Password must be at most 100 characters"),
        types: z.string(),
        role: z.string(),
      });
      
    const parsedData = registerInputSchema.safeParse(userInputData);

    if (!parsedData.success) {
        const error = parsedData.error.issues[0];
        return NextResponse.json(
          { error: `${error.path[0]} - ${error.message}` },
          { status: 400 }
        );
      }

      const user = await createUser(parsedData.data)

      return NextResponse.json({
        message: "Success Register",
        user_id: user.insertedId
      })
}