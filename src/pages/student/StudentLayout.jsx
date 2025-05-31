import React from "react";
// import StudentNavbar from "./StudentNavbar";
import { Outlet } from "react-router-dom";
import StudentNavbar from "./StudentNavbar";

const StudentLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <StudentNavbar />
      <div className="p-4">
        <Outlet /> {/* This renders the child route component */}
      </div>
    </div>
  );
};

export default StudentLayout;
