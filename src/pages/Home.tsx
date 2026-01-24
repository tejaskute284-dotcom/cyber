import { Link } from 'react-router-dom';
import { HowItWorks } from '../components/HowItWorks';
import { ShieldCheck, ChevronRight } from 'lucide-react';

export function Home() {
    return (
        <div className="min-h-screen bg-background text-white">
            {/* Navbar */}
            <nav className="border-b border-white/10 glass sticky top-0 z-50">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-8 h-8 text-primary" />
                        <span className="text-xl font-bold">Cyber<span className="text-primary">Coach</span></span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">Log In</Link>
                        <Link to="/signup" className="px-5 py-2.5 bg-primary/10 hover:bg-primary/20 border border-primary/50 text-primary rounded-lg transition-all text-sm font-bold">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <span className="inline-block py-1 px-3 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-xs font-bold tracking-wider mb-6">
                        CYBER SAFETY REIMAGINED
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        Your Personal <br />
                        <span className="text-gradient-cyber">Cyber Security Coach</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Build digital resilience with personalized tasks, real-time safety scores, and gamified learning. Secure your digital life, one step at a time.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/signup" className="px-8 py-4 bg-primary text-background font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(0,242,254,0.4)] hover:shadow-[0_0_30px_rgba(0,242,254,0.6)] hover:scale-105 transition-all flex items-center gap-2">
                            Start Your Training <ChevronRight className="w-5 h-5" />
                        </Link>
                        <Link to="/login" className="px-8 py-4 glass border border-white/10 rounded-xl hover:bg-white/10 transition-all font-semibold">
                            View Demo
                        </Link>
                    </div>
                </div>
            </section>

            <HowItWorks />

            <footer className="py-12 border-t border-white/5 bg-black/20">
                <div className="container mx-auto px-4 text-center text-slate-600">
                    <p>© 2024 Cyber Hygiene Coach. Stay Safe.</p>
                </div>
            </footer>
        </div>
    );
}
