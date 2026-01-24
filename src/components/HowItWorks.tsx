import { ArrowRight } from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Take the Assessment",
        description: "Answer simple questions about your digital habits to get your initial Cyber Score.",
    },
    {
        number: "02",
        title: "Get Your Action Plan",
        description: "Receive personalized daily tasks and challenges based on your security gaps.",
    },
    {
        number: "03",
        title: "Build Better Habits",
        description: "Complete daily micro-tasks that take just 5 minutes but make a big impact.",
    },
    {
        number: "04",
        title: "Watch Your Score Grow",
        description: "Track your progress, earn badges, and become cyber-resilient over time.",
    },
];

export function HowItWorks() {
    return (
        <section className="py-24 bg-gradient-cyber relative overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[100px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[100px] rounded-full"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        How <span className="text-gradient-cyber">CyberCoach</span> Works
                    </h2>
                    <p className="text-slate-400 text-lg">
                        Four simple steps to transform your digital security habits.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={step.number} className="relative group">
                            <div className="glass rounded-2xl p-6 h-full transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:border-primary/30">
                                <span className="text-5xl font-bold text-primary/20 mb-4 block group-hover:text-primary/40 transition-colors">
                                    {step.number}
                                </span>
                                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-primary transition-colors">{step.title}</h3>
                                <p className="text-slate-400 text-sm">{step.description}</p>
                            </div>

                            {index < steps.length - 1 && (
                                <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-slate-700 w-8 h-8" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
