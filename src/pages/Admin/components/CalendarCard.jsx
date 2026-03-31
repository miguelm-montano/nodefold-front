import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export default function CalendarCard() {
  const [selected, setSelected] = useState(new Date());

  return (
    <div className="min-h-66 max-h-66 bg-stone-50 dark:bg-gray-900 rounded-2xl p-3 overflow-hidden w-full flex items-center justify-center transform transition-transform duration-300 hover:scale-105">
      <style>{`
        .rdp-root { margin: 0; }
        .rdp-month_caption { font-size: 0.72rem; padding-bottom: 4px; }
        .rdp-weekdays, .rdp-week { display: flex; gap: 0; }
        .rdp-weekday { width: 30px; height: 22px; font-size: 0.7rem; }
        .rdp-day { width: 30px; height: 30px; }
        .rdp-day_button { width: 30px; height: 30px; font-size: 0.75rem; }
        .rdp-nav button { width: 20px; height: 20px; }
        .rdp { --rdp-accent-color: black; }
        .dark .rdp { --rdp-accent-color: white; }  
      `}</style>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        className="rdp"
      />
    </div>
  );
}
