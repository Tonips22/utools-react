import Label from "@components/Label.jsx";

export default function Post({ title, link, children, image, categories = ["non-stablished"], name="", showStatus=false, status="pending" }) {
    const statusColors = {
        "pending": "#B566E6CC",
        "published": "#53FA53cc",
        "rejected": "#F46058CC",
    };
    
    return (
        <a target="_blank" href={link} className="hoverable relative flex flex-col justify-start rounded-2xl bg-dark hover:opacity-80 transition-opacity duration-200 ease-in-out overflow-hidden cursor-pointer h-[425px]">
            <img className=" w-full h-1/3 object-cover object-center rounded-tl-2xl rounded-tr-2xl" src={image} alt={title} />

            <div className="flex flex-col justify-between p-4 h-2/3">
                <div className="flex flex-col gap-4">
                    <h3 className="font-primary-font text-3xl font-bold"> {title} </h3>
                    <p className="font-secondary-font text-sm"> {children} </p>
                    {name && <p className="font-secondary-font text-xs opacity-60"> Reference by {name}</p>}
                </div>

                <div className="labels flex flex-row gap-2 flex-wrap">
                    {categories.map((category, index) => (
                        <Label key={index} text={category.categories.nombre} color={category.categories.color}/>
                    ))}
                </div>
            </div>

            {showStatus && (
                <Label
                    text={status}
                    color={statusColors[status]}
                    className="absolute top-0 right-0 m-4 text-xs font-bold"
                />
            )}
        </a>
    );
}