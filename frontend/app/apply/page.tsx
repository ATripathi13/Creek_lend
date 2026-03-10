"use client";
import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    IdCard,
    Briefcase,
    Landmark,
    CheckCircle2,
    ArrowLeft,
    ArrowRight,
    ShieldCheck,
    Lock
} from "lucide-react";

// --- Form Schemas ---
const stepSchemas = [
    z.object({
        firstName: z.string().min(2, "First name is required"),
        lastName: z.string().min(2, "Last name is required"),
        email: z.string().email("Invalid email address"),
        phone: z.string().min(10, "Valid phone number is required"),
        loanAmount: z.number().min(500, "Minimum loan is $500").max(50000, "Maximum loan is $50,000"),
    }),
    z.object({
        ssn: z.string().regex(/^\d{3}-\d{2}-\d{4}$/, "Format: XXX-XX-XXXX"),
        dob: z.string().min(10, "Date of birth is required"),
        dlState: z.string().length(2, "2-letter state code"),
        dlNumber: z.string().min(5, "Driver's license number is required"),
    }),
    z.object({
        employerName: z.string().min(2, "Employer name is required"),
        monthlyIncome: z.number().min(1000, "Minimum monthly income is $1,000"),
        incomeFrequency: z.enum(["WEEKLY", "BI_WEEKLY", "MONTHLY"]),
    }),
    z.object({
        routingNumber: z.string().length(9, "Routing number must be 9 digits"),
        accountNumber: z.string().min(4, "Account number is required"),
        bankName: z.string().min(2, "Bank name is required"),
    }),
    z.object({
        tcpaConsent: z.boolean().refine(val => val === true, "You must agree to the terms"),
        trustedFormCert: z.string().optional(),
        jornayaLeadId: z.string().optional(),
    }),
];

const totalSteps = stepSchemas.length;

