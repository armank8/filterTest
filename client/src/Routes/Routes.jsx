import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home";
import Jobs from "../Pages/Jobs/Jobs";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children:[
            {
                path:'/',
                element: <Home></Home>,
            },
            {
                path:'/jobs',
                element: <Jobs></Jobs>,
            }
        ]
    },
]);

export default router;