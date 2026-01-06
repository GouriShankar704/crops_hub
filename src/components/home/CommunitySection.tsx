import { motion } from "framer-motion";
import { Users, MessageCircle, ThumbsUp, Share2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const posts = [
  {
    author: "Rajesh Kumar",
    avatar: "👨‍🌾",
    location: "Punjab",
    time: "2h ago",
    content:
      "Just harvested my wheat crop - got 48 quintals per acre this year! Thanks to the AI advisor for irrigation timing tips. 🌾",
    image: "🌾",
    likes: 234,
    comments: 45,
    shares: 12,
  },
  {
    author: "Priya Sharma",
    avatar: "👩‍🌾",
    location: "Maharashtra",
    time: "5h ago",
    content:
      "Question: Anyone dealing with aphids in cotton? What organic solutions have worked for you?",
    likes: 89,
    comments: 67,
    shares: 8,
  },
  {
    author: "Amit Patel",
    avatar: "🧑‍🌾",
    location: "Gujarat",
    time: "1d ago",
    content:
      "Found a great buyer through AgroConnect for my groundnuts. Got ₹5,200/quintal - ₹300 more than local mandi! 💰",
    likes: 456,
    comments: 89,
    shares: 34,
  },
];

const groups = [
  { name: "Wheat Farmers India", members: "12.5K", icon: "🌾" },
  { name: "Organic Farming", members: "8.2K", icon: "🥬" },
  { name: "Cotton Growers", members: "6.8K", icon: "🏵️" },
  { name: "Fruit Orchards", members: "4.5K", icon: "🍎" },
];

export const CommunitySection = () => {
  return (
    <section className="py-20 lg:py-32" id="community">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
            <Users className="w-4 h-4" />
            Community
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Join 50,000+
            <span className="text-gradient-primary"> Fellow Farmers</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Share experiences, ask questions, and learn from farmers across India
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Posts Feed */}
          <div className="lg:col-span-2 space-y-4">
            {posts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border p-5 hover:shadow-md transition-shadow"
              >
                {/* Author */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                    {post.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-foreground">
                        {post.author}
                      </h4>
                      <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                        {post.location}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{post.time}</p>
                  </div>
                </div>

                {/* Content */}
                <p className="text-foreground mb-4 leading-relaxed">
                  {post.content}
                </p>

                {post.image && (
                  <div className="bg-muted/50 rounded-xl h-32 flex items-center justify-center text-6xl mb-4">
                    {post.image}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-6 pt-4 border-t border-border">
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <ThumbsUp className="w-5 h-5" />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm font-medium">{post.shares}</span>
                  </button>
                </div>
              </motion.div>
            ))}

            <Button variant="outline" className="w-full" size="lg">
              View More Posts
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Groups Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Popular Groups */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Popular Groups
              </h3>
              <div className="space-y-3">
                {groups.map((group, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors cursor-pointer"
                  >
                    <span className="text-2xl">{group.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">
                        {group.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {group.members} members
                      </p>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs h-7">
                      Join
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-primary rounded-2xl p-6 text-primary-foreground">
              <h3 className="font-bold text-lg mb-4">Community Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Farmers", value: "50K+" },
                  { label: "Discussions", value: "12K+" },
                  { label: "Experts", value: "500+" },
                  { label: "Solutions", value: "8K+" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm opacity-80">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
