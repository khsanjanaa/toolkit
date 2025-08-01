import {
  Award,
  BookOpen,
  Brain,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Code,
  Database,
  ExternalLink,
  FileText,
  GitBranch,
  MapPin,
  MessageSquare,
  Rocket,
  Settings,
  Shield,
  Sparkles,
  Star,
  Target,
  Timer,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';
import { useState } from 'react';

const OnboardingTimeline = () => {
  const [activePhase, setActivePhase] = useState(0);
  const [completedItems, setCompletedItems] = useState(new Set([0, 1, 2]));
  const [expandedPhases, setExpandedPhases] = useState(new Set([0]));
  const [userProgress, setUserProgress] = useState(35);

  const phases = [
    {
      id: 0,
      title: "Foundation Setup",
      subtitle: "Get your development environment ready",
      duration: "2-3 days",
      color: "from-blue-600 to-purple-600", // updated
      bgColor: "from-blue-50 to-purple-50", // updated
      darkBgColor: "from-blue-900/20 to-purple-900/20", // updated
      icon: Settings,
      items: [
        {
          id: 0,
          title: "Development Environment Setup",
          description: "Install required tools, IDEs, and dependencies",
          type: "setup",
          duration: "2 hours",
          resources: ["Setup Guide", "Tool List", "Installation Scripts"],
          priority: "high"
        },
        {
          id: 1,
          title: "Access & Permissions",
          description: "Get access to repositories, tools, and services",
          type: "access",
          duration: "1 hour",
          resources: ["Access Request Form", "Permission Matrix"],
          priority: "high"
        },
        {
          id: 2,
          title: "Team Introduction",
          description: "Meet your team members and understand roles",
          type: "social",
          duration: "1 hour",
          resources: ["Team Directory", "Org Chart", "Slack Channels"],
          priority: "medium"
        }
      ]
    },
    {
      id: 1,
      title: "Architecture Deep Dive",
      subtitle: "Understand our system architecture and design patterns",
      duration: "1-2 weeks",
      color: "from-green-500 to-blue-600", // updated
      bgColor: "from-green-50 to-blue-50", // updated
      darkBgColor: "from-green-900/20 to-blue-900/20", // updated
      icon: Brain,
      items: [
        {
          id: 3,
          title: "System Architecture Overview",
          description: "High-level understanding of our microservices architecture",
          type: "documentation",
          duration: "4 hours",
          resources: ["Architecture Diagrams", "Service Map", "API Documentation"],
          priority: "high"
        },
        {
          id: 4,
          title: "Database Schema & Models",
          description: "Learn our data models and database relationships",
          type: "database",
          duration: "3 hours",
          resources: ["ER Diagrams", "Schema Docs", "Migration History"],
          priority: "high"
        },
        {
          id: 5,
          title: "Design Patterns & Best Practices",
          description: "Understand coding standards and architectural patterns",
          type: "standards",
          duration: "2 hours",
          resources: ["Style Guide", "Best Practices", "Code Examples"],
          priority: "medium"
        }
      ]
    },
    {
      id: 2,
      title: "Codebase Exploration",
      subtitle: "Navigate and understand our codebase structure",
      duration: "1-2 weeks",
      color: "from-purple-500 to-blue-600", // updated
      bgColor: "from-purple-50 to-blue-50", // updated
      darkBgColor: "from-purple-900/20 to-blue-900/20", // updated
      icon: Code,
      items: [
        {
          id: 6,
          title: "Repository Structure",
          description: "Understand folder organization and module structure",
          type: "code",
          duration: "2 hours",
          resources: ["Repo Guide", "Module Map", "Dependency Graph"],
          priority: "high"
        },
        {
          id: 7,
          title: "Core Components & Libraries",
          description: "Explore key components and shared libraries",
          type: "code",
          duration: "6 hours",
          resources: ["Component Library", "Utility Docs", "Examples"],
          priority: "high"
        },
        {
          id: 8,
          title: "Testing Strategy",
          description: "Learn our testing approach and frameworks",
          type: "testing",
          duration: "3 hours",
          resources: ["Test Guide", "Test Examples", "Coverage Reports"],
          priority: "medium"
        }
      ]
    },
    {
      id: 3,
      title: "Workflow & Processes",
      subtitle: "Master our development workflows and team processes",
      duration: "1 week",
      color: "from-orange-500 to-purple-600", // updated
      bgColor: "from-orange-50 to-purple-50", // updated
      darkBgColor: "from-orange-900/20 to-purple-900/20", // updated
      icon: GitBranch,
      items: [
        {
          id: 9,
          title: "Git Workflow & Branching",
          description: "Understand our Git flow and branching strategy",
          type: "workflow",
          duration: "2 hours",
          resources: ["Git Guide", "Branch Model", "PR Templates"],
          priority: "high"
        },
        {
          id: 10,
          title: "CI/CD Pipeline",
          description: "Learn our deployment and continuous integration process",
          type: "devops",
          duration: "3 hours",
          resources: ["Pipeline Docs", "Deployment Guide", "Environment Info"],
          priority: "medium"
        },
        {
          id: 11,
          title: "Code Review Process",
          description: "Understand how we conduct and participate in code reviews",
          type: "process",
          duration: "1 hour",
          resources: ["Review Guidelines", "Checklist", "Examples"],
          priority: "medium"
        }
      ]
    },
    {
      id: 4,
      title: "First Contribution",
      subtitle: "Make your first meaningful contribution to the codebase",
      duration: "1-2 weeks",
      color: "from-green-500 to-blue-600", // updated
      bgColor: "from-green-50 to-blue-50", // updated
      darkBgColor: "from-green-900/20 to-blue-900/20", // updated
      icon: Rocket,
      items: [
        {
          id: 12,
          title: "Pick a Starter Issue",
          description: "Choose a good first issue labeled for new contributors",
          type: "task",
          duration: "30 minutes",
          resources: ["Issue Board", "Good First Issues", "Difficulty Guide"],
          priority: "high"
        },
        {
          id: 13,
          title: "Implement & Test",
          description: "Write code, add tests, and ensure quality",
          type: "development",
          duration: "1-2 days",
          resources: ["Implementation Guide", "Test Templates", "Quality Checklist"],
          priority: "high"
        },
        {
          id: 14,
          title: "Submit Pull Request",
          description: "Create PR, address feedback, and get it merged",
          type: "collaboration",
          duration: "2-3 days",
          resources: ["PR Template", "Review Process", "Merge Guidelines"],
          priority: "high"
        }
      ]
    }
  ];

  const togglePhase = (phaseId) => {
    const newExpanded = new Set(expandedPhases);
    if (newExpanded.has(phaseId)) {
      newExpanded.delete(phaseId);
    } else {
      newExpanded.add(phaseId);
    }
    setExpandedPhases(newExpanded);
  };

  const toggleItemComplete = (itemId) => {
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(itemId)) {
      newCompleted.delete(itemId);
    } else {
      newCompleted.add(itemId);
    }
    setCompletedItems(newCompleted);
    
    // Update progress
    const totalItems = phases.reduce((acc, phase) => acc + phase.items.length, 0);
    const progress = Math.round((newCompleted.size / totalItems) * 100);
    setUserProgress(progress);
  };

  const getTypeIcon = (type) => {
    const icons = {
      setup: Settings,
      access: Shield,
      social: Users,
      documentation: BookOpen,
      database: Database,
      standards: Star,
      code: Code,
      testing: Zap,
      workflow: GitBranch,
      devops: Rocket,
      process: FileText,
      task: Target,
      development: Code,
      collaboration: MessageSquare
    };
    return icons[type] || FileText;
  };

  const getPriorityColor = (priority) => {
    return {
      high: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30',
      medium: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30',
      low: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
    }[priority];
  };

  return (
    <div className="min-h-screen bg-white dark:bg-white">
      {/* Header */}
      <div className="bg-white dark:bg-white border-b border-white/20 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                <MapPin className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-black">Onboarding Journey</h1>
                <p className="text-slate-600 dark:text-slate-400">Your guided path to becoming a productive team member</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500 ease-out"
                    style={{ width: `${userProgress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{userProgress}% Complete</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Calendar className="w-4 h-4" />
                <span>~4-6 weeks total</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Quick Stats */}
              <div className="bg-white dark:bg-white rounded-3xl border border-white/20 p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-black mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-500" />
                  Your Progress
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Completed Tasks</span>
                    <span className="text-2xl font-bold text-indigo-600 dark:text-black-400">{completedItems.size}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Current Phase</span>
                    <span className="text-lg font-semibold text-slate-900 dark:text-black">{activePhase + 1}/5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Est. Time Left</span>
                    <span className="text-sm font-medium text-slate-700 dark:text-black-400">3-4 weeks</span>
                  </div>
                </div>
              </div>

              {/* Phase Navigator */}
              <div className="bg-white dark:bg-white rounded-3xl border border-white/20 p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-black mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-500" />
                  Phase Navigator
                </h3>
                <div className="space-y-3">
                  {phases.map((phase, idx) => (
                    <button
                      key={phase.id}
                      onClick={() => setActivePhase(idx)}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${
                        activePhase === idx
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          activePhase === idx ? 'bg-white/20' : `bg-gradient-to-br ${phase.color}`
                        }`}>
                          <phase.icon className={`w-4 h-4 ${activePhase === idx ? 'text-white' : 'text-white'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium text-sm ${activePhase === idx ? 'text-white' : ''}`}>
                            {phase.title}
                          </p>
                          <p className={`text-xs ${activePhase === idx ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>
                            {phase.duration}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Timeline */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {phases.map((phase, phaseIdx) => (
                <div key={phase.id} className="relative">
                  {/* Phase Header */}
                  <div 
                    className="bg-white rounded-3xl p-8 shadow-2xl cursor-pointer transition-all duration-300 hover:shadow-3xl transform hover:-translate-y-1"
                    onClick={() => togglePhase(phase.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
                          <phase.icon className="w-8 h-8 text-indigo-600" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-slate-900 mb-1">{phase.title}</h2>
                          <p className="text-slate-700 text-lg">{phase.subtitle}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1 text-slate-500">
                              <Timer className="w-4 h-4" />
                              <span className="text-sm">{phase.duration}</span>
                            </div>
                            <div className="flex items-center gap-1 text-slate-500">
                              <Target className="w-4 h-4" />
                              <span className="text-sm">{phase.items.length} tasks</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-slate-700 text-right">
                          <div className="text-sm">Progress</div>
                          <div className="text-2xl font-bold">
                            {Math.round((phase.items.filter(item => completedItems.has(item.id)).length / phase.items.length) * 100)}%
                          </div>
                        </div>
                        {expandedPhases.has(phase.id) ? 
                          <ChevronUp className="w-6 h-6 text-indigo-600" /> : 
                          <ChevronDown className="w-6 h-6 text-indigo-600" />
                        }
                      </div>
                    </div>
                  </div>

                  {/* Phase Content */}
                  {expandedPhases.has(phase.id) && (
                    <div className="mt-6 bg-white dark:bg-white rounded-3xl p-8 border border-slate-200 dark:border-slate-200 shadow-xl">
                      <div className="space-y-6">
                        {phase.items.map((item) => {
                          const ItemIcon = getTypeIcon(item.type);
                          const isCompleted = completedItems.has(item.id);
                          
                          return (
                            <div key={item.id} className={`bg-white dark:bg-white rounded-2xl p-6 border border-slate-200 shadow-lg transition-all duration-200 hover:shadow-xl`}>
                              <div className="flex items-start gap-4">
                                <button
                                  onClick={() => toggleItemComplete(item.id)}
                                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                                    isCompleted 
                                      ? 'bg-green-500 text-white shadow-lg' 
                                      : 'bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 hover:shadow-lg'
                                  }`}
                                >
                                  {isCompleted ? <CheckCircle className="w-6 h-6" /> : <ItemIcon className="w-6 h-6" />}
                                </button>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between mb-3">
                                    <div>
                                      <h4 className={`text-lg font-semibold ${isCompleted ? 'line-through text-slate-500' : 'text-black'}`}>
                                        {item.title}
                                      </h4>
                                      <p className="text-slate-800 mt-1">{item.description}</p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getPriorityColor(item.priority)}`}>
                                        {item.priority}
                                      </span>
                                      <div className="flex items-center gap-1 text-slate-700">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-sm">{item.duration}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    {item.resources.map((resource, idx) => (
                                      <button key={idx} className="flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-800 rounded-lg text-sm hover:bg-slate-200 transition-colors">
                                        <FileText className="w-3 h-3" />
                                        {resource}
                                        <ExternalLink className="w-3 h-3" />
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Timeline Connector */}
                  {phaseIdx < phases.length - 1 && (
                    <div className="flex justify-center my-8">
                      <div className="w-px h-12 bg-slate-300 dark:bg-slate-300"></div>
                      <div className="absolute w-3 h-3 bg-slate-400 dark:bg-slate-400 rounded-full transform translate-y-5 -translate-x-1.5"></div>
                    </div>
                  )}
                </div>
              ))}

              {/* Completion Celebration */}
              <div className="bg-white rounded-3xl p-8 text-center shadow-2xl">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-white/60 rounded-full flex items-center justify-center">
                    <Award className="w-10 h-10 text-indigo-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-indigo-700 mb-2">Congratulations!</h3>
                <p className="text-slate-700 text-lg mb-6">
                  You've completed your onboarding journey and are now ready to contribute effectively to the team!
                </p>
                <button className="bg-indigo-50 text-indigo-700 px-8 py-3 rounded-xl hover:bg-indigo-100 transition-all duration-200 flex items-center gap-2 mx-auto">
                  <Sparkles className="w-5 h-5" />
                  View Your Achievement
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTimeline;