import { useState, useEffect } from 'react'
import {
  Shield, Users, Calendar, Download, Play, ChevronRight, Menu, X,
  CheckCircle, AlertCircle, DollarSign, Globe, Heart, Plane,
  Stethoscope, Clock, TrendingUp, Baby, Car, Home, Briefcase,
  MessageCircle, BookOpen, Target, Zap, Award, Phone, Mail,
  MapPin, Star, ArrowRight, Check, ExternalLink, Copy,
  Share2, Printer, ChevronDown, ChevronUp, Filter, Search
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts'
import './App.css'

// ============ DATA ============
const BLUE_ROYALE_DATA = {
  name: "Blue Royale",
  tagline: "Your Global Health Shield",
  coverage: "Up to USD 2 Million",
  plans: [
    { name: "Plan A", coverage: "$500,000", roomPH: "$300/day", roomOverseas: "Private up to $1,000", surgeon: "$30,000", bariatric: "$2,000" },
    { name: "Plan B", coverage: "$1,000,000", roomPH: "$600/day", roomOverseas: "Private up to $1,500", surgeon: "As Charged", bariatric: "$3,000" },
    { name: "Plan C", coverage: "$2,000,000", roomPH: "$850/day", roomOverseas: "Private up to $1,500", surgeon: "As Charged", bariatric: "$5,000" }
  ],
  premiums: [
    { age: "0-25", planA: "$1,789-2,712", planB: "$2,055-2,936", planC: "$2,568-3,642" },
    { age: "26-35", planA: "$2,005-2,154", planB: "$3,681-4,036", planC: "$4,608-4,936" },
    { age: "36-45", planA: "$2,358-2,831", planB: "$4,425-4,767", planC: "$5,238-5,454" },
    { age: "46-55", planA: "$3,023-3,435", planB: "$5,106-5,344", planC: "$5,732-5,955" },
    { age: "56-65", planA: "$3,652-3,941", planB: "$5,836-6,757", planC: "$6,483-7,529" },
    { age: "66-70", planA: "$4,173-5,084", planB: "$9,329-11,957", planC: "$10,310-13,070" }
  ],
  benefits: [
    { icon: Globe, title: "Worldwide Coverage", desc: "Get treated anywhere in the world" },
    { icon: Shield, title: "Freedom of Choice", desc: "Pick any hospital, clinic, or doctor" },
    { icon: Plane, title: "Travel Included", desc: "COVID-19 + travel coverage built-in" },
    { icon: Baby, title: "Maternity Cover", desc: "Childbirth & newborn benefits" },
    { icon: Stethoscope, title: "No Medical Exam", desc: "Easy enrollment, no blood tests" },
    { icon: Phone, title: "24/7 Telemedicine", desc: "Video consults anytime, anywhere" },
    { icon: Heart, title: "Mental Health", desc: "Telehealth mental health support" },
    { icon: Award, title: "Up to Age 100", desc: "Coverage extends to seniors" }
  ],
  targetMarket: ["Frequent Travelers", "OFWs & Expats", "Young Professionals", "Families", "Digital Nomads", "Senior Citizens", "High-Net-Worth Individuals"]
}

const FLEXISHIELD_DATA = {
  name: "FlexiShield",
  tagline: "Your HMO's Power-Up",
  coverage: "Up to PHP 2 Million",
  plans: [
    { name: "FlexiShield 150", deductible: "PHP 150,000-199,000", premium18k: "PHP 8,019-10,517", premium45k: "PHP 15,131-22,702", premium65k: "PHP 35,549-44,442" },
    { name: "FlexiShield 200", deductible: "PHP 200,000+", premium18k: "PHP 7,291-8,400", premium45k: "PHP 11,693-17,685", premium65k: "PHP 27,093-33,891" }
  ],
  benefits: [
    { icon: Shield, title: "2nd Layer Protection", desc: "Tops up your existing HMO coverage" },
    { icon: Zap, title: "ICU Coverage", desc: "Full intensive care unit benefits" },
    { icon: Heart, title: "Daily Hospital Income", desc: "PHP 3,000/day for non-medical costs" },
    { icon: Clock, title: "Cashless Availment", desc: "No-cash-out through network hospitals" },
    { icon: Stethoscope, title: "Surgical Benefits", desc: "Full OR and recovery coverage" },
    { icon: Check, title: "COVID-19 Covered", desc: "Pandemic protection included" },
    { icon: Phone, title: "Telemedicine", desc: "24/7 doctor consultations" },
    { icon: TrendingUp, title: "Affordable Premiums", desc: "Budget-friendly top-up option" }
  ],
  howItWorks: [
    { step: 1, title: "HMO Kicks In", desc: "Your company HMO pays first" },
    { step: 2, title: "FlexiShield Takes Over", desc: "We cover what HMO doesn't" },
    { step: 3, title: "Peace of Mind", desc: "You focus on recovery, not bills" }
  ]
}

const PHILIPPINES_STATS = {
  insurancePenetration: "1.79%",
  oecdAverage: "6.2%",
  gap: "4.41%",
  density: "$75.05",
  premiums: "PHP 242.84 Billion",
  lifePremiums: "PHP 403 Billion",
  population: "115 Million",
  insured: "~21 Million",
  uninsured: "~94 Million"
}

const LIFE_STAGES = [
  {
    stage: "Single Young Professional",
    age: "18-30",
    income: "PHP 15K-40K/month",
    needs: ["Critical Illness Cover", "Accident Protection", "Temporary Coverage"],
    product: "FlexiShield + Add-ons",
    priority: "High",
    humor: "No parents to call = you ARE the safety net now"
  },
  {
    stage: "New Couple / DINK",
    age: "25-40",
    income: "PHP 40K-80K/month",
    needs: ["Health Protection for Two", "Income Replacement", "Future Planning"],
    product: "Blue Royale Plan B",
    priority: "Critical",
    humor: "Two incomes, one broken AC unit away from disaster"
  },
  {
    stage: "Growing Family",
    age: "30-50",
    income: "PHP 60K-150K/month",
    needs: ["Family Health Coverage", "Education Fund", "Life Protection"],
    product: "Blue Royale Family Plan",
    priority: "Critical",
    humor: "Kids be like: 'Dad, I need PHP 500K for braces' - said no insurance ever"
  },
  {
    stage: "Peak Earner / OFW",
    age: "35-55",
    income: "PHP 100K-500K/month",
    needs: ["Global Coverage", "Asset Protection", "Estate Planning"],
    product: "Blue Royale Plan C",
    priority: "Critical",
    humor: "OFW life: building someone else's country while risking your own health"
  },
  {
    stage: "Pre-Retirement",
    age: "50-60",
    income: "PHP 80K-200K/month",
    needs: ["Health Coverage", "Retirement Planning", "Legacy Building"],
    product: "Blue Royale + Investments",
    priority: "High",
    humor: "Your body is like a car - parts expensive, no more warranty"
  },
  {
    stage: "Golden Years",
    age: "60+",
    income: "PHP 30K-100K/month",
    needs: ["Medical Coverage", "Critical Illness", "Care Options"],
    product: "Blue Royale Senior",
    priority: "Critical",
    humor: "At 60+, hospital visits are like reunions - bring snacks"
  }
]

const FAQ_DATA = [
  {
    category: "Product Basics",
    questions: [
      { q: "What's the difference between Blue Royale and FlexiShield?", a: "Think of it like this: Blue Royale is your main health insurance (like a main course), while FlexiShield is a supplement that tops up your existing HMO (like a really good side dish). Blue Royale gives you standalone coverage worldwide. FlexiShield adds PHP 2M on top of whatever HMO you already have." },
      { q: "Do I really need insurance if I have HMO?", a: "Your HMO is like an umbrella - great for drizzle, but you'll need more when it storms. HMO typically has caps: room limits, coverage caps, no ICU coverage, limited to network hospitals. Blue Royale and FlexiShield fill those gaps. Real talk: One serious illness can cost PHP 500K-PHP 5M. Is your HMO ready?" },
      { q: "I'm healthy. Why should I pay for insurance?", a: "Exactly WHY you're healthy NOW is the point! Lower premiums, no pre-existing conditions issues, and you're covered BEFORE things go sideways. Insurance is like a seatbelt - you don't wear it because you WILL crash, you wear it just in case. Also, getting insurance when you're older = way more expensive. Trust the process." }
    ]
  },
  {
    category: "Coverage Questions",
    questions: [
      { q: "Does this cover COVID-19?", a: "Yes! Both Blue Royale and FlexiShield include COVID-19 coverage. Blue Royale even covers vaccination costs overseas. Because 2020 taught us nothing is guaranteed." },
      { q: "Can I choose any hospital?", a: "With Blue Royale: ABSOLUTELY. Any hospital, anywhere in the world. No network restrictions. FlexiShield: You get cashless at network hospitals, but can reimburse at others too. Your health, your choice." },
      { q: "What's not covered?", a: "Pre-existing conditions not disclosed (be honest!), certain elective procedures, and standard exclusions like self-inflicted injuries. But overall, Pacific Cross has one of the most comprehensive coverage in the market. Read the fine print - we can walk you through it." }
    ]
  },
  {
    category: "For OFWs",
    questions: [
      { q: "I'm abroad. Can I still avail?", a: "YES! This is literally MADE for OFWs. Blue Royale gives you worldwide coverage - whether you're in Dubai, Saudi, or the middle of the Pacific. Many OFWs come home for treatment, or need evacuation. We've got you." },
      { q: "How do I pay from abroad?", a: "Multiple options: credit card, bank transfer, GCash (for some plans). Premiums can be paid in USD or PHP. Set it up auto-pay and forget about it - like your ex, but useful." },
      { q: "Can I cover my family back home?", a: "YES! That's the whole point. Many OFWs get coverage for kids, parents, siblings. PHP 2,000-5,000/month can protect your entire family's health. Cheaper than a night out and infinitely more valuable." }
    ]
  },
  {
    category: "For Advisors",
    questions: [
      { q: "How do I become a Pacific Cross advisor?", a: "Contact Keystone (our training partner) for licensing. Complete the training, pass the exam, get your license. After that, we've got your back with marketing materials, presentations, and ongoing support. Your success = our success." },
      { q: "What commission can I expect?", a: "Competitive commissions based on premium amounts. Top performers get bonuses and incentives. The more clients you help, the more you earn. It's not charity - you get paid well to help people sleep at night." },
      { q: "How do I handle objections?", a: "Common objection: 'I can't afford it.' Response: 'Can you afford PHP 500K for cancer treatment?' Common objection: 'I'm healthy.' Response: 'That's exactly when to get it - wait and you'll pay more or get excluded.' We have full objection handling training modules." }
    ]
  }
]

const ADVISOR_ROADMAP = [
  {
    phase: "Phase 1: Foundation (Week 1-2)",
    tasks: [
      "Complete licensing requirements",
      "Attend Keystone training sessions",
      "Study Blue Royale and FlexiShield products inside out",
      "Set up your digital presence (Facebook page, profiles)",
      "Create your elevator pitch (30 seconds)"
    ],
    deliverables: ["License", "Product Mastery", "Social Media Ready"]
  },
  {
    phase: "Phase 2: Pipeline Building (Week 3-4)",
    tasks: [
      "List 50 potential clients (warm leads first)",
      "Post on social media 3x/week minimum",
      "Conduct 5 informational presentations",
      "Join 2 networking events or OFW groups",
      "Set up appointment system"
    ],
    deliverables: ["Lead List", "Content Calendar", "Demo Presentations"]
  },
  {
    phase: "Phase 3: First Sales (Week 5-8)",
    tasks: [
      "Close first 3 sales (any product)",
      "Get 2 referrals from satisfied clients",
      "Create case studies from real situations",
      "Build testimonial collection",
      "Start compound marketing efforts"
    ],
    deliverables: ["First Clients", "Referral System", "Social Proof"]
  },
  {
    phase: "Phase 4: Scale Up (Month 3-6)",
    tasks: [
      "Aim for 5-10 clients/month",
      "Build team (recruit 2-3 fellow advisors)",
      "Automate posting and follow-ups",
      "Develop niche expertise (OFW market, corporate, etc.)",
      "Create passive income through team overrides"
    ],
    deliverables: ["Consistent Income", "Team", "Specialization"]
  }
]

const CONTENT_CALENDAR = [
  { week: "Week 1", theme: "Product Introduction", posts: [
    { day: "Monday", type: "Educational", content: "What is health insurance and why you need it", platform: "Facebook/Instagram" },
    { day: "Wednesday", type: "Product", content: "Blue Royale vs HMO: The Difference", platform: "Facebook/Instagram" },
    { day: "Friday", type: "Engagement", content: "Poll: How much did you spend on healthcare last year?", platform: "Facebook" }
  ]},
  { week: "Week 2", theme: "FlexiShield Focus", posts: [
    { day: "Monday", type: "Educational", content: "Why your HMO isn't enough (trigger content)", platform: "Facebook/Instagram" },
    { day: "Wednesday", type: "Product", content: "FlexiShield: Your HMO's Power-Up", platform: "Facebook/Instagram" },
    { day: "Friday", type: "Testimonial", content: "Real story: How FlexiShield saved PHP 500K", platform: "Facebook" }
  ]},
  { week: "Week 3", theme: "OFW Special", posts: [
    { day: "Monday", type: "Educational", content: "Health risks OFWs face abroad", platform: "Facebook/Instagram" },
    { day: "Wednesday", type: "Product", content: "Protect your family from 10,000 km away", platform: "Facebook/Instagram" },
    { day: "Friday", type: "Engagement", content: "Q&A: Ask me anything about OFW insurance", platform: "Facebook Live" }
  ]},
  { week: "Week 4", theme: "Objection Handling", posts: [
    { day: "Monday", type: "Educational", content: "'I don't need insurance because I'm healthy'", platform: "Facebook/Instagram" },
    { day: "Wednesday", type: "Product", content: "Compare: PHP 300/month vs PHP 500K emergency", platform: "Facebook/Instagram" },
    { day: "Friday", type: "CTA", content: "Limited time: Free consultation this weekend", platform: "All platforms" }
  ]}
]

const COMPARISON_DATA = [
  { name: 'Philippines', penetration: 1.79, color: '#FF6B6B' },
  { name: 'Thailand', penetration: 5.2, color: '#4ECDC4' },
  { name: 'Singapore', penetration: 11.5, color: '#45B7D1' },
  { name: 'OECD Avg', penetration: 6.2, color: '#96CEB4' },
]

const MARKET_INSIGHTS = {
  demographics: {
    totalPopulation: "115M",
    medianAge: "25.7 years",
    ofwPopulation: "2.2M abroad",
    urbanPopulation: "48%",
    workingAge: "64%",
    middleClass: "45% growing"
  },
  buyingPower: {
    avgIncome: "PHP 22,000/month",
    healthExpenditure: "PHP 8,500/year",
    outOfPocket: "58% of health spending",
    insuranceWillingness: "32% have intention, 12% act"
  },
  misconceptions: [
    { myth: "Insurance is only for old people", reality: "Premiums are CHEAPER when young and healthy. Waiting = higher costs or exclusions." },
    { myth: "Company HMO is enough", reality: "HMO caps at PHP 100K-500K. Major illness costs PHP 500K-5M+. Big gap." },
    { myth: "Insurance is a waste of money", reality: "Car insurance is mandatory. Health insurance = protecting your family's finances." },
    { myth: "I'm healthy, I don't need it", reality: "That's like saying 'I don't need a roof because it's not raining.' PREVENTION > CURE" },
    { myth: "Insurance agents are pushy/scam", reality: "Not all agents are equal. Find someone who educates, not pressures." }
  ],
  overlookedBenefits: [
    "Telemedicine - 24/7 doctor access from anywhere",
    "Mental health support - Often forgotten but crucial",
    "Pre & post hospitalization - Recovery costs money too",
    "Second opinion services - Critical for serious diagnoses",
    "Preventive care - Vaccinations, check-ups included"
  ],
  contradictions: [
    { product: "HMO + FlexiShield", vs: "Standalone Plan", insight: "FlexiShield is CHEAPER because HMO does first-layer. Standalone = full premium." },
    { product: "Blue Royale vs. FlexiShield", vs: "Different use cases", insight: "No competition - Blue Royale for no-HMO, FlexiShield for HMO users. Together = bulletproof." },
    { product: "Short-term vs Long-term", vs: "Premium vs Coverage", insight: "Short-term = higher premium per year but flexible. Long-term = lower effective cost." }
  ]
}

// ============ COMPONENTS ============

// Stats Counter Component
const StatsCounter = () => {
  const stats = [
    { label: "Insurance Penetration", value: PHILIPPINES_STATS.insurancePenetration, sub: "vs OECD " + PHILIPPINES_STATS.oecdAverage, color: "text-red-500" },
    { label: "Uninsured Filipinos", value: PHILIPPINES_STATS.uninsured, sub: "out of " + PHILIPPINES_STATS.population, color: "text-yellow-500" },
    { label: "Health Expenditure", value: PHILIPPINES_STATS.density, sub: "insurance density per capita", color: "text-blue-500" },
    { label: "Premium Growth", value: "12.8%", sub: "industry growth 2024", color: "text-green-500" }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {stats.map((stat, i) => (
        <div key={i} className="border-2 border-black p-4 text-center bg-white">
          <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
          <div className="text-xs font-bold uppercase mt-1">{stat.label}</div>
          <div className="text-xs text-gray-600">{stat.sub}</div>
        </div>
      ))}
    </div>
  )
}

// Product Card Component
interface ProductData {
  name: string;
  tagline: string;
  coverage: string;
  plans: any[];
  benefits: { icon: any; title: string; desc: string }[];
  premiums?: any[];
  targetMarket?: string[];
  howItWorks?: any[];
}

const ProductCard = ({ product, type }: { product: ProductData, type: 'blue' | 'flexi' }) => {
  const [expanded, setExpanded] = useState(false)
  const isBlue = type === 'blue'
  const accentColor = isBlue ? "border-blue-500" : "border-green-500"
  const bgColor = isBlue ? "bg-blue-500" : "bg-green-500"
  const textColor = isBlue ? "text-blue-600" : "text-green-600"

  return (
    <div className={`border-4 ${accentColor} bg-white`}>
      <div className={`${bgColor} p-4 text-white`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-black uppercase">{product.name}</h3>
            <p className="text-sm opacity-90">{product.tagline}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black">{product.coverage}</div>
            <div className="text-xs uppercase">Maximum Coverage</div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-2 mb-4">
          {product.benefits.map((benefit, i) => (
            <div key={i} className="border border-gray-200 p-2">
              <benefit.icon className={`w-6 h-6 ${textColor}`} />
              <div className="font-bold text-sm mt-1">{benefit.title}</div>
              <div className="text-xs text-gray-600">{benefit.desc}</div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className={`w-full ${bgColor} text-white font-bold py-3 uppercase tracking-wider flex justify-between items-center px-4`}
        >
          <span>View Plans & Pricing</span>
          {expanded ? <ChevronUp /> : <ChevronDown />}
        </button>

        {expanded && (
          <div className="mt-4 animate-fade-in">
            {isBlue ? (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="p-2">Plan</th>
                      <th className="p-2">Coverage</th>
                      <th className="p-2">Room PH</th>
                      <th className="p-2">Room Abroad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BLUE_ROYALE_DATA.plans.map((plan, i) => (
                      <tr key={i} className="border-b">
                        <td className="p-2 font-bold">{plan.name}</td>
                        <td className="p-2">{plan.coverage}</td>
                        <td className="p-2">{plan.roomPH}</td>
                        <td className="p-2">{plan.roomOverseas}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 text-xs bg-gray-100 p-3">
                  <div className="font-bold mb-2">Annual Premiums (USD with Travel+):</div>
                  <div className="grid grid-cols-3 gap-2">
                    {BLUE_ROYALE_DATA.premiums.map((p, i) => (
                      <div key={i} className="border p-1">
                        <div className="font-bold">{p.age}</div>
                        <div>A: {p.planA}</div>
                        <div>B: {p.planB}</div>
                        <div>C: {p.planC}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="p-2">Plan</th>
                      <th className="p-2">Deductible</th>
                      <th className="p-2">Age 18-35</th>
                      <th className="p-2">Age 45-55</th>
                      <th className="p-2">Age 65-70</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FLEXISHIELD_DATA.plans.map((plan, i) => (
                      <tr key={i} className="border-b">
                        <td className="p-2 font-bold">{plan.name}</td>
                        <td className="p-2">{plan.deductible}</td>
                        <td className="p-2">{plan.premium18k}</td>
                        <td className="p-2">{plan.premium45k}</td>
                        <td className="p-2">{plan.premium65k}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 text-xs bg-gray-100 p-3">
                  <div className="font-bold mb-2">Premium in PHP per year. Higher deductible = Lower premium.</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Life Stage Card
const LifeStageCard = ({ stage }: { stage: typeof LIFE_STAGES[0] }) => {
  const priorityColors: Record<string, string> = {
    Critical: "bg-red-500 text-white",
    High: "bg-yellow-500 text-black",
    Medium: "bg-blue-500 text-white"
  }

  return (
    <div className="border-2 border-black bg-white">
      <div className="bg-black text-white p-3">
        <div className="flex justify-between items-center">
          <h3 className="font-black text-lg">{stage.stage}</h3>
          <span className={`px-2 py-1 text-xs font-bold ${priorityColors[stage.priority]}`}>
            {stage.priority}
          </span>
        </div>
        <div className="text-sm opacity-80">{stage.age} | {stage.income}</div>
      </div>
      <div className="p-4">
        <div className="mb-3">
          <div className="text-xs font-bold uppercase text-gray-600 mb-1">Your Needs</div>
          <div className="flex flex-wrap gap-1">
            {stage.needs.map((need, i) => (
              <span key={i} className="bg-gray-200 px-2 py-1 text-xs">{need}</span>
            ))}
          </div>
        </div>
        <div className="border-l-4 border-blue-500 pl-3 mb-3">
          <div className="text-xs font-bold uppercase text-gray-600">Recommended</div>
          <div className="font-black">{stage.product}</div>
        </div>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3">
          <div className="text-xs font-bold text-yellow-800">Real Talk</div>
          <div className="text-sm italic">{stage.humor}</div>
        </div>
      </div>
    </div>
  )
}

// FAQ Accordion
const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-2 border-black mb-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-4 text-left font-bold flex justify-between items-center bg-white hover:bg-gray-100"
      >
        <span>{question}</span>
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>
      {open && (
        <div className="p-4 bg-gray-50 border-t-2 border-black animate-fade-in">
          <p className="text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

// Roadmap Phase
const RoadmapPhase = ({ phase, tasks, deliverables, index }: { phase: string, tasks: string[], deliverables: string[], index: number }) => {
  const [expanded, setExpanded] = useState(false)
  const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500"]

  return (
    <div className="border-2 border-black">
      <button
        onClick={() => setExpanded(!expanded)}
        className={`${colors[index % 4]} text-white w-full p-4 font-black text-lg flex justify-between items-center`}
      >
        <span>{phase}</span>
        {expanded ? <ChevronUp /> : <ChevronDown />}
      </button>
      {expanded && (
        <div className="p-4 animate-fade-in">
          <div className="mb-4">
            <div className="font-bold text-sm uppercase mb-2">Tasks</div>
            <ul className="space-y-1">
              {tasks.map((task, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-bold text-sm uppercase mb-2">Deliverables</div>
            <div className="flex flex-wrap gap-2">
              {deliverables.map((d, i) => (
                <span key={i} className="bg-black text-white px-3 py-1 text-xs font-bold">{d}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Content Calendar Card
const ContentCard = ({ post }: { post: { day: string, type: string, content: string, platform: string } }) => {
  const typeColors: Record<string, string> = {
    Educational: "bg-blue-100 border-blue-500",
    Product: "bg-purple-100 border-purple-500",
    Engagement: "bg-green-100 border-green-500",
    Testimonial: "bg-yellow-100 border-yellow-500",
    CTA: "bg-red-100 border-red-500"
  }

  return (
    <div className={`border-l-4 ${typeColors[post.type]} p-3 mb-2`}>
      <div className="flex justify-between items-start mb-1">
        <span className="font-bold text-sm">{post.day}</span>
        <span className="text-xs bg-black text-white px-2 py-0.5">{post.platform}</span>
      </div>
      <div className="text-xs font-bold text-gray-600 uppercase mb-1">{post.type}</div>
      <div className="text-sm">{post.content}</div>
    </div>
  )
}

// Chart Component
const ComparisonChart = () => {
  return (
    <div className="border-2 border-black p-4 bg-white">
      <h3 className="font-black text-lg mb-4">Insurance Penetration: Philippines vs Asia</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={COMPARISON_DATA} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[0, 15]} />
          <YAxis type="category" dataKey="name" width={80} />
          <Tooltip />
          <Bar dataKey="penetration" radius={[0, 4, 4, 0]}>
            {COMPARISON_DATA.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="text-xs text-center text-gray-600 mt-2">
        Source: Insurance Commission, OECD | Philippines at 1.79% vs OECD average of 6.2%
      </div>
    </div>
  )
}

// Pie Chart
const DemographicsPie = () => {
  const data = [
    { name: 'Insured', value: 21, color: '#22C55E' },
    { name: 'Uninsured', value: 94, color: '#EF4444' }
  ]

  return (
    <div className="border-2 border-black p-4 bg-white">
      <h3 className="font-black text-lg mb-4">115 Million Filipinos: Who Has Coverage?</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
            label={({name, value}) => `${name}: ${value}M`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="text-xs text-center text-gray-600">
        Only ~21M Filipinos have insurance coverage
      </div>
    </div>
  )
}

// The Big Picture Modal
const BigPictureModal = () => {
  const [open, setOpen] = useState(false)

  if (!open) return (
    <button
      onClick={() => setOpen(true)}
      className="fixed bottom-6 right-6 bg-yellow-400 text-black font-black p-4 shadow-lg animate-bounce z-50"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  )

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-black text-white shadow-2xl z-50 border-4 border-yellow-400">
      <div className="bg-yellow-400 text-black p-4 font-black flex justify-between items-center">
        <span>The Big Picture</span>
        <button onClick={() => setOpen(false)}><X className="w-5 h-5" /></button>
      </div>
      <div className="p-4 text-sm space-y-3 max-h-80 overflow-y-auto">
        <p><strong className="text-yellow-400">Why This Matters:</strong></p>
        <p>At 1.79% penetration vs 6.2% OECD average, we're basically playing health Russian roulette. Every Filipino family is one illness away from financial devastation.</p>
        <p><strong className="text-green-400">The Opportunity:</strong></p>
        <p>94 million uninsured Filipinos. If we can move the needle to even 3%, that's millions of families protected. This isn't just selling insurance - it's nation-building.</p>
        <p><strong className="text-blue-400">The Ripple Effect:</strong></p>
        <p>When a breadwinner has coverage, kids stay in school. When parents are protected, OFWs can work abroad without guilt. When families are secure, the economy grows.</p>
        <p><strong className="text-purple-400">The Future:</strong></p>
        <p>Imagine Philippines with 10% insurance penetration. Hospital bills don't bankrupt families. Healthcare becomes accessible. We become a developed nation faster.</p>
      </div>
    </div>
  )
}

// Navigation
const Navigation = ({ activeSection, setActiveSection }: { activeSection: string, setActiveSection: (s: string) => void }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { id: "home", label: "HOME", icon: Shield },
    { id: "products", label: "PRODUCTS", icon: Stethoscope },
    { id: "guide", label: "LIFE STAGES", icon: TrendingUp },
    { id: "faq", label: "FAQ", icon: MessageCircle },
    { id: "training", label: "TRAINING", icon: BookOpen },
    { id: "roadmap", label: "ROADMAP", icon: MapPin },
    { id: "resources", label: "RESOURCES", icon: Download }
  ]

  return (
    <nav className="bg-black text-white sticky top-0 z-40 border-b-4 border-yellow-400">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-yellow-400 text-black font-black flex items-center justify-center">PC</div>
            <div className="hidden md:block">
              <div className="font-black text-lg">PACIFIC CROSS</div>
              <div className="text-xs text-gray-400">ADVISOR HUB</div>
            </div>
          </div>

          <div className="hidden lg:flex gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-3 py-2 text-xs font-bold uppercase transition-all ${
                  activeSection === item.id
                    ? "bg-yellow-400 text-black"
                    : "hover:bg-gray-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden bg-yellow-400 text-black p-2"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-800">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setMenuOpen(false); }}
                className={`w-full text-left px-4 py-3 text-sm font-bold uppercase flex items-center gap-3 ${
                  activeSection === item.id ? "bg-yellow-400 text-black" : ""
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

// Section Components
const HomeSection = () => (
  <div className="space-y-8">
    {/* Hero */}
    <div className="bg-black text-white p-8 md:p-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-4">
          <span className="text-yellow-400">INSURE</span> YOUR FUTURE
        </h1>
        <p className="text-xl md:text-2xl mb-6 text-gray-300">
          Blue Royale & FlexiShield: The Ultimate Protection Combo
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#products" className="bg-yellow-400 text-black px-6 py-3 font-black uppercase tracking-wider">
            Explore Products
          </a>
          <a href="#training" className="border-2 border-white px-6 py-3 font-black uppercase tracking-wider">
            Start Training
          </a>
        </div>
      </div>
    </div>

    {/* Stats */}
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-black mb-4 uppercase">The Philippine Insurance Reality</h2>
      <StatsCounter />
      <ComparisonChart />
    </div>

    {/* Products Preview */}
    <div id="products" className="max-w-7xl mx-auto px-4 scroll-mt-20">
      <h2 className="text-2xl font-black mb-4 uppercase">Choose Your Shield</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <ProductCard product={BLUE_ROYALE_DATA} type="blue" />
        <ProductCard product={FLEXISHIELD_DATA} type="flexi" />
      </div>
    </div>

    {/* For OFWs */}
    <div className="bg-yellow-400 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-black mb-4">FOR OUR MODERN HEROES</h2>
            <p className="text-lg mb-4">
              2.2 Million OFWs abroad. You work hard to provide for your family back home.
              But what happens if YOU get sick? Who takes care of THEM then?
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Coverage works worldwide</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Protect family from 10,000 km away</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Easy payment options from abroad</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5" /> PHP 2,000-5,000/month = Full family protection</li>
            </ul>
          </div>
          <div className="flex-1 bg-black text-white p-8 text-center">
            <div className="text-6xl font-black text-yellow-400">94M</div>
            <div className="text-xl font-bold">Uninsured Filipinos</div>
            <div className="text-sm mt-4 text-gray-400">Every single one of them one illness away from bankruptcy</div>
          </div>
        </div>
      </div>
    </div>

    {/* Misconceptions */}
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-black mb-4 uppercase">What Most People Get Wrong</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MARKET_INSIGHTS.misconceptions.map((item, i) => (
          <div key={i} className="border-2 border-black p-4">
            <div className="text-red-500 font-bold mb-2 flex items-center gap-2">
              <X className="w-5 h-5" /> MYTH
            </div>
            <p className="font-bold mb-2">{item.myth}</p>
            <div className="text-green-500 font-bold mb-2 flex items-center gap-2">
              <Check className="w-5 h-5" /> REALITY
            </div>
            <p className="text-sm text-gray-600">{item.reality}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const ProductsSection = () => (
  <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 scroll-mt-20">
    <h1 className="text-3xl font-black uppercase">Our Products</h1>

    {/* Comparison */}
    <div className="border-4 border-black p-6 bg-white">
      <h2 className="text-2xl font-black mb-4">Quick Comparison</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-3 text-left">Feature</th>
              <th className="p-3 text-center bg-blue-500">Blue Royale</th>
              <th className="p-3 text-center bg-green-500">FlexiShield</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-3 font-bold">Type</td><td className="p-3 text-center">Standalone</td><td className="p-3 text-center">HMO Top-Up</td></tr>
            <tr className="border-b"><td className="p-3 font-bold">Coverage</td><td className="p-3 text-center">Up to USD 2M</td><td className="p-3 text-center">Up to PHP 2M</td></tr>
            <tr className="border-b"><td className="p-3 font-bold">Currency</td><td className="p-3 text-center">USD</td><td className="p-3 text-center">PHP</td></tr>
            <tr className="border-b"><td className="p-3 font-bold">Hospital Choice</td><td className="p-3 text-center">Anywhere in the world</td><td className="p-3 text-center">Network + Reimbursement</td></tr>
            <tr className="border-b"><td className="p-3 font-bold">Best For</td><td className="p-3 text-center">No HMO / Travelers / OFWs</td><td className="p-3 text-center">HMO holders wanting more</td></tr>
            <tr className="border-b"><td className="p-3 font-bold">Starting Premium</td><td className="p-3 text-center">~USD 1,789/year</td><td className="p-3 text-center">~PHP 7,291/year</td></tr>
            <tr className="border-b"><td className="p-3 font-bold">COVID Coverage</td><td className="p-3 text-center">Included + Vaccines</td><td className="p-3 text-center">Included</td></tr>
            <tr className="border-b"><td className="p-3 font-bold">Telemedicine</td><td className="p-3 text-center">24/7 Included</td><td className="p-3 text-center">24/7 Included</td></tr>
            <tr className="border-b"><td className="p-3 font-bold">Maternity</td><td className="p-3 text-center">Included</td><td className="p-3 text-center">Not included</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* Detailed Products */}
    <div className="grid md:grid-cols-2 gap-6">
      <ProductCard product={BLUE_ROYALE_DATA} type="blue" />
      <ProductCard product={FLEXISHIELD_DATA} type="flexi" />
    </div>

    {/* How FlexiShield Works */}
    <div className="border-4 border-green-500 p-6 bg-white">
      <h2 className="text-2xl font-black mb-4">How FlexiShield Complements Your HMO</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {FLEXISHIELD_DATA.howItWorks.map((step) => (
          <div key={step.step} className="text-center p-6 border-2 border-black">
            <div className="w-16 h-16 bg-green-500 text-white text-3xl font-black flex items-center justify-center mx-auto mb-4">
              {step.step}
            </div>
            <h3 className="font-black text-lg mb-2">{step.title}</h3>
            <p className="text-sm text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Unique Proposition */}
    <div className="bg-black text-white p-8">
      <h2 className="text-2xl font-black mb-6 text-yellow-400">Why Pacific Cross Wins</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-900 p-4">
          <Shield className="w-10 h-10 text-yellow-400 mb-2" />
          <h3 className="font-bold mb-1">75+ Years Experience</h3>
          <p className="text-sm text-gray-400">Trusted since the Philippines was still using jeepneys as main transport</p>
        </div>
        <div className="bg-gray-900 p-4">
          <Globe className="w-10 h-10 text-yellow-400 mb-2" />
          <h3 className="font-bold mb-1">Worldwide Network</h3>
          <p className="text-sm text-gray-400">Access to 8,500+ hospitals and clinics globally</p>
        </div>
        <div className="bg-gray-900 p-4">
          <Clock className="w-10 h-10 text-yellow-400 mb-2" />
          <h3 className="font-bold mb-1">Fast Claims</h3>
          <p className="text-sm text-gray-400">Hassle-free reimbursement within 7-14 business days</p>
        </div>
        <div className="bg-gray-900 p-4">
          <Heart className="w-10 h-10 text-yellow-400 mb-2" />
          <h3 className="font-bold mb-1">Customer First</h3>
          <p className="text-sm text-gray-400">24/7 support, telemedicine, mental health support</p>
        </div>
      </div>
    </div>
  </div>
)

const GuideSection = () => (
  <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 scroll-mt-20">
    <h1 className="text-3xl font-black uppercase">Life Stages & Economic Value</h1>
    <p className="text-lg text-gray-600">Your insurance needs change as you grow. Here's where you fit and what you need.</p>

    {/* Value Cycle Chart */}
    <div className="border-2 border-black p-6 bg-white">
      <h2 className="text-2xl font-black mb-4">Human Economic Value Cycle</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={[
          { age: 20, income: 30, expenses: 25, savings: 5, insuranceNeed: 20 },
          { age: 30, income: 60, expenses: 40, savings: 20, insuranceNeed: 60 },
          { age: 40, income: 100, expenses: 60, savings: 40, insuranceNeed: 100 },
          { age: 50, income: 120, expenses: 80, savings: 40, insuranceNeed: 90 },
          { age: 60, income: 80, expenses: 70, savings: 10, insuranceNeed: 70 },
          { age: 70, income: 40, expenses: 60, savings: -20, insuranceNeed: 50 }
        ]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="age" label={{ value: 'Age', position: 'bottom' }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#22C55E" strokeWidth={3} name="Income Potential" />
          <Line type="monotone" dataKey="insuranceNeed" stroke="#EF4444" strokeWidth={3} name="Insurance Need" />
          <Line type="monotone" dataKey="expenses" stroke="#3B82F6" strokeWidth={2} name="Expenses" />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-600 mt-2 text-center">
        Peak earning years (40-50) = Peak protection needs. Don't wait until it's too late.
      </p>
    </div>

    {/* Life Stages */}
    <h2 className="text-2xl font-black uppercase">Find Your Stage</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {LIFE_STAGES.map((stage, i) => (
        <LifeStageCard key={i} stage={stage} />
      ))}
    </div>

    {/* Market Demographics */}
    <div className="grid md:grid-cols-2 gap-6">
      <DemographicsPie />
      <div className="border-2 border-black p-6 bg-white">
        <h3 className="text-xl font-black mb-4">Philippines Demographics 2025</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(MARKET_INSIGHTS.demographics).map(([key, value]) => (
            <div key={key} className="border-l-4 border-yellow-400 pl-3">
              <div className="text-2xl font-black">{value}</div>
              <div className="text-xs text-gray-600 uppercase">{key.replace(/([A-Z])/g, ' $1')}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Buying Power */}
    <div className="bg-yellow-400 p-8">
      <h2 className="text-2xl font-black mb-4">Filipino Buying Power Reality</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold mb-2">The Numbers</h3>
          <ul className="space-y-2">
            {Object.entries(MARKET_INSIGHTS.buyingPower).map(([key, value]) => (
              <li key={key} className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4" />
                <span className="font-bold">{key.replace(/([A-Z])/g, ' $1')}:</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-black text-white p-6">
          <h3 className="font-black text-lg mb-4 text-yellow-400">The Gap</h3>
          <p className="mb-4">32% of Filipinos INTEND to get insurance, but only 12% actually do.</p>
          <p className="font-bold">Why? Cost concerns, distrust, lack of awareness.</p>
          <p className="mt-4 text-sm text-gray-400">Your job as advisor: Bridge this gap with education.</p>
        </div>
      </div>
    </div>
  </div>
)

const FAQSection = () => (
  <div className="max-w-4xl mx-auto px-4 py-8 scroll-mt-20">
    <h1 className="text-3xl font-black uppercase mb-6">Frequently Asked Questions</h1>

    {FAQ_DATA.map((category, i) => (
      <div key={i} className="mb-8">
        <h2 className="text-xl font-black mb-4 flex items-center gap-2">
          <span className="bg-black text-white px-3 py-1">{category.category}</span>
        </h2>
        {category.questions.map((faq, j) => (
          <FAQItem key={j} question={faq.q} answer={faq.a} />
        ))}
      </div>
    ))}

    {/* Contact CTA */}
    <div className="border-4 border-black p-8 bg-yellow-400 text-center">
      <h3 className="text-2xl font-black mb-4">STILL HAVE QUESTIONS?</h3>
      <p className="mb-6">Connect with a licensed Pacific Cross advisor for personalized guidance.</p>
      <div className="flex flex-wrap justify-center gap-4">
        <a href="mailto:info@pacificcross.com.ph" className="bg-black text-white px-6 py-3 font-bold flex items-center gap-2">
          <Mail className="w-5 h-5" /> Email Us
        </a>
        <a href="tel:+63288808888" className="bg-white text-black px-6 py-3 font-bold flex items-center gap-2">
          <Phone className="w-5 h-5" /> Call Now
        </a>
      </div>
    </div>
  </div>
)

const TrainingSection = () => (
  <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 scroll-mt-20">
    <h1 className="text-3xl font-black uppercase">Training Hub</h1>

    {/* What Makes a Great Advisor */}
    <div className="border-4 border-black p-6 bg-white">
      <h2 className="text-2xl font-black mb-4">What Makes a Credible Insurance Advisor?</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="border-2 border-black p-4">
          <Target className="w-10 h-10 text-blue-500 mb-2" />
          <h3 className="font-bold">Educator, Not Salesperson</h3>
          <p className="text-sm text-gray-600">Help clients understand, don't pressure them. Knowledge creates trust.</p>
        </div>
        <div className="border-2 border-black p-4">
          <Shield className="w-10 h-10 text-green-500 mb-2" />
          <h3 className="font-bold">Solutions-Focused</h3>
          <p className="text-sm text-gray-600">Find the RIGHT product for their situation, not the highest commission.</p>
        </div>
        <div className="border-2 border-black p-4">
          <Clock className="w-10 h-10 text-purple-500 mb-2" />
          <h3 className="font-bold">Long-Term Relationship</h3>
          <p className="text-sm text-gray-600">Insurance is 10-30 year commitment. Stay connected, follow up, be available.</p>
        </div>
        <div className="border-2 border-black p-4">
          <Award className="w-10 h-10 text-yellow-500 mb-2" />
          <h3 className="font-bold">Continuous Learning</h3>
          <p className="text-sm text-gray-600">Products change, laws evolve. Stay updated. Read, attend training, ask questions.</p>
        </div>
        <div className="border-2 border-black p-4">
          <Users className="w-10 h-10 text-red-500 mb-2" />
          <h3 className="font-bold">Ethical Practice</h3>
          <p className="text-sm text-gray-600">Full disclosure always. No hidden exclusions, no misleading promises.</p>
        </div>
        <div className="border-2 border-black p-4">
          <Heart className="w-10 h-10 text-pink-500 mb-2" />
          <h3 className="font-bold">Genuine Care</h3>
          <p className="text-sm text-gray-600">You sleep better knowing families are protected. That's the real win.</p>
        </div>
      </div>
    </div>

    {/* Objection Handling */}
    <div className="border-4 border-yellow-400 p-6 bg-black text-white">
      <h2 className="text-2xl font-black mb-4 text-yellow-400">Objection Handling Masterclass</h2>
      <div className="space-y-4">
        <div className="bg-gray-900 p-4">
          <div className="text-red-400 font-bold mb-2">"I can't afford it"</div>
          <div className="text-green-400 font-bold mb-2">Response:</div>
          <p>"I hear you. But let me ask - can you afford PHP 500,000 for cancer treatment? Because that's what without insurance could cost. We have plans starting at PHP 600/month - less than your daily coffee. Let's find what works for your budget."</p>
        </div>
        <div className="bg-gray-900 p-4">
          <div className="text-red-400 font-bold mb-2">"I'm healthy, I don't need it"</div>
          <div className="text-green-400 font-bold mb-2">Response:</div>
          <p>"That's exactly when to get it! Car insurance exists whether you crash or not. Health insurance is cheaper when you're healthy AND you're covered before issues arise. Wait, and premiums go up or conditions get excluded."</p>
        </div>
        <div className="bg-gray-900 p-4">
          <div className="text-red-400 font-bold mb-2">"Insurance agents are scammers"</div>
          <div className="text-green-400 font-bold mb-2">Response:</div>
          <p>"I understand the concern - there are bad apples in every industry. That's why I'm here to educate, not pressure. No decision today is fine. But would you be open to 15 minutes of information? You can decide after learning."</p>
        </div>
        <div className="bg-gray-900 p-4">
          <div className="text-red-400 font-bold mb-2">"Let me think about it"</div>
          <div className="text-green-400 font-bold mb-2">Response:</div>
          <p>"Absolutely, this is a big decision. What specifically are you thinking about? Sometimes talking it through helps clarify. And just so you know, premiums increase with age and medical issues - so timing does matter."</p>
        </div>
      </div>
    </div>

    {/* The Spiel Flow */}
    <div className="border-4 border-blue-500 p-6">
      <h2 className="text-2xl font-black mb-4">The Perfect Advisor Presentation Flow</h2>
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-500 text-white font-black flex items-center justify-center flex-shrink-0">1</div>
          <div>
            <h3 className="font-bold">Rapport Building (2-3 min)</h3>
            <p className="text-sm text-gray-600">"Tell me about yourself. What do you do? How's life treating you?" Find common ground. Be human.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-500 text-white font-black flex items-center justify-center flex-shrink-0">2</div>
          <div>
            <h3 className="font-bold">Pain Point Discovery (3-5 min)</h3>
            <p className="text-sm text-gray-600">"Have you ever worried about hospital bills? What about if something happened to your income?" Let THEM identify the problem.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-500 text-white font-black flex items-center justify-center flex-shrink-0">3</div>
          <div>
            <h3 className="font-bold">Solution Introduction (5-10 min)</h3>
            <p className="text-sm text-gray-600">Present the product that fits THEIR situation. Don't sell ALL products, sell the RIGHT product. Use visuals, real examples.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-500 text-white font-black flex items-center justify-center flex-shrink-0">4</div>
          <div>
            <h3 className="font-bold">Objection Handling (ongoing)</h3>
            <p className="text-sm text-gray-600">Listen fully, empathize, reframe, address. Don't take objections personally. They're buying signals.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-green-500 text-white font-black flex items-center justify-center flex-shrink-0">5</div>
          <div>
            <h3 className="font-bold">Close & Next Steps</h3>
            <p className="text-sm text-gray-600">"Based on what we've discussed, this plan makes sense for you. What's your preference - shall we start the application today?"</p>
          </div>
        </div>
      </div>
    </div>

    {/* Overlooked Benefits */}
    <div className="bg-yellow-100 p-6 border-4 border-yellow-400">
      <h2 className="text-2xl font-black mb-4">Benefits Clients Overlook</h2>
      <p className="mb-4 text-sm">Use these as conversation starters and value-adds:</p>
      <div className="grid md:grid-cols-2 gap-3">
        {MARKET_INSIGHTS.overlookedBenefits.map((benefit, i) => (
          <div key={i} className="flex items-start gap-2 bg-white p-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <span className="text-sm">{benefit}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Downloadable Resources */}
    <div className="border-4 border-black p-6">
      <h2 className="text-2xl font-black mb-4">Downloadable Training Materials</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <a href="/presentations/pacific-advisor-training.pdf" className="border-2 border-black p-4 hover:bg-gray-100 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-blue-500" />
          <div>
            <div className="font-bold">Full Training Deck</div>
            <div className="text-xs text-gray-600">Complete advisor guide (PDF)</div>
          </div>
        </a>
        <a href="/presentations/product-comparison.pdf" className="border-2 border-black p-4 hover:bg-gray-100 flex items-center gap-3">
          <Download className="w-8 h-8 text-green-500" />
          <div>
            <div className="font-bold">Product Comparison</div>
            <div className="text-xs text-gray-600">Blue Royale vs FlexiShield (PDF)</div>
          </div>
        </a>
        <a href="/presentations/client-presentation.pdf" className="border-2 border-black p-4 hover:bg-gray-100 flex items-center gap-3">
          <Users className="w-8 h-8 text-purple-500" />
          <div>
            <div className="font-bold">Client Presentation</div>
            <div className="text-xs text-gray-600">Ready-to-use deck (PDF)</div>
          </div>
        </a>
      </div>
    </div>
  </div>
)

const RoadmapSection = () => (
  <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 scroll-mt-20">
    <h1 className="text-3xl font-black uppercase">Advisor Roadmap</h1>
    <p className="text-lg text-gray-600">Your 6-month journey from beginner to successful advisor</p>

    <div className="space-y-4">
      {ADVISOR_ROADMAP.map((phase, i) => (
        <RoadmapPhase
          key={i}
          index={i}
          phase={phase.phase}
          tasks={phase.tasks}
          deliverables={phase.deliverables}
        />
      ))}
    </div>

    {/* Content Calendar */}
    <div className="border-4 border-black p-6">
      <h2 className="text-2xl font-black mb-4">Monthly Content Calendar</h2>
      <p className="text-sm text-gray-600 mb-4">Post 3x/week minimum. Consistency beats perfection.</p>

      <div className="space-y-4">
        {CONTENT_CALENDAR.map((week, i) => (
          <div key={i} className="border-2 border-black">
            <div className="bg-black text-white px-4 py-2 font-bold">{week.theme}</div>
            <div className="p-4">
              {week.posts.map((post, j) => (
                <ContentCard key={j} post={post} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Automation Tips */}
    <div className="bg-green-500 text-white p-6">
      <h2 className="text-2xl font-black mb-4">Automation Hacks</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-bold mb-2">Scheduling Tools</h3>
          <ul className="space-y-1 text-sm">
            <li>Buffer / Hootsuite - Batch schedule posts</li>
            <li>Later - Instagram-focused scheduling</li>
            <li>Canva - Quick visual content creation</li>
            <li>Capcut / InShot - Video editing for Reels</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Content Ideas (Repurpose)</h3>
          <ul className="space-y-1 text-sm">
            <li>1 presentation → 10 Instagram posts</li>
            <li>1 client story → 5 testimonial posts</li>
            <li>1 FAQ → 7 educational carousel posts</li>
            <li>1 product update → 3 announcement posts</li>
          </ul>
        </div>
      </div>
    </div>

    {/* Success Metrics */}
    <div className="border-4 border-yellow-400 p-6">
      <h2 className="text-2xl font-black mb-4">Track Your Success</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-4xl font-black text-blue-500">50+</div>
          <div className="text-sm">Leads/Month</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-black text-green-500">10+</div>
          <div className="text-sm">Presentations</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-black text-yellow-500">3-5</div>
          <div className="text-sm">Closes/Month</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-black text-purple-500">5★</div>
          <div className="text-sm">Client Reviews</div>
        </div>
      </div>
    </div>
  </div>
)

const ResourcesSection = () => (
  <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 scroll-mt-20">
    <h1 className="text-3xl font-black uppercase">Resources & Downloads</h1>

    {/* Presentation Deck */}
    <div className="border-4 border-black p-6">
      <h2 className="text-2xl font-black mb-4">Complete Presentation Deck</h2>
      <p className="text-gray-600 mb-6">Use this for client presentations, seminars, and social media content</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border-2 border-black p-4">
          <div className="aspect-video bg-gray-200 mb-4 flex items-center justify-center">
            <div className="text-center p-8">
              <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="font-bold">Advisor Training 2025</p>
              <p className="text-sm text-gray-600">Complete Guide</p>
            </div>
          </div>
          <a href="/presentations/full-training-deck.pdf" className="block bg-black text-white text-center py-3 font-bold">
            <Download className="w-5 h-5 inline mr-2" /> Download PDF
          </a>
        </div>

        <div className="border-2 border-black p-4">
          <div className="aspect-video bg-gray-200 mb-4 flex items-center justify-center">
            <div className="text-center p-8">
              <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="font-bold">Client Presentation</p>
              <p className="text-sm text-gray-600">Ready-to-Use</p>
            </div>
          </div>
          <a href="/presentations/client-deck.pdf" className="block bg-blue-500 text-white text-center py-3 font-bold">
            <Download className="w-5 h-5 inline mr-2" /> Download PDF
          </a>
        </div>
      </div>
    </div>

    {/* The Big Picture - Insurance in Philippines */}
    <div className="border-4 border-yellow-400 p-6 bg-yellow-50">
      <h2 className="text-2xl font-black mb-4">The Big Picture: Philippines Insurance Future</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold text-lg mb-3">Why Insurance Matters</h3>
          <div className="space-y-3">
            <p>At 1.79% penetration (vs 6.2% OECD average), Philippines has one of the lowest insurance coverage rates in Asia.</p>
            <p>This isn't just numbers - it's families being wiped out by hospital bills. It's kids dropping out of school. It's OFWs working forever because they can't stop.</p>
            <p>As advisors, we're not just selling insurance. We're building a safer Philippines.</p>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">The Ripple Effect</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <ArrowRight className="w-5 h-5 text-yellow-500 mt-0.5" />
              <span>Protected family = breadwinner works stress-free</span>
            </div>
            <div className="flex items-start gap-2">
              <ArrowRight className="w-5 h-5 text-yellow-500 mt-0.5" />
              <span>Kids stay in school = better education</span>
            </div>
            <div className="flex items-start gap-2">
              <ArrowRight className="w-5 h-5 text-yellow-500 mt-0.5" />
              <span>Savings protected = wealth building starts</span>
            </div>
            <div className="flex items-start gap-2">
              <ArrowRight className="w-5 h-5 text-yellow-500 mt-0.5" />
              <span>Healthcare accessible = longer productive lives</span>
            </div>
            <div className="flex items-start gap-2">
              <ArrowRight className="w-5 h-5 text-yellow-500 mt-0.5" />
              <span>Protected citizens = stronger economy</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-black text-white p-6">
        <h3 className="font-black text-xl mb-3 text-yellow-400">The Vision</h3>
        <p className="text-lg">Imagine Philippines 2030: 10% insurance penetration. Every family has basic health coverage. Hospital bills don't cause bankruptcy. Healthcare is a right, not a privilege.</p>
        <p className="mt-3 font-bold">This starts with advisors like you. Every policy sold is one more family protected. One more step toward the vision.</p>
      </div>
    </div>

    {/* Quick Links */}
    <div className="border-4 border-black p-6">
      <h2 className="text-2xl font-black mb-4">Quick Reference Links</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <a href="https://www.pacificcross.com.ph" target="_blank" className="border-2 border-black p-4 hover:bg-gray-100 flex items-center gap-3">
          <ExternalLink className="w-6 h-6 text-blue-500" />
          <div>
            <div className="font-bold">Pacific Cross Website</div>
            <div className="text-xs text-gray-600">Official site</div>
          </div>
        </a>
        <a href="https://keystone.com.ph/learning-hub" target="_blank" className="border-2 border-black p-4 hover:bg-gray-100 flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-green-500" />
          <div>
            <div className="font-bold">Keystone Learning Hub</div>
            <div className="text-xs text-gray-600">Training & resources</div>
          </div>
        </a>
        <a href="https://www.insurance.gov.ph" target="_blank" className="border-2 border-black p-4 hover:bg-gray-100 flex items-center gap-3">
          <Shield className="w-6 h-6 text-red-500" />
          <div>
            <div className="font-bold">Insurance Commission</div>
            <div className="text-xs text-gray-600">Regulator</div>
          </div>
        </a>
      </div>
    </div>

    {/* Contact */}
    <div className="bg-black text-white p-8">
      <h2 className="text-2xl font-black mb-4 text-yellow-400">Get In Touch</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="flex items-center gap-3">
          <Mail className="w-8 h-8 text-yellow-400" />
          <div>
            <div className="font-bold">Email</div>
            <div className="text-sm text-gray-400">info@pacificcross.com.ph</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="w-8 h-8 text-yellow-400" />
          <div>
            <div className="font-bold">Hotline</div>
            <div className="text-sm text-gray-400">+632 8880 8888</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Globe className="w-8 h-8 text-yellow-400" />
          <div>
            <div className="font-bold">Website</div>
            <div className="text-sm text-gray-400">www.pacificcross.com.ph</div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

// ============ MAIN APP ============
function App() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
          // SW registration failed, app still works
        })
      })
    }
  }, [])

  const renderSection = () => {
    switch (activeSection) {
      case 'home': return <HomeSection />
      case 'products': return <ProductsSection />
      case 'guide': return <GuideSection />
      case 'faq': return <FAQSection />
      case 'training': return <TrainingSection />
      case 'roadmap': return <RoadmapSection />
      case 'resources': return <ResourcesSection />
      default: return <HomeSection />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>{renderSection()}</main>
      <BigPictureModal />

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-400 text-black font-black flex items-center justify-center">PC</div>
              <div>
                <div className="font-black">PACIFIC CROSS ADVISOR HUB</div>
                <div className="text-xs text-gray-400">Powered by Keystone</div>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              © 2025 Pacific Cross Philippines. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
