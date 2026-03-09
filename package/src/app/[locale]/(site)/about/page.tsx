"use client";
import AboutusDetail from "@/app/[locale]/components/about/aboutus-detail";
import AboutusFullimg from "@/app/[locale]/components/about/aboutus-fullimg";
import AboutusStats from "@/app/[locale]/components/about/aboutus-stats";
//import Team from "@/app/components/home/team";
import Herobanner from "@/app/[locale]/components/shared/hero-banner";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
// export const metadata: Metadata = {
//     title: "About Us | Umira Sinergi Global",
// };

export default function Page() {
    const t = useTranslations("AboutHero");
    return (
        <main>
            <Herobanner
                bannerimage="/images/about-us/banner/teamphoto.png"
                heading= {t("heading")}
                desc={t("desc")}/>
            <AboutusDetail />
            <AboutusStats />
            <AboutusFullimg />
            {/*<Team teamdataNumber="01" />*/}
        </main>
    );
};
