import { getDb } from "@/lib/dbCaller";
import { News, NewsCreateTypeInput } from "@/lib/types";

const COLLECTION_NEWS = "News"

// Fetch recent news (latest by createdAt)
export const getRecentNews = async (limit?: number) => {
    const db = await getDb();
    const query = db
        .collection(COLLECTION_NEWS)
        .find({}, { projection: { _id: 0 } }) // Exclude _id
        .sort({ createdAt: -1 }); // Sort by createdAt descending (latest first)

    if (limit) {
        query.limit(limit);
    }

    const result = (await query.toArray()) as News[];
    console.log(result);
    return result;
};

// Fetch trending news (oldest by createdAt)
export const getTrendingNews = async (limit?: number) => {
    const db = await getDb();
    const query = db
        .collection(COLLECTION_NEWS)
        .find({}, { projection: { _id: 0 } }) // Exclude _id
        .sort({ createdAt: 1 }); // Sort by createdAt ascending (oldest first)

    if (limit) {
        query.limit(limit);
    }

    const result = (await query.toArray()) as News[];
    return result;
};

export const getNews = async (limit?: number) => {
    const db = await getDb()
    const query = db
    .collection(COLLECTION_NEWS)
    .find({}, {projection: {_id: 0}});

    if(limit) {
        query.limit(limit)
    }

    const result = (await query.toArray()) as News[];
    return result;
}

export const getSpecificNews = async (slug: string) => {
    const db = await getDb()
    const query = db.collection(COLLECTION_NEWS).findOne({ slug: slug });

    const result = (await query) as News | null;
    return result
}

export const createNews = async (news: NewsCreateTypeInput) => {
    const createdNews = {
        ...news,
        createdAt: new Date(),
    }

    const db = await getDb();

    const result = await db.collection(COLLECTION_NEWS).insertOne(createdNews);

    const insertedNews = await db.collection(COLLECTION_NEWS).findOne({ _id: result.insertedId }) as News;

    if (insertedNews) {
        const slug = `${insertedNews._id.toString()}-${insertedNews.title.replace(/\s+/g, '-').toLowerCase()}`;
        await db.collection(COLLECTION_NEWS).updateOne(
            { _id: result.insertedId },
            { $set: { slug, updatedAt: new Date() } }
        );

        insertedNews.slug = slug;
        return insertedNews;
    }
}

export const deleteNews = async(slug: string) => {
    const db = await getDb()

    const result = await db.collection(COLLECTION_NEWS).deleteOne({slug});

    return result
}

/* 
export const getTrendingNews = async (limit?: number) => {
    const db = await getDb();

    // Aggregate news data with like and comment counts
    const pipeline = [
        {
            $lookup: {
                from: COLLECTION_LIKES,
                localField: "_id",
                foreignField: "newsId",
                as: "likes",
            },
        },
        {
            $lookup: {
                from: COLLECTION_COMMENTS,
                localField: "_id",
                foreignField: "newsId",
                as: "comments",
            },
        },
        {
            $addFields: {
                likeCount: { $size: "$likes" },
                commentCount: { $size: "$comments" },
            },
        },
        {
            $project: {
                _id: 0,
                title: 1,
                slug: 1,
                createdAt: 1,
                updatedAt: 1,
                likeCount: 1,
                commentCount: 1,
            },
        },
        {
            $sort: { createdAt: 1, likeCount: -1, commentCount: -1 }, // Oldest first, then most liked and commented
        },
    ];

    if (limit) {
        pipeline.push({ $limit: limit });
    }

    const result = await db.collection(COLLECTION_NEWS).aggregate(pipeline).toArray();

    return result;
};

*/
