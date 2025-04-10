// Label.jsx
import React from "react";

export default function Label({ text, color, hasCheckBox = false, isChecked = false, onChange }) {
  // const handleCheck = (event) => {
  //   // event.target.checked es true o false
  //   // Avisamos al padre con onChange
  //   if (onChange) {
  //     onChange(text, event.target.checked);
  //   }
  // };

  return (
    <>
      {hasCheckBox ? (
        <span
            style={{ backgroundColor: color }}
            className={`bg-[#${color}] label flex flex-row text-white font-secondary-font text-xs px-2 py-1 gap-2 rounded-full text-center hover:scale-105 active:scale-95 transition-transform duration-200 ease-in-out`}
        >
            <label className="relative flex gap-2 items-center cursor-pointer">
            <input
                className="peer sr-only"
                type="checkbox"
                // checked={isChecked}       // Aquí controlamos desde fuera si está marcado
                // onChange={handleCheck}     // Avisamos al padre
            />
            <div
                className="w-4 h-4 rounded-md bg-white border-2 border-purple-500 transition-all
                        duration-300 ease-in-out peer-checked:bg-gradient-to-br from-blue to-pink
                        peer-checked:border-0 peer-checked:rotate-12
                        after:content-[''] after:absolute after:top-1/2 after:left-1/2
                        after:-translate-x-1/2 after:-translate-y-1/2 after:w-3 after:h-3
                        after:opacity-0 after:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIyMCA2IDkgMTcgNCAxMiI+PC9wb2x5bGluZT48L3N2Zz4=')] 
                        after:bg-contain after:bg-no-repeat peer-checked:after:opacity-100
                        after:transition-opacity after:duration-300 
                        hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            ></div>
            <span className="text-xs font-medium text-white pointer-events-none">{text}</span>
            </label>
        </span>
        
      ) : (
        <span
        style={{ backgroundColor: color }}
        className={` label hoverable flex flex-row text-white font-secondary-font text-xs px-2 py-1 gap-2 rounded-full text-center`}
        >
            <span className="text-xs font-medium text-white pointer-events-none">{text}</span>
        </span>
      )}
    </>
  );
}
