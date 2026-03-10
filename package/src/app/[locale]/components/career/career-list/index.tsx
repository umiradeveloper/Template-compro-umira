import { getAllCareer } from "@/lib/careermarkdown";
import { useLocale } from "next-intl";
import CareerListMarkdown from "./careerlist";

const CareerList = () => {
    const locale = useLocale();

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

    return (
       <CareerListMarkdown Careers={Careers} Locale={locale}/>

    );
};

export default CareerList;