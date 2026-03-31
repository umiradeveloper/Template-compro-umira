import { NextResponse } from "next/server";
import { getAllCareer } from "@/lib/careermarkdown";


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
  const locale = searchParams.get('locale') || 'en';
 type Career = {
         title: string;
         slug: string;
         date: string;
         coverImage: string;
     };
     const Careers: Career[] = getAllCareer(["title", "slug", "coverImage", "date"], locale)
         .sort((a, b) => {
             return new Date(b.date).getTime() - new Date(a.date).getTime();
         });
  return NextResponse.json(Careers);
}

