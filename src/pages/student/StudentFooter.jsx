import React from 'react';
import { Mail, Phone, MapPin, BookOpen, Users, Award, Globe, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const StudentFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">EduFlow</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Empowering students with innovative learning management solutions. 
              Transform your educational journey with our comprehensive platform.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-gray-100 hover:bg-blue-600 hover:text-white p-2 rounded-full transition-all duration-300">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="bg-gray-100 hover:bg-blue-600 hover:text-white p-2 rounded-full transition-all duration-300">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="bg-gray-100 hover:bg-blue-600 hover:text-white p-2 rounded-full transition-all duration-300">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="bg-gray-100 hover:bg-blue-600 hover:text-white p-2 rounded-full transition-all duration-300">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="bg-gray-100 hover:bg-blue-600 hover:text-white p-2 rounded-full transition-all duration-300">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center space-x-2">
                <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                <span>Dashboard</span>
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center space-x-2">
                <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                <span>My Courses</span>
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center space-x-2">
                <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                <span>Assignments</span>
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center space-x-2">
                <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                <span>Grades</span>
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center space-x-2">
                <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                <span>Calendar</span>
              </a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center space-x-2">
                <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                <span>Help Center</span>
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center space-x-2">
                <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                <span>Student Guide</span>
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center space-x-2">
                <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                <span>Technical Support</span>
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center space-x-2">
                <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                <span>System Status</span>
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center space-x-2">
                <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                <span>Report Issue</span>
              </a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <a href="mailto:support@eduflow.com" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    support@eduflow.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Phone</p>
                  <a href="tel:+1234567890" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    +1 (234) 567-8900
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Address</p>
                  <p className="text-sm text-gray-600">
                    123 Education St<br />
                    Learning City, LC 12345
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">50K+</span>
              </div>
              <p className="text-sm text-gray-600">Active Students</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">500+</span>
              </div>
              <p className="text-sm text-gray-600">Courses Available</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Award className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">95%</span>
              </div>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Globe className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">40+</span>
              </div>
              <p className="text-sm text-gray-600">Countries</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-gray-600">
                &copy; {new Date().getFullYear()} EduFlow LMS. All rights reserved.
              </p>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <span>Made with</span>
                <span className="text-red-500">❤️</span>
                <span>for students worldwide</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Cookie Policy</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default StudentFooter;