import { getSpecificGallery } from '@/db/models/gallery';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slugParam = searchParams.get('slug');
    if (!slugParam) {
      return NextResponse.json(
        { message: 'Slug is required' },
        { status: 400 }
      );
    }

    const result = await getSpecificGallery(slugParam);

    if (!result) {
      return NextResponse.json(
        { message: 'Gallery not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
