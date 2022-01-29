import React from "react";
import { FaFacebook, FaYoutube, FaTwitter, FaInstagram } from "react-icons/fa";

export const FooterItems = [
  {
    id: 6,
    title: "Informacje prawne :",
    subtitle: "RODO",
    subtitle_url: "/RODO",
    subtitle2: "Cookie Policy",
    subtitle2_url: "/CookiePolicy",
  },
  {
    id: 7,
    title: "Dla firm :",
    subtitle: "Koszty wystawy",
    subtitle_url: "/KosztyWystawy",
    subtitle2: "Profil pracodawcy",
    subtitle2_url: "/ProfilPracodawcy",
  },
  {
    id: 8,
    title: "Dla Kandydatów :",
    subtitle: "Informacje ogólne",
    subtitle_url: "/InformacjeOgolne",
    subtitle2: "Rozwiązywanie testów",
    subtitle2_url: "/RozwiazywanieTestow",
  },
  {
    id: 9,
    title: "Kontakt :",
    subtitle: "Informacje",
    subtitle_url: "/Onas",
  },
];
export const SocialItems = [
  {
    id: 10,
    url: "https://www.facebook.com",
    icon: <FaFacebook />,
  },
  {
    id: 11,
    url: "https://www.twitter.com",
    icon: <FaTwitter />,
  },
  {
    id: 12,
    url: "https://www.instagram.com",
    icon: <FaInstagram />,
  },
  {
    id: 13,
    url: "https://www.youtube.com",
    icon: <FaYoutube />,
  },
];
