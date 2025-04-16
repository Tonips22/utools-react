import Label from "@components/Label.jsx";
import { TbDotsVertical } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";

export default function Post({id, title, link, children, image, categories = ["non-stablished"], name="", showStatus=false, status="pending" }) {
    const statusColors = {
        "pending": "#901BCACC",
        "published": "#53FA53cc",
        "rejected": "#F46058CC",
    };
    
    return (
        <div className="relative">
        <a target="_blank" href={link} className="hoverable relative flex flex-col justify-start rounded-2xl bg-dark hover:opacity-80 transition-opacity duration-200 ease-in-out overflow-hidden cursor-pointer h-[425px]">
            <img className=" w-full h-1/3 object-cover object-center rounded-tl-2xl rounded-tr-2xl" src={image} alt={title} />

            <div className="flex flex-col justify-between p-4 h-2/3">
                <div className="flex flex-col gap-4">
                    <h3 className="font-primary-font text-3xl font-bold"> {title} </h3>
                    <p className="font-secondary-font text-sm"> {children} </p>
                    {name && <p className="font-secondary-font text-xs opacity-60"> Reference by {name}</p>}
                </div>

                <div className="labels flex flex-row gap-2 flex-wrap">
                {categories
                    .filter(category => category.categories) // Evita null
                    .map((category, index) => (
                        <Label
                            key={index}
                            text={category.categories.nombre}
                            color={category.categories.color}
                        />
                    ))}
                </div>
            </div>
        </a>

        {showStatus && (
            <div className="absolute top-0 right-0 flex flex-row items-center justify-center bg-transparent backdrop-blur-xl backdrop-saturate-150 rounded-bl-2xl rounded-tr-2xl px-4 py-2 gap-4 cursor-default z-20">
                <Label
                    text={status}
                    color={statusColors[status]}
                    className="text-xs font-bold"
                />

                <Dropdown
                className="hoverable z-0 rounded-xl p-2 bg-dark"
                >
                    <DropdownTrigger>
                        <Button size="sm">
                            <TbDotsVertical className="hoverable text-dark text-xl cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-200 ease-in-out"/>
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions" className="flex flex-col gap-4 min-w-36">
                        <DropdownItem key="edit" className="group hover:bg-pink hover:text-dark rounded-md transition-colors duration-200 ease-in-out" >
                            <div className="flex flex-row items-center gap-2">
                                <CiEdit className="text-pink text-xl group-hover:text-dark rounded-md transition-colors duration-200 ease-in-out" />
                                Edit post
                            </div>
                        </DropdownItem>
                        <DropdownItem key="delete" className="group hover:bg-red-700 hover:text-white rounded-md transition-colors duration-200 ease-in-out" >
                            <Button className="flex flex-row items-center gap-2" size="sm">
                                <FaTrashAlt className="text-red-700 text-lg group-hover:text-white rounded-md transition-colors duration-200 ease-in-out" />
                                Delete post
                            </Button>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        )}
        </div>
    );
}