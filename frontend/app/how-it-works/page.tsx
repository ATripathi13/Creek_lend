import { CheckCircle, ArrowRight, MousePointer2, ClipboardCheck, Banknote } from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
    const steps = [
        {
            title: "Quick Application",
            description: "Complete our secure online form in under 5 minutes. No impact on your credit score during the initial check.",
            icon: <MousePointer2 size={32} />,
        },
        {
            title: "Instant Review",
            description: "Our advanced algorithm evaluates your application instantly, providing a decision within seconds.",
            icon: <ClipboardCheck size={32} />,
        },
        {
            title: "Receive Funds",
            description: "Once approved, funds are typically deposited into your bank account as soon as the next business day.",
            icon: <Banknote size={32} />,
        },
    ];

    return (
        <div className="py-24 container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold font-outfit mb-6">How It Works</h1>
                <p className="text-xl text-muted-foreground">Getting a loan with Creek Lend is simple, secure, and entirely online.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative mb-24">
                {/* Connector Line for Desktop */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" />

                {steps.map((step, idx) => (
                    <div key={idx} className="relative z-10 bg-background flex flex-col items-center text-center p-8 rounded-3xl border shadow-sm group hover:shadow-xl transition-all">
                        <div className="w-20 h-20 rounded-2xl bg-primary-600 text-white flex items-center justify-center mb-8 shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform">
                            {step.icon}
                        </div>
                        <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-muted border flex items-center justify-center text-xs font-bold text-muted-foreground">
                            {idx + 1}
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                ))}
            </div>

            <div className="p-12 md:p-16 rounded-[3rem] bg-muted/50 border max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Eligibility Checklist</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                        "Reside in the US, CA, or IN",
                        "At least 18 years of age",
                        "Active bank account for deposits",
                        "Steady source of income",
                        "Valid email and mobile number",
                        "Legal identity documentation"
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 bg-background rounded-2xl border shadow-sm">
                            <CheckCircle className="text-primary-600 shrink-0" size={24} />
                            <span className="font-medium">{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-24 text-center">
                <Link
                    href="/apply"
                    className="bg-primary-600 text-white px-10 py-5 rounded-full text-xl font-bold hover:scale-105 transition-all shadow-xl shadow-primary-500/30 inline-flex items-center"
                >
                    Begin Application
                    <ArrowRight className="ml-3" size={24} />
                </Link>
            </div>
        </div>
    );
}
