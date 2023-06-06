import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext"

const Login = () => {
  const navigate = useNavigate()
  const { currentUser, signInWithGoogle, spinner } = UserAuth();
  // const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    try {
      await signInWithGoogle()
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (currentUser) {
      navigate('/chat')
    }
  }, [currentUser]);

  return (
    <div>
      {spinner ?
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <span className="loading loading-ring loading-lg"></span>
            </div>
          </div>
        </div>
        :
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Hello there</h1>
              <p className="py-6">Join the conversation, meet new people, and make connections in one shared room.</p>
              <button onClick={handleLogin} className="btn btn-primary">Login with Google</button>
            </div>
          </div>
        </div>}
    </div>
  )
}

export default Login