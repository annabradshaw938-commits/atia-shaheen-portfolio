"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Star,
  TrendingUp,
  Users,
  Award,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  MessageCircle,
  Send,
  ArrowUp,
  ExternalLink,
  CheckCircle2,
  BarChart3,
  Globe,
  Link2,
  FileText,
  Target,
  Zap,
  Phone,
  Mail,
  Linkedin,
  Briefcase,
  Brain,
  Sparkles,
  Cpu,
  Eye,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

/* ─────────────── animation helpers ─────────────── */

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCounter({
  end,
  suffix = "",
  duration = 2,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function useHasMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

/* ─────────────── data ─────────────── */

const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "Articles", href: "#articles" },
  { label: "Contact", href: "#contact" },
];

const stats = [
  { value: 150, suffix: "%+", label: "Average Lead Growth", icon: TrendingUp },
  { value: 60, suffix: "+", label: "Home Service Clients", icon: Users },
  { value: 800, suffix: "+", label: "Keywords Ranked", icon: Search },
  { value: 97, suffix: "%", label: "Client Retention", icon: Award },
];

const skills = [
  { label: "Google Maps Ranking", icon: MapPin },
  { label: "AI Overview Optimization", icon: Brain },
  { label: "Home Service SEO", icon: Briefcase },
  { label: "Citation Building", icon: Globe },
  { label: "GBP Optimization", icon: MapPin },
  { label: "Voice Search Readiness", icon: Zap },
];

const services = [
  {
    title: "Google Business Profile Optimization for Contractors",
    description:
      "Complete GBP setup, verification, AI-optimized descriptions, service area mapping, and a photo strategy built for home renovation businesses. Get your profile working harder to bring in local leads.",
    features: [
      "Profile Setup & Verification",
      "Service Area Optimization",
      "AI-Optimized Descriptions",
      "Review Generation Strategy",
    ],
    icon: MapPin,
  },
  {
    title: "AI Overview & SGE Optimization",
    description:
      'Get your business featured in Google AI Overviews and ChatGPT search results. When homeowners search "best plumber near me" or "garage door repair in my area" — your business shows up.',
    features: [
      "Google SGE Optimization",
      "AI Overview Visibility",
      "Structured Data for AI",
      "Entity-Based SEO",
    ],
    icon: Brain,
  },
  {
    title: "Local Citation Building for Home Services",
    description:
      "Build consistent NAP across top directories like Angi, HomeAdvisor, Houzz, Thumbtack, and Bark. Fix inconsistencies that hurt your local search ranking.",
    features: [
      "NAP Consistency Audit",
      "Industry Directory Submissions",
      "AI Knowledge Graph Signals",
      "Citation Cleanup",
    ],
    icon: Globe,
  },
  {
    title: "Home Renovation SEO Content Strategy",
    description:
      'Create content that ranks for high-intent searches like "kitchen remodeler near me", "emergency plumber", and "junk removal service". Drive real leads, not just traffic.',
    features: [
      "High-Intent Keyword Targeting",
      "Service Page Optimization",
      "Voice Search Readiness",
      "E-E-A-T Enhancement",
    ],
    icon: Sparkles,
  },
  {
    title: "Backlink Strategy & Authority Building",
    description:
      "Build topical authority in the home renovation space with quality backlinks from home improvement sites, local directories, and industry publications.",
    features: [
      "Link Quality Assessment",
      "Toxic Link Disavow",
      "Topical Authority Building",
      "Digital PR for Contractors",
    ],
    icon: Link2,
  },
  {
    title: "Local SEO Audit & AI Readiness Report",
    description:
      "Comprehensive audit covering Google Maps ranking, citation health, AI Overview readiness, and competitor analysis for your home service business. Know exactly where you stand.",
    features: [
      "Complete SEO Audit",
      "AI Readiness Score",
      "Competitor AI Analysis",
      "Actionable Roadmap",
    ],
    icon: Eye,
  },
];

