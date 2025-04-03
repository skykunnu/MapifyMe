import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Dashboard from "./pages/Dashboard"



const router=createBrowserRouter([
{
  path:"/",
  element:<Home />,
  children:[
    {
      index:true,
      element:<Dashboard/>
    },
    {
      path:"/profile",
      element:<Profile />
    }
  ]
}
])



function App() {
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App