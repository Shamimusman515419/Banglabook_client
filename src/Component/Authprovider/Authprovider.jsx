import { createContext, useEffect, useState } from "react";
import app from "../../Firebaseconfig";
import {
     createUserWithEmailAndPassword,
     getAuth,
     onAuthStateChanged,
     sendEmailVerification,
     sendPasswordResetEmail,
     signInWithEmailAndPassword,
     signInWithPopup,
     signOut,
     updateProfile,
} from 'firebase/auth'
import axios from "axios";
export const AuthContext = createContext(null);
const auth = getAuth(app)


const AuthProvider = ({ children }) => {
     const [loading, setLoading] = useState(true)
     const [user, setUser] = useState(null)
     const createUser = (email, password) => {
          return createUserWithEmailAndPassword(auth, email, password)
     }
     const updateUserProfile = (name, photo) => {
          return updateProfile(auth?.currentUser, {
               displayName: name,
               photoURL: photo,
          })
     }
     const verifyUser = () => {
          return sendEmailVerification(auth.currentUser)

     }

     const Login = (email, password) => {
          return signInWithEmailAndPassword(auth, email, password)
     }
    
     const LogOut = () => {
          return signOut(auth)
     }
     useEffect(() => {
          const unsubcript = onAuthStateChanged(auth, currentUser => {
                setUser(currentUser);
                if (currentUser?.email) {
                    axios.post('https://banglabook-server.vercel.app/jwt')
                    .then(data=>{
                          localStorage.setItem('access-token', data?.data?.token)
                    }).catch(error=>{
                          console.log(error);
                    })
                    setLoading(false)
               } else {
                    localStorage.removeItem('access-token')
               }
             })
          return () => {
               unsubcript()
          }
     }, []);


     const authInfo = {
          createUser,
          updateUserProfile,
          verifyUser,
          Login,
          loading,
          user,
          LogOut
     }
     return (
          <div>
               <AuthContext.Provider value={authInfo}> {children}</AuthContext.Provider>
          </div>
     );
};

export default AuthProvider;