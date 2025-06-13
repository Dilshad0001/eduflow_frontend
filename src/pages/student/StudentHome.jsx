
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SubjectCylinder from './SubjectCylinder';
import ChapterCylinder from './ChapterCylinder';
import AdBanners from './AdBanners';

const StudentHome = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [activeCourseIndex, setActiveCourseIndex] = useState(0); 

    const [profile, setProfile] = useState(null);
    const [upcomingAssignments, setUpcomingAssignments] = useState([]); 
    const [loadingAssignments, setLoadingAssignments] = useState(true); 
    const [assignmentError, setAssignmentError] = useState(''); 



    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/student/personal/profile/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            })
            .then((res) => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    setProfile(res.data[0]);
                } else {
                    navigate("/student/createprofile");
                }
            })
            .catch((err) => {
                console.error(err);

            });
    }, [navigate]);

    useEffect(() => {
        const fetchUpcomingAssignments = async () => {
            setLoadingAssignments(true);
            setAssignmentError('');
            const token = localStorage.getItem("access_token");

            if (!token) {
                setAssignmentError("No authorization token found. Please login.");
                setLoadingAssignments(false);
                return;
            }

            try {
                const res = await axios.get("http://localhost:8000/student/task/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const formattedAssignments = res.data.map(task => ({
                    id: task.id,
                    title: task.task_name,
                    course: task.subject_name || 'N/A', 
                    dueDate: formatDate(task.submission_deadline),
                }));
                setUpcomingAssignments(formattedAssignments);
                setAssignmentError("");
            } catch (err) {
                console.error("Fetch tasks error:", err);
                setAssignmentError("Failed to load upcoming assignments. Please check your login.");
            } finally {
                setLoadingAssignments(false);
            }
        };

        fetchUpcomingAssignments();
    }, []);


    console.log("*****=", upcomingAssignments);

    const rotateCylinder = (direction) => {
        if (courses.length === 0) return;

        let newIndex = activeCourseIndex;
        if (direction === 'next') {
            newIndex = (activeCourseIndex + 1) % courses.length;
        } else if (direction === 'prev') {
            newIndex = (activeCourseIndex - 1 + courses.length) % courses.length;
        }
        setActiveCourseIndex(newIndex);
    };

    const handleCourseClick = (subjectId) => {
        navigate(`/student/subject/${subjectId}`);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'No due date';
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = date - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Due today';
        if (diffDays === 1) return 'Due tomorrow';
        if (diffDays > 1 && diffDays <= 7) return `Due in ${diffDays} days`;
        if (diffDays < 0) return 'Overdue';

        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const isOverdue = (deadline) => {
        return new Date(deadline) < new Date();
    };

    const recentActivity = [
        { id: 1, icon: '✓', text: 'Completed Lesson 17', time: '2 hours ago' },
        { id: 2, icon: '%', text: 'Quiz Score: 95%', time: 'Yesterday' },
        { id: 3, icon: '💬', text: 'New forum reply', time: '2 days ago' }
    ];

    const [leaderboardData, setLeaderboardData] = useState([]);
    const [yourRank, setYourRank] = useState(null); 
    const [pointsToNextRank, setPointsToNextRank] = useState(null); 

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const token = localStorage.getItem("access_token");

            try {
                const response = await fetch('http://127.0.0.1:8000/student/leaderboard',{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();                                
                const processedData = data.ranks.map((student, index) => {
                    const rank = index + 1;
                    let rankClass = '';
                    let badgeClass = '';
                    let achievement = '';
                    

                    if (rank === 1) {
                        rankClass = 'rank-1';
                        badgeClass = 'gold';
                        achievement = '🏆 Champion';
                    } else if (rank === 2) {
                        rankClass = 'rank-2';
                        badgeClass = 'silver';
                        achievement = '🥈 Runner-up';
                    } else if (rank === 3) {
                        rankClass = 'rank-3';
                        badgeClass = 'bronze';
                        achievement = '🥉 Third Place';
                    }

                    const avatarInitials = student.student_name.split(' ').map(n => n[0]).join('').toUpperCase();
                    const avatarBgColor = '#' + Math.floor(student.id * 123456 % 16777215).toString(16).padStart(6, '0');


                    return {
                        id: student.id,
                        rank: rank,
                        name: student.student_name,
                        avatar: avatarInitials,
                        avatarBg: avatarBgColor,
                        details: 'N/A', 
                        points: student.mark.toLocaleString(), 
                        coursesCompleted: 'N/A', 
                        achievement: achievement,
                        rankClass: rankClass,
                        badgeClass: badgeClass
                    };
                });
                setLeaderboardData(processedData);

                const currentUserRank = 8; 
                setYourRank(currentUserRank);

                if (processedData.length > currentUserRank) {
                    const yourPoints = processedData.find(s => s.rank === currentUserRank)?.points;
                    const nextRankPoints = processedData.find(s => s.rank === currentUserRank - 1)?.points;

                    if (yourPoints && nextRankPoints) {
                        const actualYourPoints = parseFloat(yourPoints.replace(/,/g, ''));
                        const actualNextRankPoints = parseFloat(nextRankPoints.replace(/,/g, ''));
                        setPointsToNextRank(actualNextRankPoints - actualYourPoints);
                    }
                }

            } catch (error) {
                console.error("Failed to fetch leaderboard data:", error);
            }
        };

        fetchLeaderboard();
    }, []);

