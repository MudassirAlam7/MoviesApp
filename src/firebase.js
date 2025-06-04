
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyB2U9YIsv_B1_XZSRR1FnNyGzU9sYNL6bY",
  authDomain: "netflix-clone-b60d5.firebaseapp.com",
  projectId: "netflix-clone-b60d5",
  storageBucket: "netflix-clone-b60d5.firebasestorage.app",
  messagingSenderId: "957547175895",
  appId: "1:957547175895:web:837b2333ab15b33f6cb592"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore()


const signup  = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        await addDoc(collection(db, "user"),{
            uid : user.uid,
            name,
            authProvider : "local",
            email,
            password
        })
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}
const login = async (email, password)=>{
   try {
      await signInWithEmailAndPassword(auth, email, password)
      
   } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
   }
}
const logout = ()=>{
    signOut(auth)
}
export {auth, db, login, signup, logout}