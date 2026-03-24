import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import loadingTime from "../../assets/Loading-Time.svg";
import FeatureWhatIsNotion from "../../components/WhatIsNotion";
import search from "../../assets/Search.svg";
import folders from "../../assets/Folders.svg";
import tags from "../../assets/Tags.svg";

const resourceTypes = [
  {
    icon: "🖼",
    title: "Images",
    description:
      "Upload images directly from your device or link external ones. Stored and displayed inside your folders.",
  },
  {
    icon: "🔤",
    title: "Fonts",
    description:
      "Save font references from Google Fonts or any URL. Keep your typography choices organized.",
  },
  {
    icon: "🎨",
    title: "Color Palettes",
    description:
      "Paste a Coolors.co URL and Nodefold automatically extracts and displays the hex color codes.",
  },
  {
    icon: "🌐",
    title: "Websites",
    description:
      "Bookmark any website URL as a reference. Perfect for saving design inspiration.",
  },
  {
    icon: "⭐",
    title: "Icons",
    description:
      "Save icon CDN links and keep all your icon resources in one place.",
  },
];

const stack = [
  { name: "Laravel 12", role: "Backend" },
  { name: "Laravel Passport", role: "Auth (OAuth2)" },
  { name: "PostgreSQL", role: "Database" },
  { name: "React 18", role: "Frontend" },
  { name: "Vite", role: "Build tool" },
  { name: "Tailwind CSS", role: "Styling" },
  { name: "Docker", role: "Containerization" },
  { name: "Render", role: "Deployment" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      <Navbar />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">
          Your creative resources,{" "}
          <span className="text-gray-400 dark:text-gray-500">organized.</span>
        </h1>
        <p className="text-lm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10">
          Nodefold is a minimal workspace for saving and organizing design
          assets — fonts, palettes, images, icons and web references — all in
          one place.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/register"
            className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-4xl font-medium hover:opacity-90 transition-opacity"
          >
            Get started for free
          </Link>
        </div>
      </section>

      {/* What is Notion */}
      <section className="py-20 bg-gray-100 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-black py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* LEFT SIDE */}
            <div>
              <h2 className="text-5xl font-bold mb-8">What is Nodefold?</h2>

              {/* Image placeholder */}
              <div className="w-full h-120 rounded-xl flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">
                  <img
                    src={loadingTime}
                    alt="Loading Time"
                    className="w-full h-122 object-cover rounded-xl dark:invert"
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
                description="Organize everything into parent folders and subfolders."
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
                description="Tag your resources and filter by tag, name or type."
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
                description="Quickly find any resource across your workspace."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourceTypes.map((type) => (
              <div
                key={type.title}
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
              >
                <div className="text-3xl mb-4">{type.icon}</div>
                <h3 className="font-semibold mb-2">{type.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The space for your tools */}
      <section className="bg-gray-50 dark:bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">The space for your tools</h2>
          <p className="mb-16">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
            est quis ipsum fermentum vehicula.
          </p>

          <div className="flex gap-8 h-[600px]">
            {/* Tarjeta vertical izquierda */}
            <div className="w-1/3 rounded-2xl bg-gray-200 dark:bg-gray-700 flex-shrink-0 h-full" />

            {/* Columna derecha */}
            <div className="flex-1 flex flex-col gap-8 h-full">
              {/* Dos tarjetas cuadradas arriba */}
              <div className="flex gap-8 flex-1">
                <div className="flex-1 rounded-2xl bg-gray-300 dark:bg-gray-600" />
                <div className="flex-1 rounded-2xl bg-gray-300 dark:bg-gray-600" />
              </div>

              {/* Tarjeta horizontal abajo */}
              <div className="rounded-2xl bg-gray-200 dark:bg-gray-700 h-40 flex-shrink-0" />
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
