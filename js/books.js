import { supabase } from './supabase.js'

export async function getBooks(){
  const { data:{session} } = await supabase.auth.getSession()
  const { data } = await supabase.from('profiles').select('library_id').eq('id',session.user.id).single()
  const res = await supabase.from('books').select('*').eq('library_id',data.library_id).order('title')
  return res.data
}

export async function addBook(book){
  const { data:{session} } = await supabase.auth.getSession()
  const { data:profile } = await supabase.from('profiles').select('library_id').eq('id',session.user.id).single()
  return await supabase.from('books').insert({ ...book, library_id:profile.library_id, created_by:session.user.id }).select()
}

export async function updateBook(id,updates){
  return await supabase.from('books').update(updates).eq('id',id)
}

export async function deleteBook(id){
  return await supabase.from('books').delete().eq('id',id)
}
