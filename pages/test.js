import { useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Test() {
  useEffect(() => {
    const runTest = async () => {
      const { data, error } = await supabase
        .from('watchlist')
        .select('*')
      console.log('watchlist data:', data)
      console.log('error:', error)
    }
    runTest()
  }, [])

  return <div>Testing watchlist… open your browser console.</div>
}
