import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home";
import Jobs from "../Pages/Jobs/Jobs";
import Test1 from "../Pages/Test1/Test1";
import BackendFilter from "../Pages/BackendFilter/BackendFilter";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/test1',
                element: <Test1></Test1>,
            },
            {
                path: '/backendFilter',
                element: <BackendFilter></BackendFilter>,
            },
            {
                path: '/jobs',
                element: <Jobs></Jobs>,
            },
        ]
    },
]);

export default router;