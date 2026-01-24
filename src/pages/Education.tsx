import { useEffect, useState } from 'react';
import { BookOpen, Video, FileText, ArrowRight, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../lib/api';

export function Education() {
    const [resources, setResources] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const res = await api.get('/dashboard/education');
                setResources(res.data);
            } catch (err) {
                console.error("Failed to load resources");
            } finally {
                setLoading(false);
            }
        };
        fetchResources();
    }, []);

    const filteredResources = resources.filter(r => {
        const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.category.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "All" || r.level === filter;
        return matchesSearch && matchesFilter;
    });

    const getIcon = (type: string) => {
        if (type === 'Video') return Video;
        if (type === 'Course') return BookOpen;
        return FileText;
    };

    if (loading) return <div className="text-center text-primary mt-20">Loading Knowledge Base...</div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Knowledge Hub
                    </h1>
                    <p className="text-slate-400 mt-2">Master cybersecurity with our curated resources.</p>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search topics..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-primary transition-colors text-white"
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="bg-slate-900 border border-white/10 rounded-xl pl-10 pr-8 py-2 focus:outline-none focus:border-primary transition-colors text-white appearance-none cursor-pointer"
                        >
                            <option value="All">All Levels</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredResources.map((resource, index) => {
                    const Icon = getIcon(resource.type);
                    return (
                        <motion.div
                            key={resource.id}
                            onClick={() => window.open(resource.url, '_blank')}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass glass-hover p-6 rounded-2xl flex flex-col sm:flex-row gap-6 group cursor-pointer relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -mr-8 -mt-8 transition-all group-hover:bg-primary/10" />

                            <div className="w-full sm:w-32 h-32 bg-slate-800/50 rounded-xl flex items-center justify-center border border-white/5 group-hover:border-primary/20 transition-all">
                                <Icon className="w-10 h-10 text-primary opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                            </div>

                            <div className="flex-1 flex flex-col justify-between relative z-10">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-secondary uppercase tracking-wider bg-secondary/10 px-2 py-1 rounded">{resource.type}</span>
                                        <span className={`text-xs px-2 py-1 rounded font-medium ${resource.level === 'Beginner' ? 'text-green-400 bg-green-400/10' :
                                            resource.level === 'Intermediate' ? 'text-yellow-400 bg-yellow-400/10' :
                                                'text-red-400 bg-red-400/10'
                                            }`}>{resource.level}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors line-clamp-2">{resource.title}</h3>
                                    <p className="text-sm text-slate-400 mt-2 line-clamp-2">{resource.category}</p>
                                </div>

                                <div className="flex justify-between items-center mt-4 border-t border-white/5 pt-4">
                                    <span className="text-sm text-slate-500 font-mono">{resource.duration}</span>
                                    <button className="flex items-center gap-2 text-sm text-primary font-bold group-hover:translate-x-2 transition-transform">
                                        Open Resource <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
