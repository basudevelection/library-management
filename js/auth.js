import { supabase } from './supabase.js'

export async function signUp(email,password,schoolName,libraryName,fullName){
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options:{ data:{ school_name:schoolName, library_name:libraryName, full_name:fullName }}
  })
  if(error) throw error
  const user = data.user
  const { data:lib } = await supabase.from('libraries').insert({name:libraryName,school_name:schoolName}).select().single()
  await supabase.from('profiles').insert({
    id:user.id,
    library_id:lib.id,
    library_id_custom:email.split('@')[0].toUpperCase(),
    full_name:fullName,
    role:'admin'
  })
  return data
}

export async function signIn(email,password){
  const { data, error } = await supabase.auth.signInWithPassword({email,password})
  if(error) throw error
  return data
}

export async function signOut(){
  await supabase.auth.signOut()
}

export async function getCurrentUser(){
  const { data:{session} } = await supabase.auth.getSession()
  if(!session) return null
  const { data:profile } = await supabase.from('profiles').select('*,libraries(*)').eq('id',session.user.id).single()
  return {user:session.user, profile}
}

export async function requireAuth(){
  const user = await getCurrentUser()
  if(!user) location.href='login.html'
  return user
}
