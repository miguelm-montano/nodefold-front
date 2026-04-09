import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Sources from "../../../assets/WTGSources.svg";
import Google from "../../../assets/GoogleSVG.png";
import Coolors from "../../../assets/CoolorsSVG.svg";
import AllSVG from "../../../assets/AllSVG.svg";
import Web from "../../../assets/WebSVG.svg";
import ImageSVG from "../../../assets/ImageSVG.svg";

function SourceCard({ item, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const content = (
    <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 h-48 hover:border-gray-400 dark:hover:border-gray-500 transform transition-transform duration-300 hover:scale-105">
      {item.icon ?? <span className="text-5xl">{item.emoji}</span>}
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          {item.name}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">{item.url}</p>
      </div>
    </div>
  );

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`transform transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
    >
      {item.href ? (
        <a
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="cursor-pointer"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}

export default function ResourceSources() {
  return (
    <section className="py-10 bg-white dark:bg-gray-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 mt-8">
        {/* YELLOW */}
        <div className="hidden lg:block absolute top-0 left-0 w-10 lg:w-10 xl:w-22 h-95 bg-[#FFB514] z-0"></div>

        {/* Top — título + texto + imagen */}
        <div className="flex items-stretch justify-between gap-16 mb-8">
          {/* Left */}
          <div className="max-w-2xl h-88 flex flex-col justify-center">
            <h2 className="text-5xl font-bold mb-6 text-center">
              Where to get resources
            </h2>
            <div className="bg-stone-100 dark:bg-gray-900 rounded-xl px-6 py-4">
              <p className="text-black dark:text-gray-300 text-center px-8">
                <span className="font-bold">Nodefold</span> integrates with the
                best design resources on the web. Here are the recommended
                sources to find everything you need. Just copy the link of your
                resource in your dashboard
              </p>
            </div>
          </div>

          {/* Right — placeholder imagen */}
          <img
            src={Sources}
            alt="Sources illustration"
            className="h-82 w-120 pr-20 bg-white"
          />
        </div>

        {/* 5 tarjetas */}
        <div className="grid grid-cols-5 gap-4 mb-12">
          {[
            {
              icon: (
                <img src={Google} alt="Google Fonts" className="h-10 w-auto" />
              ),
              name: "Google Fonts",
              url: "fonts.google.com",
              href: "https://fonts.google.com",
            },
            {
              icon: (
                <img
                  src={Coolors}
                  alt="Coolors.co"
                  className="h-10 w-auto brightness-0"
                />
              ),
              name: "Coolors",
              url: "coolors.co",
              href: "https://coolors.co",
            },
            {
              icon: (
                <img
                  src={AllSVG}
                  alt="All SVG icons"
                  className="h-10 w-auto brightness-0"
                />
              ),
              name: "All SVG Icons",
              url: "allsvgicons.com",
              href: "https://allsvgicons.com",
            },
            {
              icon: <img src={Web} alt="Web Icon" className="h-10 w-auto" />,
              name: "Webs",
              url: "https://nodefold.com",
              href: null,
            },
            {
              icon: (
                <img src={ImageSVG} alt="Image Icon" className="h-10 w-auto" />
              ),
              name: "Images",
              url: "https://image.jpg",
              href: null,
            },
          ].map((item, i) => (
            <SourceCard key={item.name} item={item} index={i} />
          ))}
        </div>

        {/* Bottom — texto + botón */}
        <div className="flex flex-col items-center gap-6">
          <p className="text-3xl font-bold text-center">
            Start saving what inspires you.
          </p>
          <Link
            to="/register"
            className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-4xl font-medium hover:opacity-90 transform transition-transform duration-300 hover:scale-105"
          >
            Get started for free
          </Link>
        </div>
      </div>
    </section>
  );
}
