import { Info, Check, ShieldCheck } from "lucide-react";

export default function RatesAndFees() {
    return (
        <div className="py-24 container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold font-outfit mb-6">Rates & Fees</h1>
                <p className="text-xl text-muted-foreground">Transparent lending terms designed with honesty and clarity in mind.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 max-w-6xl mx-auto">
                <div className="p-10 rounded-[3rem] bg-background border shadow-xl">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        Pricing Overview
                        <Info size={18} className="text-primary-600" />
                    </h2>
                    <div className="space-y-8">
                        <div className="flex justify-between items-end border-b pb-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">APR Range</p>
                                <p className="text-4xl font-bold font-outfit mt-1">5.99% - 35.99%</p>
                            </div>
                            <p className="text-xs text-muted-foreground">*Subject to credit profile</p>
                        </div>
                        <div className="flex justify-between items-end border-b pb-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Loan Terms</p>
                                <p className="text-4xl font-bold font-outfit mt-1">12 - 72 Months</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-end border-b pb-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Origination Fee</p>
                                <p className="text-4xl font-bold font-outfit mt-1">0% - 5%</p>
                            </div>
                            <p className="text-xs text-muted-foreground">Varies by loan type</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center space-y-8">
                    <div className="p-8 rounded-3xl glass">
                        <h3 className="text-xl font-bold mb-4">No Hidden Junk Fees</h3>
                        <p className="text-muted-foreground">We don't charge application fees, prepayment penalties, or unexpected processing surcharges. You only pay what's in your loan agreement.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-primary-600 text-white shadow-xl shadow-primary-500/20">
                        <h3 className="text-xl font-bold mb-4">Secure & Confidential</h3>
                        <p className="text-primary-100">Your financial information is stored with bank-grade AES-256 encryption. We never sell your personal data to non-affiliated third parties without consent.</p>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto bg-muted/50 p-12 rounded-[3rem] border">
                <h3 className="font-bold text-center mb-8 text-2xl flex items-center justify-center gap-3">
                    <ShieldCheck size={28} className="text-primary-600" />
                    Direct Lender Commitment
                </h3>
                <p className="text-sm text-center leading-relaxed text-muted-foreground">
                    Creek Lend is a direct lender. All loan applications are processed internally. Rates, fees, and terms are disclosed upfront in compliance with the Truth in Lending Act (TILA). Defaulting on a loan may negatively impact your credit score and result in collection activity as permitted by law.
                </p>
            </div>
        </div>
    );
}
