import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/Supabaseclient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  const loadProfile = useCallback(async (userId) => {
    if (!userId) {
      setProfile(null)
      return
    }
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
    setProfile(data || null)
  }, [])

  const loadAdminStatus = useCallback(async (email) => {
    if (!email) {
      setIsAdmin(false)
      return false
    }
    const { data } = await supabase.from('admin_emails').select('email').eq('email', email).maybeSingle()
    const admin = !!data
    setIsAdmin(admin)
    return admin
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user || null)
      await Promise.all([loadProfile(session?.user?.id), loadAdminStatus(session?.user?.email)])
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user || null)
      await Promise.all([loadProfile(session?.user?.id), loadAdminStatus(session?.user?.email)])
    })

    return () => listener.subscription.unsubscribe()
  }, [loadProfile, loadAdminStatus])

  // role is 'student' | 'mentor' — stored in user metadata, then copied to profiles.role by a DB trigger
  const signUp = async ({ email, password, fullName, role }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, role } },
    })
    return { data, error }
  }

  const signIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const value = {
    user,
    profile,
    isAdmin,
    loading,
    signUp,
    signIn,
    signOut,
    refreshProfile: () => loadProfile(user?.id),
    checkIsAdmin: loadAdminStatus,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}