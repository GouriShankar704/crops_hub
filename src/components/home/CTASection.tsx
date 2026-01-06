import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Bell, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="py-20 lg:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl gradient-hero"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 right-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-foreground/10 text-primary-foreground text-sm font-medium rounded-full mb-6">
                    <Bell className="w-4 h-4" />
                    Start Today - It's Free!
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6"
                >
                  Ready to Transform
                  <span className="block text-secondary mt-2">
                    Your Farming?
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-lg text-primary-foreground/80 mb-8 max-w-md mx-auto lg:mx-0"
                >
                  Join thousands of farmers already using AgroConnect AI to grow
                  smarter, sell better, and increase their income.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <Button variant="gold" size="xl" className="group">
                    <Smartphone className="w-5 h-5" />
                    Download App
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button variant="heroOutline" size="xl">
                    <Leaf className="w-5 h-5" />
                    Use Web Version
                  </Button>
                </motion.div>

                {/* Trust Badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 pt-8 border-t border-primary-foreground/10"
                >
                  <p className="text-sm text-primary-foreground/60 mb-4">
                    Trusted by farmers in 15+ states
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                    {["4.8★ Rating", "50K+ Users", "100% Free", "Hindi Support"].map(
                      (badge, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-primary-foreground/10 rounded-full text-sm text-primary-foreground"
                        >
                          {badge}
                        </span>
                      )
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Right - Phone Mockup */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="hidden lg:flex justify-center"
              >
                <div className="relative">
                  {/* Phone Frame */}
                  <div className="w-72 h-[580px] bg-foreground rounded-[3rem] p-3 shadow-2xl">
                    <div className="w-full h-full bg-card rounded-[2.5rem] overflow-hidden">
                      {/* Phone Screen */}
                      <div className="h-full flex flex-col">
                        {/* Status Bar */}
                        <div className="h-8 bg-primary flex items-center justify-center">
                          <div className="w-20 h-5 bg-foreground/20 rounded-full" />
                        </div>

                        {/* App Content */}
                        <div className="flex-1 p-4 space-y-4 bg-background">
                          {/* Header */}
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                              <Leaf className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-foreground">
                                Good Morning! 🌅
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Rajesh Kumar
                              </p>
                            </div>
                          </div>

                          {/* Weather */}
                          <div className="bg-accent/10 rounded-xl p-3 flex items-center justify-between">
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Weather
                              </p>
                              <p className="font-bold text-foreground">28°C</p>
                            </div>
                            <span className="text-3xl">☀️</span>
                          </div>

                          {/* Crop Card */}
                          <div className="bg-success/10 rounded-xl p-3">
                            <p className="text-xs text-muted-foreground">
                              Your Wheat
                            </p>
                            <p className="font-bold text-foreground">
                              Ready to Harvest 🌾
                            </p>
                          </div>

                          {/* Price Alert */}
                          <div className="bg-secondary/10 rounded-xl p-3">
                            <p className="text-xs text-muted-foreground">
                              Price Alert
                            </p>
                            <p className="font-bold text-foreground">
                              ₹2,450/qtl ↑
                            </p>
                          </div>

                          {/* AI Tip */}
                          <div className="bg-primary/10 rounded-xl p-3 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                              <span className="text-xs text-primary-foreground">
                                AI
                              </span>
                            </div>
                            <p className="text-xs text-foreground flex-1">
                              Best time to sell wheat this week!
                            </p>
                          </div>
                        </div>

                        {/* Bottom Nav */}
                        <div className="h-16 bg-card border-t border-border flex items-center justify-around px-4">
                          {["🏠", "📊", "➕", "💬", "👤"].map((icon, i) => (
                            <div
                              key={i}
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                                i === 0 ? "bg-primary/10" : ""
                              }`}
                            >
                              {icon}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Badge */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-xl shadow-gold font-bold"
                  >
                    Free! 🎉
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
