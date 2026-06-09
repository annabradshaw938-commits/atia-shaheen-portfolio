'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useTheme } from 'next-themes'
import {
  MapPin,
  Phone,
  Mail,
  Linkedin,
  MessageCircle,
  ArrowUp,
  Sun,
  Moon,
  Menu,
  X,
  Star,
  CheckCircle2,
  ChevronRight,
  Send,
  Bot,
  User,
  TrendingUp,
  Users,
  Search,
  Award,
  Map,
  Cpu,
  FileText,
  BarChart3,
  Globe,
  Wrench,
  Home as HomeIcon,
  Zap,
  Target,
  Shield,
  Building,
  Hammer,
  Droplets,
  Thermometer,
  Truck,
  DoorOpen,
} from 'lucide-react'

/* ─────────────── animation helpers ─────────────── */

function FadeIn({ children, delay = 0, direction = 'up', className = '' }: { children: React.ReactNode; delay?: number; direction?: 'up' | 'down' | 'left' | 'right'; className?: string }) {
  const dirs = { up: { y: 40 }, down: { y: -40 }, left: { x: 40 }, right: { x: -40 } }
  return (
    <motion.div
      initial={{ opacity: 0, ...dirs[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
        hidden: {},
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function CountUp({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = end / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [inView, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ─────────────── data ─────────────── */

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Case Studies', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Articles', href: '#articles' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

const stats = [
  { value: 150, suffix: '%+', label: 'Average Lead Growth', icon: TrendingUp },
  { value: 60, suffix: '+', label: 'Home Service Clients', icon: Users },
  { value: 800, suffix: '+', label: 'Keywords Ranked', icon: Search },
  { value: 97, suffix: '%', label: 'Client Retention Rate', icon: Award },
]

const skills = [
  { label: 'Google Maps Ranking', icon: Map },
  { label: 'AI Overview Optimization', icon: Cpu },
  { label: 'Home Service SEO', icon: Wrench },
  { label: 'Citation Building', icon: FileText },
  { label: 'GBP Optimization', icon: Building },
  { label: 'Voice Search Readiness', icon: Zap },
]

const services = [
  {
    title: 'Google Business Profile Optimization for Contractors',
    description: 'Complete GBP setup, verification, AI-optimized descriptions, service area mapping, and a photo strategy built for home renovation businesses. Get your profile working harder to bring in local leads.',
    features: ['Profile Setup & Verification', 'Service Area Optimization', 'AI-Optimized Descriptions', 'Review Generation Strategy'],
    icon: Building,
  },
  {
    title: 'AI Overview & SGE Optimization',
    description: 'Get your business featured in Google AI Overviews and ChatGPT search results. When homeowners search "best plumber near me" or "garage door repair in my area" — your business shows up.',
    features: ['Google SGE Optimization', 'AI Overview Visibility', 'Structured Data for AI', 'Entity-Based SEO'],
    icon: Cpu,
  },
  {
    title: 'Local Citation Building for Home Services',
    description: 'Build consistent NAP across top directories like Angi, HomeAdvisor, Houzz, Thumbtack, and Bark. Fix inconsistencies that hurt your local search ranking.',
    features: ['NAP Consistency Audit', 'Industry Directory Submissions', 'AI Knowledge Graph Signals', 'Citation Cleanup'],
    icon: FileText,
  },
  {
    title: 'Home Renovation SEO Content Strategy',
    description: 'Create content that ranks for high-intent searches like "kitchen remodeler near me", "emergency plumber", and "junk removal service". Drive real leads, not just traffic.',
    features: ['High-Intent Keyword Targeting', 'Service Page Optimization', 'Voice Search Readiness', 'E-E-A-T Enhancement'],
    icon: Target,
  },
  {
    title: 'Backlink Strategy & Authority Building',
    description: 'Build topical authority in the home renovation space with quality backlinks from home improvement sites, local directories, and industry publications.',
    features: ['Link Quality Assessment', 'Toxic Link Disavow', 'Topical Authority Building', 'Digital PR for Contractors'],
    icon: Shield,
  },
  {
    title: 'Local SEO Audit & AI Readiness Report',
    description: 'Comprehensive audit covering Google Maps ranking, citation health, AI Overview readiness, and competitor analysis for your home service business. Know exactly where you stand.',
    features: ['Complete SEO Audit', 'AI Readiness Score', 'Competitor AI Analysis', 'Actionable Roadmap'],
    icon: BarChart3,
  },
]

const portfolio = [
  {
    title: '150% Lead Increase for Junk Removal Company',
    category: 'Local SEO',
    description: 'Took a junk removal business from invisible to top 3 on Google Maps in a competitive US market. Optimized GBP, built citations, and created location-based service pages that converted.',
    results: ['150% Lead Increase', 'Top 3 Maps Ranking', '3x More Calls'],
    icon: Truck,
  },
  {
    title: 'Garage Door Repair Company — #1 on Google Maps',
    category: 'GMB Optimization',
    description: 'Ranked a garage door repair company #1 in their service area by optimizing their Google Business Profile, building consistent citations, and launching a review generation strategy.',
    results: ['#1 Maps Position', '200% Call Volume', '5-Star Rating Average'],
    icon: DoorOpen,
  },
  {
    title: 'Plumbing Business Featured in AI Overviews',
    category: 'AI SEO',
    description: 'Optimized a plumbing company to appear in Google AI Overviews when people search "emergency plumber near me". Implemented structured data, entity-based SEO, and E-E-A-T signals.',
    results: ['AI Overview Featured', '2x Organic Traffic', 'Voice Search Optimized'],
    icon: Droplets,
  },
  {
    title: 'Home Renovation Contractor — Multi-City Expansion',
    category: 'Local SEO',
    description: 'Helped a home renovation contractor expand from 1 city to 5 cities across UAE and KSA. Created city-specific service pages, optimized GBP for each location, and built local citations.',
    results: ['5 City Rankings', '300% Lead Growth', 'Multi-Location GBP'],
    icon: HomeIcon,
  },
]

const processSteps = [
  {
    step: '01',
    title: 'Audit & Analysis',
    description: 'Comprehensive audit of your home service business — Google Business Profile, local rankings, citations, competitor analysis for your service area.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Strategy Development',
    description: "Custom Local SEO strategy for your home renovation niche — targeting high-intent keywords like \"near me\" searches and local service queries.",
    icon: Target,
  },
  {
    step: '03',
    title: 'Implementation',
    description: 'Optimize GBP, build citations, create service pages for each trade (junk removal, garage door, plumbing, etc.), and establish local authority.',
    icon: Wrench,
  },
  {
    step: '04',
    title: 'Monitor & Optimize',
    description: 'Track Google Maps rankings, AI Overview appearances, lead generation, and refine strategy based on real data.',
    icon: BarChart3,
  },
]

const articles = [
  {
    title: 'How Home Renovation Contractors Can Rank on Google Maps in 2026',
    tag: 'Local SEO',
  },
  {
    title: 'AI Overviews for Home Services: What Contractors Need to Know',
    tag: 'AI SEO',
  },
  {
    title: 'Junk Removal SEO: How to Get More Calls from Google',
    tag: 'Industry SEO',
  },
  {
    title: 'Garage Door Repair Marketing: From Invisible to #1 on Maps',
    tag: 'Case Study',
  },
  {
    title: "Why 'Near Me' Searches Matter for Home Service Businesses",
    tag: 'Local SEO',
  },
  {
    title: 'Plumbing SEO Guide: Rank Higher and Get More Emergency Calls',
    tag: 'Industry SEO',
  },
]

const testimonials = [
  {
    name: 'Mike T.',
    role: 'Junk Removal Business Owner',
    location: 'Texas, USA',
    text: "Atia completely changed the game for our junk removal business. We went from barely getting calls to ranking top 3 on Google Maps. Her understanding of local SEO for home services is next level. If you're a contractor struggling to get found, call Atia.",
    rating: 5,
  },
  {
    name: 'Fatima A.',
    role: 'Home Renovation Contractor',
    location: 'Dubai, UAE',
    text: "Working with Atia was the best decision for our renovation company in Dubai. She helped us appear in AI Overviews and optimized our Google Business Profile. Now we get consistent leads from homeowners searching for renovation services. Truly an expert in home renovation SEO.",
    rating: 5,
  },
  {
    name: 'Ahmed S.',
    role: 'Garage Door Repair Company',
    location: 'Riyadh, KSA',
    text: "Our garage door repair company was invisible online before Atia stepped in. Within months, we hit #1 on Google Maps in Riyadh. Her citation building and review strategy worked exactly as she promised. Highly recommend for any home service business in KSA.",
    rating: 5,
  },
]

const quickReplies = ['Home Service SEO', 'AI Overview Optimization', 'Free SEO Audit', 'WhatsApp']

/* ─────────────── component ─────────────── */

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([])
  const [chatInput, setChatInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration guard for next-themes
  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      setShowTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const openChatWithGreeting = () => {
    setChatOpen(true)
    if (chatMessages.length === 0) {
      setChatMessages([{
        role: 'bot',
        text: "Hello! 👋 Welcome to Atia Shaheen's portfolio. I specialize in Local SEO for Home Renovation businesses — Junk Removal, Garage Door Repair, Plumbing, and more. How can I help you today?",
      }])
    }
  }

  const sendChat = async (text?: string) => {
    const msg = text || chatInput.trim()
    if (!msg || chatLoading) return
    setChatInput('')
    setChatMessages(prev => [...prev, { role: 'user', text: msg }])
    setChatLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg }),
      })
      const data = await res.json()
      setChatMessages(prev => [...prev, { role: 'bot', text: data.reply || 'Sorry, something went wrong.' }])
    } catch {
      setChatMessages(prev => [...prev, { role: 'bot', text: 'Connection error. Please try again or contact Atia on WhatsApp!' }])
    }
    setChatLoading(false)
  }

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* ─── Navbar ─── */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-lg shadow-sm border-b border-border' : 'bg-transparent'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="text-xl font-bold tracking-tight">
            Atia<span className="text-primary">.</span>SEO
          </a>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <button key={item.href} onClick={() => scrollTo(item.href)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {mounted && (
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
                {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </Button>
            )}
            <Button className="hidden sm:inline-flex" onClick={() => scrollTo('#contact')}>Get Free SEO Audit</Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                {navItems.map(item => (
                  <button key={item.href} onClick={() => scrollTo(item.href)} className="text-left py-2 text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </button>
                ))}
                <Button className="mt-2" onClick={() => scrollTo('#contact')}>Get Free SEO Audit</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main className="flex-1">
        {/* ─── Hero ─── */}
        <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-primary/3 blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn>
                <Badge variant="secondary" className="mb-6 text-sm px-4 py-1.5">
                  Local SEO + AI SEO for Home Renovation
                </Badge>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                  Local SEO for Home Renovation{' '}
                  <span className="text-primary">That Gets You Found</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="mt-2 text-xl sm:text-2xl font-medium text-muted-foreground">
                  AI-Powered Search Optimization for Contractors
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Helping home renovation, junk removal, garage door repair, and plumbing businesses rank on Google Maps, Local Pack, and AI Overviews. Serving contractors across the USA, UAE, KSA, and Pakistan.
                </p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button size="lg" className="text-base px-8" onClick={() => scrollTo('#contact')}>
                    Get Free SEO Audit
                    <ChevronRight className="ml-1 size-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="text-base px-8" onClick={() => scrollTo('#portfolio')}>
                    View Case Studies
                  </Button>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ─── Stats ─── */}
        <section className="py-16 border-y border-border bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map(stat => (
                <StaggerItem key={stat.label} className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <stat.icon className="size-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ─── About ─── */}
        <section id="about" className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <FadeIn>
                  <Badge variant="outline" className="mb-4">About Me</Badge>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                    Local SEO for Home Renovation + AI Search Optimization
                  </h2>
                </FadeIn>
                <FadeIn delay={0.15}>
                  <p className="mt-2 text-xl text-primary font-medium">
                    The Contractor&apos;s Edge in Local Search
                  </p>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      I&apos;m Atia Shaheen — a Local SEO and AI SEO specialist who works exclusively with home renovation contractors and home service businesses. Whether you run a junk removal company in Texas, a garage door repair service in Riyadh, or a plumbing business in Dubai, I help you dominate local search.
                    </p>
                    <p>
                      My approach is built on the three pillars of local search: <strong className="text-foreground">Proximity, Relevance, and Prominence</strong>. I optimize your Google Business Profile, build consistent citations across directories like Angi, HomeAdvisor, and Houzz, and create content that ranks for high-intent &quot;near me&quot; searches.
                    </p>
                    <p>
                      But I don&apos;t stop at traditional SEO. I also optimize your business for <strong className="text-foreground">AI Overviews, Google SGE, and ChatGPT search visibility</strong>. When homeowners ask AI for &quot;the best plumber near me&quot; or &quot;garage door repair in my area,&quot; your business should be the answer. I make that happen.
                    </p>
                    <p>
                      Based in Pakistan, I serve clients across the <strong className="text-foreground">USA, UAE, KSA, and Pakistan</strong>. Every strategy I create is tailored to your trade, your market, and your goals.
                    </p>
                  </div>
                </FadeIn>
              </div>

              <div className="space-y-6">
                <FadeIn delay={0.2}>
                  <div className="relative aspect-square max-w-sm mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-border shadow-xl">
                    <img
                      src="/profile.jpg"
                      alt="Atia Shaheen — Local SEO Specialist for Home Renovation"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="grid grid-cols-2 gap-3">
                    {skills.map(skill => (
                      <div key={skill.label} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                        <skill.icon className="size-4 text-primary shrink-0" />
                        <span className="text-sm font-medium">{skill.label}</span>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Services ─── */}
        <section id="services" className="py-20 sm:py-28 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="outline" className="mb-4">Services</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold">
                SEO Services Built for Home Renovation
              </h2>
              <p className="mt-4 text-muted-foreground">
                Every service is designed specifically for contractors and home service businesses. No cookie-cutter strategies — just proven tactics that get your phone ringing.
              </p>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(service => (
                <StaggerItem key={service.title}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                      <div className="p-3 rounded-xl bg-primary/10 w-fit mb-3 group-hover:bg-primary/20 transition-colors">
                        <service.icon className="size-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg leading-snug">{service.title}</CardTitle>
                      <CardDescription className="mt-2 leading-relaxed">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {service.features.map(feature => (
                          <li key={feature} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="size-4 text-primary shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ─── Portfolio / Case Studies ─── */}
        <section id="portfolio" className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="outline" className="mb-4">Case Studies</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Real Results for Home Service Businesses
              </h2>
              <p className="mt-4 text-muted-foreground">
                From invisible to #1 on Google Maps. From zero AI presence to featured in AI Overviews. Here&apos;s what happens when you combine local SEO with AI optimization.
              </p>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-2 gap-6">
              {portfolio.map(item => (
                <StaggerItem key={item.title}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <item.icon className="size-5 text-primary" />
                        </div>
                        <Badge variant="secondary">{item.category}</Badge>
                      </div>
                      <CardTitle className="text-lg leading-snug">{item.title}</CardTitle>
                      <CardDescription className="mt-2 leading-relaxed">{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {item.results.map(result => (
                          <Badge key={result} variant="outline" className="text-xs font-medium">
                            <CheckCircle2 className="size-3 mr-1 text-primary" />
                            {result}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ─── Process ─── */}
        <section id="process" className="py-20 sm:py-28 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="outline" className="mb-4">My Process</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold">
                How I Rank Home Service Businesses
              </h2>
              <p className="mt-4 text-muted-foreground">
                A clear, proven process that takes your home renovation business from invisible to dominant in local search.
              </p>
            </FadeIn>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map(item => (
                <StaggerItem key={item.step}>
                  <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="mx-auto p-3 rounded-full bg-primary/10 w-fit mb-2">
                        <item.icon className="size-6 text-primary" />
                      </div>
                      <span className="text-xs font-bold text-primary uppercase tracking-widest">Step {item.step}</span>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ─── Articles ─── */}
        <section id="articles" className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="outline" className="mb-4">Articles</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold">
                SEO Insights for Home Renovation
              </h2>
              <p className="mt-4 text-muted-foreground">
                Practical guides and strategies for contractors who want to rank higher and get more leads.
              </p>
            </FadeIn>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(article => (
                <StaggerItem key={article.title}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit text-xs">{article.tag}</Badge>
                      <CardTitle className="text-base leading-snug mt-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <span className="text-sm text-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read more <ChevronRight className="size-3" />
                      </span>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ─── Testimonials ─── */}
        <section id="testimonials" className="py-20 sm:py-28 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="outline" className="mb-4">Testimonials</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold">
                What Contractors Say
              </h2>
              <p className="mt-4 text-muted-foreground">
                Real feedback from home service businesses across the USA, UAE, KSA, and Pakistan.
              </p>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-3 gap-6">
              {testimonials.map(t => (
                <StaggerItem key={t.name}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex gap-1 mb-2">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <CardDescription className="leading-relaxed text-foreground/80">
                        &ldquo;{t.text}&rdquo;
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{t.name}</p>
                          <p className="text-xs text-muted-foreground">{t.role}, {t.location}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ─── Contact ─── */}
        <section id="contact" className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="outline" className="mb-4">Contact</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Ready to Rank Your Home Service Business?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Get a free SEO audit and discover how Local SEO can transform your contractor business. Serving clients in USA, UAE, KSA, and Pakistan.
              </p>
            </FadeIn>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact info */}
              <FadeIn>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <MessageCircle className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">Quick consultation available</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Mail className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-sm text-muted-foreground">Detailed inquiries welcome</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <MapPin className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-sm text-muted-foreground">Islamabad, Pakistan</p>
                      <p className="text-xs text-muted-foreground mt-1">Serving clients in USA, UAE, KSA, and Pakistan</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Linkedin className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">LinkedIn</p>
                      <p className="text-sm text-muted-foreground">Connect professionally</p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Contact form */}
              <FadeIn delay={0.2}>
                <Card>
                  <CardContent className="pt-6">
                    <form onSubmit={e => { e.preventDefault(); }} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Name</label>
                        <Input placeholder="Your full name" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Email</label>
                        <Input type="email" placeholder="you@company.com" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Your Business Type</label>
                        <Input placeholder="e.g. Junk Removal, Plumbing, Garage Door Repair" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Message</label>
                        <Textarea placeholder="Tell me about your business and SEO goals..." rows={4} />
                      </div>
                      <Button type="submit" className="w-full" size="lg">
                        <Send className="size-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="sm:col-span-2">
              <h3 className="text-xl font-bold mb-3">
                Atia<span className="text-primary">.</span>SEO
              </h3>
              <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                Local SEO and AI SEO specialist for home renovation contractors. Helping junk removal, garage door repair, plumbing, and home service businesses rank on Google Maps, Local Pack, and AI Overviews across USA, UAE, KSA, and Pakistan.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {navItems.slice(0, 4).map(item => (
                  <li key={item.href}>
                    <button onClick={() => scrollTo(item.href)} className="hover:text-foreground transition-colors">{item.label}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Google Business Profile</li>
                <li>AI Overview Optimization</li>
                <li>Citation Building</li>
                <li>SEO Content Strategy</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Atia Shaheen. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <button onClick={() => scrollTo('#about')} className="text-xs text-muted-foreground hover:text-foreground transition-colors">About</button>
              <button onClick={() => scrollTo('#contact')} className="text-xs text-muted-foreground hover:text-foreground transition-colors">Contact</button>
              <button onClick={() => scrollTo('#services')} className="text-xs text-muted-foreground hover:text-foreground transition-colors">Services</button>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── Chatbot Widget ─── */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="mb-4 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl border border-border shadow-2xl bg-background overflow-hidden"
            >
              {/* Chat header */}
              <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground">
                <div className="flex items-center gap-2">
                  <Bot className="size-5" />
                  <div>
                    <p className="text-sm font-semibold">Atia&apos;s SEO Assistant</p>
                    <p className="text-xs opacity-80">Home Renovation SEO Expert</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20" onClick={() => setChatOpen(false)}>
                  <X className="size-4" />
                </Button>
              </div>

              {/* Chat messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-3" style={{ scrollbarWidth: 'thin' }}>
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'bot' && (
                      <div className="size-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="size-4 text-primary" />
                      </div>
                    )}
                    <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      {msg.text}
                    </div>
                    {msg.role === 'user' && (
                      <div className="size-7 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                        <User className="size-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex gap-2 justify-start">
                    <div className="size-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Bot className="size-4 text-primary" />
                    </div>
                    <div className="bg-muted rounded-2xl px-4 py-2 text-sm">
                      <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        Typing...
                      </motion.span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Quick replies */}
              {chatMessages.length <= 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-2">
                  {quickReplies.map(reply => (
                    <Button key={reply} variant="outline" size="sm" className="text-xs" onClick={() => sendChat(reply)}>
                      {reply}
                    </Button>
                  ))}
                </div>
              )}

              {/* Chat input */}
              <div className="p-3 border-t border-border">
                <form onSubmit={e => { e.preventDefault(); sendChat(); }} className="flex gap-2">
                  <Input
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    placeholder="Ask about home renovation SEO..."
                    className="flex-1"
                    disabled={chatLoading}
                  />
                  <Button type="submit" size="icon" disabled={chatLoading || !chatInput.trim()}>
                    <Send className="size-4" />
                  </Button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={openChatWithGreeting}
          className="size-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open chat"
        >
          <MessageCircle className="size-6" />
        </motion.button>
      </div>

      {/* ─── Scroll to top ─── */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 left-6 z-50 size-10 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
            aria-label="Scroll to top"
          >
            <ArrowUp className="size-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
