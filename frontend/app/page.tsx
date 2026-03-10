import Link from "next/link";
import { CheckCircle, ShieldCheck, Zap, Globe, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-40 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold mb-6 tracking-wide uppercase">
              <Zap size={14} className="fill-current" />
              Fast & Secure Direct Lending
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-outfit mb-6 leading-tight tracking-tight">
              Flexible Loans for <br />
              <span className="gradient-text">Your Financial Future</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
              Get the funding you need with transparent rates, fast approvals, and a secure application process designed for your convenience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apply"
                className="bg-primary-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20 flex items-center justify-center group"
              >
                Get Started Now
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/how-it-works"
                className="glass px-8 py-4 rounded-full text-lg font-bold hover:bg-secondary/10 transition-all flex items-center justify-center"
              >
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges / Social Proof */}
      <section className="py-12 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* These would be real logos, using placeholders for now */}
            <div className="text-xl font-bold font-outfit">TRUSTED BY 10K+</div>
            <div className="text-xl font-bold font-outfit underline">SECURE LENDING</div>
            <div className="text-xl font-bold font-outfit italic">FAIR RATES</div>
            <div className="text-xl font-bold font-outfit">US CA IN</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-4">Why Choose Creek Lend?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">We prioritize transparency and speed to help you reach your goals faster.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl glass transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-500/5 group">
              <div className="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 mb-6 group-hover:scale-110 transition-transform">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">Instant Decisions</h3>
              <p className="text-muted-foreground leading-relaxed">Our automated system provides quick evaluations so you don't have to wait days for an answer.</p>
            </div>
            <div className="p-8 rounded-3xl glass transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-500/5 group">
              <div className="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">Bank-Level Security</h3>
              <p className="text-muted-foreground leading-relaxed">We use AES-256 encryption to protect your sensitive data, ensuring your PII remains private and secure.</p>
            </div>
            <div className="p-12 rounded-3xl glass transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-500/5 group border-primary-500/20 border-2">
              <div className="w-14 h-14 rounded-2xl bg-primary-500 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <Globe size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">Global Network</h3>
              <p className="text-muted-foreground leading-relaxed">Tailored lending solutions specifically for residents of the United States, Canada, and India.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-primary-600 to-primary-900 text-white relative overflow-hidden text-center shadow-2xl shadow-primary-500/40">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold font-outfit mb-8">Ready to apply?</h2>
              <p className="text-primary-100 text-lg md:text-xl mb-12 max-w-xl mx-auto">
                Join thousands of satisfied borrowers. The application only takes a few minutes.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  href="/apply"
                  className="bg-white text-primary-900 px-10 py-5 rounded-full text-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                  Apply for a Loan
                </Link>
                <div className="flex items-center gap-4 text-sm font-medium tracking-wide">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-primary-700 bg-primary-800 flex items-center justify-center overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover opacity-50" />
                      </div>
                    ))}
                  </div>
                  4.8/5 Customer Rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Disclosure Footer Link Reminder */}
      <div className="pb-12 text-center text-[10px] text-muted-foreground opacity-50 px-4">
        * Loans are subject to credit approval. Eligibility requirements and terms vary by region. All information is encrypted.
      </div>
    </div>
  );
}