// console.log("ggg==",my_rank);


    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 leading-relaxed font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Welcome Section */}
                <section className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex-1">
                            <h1 className="text-3xl font-semibold mb-2 text-blue-800">Welcome back, {profile?.full_name || 'Student'}!</h1>
                            <p className="text-lg text-gray-600 mb-5">Ready to continue your learning journey?</p>
                            
                        </div>

                        

                        <div>
                        
                        </div>


                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full md:w-auto">
                            <div className="bg-gray-50 border border-gray-200 p-4 rounded-md text-center">
                                <div className="text-2xl font-bold text-blue-800">{courses.length}</div>
                                <span className="text-sm text-gray-600">Active Courses</span>
                            </div>
                            <div className="bg-gray-50 border border-gray-200 p-4 rounded-md text-center">
                                <div className="text-2xl font-bold text-blue-800">78%</div> 
                                <span className="text-sm text-gray-600">Avg Progress</span>
                            </div>
                            <div className="bg-gray-50 border border-gray-200 p-4 rounded-md text-center">
                                <div className="text-2xl font-bold text-blue-800">42</div>
                                <span className="text-sm text-gray-600">Hours Learned</span>
                            </div>
                        </div>
                    </div>
                        <div className='py-10'>
                        <AdBanners/>
                        </div>
                </section>



                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 ">
                    <div className="lg:col-span-2 border-none bg-white border border-gray-200 rounded-xl p-6 shadow-sm relative overflow-hidden ">

                        

                        <SubjectCylinder/>





                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 flex flex-col gap-8">
                        {/* Upcoming Assignments */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-800">Upcoming Assignments</h3>
                            </div>
                            <div>
                                {loadingAssignments ? (
                                    <p className="text-gray-600 text-sm text-center">Loading assignments...</p>
                                ) : assignmentError ? (
                                    <p className="text-red-500 text-sm text-center">{assignmentError}</p>
                                ) : upcomingAssignments.length > 0 ? (
                                    upcomingAssignments.map(assignment => (
                                        <div
                                            key={assignment.id}
                                            className={`bg-gray-50 border p-4 rounded-md border-l-4 mb-3 last:mb-0 ${assignment.isOverdue ? 'border-red-600' : 'border-blue-600'}`}
                                            onClick={() => navigate(`/student/tasks/submit/${assignment.id}`)} // Navigate to task submission on click
                                            style={{cursor: 'pointer'}}
                                        >
                                            <div className="font-semibold text-sm text-gray-800 mb-1">{assignment.title}</div>
                                            <div className={'text-xs font-medium '}> Due: {assignment.dueDate}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-600 text-sm text-center">No upcoming assignments.</p>
                                )}
                            </div>
                        </div>

                        {/* Mini Calendar */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-800">December 2025</h3>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-xs">
                                <div className="font-semibold text-gray-600 text-center">S</div>
                                <div className="font-semibold text-gray-600 text-center">M</div>
                                <div className="font-semibold text-gray-600 text-center">T</div>
                                <div className="font-semibold text-gray-600 text-center">W</div>
                                <div className="font-semibold text-gray-600 text-center">T</div>
                                <div className="font-semibold text-gray-600 text-center">F</div>
                                <div className="font-semibold text-gray-600 text-center">S</div>
                                {/* Dummy days for calendar - adjust as needed */}
                                <div className="p-2 rounded-md text-center cursor-pointer">1</div>
                                <div className="p-2 rounded-md text-center cursor-pointer">2</div>
                                <div className="p-2 rounded-md text-center cursor-pointer">3</div>
                                <div className="p-2 rounded-md text-center bg-blue-800 text-white font-semibold rounded-full">4</div>
                                <div className="p-2 rounded-md text-center cursor-pointer">5</div>
                                <div className="p-2 rounded-md text-center cursor-pointer">6</div>
                                <div className="p-2 rounded-md text-center bg-yellow-100 border border-yellow-200 cursor-pointer">7</div>
                                <div className="p-2 rounded-md text-center cursor-pointer">8</div>
                                <div className="p-2 rounded-md text-center cursor-pointer">9</div>
                                <div className="p-2 rounded-md text-center cursor-pointer">10</div>
                                <div className="p-2 rounded-md text-center cursor-pointer">11</div>
                                <div className="p-2 rounded-md text-center cursor-pointer">12</div>
                                <div className="p-2 rounded-md text-center cursor-pointer">13</div>
                                <div className="p-2 rounded-md text-center cursor-pointer">14</div>
                                <div className="p-2 rounded-md text-center bg-yellow-100 border border-yellow-200 cursor-pointer">15</div>
                                <div className="p-2 rounded-md text-center cursor-pointer">16</div>
                                <div className="p-2 rounded-md text-center cursor-pointer">17</div>
                                <div className="p-2 rounded-md text-center cursor-pointer">18</div>
                                <div className="p-2 rounded-md text-center cursor-pointer">19</div>
                                <div className="p-2 rounded-md text-center bg-yellow-100 border border-yellow-200 cursor-pointer">20</div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-800">Recent Activity</h3>
                            </div>
                            <div>
                                {recentActivity.map(activity => (
                                    <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-md mb-2 last:mb-0">
                                        <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-white text-sm font-semibold">{activity.icon}</div>
                                        <div className="flex-1">
                                            <div className="text-sm text-gray-800 mb-0.5">{activity.text}</div>
                                            <div className="text-xs text-gray-600">{activity.time}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Leaderboard Section */}




<div className="mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">Top Performers This Month</h2>
                    <button onClick={() => navigate('/student/leaderboard')} className="bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-900 transition">View All Rankings</button>
                </div>
                <div className="grid gap-4">
                    {leaderboardData.length > 0 ? (
                        leaderboardData.map(student => (
                            <div key={student.id} className={`flex flex-col sm:flex-row items-center gap-4 p-5 rounded-lg border border-gray-200 shadow-sm transition hover:shadow-md ${student.rankClass === 'rank-1' ? 'border-l-4 border-yellow-500 bg-yellow-50/50' : student.rankClass === 'rank-2' ? 'border-l-4 border-gray-400 bg-gray-50' : student.rankClass === 'rank-3' ? 'border-l-4 border-orange-500 bg-orange-50/50' : 'bg-gray-50'}`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${student.badgeClass === 'gold' ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900 shadow-lg shadow-yellow-200' : student.badgeClass === 'silver' ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-gray-700 shadow-lg shadow-gray-200' : student.badgeClass === 'bronze' ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-orange-900 shadow-lg shadow-orange-200' : ''}`}>
                                    {student.rank}
                                </div>
                                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg" style={{ backgroundColor: student.avatarBg }}>
                                    {student.avatar}
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <div className="text-base font-semibold text-gray-800 mb-1">{student.name}</div>
                                    <div className="text-sm text-gray-600">{student.details}</div>
                                </div>
                                <div className="flex gap-6 sm:gap-8 justify-center">
                                    <div className="text-center">
                                        <span className="block text-lg font-bold text-blue-800">{student.points}</span>
                                        <span className="text-xs text-gray-600">Points</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="block text-lg font-bold text-blue-800">{student.coursesCompleted}</span>
                                        <span className="text-xs text-gray-600">Courses</span>
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-blue-50 border border-blue-200 text-blue-800 rounded-full text-xs font-semibold whitespace-nowrap">
                                    {student.achievement}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 py-8">No leaderboard data available.</div>
                    )}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 border border-gray-200 rounded-md p-4">
                        <span className="text-sm text-gray-800 mb-2 sm:mb-0">
                            Your Current Rank: <strong>#{yourRank !== null ? yourRank : 'N/A'}</strong>
                        </span>
                        <span className="text-sm text-gray-600">
                            {pointsToNextRank !== null ? `${pointsToNextRank} points to reach #${yourRank - 1}` : ''}
                        </span>
                    </div>
                </div>
            </div>
        </div>                

                <div className="grid grid-cols-1 sm:grid-2 md:grid-cols-4 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
                        <div className="w-12 h-12 mx-auto mb-4 bg-blue-800 rounded-full flex items-center justify-center text-white text-xl font-semibold">🏆</div>
                        <div className="text-2xl font-bold text-gray-800 mb-1">12</div>
                        <div className="text-sm text-gray-600">Certificates Earned</div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
                        <div className="w-12 h-12 mx-auto mb-4 bg-blue-800 rounded-full flex items-center justify-center text-white text-xl font-semibold">⚡</div>
                        <div className="text-2xl font-bold text-gray-800 mb-1">7</div>
                        <div className="text-sm text-gray-600">Learning Streak</div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
                        <div className="w-12 h-12 mx-auto mb-4 bg-blue-800 rounded-full flex items-center justify-center text-white text-xl font-semibold">👥</div>
                        <div className="text-2xl font-bold text-gray-800 mb-1">156</div>
                        <div className="text-sm text-gray-600">Study Group Points</div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
                        <div className="w-12 h-12 mx-auto mb-4 bg-blue-800 rounded-full flex items-center justify-center text-white text-xl font-semibold">📈</div>
                        <div className="text-2xl font-bold text-gray-800 mb-1">4.8</div>
                        <div className="text-sm text-gray-600">Average Grade</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentHome;



