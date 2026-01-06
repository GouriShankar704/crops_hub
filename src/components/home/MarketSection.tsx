import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, MapPin, ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const initialMarketData = [
  {
    crop: "Wheat",
    image: "🌾",
    currentPrice: 2450,
    change: 2.5,
    location: "Indore Mandi",
    quantity: "1,234 Qtl",
    demand: "High",
  },
  {
    crop: "Rice (Basmati)",
    image: "🍚",
    currentPrice: 3200,
    change: 1.8,
    location: "Delhi NCR",
    quantity: "856 Qtl",
    demand: "Very High",
  },
  {
    crop: "Cotton",
    image: "🏵️",
    currentPrice: 6800,
    change: -0.5,
    location: "Gujarat",
    quantity: "2,100 Qtl",
    demand: "Medium",
  },
  {
    crop: "Soybean",
    image: "🫘",
    currentPrice: 4150,
    change: 3.2,
    location: "MP State",
    quantity: "945 Qtl",
    demand: "High",
  },
];

const trendingCrops = [
  { name: "Organic Vegetables", growth: "+45%", buyers: 234 },
  { name: "Pulses", growth: "+32%", buyers: 189 },
  { name: "Spices", growth: "+28%", buyers: 156 },
  { name: "Fruits", growth: "+25%", buyers: 198 },
];

export const MarketSection = () => {
  const [items, setItems] = useState(initialMarketData);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const updatedItems = items.map((item) => {
        const fluctuation = (Math.random() * 4) - 2;
        const newPrice = Math.round(item.currentPrice * (1 + fluctuation / 100));
        const newChange = parseFloat((item.change + (fluctuation / 2)).toFixed(1));
        return {
          ...item,
          currentPrice: newPrice,
          change: newChange,
        };
      });
      setItems(updatedItems);
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <section className="py-20 lg:py-32 bg-muted/30" id="marketplace">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary text-sm font-semibold rounded-full">
                Live Market
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="text-muted-foreground hover:text-primary h-8"
              >
                <RefreshCw className={`w-3.5 h-3.5 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
              Today's <span className="text-gradient-gold">Crop Prices</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Real-time prices from major mandis across India
            </p>
          </div>
          <Button variant="outline" size="lg" className="w-fit">
            View All Markets
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Price Cards */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {items.map((item, index) => (
              <motion.div
                key={item.crop}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-5 border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{item.image}</span>
                    <div>
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                        {item.crop}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.demand === "Very High"
                        ? "bg-success/10 text-success"
                        : item.demand === "High"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {item.demand}
                  </span>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      ₹{item.currentPrice.toLocaleString()}
                      <span className="text-sm font-normal text-muted-foreground">
                        /qtl
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Available: {item.quantity}
                    </p>
                  </div>
                  <div
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full ${
                      item.change >= 0
                        ? "bg-success/10 text-success"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {item.change >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span className="font-semibold text-sm">
                      {item.change > 0 ? "+" : ""}
                      {item.change}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trending Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl border border-border p-6"
          >
            <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Trending Categories
            </h3>
            <div className="space-y-4">
              {trendingCrops.map((crop, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors cursor-pointer"
                >
                  <div>
                    <p className="font-medium text-foreground">{crop.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {crop.buyers} buyers looking
                    </p>
                  </div>
                  <span className="text-success font-bold">{crop.growth}</span>
                </div>
              ))}
            </div>

            <Button className="w-full mt-6" variant="gold">
              List Your Crop
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
