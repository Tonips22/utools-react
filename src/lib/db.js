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

export const getFilteredPostsByCategories = async (categories = []) => {
  if (categories.length === 0) return [];
  
  const { data, error } = await supabase
    .from('posts')
    .select('*, post_categories(categories(*))')
    .eq('estado', 'published');

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