export default function ApplyPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Initialize Form
    const methods = useForm({
        resolver: zodResolver(stepSchemas[currentStep]),
        mode: "onChange",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            loanAmount: 5000,
            ssn: "",
            dob: "",
            dlState: "",
            dlNumber: "",
            employerName: "",
            monthlyIncome: 3000,
            incomeFrequency: "MONTHLY",
            routingNumber: "",
            accountNumber: "",
            bankName: "",
            tcpaConsent: false,
        }
    });

    const { handleSubmit, trigger, watch, setValue } = methods;

    // Persist State (Basic Draft Logic)
    useEffect(() => {
        const saved = localStorage.getItem("creek_lend_draft");
        if (saved) {
            const data = JSON.parse(saved);
            Object.keys(data).forEach(key => setValue(key as any, data[key]));
        }
    }, [setValue]);

    useEffect(() => {
        const subscription = watch((value) => {
            localStorage.setItem("creek_lend_draft", JSON.stringify(value));
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    // Handlers
    const nextStep = async () => {
        const isValid = await trigger();
        if (isValid && currentStep < totalSteps - 1) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        // Simulate API call
        console.log("Submitting application:", data);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setSubmitted(true);
        localStorage.removeItem("creek_lend_draft");
    };

    if (submitted) {
        return (
            <div className="container mx-auto px-4 py-32 text-center max-w-xl">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={48} />
                    </div>
                    <h1 className="text-4xl font-bold font-outfit mb-4">Application Received!</h1>
                    <p className="text-muted-foreground mb-8">
                        Thank you for choosing Creek Lend. Our team is reviewing your information. You will receive an update via email shortly.
                    </p>
                    <a href="/" className="inline-block bg-primary-600 text-white px-8 py-3 rounded-full font-bold">Return Home</a>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-muted/30 pt-12 pb-24">
            <div className="container mx-auto px-4 max-w-2xl">
                {/* Progress Header */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold font-outfit">Loan Application</h1>
                        <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                            Step {currentStep + 1} of {totalSteps}
                        </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden flex gap-1">
                        {Array.from({ length: totalSteps }).map((_, i) => (
                            <div
                                key={i}
                                className={`flex-1 h-full transition-all duration-500 rounded-full ${i <= currentStep ? "bg-primary-600 shadow-[0_0_10px_rgba(var(--primary),0.3)]" : ""
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-background rounded-[2.5rem] p-8 md:p-12 border shadow-2xl shadow-primary-500/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                        <ShieldCheck size={120} />
                    </div>

                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Step 1: Basics */}
                                    {currentStep === 0 && <StepBasics />}
                                    {/* Step 2: ID */}
                                    {currentStep === 1 && <StepIdentification />}
                                    {/* Step 3: Employment */}
                                    {currentStep === 2 && <StepEmployment />}
                                    {/* Step 4: Banking */}
                                    {currentStep === 3 && <StepBanking />}
                                    {/* Step 5: Consent */}
                                    {currentStep === 4 && <StepConsent />}
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation */}
                            <div className="pt-8 border-t flex flex-col sm:flex-row gap-4">
                                {currentStep > 0 && (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="flex-1 px-8 py-4 rounded-2xl border font-bold flex items-center justify-center gap-2 hover:bg-muted/50 transition-all"
                                    >
                                        <ArrowLeft size={18} />
                                        Back
                                    </button>
                                )}
                                {currentStep < totalSteps - 1 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="flex-[2] bg-primary-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20"
                                    >
                                        Continue
                                        <ArrowRight size={18} />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-[2] bg-primary-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20 disabled:opacity-50"
                                    >
                                        {isSubmitting ? "Processing..." : "Submit Application"}
                                        <ShieldCheck size={18} />
                                    </button>
                                )}
                            </div>
                        </form>
                    </FormProvider>

                    <div className="mt-8 flex items-center justify-center gap-4 text-[10px] text-muted-foreground uppercase font-bold tracking-widest opacity-60">
                        <div className="flex items-center gap-1"><Lock size={12} /> SSL SECURE</div>
                        <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                        <div>256-BIT ENCRYPTION</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Step Components ---

function FormField({ label, name, type = "text", placeholder, children }: any) {
    const { register, formState: { errors } } = useFormContext();
    const error = (errors as any)[name];

    return (
        <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">{label}</label>
            {children ? children : (
                <input
                    {...register(name, { valueAsNumber: type === "number" })}
                    type={type}
                    placeholder={placeholder}
                    className={`w-full px-5 py-4 rounded-2xl bg-muted/30 border focus:ring-2 focus:ring-primary-600 outline-none transition-all ${error ? "border-destructive ring-destructive/20 ring-1" : ""
                        }`}
                />
            )}
            {error && <p className="text-[10px] font-bold text-destructive uppercase tracking-wide mt-1 ml-1">{error.message}</p>}
        </div>
    );
}

import { useFormContext } from "react-hook-form";

function StepBasics() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center"><User size={24} /></div>
                <div>
                    <h2 className="text-xl font-bold">Personal Basics</h2>
                    <p className="text-xs text-muted-foreground">Tell us a little bit about yourself.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField label="First Name" name="firstName" placeholder="John" />
                <FormField label="Last Name" name="lastName" placeholder="Doe" />
            </div>
            <FormField label="Email Address" name="email" type="email" placeholder="john@example.com" />
            <FormField label="Mobile Phone" name="phone" placeholder="(555) 000-0000" />
            <FormField label="Requested Loan Amount ($)" name="loanAmount" type="number" />
        </div>
    );
}

function StepIdentification() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center"><IdCard size={24} /></div>
                <div>
                    <h2 className="text-xl font-bold">Identification</h2>
                    <p className="text-xs text-muted-foreground">Secure verification of your identity.</p>
                </div>
            </div>
            <FormField label="SSN / National ID" name="ssn" placeholder="XXX-XX-XXXX" />
            <FormField label="Date of Birth" name="dob" type="date" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="col-span-1"><FormField label="DL State" name="dlState" placeholder="NY" /></div>
                <div className="col-span-2"><FormField label="DL Number" name="dlNumber" placeholder="DL-00000000" /></div>
            </div>
        </div>
    );
}

function StepEmployment() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center"><Briefcase size={24} /></div>
                <div>
                    <h2 className="text-xl font-bold">Employment</h2>
                    <p className="text-xs text-muted-foreground">Information about your source of income.</p>
                </div>
            </div>
            <FormField label="Employer Name" name="employerName" placeholder="Acme Corp" />
            <FormField label="Gross Monthly Income ($)" name="monthlyIncome" type="number" />
            <FormField label="Pay Frequency" name="incomeFrequency">
                <select {...useFormContext().register("incomeFrequency")} className="w-full px-5 py-4 rounded-2xl bg-muted/30 border focus:ring-2 focus:ring-primary-600 outline-none transition-all appearance-none cursor-pointer">
                    <option value="WEEKLY">Weekly</option>
                    <option value="BI_WEEKLY">Bi-Weekly</option>
                    <option value="MONTHLY">Monthly</option>
                </select>
            </FormField>
        </div>
    );
}

function StepBanking() {
    const { register, watch, setValue, formState: { errors } } = useFormContext();
    const routing = watch("routingNumber");

    useEffect(() => {
        if (routing?.length === 9) {
            // Simulate bank lookup proxy call
            setValue("bankName", "CHASE BANK - SIMULATED");
        }
    }, [routing, setValue]);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center"><Landmark size={24} /></div>
                <div>
                    <h2 className="text-xl font-bold">Banking</h2>
                    <p className="text-xs text-muted-foreground">Where would you like your funds deposited?</p>
                </div>
            </div>
            <FormField label="Routing Number (9 Digits)" name="routingNumber" placeholder="123456789" />
            <FormField label="Bank Name" name="bankName" placeholder="Bank Name Auto-Filled" />
            <FormField label="Account Number" name="accountNumber" placeholder="000000000000" />
        </div>
    );
}

function StepConsent() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center"><ShieldCheck size={24} /></div>
                <div>
                    <h2 className="text-xl font-bold">Review & Consent</h2>
                    <p className="text-xs text-muted-foreground">Final step to secure your loan offer.</p>
                </div>
            </div>

            <div className="p-6 rounded-2xl bg-muted/50 border text-[10px] leading-relaxed text-muted-foreground">
                By checking the box below, you consent to receive marketing emails, calls, and text messages from Creek Lend and its partners at the number provided above. You understand that consent is not a condition of purchase and that msg/data rates may apply. You also agree to our <a href="/legal/privacy-policy" className="underline text-primary-600">Privacy Policy</a> and <a href="/legal/terms-of-service" className="underline text-primary-600">Terms of Service</a>.
            </div>

            <div className="flex gap-4 items-start p-4 hover:bg-muted/30 rounded-2xl transition-all cursor-pointer">
                <input
                    {...useFormContext().register("tcpaConsent")}
                    type="checkbox"
                    id="tcpaConsent"
                    className="w-6 h-6 rounded-lg border-primary-600 text-primary-600 focus:ring-primary-600 mt-1 cursor-pointer"
                />
                <label htmlFor="tcpaConsent" className="text-xs font-medium cursor-pointer">
                    I agree to the TCPA consent, Privacy Policy, and Terms of Service. I certify that all information provided is accurate.
                </label>
            </div>
            {(useFormContext().formState.errors as any).tcpaConsent && (
                <p className="text-[10px] font-bold text-destructive uppercase tracking-wide mt-1 ml-1">
                    {(useFormContext().formState.errors as any).tcpaConsent.message}
                </p>
            )}
        </div>
    );
}
