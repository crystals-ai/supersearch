import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";

const API = `/api`;

const INITIAL = { name: "", company: "", email: "", message: "" };

export const Contact = () => {
  const [form, setForm] = useState(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setField = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.company || !form.email || !form.message) {
      toast.error("Please fill in every field so we can reach out properly.");
      return;
    }
    setSubmitting(true);
    try {
      const { data } = await axios.post(`${API}/contact`, form);
      setSubmitted(true);
      toast.success(data.message || "Thanks — we'll be in touch shortly.");
      setForm(INITIAL);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(
        typeof detail === "string"
          ? detail
          : "Something went wrong. Please try again in a moment."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-[#F3F1ED]"
      data-testid="contact-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.22em] text-[#6B6A68] mb-6">
              Most competitive pricing on the market.
            </div>
            <h2 className="font-serif-display text-4xl md:text-6xl font-light tracking-tight leading-[1.02] text-[#111] mb-8">
              Let's put a conversation<br />
              <span className="italic">on your storefront.</span>
            </h2>
            <p className="text-[#6B6A68] leading-relaxed mb-10 max-w-md">
              Tell us about your catalog and your customers. We'll come back
              within 24 hours with a tailored demo and a pricing plan that
              undercuts anything you've been quoted.
            </p>

            <div className="border-t border-[#E2DFD9] pt-8 space-y-3 text-sm text-[#6B6A68]">
              <div className="flex items-baseline gap-3">
                <span className="text-[#C4A484]">✦</span>
                <span>Deploy in under 2 weeks.</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-[#C4A484]">✦</span>
                <span>Pilot pricing for the first 3 months.</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-[#C4A484]">✦</span>
                <span>No rip-and-replace. Plugs into your stack.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={onSubmit}
              className="bg-[#FDFCFB] border border-[#E2DFD9] p-8 md:p-12"
              data-testid="contact-form"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Field
                  label="Your name"
                  testid="contact-input-name"
                  value={form.name}
                  onChange={setField("name")}
                  placeholder="Aarav Mehta"
                />
                <Field
                  label="Company"
                  testid="contact-input-company"
                  value={form.company}
                  onChange={setField("company")}
                  placeholder="House of Masaba"
                />
              </div>
              <div className="mb-6">
                <Field
                  label="Work email"
                  testid="contact-input-email"
                  type="email"
                  value={form.email}
                  onChange={setField("email")}
                  placeholder="aarav@yourbrand.com"
                />
              </div>
              <div className="mb-8">
                <label className="block text-xs uppercase tracking-[0.2em] text-[#6B6A68] mb-3">
                  Tell us about your catalog
                </label>
                <textarea
                  data-testid="contact-input-message"
                  value={form.message}
                  onChange={setField("message")}
                  rows={5}
                  placeholder="We have ~12,000 SKUs across apparel & jewellery, selling on Shopify. Would love to explore a pilot."
                  className="w-full bg-transparent border-b border-[#111] px-0 py-3 text-[#111] placeholder:text-[#6B6A68]/60 focus:outline-none focus:border-b-[#C4A484] transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-6">
                <div className="text-xs text-[#6B6A68]">
                  By submitting, you agree to be contacted by our team.
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  data-testid="contact-submit"
                  className="group inline-flex items-center gap-3 bg-[#111] text-white px-8 py-4 text-xs uppercase tracking-[0.22em] hover:bg-[#333] transition-colors disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending…
                    </>
                  ) : submitted ? (
                    <>Sent — thank you</>
                  ) : (
                    <>
                      Request a Demo
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, testid, value, onChange, type = "text", placeholder }) => (
  <div>
    <label className="block text-xs uppercase tracking-[0.2em] text-[#6B6A68] mb-3">
      {label}
    </label>
    <input
      data-testid={testid}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-transparent border-b border-[#111] px-0 py-3 text-[#111] placeholder:text-[#6B6A68]/60 focus:outline-none focus:border-b-[#C4A484] transition-colors"
    />
  </div>
);

export default Contact;
