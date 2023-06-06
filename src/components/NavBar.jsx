import { UserAuth } from "../context/AuthContext"

const NavBar = () => {
  const { currentUser, logout } = UserAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <div className="navbar fixed z-10 bg-primary text-primary-content">
      <div className="containerWrap flex justify-between">
        <a className="btn btn-ghost normal-case text-xl">InstaChat</a>
        {currentUser ? <button className="btn text-white" onClick={handleLogout}>Logout</button> : ""}
      </div>
    </div>
  )
}

export default NavBar