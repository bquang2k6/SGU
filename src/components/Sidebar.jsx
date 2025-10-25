import React, { useState } from 'react';
import { Button } from './ui/button';
import { 
  X, 
  Home, 
  Calendar, 
  Sun,
  Moon,
  GraduationCap,
  RefreshCw,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  LogOut,
  BookOpen,
  Award,
  FileText,
  Bell,
  User,
  TrendingUp
} from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'react-hot-toast';

const Sidebar = ({
  onBack,
  onRefresh,
  showBack = false,
  showRefresh = false,
  title = "SGU Dashboard",
  page = "home",
  onPageChange,
  onThemeToggle,
  isDark = false,
  isOpen = false,
  isAuth = false,
  onLogout,
  onToggle
}) => {
  const [expandedItems, setExpandedItems] = useState(['navigation']);

  const toggleExpanded = (item) => {
    setExpandedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const navigationItems = [
    {
      id: 'home',
      label: 'Trang chủ',
      icon: Home,
      description: 'Trang chính của ứng dụng'
    },
    {
      id: 'classes',
      label: 'Xem lớp học',
      icon: BookOpen,
      description: 'Xem thông tin lớp học và lịch học'
    },
    {
      id: 'grades',
      label: 'Xem điểm và kết quả học tập',
      icon: Award,
      description: 'Xem điểm số và kết quả học tập'
    },
    {
      id: 'documents',
      label: 'Đăng ký giấy',
      icon: FileText,
      description: 'Đăng ký các loại giấy tờ cần thiết'
    },
    {
      id: 'notifications',
      label: 'Nhận thông báo',
      icon: Bell,
      description: 'Xem thông báo và cập nhật mới'
    },
    {
      id: 'profile',
      label: 'Cập nhật thông tin cá nhân',
      icon: User,
      description: 'Quản lý thông tin cá nhân và đổi mật khẩu'
    },
    {
      id: 'progress',
      label: 'Theo dõi tiến độ học',
      icon: TrendingUp,
      description: 'Theo dõi tiến độ học tập và thành tích'
    }
  ];

  const actionItems = [
    ...(showBack && onBack ? [{
      id: 'back',
      label: 'Quay lại',
      icon: ArrowLeft,
      action: onBack,
      description: 'Quay về trang trước'
    }] : []),
    ...(showRefresh && onRefresh ? [{
      id: 'refresh',
      label: 'Làm mới',
      icon: RefreshCw,
      action: onRefresh,
      description: 'Tải lại dữ liệu'
    }] : []),
    ...(onThemeToggle ? [{
      id: 'theme',
      label: isDark ? 'Sáng' : 'Tối',
      icon: isDark ? Sun : Moon,
      action: onThemeToggle,
      description: 'Chuyển đổi chế độ sáng/tối'
    }] : []),
    ...(isAuth && onLogout ? [{
      id: 'logout',
      label: "Đăng xuất",
      icon: LogOut,
      action: onLogout,
      description: "Đăng xuất khỏi hệ thống"
    }] : [])
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:translate-x-0 lg:z-auto",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg font-semibold text-gray-900 truncate">
                  SGU Dashboard
                </h1>
                <p className="text-xs text-gray-500 truncate text-left">
                  {title}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="lg:hidden p-2"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {/* Navigation Section */}
            <div className="space-y-1">
              <button
                onClick={() => {toggleExpanded('navigation'); (expandedItems.includes("actions") && toggleExpanded("actions"))}}
                className="flex items-center justify-between w-full p-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <span>Điều hướng</span>
                {expandedItems.includes('navigation') ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              
              {expandedItems.includes('navigation') && (
                <div className="ml-4 space-y-1">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = page === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onPageChange?.(item.id);
                          // Close sidebar on mobile after selection
                          if (window.innerWidth < 1024) {
                            onToggle?.();
                          }
                        }}
                        className={cn(
                          "flex items-center gap-3 w-full p-3 text-left rounded-lg transition-colors group",
                          isActive 
                            ? "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800" 
                            : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                        )}
                      >
                        <Icon className={cn(
                          "h-5 w-5 flex-shrink-0",
                          isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                        )} />
                        <div className="min-w-0 flex-1">
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {item.description}
                          </div>
                        </div>
                        {isActive && (
                          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Actions Section */}
            {actionItems.length > 0 && (
              <div className="space-y-1 pt-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={() => {toggleExpanded('actions'); (expandedItems.includes("navigation") && toggleExpanded("navigation"))}}
                  className="flex items-center justify-between w-full p-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <span>Hành động</span>
                  {expandedItems.includes('actions') ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                
                {expandedItems.includes('actions') && (
                  <div className="ml-4 space-y-1">
                    {actionItems.map((item) => {
                      const Icon = item.icon;
                      
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            item.action?.();
                            // Close sidebar on mobile after action
                            if (window.innerWidth < 1024) {
                              onToggle?.();
                            }
                          }}
                          className="flex items-center gap-3 w-full p-3 text-left rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 group"
                        >
                          <Icon className="h-5 w-5 flex-shrink-0 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
                          <div className="min-w-0 flex-1">
                            <div className="font-medium">{item.label}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {item.description}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Status Section */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  Đang học
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export { Sidebar };
