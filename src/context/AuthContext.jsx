import { createContext, useState, useContext, useEffect } from 'react'
import { GoogleAuthProvider, signInWithRedirect, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase"


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [spinner, setSpinner] = useState(false);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  }

  const logout = () => {
    setSpinner(false)
    signOut(auth);
  }

  const value = {
    currentUser,
    setCurrentUser,
    signInWithGoogle,
    logout,
    spinner
  }

  useEffect(() => {
    setSpinner(true)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setSpinner(false)
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null)
      }

    })
    return unsubscribe
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext);
}