const portfolio = [
  {
    title: "150% Lead Increase for Junk Removal Company",
    category: "Local SEO",
    color: "from-purple-primary to-purple-secondary",
    description:
      "Took a junk removal business from invisible to top 3 on Google Maps in a competitive US market. Optimized GBP, built citations, and created location-based service pages that converted.",
    results: ["150% Lead Increase", "Top 3 Maps Ranking", "3x More Calls"],
  },
  {
    title: "Garage Door Repair Company — #1 on Google Maps",
    category: "GMB Optimization",
    color: "from-teal-accent to-purple-primary",
    description:
      "Ranked a garage door repair company #1 in their service area by optimizing their Google Business Profile, building consistent citations, and launching a review generation strategy.",
    results: ["#1 Maps Position", "200% Call Volume", "5-Star Rating Average"],
  },
  {
    title: "Plumbing Business Featured in AI Overviews",
    category: "AI SEO",
    color: "from-gold-accent to-orange-cta",
    description:
      'Optimized a plumbing company to appear in Google AI Overviews when people search "emergency plumber near me". Implemented structured data, entity-based SEO, and E-E-A-T signals.',
    results: ["AI Overview Featured", "2x Organic Traffic", "Voice Search Optimized"],
  },
  {
    title: "Home Renovation Contractor — Multi-City Expansion",
    category: "Local SEO",
    color: "from-purple-secondary to-gold-accent",
    description:
      "Helped a home renovation contractor expand from 1 city to 5 cities across UAE and KSA. Created city-specific service pages, optimized GBP for each location, and built local citations.",
    results: ["5 City Rankings", "300% Lead Growth", "Multi-Location GBP"],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Audit & Analysis",
    description: "Comprehensive audit of your home service business",
    icon: Search,
  },
  {
    step: "02",
    title: "Strategy Development",
    description: "Custom Local SEO strategy for your niche",
    icon: Target,
  },
  {
    step: "03",
    title: "Implementation",
    description: "Optimize GBP, build citations, create service pages",
    icon: Zap,
  },
  {
    step: "04",
    title: "Monitor & Optimize",
    description: "Track rankings, AI Overviews, and leads",
    icon: TrendingUp,
  },
];

const articles = [
  {
    title: "How Home Renovation Contractors Can Rank on Google Maps in 2026",
    tag: "Local SEO",
    date: "May 2026",
  },
  {
    title: "AI Overviews for Home Services: What Contractors Need to Know",
    tag: "AI SEO",
    date: "Jan 2026",
  },
  {
    title: "Junk Removal SEO: How to Get More Calls from Google",
    tag: "Industry SEO",
    date: "Jun 2025",
  },
  {
    title: "Garage Door Repair Marketing: From Invisible to #1 on Maps",
    tag: "Case Study",
    date: "May 2025",
  },
  {
    title: "Why 'Near Me' Searches Matter for Home Service Businesses",
    tag: "Local SEO",
    date: "May 2025",
  },
  {
    title: "Plumbing SEO Guide: Rank Higher and Get More Emergency Calls",
    tag: "Industry SEO",
    date: "Mar 2025",
  },
];

const testimonials = [
  {
    name: "Mike T.",
    role: "Junk Removal Business Owner",
    location: "Texas, USA",
    text: "Atia transformed our online presence. Before her, we were buried on page 3 of Google Maps. Within 3 months, we ranked top 3 for 'junk removal near me' in our area. Our call volume tripled and we had to hire two more trucks to keep up with demand. She understands the home service industry like no one else.",
    rating: 5,
  },
  {
    name: "Fatima A.",
    role: "Home Renovation Contractor",
    location: "Dubai, UAE",
    text: "As a contractor in Dubai, I needed someone who understood both the local market and modern SEO. Atia optimized our Google Business Profile and built citations across UAE directories. We now appear in Google Maps for renovation searches across Dubai and Sharjah. Her AI Overview strategy also got us featured when people search for home renovation services.",
    rating: 5,
  },
  {
    name: "Ahmed S.",
    role: "Garage Door Repair Company",
    location: "Riyadh, KSA",
    text: "Our garage door repair business was invisible online before Atia stepped in. She optimized our GBP, built citations on local directories, and created a review strategy that built our reputation. Now we are the #1 garage door repair company on Google Maps in Riyadh. Our phone rings all day with new customers.",
    rating: 5,
  },
];

