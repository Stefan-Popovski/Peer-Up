import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  const loadProfile = useCallback(async (userId) => {
    if (!supabase || !userId) {
      setProfile(null)
      return
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error loading profile:', error)
      setProfile(null)
      return
    }

    setProfile(data || null)
  }, [])

  const loadAdminStatus = useCallback(async (email) => {
    if (!supabase || !email) {
      setIsAdmin(false)
      return false
    }

    const { data, error } = await supabase
      .from('admin_emails')
      .select('email')
      .eq('email', email)
      .maybeSingle()

    if (error) {
      console.error('Error checking admin status:', error)
      setIsAdmin(false)
      return false
    }

    const admin = !!data
    setIsAdmin(admin)
    return admin
  }, [])

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user || null)

      await Promise.all([
        loadProfile(session?.user?.id),
        loadAdminStatus(session?.user?.email),
      ])

      setLoading(false)
    })

    const {
      data: listener,
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user || null)

      await Promise.all([
        loadProfile(session?.user?.id),
        loadAdminStatus(session?.user?.email),
      ])
    })

    return () => listener.subscription.unsubscribe()
  }, [loadProfile, loadAdminStatus])

  const signUp = async ({ email, password, fullName, role }) => {
    if (!supabase) {
      return {
        data: null,
        error: new Error('Supabase is not configured.'),
      }
    }

    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role,
        },
      },
    })
  }

  const signIn = async ({ email, password }) => {
    if (!supabase) {
      return {
        data: null,
        error: new Error('Supabase is not configured.'),
      }
    }

    return await supabase.auth.signInWithPassword({
      email,
      password,
    })
  }

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut()
    }
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

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)

  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return ctx
}