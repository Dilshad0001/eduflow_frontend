// src/pages/teacher/TeacherLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import TeacherNavbar from './TeacherNavbar';
import StudentFooter from '../student/StudentFooter';

const TeacherLayout = () => {
  return (
    <div>
      <TeacherNavbar />
      <div className="pt-20 px-4"> {/* Add top padding to avoid overlap with fixed navbar */}
        <Outlet />
        {/* <StudentFooter/> */}
        <StudentFooter/>
      </div>
    </div>
  );
};

export default TeacherLayout;
