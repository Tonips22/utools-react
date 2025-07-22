import React, {useState, useEffect} from "react";
import { getAllCategories } from '@lib/db.js';
import Label from "@components/Label.jsx";

export default function PostForm({isNewPost = true, setActiveForm}) {
    const title = isNewPost ? "New Post" : "Edit Post";
    const buttonText = isNewPost ? "Create" : "Save";
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);



    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }
        fetchCategories();
    }, []);

    const handleCategoryChange = (categoryName, isChecked) => {
        if (isChecked) {
            setSelectedCategories(prev => [...prev, categoryName]);
        } else {
            setSelectedCategories(prev => prev.filter(name => name !== categoryName));
        }
    };

    // Drag and drop handlers for image upload
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type === "image/webp") {
            setImageFile(file);
        } else {
            alert("Please upload a .webp image.");
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "image/webp") {
            setImageFile(file);
        } else {
            alert("Please upload a .webp image.");
        }
    };



    return (
        <div className="flex flex-col bg-dark p-8 rounded-2xl font-primary-font gap-6 max-w-screen-md w-full mx-auto">
        <h1 className="text-2xl font-bold text-white font-primary-font">{title}</h1>

        <form className="flex flex-col gap-6 text-sm">
            {/* Title + Link */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
                <label className="block text-white opacity-80">
                Title <span className="text-pink">*</span>
                </label>
                <input
                    type="text"
                    className="w-full bg-dark p-2 rounded-md outline-none border border-white focus:border-pink transition-colors duration-200 ease-in-out"
                    autoFocus
                    required
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="block text-white opacity-80">
                Link <span className="text-pink">*</span>
                </label>
                <input
                    type="text"
                    placeholder="www.example.com"
                    className="w-full bg-dark p-2 rounded-md outline-none border border-white focus:border-pink transition-colors duration-200 ease-in-out placeholder:text-slate-50/20 placeholder:italic"
                    required
                />
            </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
            <label className="block text-white opacity-80">
                Description <span className="text-pink">*</span>
            </label>
            <textarea
                className="w-full p-2 border border-white rounded-md bg-transparent outline-none focus:border-pink transition-colors duration-200 ease-in-out"
                rows="4"
            />
            </div>

            {/* Categories */}
            <div className="flex flex-col gap-2">
            <label className="block text-white opacity-80">
                Categories <span className="text-pink">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                <Label
                    key={category.id}
                    color={category.color}
                    text={category.nombre}
                    hasCheckBox={true}
                    isChecked={selectedCategories.includes(category.nombre)}
                    onChange={handleCategoryChange}
                />
                ))}
            </div>
            </div>

            {/* Image Upload */}
            <div className="flex flex-col gap-2">
            <label className="block text-white opacity-80">Image <span className="text-pink">*</span></label>

            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("fileInput").click()}
                style={{
                    backgroundImage: imageFile ? `url(${URL.createObjectURL(imageFile)})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className={`relative flex items-center justify-center w-full h-40 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                isDragging
                    ? "border-pink bg-pink/10"
                    : imageFile
                    ? "border-white/10"
                    : "border-dashed border-white/40 hover:border-pink hover:bg-pink/5"
                }`}
            >
                <div className="absolute inset-0 bg-black/30 rounded-lg backdrop-blur-sm flex items-center justify-center">
                <span className="text-white text-sm">
                    {imageFile ? "Change image" : "Click or drag & drop a .webp image"}
                </span>
                </div>

                <input
                    id="fileInput"
                    type="file"
                    accept="image/webp"
                    className="hidden"
                    onChange={handleFileChange}
                    required
                />
            </div>

            <p className="text-xs text-white/60 italic">
                Image should be in .webp and less than 100KB.
            </p>
            </div>



            {/* Buttons */}
            <div className="flex gap-4">
            <button
                type="submit"
                className="bg-pink text-white px-4 py-2 rounded-md hover:opacity-80 transition-opacity duration-200 ease-in-out"
            >
                {buttonText}
            </button>
            <button
                type="button"
                className="bg-transparent text-white px-4 py-2 rounded-md border border-red-500/80 hover:bg-red-500/80 transition-colors duration-200"
                onClick={() => setActiveForm(false)}
            >
                Cancel
            </button>
            </div>
        </form>
        </div>

    )
}