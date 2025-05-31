// // src/pages/login.jsx
// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const res = await axios.post('http://localhost:8000/account/login/', form);
//       localStorage.setItem('access_token', res.data.access_token);
//       localStorage.setItem('refresh_token', res.data.refresh_token);
      
//       navigate('/'); 

//     } catch (err) {
//       const message =
//         typeof err.response?.data === 'string'
//           ? err.response.data
//           : 'Login failed';
//       setError(message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
//       >
//         <h2 className="text-2xl font-bold mb-4">Login</h2>

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded"
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded"
//           required
//         />

//         {error && <p className="text-red-500">{error}</p>}

//         <button
//           type="submit"
//           className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;



















import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:8000/account/login/', form);

      // Save tokens
      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('refresh_token', res.data.refresh_token);

      // Assuming backend response includes user role like 'ADMIN', 'TEACHER', or 'STUDENT'
      const userRole = res.data.role;
      console.log(res.data);
      

      if (res.data.admin===true) {
        navigate('/admin/dashboard');
      } else if (userRole ===1) {
        navigate('/teacher/dashboard');
      } else if (userRole ===2) {
        navigate('/student/dashboard');
      } else {
        navigate('/student/dashboard'); // fallback
      }

    } catch (err) {
      const message =
        typeof err.response?.data === 'string'
          ? err.response.data
          : 'Login failed';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-100 via-white to-violet-50">
      <div className="relative w-full max-w-md px-6 py-8 backdrop-blur-lg bg-white/80 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-violet-300/30 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-violet-400/20 rounded-full filter blur-3xl"></div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-violet-900 mb-2">Welcome back</h1>
            <p className="text-violet-600/90">Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-violet-800/90">Email</label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-violet-200/80 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 placeholder-violet-400/60"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-violet-800/90">Password</label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-violet-200/80 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 placeholder-violet-400/60"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50/80 border border-red-200 text-red-600 p-3 rounded-xl text-sm backdrop-blur-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600 shadow-lg hover:shadow-violet-300/50 transition-all duration-300 ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>

            <p className="text-center text-sm text-violet-500/80">
              Don't have an account?{' '}
              <a href="/register" className="font-medium text-violet-700 hover:underline hover:text-violet-800">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
