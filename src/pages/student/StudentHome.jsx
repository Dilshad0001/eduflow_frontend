import { useNavigate } from 'react-router-dom';

const StudentHome = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      title: 'Subjects',
      description: 'View all your enrolled subjects.',
      bgColor: 'bg-blue-100',
      route: '/student/subjects',
    },
    {
      title: 'Pending Tasks',
      description: 'Check your pending assignments or tasks.',
      bgColor: 'bg-yellow-100',
      route: '/student/tasks/pending',
    },
    {
      title: 'Completed Tasks',
      description: 'Review the tasks you have completed.',
      bgColor: 'bg-green-100',
      route: '/student/tasks/completed',
    },
    {
      title: 'Profile',
      description: 'View and edit your student profile.',
      bgColor: 'bg-purple-100',
      route: '/student/profile',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {cardData.map((card) => (
          <div
            key={card.title}
            onClick={() => navigate(card.route)}
            className={`cursor-pointer p-6 rounded-xl shadow-md hover:shadow-xl transition ${card.bgColor}`}
          >
            <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
            <p className="text-gray-700">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentHome;
