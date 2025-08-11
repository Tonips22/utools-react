import { supabase } from '@lib/supabase.js'

// Obtener todos los posts publicados (paginado)
export async function getAllPublishedPosts(page = 1, limit = 12) {
  const offset = (page - 1) * limit;

  const { data, error } = await supabase
    .from("posts")
    .select("*, post_categories(categories(nombre, color))")
    .eq("estado", "published")
    .order("titulo", { ascending: true })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data;
}

export const getUserPosts = async (userId) => {
  const { data, error } = await supabase
    .from("posts")
    .select(`*, post_categories( categories (nombre, color) )`)
    .eq("usuario_id", userId);

  if (error) throw error;
  return data;
}

export async function getSearchedPublishedPosts(searchTerm, page = 1, limit = 12) {
  const offset = (page - 1) * limit;

  const { data, error } = await supabase
    .from("posts")
    .select("*, post_categories(categories(nombre, color))")
    .eq("estado", "published")
    .ilike("titulo", `%${searchTerm}%`)
    .order("titulo", { ascending: true })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data;
}

export const getPostById = async (postId) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, post_categories(categories(id, nombre, color))")
    .eq("id", postId)
    .single();

  if (error) throw error;
  return data;
}

export const deletePost = async (postId) => {
  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId);

  if (error) throw error;
  return data;
}

export const deleteImage = async (imageUrl) => {
  const url = new URL(imageUrl);
  const path = decodeURIComponent(
    url.pathname.replace("/storage/v1/object/public/post-images/", "")
  );

  const { error } = await supabase
    .storage
    .from("post-images")
    .remove([path]);

  if (error) {
    console.error("❌ Error al borrar imagen:", error);
    throw error;
  }

  console.log("✅ Imagen borrada correctamente:", path);
};

/** deletePostCascade ... (sin cambios funcionales) */
export const deletePostCascade = async (postId) => {
  const { data: postRow, error: fetchErr } = await supabase
    .from("posts")
    .select("imagen")
    .eq("id", postId)
    .single();

  if (fetchErr) throw fetchErr;

  const { error: pcErr } = await supabase
    .from("post_categories")
    .delete()
    .eq("post_id", postId);

  if (pcErr) throw pcErr;

  if (postRow?.imagen) {
    const imageUrl = postRow.imagen;
    await deleteImage(imageUrl);
  }

  const { data, error: postErr } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId);

  if (postErr) throw postErr;
  return data;
};

export const getAllCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
}

/**
 * Filtra por todas las categorías indicadas (AND). 
 * Devuelve página `page` con tamaño `limit`.
 * Opcional: searchTerm (se filtra por titulo en cliente si se pasa).
 */
export const getFilteredPostsByCategories = async (categories = [], page = 1, limit = 12, searchTerm = "") => {
  if (!Array.isArray(categories) || categories.length === 0) return [];

  // Traemos todos los posts publicados con sus relaciones (sin .range para no truncar antes del filtrado)
  const { data, error } = await supabase
    .from('posts')
    .select('*, post_categories(categories(nombre, color))')
    .eq('estado', 'published')
    .order('titulo', { ascending: true });

  if (error) throw error;

  // Filtrar: el post debe tener TODAS las categorías seleccionadas (AND)
  const filteredData = data.filter(post =>
    categories.every(categoryName =>
      post.post_categories.some(rel =>
        rel.categories && rel.categories.nombre === categoryName
      )
    )
  );

  // Si nos pasan searchTerm, filtramos por título también (cliente)
  const finalFiltered = searchTerm
    ? filteredData.filter(p => p.titulo && p.titulo.toLowerCase().includes(searchTerm.toLowerCase()))
    : filteredData;

  // Aplicar paginación después del filtrado
  const offset = (page - 1) * limit;
  return finalFiltered.slice(offset, offset + limit);
};

export const createNewPost = async (
  title, description, link, imageUrl, userId, estado = "pending"
) => {
  const { data, error } = await supabase
    .from("posts")
    .insert([{
      titulo: title,
      descripcion: description,
      enlace: link,
      imagen: imageUrl,
      usuario_id: userId,
      estado
    }])
    .select("id");

  if (error) throw error;
  return data[0];
};

export const createNewPostCategories = async (postId, categoryIds) => {
  const payload = categoryIds.map(id => ({
    post_id: postId,
    category_id: id
  }));
  const { data, error } = await supabase
    .from("post_categories")
    .insert(payload);

  if (error) throw error;
  return data;
};

export const userCreatePost = async (
  title, description, link, imageUrl, userId, categoryIds, estado = "pending"
) => {
  const post = await createNewPost(
    title, description, link, imageUrl, userId, estado
  );
  const categories = await createNewPostCategories(post.id, categoryIds);
  return { post, categories };
};

export const updatePost = async (postId, updatedFields) => {
  const { data, error } = await supabase
    .from("posts")
    .update(updatedFields)
    .eq("id", postId);

  if (error) throw error;
  return data;
};

export const updatePostCategories = async (postId, newCategoryIds) => {
  const { error: deleteErr } = await supabase
    .from("post_categories")
    .delete()
    .eq("post_id", postId);

  if (deleteErr) throw deleteErr;

  const payload = newCategoryIds.map((id) => ({
    post_id: postId,
    category_id: id,
  }));

  const { data, error: insertErr } = await supabase
    .from("post_categories")
    .insert(payload);

  if (insertErr) throw insertErr;
  return data;
};
