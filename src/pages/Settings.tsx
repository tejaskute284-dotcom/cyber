import { useState, useEffect } from 'react';
import { User, Mail, Save, Lock, Shield } from 'lucide-react';
import api from '../lib/api';
import { motion } from 'framer-motion';

export function Settings() {
    const [profile, setProfile] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await api.get('/dashboard/settings');
            setProfile(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        try {
            await api.put('/dashboard/settings', profile);
            setMessage({ type: 'success', text: 'Profile updated successfully' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update profile' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-primary mt-10">Loading settings...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Settings</h1>
                <p className="text-slate-400">Manage your profile and security preferences.</p>
            </div>

            <div className="grid gap-8">
                {/* Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass p-8 rounded-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-primary/20 rounded-xl">
                            <User className="w-6 h-6 text-primary" />
                        </div>
                        <h2 className="text-xl font-bold">Profile Information</h2>
                    </div>

                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-slate-400">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        type="text"
                                        value={profile.name}
                                        onChange={e => setProfile({ ...profile, name: e.target.value })}
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-primary transition-colors text-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-slate-400">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        type="email"
                                        value={profile.email}
                                        onChange={e => setProfile({ ...profile, email: e.target.value })}
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-primary transition-colors text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {message && (
                            <div className={`p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                {message.text}
                            </div>
                        )}

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center gap-2 bg-primary text-black font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </motion.div>

                {/* Security Section (Visual Only for now) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass p-8 rounded-2xl relative overflow-hidden opacity-75"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-secondary/20 rounded-xl">
                            <Shield className="w-6 h-6 text-secondary" />
                        </div>
                        <h2 className="text-xl font-bold">Security Preferences</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-white/5">
                            <div className="flex items-center gap-3">
                                <Lock className="w-5 h-5 text-slate-400" />
                                <div>
                                    <p className="font-medium">Two-Factor Authentication</p>
                                    <p className="text-xs text-slate-500">Currently disabled</p>
                                </div>
                            </div>
                            <button className="text-sm text-secondary hover:text-white transition-colors">Enable</button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
