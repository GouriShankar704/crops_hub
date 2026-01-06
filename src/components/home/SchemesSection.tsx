import { motion } from "framer-motion";
import { FileCheck, ArrowRight, Clock, CheckCircle2, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";

const schemes = [
  {
    name: "PM-KISAN",
    description: "Get ₹6,000 per year direct income support in 3 installments",
    amount: "₹6,000/year",
    eligibility: "All land-holding farmers",
    deadline: "Rolling",
    status: "active",
  },
  {
    name: "Kisan Credit Card",
    description: "Low-interest credit for crop cultivation and farm expenses",
    amount: "Up to ₹3 Lakh",
    eligibility: "Farmers, sharecroppers, tenants",
    deadline: "Open",
    status: "active",
  },
  {
    name: "PMFBY - Crop Insurance",
    description: "Protect your crops against natural calamities and weather risks",
    amount: "Full coverage",
    eligibility: "All farmers (loanee & non-loanee)",
    deadline: "15 Jan 2025",
    status: "closing",
  },
  {
    name: "Soil Health Card",
    description: "Get soil analysis and crop-wise nutrient recommendations",
    amount: "Free",
    eligibility: "All farmers",
    deadline: "Open",
    status: "active",
  },
];

export const SchemesSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-muted/30" id="schemes">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-info/10 text-info text-sm font-semibold rounded-full mb-4">
              <FileCheck className="w-4 h-4" />
              Government Schemes
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
              Benefits You <span className="text-accent">Deserve</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Check your eligibility and apply for government schemes
            </p>
          </div>
          <Button variant="outline" size="lg" className="w-fit">
            Check Eligibility
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

        {/* Schemes Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {schemes.map((scheme, index) => (
            <motion.div
              key={scheme.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                    {scheme.name}
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    {scheme.description}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${
                    scheme.status === "closing"
                      ? "bg-warning/10 text-warning"
                      : "bg-success/10 text-success"
                  }`}
                >
                  {scheme.status === "closing" ? (
                    <Clock className="w-3 h-3" />
                  ) : (
                    <CheckCircle2 className="w-3 h-3" />
                  )}
                  {scheme.status === "closing" ? "Closing Soon" : "Active"}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Benefit</p>
                  <p className="font-semibold text-primary flex items-center gap-1">
                    <IndianRupee className="w-4 h-4" />
                    {scheme.amount.replace("₹", "")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Eligibility</p>
                  <p className="font-medium text-foreground text-sm">
                    {scheme.eligibility}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Deadline</p>
                  <p className="font-medium text-foreground text-sm">
                    {scheme.deadline}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="default" className="flex-1">
                  Apply Now
                </Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
