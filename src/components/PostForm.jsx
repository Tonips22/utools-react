import React, { useState, useEffect } from "react";
import { addToast } from "@heroui/react";
import { getAllCategories, userCreatePost } from "@lib/db.js";
import { useAuth } from "@auth/AuthProvider.jsx";
import Label from "@components/Label.jsx";

export default function PostForm({ isNewPost = true, setActiveForm }) {
  const { user } = useAuth();
  const titleText = isNewPost ? "New Post" : "Edit Post";
  const buttonText = isNewPost ? "Create" : "Save";

  // Estados del form
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Campos controlados
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  // Carga categorías
  useEffect(() => {
    getAllCategories()
      .then(setAllCategories)
      .catch(err => {
        console.error(err);
        addToast({
          title: "Error",
          description: "No se pudieron cargar las categorías",
          color: "danger",
        });
      });
  }, []);

  // Toggle categorías (guarda sólo el id)
  const handleCategoryChange = (categoryName, checked) => {
    const cat = allCategories.find(c => c.nombre === categoryName);
    if (!cat) return;
    setSelectedCategoryIds(prev =>
      checked ? [...prev, cat.id] : prev.filter(id => id !== cat.id)
    );
  };

  // Drag & drop handlers
  const handleDragOver = e => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = e => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type === "image/webp") setImageFile(file);
    else {
      addToast({
        title: "Formato inválido",
        description: "Solo .webp permitido",
        color: "warning",
      });
    }
  };
  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file?.type === "image/webp") setImageFile(file);
    else {
      addToast({
        title: "Formato inválido",
        description: "Solo .webp permitido",
        color: "warning",
      });
    }
  };

  // Submit (sin subida de imagen)
  const handleSubmit = async e => {
    e.preventDefault();
    if (!user) {
      addToast({
        title: "Acceso denegado",
        description: "Debes estar logueado para crear un post",
        color: "danger",
      });
      return;
    }
    if (!title || !link || !description || selectedCategoryIds.length === 0) {
      addToast({
        title: "Campos incompletos",
        description: "Rellena todos los campos y elige al menos una categoría",
        color: "warning",
      });
      return;
    }

    const imageUrl = imageFile ? URL.createObjectURL(imageFile) : null;

    try {
      await userCreatePost(
        title,
        description,
        link,
        imageUrl,
        user.id,
        selectedCategoryIds
      );
      addToast({
        title: "Post creado",
        description: "Tu post se ha registrado correctamente",
        color: "success",
      });
      setActiveForm(false);
    } catch (err) {
      console.error(err);
      addToast({
        title: "Error",
        description: "Algo falló creando el post",
        color: "danger",
      });
    }
  };

  return (
    <div className="flex flex-col bg-dark p-8 rounded-2xl font-primary gap-6 max-w-screen-md w-full mx-auto">
      <h1 className="text-2xl font-bold text-white">{titleText}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-sm">
        {/* Title + Link */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-white/80">Title <span className="text-pink">*</span></label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="w-full bg-dark p-2 rounded-md border border-white focus:border-pink outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white/80">Link <span className="text-pink">*</span></label>
            <input
              value={link}
              onChange={e => setLink(e.target.value)}
              placeholder="www.example.com"
              required
              className="w-full bg-dark p-2 rounded-md border border-white focus:border-pink outline-none placeholder:italic"
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-white/80">Description <span className="text-pink">*</span></label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows="4"
            required
            className="w-full p-2 border border-white rounded-md bg-transparent focus:border-pink outline-none"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-2">
          <label className="text-white/80">Categories <span className="text-pink">*</span></label>
          <div className="flex flex-wrap gap-2">
            {allCategories.map(cat => (
              <Label
                key={cat.id}
                color={cat.color}
                text={cat.nombre}
                hasCheckBox
                isChecked={selectedCategoryIds.includes(cat.id)}
                onChange={handleCategoryChange}
              />
            ))}
          </div>
        </div>

        {/* Image upload (preview local) */}
        <div className="flex flex-col gap-2">
          <label className="text-white/80">Image</label>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("fileInput").click()}
            style={{
              backgroundImage: imageFile
                ? `url(${URL.createObjectURL(imageFile)})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className={`
              relative flex items-center justify-center w-full h-40 rounded-lg cursor-pointer
              transition-all duration-200
              ${isDragging
                ? "border-pink bg-pink/10"
                : imageFile
                ? "border-transparent"
                : "border-dashed border-white/40 hover:border-pink hover:bg-pink/5"
              }
            `}
          >
            <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">
                {imageFile ? "Change image" : "Click or drag & drop a .webp"}
              </span>
            </div>
            <input
              id="fileInput"
              type="file"
              accept=".webp"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <p className="text-xs text-white/60 italic">
            * Max 100KB, .webp format only
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-pink text-white px-4 py-2 rounded-md hover:opacity-80"
          >
            {buttonText}
          </button>
          <button
            type="button"
            className="border border-red-500/80 text-white px-4 py-2 rounded-md hover:bg-red-500/80"
            onClick={() => setActiveForm(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
