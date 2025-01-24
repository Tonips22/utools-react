export default function Post({ title, link, children, image, categories = ["non-stablished"] }) {
    return (
        <a target="_blank" href={link} className="flex flex-col justify-start rounded-2xl bg-dark hover:opacity-80 transition-opacity duration-200 ease-in-out overflow-hidden cursor-pointer h-[425px]">
            <img className=" w-full h-1/3 object-cover object-center rounded-tl-2xl rounded-tr-2xl" src={image} alt={title} />

            <div className="flex flex-col justify-between p-4 h-2/3">
                <div class="flex flex-col gap-4">
                    <h3 className="font-primary-font text-3xl font-bold"> {title} </h3>
                    <p className="font-secondary-font text-sm"> {children} </p>
                </div>

                <div class="labels">
                    {categories.map((category, index) => (
                        <span key={index}> {category} </span>
                        // <Label text={pay}></Label>
                        // <Label text={ia}></Label>
                    ))}
                </div>
            </div>
        </a>
    );
}