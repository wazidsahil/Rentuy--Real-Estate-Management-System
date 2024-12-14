import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home/Home";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Listing from "./Pages/Listing/Listing";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import Footer from "./Components/Footer";
import { Toaster } from "react-hot-toast";
import PropertyDetails from "./Pages/Home/PropertyDetails";
import NotFound from "./Components/NotFound";
import MyListings from "./Pages/Dashboard/MyListings";
import MyApplication from "./Pages/Dashboard/MyApplication";
import ListingDetails from "./Pages/Dashboard/ListingDetails";
import RequireAuth from "./Components/RequireAuth";
import ManageProperty from "./Pages/Dashboard/ManageProperty";
import Profile from "./Pages/Dashboard/Profile";
import IncomingTransaction from "./Pages/Dashboard/IncomingTransaction";
import ManageUser from "./Pages/Dashboard/ManageUser";
import OutgoingTransaction from "./Pages/Dashboard/OutgoingTransaction";

const App: FC = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="pt-36 lg:px-16 md:px-8 px-4 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/property/:id"
            element={
              <RequireAuth>
                <PropertyDetails />
              </RequireAuth>
            }
          />
          <Route
            path="/sale"
            element={
              <RequireAuth>
                <Listing />
              </RequireAuth>
            }
          />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route
              index
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route
              path="my-application"
              element={
                <RequireAuth>
                  <MyApplication />
                </RequireAuth>
              }
            />
            <Route
              path="my-listing"
              element={
                <RequireAuth>
                  <MyListings />
                </RequireAuth>
              }
            />
            <Route
              path="incoming-transactions"
              element={
                <RequireAuth>
                  <IncomingTransaction />
                </RequireAuth>
              }
            />
            <Route
              path="outgoing-transactions"
              element={
                <RequireAuth>
                  <OutgoingTransaction />
                </RequireAuth>
              }
            />
            <Route
              path="my-listing/:id"
              element={
                <RequireAuth>
                  <ListingDetails />
                </RequireAuth>
              }
            />
            <Route
              path="manage-property"
              element={
                <RequireAuth>
                  <ManageProperty />
                </RequireAuth>
              }
            />
            <Route
              path="manage-user"
              element={
                <RequireAuth>
                  <ManageUser />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
