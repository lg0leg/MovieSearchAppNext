import { NextResponse } from 'next/server';

const fetchOptions = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
};

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const targetUrl = searchParams.get('targetUrl');
    const decodedUrl = decodeURIComponent(targetUrl);
    const res = await fetch(decodedUrl, fetchOptions);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
