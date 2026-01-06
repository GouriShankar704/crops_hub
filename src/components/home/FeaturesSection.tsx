import { motion } from "framer-motion";
import {
  Sprout,
  TrendingUp,
  MessageSquare,
  CloudSun,
  ShoppingCart,
  FileCheck,
  Users,
  Brain,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Crop Advisor",
    description: "Get personalized farming recommendations powered by artificial intelligence.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: TrendingUp,
    title: "Live Market Prices",
    description: "Real-time mandi prices from across the country to sell at the best rates.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: CloudSun,
    title: "Weather Alerts",
    description: "Accurate weather forecasts and alerts to protect your crops.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Sprout,
    title: "Crop Health Monitor",
    description: "Upload crop photos for instant AI-powered disease detection.",
    color: "bg-success/10 text-success",
  },
  {
    icon: ShoppingCart,
    title: "Direct Marketplace",
    description: "Connect directly with buyers and get fair prices without middlemen.",
    color: "bg-warning/10 text-warning",
  },
  {
    icon: FileCheck,
    title: "Govt. Schemes",
    description: "Find eligible schemes and get step-by-step application guidance.",
    color: "bg-info/10 text-info",
  },
  {
    icon: MessageSquare,
    title: "Expert Answers",
    description: "Ask questions and get answers from verified agriculture experts.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Users,
    title: "Farmer Community",
    description: "Join groups, share experiences, and learn from fellow farmers.",
    color: "bg-secondary/10 text-secondary",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-muted/30" id="features">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything You Need to
            <span className="text-gradient-primary"> Farm Better</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From AI-powered advice to direct market access, we've built the complete
            toolkit for modern Indian farmers.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-6 border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300 cursor-pointer"
            >
              <div
                className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
