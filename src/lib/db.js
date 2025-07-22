import { supabase } from '@lib/supabase.js'

// Obtener todos los posts publicados
export async function getAllPublishedPosts(page = 1, limit = 12) {
  const offset = (page - 1) * limit;

  const { data, error } = await supabase
    .from("posts")
    .select("*, post_categories(categories(nombre, color))")
    .eq("estado", "published")
    .order("created_at", { ascending: true })
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

export const deletePost = async (postId) => {
  const { data, error } = await supabase
  .from("posts")
  .delete()
  .eq("id", postId)

  if (error) throw error
  return data
}

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
