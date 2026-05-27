import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import AddProperty from "./pages/AddProperty";
import EditProperty from "./pages/EditProperty";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* AUTH */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* PROPERTIES */}

        <Route
          path="/properties"
          element={<Properties />}
        />

        <Route
          path="/property/:id"
          element={<PropertyDetails />}
        />

        {/* EDIT PROPERTY */}

        <Route
          path="/edit-property/:id"
          element={
            <AdminRoute>
              <EditProperty />
            </AdminRoute>
          }
        />

        {/* ABOUT */}

        <Route
          path="/about"
          element={<About />}
        />

        {/* CONTACT */}

        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* PROFILE */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ADD PROPERTY */}

        <Route
          path="/add-property"
          element={
            <AdminRoute>
              <AddProperty />
            </AdminRoute>
          }
        />

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;