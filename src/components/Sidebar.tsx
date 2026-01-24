import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Award, Lightbulb, GraduationCap, Settings, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export function Sidebar() {
    const location = useLocation();
    const { logout } = useAuth();

    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
        { path: '/tips', label: 'Daily Tips', icon: Lightbulb },
        { path: '/education', label: 'Education', icon: GraduationCap },
        { path: '/leaderboard', label: 'Leaderboard', icon: Award },
        { path: '/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-20 lg:w-64 fixed h-screen z-50 glass border-r border-white/10 hidden md:flex flex-col justify-between transition-all duration-300"
        >
            <div>
                <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-white/5">
                    <Shield className="w-8 h-8 text-primary" />
                    <span className="ml-3 font-bold text-xl hidden lg:block tracking-wider">Cyber<span className="text-primary">Hygiene</span></span>
                </div>

                <nav className="mt-8 flex flex-col gap-2 px-3">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center p-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive(item.path)
                                ? 'bg-primary/10 text-primary shadow-[0_0_20px_rgba(0,242,254,0.1)]'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {isActive(item.path) && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-primary/10 rounded-xl"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                            <item.icon className={`w-6 h-6 z-10 transition-transform group-hover:scale-110 ${isActive(item.path) ? 'text-primary' : ''}`} />
                            <span className="ml-3 font-medium hidden lg:block z-10">{item.label}</span>

                            {/* Hover user feedback */}
                            <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="p-4 border-t border-white/5">
                <button
                    onClick={logout}
                    className="flex items-center justify-center lg:justify-start w-full p-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all group"
                >
                    <LogOut className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    <span className="ml-3 font-medium hidden lg:block">Sign Out</span>
                </button>
            </div>
        </motion.aside>
    );
}
