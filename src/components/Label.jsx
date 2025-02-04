export default function Label({ text }) {
    const color = ()=>{
        if(text === "Images") return "bg-slate-700/80";
        if(text === "Videos") return "bg-gray-700/80";
        if(text === "Optimization") return "bg-lime-700/80";
        if(text === "Hosting") return "bg-purple-800/80";
        if(text === "Design") return "bg-sky-500/80";
        if(text === "Deployment") return "bg-rose-500/80";
        if(text === "Components") return "bg-amber-500/80";
        if(text === "Colors") return "bg-emerald-400/80";
        if(text === "Typography") return "bg-yellow-500/80";
        if(text === "Icons") return "bg-teal-500/80";

    }
    return (
        <span className={`${color()} text-white font-secondary-font text-xs px-2 py-1 rounded-full`}> {text} </span>
    );
}