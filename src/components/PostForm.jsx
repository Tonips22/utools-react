import { useState, useEffect } from "react";
import { addToast } from "@heroui/react";
import { getAllCategories, userCreatePost, getPostById, updatePost, updatePostCategories, deleteImage } from "@lib/db.js";
import { useAuth } from "@auth/AuthProvider.jsx";
import Label from "@components/Label.jsx";
import { supabase } from '@lib/supabase.js'
import Post from "@components/Post.jsx";

export default function PostForm({ isNewPost = true, setActiveForm, postId = null }) {
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
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  // Carga categorías
  useEffect(() => {
    getAllCategories()
      .then(setAllCategories)
      .catch(err => {
        console.error(err);
        addToast({
          title: "Error",
          description: "Impossible to load categories",
          color: "danger",
        });
      });


    if (!isNewPost && postId) {
      console.log("Loading post for edit:", postId);
      
      // Cargar post para editar
      getPostById(postId)
        .then(post => {
          setTitle(post.titulo);
          setLink(post.enlace);
          setDescription(post.descripcion);
          setImagePreviewUrl(post.imagen || "");
          setSelectedCategoryIds(
            post.post_categories.map((rel) => rel.categories.id)
          );
        })
        .catch(err => {
          console.error(err);
          addToast({
            title: "Error",
            description: "Could not load post",
            color: "danger",
          });
        });
    }
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
    if (file?.type === "image/webp") {
      setImageFile(file);
      setImagePreviewUrl("");
    } else {
      addToast({
        title: "Invalid format",
        description: "Only .webp allowed",
        color: "warning",
      });
    }
  };
  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file?.type === "image/webp"){
      setImageFile(file);
      setImagePreviewUrl("");
    } else {
      addToast({
        title: "Invalid format",
        description: "Only .webp allowed",
        color: "warning",
      });
    }
  };

  // Submit (sin subida de imagen)
  const handleSubmit = async (e) => {
    e.preventDefault();

    /* ─ 1) Validaciones básicas ───────────────────────── */
    if (!user) {
      addToast({ title: "Access denied", description: "You must be logged in", color: "danger" });
      return;
    }
    if (!title || !link || !description || selectedCategoryIds.length === 0) {
      addToast({ title: "Incomplete fields", description: "Fill in all fields and choose a category", color: "warning" });
      return;
    }
    if (isNewPost && !imageFile) {
      addToast({ title: "Image required", description: "Upload a .webp image", color: "warning" });
      return;
    }

    if (!isNewPost && !imageFile && !imagePreviewUrl) {
      addToast({ title: "Image required", description: "Upload a .webp image", color: "warning" });
      return;
    }

    if (!isNewPost && imageFile) {
      const oldPost = await getPostById(postId);
      if (oldPost?.imagen) {
        await deleteImage(oldPost.imagen);
      }
    }
    
    if (imageFile && imageFile.size > 100 * 1024) {          // 100 KB
      addToast({ title: "Image too heavy", description: "Must be less than 100 KB", color: "warning" });
      return;
    }

    /* ─ 4) Inserta post + relación categorías ─────────── */
    try {
      let imageToUse = "";

      if (imageFile) {
        // Si hay una nueva imagen, súbela
        const filePath = `${user.id}/${Date.now()}.webp`;
        const { error: uploadError } = await supabase
          .storage
          .from("post-images")
          .upload(filePath, imageFile, { upsert: false });

        if (uploadError) {
          console.error(uploadError);
          addToast({ title: "Error uploading image", description: uploadError.message, color: "danger" });
          return;
        }

        const { data: urlData, error: urlError } = supabase
          .storage
          .from("post-images")
          .getPublicUrl(filePath);

        if (urlError) {
          console.error(urlError);
          addToast({ title: "Error URL", description: urlError.message, color: "danger" });
          return;
        }

        imageToUse = urlData.publicUrl;
      }

      if (isNewPost) {
        await userCreatePost(title, description, link, imageToUse, user.id, selectedCategoryIds);
        addToast({ title: "Post created", description: "Post created successfully", color: "success" });
      } else {
        const updatedFields = {
          titulo: title,
          descripcion: description,
          enlace: link,
          estado: "pending"
        };

        if (imageToUse) {
          updatedFields.imagen = imageToUse;
        }

        await updatePost(postId, updatedFields);
        await updatePostCategories(postId, selectedCategoryIds);
        addToast({ title: "Post updated", description: "Changes saved successfully", color: "success" });
      }

      setActiveForm(false);
    } catch (err) {
      console.error(err);
      addToast({ title: "Error", description: "Could not save post", color: "danger" });
    }

  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-8 rounded-2xl font-primary gap-6 w-full h-full mx-auto overflow-auto scrollbar-hide">

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-sm">
        <h1 className="text-2xl font-bold text-white">{titleText}</h1>
        {/* Title + Link */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="hoverable flex flex-col gap-2">
            <label className="text-white/80">Title <span className="text-pink">*</span></label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="w-full p-2 rounded-md border border-white focus:border-pink outline-none"
            />
          </div>
          <div className="hoverable flex flex-col gap-2">
            <label className="text-white/80">Link <span className="text-pink">*</span></label>
            <input
              value={link}
              onChange={e => setLink(e.target.value)}
              placeholder="www.example.com"
              required
              className="w-full p-2 rounded-md border border-white focus:border-pink outline-none placeholder:italic"
            />
          </div>
        </div>

        {/* Description */}
        <div className="hoverable flex flex-col gap-2">
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
        <div className="hoverable flex flex-col gap-2">
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
        <div className="hoverable flex flex-col gap-2 border border-dashed border-white/40 p-4 rounded-lg">
          <label className="text-white/80">Image</label>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("fileInput").click()}
            style={{
              backgroundImage: (imageFile instanceof File)
                ? `url(${URL.createObjectURL(imageFile)})`
                : imagePreviewUrl
                ? `url(${imagePreviewUrl})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className={`
              relative flex items-center justify-center w-full h-40 rounded-lg cursor-pointer
              transition-all duration-200
              ${isDragging
                ? "border-pink bg-pink/10"
                : imageFile || imagePreviewUrl
                ? "border-transparent"
                : "border-dashed border-white/40 hover:border-pink hover:bg-pink/5"
              }
            `}
          >
            <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">
                {imageFile || imagePreviewUrl ? "Change image" : "Click or drag & drop a .webp"}
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
            className="hoverable bg-dark rounded-lg cursor-pointer px-4 py-2 font-semibold hover:bg-dark/80 transition-colors duration-300 z-[990] group min-w-[80px] text-center"
          >
            <span
                className=" text-transparent bg-clip-text bg-gradient-to-r from-light-blue via-purple to-pink bg-[length:200%_100%] bg-left group-hover:bg-right transition-[background-position] duration-200 ease-in-out">
                {buttonText}
              </span>
          </button>
          <button
            type="button"
            className="hoverable bg-red-500/40 rounded-lg px-4 py-2 font-semibold transition-colors duration-300 z-[990] group text-white cursor-pointer min-w-[80px] text-center"
            onClick={() => setActiveForm(false)}
          >
            <span
                className=" text-transparent bg-clip-text bg-gradient-to-r from-pink via-red-500 to-pink bg-[length:200%_100%] bg-left group-hover:bg-right transition-[background-position] duration-200 ease-in-out">
                Cancel
              </span>
          </button>
        </div>
      </form>

      {/* Preview (sólo en pantallas grandes) */}
      <div className="hidden md:flex flex-col items-center justify-center gap-4">
        <h3 className="text-white text-lg font-bold">Preview</h3>
        <div className="w-full max-w-sm">
          <Post
            id={postId}
            title={title || "Enter a title..."}
            link={link || "#"}
            image={
              imageFile instanceof File 
                ? URL.createObjectURL(imageFile)
                : imagePreviewUrl || "/wallpaper.webp"
            }
            categories={
              // Convertir selectedCategoryIds a la estructura esperada por Post
              selectedCategoryIds.map(categoryId => {
                const category = allCategories.find(cat => cat.id === categoryId);
                return category ? {
                  categories: {
                    nombre: category.nombre,
                    color: category.color
                  }
                } : null;
              }).filter(Boolean) // Filtrar nulls
            }
            noLink={true}
          >
            {description || "Enter a description..."}
          </Post>
        </div>
        <p className="text-xs text-white/60 text-center italic">
          This is how your post will look once published
        </p>
      </div>
    </div>
  );
}
