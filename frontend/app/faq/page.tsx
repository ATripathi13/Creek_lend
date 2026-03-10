"use client";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "How long does the application process take?",
        answer: "The initial application takes less than 5 minutes to complete. Our automated decision engine provides an instant review. If approved, funds can be delivered as soon as the next business day."
    },
    {
        question: "Does applying affect my credit score?",
        answer: "Applying for a quote with Creek Lend uses a 'soft pull' of your credit report, which does not affect your credit score. Only after you accept a loan offer and we proceed with final verification may a 'hard pull' occur."
    },
    {
        question: "What are the interest rates at Creek Lend?",
        answer: "Our APRs range from 5.99% to 35.99%. Your specific rate depends on several factors, including your credit history, loan amount, and term length. We are a direct lender and disclose all rates upfront."
    },
    {
        question: "Can I pay off my loan early?",
        answer: "Absolutely! Creek Lend does not charge any prepayment penalties. You can pay off your loan in full or make extra payments at any time to save on interest."
    },
    {
        question: "Which countries do you serve?",
        answer: "We currently provide direct lending services to residents of the United States, Canada, and India. Our platform uses geofencing to ensure compliance with local regulations in these regions."
    }
];

export default function FAQ() {
    const [openIdx, setOpenIdx] = useState<number | null>(0);

    return (
        <div className="py-24 container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold font-outfit mb-6">Frequently Asked Questions</h1>
                <p className="text-xl text-muted-foreground">Find answers to common questions about our loan process and services.</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, idx) => (
                    <div key={idx} className="border rounded-3xl overflow-hidden glass shadow-sm">
                        <button
                            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                            className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-muted/50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 shrink-0">
                                    <HelpCircle size={18} />
                                </div>
                                <span className="font-bold text-lg md:text-xl font-outfit">{faq.question}</span>
                            </div>
                            <ChevronDown
                                size={24}
                                className={`text-muted-foreground transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`}
                            />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${openIdx === idx ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="px-14 pb-8 pt-0 text-muted-foreground leading-relaxed">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-20 bg-primary-900 text-white p-12 rounded-[3rem] text-center max-w-4xl mx-auto shadow-2xl">
                <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
                <p className="text-primary-200 mb-8">Can't find what you need? Our team is live and ready to assist you.</p>
                <a href="/contact" className="bg-white text-primary-900 px-8 py-4 rounded-full font-bold hover:scale-105 transition-all inline-block">
                    Contact Support
                </a>
            </div>
        </div>
    );
}
