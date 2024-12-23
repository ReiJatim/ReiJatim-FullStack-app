import { getDb } from "@/lib/dbCaller";
import {Gallery, GalleryCreateTypeInput} from '@/lib/types'

const COLLECTION_GALLERY = "Gallery"

export const getGallery = async (limit?: number) => {
    const db = await getDb();
  
    const query = db.collection(COLLECTION_GALLERY).find();
  
    if (limit) {
      query.limit(limit);
    }
  
    const result = (await query.toArray()) as Gallery[];
    return result;
  };
  
  export const getSpecificGallery = async (slug: string) => {
    const db = await getDb();
    const query = db.collection(COLLECTION_GALLERY).findOne({ slug });
  
    const result = (await query) as Gallery | null;
    return result;
  };

export const createGallery = async (gallery: GalleryCreateTypeInput) => {
    const createdGallery: GalleryCreateTypeInput = {
        ...gallery
    }

    const db = await getDb();

    const result = await db.collection(COLLECTION_GALLERY).insertOne(createdGallery);

    const insertedGallery = await db.collection(COLLECTION_GALLERY).findOne({_id: result.insertedId}) as Gallery;

    if(insertedGallery){
        const slug = `${insertedGallery._id.toString()}-${insertedGallery.title.replace(/\s+/g, '-').toLowerCase()}`;
        await db.collection(COLLECTION_GALLERY).updateOne(
            { _id: result.insertedId },
            { $set: { slug } }
        );
    }
}
