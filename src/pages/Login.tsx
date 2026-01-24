import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../lib/api';
import { ShieldCheck, Lock, Mail } from 'lucide-react';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });
            login(response.data.token, response.data.user);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="max-w-md w-full glass p-8 rounded-2xl relative">
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                    <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center border-4 border-primary shadow-[0_0_20px_rgba(0,242,254,0.5)]">
                        <ShieldCheck className="w-12 h-12 text-primary" />
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-center mb-8 mt-8 text-gradient-cyber">Welcome Back</h2>

                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-lg mb-4 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-white"
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
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-white"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-background font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] shadow-[0_0_15px_rgba(0,242,254,0.3)]"
                    >
                        Access Dashboard
                    </button>
                </form>

                <p className="mt-6 text-center text-slate-400">
                    Don't have an account? <Link to="/signup" className="text-primary hover:text-primary/80">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
