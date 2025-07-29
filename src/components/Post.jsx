import { useState } from "react";
import Label from "@components/Label.jsx";
import { TbDotsVertical } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, addToast} from "@heroui/react";
import { deletePostCascade } from "@lib/db.js";

export default function Post({id, title, link, children, image, categories = ["non-stablished"], name="", showStatus=false, status="pending" }) {
    const statusColors = {
        "pending": "#901BCACC",
        "published": "#53FA53cc",
        "rejected": "#F46058CC",
    };
    const [openModal, setOpenModal] = useState(false);

    const handleDelete = async () => {
        try {
            await deletePostCascade(id);
            addToast({
                title: "Post deleted",
                description: "Your post has been successfully deleted.",
                color: "success",
            });
        } catch (error) {
            console.error("Error deleting post:", error);
            addToast({
                title: "Error deleting post",
                description: "There was an error deleting your post.",
                color: "error",
            });
        }
    };

    return (
        <>
        <div className="relative">
        <a target="_blank" href={link} className="hoverable relative flex flex-col justify-start rounded-2xl bg-dark hover:opacity-80 transition-opacity duration-200 ease-in-out overflow-hidden cursor-pointer h-[425px]">
            <img className=" w-full h-1/3 object-cover object-center rounded-tl-2xl rounded-tr-2xl" src={image} alt={title} />

            <div className="flex flex-col justify-between p-4 h-2/3">
                <div className="flex flex-col gap-4">
                    <h3 className="font-primary text-3xl"> {title} </h3>
                    <p className="font-secondary text-sm"> {children} </p>
                    {name && <p className="font-secondary text-xs opacity-60"> Reference by {name}</p>}
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
            <div className="absolute top-0 right-0 flex flex-row items-center justify-center bg-gray-50/40 backdrop-blur-xl backdrop-saturate-150 rounded-bl-2xl rounded-tr-2xl px-4 py-2 gap-4 cursor-default z-20">
                <Label
                    text={status}
                    color={statusColors[status]}
                    className="text-xs font-bold"
                />

                <Dropdown
                    classNames={{
                        // wrapper del popover (el que tiene bg-content1)
                        content: "bg-transparent backdrop-blur-md rounded-xl", 
                        // puedes ocultar la flechita si quieres
                        arrow: "hidden",
                        base: "w-36 bg-transparent border-none outline-none",
                        trigger: "flex items-center gap-2",
                    }}
                    
                >
                    <DropdownTrigger>
                        <button
                            type="button"
                            aria-label="post options"
                            className="p-0 m-0 bg-transparent leading-none cursor-pointer hover:scale-110 active:scale-95 transition-transform"
                        >
                            <TbDotsVertical className="text-dark text-xl" />
                        </button>
                    </DropdownTrigger>
                    <DropdownMenu 
                        aria-label="Static Actions"
                        classNames={{
                            base: "bg-dark backdrop-blur-sm rounded-xl p-2",
                            list: "flex flex-col gap-2",
                        }}
                        itemClasses={{
                            base: "rounded-lg py-1 px-2 text-sm text-white hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out",
                        }}
                        variant="light"
                    >
                        <DropdownItem
                            key="edit"
                            classNames={{ 
                                base: "group flex flex-row items-center gap-2 bg-dark bg-transparent hover:bg-pink", 
                                title: "text-sm text-white group-hover:text-dark",
                            }}
                        >
                            <div className="flex flex-row items-center gap-2">
                                <CiEdit className="text-pink text-xl group-hover:text-dark rounded-md transition-colors duration-200 ease-in-out" />
                                Edit post
                            </div>
                        </DropdownItem>
                        <DropdownItem
                            key="delete"
                            classNames={{ 
                                base: "group flex flex-row items-center gap-2 bg-dark bg-transparent hover:bg-red-700 cursor-pointer", 
                                title: "text-sm text-white",
                            }}
                        >
                            <button
                                type="button"
                                aria-label="post options"
                                className="flex flex-row items-center gap-2 cursor-pointer bg-transparent hover:bg-red-700 text-white transition-colors duration-200 ease-in-out"
                                variant="light"
                                onClick={() => setOpenModal(true)}
                            >
                                <FaTrashAlt className="text-red-700 text-lg group-hover:text-white rounded-md transition-colors duration-200 ease-in-out" />
                                Delete post
                            </button>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        )}
        </div>

        {openModal && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-[99999]">
                <div className="bg-dark rounded-xl p-6 w-96 flex flex-col gap-4">
                    <h2 className="text-2xl font-bold">Delete Post</h2>
                    <p className="">Are you sure you want to delete <span className="font-bold">{title}</span>?</p>
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="light"
                            color="default"
                            onClick={() => setOpenModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="flat"
                            color="danger"
                                onClick={() => {
                                    handleDelete();
                                    setOpenModal(false);
                            }}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}