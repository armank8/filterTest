import { Outlet } from "react-router-dom"
import Footer from "../Shared/Footer/Footer"
import Navbar from "../Shared/Navbar/Navbar"

const Main = () => {
  return (
    <div>
        <Navbar></Navbar>
        <div className="h-[100vh] max-w-7xl mx-auto">
            <Outlet></Outlet>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default Main