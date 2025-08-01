import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Calendar, User, Tag, FileText, GitPullRequest, MessageSquare, Activity, Clock, Star, Eye, Download, ExternalLink, ChevronDown, X, SlidersHorizontal, ArrowUpDown, Grid, List, Zap } from 'lucide-react';

const AdvancedSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedFilters, setSelectedFilters] = useState({
    contentType: [],
    dateRange: '',
    author: [],
    tags: [],
    priority: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Mock data for search results
  const mockResults = [
    {
      id: 1,
      title: "API Authentication & Security Guidelines",
      type: "documentation",
      author: "Sarah Chen",
      date: "2024-07-28",
      tags: ["security", "api", "authentication"],
      priority: "high",
      views: 145,
      description: "Comprehensive guide for implementing secure authentication in our microservices architecture...",
      lastModified: "3 days ago",
      size: "2.3 MB",
      status: "updated"
    },
    {
      id: 2,
      title: "Fix: Memory leak in user session management",
      type: "pull-request",
      author: "Mike Johnson",
      date: "2024-07-25",
      tags: ["bug-fix", "performance", "session"],
      priority: "high",
      views: 89,
      description: "Resolved critical memory leak affecting user sessions during peak traffic periods...",
      lastModified: "1 week ago",
      size: "1.2 MB",
      status: "merged"
    },
    {
      id: 3,
      title: "Q2 Architecture Review Meeting",
      type: "meeting-notes",
      author: "Engineering Team",
      date: "2024-07-20",
      tags: ["architecture", "review", "planning"],
      priority: "medium",
      views: 67,
      description: "Discussion on microservices migration strategy and infrastructure scaling plans...",
      lastModified: "2 weeks ago",
      size: "856 KB",
      status: "final"
    },
    {
      id: 4,
      title: "Database Migration Rollback Procedures",
      type: "documentation",
      author: "Alex Kumar",
      date: "2024-07-15",
      tags: ["database", "migration", "procedures"],
      priority: "high",
      views: 234,
      description: "Step-by-step procedures for safely rolling back database migrations in production...",
      lastModified: "3 weeks ago",
      size: "1.8 MB",
      status: "approved"
    },
    {
      id: 5,
      title: "Implement Redis caching layer",
      type: "pull-request",
      author: "Emma Wilson",
      date: "2024-07-10",
      tags: ["caching", "performance", "redis"],
      priority: "medium",
      views: 92,
      description: "Added Redis caching to improve API response times and reduce database load...",
      lastModified: "1 month ago",
      size: "3.1 MB",
      status: "review"
    },
    {
      id: 6,
      title: "Frontend Component Library v3.0",
      type: "changelog",
      author: "Design System Team",
      date: "2024-07-05",
      tags: ["frontend", "components", "design-system"],
      priority: "medium",
      views: 156,
      description: "Major update to component library with new design tokens and accessibility improvements...",
      lastModified: "1 month ago",
      size: "2.7 MB",
      status: "released"
    }
  ];

  const filterOptions = {
    contentType: [
      { value: 'documentation', label: 'Documentation', icon: FileText, color: 'blue' },
      { value: 'pull-request', label: 'Pull Requests', icon: GitPullRequest, color: 'green' },
      { value: 'meeting-notes', label: 'Meeting Notes', icon: MessageSquare, color: 'purple' },
      { value: 'changelog', label: 'Changelogs', icon: Activity, color: 'orange' }
    ],
    dateRange: [
      { value: 'today', label: 'Today' },
      { value: 'week', label: 'This Week' },
      { value: 'month', label: 'This Month' },
      { value: 'quarter', label: 'This Quarter' },
      { value: 'year', label: 'This Year' }
    ],
    authors: ['Sarah Chen', 'Mike Johnson', 'Alex Kumar', 'Emma Wilson', 'Design System Team'],
    tags: ['security', 'api', 'authentication', 'bug-fix', 'performance', 'architecture', 'database', 'caching', 'frontend', 'design-system'],
    priority: [
      { value: 'high', label: 'High Priority', color: 'red' },
      { value: 'medium', label: 'Medium Priority', color: 'yellow' },
      { value: 'low', label: 'Low Priority', color: 'green' }
    ],
    sortOptions: [
      { value: 'relevance', label: 'Relevance' },
      { value: 'date', label: 'Date Modified' },
      { value: 'views', label: 'Most Viewed' },
      { value: 'title', label: 'Title A-Z' }
    ]
  };

  // Filter and search logic
  const filteredResults = useMemo(() => {
    let results = [...mockResults];

    // Text search
    if (searchQuery) {
      results = results.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Content type filter
    if (selectedFilters.contentType.length > 0) {
      results = results.filter(item => selectedFilters.contentType.includes(item.type));
    }

    // Author filter
    if (selectedFilters.author.length > 0) {
      results = results.filter(item => selectedFilters.author.includes(item.author));
    }

    // Tags filter
    if (selectedFilters.tags.length > 0) {
      results = results.filter(item =>
        selectedFilters.tags.some(tag => item.tags.includes(tag))
      );
    }

    // Priority filter
    if (selectedFilters.priority) {
      results = results.filter(item => item.priority === selectedFilters.priority);
    }

    // Sort results
    results.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'views':
          return b.views - a.views;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return results;
  }, [searchQuery, selectedFilters, sortBy]);

  // Simulate search loading
  useEffect(() => {
    if (searchQuery || Object.values(selectedFilters).some(f => Array.isArray(f) ? f.length > 0 : f)) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setSearchResults(filteredResults);
        setIsSearching(false);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setSearchResults(mockResults);
    }
  }, [searchQuery, selectedFilters, filteredResults]);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => {
      if (Array.isArray(prev[filterType])) {
        const newValues = prev[filterType].includes(value)
          ? prev[filterType].filter(v => v !== value)
          : [...prev[filterType], value];
        return { ...prev, [filterType]: newValues };
      } else {
        return { ...prev, [filterType]: prev[filterType] === value ? '' : value };
      }
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      contentType: [],
      dateRange: '',
      author: [],
      tags: [],
      priority: ''
    });
    setSearchQuery('');
  };

  const getActiveFilterCount = () => {
    return Object.values(selectedFilters).reduce((count, filter) => {
      if (Array.isArray(filter)) return count + filter.length;
      return count + (filter ? 1 : 0);
    }, 0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'merged': return 'bg-green-100 text-green-800';
      case 'updated': return 'bg-blue-100 text-blue-800';
      case 'final': return 'bg-purple-100 text-purple-800';
      case 'approved': return 'bg-emerald-100 text-emerald-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'released': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    const typeConfig = filterOptions.contentType.find(t => t.value === type);
    return typeConfig ? typeConfig.icon : FileText;
  };

  const getTypeColor = (type) => {
    const typeConfig = filterOptions.contentType.find(t => t.value === type);
    return typeConfig ? typeConfig.color : 'gray';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Section */}
        <div className="mb-8">
          {/* Main Search Bar */}
          <div className="relative mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search documentation, PRs, meeting notes, changelogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-4 py-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 text-lg shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  isFilterOpen || getActiveFilterCount() > 0
                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                    : 'bg-white/80 backdrop-blur-sm border border-white/20 hover:bg-gray-50'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span className="font-medium">Filters</span>
                {getActiveFilterCount() > 0 && (
                  <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getActiveFilterCount()}
                  </span>
                )}
                <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="font-medium">Advanced</span>
              </button>

              {getActiveFilterCount() > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-red-600 hover:text-red-700 font-medium text-sm px-3 py-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <ArrowUpDown className="w-4 h-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {filterOptions.sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center bg-white/80 backdrop-blur-sm border border-white/20 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {isFilterOpen && (
            <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-xl animate-in slide-in-from-top-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Content Type Filter */}
                <div>
                  <h4 className="font-semibold mb-3 text-gray-900">Content Type</h4>
                  <div className="space-y-2">
                    {filterOptions.contentType.map((type) => {
                      const Icon = type.icon;
                      return (
                        <label key={type.value} className="flex items-center space-x-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedFilters.contentType.includes(type.value)}
                            onChange={(e) => handleFilterChange('contentType', type.value)}
                            className={`w-4 h-4 text-${type.color}-600 rounded focus:ring-${type.color}-500`}
                          />
                          <Icon className={`w-4 h-4 text-${type.color}-600`} />
                          <span className="text-sm group-hover:text-blue-600 transition-colors">{type.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Date Range Filter */}
                <div>
                  <h4 className="font-semibold mb-3 text-gray-900">Date Range</h4>
                  <div className="space-y-2">
                    {filterOptions.dateRange.map((range) => (
                      <label key={range.value} className="flex items-center space-x-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="dateRange"
                          checked={selectedFilters.dateRange === range.value}
                          onChange={(e) => handleFilterChange('dateRange', range.value)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm group-hover:text-blue-600 transition-colors">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Author Filter */}
                <div>
                  <h4 className="font-semibold mb-3 text-gray-900">Author</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {filterOptions.authors.map((author) => (
                      <label key={author} className="flex items-center space-x-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedFilters.author.includes(author)}
                          onChange={(e) => handleFilterChange('author', author)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm group-hover:text-blue-600 transition-colors">{author}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Priority Filter */}
                <div>
                  <h4 className="font-semibold mb-3 text-gray-900">Priority</h4>
                  <div className="space-y-2">
                    {filterOptions.priority.map((priority) => (
                      <label key={priority.value} className="flex items-center space-x-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="priority"
                          checked={selectedFilters.priority === priority.value}
                          onChange={(e) => handleFilterChange('priority', priority.value)}
                          className={`w-4 h-4 text-${priority.color}-600 focus:ring-${priority.color}-500`}
                        />
                        <div className={`w-3 h-3 bg-${priority.color}-500 rounded-full`}></div>
                        <span className="text-sm group-hover:text-blue-600 transition-colors">{priority.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Advanced Filters */}
              {showAdvancedFilters && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold mb-3 text-gray-900">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleFilterChange('tags', tag)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                          selectedFilters.tags.includes(tag)
                            ? 'bg-blue-100 text-blue-800 border-2 border-blue-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Active Filters Display */}
          {getActiveFilterCount() > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedFilters.contentType.map(type => (
                <span key={type} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                  {filterOptions.contentType.find(t => t.value === type)?.label}
                  <button
                    onClick={() => handleFilterChange('contentType', type)}
                    className="ml-2 hover:text-blue-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {selectedFilters.dateRange && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                  {filterOptions.dateRange.find(d => d.value === selectedFilters.dateRange)?.label}
                  <button
                    onClick={() => handleFilterChange('dateRange', '')}
                    className="ml-2 hover:text-green-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedFilters.author.map(author => (
                <span key={author} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                  {author}
                  <button
                    onClick={() => handleFilterChange('author', author)}
                    className="ml-2 hover:text-purple-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {selectedFilters.tags.map(tag => (
                <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                  #{tag}
                  <button
                    onClick={() => handleFilterChange('tags', tag)}
                    className="ml-2 hover:text-orange-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {selectedFilters.priority && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                  {filterOptions.priority.find(p => p.value === selectedFilters.priority)?.label}
                  <button
                    onClick={() => handleFilterChange('priority', '')}
                    className="ml-2 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-gray-900">
              Search Results
            </h2>
            <span className="text-gray-500">
              {isSearching ? 'Searching...' : `${searchResults.length} results found`}
            </span>
          </div>
        </div>

        {/* Loading State */}
        {isSearching && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="text-gray-600">Searching knowledge base...</span>
            </div>
          </div>
        )}

        {/* Search Results */}
        {!isSearching && (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
            {searchResults.map((result, index) => {
              const Icon = getTypeIcon(result.type);
              const typeColor = getTypeColor(result.type);
              
              if (viewMode === 'list') {
                return (
                  <div
                    key={result.id}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-${typeColor}-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-6 h-6 text-${typeColor}-600`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                            {result.title}
                          </h3>
                          <div className="flex items-center space-x-2 ml-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                              {result.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {result.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              {result.author}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {result.lastModified}
                            </div>
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {result.views} views
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Star className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {result.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={result.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-${typeColor}-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 text-${typeColor}-600`} />
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                      {result.status}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                    {result.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {result.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {result.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                        #{tag}
                      </span>
                    ))}
                    {result.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                        +{result.tags.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {result.author}
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {result.views}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Star className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* No Results State */}
        {!isSearching && searchResults.length === 0 && (searchQuery || getActiveFilterCount() > 0) && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search query or filters to find what you're looking for.
            </p>
            <button
              onClick={clearAllFilters}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Quick Search Suggestions */}
        {!searchQuery && getActiveFilterCount() === 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-blue-600" />
              Quick Search Suggestions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['API Security', 'Database Migration', 'Performance Issues', 'Frontend Components', 
                'Architecture Decisions', 'Bug Fixes', 'Meeting Notes', 'Code Reviews'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setSearchQuery(suggestion)}
                  className="p-3 text-left bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:from-blue-100 hover:to-purple-100 transition-all duration-300 transform hover:scale-105 border border-blue-100"
                >
                  <span className="text-sm font-medium text-gray-700">{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedSearch;