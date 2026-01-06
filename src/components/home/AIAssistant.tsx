import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Mic, Sparkles, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const sampleQuestions = [
  "What fertilizer should I use for wheat?",
  "When is the best time to plant rice?",
  "How to control pests in cotton?",
  "Current mandi price for soybean?",
];

const sampleResponses = [
  {
    keywords: ["fertilizer", "nutrient", "npk", "urea"],
    answer:
      "For most cereal crops like wheat and rice, a balanced NPK ratio (4:2:1) is recommended. Apply 50% Nitrogen at sowing, and the rest in two splits. For pulses, reduce Nitrogen and increase Phosphorus.",
  },
  {
    keywords: ["pest", "insect", "bug", "worm"],
    answer:
      "To control pests effectively: 1. Identify the pest correctly. 2. Use pheromone traps for monitoring. 3. Apply Neem oil (5ml/liter) as a preventive measure. 4. Use specific chemical pesticides only if infestation crosses economic threshold levels.",
  },
  {
    keywords: ["wheat", "gehu"],
    answer:
      "Wheat requires cool weather for growth and warm weather for ripening. Best sowing time is Nov 1st to Nov 15th. Recommended varieties: HD-2967, PBW-343. Irrigations: CRI stage (21 days) is most critical.",
  },
  {
    keywords: ["rice", "paddy", "dhan"],
    answer:
      "Rice needs standing water. Maintain 2-3 cm water level. Common diseases include Blast and Sheath Blight. Apply Zinc Sulphate 25kg/ha to prevent Khaira disease.",
  },
  {
    keywords: ["cotton", "kapas"],
    answer:
      "Cotton is sensitive to water logging. Watch out for Pink Bollworm. Use BT cotton varieties for bollworm resistance. Spray Imidacloprid for sucking pests.",
  },
  {
    keywords: ["price", "rate", "mandi", "market"],
    answer:
      "Market prices fluctuate daily based on supply and demand. You can check the 'Market' section on this website for live rates from major mandis. Currently, prices are stable for grains.",
  },
  {
    keywords: ["weather", "rain", "monsoon"],
    answer:
      "Always check the 7-day forecast before irrigation or spraying chemicals. If rain is expected within 24 hours, postpone spraying.",
  },
];

