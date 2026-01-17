import { NextResponse } from "next/server";

const MenuData = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "About",
    path: "/about",
    newTab: false,
  },
  {
    id: 3,
    title: "Projects",
    path: "/projects",
    newTab: false,
  },
  {
    id: 4,
    title: "Activities",
    path: "/blog",
    newTab: false,
  },
  {
    id: 5,
    title: "Services",
    path: "/#services",
    newTab: false,
  },
  {
    id: 6,
    title: "Contact",
    path: "/contact",
    newTab: false,
  },
];


const footerData = {
    name: "Umira Sinergi Global",
    tagline: "Build something together?",
    info: [
        {
            icon: "/images/footer/email-arrow.svg",
            link: "info@umiraglobal.com",
            href: "mailto:info@umiraglobal.com"
        },
        {
            icon: "/images/footer/Location.svg",
            link: "Head Office Yogyakarta",
            href: "https://maps.app.goo.gl/HRBYtZbR8Siy1pKy5"
        },
        {
            icon: "/images/footer/Location.svg",
            link: "Jakarta Branch Office",
            href: "https://share.google/6Y2JBSCfmVTRKeTHz"
        },
        {
            icon: "/images/footer/Location.svg",
            link: "Surabaya Branch Office",
            href: "https://maps.app.goo.gl/vSQywm5B2UkTcvxT8"
        },
        {
            icon: "/images/footer/Location.svg",
            link: "Bali Branch Office",
            href: "https://maps.app.goo.gl/Uj7bQKHDanSExv6w8"
        }
    ],
    links: [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Services", href: "/#services" },
        { name: "Work", href: "/projects" },
        //{ name: "Terms", href: "/terms-and-conditions" },
        //{ name: "Privacy Policy", href: "/privacy-policy" },
        //{ name: "Error 404", href: "/not-found" }
    ],
    socialLinks: [
        { name: "Facebook", href: "https://www.facebook.com/umiraglobal" },
        { name: "Instagram", href: "https://www.instagram.com/umiraglobal" },
        { name: "Youtube", href: "https://youtube.com/@umiraglobal"},
        { name: "WhatsApp", href: "http://wa.me/6281539320248"}
    ],
    copyright: "© Umira Sinergi Global copyright 2025"
};

export const GET = async () => {
    return NextResponse.json({
        footerData,
        MenuData
    });
};