import { supabase } from '@lib/supabase.js'

// Obtener todos los posts publicados
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
  .eq("usuario_id", userId)

  if (error) throw error
  return data
}

export async function getSearchedPublishedPosts(searchTerm, page = 1, limit = 12) {
  const offset = (page - 1) * limit;

  const { data, error } = await supabase
    .from("posts")
    .select("*, post_categories(categories(nombre, color))")
    .eq("estado", "published")
    .ilike("titulo", `%${searchTerm}%`)
    .order("created_at", { ascending: true })
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
  .eq("id", postId)

  if (error) throw error
  return data
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

/** Elimina:
 *  1) La fila de `posts`
 *  2) Las filas de `post_categories`
 *  3) El archivo .webp del bucket post-images
 */
export const deletePostCascade = async (postId) => {
  /* ─ 0) Sacamos la URL de la imagen ───────────────── */
  const { data: postRow, error: fetchErr } = await supabase
    .from("posts")
    .select("imagen")
    .eq("id", postId)
    .single();

  if (fetchErr) throw fetchErr;

  /* ─ 1) Borramos relaciones en post_categories ────── */
  const { error: pcErr } = await supabase
    .from("post_categories")
    .delete()
    .eq("post_id", postId);

  if (pcErr) throw pcErr;

  /* ─ 2) Borramos la imagen del bucket (si existe) ─── */
  if (postRow?.imagen) {
    const imageUrl = postRow.imagen;
    await deleteImage(imageUrl);
  }


  /* ─ 3) Borramos el propio post ───────────────────── */
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

export const getFilteredPostsByCategories = async (categories = [], page = 1, limit = 12) => {
  if (categories.length === 0) return [];
  const offset = (page - 1) * limit;

  
  const { data, error } = await supabase
    .from('posts')
    .select('*, post_categories(categories(*))')
    .eq('estado', 'published')
    .order('created_at', { ascending: true })
    .range(offset, offset + limit - 1);

    if (error) throw error

  // Filtrar en el lado del cliente
  const filteredData = data.filter(post =>
    categories.every(category => 
      post.post_categories.some(rel =>
        rel.categories.nombre === category
      )
    )
  );
  

  return filteredData;
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
      imagen: imageUrl,      // puede ser null o cadena vacía
      usuario_id: userId,
      estado
    }])
    .select("id");  // retorna el id del nuevo post

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
  // 1) Insertamos el post (imagen puede ser null)
  const post = await createNewPost(
    title, description, link, imageUrl, userId, estado
  );
  // 2) Asociamos categorías
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
  // 1) Borra las categorías actuales
  const { error: deleteErr } = await supabase
    .from("post_categories")
    .delete()
    .eq("post_id", postId);

  if (deleteErr) throw deleteErr;

  // 2) Inserta las nuevas
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
