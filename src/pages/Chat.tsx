import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AIAssistant } from "@/components/home/AIAssistant";

const Chat = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16 md:pt-20">
        <section className="py-20 lg:py-28">
          <div className="container">
            <AIAssistant />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Chat;
