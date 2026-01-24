import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../lib/api';
import { Shield, Lock, Mail, User } from 'lucide-react';

export function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/register', { email, password, name });
            login(response.data.token, response.data.user);
            navigate('/dashboard');
        } catch (err) {
            setError('Error creating account. Email may be taken.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="max-w-md w-full glass p-8 rounded-2xl relative">
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                    <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center border-4 border-secondary shadow-[0_0_20px_rgba(79,172,254,0.5)]">
                        <Shield className="w-12 h-12 text-secondary" />
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-center mb-8 mt-8 text-gradient-cyber">Join CyberCoach</h2>

                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-lg mb-4 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-white"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-white"
                                placeholder="cyber@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-white"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] shadow-[0_0_15px_rgba(79,172,254,0.3)]"
                    >
                        Start Your Journey
                    </button>
                </form>

                <p className="mt-6 text-center text-slate-400">
                    Already have an account? <Link to="/login" className="text-secondary hover:text-secondary/80">Log in</Link>
                </p>
            </div>
        </div>
    );
}
