
import { createContext, useEffect, useState } from "react";
import app from "../../Firebaseconfig";
import {
     FacebookAuthProvider,
     GoogleAuthProvider,
     createUserWithEmailAndPassword,
     getAuth,
     onAuthStateChanged,
     sendEmailVerification,
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
     const [user, setUser] = useState(null);
     const [userinfo, setUserinfo] = useState(null);
     const [searchBarOpen, setSearchBarOpen] = useState(false)
     const [commonLoader,setCommonLoader] = useState(false)
     const FacebookProvider = new FacebookAuthProvider();
     const GoogleProvider = new GoogleAuthProvider();
     const createUser = (email, password) => {
          return createUserWithEmailAndPassword(auth, email, password)
     }
     const updateUserProfile = (name, photo) => {
          return updateProfile(auth?.currentUser, {
               displayName: name,
               photoURL: photo,
          })
     }

     const updateProfilePhoto = (name, photo) => {
          return updateProfile(auth?.currentUser, {
               displayName: name,
               photoURL: photo,
          })
     }


     const FacebookLogin = () => {
          return signInWithPopup(auth, FacebookProvider)
     }
     const GoogleLogin = () => {
          return signInWithPopup(auth, GoogleProvider)
     }

     const verifyUser = () => {
          return sendEmailVerification(auth.currentUser)

     }

     const Login = (email, password) => {
          return signInWithEmailAndPassword(auth, email, password)
     }


     const getEmail = async (email) => {

          const res = await fetch(`https://banglabook-server.vercel.app/user/${email}`, {
               headers: {
                    Authorization: `Bearer ${localStorage.getItem('access-token')}`
               }
          })

          const data = await res.json();
          setUserinfo(data)

     }

     const LogOut = () => {
          return signOut(auth)
     }
     useEffect(() => {
          const unsubcript = onAuthStateChanged(auth, currentUser => {
               setUser(currentUser);
               setLoading(false);
               getEmail(currentUser?.email)
               console.log(currentUser?.email);
               if (currentUser?.email) {

                    axios.post('https://banglabook-server.vercel.app/jwt')
                         .then(data => {
                              localStorage.setItem('access-token', data?.data?.token)
                         }).catch(error => {
                              localStorage.removeItem('access-token')
                         })

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
          GoogleLogin, FacebookLogin,
          verifyUser,
          updateProfilePhoto,
          Login,commonLoader,setCommonLoader,
          loading,
          user, searchBarOpen, setSearchBarOpen,
          userinfo,
          LogOut
     }
     return (
          <div>
               <AuthContext.Provider value={authInfo}> {children}</AuthContext.Provider>
          </div>
     );
};

export default AuthProvider;