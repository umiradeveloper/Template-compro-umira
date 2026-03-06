

import { getAllBlogs } from "@/lib/blogmarkdown";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {Link} from "@/navigation";
import ResourcesBlog from "./resourcesblog";

type Blog = {
    title: string;
    slug: string;
    date: string;
    coverImage: string;
};
const Resources = () => {
    // const t= useTranslations("BlogSection");
    // const param: any = useParams();
    const blogs: Blog[] = getAllBlogs(["title", "slug", "coverImage", "date"])
        .sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

    return (
        <>
        <ResourcesBlog blogs={blogs} />
        </>
    );
}

export default Resources;
