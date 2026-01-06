import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PriceTicker } from "@/components/home/PriceTicker";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { AIAssistant } from "@/components/home/AIAssistant";
import { MarketSection } from "@/components/home/MarketSection";
import { WeatherWidget } from "@/components/home/WeatherWidget";
import { CommunitySection } from "@/components/home/CommunitySection";
import { SchemesSection } from "@/components/home/SchemesSection";
import { ContactSection } from "@/components/home/ContactSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 md:pt-20">
        {/* Price Ticker */}
        <PriceTicker />
        
        {/* Hero Section */}
        <HeroSection />
        
        {/* Features */}
        <FeaturesSection />
        
        {/* AI Assistant */}
        <AIAssistant />
        
        {/* Market Section */}
        <MarketSection />
        
        {/* Weather Widget */}
        <WeatherWidget />
        
        {/* Community */}
        <CommunitySection />
        
        {/* Government Schemes */}
        <SchemesSection />
        
        {/* Contact */}
        <ContactSection />
        
        {/* CTA Section */}
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
