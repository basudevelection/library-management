export function showMessage(msg,type='success'){
  const div = document.createElement('div')
  div.className = `fixed top-4 right-4 px-6 py-3 rounded text-white z-50 ${type==='error'?'bg-red-600':'bg-green-600'}`
  div.textContent = msg
  document.body.appendChild(div)
  setTimeout(()=>div.remove(),3000)
}

export async function uploadCover(file){
  const { data:{session} } = await supabase.auth.getSession()
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
  const { data, error } = await supabase.storage.from('book-covers').upload(`${session.user.id}/${fileName}`,file)
  if(error) throw error
  const { data:{publicUrl} } = supabase.storage.from('book-covers').getPublicUrl(`${session.user.id}/${fileName}`)
  return publicUrl
}
