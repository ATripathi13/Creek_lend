import { Info, AlertTriangle } from "lucide-react";

export default function DirectLenderDisclosure() {
    return (
        <div className="py-24 container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-secondary-500 text-white flex items-center justify-center">
                    <Info size={28} />
                </div>
                <h1 className="text-4xl font-bold font-outfit">Direct Lender Disclosure</h1>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
                <div className="p-8 rounded-3xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30">
                    <div className="flex gap-4">
                        <AlertTriangle className="text-amber-600 shrink-0" size={24} />
                        <p className="text-amber-900 dark:text-amber-200 text-sm font-medium">
                            IMPORTANT: Please read this disclosure in its entirety before submitting your application.
                        </p>
                    </div>
                </div>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">Direct Lending Roles</h2>
                    <p>
                        Creek Lend operates as a direct lender. This means that we originate, fund, and service the loans offered through our platform. We are not a lead generator or a broker for third-party lenders, except where explicitly stated for specific secondary financial products.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">Regional Availability</h2>
                    <p>
                        Lending services are only available to verified residents of the United States, Canada, and India. Our platform employs geofencing technology. If you are accessing this site from outside these regions, your application will be automatically rejected or blocked.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">Credit Reporting</h2>
                    <p>
                        By submitting an application, you authorize Creek Lend to obtain credit reports and verify your identity and income. Late payments or defaults may be reported to major credit bureaus, which could negatively impact your credit profile.
                    </p>
                </section>

                <div className="border-t pt-8 text-[10px] uppercase tracking-widest opacity-60">
                    Creek Lend &copy; {new Date().getFullYear()} | Fair Lending Equitability Act compliant.
                </div>
            </div>
        </div>
    );
}
