import { useState } from "react"
import { UserAuth } from "../context/AuthContext"
import { db } from "../firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

const SendMessage = () => {
  const [message, setMessage] = useState('')
  const { currentUser } = UserAuth();
  const handleSendMessage = async (e) => {
    e.preventDefault()

    if (message.trim() === '') {
      return;
    }
    try {
      const { uid, displayName, photoURL } = currentUser;
      await addDoc(collection(db, "messages"), {
        text: message,
        name: displayName,
        avatar: photoURL,
        uid: uid,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.error(err)
    }

    setMessage('')
  }
  return (
    <div className="bg-gray-200 fixed bottom-0 w-full py-10">
      <form onSubmit={handleSendMessage} className="px-2 containerWrap flex">
        <input value={message} onChange={e => setMessage(e.target.value)} className="input text-black w-full focus:outline-none bg-gray-100 rounded-r-none" type="text" />
        <button type="submit" className="w-auto btn-primary text-white rounded-r-lg px-5">Send</button>
      </form>
    </div>
  )
}

export default SendMessage