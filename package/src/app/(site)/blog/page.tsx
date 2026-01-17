import BlogList from "@/app/components/blog/blog-list";
import Herobanner from "@/app/components/shared/hero-banner";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bulletin | Umira Sinergi Global",
};

export default function Page() {
    return (
        <main>
            <Herobanner
                bannerimage="/images/blog/banner/blog_banner.jpg"
                heading="Our Activities"
                desc="Excited to <span>begin something amazing?</span> Get in touch—we'd love to connect with you!" />    
                <BlogList/>
        </main>
    );
};
