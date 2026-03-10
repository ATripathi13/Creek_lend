import { Scale } from "lucide-react";

export default function FairLending() {
    return (
        <div className="py-24 container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary-600 text-white flex items-center justify-center">
                    <Scale size={28} />
                </div>
                <h1 className="text-4xl font-bold font-outfit">Fair Lending Policy</h1>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">Our Commitment</h2>
                    <p>
                        Creek Lend is committed to providing fair and equitable access to credit for all eligible applicants. We do not discriminate on the basis of race, color, religion, national origin, sex, marital status, age, or because an applicant receives income from any public assistance program.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">Underwriting Transparency</h2>
                    <p>
                        Our automated underwriting system uses objective credit and financial data to make lending decisions. We regularly audit our algorithms to ensure they are free from bias and comply with the Equal Credit Opportunity Act (ECOA) and other regional fair lending laws in the US, Canada, and India.
                    </p>
                </section>
            </div>
        </div>
    );
}
