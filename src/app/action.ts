"use server";

import { cookies } from "next/headers";

export const deleteToken = async () => {
  try {
    const token = (await cookies()).get("token");

    if (token) {
      (await cookies()).delete("token");
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
