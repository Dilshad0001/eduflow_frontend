import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CourseList from './pages/CourseList';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import StudentProfileForm from './pages/student/StudentProfileForm';
import StudentHome from './pages/student/StudentHome';
import StudentLessons from './pages/student/StudentLessons';
import StudentSubmissionView from './pages/student/StudentSubmissionView';
// import StudentPendingTaks from './pages/student/StudentPendingTAsks';
import StudentPendingTaks from './pages/student/StudentPendingTaks';

import StudentSubmitAssignment from './pages/student/StudentSubmitAssignment';
import StudentProfile from './pages/student/StudentProfile';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherProfile from './pages/teacher/TeacherProfile';
import LessonList from './pages/teacher/LessonList';
import AddLesson from './pages/teacher/AddLesson';
import TaskList from './pages/teacher/TaskList';
import CreateTask from './pages/teacher/CreateTask';
import SubmissionTeacherView from './pages/teacher/SubmissionTeacherView';
import SubmissionsTeacher from './pages/teacher/SubmissionsTeacher';
import './styles.css'
import UsersAdminView from './pages/admin/UsersAdminView';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentsList from './pages/admin/StudentsList';
import TeachersList from './pages/admin/TeachersList';
import AdminCourseList from './pages/admin/AdminCourseList';
import CourseDetail from './pages/admin/CourseDetail';
import SubjectList from './pages/admin/SubjectList';
import SubjectDetail from './pages/admin/SubjectDetail';
import ChapterDetail from './pages/admin/ChapterDetail';
import LessonDetail from './pages/admin/LessonDetail';
import StudentSubjectList from './pages/student/StudentSubjectList';
import StudentSubjectDetail from './pages/student/StudentSubjectDetail';
import StudentChapterDetail from './pages/student/StudentChapterDetail';
import StudentLessonDetail from './pages/student/StudentLessonDetail';
import TeacherCourseList from './pages/teacher/TeacherCourseList';
import TeacherCourseDetail from './pages/teacher/TeacherCourseDetail';
import TeacherSubjectDetail from './pages/teacher/TeacherSubjectDetail';
import TeacherChapterDetail from './pages/teacher/TeacherChapterDetail';
import TeacherLessonDetail from './pages/teacher/TeacherLessonDetail';
import TeacherAddLesson from './pages/teacher/TeacherAddLesson';
import SubmissionDetail from './pages/teacher/SubmissionDetail';
import CraeteStudentProfileForm from './pages/student/CreateStudentProfileForm';
import StudentNavbar from './pages/student/StudentNavbar';
import StudentLayout from './pages/student/StudentLayout';
import TeacherLayout from './pages/teacher/TeacherLayout';
import AdminLayout from './pages/admin/AdminLayout';
import AdminCreateCourse from './pages/admin/AdminCreateCourse';
import AdminCreateSubject from './pages/admin/AdminCreateSubject';
import AdminCreateChapter from './pages/admin/AdminCreateChapter';
import AdminCreateLesson from './pages/admin/AdminCreateLesson';
import SubjectCylinder from './pages/student/SubjectCylinder';
import ChapterCylinder from './pages/student/ChapterCylinder';
import LessonCylinder from './pages/student/LessonCylinder';
import StudentFooter from './pages/student/StudentFooter';
import AdBanners from './pages/student/AdBanners';

