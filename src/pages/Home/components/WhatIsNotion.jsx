import { useEffect, useRef, useState } from "react";

function FeatureWhatIsNotion({ icon, title, description, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`flex items-center gap-6 p-8 bg-neutral-50 rounded-xl border border-gray-100 dark:border-gray-700 transform transition-all duration-700 hover:scale-105 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <div className="w-16 h-16 rounded-lg flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold mb-1 text-black">{title}</h3>
        <p className="text-sm text-gray-500 dark:black">{description}</p>
      </div>
    </div>
  );
}

export default FeatureWhatIsNotion;
