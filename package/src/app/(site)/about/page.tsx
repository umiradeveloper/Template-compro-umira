import AboutusDetail from "@/app/components/about/aboutus-detail";
import AboutusFullimg from "@/app/components/about/aboutus-fullimg";
import AboutusStats from "@/app/components/about/aboutus-stats";
import Team from "@/app/components/home/team";
import Herobanner from "@/app/components/shared/hero-banner";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Aboutus | Studiova",
};

export default function Page() {
    return (
        <main>
            <Herobanner
                bannerimage="/images/about-us/banner/teamphoto.png"
                heading="About Us"
                desc="A rapidly growing company since 2016, providing design, engineering, procurement, and construction
                services across Indonesia." />
            <AboutusDetail />
            <AboutusStats />
            <AboutusFullimg />
            <Team teamdataNumber="01" />
        </main>
    );
};
