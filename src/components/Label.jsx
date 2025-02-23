import '@styles/components/Label.css';

export default function Label({ text, hasCheckBox = false }) {
    const color = () => {
        if (text === "Images") return "slate-700/80";
        if (text === "Videos") return "gray-700/80";
        if (text === "Optimization") return "lime-700/80";
        if (text === "Hosting") return "violet-500/80";
        if (text === "Design") return "sky-500/80";
        if (text === "Deployment") return "rose-500/80";
        if (text === "Components") return "amber-500/80";
        if (text === "Colors") return "emerald-400/80";
        if (text === "Typography") return "yellow-500/80";
        if (text === "Icons") return "teal-500/80";
        if (text === "Mockups") return "rose-300/80";
        if (text === "API") return "fuchsia-500/80";
    };

    return (
        <span className={`bg-${color()} flex flex-row text-white font-secondary-font text-xs px-2 py-1 gap-2 rounded-full text-center`}>
            {hasCheckBox ? (
                <label className="relative flex gap-2 items-center cursor-pointer group">
                    <input className="peer sr-only" type="checkbox" />
                    <div
                        className="w-4 h-4 rounded-md bg-white border-2 border-purple-500 transition-all duration-300 ease-in-out peer-checked:bg-gradient-to-br from-blue to-pink peer-checked:border-0 peer-checked:rotate-12 after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-4 after:h-4 after:opacity-0 after:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIyMCA2IDkgMTcgNCAxMiI+PC9wb2x5bGluZT48L3N2Zz4=')] after:bg-contain after:bg-no-repeat peer-checked:after:opacity-100 after:transition-opacity after:duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                    ></div>
                    <span className="text-xs font-medium text-white">{text}</span>
                </label>
            ) : (
                <span className="text-xs font-medium text-white">{text}</span>
            )}
        </span>
    );
}