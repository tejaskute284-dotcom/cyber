import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Chatbot } from './Chatbot';
import { motion, AnimatePresence } from 'framer-motion';

export function Layout() {
    return (
        <div className="min-h-screen bg-background text-white flex">
            <Sidebar />
            <div className="flex-1 md:ml-20 lg:ml-64 min-h-screen transition-all duration-300 relative">
                <AnimatePresence mode="wait">
                    <motion.main
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="container mx-auto p-4 lg:p-8"
                    >
                        <Outlet />
                    </motion.main>
                </AnimatePresence>
                <Chatbot />
            </div>
        </div>
    );
}
