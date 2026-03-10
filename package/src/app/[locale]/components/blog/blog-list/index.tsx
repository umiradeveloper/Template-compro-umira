import { getAllBlogs } from "@/lib/blogmarkdown";
import { useLocale } from "next-intl";
import BlogListMarkdown from "./bloglist";

const BlogList = () => {
    const locale = useLocale();

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

    return (
       <BlogListMarkdown Blogs={Blogs} Locale={locale}/>

    );
};

export default BlogList;