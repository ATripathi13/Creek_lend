import { ShieldCheck, FileText } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <div className="py-24 container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary-600 text-white flex items-center justify-center">
                    <ShieldCheck size={28} />
                </div>
                <h1 className="text-4xl font-bold font-outfit">Privacy Policy</h1>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
                <p className="font-semibold text-foreground italic">Last Updated: {new Date().toLocaleDateString()}</p>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                    <p>
                        At Creek Lend, we respect your privacy and are committed to protecting your personally identifiable information (PII). This Privacy Policy explains how we collect, use, and share information about you when you use our website or services in the US, Canada, and India.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
                    <p>We collect information you provide directly to us, including:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Personal details (Name, Address, DOB)</li>
                        <li>Government-issued identifiers (SSN, DL Number)</li>
                        <li>Employment and financial information</li>
                        <li>Bank account details for fund disbursement</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">3. Security</h2>
                    <p>
                        We implement military-grade AES-256 encryption for all sensitive data at rest and TLS 1.3 for data in transit. We maintain strict access controls to ensure that your financial data is only accessible to authorized systems and personnel.
                    </p>
                </section>

                <div className="bg-muted p-8 rounded-3xl border text-sm italic">
                    Disclaimer: This is a placeholder privacy policy for the Creek Lend architecture demonstration. In a production environment, this document must be reviewed by legal counsel to ensure compliance with CCPA, PIPEDA, and local Indian data protection laws.
                </div>
            </div>
        </div>
    );
}
