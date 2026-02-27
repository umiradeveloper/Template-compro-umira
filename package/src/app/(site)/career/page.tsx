import CareerList from "@/app/components/career/career-list";
import Herobanner from "@/app/components/shared/hero-banner";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Career | Umira Sinergi Global",
};

export default function Page() {
    return (
        <main>
            <Herobanner
                bannerimage="/images/blog/banner/blog_banner.JPG"
                heading="Career Opportunities"
                desc="Ready to <span>build something meaningful?</span> Explore our open positions and grow your career with us."/>
                <CareerList/>
        </main>
    );
};
