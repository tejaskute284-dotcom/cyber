import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Trophy, Medal, User } from 'lucide-react';
import { motion } from 'framer-motion';

export function Leaderboard() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await api.get('/dashboard/leaderboard');
                setUsers(res.data);
            } catch (err) {
                console.error("Failed to load leaderboard");
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);

    if (loading) return <div className="text-center text-primary mt-20">Loading Leaderboard...</div>;

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
        if (rank === 2) return <Medal className="w-6 h-6 text-slate-300" />;
        if (rank === 3) return <Medal className="w-6 h-6 text-orange-400" />;
        return <span className="font-bold text-slate-500">{rank}</span>;
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                    Leaderboard
                </h1>
                <p className="text-slate-400">Compete with others to become the ultimate Cyber Guardian.</p>
            </div>

            <div className="glass rounded-3xl overflow-hidden p-2">
                <div className="bg-slate-900/50 rounded-2xl">
                    {/* Header */}
                    <div className="grid grid-cols-4 p-4 text-slate-400 font-medium text-sm border-b border-white/5 uppercase tracking-wider">
                        <div className="pl-4">Rank</div>
                        <div className="col-span-2">User</div>
                        <div className="text-right pr-4">Score</div>
                    </div>

                    {/* List */}
                    <div className="divide-y divide-white/5">
                        {users.map((user, index) => (
                            <motion.div
                                key={user.rank}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="grid grid-cols-4 p-4 items-center hover:bg-white/5 transition-colors group"
                            >
                                <div className="pl-4 flex items-center gap-3">
                                    {getRankIcon(user.rank)}
                                </div>
                                <div className="col-span-2 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px]">
                                        <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                                            <User className="w-5 h-5 text-slate-300" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white group-hover:text-primary transition-colors">{user.name}</h3>
                                        <span className="text-xs text-slate-500">{user.badge}</span>
                                    </div>
                                </div>
                                <div className="text-right pr-4 font-mono font-bold text-lg text-secondary">
                                    {user.score}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
