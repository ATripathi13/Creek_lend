import { FileText } from "lucide-react";

export default function TermsOfService() {
    return (
        <div className="py-24 container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary-600 text-white flex items-center justify-center">
                    <FileText size={28} />
                </div>
                <h1 className="text-4xl font-bold font-outfit">Terms of Service</h1>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
                <p className="font-semibold text-foreground">By accessing or using Creek Lend, you agree to be bound by these Terms of Service.</p>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">1. Eligibility</h2>
                    <p>
                        You must be at least 18 years old and a resident of the United States, Canada, or India to use our lending services. You represent that the information you provide is accurate and complete.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">2. Loan Applications</h2>
                    <p>
                        Submitting an application does not guarantee approval. Creek Lend reserves the right to decline any application based on internal underwriting criteria. All loan terms will be provided in a final loan agreement if approved.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">3. Prohibited Use</h2>
                    <p>
                        You may not use our services for any illegal activities, including money laundering or financing terrorism. Unauthorized access to our systems is strictly prohibited.
                    </p>
                </section>
            </div>
        </div>
    );
}
