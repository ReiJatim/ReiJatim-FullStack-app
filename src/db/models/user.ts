import { getDb } from "@/lib/dbCaller";
import { User, UserCreateTypeInput } from "@/lib/types";
import { hash } from "@/utils/bcrypt";

const COLLECTION_USER = "Users";

export const getUserByEmail = async (email: string) => {
  const db = await getDb();
  const user = (await db
    .collection(COLLECTION_USER)
    .findOne({ email: email })) as User;

  return user;
};

export const getUserByEmailOrUsername = async (
  identifier: string
): Promise<User | null> => {
  const db = await getDb();

  // Check if the identifier is an email
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

  // Query the database
  const user = (await db
    .collection(COLLECTION_USER)
    .findOne(
      isEmail
        ? { email: identifier } // Query by email if identifier is an email
        : { username: identifier } // Query by username otherwise
    )) as User | null;

  return user;
};

export const createUser = async (user: UserCreateTypeInput) => {
  const createdUser: UserCreateTypeInput = {
    ...user,
    password: hash(user.password),
  };

  const db = await getDb();

  const checkUsername = await db
    .collection(COLLECTION_USER)
    .findOne({ username: user.username });

  if (checkUsername) {
    throw new Error("Username already exists");
  }

  const checkEmailAndTypes = await db
    .collection(COLLECTION_USER)
    .findOne({ email: user.email, types: user.types });

  if (checkEmailAndTypes) {
    throw new Error("Email already exists");
  }

  const result = await db.collection(COLLECTION_USER).insertOne(createdUser);
  return result;
};
