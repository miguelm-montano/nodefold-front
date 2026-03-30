import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export default function CalendarCard() {
  const [selected, setSelected] = useState(new Date());

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-3 overflow-hidden w-full flex items-center justify-center">
      <style>{`
        .rdp-root { margin: 0; }
        .rdp-month_caption { font-size: 0.72rem; padding-bottom: 4px; }
        .rdp-weekdays, .rdp-week { display: flex; gap: 0; }
        .rdp-weekday { width: 26px; height: 20px; font-size: 0.6rem; text-align: center; }
        .rdp-day { width: 26px; height: 26px; padding: 0; }
        .rdp-day_button { width: 26px; height: 26px; font-size: 0.68rem; padding: 0; border-radius: 50%; }
        .rdp-month_grid { border-spacing: 0; border-collapse: collapse; }
        .rdp-nav button { width: 20px; height: 20px; }
      `}</style>
      <DayPicker mode="single" selected={selected} onSelect={setSelected} />
    </div>
  );
}
