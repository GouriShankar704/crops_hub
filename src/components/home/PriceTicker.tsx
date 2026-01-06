import { TrendingUp, TrendingDown } from "lucide-react";

const priceData = [
  { crop: "Wheat", price: "₹2,450", change: "+2.5%", up: true, unit: "/quintal" },
  { crop: "Rice", price: "₹3,200", change: "+1.2%", up: true, unit: "/quintal" },
  { crop: "Cotton", price: "₹6,800", change: "-0.8%", up: false, unit: "/quintal" },
  { crop: "Soybean", price: "₹4,150", change: "+3.1%", up: true, unit: "/quintal" },
  { crop: "Maize", price: "₹1,950", change: "-1.5%", up: false, unit: "/quintal" },
  { crop: "Groundnut", price: "₹5,400", change: "+0.9%", up: true, unit: "/quintal" },
  { crop: "Sugarcane", price: "₹350", change: "+0.5%", up: true, unit: "/quintal" },
  { crop: "Mustard", price: "₹5,100", change: "-0.3%", up: false, unit: "/quintal" },
];

export const PriceTicker = () => {
  return (
    <div className="w-full bg-primary/5 border-y border-primary/10 py-3 overflow-hidden">
      <div className="flex animate-ticker">
        {[...priceData, ...priceData].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-6 border-r border-primary/10 whitespace-nowrap"
          >
            <span className="font-semibold text-foreground">{item.crop}</span>
            <span className="text-lg font-bold text-primary">{item.price}</span>
            <span className="text-xs text-muted-foreground">{item.unit}</span>
            <span
              className={`flex items-center gap-1 text-sm font-medium ${
                item.up ? "text-success" : "text-destructive"
              }`}
            >
              {item.up ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
