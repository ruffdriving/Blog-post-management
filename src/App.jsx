import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AuthGuard from "./auth/AuthGuard";
import CreatePost from "./component/CreatePost.jsx";

// Default redirect
const DefaultRoute = () => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  return loginData ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <DefaultRoute />,
    },

    {
      path: "/login",
      element: (
        <AuthGuard required={false}>
          <Login />
        </AuthGuard>
      ),
    },

    {
      path: "/register",
      element: (
        <AuthGuard required={false}>
          <Register />
        </AuthGuard>
      ),
    },

    {
      path: "/dashboard",
      element: (
        <AuthGuard required={true}>
          <Dashboard />
        </AuthGuard>
      ),
    },
    {
  path: "/createpost",
  element: (
    <AuthGuard required={true}>
      <CreatePost />
    </AuthGuard>
  ),
},
{
  path:"/edit-post/:id",
  element:(
    <AuthGuard required={true}>
    <CreatePost />
    </AuthGuard>
  )
},


    {
      path: "*",
      element: (
        <div style={{ textAlign: "center", padding: "100px" }}>
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
        </div>
      ),
    },
  ]);

  return <RouterProvider router={route} />;
}

export default App;