function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/student" element={<StudentLayout />}>
        <Route path="homepage" element={<StudentProfileForm />} />
        <Route path="dashboard" element={<StudentHome />} />
        <Route path="lessons" element={<StudentLessons />} />
        <Route path="tasks/pending" element={<StudentPendingTaks />} />
        <Route path="tasks/completed" element={<StudentSubmissionView />} />
        <Route path="tasks/submit/:taskId" element={<StudentSubmitAssignment />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="profile/update" element={<StudentProfile />} />
        <Route path="subjects" element={<StudentSubjectList />} />
        <Route path="subject/:subjectId" element={<StudentSubjectDetail />} />
        <Route path="chapter/:chapterid" element={<StudentChapterDetail />} />
        <Route path="lesson/:lessonId" element={<StudentLessonDetail />} />
        <Route path="createprofile" element={<CraeteStudentProfileForm />} />
       </Route>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/courses" element={<CourseList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />



      <Route path="/teacher" element={<TeacherLayout />}>
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="profile" element={<TeacherProfile />} />
        <Route path="courses" element={<TeacherCourseList />} />
        <Route path="course/:courseId" element={<TeacherCourseDetail />} />
        <Route path="subject/:subjectId" element={<TeacherSubjectDetail />} />
        <Route path="chapter/:chapterId" element={<TeacherChapterDetail />} />
        <Route path="lesson/:lessonId" element={<TeacherLessonDetail />} />
        <Route path="lesson/upload" element={<LessonList />} />
        <Route path="lesson/add" element={<AddLesson />} />
        <Route path="newlesson/add" element={<TeacherAddLesson />} />
        <Route path="task/upload" element={<TaskList />} />
        <Route path="task/add" element={<CreateTask />} />
        <Route path="task/submitted" element={<SubmissionTeacherView />} />
        <Route path="submission/:id" element={<SubmissionDetail />} />
      </Route>


      <Route path='/admin' element={<AdminLayout/>}>
         <Route path="users" element={<UsersAdminView/>} />
         <Route path="dashboard" element={<AdminDashboard/>} />
         <Route path="students" element={<StudentsList/>} />
         <Route path="teachers" element={<TeachersList/>} />
         <Route path="courses" element={<AdminCourseList/>} />
         <Route path="course/:id" element={<CourseDetail/>} />
         <Route path="subject/:id" element={<SubjectDetail />} />
         <Route path="chapter/:id" element={<ChapterDetail />} />
         <Route path="lesson/:id" element={<LessonDetail />} /> 
         <Route path="create-course/" element={<AdminCreateCourse />} />
         <Route path="create-subject/:courseId" element={<AdminCreateSubject />} />
         <Route path="add-chapter/:subjectId" element={<AdminCreateChapter />} />
         <Route path="add-lesson/:chapterId" element={<AdminCreateLesson />} />
      </Route>

        <Route path="/student/homepage" element={<StudentProfileForm />} />
        <Route path="/student/dashboard" element={<StudentHome/>} />
        <Route path="/student/lessons" element={<StudentLessons/>} />
        <Route path="/student/tasks/pending" element={<StudentPendingTaks/>} />
        <Route path="/student/tasks/completed" element={<StudentSubmissionView/>} />
        <Route path="/student/tasks/submit/:taskId" element={<StudentSubmitAssignment/>} />
        <Route path="/student/profile" element={<StudentProfile/>} />
        <Route path="/student/profile/update" element={<StudentProfile/>} />
        {/* <Route path="/teacher/dashboard" element={<TeacherDashboard/>} /> */}
        <Route path="/teacher/profile" element={<TeacherProfile/>} />
        <Route path="/teacher/lesson/upload" element={<LessonList/>} />
        <Route path="/teacher/lesson/add" element={<AddLesson/>} />
        <Route path="/teacher/task/upload" element={<TaskList/>} />
        <Route path="/teacher/task/add" element={<CreateTask/>} />
        <Route path="/teacher/task/submitted" element={<SubmissionTeacherView/>} />
        <Route path="/sub" element={<SubmissionsTeacher/>} />
        


        
        
        
        
        
        {/* <Route path="/course/:id/subjects/" element={<SubjectList />} /> */}

        {/* <Route path="/student/subjects" element={<StudentSubjectList />} />  */}
        <Route path="/student/subject/:id" element={<StudentSubjectDetail />} />
        <Route path="/student/chapter/:chapterid" element={<StudentChapterDetail />} />
        <Route path="/student/lesson/:lessonId" element={<StudentLessonDetail />} />
        <Route path="/student/createprofile" element={<CraeteStudentProfileForm />} />



        <Route path="/teacher/courses" element={<TeacherCourseList />} />
        <Route path="/teacher/course/:courseId" element={<TeacherCourseDetail />} />
        <Route path="/teacher/subject/:subjectId" element={<TeacherSubjectDetail />} />
        <Route path="/teacher/chapter/:chapterId" element={<TeacherChapterDetail />} />
        <Route path="/teacher/lesson/:lessonId" element={<TeacherLessonDetail />} />
        <Route path="/teacher/newlesson/add" element={<TeacherAddLesson />} />
        <Route path="/teacher/submission/:id" element={<SubmissionDetail />} />


        <Route path="/c" element={<StudentFooter />} />
        <Route path="/s" element={<SubjectCylinder />} />
        <Route path="/l" element={<AdBanners />} />
        

        

      </Routes>
    </BrowserRouter>

  );
}

export default App;
