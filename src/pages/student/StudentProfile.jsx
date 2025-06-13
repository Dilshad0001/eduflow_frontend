import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Shield,
  Sliders,
  Users,
  MapPin,
  BookOpen,
  Wallet,
  ShoppingCart,
  Edit,
  AlertCircle,
  Loader2,
  ChevronDown,
} from 'lucide-react';

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('personalDetails');
  const navigate = useNavigate();

  // REMOVE API_BASE_URL constant, it's not needed for profile_picture now

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Keep the axios call to the backend for data fetch
        const res = await axios.get('http://127.0.0.1:8000/student/profile/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        if (res.data) {
          setProfile(res.data);
          console.log("profile==", res.data);

        } else {
          setError('Profile not found. Please create your profile.');
          navigate("/student/createprofile");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError('Failed to load profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleUpdateClick = () => {
    navigate('/student/profile/update');
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 max-w-sm w-full text-center">
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Profile...</h3>
          <p className="text-gray-600">Getting your details ready.</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 max-w-sm w-full text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-red-700 mb-2">Error</h3>
          <p className="text-gray-600">{error}</p>
          {error.includes("create your profile") && (
            <button
              onClick={() => navigate("/student/createprofile")}
              className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
              Create Profile
            </button>
          )}
        </div>
      </div>
    );
  }

  const SidebarItem = ({ icon: Icon, label, sectionName }) => (
    <li
      className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors duration-200 ${
        activeSection === sectionName
          ? 'bg-blue-50 text-blue-700 font-semibold'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
      }`}
      onClick={() => setActiveSection(sectionName)}
    >
      <Icon className="w-5 h-5 mr-3" />
      <span>{label}</span>
      {sectionName === 'academicDetails' && (
        <ChevronDown className="ml-auto w-4 h-4 text-gray-400" />
      )}
    </li>
  );

  // Personal Details Component
  const PersonalDetails = () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.personal_detail?.full_name || 'N/A'}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Date of Birth</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.personal_detail?.date_of_birth || 'N/A'}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Gender</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.personal_detail?.gender === 'M' ? 'Male' :
              profile.personal_detail?.gender === 'F' ? 'Female' : 'Other'}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Mobile Number</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.personal_detail?.mobile_number || 'N/A'}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Alternate Number</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.personal_detail?.alternate_number || 'N/A'}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Nationality</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.personal_detail?.nationality || 'N/A'}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Blood Group</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.personal_detail?.blood_group || 'N/A'}
          </div>
        </div>

      </div>
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button
          onClick={handleUpdateClick}
          className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg shadow-md hover:bg-orange-600 transition-colors"
        >
          Update Personal Details
        </button>
      </div>
    </div>
  );

  // Preferences Component
  const Preferences = () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Preferences</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Language</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.preference?.language || 'N/A'}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Theme</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.preference?.theme || 'N/A'}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Learning Mode</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.preference?.learning_mode || 'N/A'}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Timezone</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.preference?.timezone || 'N/A'}
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-700 text-sm font-medium mb-2">Notifications</label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={profile.preference?.notifications_email || false}
                readOnly
                className="mr-2"
              />
              <span>Email Notifications</span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={profile.preference?.notifications_sms || false}
                readOnly
                className="mr-2"
              />
              <span>SMS Notifications</span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={profile.preference?.course_reminders || false}
                readOnly
                className="mr-2"
              />
              <span>Course Reminders</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button
          onClick={handleUpdateClick}
          className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg shadow-md hover:bg-orange-600 transition-colors"
        >
          Update Preferences
        </button>
      </div>
    </div>
  );

  // Guardian Details Component
  const GuardianDetails = () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Guardian Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.guardian_detail?.full_name || 'N/A'}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Relationship</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.guardian_detail?.relationship || 'N/A'}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Contact Number</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.guardian_detail?.contact_number || 'N/A'}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.guardian_detail?.email || 'N/A'}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Occupation</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.guardian_detail?.occupation || 'N/A'}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Emergency Contact</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.guardian_detail?.emergency_contact || 'N/A'}
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-700 text-sm font-medium mb-2">Address</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.guardian_detail?.address || 'N/A'}
          </div>
        </div>
      </div>
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button
          onClick={handleUpdateClick}
          className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg shadow-md hover:bg-orange-600 transition-colors"
        >
          Update Guardian Details
        </button>
      </div>
    </div>
  );

  // Address Details Component
  const AddressDetails = () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Address Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
        <div className="md:col-span-2">
          <label className="block text-gray-700 text-sm font-medium mb-2">Current Address</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.address_detail?.current_address || 'N/A'}
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-700 text-sm font-medium mb-2">Permanent Address</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.address_detail?.permanent_address || 'N/A'}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">City</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.address_detail?.city || 'N/A'}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">State</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.address_detail?.state || 'N/A'}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Country</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.address_detail?.country || 'N/A'}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Postal Code</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.address_detail?.postal_code || 'N/A'}
          </div>
        </div>
      </div>
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button
          onClick={handleUpdateClick}
          className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg shadow-md hover:bg-orange-600 transition-colors"
        >
          Update Address Details
        </button>
      </div>
    </div>
  );

  // Academic Details Component
  const AcademicDetails = () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Academic Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Institution</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.academic_detail?.institution || 'N/A'}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Education Level</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.academic_detail?.education_level || 'N/A'}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Course/Stream</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.academic_detail?.course_stream || 'N/A'}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Roll Number</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.academic_detail?.roll_number || 'N/A'}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Year of Study</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.academic_detail?.year_of_study || 'N/A'}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Enrollment Status</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            {profile.academic_detail?.enrollment_status || 'N/A'}
          </div>
        </div>
        {profile.academic_detail?.document_upload && (
          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-medium mb-2">Document</label>
            <a
              href={profile.academic_detail.document_upload} // Changed line
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View Uploaded Document
            </a>
          </div>
        )}
      </div>
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button
          onClick={handleUpdateClick}
          className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg shadow-md hover:bg-orange-600 transition-colors"
        >
          Update Academic Details
        </button>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-4 sm:p-6">


      {/* Main Content Area (Sidebar + Forms) */}
      <div className="flex flex-1 gap-6 max-w-7xl mx-auto w-full">
        {/* Left Sidebar Navigation */}
        <div className="w-72 bg-white rounded-xl shadow-md p-6 flex-shrink-0 h-fit">
          <ul className="space-y-2">
            <SidebarItem icon={User} label="Personal Details" sectionName="personalDetails" />
            <SidebarItem icon={Shield} label="Sign-in & Security" sectionName="signInSecurity" />
            <SidebarItem icon={Sliders} label="My Preferences" sectionName="myPreferences" />
            <SidebarItem icon={Users} label="Guardian Details" sectionName="guardianDetails" />
            <SidebarItem icon={MapPin} label="Address Details" sectionName="addressDetails" />
            <SidebarItem icon={BookOpen} label="Academic Details" sectionName="academicDetails" />
            <SidebarItem icon={Wallet} label="My Wallet" sectionName="myWallet" />
            <SidebarItem icon={ShoppingCart} label="My Purchases" sectionName="myPurchases" />
          </ul>
        </div>

        {/* Right Content Area (Forms/Details) */}
        <div className="flex-1 bg-white rounded-xl shadow-md relative overflow-hidden">
          {activeSection === 'personalDetails' && <PersonalDetails />}
          {activeSection === 'myPreferences' && <Preferences />}
          {activeSection === 'guardianDetails' && <GuardianDetails />}
          {activeSection === 'addressDetails' && <AddressDetails />}
          {activeSection === 'academicDetails' && <AcademicDetails />}
          {!['personalDetails', 'myPreferences', 'guardianDetails', 'addressDetails', 'academicDetails'].includes(activeSection) && (
            <div className="p-8 text-center text-gray-500">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>Content for "{activeSection}" section will be displayed here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;