import { supabase } from '@lib/supabase.js'

// Obtener todos los posts publicados
export const getAllPublishedPosts = async () => {
  const { data, error } = await supabase
  .from("posts")
  .select(`*, post_categories( categories (nombre, color) )`)
  .eq("estado", "published")

  if (error) throw error
  return data
}
// Obtener las categorías de un post
export const getPostCategories = async (postId) => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('post_id', postId)

  if (error) throw error
  return data
}