const quickReplies = [
  "Home Service SEO",
  "AI Overview Optimization",
  "Free SEO Audit",
  "WhatsApp",
];

/* ─────────────── Navbar ─────────────── */

function Navbar() {
  const { theme, setTheme } = useTheme();
  const mounted = useHasMounted();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg-nav-scrolled)] backdrop-blur-lg shadow-lg border-b border-purple-primary/10"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a
          href="#"
          className="text-xl font-bold tracking-tight"
          style={{ color: "var(--text-nav)" }}
        >
          Atia<span className="text-purple-primary">.</span>SEO
        </a>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="text-sm text-purple-primary/70 hover:text-purple-primary transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="text-purple-primary hover:bg-purple-primary/10"
            >
              {theme === "dark" ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </Button>
          )}
          <Button
            className="hidden sm:inline-flex bg-orange-cta hover:bg-orange-cta/90 text-white rounded-full shadow-lg shadow-orange-cta/30"
            onClick={() => scrollTo("#contact")}
          >
            Get Free SEO Audit
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-purple-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--bg-nav-scrolled)] backdrop-blur-lg border-b border-purple-primary/10 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="text-left py-2 text-purple-primary/70 hover:text-purple-primary transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <Button
                className="mt-2 bg-orange-cta hover:bg-orange-cta/90 text-white rounded-full shadow-lg shadow-orange-cta/30"
                onClick={() => scrollTo("#contact")}
              >
                Get Free SEO Audit
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ─────────────── Hero Section ─────────────── */

function HeroSection() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-32 pb-20 sm:pt-44 sm:pb-32 overflow-hidden bg-gradient-to-br from-purple-deeper via-purple-dark to-purple-primary animate-gradient">
      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-secondary/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-10 right-10 w-96 h-96 bg-purple-secondary/15 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-accent/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <Badge className="mb-6 text-sm px-4 py-1.5 bg-white/10 text-white border-white/20 hover:bg-white/20">
              Local SEO + AI SEO for Home Renovation
            </Badge>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-white">
              Local SEO for Home Renovation{" "}
              <span className="text-gold-accent">That Gets You Found</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="mt-4 text-xl sm:text-2xl font-medium text-purple-light/80">
              AI-Powered Search Optimization for Contractors
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <p className="mt-6 text-lg text-purple-light/60 max-w-2xl mx-auto leading-relaxed">
              Helping home renovation, junk removal, garage door repair, and
              plumbing businesses rank on Google Maps, Local Pack, and AI
              Overviews across USA, UAE, KSA, and Pakistan.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="text-base px-8 bg-orange-cta hover:bg-orange-cta/90 text-white rounded-full shadow-lg shadow-orange-cta/30"
                onClick={() => scrollTo("#contact")}
              >
                Get Free SEO Audit
                <ExternalLink className="ml-2 size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 bg-white/10 text-white border-white/30 hover:bg-white/20 rounded-full"
                onClick={() => scrollTo("#portfolio")}
              >
                View Case Studies
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Stats Section ─────────────── */

