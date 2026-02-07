import { useState } from "react";
import Label from "@components/Label.jsx";
import { TbDotsVertical } from "react-icons/tb";
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { addToast } from "@heroui/react";
import { deletePostCascade } from "@lib/db.js";
import PostForm from "@components/PostForm.jsx";
import Modal from "@components/Modal.jsx";
import Dropdown from "@components/Dropdown.tsx";
import Button from "@components/Button.jsx";

export default function Post({id, title, link, children, image, categories = ["non-stablished"], name="", showStatus=false, status="pending", noLink=false, onPostDeleted, onPostUpdated}) {
    const statusColors = {
        "pending": "#901BCACC",
        "published": "#53FA53cc",
        "rejected": "#F46058CC",
    };
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [activeForm, setActiveForm] = useState(false);

    const handleDelete = async () => {
        try {
            await deletePostCascade(id);
            addToast({
                title: "Post deleted",
                description: "Your post has been successfully deleted.",
                color: "success",
            });
            // Llamar callback para refrescar la lista
            if (onPostDeleted) {
                onPostDeleted();
            }
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
        <div className={`relative hoverable group hover:scale-105 ${showStatus ? "" : "active:scale-95"} border border-white/10 hover:border-white/30 rounded-2xl shadow-lg hover:shadow-2xl transition-scale duration-200 ease-in-out`}>
        <a target="_blank" href={link} className={`relative flex flex-col justify-start rounded-2xl bg-dark  overflow-hidden cursor-pointer h-[425px]  ${noLink ? "pointer-events-none" : ""}`}>
            {/* <div className="absolute -inset-[1px] bg-gradient-to-r from-light-blue via-purple to-pink rounded-2xl blur-sm opacity-0 group-hover:opacity-40 -z-10 transition-opacity duration-200 ease-in-out"></div> */}
            <div className="overflow-hidden rounded-tl-2xl rounded-tr-2xl h-1/3">
                <img className="w-full h-full object-cover object-center transition-transform duration-200 ease-out group-hover:scale-105" src={image} alt={title} />
            </div>

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
            <div className="absolute top-0 right-0 flex flex-row items-center justify-center bg-white/20 backdrop-blur-xs backdrop-saturate-150 rounded-bl-2xl rounded-tr-2xl px-4 py-2 gap-4 cursor-default z-20">
                <Label
                    text={status}
                    color={statusColors[status]}
                    className="text-xs font-bold"
                />

                <Dropdown
                    position="right"
                    width="w-40"
                    top="top-8"
                    customButton={
                        <button
                            type="button"
                            aria-label="post options"
                            className="hoverable p-0 m-0 bg-transparent leading-none cursor-pointer hover:scale-110 active:scale-95 transition-transform"
                        >
                            <TbDotsVertical className="text-dark text-xl" />
                        </button>
                    }
                >
                    <Button
                        onClick={() => setActiveForm(true)}
                        className="w-full text-sm rounded-lg"
                        type="submit"
                    >
                        <FaPen />
                        Edit post
                    </Button>
                    
                    <Button
                        onClick={() => setShowDeleteModal(true)}
                        className="w-full text-sm rounded-lg"
                        type="danger"
                    >
                        <FaTrashAlt />
                        Delete post
                    </Button>
                </Dropdown>
            </div>
        )}
        </div>

        <Modal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDelete}
            title="Delete Post"
            message={`Are you sure you want to delete "${title}"? This action cannot be undone.`}
            confirmText="Delete"
            cancelText="Cancel"
            danger={true}
        />

        {activeForm && (
                <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-[999]">
                  <PostForm
                    isNewPost={false}
                    setActiveForm={setActiveForm}
                    postId={id}
                    onPostUpdated={onPostUpdated}
                  />
                </div>
            )}
        </>
    );
}