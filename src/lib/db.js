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

export const getSearchedPublishedPosts = async (searchTerm) => {
  const { data, error } = await supabase
  .from("posts")
  .select(`*, post_categories( categories (nombre, color) )`)
  .eq("estado", "published")
  .ilike("titulo", `%${searchTerm}%`)

  if (error) throw error
  return data
}