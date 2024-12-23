import { ObjectId } from "mongodb";
import { JSX } from "react/jsx-runtime";

  export type News = {
    _id: ObjectId;
    title: string;
    description: string;
    tag: string[];
    thumbnail: string;
    image: string[];
    excerp: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    content: any;
  };

  export interface NewsCreateTypeInput {
    title: string;
    description: string;
    content: any[];
   tag?: string[] | string;
   thumbnail: string;
  }
  

export type Gallery = {
  _id: ObjectId;
  thumbnail: string;
  title: string;
  description: string;
  image: string[];
  slug: string;
  location: string;
  createdAt: string;
  updatedAt: string;
};

export type GalleryCreateTypeInput = Omit<Gallery, "_id" | "slug">

export type User = {
  _id: ObjectId;
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  birthday?: string;
  contact?: string;
  password: string;
  types: string;
  role: string;
};

export type UserCreateTypeInput = Omit<User, "_id">;

export type GalleryTemp = {
  thumbnail: string;
  title: string;
  location: string;
  slug: string;
};

export type NewsCardProps = {
  image: string;
  title: string;
  excerpt: string;
  date: string;
};

export type InsightCardProps = {
  title: string;
  description: string;
};

export type ResourceCardProps = {
  title: string;
  description: string;
  icon: JSX.Element;
};
