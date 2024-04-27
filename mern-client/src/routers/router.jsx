import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  import App from "../App";
  import Home from "../home/Home";
  import Shop from "../shop/Shop";
  import About from "../components/About";
  import SingleBook from "../shop/SingleBook";
  import DashboardLayout from "../dashboard/DashboardLayout";
  import Dashboard from "../dashboard/Dashboard";
  import UploadBook from "../dashboard/UploadBook";
  import ManageBooks from "../dashboard/ManageBooks";
  import EditBooks from "../dashboard/EditBooks";
  import EditCards from "../dashboard/EditCards";
  import ManageCards from "../dashboard/ManageCards";
  import UploadCard from "../dashboard/UploadCard";
  import Login from "../components/Login";
  import Signup from "../components/Signup";
  import Orders from "../dashboard/Orders";
  import Cart from "../components/Cart";
  import SingularBook from "../components/SingularBook";
  import Search from "../components/Search";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: "/shop",
            element: <Shop/>
        },
        {
            path: "/about",
            element: <About/>
        },
        {
          path: "/cart",
          element: <Cart/>
        },
        {
            path:"/book/:id",
            element: <SingleBook/>,
            loader: ({params}) => fetch(`http://localhost:3000/book/${params.id}`)
        },
        {
          path: "/book-search",
          element: <Search/>,
          loader: ({request}) => {
            const query = new URL(request.url).searchParams.get("searchTerm")
            return fetch(`http://localhost:3000/book-search?search=${query}`)
          }
        }
      ]
    },
    {
      path: "/shop/:id",
      element: <SingularBook/>,
      loader: ({params}) => fetch(`http://localhost:3000/book/${params.id}`)
    },
    {
      path: "/admin/dashboard",
      element: <DashboardLayout/>,
      children: [
        {
          path: "/admin/dashboard",
          element: <Dashboard/>,
          loader: async () => {
            const id = localStorage.getItem('userID');
            return fetch(`http://localhost:3000/admin/${id}`);
          }
        },
        {
          path: "/admin/dashboard/upload-book",
          element: <UploadBook/>
        }, 
        {
          path: "/admin/dashboard/manage-books",
          element: <ManageBooks/>
        },
        {
          path: "/admin/dashboard/manage-cards",
          element: <ManageCards/>
        },
        {
          path: "/admin/dashboard/upload-card",
          element: <UploadCard/>
        },
        {
          path: "/admin/dashboard/view-past-orders",
          element: <Orders/>,
        },
        {
          path: "/admin/dashboard/edit/:id",
          element: <EditBooks/>,
          loader: ({params}) => fetch(`http://localhost:3000/book/${params.id}`)
        },
        {
          path: "/admin/dashboard/card/:id",
          element: <EditCards/>,
          loader: ({params}) => fetch(`http://localhost:3000/card/${params.id}`)
        }
      ]
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path:"/register",
      element: <Signup/>
    }
  ]);
  
  export default router;