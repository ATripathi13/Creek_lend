import { MessageSquare, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
    return (
        <div className="py-24 container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-20">
                <h1 className="text-4xl md:text-6xl font-bold font-outfit mb-6">Contact Us</h1>
                <p className="text-xl text-muted-foreground">Have questions? Our support team is here to help you navigate your lending journey.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
                {/* Contact Info */}
                <div className="space-y-12">
                    <div className="flex gap-6 items-start">
                        <div className="w-14 h-14 rounded-2xl bg-primary-600 text-white flex items-center justify-center shrink-0 shadow-lg">
                            <MessageSquare size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Email Support</h3>
                            <p className="text-muted-foreground mb-1">General Inquiries: hello@creeklend.com</p>
                            <p className="text-muted-foreground">Support: support@creeklend.com</p>
                        </div>
                    </div>
                    <div className="flex gap-6 items-start">
                        <div className="w-14 h-14 rounded-2xl bg-primary-600 text-white flex items-center justify-center shrink-0 shadow-lg">
                            <Phone size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Call Us</h3>
                            <p className="text-muted-foreground mb-1">US/CA: +1 (800) 555-CREEK</p>
                            <p className="text-muted-foreground">India: +91 1800 555 CREEK</p>
                            <p className="text-xs text-primary-600 font-bold mt-2 tracking-wide uppercase">Mon-Fri 9am-6pm EST</p>
                        </div>
                    </div>
                    <div className="flex gap-6 items-start">
                        <div className="w-14 h-14 rounded-2xl bg-primary-600 text-white flex items-center justify-center shrink-0 shadow-lg">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Our Locations</h3>
                            <p className="text-muted-foreground">Distributed Headquarters: New York | Toronto | New Delhi</p>
                        </div>
                    </div>
                </div>

                {/* Form Placeholder */}
                <div className="p-8 md:p-12 rounded-[3rem] glass border-2 shadow-2xl relative">
                    <div className="absolute top-0 right-0 p-4 -mr-4 -mt-4">
                        <div className="bg-secondary-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Inquiry Form</div>
                    </div>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider opacity-60 ml-1">Full Name</label>
                                <input type="text" className="w-full px-5 py-4 rounded-2xl bg-background border focus:ring-2 focus:ring-primary-600 outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider opacity-60 ml-1">Email Address</label>
                                <input type="email" className="w-full px-5 py-4 rounded-2xl bg-background border focus:ring-2 focus:ring-primary-600 outline-none transition-all" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider opacity-60 ml-1">How can we help?</label>
                            <textarea rows={4} className="w-full px-5 py-4 rounded-2xl bg-background border focus:ring-2 focus:ring-primary-600 outline-none transition-all"></textarea>
                        </div>
                        <button className="w-full bg-primary-600 text-white py-5 rounded-2xl font-bold hover:bg-primary-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary-500/20">
                            <Send size={18} />
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
