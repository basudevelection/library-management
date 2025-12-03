import { supabase } from './supabase.js'

export async function issueBook(bookId,memberId,dueDate){
  const { data:{session} } = await supabase.auth.getSession()
  const { data:profile } = await supabase.from('profiles').select('library_id').eq('id',session.user.id).single()
  await supabase.from('books').update({available_copies:supabase.raw('available_copies - 1')}).eq('id',bookId)
  return await supabase.from('transactions').insert({
    book_id:bookId,
    member_id:memberId,
    library_id:profile.library_id,
    issued_by:session.user.id,
    due_date:dueDate,
    status:'issued'
  })
}

export async function returnBook(transactionId){
  const { data:tx } = await supabase.from('transactions').select('book_id').eq('id',transactionId).single()
  await supabase.from('books').update({available_copies:supabase.raw('available_copies + 1')}).eq('id',tx.book_id)
  return await supabase.from('transactions').update({status:'returned',return_date:new Date().toISOString().split('T')[0]}).eq('id',transactionId)
}

export async function getTransactions(){
  const { data:{session} } = await supabase.auth.getSession()
  const { data:profile } = await supabase.from('profiles').select('library_id').eq('id',session.user.id).single()
  return await supabase.from('transactions').select('*,books(title),members(full_name)').eq('library_id',profile.library_id)
}
