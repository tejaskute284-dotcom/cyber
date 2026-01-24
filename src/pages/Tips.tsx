import { useEffect, useState } from 'react';
import { Lightbulb, Share2, Bookmark } from 'lucide-react';
import api from '../lib/api';
import { motion } from 'framer-motion';

export function Tips() {
    const [tips, setTips] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTips = async () => {
            try {
                const res = await api.get('/dashboard/tips');
                setTips(res.data);
            } catch (err) {
                console.error("Failed to load tips");
            } finally {
                setLoading(false);
            }
        };
        fetchTips();
    }, []);

    if (loading) return <div className="text-center text-primary mt-20">Loading Tips...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Daily Cyber Tips
            </h1>
            <p className="text-slate-400">Stay sharp with these bite-sized security best practices.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tips.map((tip, index) => (
                    <motion.div
                        key={tip.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass glass-hover p-6 rounded-2xl relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:bg-primary/10" />

                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                                {tip.category}
                            </span>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
                                    <Bookmark className="w-4 h-4" />
                                </button>
                                <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
                                    <Share2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-4 relative z-10">
                            <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl h-fit">
                                <Lightbulb className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">{tip.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{tip.content}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
