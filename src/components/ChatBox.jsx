import { useEffect, useState, useRef } from "react";
import Message from "../components/Message"
import { collection, query, limit, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../firebase"



const ChatBox = () => {
  const messageEndRef = useRef()
  const [messages, setMessages] = useState([]);

  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(scrollToBottom, [messages])
  useEffect(() => {
    const q = query(collection(db, "messages"),
      orderBy('createdAt'),
      limit(100));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages)
    });

    return () => unsubscribe
  }, [])

  return (
    <div className="pb-44 pt-20 containerWrap">
      {messages.map(message => (
        <Message key={message.id} message={message} />
      ))}
      <div ref={messageEndRef}></div>
    </div>
  )
}

export default ChatBox