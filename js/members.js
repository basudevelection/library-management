import { supabase } from './supabase.js'

export async function getMembers(){
  const { data:{session} } = await supabase.auth.getSession()
  const { data:profile } = await supabase.from('profiles').select('library_id').eq('id',session.user.id).single()
  const { data } = await supabase.from('members').select('*').eq('library_id',profile.library_id)
  return data
}

export async function addMember(member){
  const { data:{session} } = await supabase.auth.getSession()
  const { data:profile } = await supabase.from('profiles').select('library_id').eq('id',session.user.id).single()
  const cardId = 'MEM'+Date.now().toString().slice(-6)
  return await supabase.from('members').insert({ ...member, card_id:cardId, library_id:profile.library_id, registered_by:session.user.id }).select()
}

export async function updateMember(id,updates){
  return await supabase.from('members').update(updates).eq('id',id)
}

export async function deleteMember(id){
  return await supabase.from('members').delete().eq('id',id)
}
