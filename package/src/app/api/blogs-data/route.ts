

import { getAllBlogs } from "@/lib/blogmarkdown";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
  const locale = searchParams.get('locale') || 'en';
  console.log(searchParams.get('locale'))
//   const projects = getAllProjects(["title", "slug", "ScopeOfWork", "industry", "coverImage"]);
 type Blog = {
        title: string;
        slug: string;
        date: string;
        coverImage: string;
    };
    const Blogs: Blog[] = getAllBlogs(["title", "slug", "coverImage", "date"], locale)
        .sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
  return NextResponse.json(Blogs);
}