export const AIAssistant = () => {
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ type: "user" | "ai"; text: string; ts?: number }>
  >([]);

  // Conversations
  const [conversations, setConversations] = useState<Array<{ id: string; title: string }>>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const CONV_STORAGE_KEY = "ai_conversations_local";

  const saveConversationsToLocal = (list) => {
    try {
      localStorage.setItem(CONV_STORAGE_KEY, JSON.stringify(list));
    } catch {}
  };

  const loadConversationsFromLocal = () => {
    try {
      const raw = localStorage.getItem(CONV_STORAGE_KEY);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch {
      return [];
    }
  };

  // Simple mode: use only the local rule-based solver (good for offline/simple Qs)
  const [simpleMode, setSimpleMode] = useState(() => {
    try {
      const val = typeof window !== "undefined" ? localStorage.getItem("ai_simple_mode") : null;
      return val === null ? false : val === "true";
    } catch {
      return false;
    }
  });

  const solveLocally = async (text: string) => {
    const trimmed = text.replace(/,/g, "").trim();

    // Basic arithmetic detection (only numbers and +-*/() and dots)
    if (/^[0-9+\-*/().\s]+$/.test(trimmed)) {
      try {
        // Evaluate safely after validating characters
        // eslint-disable-next-line no-new-func
        const value = Function(`"use strict"; return (${trimmed})`)();
        if (typeof value === "number" && isFinite(value)) {
          return `Result: ${value}`;
        }
      } catch (e) {
        // fall through
      }
    }

    const lowerText = text.toLowerCase();
    const match = sampleResponses.find((r) =>
      r.keywords.some((k) => lowerText.includes(k))
    );

    if (match) return match.answer;

    return null;
  };

  useEffect(() => {
    try {
      localStorage.setItem("ai_simple_mode", simpleMode ? "true" : "false");
    } catch {}
  }, [simpleMode]);

  // Load conversations from server or local on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/conversations');
        if (!res.ok) throw new Error('fetch_failed');
        const list = await res.json();
        if (!mounted) return;
        setConversations(list.map((c) => ({ id: c.id, title: c.title })));
        if (list.length > 0) {
          setCurrentConversationId(list[0].id);
          setMessages(list[0].messages || []);
        }
        // also mirror to local cache
        try { saveConversationsToLocal(list); } catch {}
      } catch (e) {
        const local = loadConversationsFromLocal();
        setConversations(local.map((c) => ({ id: c.id, title: c.title })));
        if (local.length > 0) {
          setCurrentConversationId(local[0].id);
          setMessages(local[0].messages || []);
        }
      }
    })();
    return () => { mounted = false };
  }, []);

  const handleSubmit = async (text: string = query) => {
    if (!text.trim()) return;

    const ts = Date.now();
    const userMsg = { type: "user", text, ts } as const;

    // Add to UI and to conversation storage
    setMessages((prev) => [...prev, userMsg]);
    setQuery("");
    setIsTyping(true);

    // Ensure we have a conversation
    let convId = currentConversationId;
    if (!convId) {
      // create one on server or locally
      try {
        const createRes = await fetch("/api/conversations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: "Conversation", message: userMsg }),
        });

        if (!createRes.ok) throw new Error("create_failed");
        const conv = await createRes.json();
        convId = conv.id;
        setConversations((prev) => [ { id: conv.id, title: conv.title }, ...prev ]);
        setCurrentConversationId(convId);
      } catch (e) {
        // fallback to local only
        const local = loadConversationsFromLocal();
        const id = Date.now().toString();
        const conv = { id, title: "Local Conversation", messages: [userMsg] };
        local.unshift(conv);
        saveConversationsToLocal(local);
        setConversations(local.map((c) => ({ id: c.id, title: c.title })));
        setCurrentConversationId(id);
        convId = id;
      }
    } else {
      // append user message to existing conv
      try {
        await fetch("/api/conversations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ conversationId: convId, message: userMsg }),
        });
      } catch (e) {
        // append locally
        const local = loadConversationsFromLocal();
        const idx = local.findIndex((c) => c.id === convId);
        if (idx > -1) {
          local[idx].messages.push(userMsg);
          saveConversationsToLocal(local);
        }
      }
    }

    // If simpleMode, resolve locally only
    if (simpleMode) {
      const answer = await solveLocally(text);
      const response =
        answer ??
        "I can't answer that in Simple Mode. Turn off Simple Mode to ask more complex questions (uses OpenAI).";

      const aiMsg = { type: "ai", text: response, ts: Date.now() };
      setMessages((prev) => [...prev, aiMsg]);

      // persist ai message
      try {
        await fetch("/api/conversations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ conversationId: convId, message: aiMsg }),
        });
      } catch (e) {
        const local = loadConversationsFromLocal();
        const idx = local.findIndex((c) => c.id === convId);
        if (idx > -1) {
          local[idx].messages.push(aiMsg);
          saveConversationsToLocal(local);
        }
      }

      setIsTyping(false);
      return;
    }

    // Try server-backed OpenAI & return answer
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });

      if (!res.ok) throw new Error("server_error");

      const data = await res.json();
      const answer = data?.answer ?? "I'm unable to answer that right now.";

      const aiMsg = { type: "ai", text: answer, ts: Date.now() };
      setMessages((prev) => [...prev, aiMsg]);

      // persist ai message
      try {
        await fetch("/api/conversations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ conversationId: convId, message: aiMsg }),
        });
      } catch (e) {
        const local = loadConversationsFromLocal();
        const idx = local.findIndex((c) => c.id === convId);
        if (idx > -1) {
          local[idx].messages.push(aiMsg);
          saveConversationsToLocal(local);
        }
      }

      setIsTyping(false);
      return;
    } catch (e) {
      // Fall back to built-in rule-based answers when server is not available
      console.warn("OpenAI request failed, falling back to local answers", e);
    }

    // Local fallback
    const lowerText = text.toLowerCase();
    const match = sampleResponses.find((r) =>
      r.keywords.some((k) => lowerText.includes(k))
    );

    const response = match
      ? match.answer
      : "I understand you are asking about '" +
        text +
        "'. While I don't have specific data on this right now, I recommend consulting a local agriculture officer (Kisan Call Center: 1800-180-1551) for expert advice.";

    const aiMsg = { type: "ai", text: response, ts: Date.now() };
    setMessages((prev) => [...prev, aiMsg]);

    // persist fallback ai
    try {
      await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId: convId, message: aiMsg }),
      });
    } catch (e) {
      const local = loadConversationsFromLocal();
      const idx = local.findIndex((c) => c.id === convId);
      if (idx > -1) {
        local[idx].messages.push(aiMsg);
        saveConversationsToLocal(local);
      }
    }

    setIsTyping(false);
  };

  return (
    <section className="py-20 lg:py-32" id="ai">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 text-secondary text-sm font-semibold rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              AI-Powered
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Your 24/7
              <span className="text-gradient-gold"> Farming Expert</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Ask anything about farming in simple language. Get instant answers
              about crops, weather, prices, and more. Available in Hindi and
              English.
            </p>

            {/* Features List */}
            <div className="space-y-4">
              {[
                "Voice input for easy access",
                "Answers in your local language",
                "Crop-specific recommendations",
                "24/7 instant responses",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>

            {/* Quick Questions */}
            <div className="mt-8">
              <p className="text-sm text-muted-foreground mb-3">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {sampleQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSubmit(q)}
                    className="px-3 py-1.5 text-sm bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-full transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={simpleMode}
                        onChange={(e) => setSimpleMode(e.target.checked)}
                        className="h-4 w-4 rounded border-border bg-background"
                      />
                      <span className="text-foreground">Simple Mode</span>
                      <Info className="w-4 h-4 text-muted-foreground ml-1" />
                    </label>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={6}>
                    <div className="max-w-xs">
                      <p className="text-sm">Simple Mode: Fast & offline — basic calculations and common farming Qs.</p>
                      <p className="mt-1 text-sm">Expert Mode: Uses OpenAI for detailed answers (server + API key required).</p>
                      <hr className="my-2 border-border" />
                      <p className="text-sm">हिंदी: सरल मोड — तेज़, ऑफ़लाइन (सरल हिसाब और सामान्य खेती प्रश्न)।</p>
                      <p className="mt-1 text-sm">विशेषज्ञ मोड: विस्तृत उत्तरों के लिए OpenAI का उपयोग करें (सर्वर और API कुंजी आवश्यक)।</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </motion.div>

          {/* Right - Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl border border-border shadow-lg overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-primary p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-foreground">
                  AgroConnect AI
                </h3>
                <p className="text-xs text-primary-foreground/70">
                  Always here to help
                </p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs text-primary-foreground/70">Online</span>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 p-4">
              {/* Conversations list */}
              <div className="col-span-12 lg:col-span-3">
                <div className="bg-card rounded-2xl border border-border p-4 h-80 overflow-y-auto">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">Conversations</h4>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={async () => {
                          try {
                            const res = await fetch('/api/conversations', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ title: 'Conversation' }),
                            });
                            if (!res.ok) throw new Error('create_failed');
                            const conv = await res.json();
                            setConversations((prev) => [{ id: conv.id, title: conv.title }, ...prev]);
                            setCurrentConversationId(conv.id);
                            setMessages([]);
                          } catch {
                            const local = loadConversationsFromLocal();
                            const id = Date.now().toString();
                            local.unshift({ id, title: 'Local Conversation', messages: [] });
                            saveConversationsToLocal(local);
                            setConversations(local.map((c) => ({ id: c.id, title: c.title })));
                            setCurrentConversationId(id);
                            setMessages([]);
                          }
                        }}
                        className="px-2 py-1 text-sm border rounded"
                      >
                        New
                      </button>
                      <button
                        onClick={async () => {
                          if (!currentConversationId) return;
                          try {
                            const res = await fetch(`/api/conversations/${currentConversationId}`, { method: 'DELETE' });
                            if (!res.ok) throw new Error('delete_failed');
                            setConversations((prev) => prev.filter((c) => c.id !== currentConversationId));
                            setCurrentConversationId(null);
                            setMessages([]);
                          } catch {
                            const local = loadConversationsFromLocal();
                            const filtered = local.filter((c) => c.id !== currentConversationId);
                            saveConversationsToLocal(filtered);
                            setConversations(filtered.map((c) => ({ id: c.id, title: c.title })));
                            setCurrentConversationId(null);
                            setMessages([]);
                          }
                        }}
                        className="px-2 py-1 text-sm border rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {(conversations.length ? conversations : loadConversationsFromLocal()).map((c) => (
                      <button
                        key={c.id}
                        onClick={async () => {
                          setCurrentConversationId(c.id);
                          setMessages([]);
                          try {
                            const res = await fetch('/api/conversations');
                            if (!res.ok) throw new Error('fetch_failed');
                            const list = await res.json();
                            const conv = list.find((x) => x.id === c.id);
                            if (conv) {
                              setMessages(conv.messages || []);
                            }
                          } catch {
                            const local = loadConversationsFromLocal();
                            const conv = local.find((x) => x.id === c.id);
                            if (conv) setMessages(conv.messages || []);
                          }
                        }}
                        className={`w-full text-left px-3 py-2 rounded ${currentConversationId === c.id ? 'bg-primary/10' : 'hover:bg-muted'}`}
                      >
                        {c.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Messages area */}
              <div className="col-span-12 lg:col-span-9">
                <div className="h-80 overflow-y-auto p-4 space-y-4 bg-card rounded-3xl border border-border">
                  {/* Welcome Message */}
                  {messages.length === 0 && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                      <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                        <p className="text-sm text-foreground">
                          Hello! 🌾 I'm your AI farming assistant. Ask me anything about
                          crops, weather, prices, or farming techniques!
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Dynamic Messages */}
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex gap-3 ${
                        msg.type === "user" ? "justify-end" : ""
                      }`}
                    >
                      {msg.type === "ai" && (
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-4 h-4 text-primary" />
                        </div>
                      )}
                      <div
                        className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                          msg.type === "user"
                            ? "bg-primary text-primary-foreground rounded-tr-none"
                            : "bg-muted text-foreground rounded-tl-none"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                      <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.1s]" />
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.2s]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <Mic className="w-5 h-5 text-muted-foreground" />
                </Button>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="Type your question..."
                  className="flex-1 bg-muted rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Button
                  size="icon"
                  onClick={() => handleSubmit()}
                  disabled={!query.trim() || isTyping}
                  className="flex-shrink-0"
                >
                  {isTyping ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