function StatsSection() {
  return (
    <section className="py-16 bg-[var(--bg-section-alt)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-xl bg-purple-primary/10">
                    <stat.icon className="size-6 text-purple-primary" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-purple-primary">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── About Section ─────────────── */

function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <AnimatedSection>
              <Badge className="mb-4 bg-purple-primary/10 text-purple-primary">
                About Me
              </Badge>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                Local SEO for Home Renovation
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <p className="mt-2 text-xl text-purple-primary font-medium">
                The Contractor&apos;s Edge in Local Search
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Atia specializes in Local SEO for home renovation and home
                  service businesses — junk removal, garage door repair,
                  plumbing, kitchen remodeling, HVAC, roofing. She combines
                  Proximity, Relevance, Prominence pillars with AI SEO (AI
                  Overviews, SGE, ChatGPT search).
                </p>
                <p>
                  Target markets: <strong className="text-foreground">USA, UAE, KSA, and Pakistan</strong>.
                  Whether you run a junk removal company in Texas, a garage door
                  repair service in Riyadh, or a plumbing business in Dubai, the
                  strategy is built for your trade and your market.
                </p>
              </div>
            </AnimatedSection>
          </div>

          <div className="space-y-6">
            <AnimatedSection delay={0.2}>
              <div className="relative aspect-square max-w-sm mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-xl animate-pulse-glow">
                <img
                  src="/profile.jpg"
                  alt="Atia Shaheen — Local SEO Specialist for Home Renovation"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    if (target.parentElement) {
                      target.parentElement.innerHTML =
                        '<div class="w-full h-full flex items-center justify-center bg-purple-primary/10 text-purple-primary text-6xl font-bold">AS</div>';
                    }
                  }}
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill) => (
                  <div
                    key={skill.label}
                    className="flex items-center gap-2 p-3 rounded-lg bg-purple-primary/5 border border-purple-primary/10"
                  >
                    <skill.icon className="size-4 text-purple-primary shrink-0" />
                    <span className="text-sm font-medium">{skill.label}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Services Section ─────────────── */

function ServicesSection() {
  return (
    <section id="services" className="py-20 sm:py-28 bg-[var(--bg-section-alt)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="mb-4 bg-purple-primary/10 text-purple-primary">
            Services
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold">
            SEO Services Built for Home Renovation
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every service is designed specifically for contractors and home
            service businesses. No cookie-cutter strategies — just proven tactics
            that get your phone ringing.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <AnimatedSection key={service.title} delay={i * 0.08}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 group border-purple-primary/10 hover:border-purple-primary/30 bg-card">
                <CardContent className="pt-6">
                  <div className="p-3 rounded-xl bg-purple-primary/10 w-fit mb-4 group-hover:bg-purple-primary transition-colors duration-300">
                    <service.icon className="size-6 text-purple-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold leading-snug mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle2 className="size-4 text-teal-accent shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Portfolio Section ─────────────── */

function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="mb-4 bg-purple-primary/10 text-purple-primary">
            Case Studies
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Real Results for Home Service Businesses
          </h2>
          <p className="mt-4 text-muted-foreground">
            From invisible to #1 on Google Maps. From zero AI presence to
            featured in AI Overviews. Here&apos;s what happens when you combine
            local SEO with AI optimization.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {portfolio.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.1}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-purple-primary/10 hover:border-purple-primary/30 bg-card overflow-hidden">
                {/* Gradient top bar */}
                <div
                  className={`h-2 bg-gradient-to-r ${item.color}`}
                />
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-purple-primary/10 text-purple-primary text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold leading-snug mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.results.map((result) => (
                      <Badge
                        key={result}
                        variant="outline"
                        className="text-xs font-medium bg-teal-accent/10 text-teal-accent border-teal-accent/20"
                      >
                        <CheckCircle2 className="size-3 mr-1" />
                        {result}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Process Section ─────────────── */

function ProcessSection() {
  return (
    <section
      id="process"
      className="py-20 sm:py-28 bg-purple-deeper text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="mb-4 bg-white/10 text-white border-white/20">
            My Process
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold">
            How I Rank Home Service Businesses
          </h2>
          <p className="mt-4 text-white/60">
            A clear, proven process that takes your home renovation business from
            invisible to dominant in local search.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((item, i) => (
            <AnimatedSection key={item.step} delay={i * 0.1}>
              <div className="h-full p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
                <div className="mx-auto p-3 rounded-full bg-purple-primary/20 w-fit mb-4">
                  <item.icon className="size-6 text-gold-accent" />
                </div>
                <span className="text-xs font-bold text-gold-accent uppercase tracking-widest">
                  Step {item.step}
                </span>
                <h3 className="text-lg font-semibold mt-2 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Articles Section ─────────────── */

function ArticlesSection() {
  return (
    <section id="articles" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="mb-4 bg-purple-primary/10 text-purple-primary">
            Articles
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold">
            SEO Insights for Home Renovation
          </h2>
          <p className="mt-4 text-muted-foreground">
            Practical guides and strategies for contractors who want to rank
            higher and get more leads.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <AnimatedSection key={article.title} delay={i * 0.08}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group border-purple-primary/10 hover:border-purple-primary/30 bg-card">
                <CardContent className="pt-6">
                  <Badge className="bg-purple-primary/10 text-purple-primary text-xs mb-3">
                    {article.tag}
                  </Badge>
                  <h3 className="text-base font-semibold leading-snug group-hover:text-purple-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2">
                    {article.date}
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Testimonials Section ─────────────── */

function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-20 sm:py-28 bg-[var(--bg-section-alt)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="mb-4 bg-purple-primary/10 text-purple-primary">
            Testimonials
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold">
            What Contractors Say
          </h2>
          <p className="mt-4 text-muted-foreground">
            Real feedback from home service businesses across the USA, UAE, KSA,
            and Pakistan.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.1}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-purple-primary/10 hover:border-purple-primary/30 bg-card">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="size-4 fill-gold-accent text-gold-accent"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-purple-primary/10 flex items-center justify-center text-purple-primary font-bold">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {t.role}, {t.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Contact Section ─────────────── */

function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="mb-4 bg-purple-primary/10 text-purple-primary">
            Contact
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Ready to Rank Your Home Service Business?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Get a free SEO audit and discover how Local SEO can transform your
            contractor business. Serving clients in USA, UAE, KSA, and Pakistan.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12">
          <AnimatedSection>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-primary/10">
                  <MessageCircle className="size-5 text-purple-primary" />
                </div>
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">
                    0310-7599528
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Quick consultation available
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-primary/10">
                  <Mail className="size-5 text-purple-primary" />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-sm text-muted-foreground">
                    attiashaheenofficial@gmail.com
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Detailed inquiries welcome
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-primary/10">
                  <MapPin className="size-5 text-purple-primary" />
                </div>
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-sm text-muted-foreground">
                    Islamabad, Pakistan
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Serving clients across USA, UAE, KSA, and Pakistan
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-primary/10">
                  <Linkedin className="size-5 text-purple-primary" />
                </div>
                <div>
                  <p className="font-semibold">LinkedIn</p>
                  <p className="text-sm text-muted-foreground">
                    Connect professionally
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <Card className="border-purple-primary/10 bg-card">
              <CardContent className="pt-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Name
                    </label>
                    <Input placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Email
                    </label>
                    <Input type="email" placeholder="you@company.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Message
                    </label>
                    <Textarea
                      placeholder="Tell me about your business and SEO goals..."
                      rows={4}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-orange-cta hover:bg-orange-cta/90 text-white rounded-full shadow-lg shadow-orange-cta/30"
                    size="lg"
                  >
                    <Send className="size-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Footer ─────────────── */

function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[var(--bg-footer)] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2">
            <h3 className="text-xl font-bold mb-3">
              Atia<span className="text-gold-accent">.</span>SEO
            </h3>
            <p className="text-sm text-[var(--text-footer-muted)] max-w-md leading-relaxed">
              Local SEO and AI SEO specialist for home renovation contractors.
              Helping junk removal, garage door repair, plumbing, and home
              service businesses rank on Google Maps, Local Pack, and AI
              Overviews across USA, UAE, KSA, and Pakistan.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-[var(--text-footer-muted)]">
              {navItems.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-[var(--text-footer-muted)]">
              <li className="flex items-center gap-2">
                <MessageCircle className="size-3" /> 0310-7599528
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-3" /> attiashaheenofficial@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-3" /> Islamabad, Pakistan
              </li>
              <li className="flex items-center gap-2">
                <Linkedin className="size-3" /> LinkedIn
              </li>
            </ul>
            <p className="text-xs text-[var(--text-footer-muted)] mt-4">
              Serving home renovation contractors across USA, UAE, KSA, and
              Pakistan
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-footer-muted)]">
            &copy; {new Date().getFullYear()} Atia Shaheen. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {navItems.slice(0, 4).map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-xs text-[var(--text-footer-muted)] hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────── Chatbot Widget ─────────────── */

function ChatbotWidget() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    { role: "user" | "bot"; text: string }[]
  >([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const openChatWithGreeting = () => {
    setChatOpen(true);
    if (chatMessages.length === 0) {
      setChatMessages([
        {
          role: "bot",
          text: "Hello! 👋 Welcome! I specialize in Local SEO for Home Renovation businesses — Junk Removal, Garage Door Repair, Plumbing, and more. How can I help you today?",
        },
      ]);
    }
  };

  const sendChat = async (text?: string) => {
    const msg = text || chatInput.trim();
    if (!msg || chatLoading) return;
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", text: msg }]);
    setChatLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      setChatMessages((prev) => [
        ...prev,
        { role: "bot", text: data.reply || "Sorry, something went wrong." },
      ]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Connection error. Please try again or contact Atia on WhatsApp at 0310-7599528!",
        },
      ]);
    }
    setChatLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-80 sm:w-96 rounded-2xl shadow-2xl border border-purple-primary/20 bg-[var(--bg-chatbot)] overflow-hidden"
          >
            {/* Chat header */}
            <div className="bg-gradient-to-r from-purple-primary to-purple-secondary p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="size-5" />
                  <div>
                    <h4 className="font-semibold text-sm">Atia&apos;s AI Assistant</h4>
                    <p className="text-xs text-white/70">
                      ✨ AI-Powered • Bilingual
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 h-8 w-8"
                  onClick={() => setChatOpen(false)}
                >
                  <X className="size-4" />
                </Button>
              </div>
            </div>

            {/* Chat messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                      msg.role === "user"
                        ? "bg-purple-primary text-white rounded-br-sm"
                        : "bg-[var(--bg-chatbot-bot)] border border-purple-primary/10 rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-[var(--bg-chatbot-bot)] border border-purple-primary/10 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                    <span className="size-2 bg-purple-primary/50 rounded-full animate-bounce" />
                    <span
                      className="size-2 bg-purple-primary/50 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <span
                      className="size-2 bg-purple-primary/50 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick replies */}
            {chatMessages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <Button
                    key={reply}
                    variant="outline"
                    size="sm"
                    className="text-xs border-purple-primary/20 text-purple-primary hover:bg-purple-primary/10 rounded-full"
                    onClick={() => sendChat(reply)}
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            )}

            {/* Chat input */}
            <div className="p-3 border-t border-purple-primary/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendChat();
                }}
                className="flex gap-2"
              >
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 text-sm border-purple-primary/20 focus:border-purple-primary"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="bg-purple-primary hover:bg-purple-secondary text-white rounded-full"
                  disabled={chatLoading}
                >
                  <Send className="size-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat toggle button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={openChatWithGreeting}
        className="bg-gradient-to-r from-purple-primary to-purple-secondary text-white p-4 rounded-full shadow-lg shadow-purple-primary/30 hover:shadow-xl hover:shadow-purple-primary/40 transition-shadow relative"
        aria-label="Open chat"
      >
        <Brain className="size-6" />
        {/* Green online indicator */}
        <span className="absolute top-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white" />
      </motion.button>
    </div>
  );
}

/* ─────────────── Scroll to Top ─────────────── */

function ScrollToTop() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {showTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-50 bg-purple-primary hover:bg-purple-secondary text-white p-3 rounded-full shadow-lg transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ─────────────── Main Page ─────────────── */

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <ProcessSection />
        <ArticlesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatbotWidget />
      <ScrollToTop />
    </div>
  );
}
