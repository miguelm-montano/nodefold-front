import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import home from "../../assets/Home.svg";
import loadingTime from "../../assets/Loading-Time.svg";
import FeatureWhatIsNotion from "./components/WhatIsNotion";
import search from "../../assets/Search.svg";
import folders from "../../assets/Folders.svg";
import tags from "../../assets/Tags.svg";
import dashboard from "../../assets/Dashboard.webp";
import alien from "../../assets/Alien.jpg";
import fontsColors from "../../assets/FontsColors.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        {/* YELLOW */}
        <div className="absolute top-0 left-66 w-110 h-95 bg-[#FFB514] z-0"></div>
        {/* BLACK */}
        <div className="absolute bottom-0 left-0 w-176 h-30 bg-black z-0"></div>
        {/* CONTENT */}
        <div className="relative z-10 max-w-2xl text-left -mt-30">
          <h1 className="text-8xl font-bold tracking-tight mb-3">
            Organize everything
            <br /> in one place.
          </h1>

          <div className="bg-black h-10 grid place-items-center mb-2">
            <p className="text-lm font-semibold text-white dark:text-gray-400 ">
              Nodefold is a minimal workspace to manage your resources, folders
              and ideas
            </p>
          </div>

          <p className="pb-10 text-gray-400">
            For design assets — fonts, palettes, images, icons and web
            references
          </p>

          <div className="flex items-center gap-4">
            <Link
              to="/register"
              className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-4xl font-medium hover:opacity-90 transition-opacity"
            >
              Get started for free
            </Link>
          </div>
        </div>

        {/* SVG BACKGROUND */}
        <img
          src={loadingTime}
          alt="Loading home"
          className="absolute -right-7 top-121 -translate-y-1/2 w-150 pointer-events-none -mt-20"
        />
      </section>

      {/* What you can do */}
      <section id="features" className="py-26 bg-stone-100 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-black py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* LEFT SIDE */}
            <div>
              <h2 className="text-5xl font-bold mb-8 text-center">
                What you can do?
              </h2>

              {/* Image placeholder */}
              <div className="w-full h-120 rounded-xl flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">
                  <img
                    src={home}
                    alt="home illustration"
                    className="w-full h-122 object-cover rounded-xl -mt-10 -ml-4"
                  />
                </span>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col gap-6">
              <FeatureWhatIsNotion
                icon={
                  <img
                    src={folders}
                    alt="Folders"
                    className="w-full h-full object-cover rounded-lg"
                  />
                }
                title="Folder structure"
                description="Organize everything with folders and nested spaces"
                delay={0}
              />

              <FeatureWhatIsNotion
                icon={
                  <img
                    src={tags}
                    alt="Tag resources"
                    className="w-full h-full object-cover rounded-lg"
                  />
                }
                title="Tagging system"
                description="Tag your resources and filter by name, type or tag"
                delay={150}
              />

              <FeatureWhatIsNotion
                icon={
                  <img
                    src={search}
                    alt="Search"
                    className="w-full h-full object-cover rounded-lg"
                  />
                }
                title="Smart search"
                description="Instantly find any resource across your workspace"
                delay={300}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Master your workflow */}
      <section id="how-works" className="py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          {/* RED */}
          <div className="absolute top-0 left-0 w-25 h-80 bg-[#FF4C32]"></div>
          {/* BLUE */}
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-[#009BFC]"></div>
          {/* TEXT */}
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold mb-2">Master your workflow</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Take full control of your resources with a clean and intuitive
              interface. <br />
              Organize, explore and manage everything without friction.
            </p>
          </div>

          {/* IMAGE */}
          <div className="mt-4 flex justify-center">
            <img
              src={dashboard}
              alt="Dashboard example"
              className="w-full max-w-7xl"
            />
          </div>
        </div>
      </section>

      {/* The space for your tools */}
      <section id="workspace" className="bg-stone-100 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-bold mb-2">The space for your tools</h2>
          <p className="mb-8">
            Keep your images, fonts, color palettes, icons and web references
            organized in one place. <br />
            Find inspiration faster and manage your workflow with ease.
          </p>

          <div className="flex gap-8 h-150">
            {/* Tarjeta vertical izquierda */}
            <div className="w-1/3 rounded-2xl bg-gray-200 dark:bg-gray-700 shrink-0 h-full transform transition-transform duration-300 hover:scale-105">
              <img
                src={alien}
                alt="Alien illustration"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            {/* Right column */}
            <div className="flex-1 flex flex-col gap-8 h-full">
              {/* TWO CARDS */}
              <div className="flex gap-8 flex-1">
                <div className="flex-1">
                  <div className="aspect-square rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105">
                    <img
                      src={fontsColors}
                      alt="Fonts Colors"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="aspect-square rounded-2xl bg-[#F05D23] flex flex-col justify-center px-6 transform transition-transform duration-300 hover:scale-105">
                    <div className="flex flex-col gap-2 text-white font-extrabold leading-tight text-5xl max-w-[70%]">
                      <p>Fonts</p>
                      <p>Webs</p>
                      <p>Icons</p>
                      <p>Images</p>
                      <p>Colors</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Horizontal card */}
              <div className="rounded-2xl overflow-hidden h-40 shrink-0 flex transform transition-transform duration-300 hover:scale-105">
                <div className="w-1/3 bg-[#FFB514]" />
                <div className="w-1/4 bg-black" />
                <div className="w-1/6 bg-white" />
                <div className="w-1/6 bg-[#009BFC]" />
                <div className="flex-1 bg-[#FF4C32]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400 dark:text-gray-600">
          Nodefold — 2026
        </div>
      </footer>
    </div>
  );
}
