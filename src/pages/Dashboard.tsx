import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import { Shield, CheckCircle, Activity, TrendingUp, AlertOctagon } from 'lucide-react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';
import { motion } from 'framer-motion';

export function Dashboard() {
    const { user } = useAuth();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Mock data for graphs
    const healthData = [
        { name: 'Mon', score: 45 },
        { name: 'Tue', score: 50 },
        { name: 'Wed', score: 55 },
        { name: 'Thu', score: 52 },
        { name: 'Fri', score: 60 },
        { name: 'Sat', score: 65 },
        { name: 'Sun', score: data?.score?.score || 70 },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/dashboard');
                setData(res.data);
            } catch (err) {
                console.error("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const toggleTask = async (taskId: string) => {
        try {
            await api.post(`/dashboard/tasks/${taskId}/toggle`);
            // Optimistic update
            setData((prev: any) => ({
                ...prev,
                tasks: prev.tasks.map((t: any) =>
                    t.id === taskId ? { ...t, completed: !t.completed } : t
                )
            }));
        } catch (err) {
            console.error("Failed to toggle task");
        }
    };

    if (loading) return (
        <div className="h-full flex items-center justify-center text-primary">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}</h1>
                    <p className="text-slate-400">Here's your cyber hygiene overview for today.</p>
                </div>
                <div className="text-right hidden sm:block">
                    <p className="text-sm text-slate-500">Last scan</p>
                    <p className="font-mono text-primary">Just now</p>
                </div>
            </div>

            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass glass-hover p-6 rounded-2xl relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Shield className="w-24 h-24" />
                    </div>
                    <h3 className="text-slate-400 mb-2 font-medium">Cyber Score</h3>
                    <div className="text-5xl font-bold text-gradient-cyber">{data?.score?.score || 0}</div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-primary bg-primary/10 w-fit px-2 py-1 rounded">
                        <TrendingUp className="w-4 h-4" />
                        <span>+5% this week</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass glass-hover p-6 rounded-2xl"
                >
                    <h3 className="text-slate-400 mb-4 font-medium">Pending Tasks</h3>
                    <div className="flex items-end gap-2 mb-2">
                        <div className="text-4xl font-bold text-white">
                            {data?.tasks?.filter((t: any) => !t.completed).length || 0}
                        </div>
                        <span className="text-slate-500 mb-1">remaining</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 mt-4">
                        <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass glass-hover p-6 rounded-2xl"
                >
                    <h3 className="text-slate-400 mb-4 font-medium">Threat Status</h3>
                    <div className="flex items-center gap-3 text-green-400 text-2xl font-bold">
                        <div className="p-2 bg-green-500/10 rounded-full">
                            <CheckCircle className="w-8 h-8" />
                        </div>
                        <span>Secure</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-4">No active threats detected on your network.</p>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Graph Area */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-2 space-y-8"
                >
                    <div className="glass p-8 rounded-2xl">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-bold text-white">Cyber Health Trend</h3>
                            <button className="text-sm text-primary hover:text-white transition-colors">View Report</button>
                        </div>
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={healthData}>
                                    <defs>
                                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00f2fe" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#00f2fe" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#475569"
                                        tick={{ fill: '#64748b' }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        stroke="#475569"
                                        tick={{ fill: '#64748b' }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff', borderRadius: '12px' }}
                                        itemStyle={{ color: '#00f2fe' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="score"
                                        stroke="#00f2fe"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorScore)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="glass p-8 rounded-2xl">
                        <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
                        <div className="space-y-4">
                            {data?.activities?.map((activity: any) => (
                                <div key={activity.id} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-colors border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-secondary/10 rounded-lg">
                                            <Activity className="w-5 h-5 text-secondary" />
                                        </div>
                                        <span className="font-medium text-slate-200">{activity.action}</span>
                                    </div>
                                    <span className="text-slate-500 text-sm font-mono">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Side Task List */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass p-6 rounded-2xl h-fit sticky top-24"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">Action Items</h3>
                        <span className="px-2 py-1 bg-red-500/10 text-red-400 text-xs font-bold rounded-lg uppercase tracking-wider">
                            {data?.tasks?.filter((t: any) => !t.completed).length} Urgent
                        </span>
                    </div>

                    <div className="space-y-3">
                        {data?.tasks?.map((task: any) => (
                            <div
                                key={task.id}
                                onClick={() => toggleTask(task.id)}
                                className={`p-4 rounded-xl border transition-all cursor-pointer group ${task.completed
                                    ? 'bg-slate-800/20 border-slate-800 opacity-50'
                                    : 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-white/5 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5'
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${task.completed
                                        ? 'bg-green-500 border-green-500'
                                        : 'border-slate-600 group-hover:border-primary'
                                        }`}>
                                        {task.completed && <CheckCircle className="w-4 h-4 text-black" />}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className={`font-medium text-sm ${task.completed ? 'line-through text-slate-500' : 'text-slate-200 group-hover:text-white'}`}>
                                            {task.title}
                                        </h4>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 bg-black/20 px-2 py-1 rounded">
                                                {task.category}
                                            </span>
                                            {!task.completed && <AlertOctagon className="w-3 h-3 text-red-400" />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {data?.tasks?.length === 0 && (
                            <div className="text-center text-slate-400 py-12 flex flex-col items-center">
                                <div className="p-4 bg-green-500/10 rounded-full mb-4">
                                    <CheckCircle className="w-8 h-8 text-green-500" />
                                </div>
                                <p className="font-medium text-white">All clean!</p>
                                <p className="text-sm mt-1">No action items pending.</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

