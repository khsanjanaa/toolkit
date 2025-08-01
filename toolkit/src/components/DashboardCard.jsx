import React, { useState, useEffect } from 'react';
import { Search, Upload, GitPullRequest, FileText, MessageSquare, Calendar, TrendingUp, Users, Clock, Filter, Bell, Settings, ChevronDown, ChevronRight, Github, BookOpen, Zap, Star, Activity } from 'lucide-react';

const KnowledgeDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [notifications, setNotifications] = useState(3);

  // Mock data
  const recentActivity = [
    { id: 1, type: 'pr', title: 'Refactor authentication service', author: 'Sarah Chen', time: '2 hours ago', status: 'merged' },
    { id: 2, type: 'doc', title: 'API Design Guidelines v2.1', author: 'Mike Johnson', time: '4 hours ago', status: 'updated' },
    { id: 3, type: 'meeting', title: 'Architecture Review - Q1 2024', author: 'Team Alpha', time: '1 day ago', status: 'uploaded' },
    { id: 4, type: 'pr', title: 'Add Redis caching layer', author: 'Alex Kumar', time: '2 days ago', status: 'review' }
  ];

  const quickStats = [
    { label: 'Total Documents', value: '1,247', change: '+12%', icon: FileText, color: 'blue' },
    { label: 'Active PRs', value: '23', change: '+3', icon: GitPullRequest, color: 'green' },
    { label: 'Team Members', value: '45', change: '+5', icon: Users, color: 'purple' },
    { label: 'Knowledge Score', value: '94%', change: '+2%', icon: TrendingUp, color: 'orange' }
  ];

  const categories = [
    { name: 'Documentation', count: 456, icon: BookOpen, color: 'bg-blue-500' },
    { name: 'Pull Requests', count: 234, icon: GitPullRequest, color: 'bg-green-500' },
    { name: 'Meeting Notes', count: 123, icon: MessageSquare, color: 'bg-purple-500' },
    { name: 'Changelogs', count: 89, icon: Activity, color: 'bg-orange-500' }
  ];

  const filterOptions = ['Documentation', 'Pull Requests', 'Meeting Notes', 'Changelogs', 'Last Week', 'Last Month', 'High Priority'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'merged': return 'bg-green-100 text-green-800';
      case 'updated': return 'bg-blue-100 text-blue-800';
      case 'uploaded': return 'bg-purple-100 text-purple-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'pr': return GitPullRequest;
      case 'doc': return FileText;
      case 'meeting': return MessageSquare;
      default: return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-2">Welcome back! 👋</h2>
              <p className="text-blue-100 mb-6">Stay up to date with your team's knowledge and recent activities</p>
              <div className="flex space-x-4">
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                  Quick Start
                </button>
                <button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                  View Analytics
                </button>
              </div>
            </div>
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute right-20 bottom-0 w-32 h-32 bg-white/5 rounded-full translate-y-16"></div>
          </div>
        </div>
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-${stat.color}-100 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Categories Section */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                Knowledge Categories
              </h3>
              <div className="space-y-4">
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <div
                      key={category.name}
                      className="flex items-center p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-all duration-300 group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{category.name}</h4>
                        <p className="text-sm text-gray-500">{category.count} items</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-600" />
                  Recent Activity
                </h3>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = getTypeIcon(activity.type);
                  return (
                    <div
                      key={activity.id}
                      className="flex items-center p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-all duration-300 group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-100 transition-colors">
                        <Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {activity.title}
                        </h4>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-sm text-gray-500">by {activity.author}</span>
                          <span className="text-sm text-gray-400">•</span>
                          <span className="text-sm text-gray-500">{activity.time}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-blue-600" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                  <Upload className="w-5 h-5 mr-3" />
                  Upload Document
                </button>
                <button className="flex items-center p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105">
                  <Github className="w-5 h-5 mr-3" />
                  Sync GitHub
                </button>
                <button className="flex items-center p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                  <MessageSquare className="w-5 h-5 mr-3" />
                  Add Meeting Notes
                </button>
                <button className="flex items-center p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105">
                  <Star className="w-5 h-5 mr-3" />
                  Create Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeDashboard;