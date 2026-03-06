import Contact from "@/app/[locale]/components/home/contact";
import Herobanner from "@/app/[locale]/components/shared/hero-banner";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Contact | Umira Sinergi Global",
};

export default function Page() {
    return (
        <main>
            <Herobanner
                bannerimage="/images/contact/banner/contact-banner.png"
                heading="Contact"
                desc="Ready to <span>start something</span> great? Reach out  we’d love to hear from you." />
            <Contact contactdataNumber="01"/>
        </main>
    );
};
