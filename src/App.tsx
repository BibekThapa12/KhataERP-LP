import { useEffect, useRef, useState } from 'react'
import { ArrowRight, BarChart3, Boxes, Check, ChevronDown, ChevronLeft, ChevronRight, ExternalLink, FileText, Landmark, Mail, MapPin, Menu, MessageCircle, Pause, Phone, Play, ReceiptText, TrendingUp, Users, X } from 'lucide-react'
import gitaLogo from './assets/gita-suppliers-logo.png'
import pradhanLogo from './assets/pradhan-liquors-logo.png'

const AUTH_URL = `${(import.meta.env.VITE_APP_URL || 'https://khataerp.xyz').replace(/\/+$/, '')}/login`
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'enepalsofttech@gmail.com'
const PHONE_DISPLAY = '974 924 1651'
const PHONE_LINK = '+9779749241651'
const MAP_COORDINATES = '26.640741,87.929737'
type IconType = React.ComponentType<{ size?: number; 'aria-hidden'?: boolean }>
type PreviewKey = 'entries' | 'cheques' | 'reports'

const clients = [
  { id: 'gita', name: 'Gita Suppliers', category: 'Coca-Cola Distributor', location: 'Birtamod', logo: gitaLogo, initials: 'GS' },
  { id: 'muktinath', name: 'Muktinath Enterprises', category: 'Beverage Distributor', location: 'Nepal', logo: null, initials: 'ME' },
  { id: 'gaura', name: 'Gaura Suppliers', category: 'Beverage Distributor', location: 'Birtamod', logo: null, initials: 'GS' },
  { id: 'pradhan', name: 'Pradhan Liquors', category: 'Liquor Wholesale', location: 'Durgapur', logo: pradhanLogo, initials: 'PL' },
  { id: 'sherpa', name: 'Sherpa Cold Center', category: 'Liquor Shop', location: 'Durgapur, Jhapa', logo: null, initials: 'SC' },
]
const benefits: Array<{ icon: IconType; title: string; text: string }> = [
  { icon: ReceiptText, title: 'Invoices & daily entries', text: 'Record sales, purchases, income and expenses while the books update underneath.' },
  { icon: Boxes, title: 'Inventory & stock', text: 'See item movement, available stock and valuation from the same transactions.' },
  { icon: Landmark, title: 'Cheque tracking', text: 'Follow incoming and outgoing cheques from issue or receipt through clearance.' },
  { icon: BarChart3, title: 'Reports & business insights', text: 'Turn daily entries into ledgers, statements, VAT reports and ageing views.' },
]
const tabs = [
  { id: 'entries' as const, label: 'Daily entries', title: 'Everyday accounting, without the accounting jargon', text: 'Record where money moved and what it was for. KhataERP creates the balanced journal-backed entry.', points: ['Sales, purchases, income and expenses', 'Draft, complete, edit and print workflows'] },
  { id: 'cheques' as const, label: 'Cheques', title: 'Know what is due before it is overdue', text: 'Track received and issued cheques, then create the linked receipt or payment when each one clears.', points: ['Pending, today, overdue and settled views', 'Clear, bounce and cancel workflows'] },
  { id: 'reports' as const, label: 'Reports', title: 'See the business behind every entry', text: 'Move from daily records to financial statements and operational reports without rebuilding the numbers.', points: ['Profit & Loss, Balance Sheet and Cash Flow', 'Stock, VAT, ledgers and ageing reports'] },
]
const faqs = [
  ['Can I use KhataERP without accounting knowledge?', 'Yes. Simple Income and Expense screens use plain-language fields while KhataERP creates balanced journal-backed entries underneath. Formal vouchers remain available for accountants.'],
  ['How do I get started?', 'Open the trial, create your company, set its fiscal year and begin with your parties, items or opening balances. Contact our team if you want help choosing a plan.'],
  ['What happens after the free trial?', 'Choose the plan that fits your business to keep using KhataERP, or contact our team for help selecting the right option.'],
  ['Can I export or back up my data?', 'Yes. KhataERP includes printable reports, CSV exports and a portable company backup and restore workflow.'],
  ['What support is available?', 'Contact the KhataERP team by email for product, onboarding, plan and data questions.'],
]

function ButtonLink({ href, children, secondary = false, className = '' }: { href: string; children: React.ReactNode; secondary?: boolean; className?: string }) {
  const external = href === AUTH_URL
  return <a className={`button ${secondary ? 'button-outline' : ''} ${className}`} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{children}</a>
}
function SectionTitle({ title, description }: { title: string; description?: string }) { return <div className="section-title"><h2>{title}</h2>{description && <p>{description}</p>}</div> }

function DashboardPreview() {
  return <div className="dashboard-preview" role="img" aria-label="KhataERP dashboard preview with NPR balances and business performance">
    <div className="preview-top"><div><span>Khata</span><small>ERP for Nepal</small></div><small>Demo Company</small></div>
    <div className="preview-body"><aside><b><BarChart3 size={14}/> Dashboard</b><span><ReceiptText size={14}/> Transactions</span><span><Users size={14}/> Masters</span><span><FileText size={14}/> Reports</span></aside><main>
      <div className="preview-heading"><div><b>Dashboard</b><small>Overview of your business</small></div><span>Fiscal Year 83/84</span></div>
      <div className="metric-grid"><div><small>Cash in Hand</small><b>Rs 2,45,000</b></div><div><small>Bank Balance</small><b>Rs 5,83,773</b></div><div><small>Receivables</small><b>Rs 1,26,500</b></div></div>
      <div className="chart-card"><div><b>Sales vs Purchase</b><small>This fiscal year</small></div><div className="chart-bars">{[48,66,42,78,58,88,72].map((height,i)=><span key={i}><i style={{height:`${height}%`}}/><i style={{height:`${Math.max(25,height-22)}%`}}/></span>)}</div><footer><small>Baisakh</small><small>Ashadh</small><small>Bhadra</small><small>Kartik</small></footer></div>
      <div className="preview-table"><b>Recent transactions</b><p><span>Sales · INV-0042</span><strong>Rs 32,500</strong></p><p><span>Receipt · RCPT-0018</span><strong>Rs 18,000</strong></p></div>
    </main></div>
  </div>
}

type Client = (typeof clients)[number]

function ClientMark({ client }: { client: Client }) {
  return <span className={`marquee-logo marquee-logo-${client.id} ${client.logo ? 'has-logo' : 'custom-logo'}`} aria-hidden="true">
    {client.logo ? <img src={client.logo} alt="" loading="lazy" decoding="async" /> : <><i></i><b>{client.initials}</b></>}
  </span>
}

function ClientTile({ client }: { client: Client }) {
  return <article className="client-tile"><ClientMark client={client}/><div className="client-details"><p>{client.category}</p><h3>{client.name}</h3><span>{client.location}</span></div></article>
}

function ClientsMarquee() {
  const [paused,setPaused]=useState(false)
  const [status,setStatus]=useState('Client showcase is playing.')
  const marqueeRef=useRef<HTMLDivElement|null>(null)
  const trackRef=useRef<HTMLDivElement|null>(null)

  const animation=()=>trackRef.current?.getAnimations()[0]
  useEffect(()=>{const current=animation();if(!current)return;if(paused)current.pause();else current.play()},[paused])

  const togglePlayback=()=>{setPaused(current=>{const next=!current;setStatus(`Client showcase ${next?'paused':'playing'}.`);return next})}
  const move=(direction:-1|1)=>{
    setPaused(true)
    const current=animation()
    if(current){
      current.pause()
      const duration=34000
      const time=typeof current.currentTime==='number'?current.currentTime:0
      current.currentTime=(time+direction*(duration/clients.length)+duration)%duration
    }else{
      const tile=marqueeRef.current?.querySelector<HTMLElement>('.client-tile')
      marqueeRef.current?.scrollBy({left:direction*((tile?.offsetWidth||290)+16),behavior:'smooth'})
    }
    setStatus(`Client showcase paused. Moved to ${direction>0?'next':'previous'} clients.`)
  }
  const pauseForTouch=(event:React.PointerEvent)=>{if(event.pointerType==='touch'){setPaused(true);setStatus('Client showcase paused for touch navigation.')}}

  return <section className="clients-marquee-section" aria-labelledby="clients-title"><div className="container clients-marquee-heading"><div><p>Our clients</p><h2 id="clients-title">Trusted by businesses that keep Nepal moving.</h2></div><div className="clients-marquee-intro"><p>Retailers, distributors and wholesalers use KhataERP to keep everyday operations and accounts connected.</p><div className="clients-marquee-controls" aria-label="Client showcase controls"><button type="button" onClick={()=>move(-1)} aria-label="Show previous clients"><ChevronLeft aria-hidden="true"/></button><button className="playback-control" type="button" onClick={togglePlayback} aria-label={paused?'Play client showcase':'Pause client showcase'} aria-pressed={paused}>{paused?<Play aria-hidden="true"/>:<Pause aria-hidden="true"/>}<span>{paused?'Play':'Pause'}</span></button><button type="button" onClick={()=>move(1)} aria-label="Show next clients"><ChevronRight aria-hidden="true"/></button></div></div></div><div ref={marqueeRef} className={`clients-marquee ${paused?'is-paused':''}`} tabIndex={0} aria-label="KhataERP clients" onPointerDown={pauseForTouch}><div ref={trackRef} className="clients-marquee-track"><div className="clients-marquee-group">{clients.map(client=><ClientTile client={client} key={client.id}/>)}</div><div className="clients-marquee-group" aria-hidden="true">{clients.map(client=><ClientTile client={client} key={`copy-${client.id}`}/>)}</div></div></div><p className="sr-only" aria-live="polite">{status}</p></section>
}

function ProductMock({ active }: { active: PreviewKey }) {
  if (active === 'entries') return <div className="product-mock"><header><b>Add Income</b><span>Draft</span></header><label>Received into</label><div className="input">Bank Account <ChevronDown size={15}/></div><p><span>Commission Income</span><b>Rs 1,000.00</b></p><p className="total"><span>Total</span><b>Rs 1,000.00</b></p><button>Complete income</button></div>
  if (active === 'cheques') return <div className="product-mock"><header><b>Incoming cheques</b><span>Priority</span></header><div className="cheque-head"><span>Party</span><span>Due</span><span>Amount</span></div><div className="cheque-row"><b>Muktinath Enterprises</b><strong>In 1 day</strong><b>Rs 15,000</b></div><div className="summary"><div><small>Pending</small><b>Rs 15,000</b></div><div><small>Due today</small><b>Rs 0</b></div></div></div>
  return <div className="product-mock"><header><div><b>Profit & Loss</b><small>Trading and profit statement</small></div><span>Print</span></header><div className="summary"><div><small>Total sales</small><b>Rs 12,48,000</b></div><div><small>Net profit</small><b className="profit">Rs 3,42,800</b></div></div><p><span>Sales accounts</span><b>Rs 12,48,000</b></p><p><span>Cost of goods sold</span><b>Rs 8,29,500</b></p><p className="total"><span>Net profit</span><b className="profit">Rs 3,42,800</b></p></div>
}

function ProductPreview() {
  const [active,setActive]=useState<PreviewKey>('entries'); const refs=useRef<Array<HTMLButtonElement|null>>([])
  const selected=tabs.find(tab=>tab.id===active)!
  const onKey=(event:React.KeyboardEvent,index:number)=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?2:(index+(event.key==='ArrowRight'?1:-1)+3)%3;setActive(tabs[next].id);refs.current[next]?.focus()}
  return <section className="section product" aria-labelledby="preview-title"><div className="container"><SectionTitle title="See the work in one place" description="The same business records power daily operations, cheque follow-up and financial reporting."/><div className="tabs" role="tablist" aria-label="Product previews">{tabs.map((tab,i)=><button key={tab.id} ref={node=>{refs.current[i]=node}} role="tab" id={`tab-${tab.id}`} aria-selected={active===tab.id} aria-controls={`panel-${tab.id}`} tabIndex={active===tab.id?0:-1} onClick={()=>setActive(tab.id)} onKeyDown={e=>onKey(e,i)}>{tab.label}</button>)}</div><div className="tab-panel" role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`}><div><small>{selected.label}</small><h3>{selected.title}</h3><p>{selected.text}</p><ul>{selected.points.map(point=><li key={point}><Check size={16}/> {point}</li>)}</ul></div><ProductMock active={active}/></div></div></section>
}

function Header(){const[open,setOpen]=useState(false);useEffect(()=>{const close=()=>setOpen(false);addEventListener('hashchange',close);return()=>removeEventListener('hashchange',close)},[]);return <header className="site-header"><div className="container nav"><a className="logo" href="#top"><span>Khata</span><small>ERP for Nepal</small></a><nav className={open?'open':''} id="primary-navigation" aria-label="Primary navigation"><a href="#features">Features</a><a href="#pricing">Pricing</a><a href="#contact">Contact</a><ButtonLink href={AUTH_URL} secondary>Sign in</ButtonLink><ButtonLink href={AUTH_URL}>Start free trial</ButtonLink></nav><button className="menu" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} aria-controls="primary-navigation" onClick={()=>setOpen(!open)}>{open?<X aria-hidden="true"/>:<Menu aria-hidden="true"/>}</button></div></header>}

function App(){const[annual,setAnnual]=useState(false);return <div id="top"><a className="skip" href="#main">Skip to content</a><Header/><main id="main">
  <section className="hero"><div className="container hero-grid"><div><small className="kicker">Business software for Nepal</small><h1>Accounting and inventory, <em>built for Nepal.</em></h1><p className="hero-text">Manage invoices, stock, cheques, and business reports in one place.</p><div className="hero-actions"><ButtonLink href={AUTH_URL} className="button-lg">Start free trial <ArrowRight size={17}/></ButtonLink><a className="text-link" href="#features">Explore features <ArrowRight size={15}/></a></div><p className="trial">14 days free · No card required</p><div className="local"><span>Nepali B.S. dates</span><span>NPR</span><span>VAT-ready support</span></div></div><div className="hero-visual"><DashboardPreview/><div className="floating"><TrendingUp/><span><small>Net profit</small><b>Rs 3,42,800</b></span></div></div></div></section>
  <ClientsMarquee/>
  <section className="section benefits" id="features"><div className="container"><SectionTitle title="The essentials, connected" description="Enter a transaction once. KhataERP keeps the operational and financial views in step."/><div className="benefit-grid">{benefits.map(({icon:Icon,title,text},i)=><article key={title}><small>0{i+1}</small><Icon/><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
  <ProductPreview/>
  <section className="section pricing" id="pricing"><div className="container"><div className="pricing-head"><SectionTitle title="Pricing that stays clear" description="Every listed price is for one company. Choose monthly or yearly billing."/><div className="billing" role="group" aria-label="Billing period"><button className={!annual?'active':''} aria-pressed={!annual} onClick={()=>setAnnual(false)}>Monthly</button><button className={annual?'active':''} aria-pressed={annual} onClick={()=>setAnnual(true)}>Yearly <span>2 months free</span></button></div></div><div className="price-grid"><Price name="Starter" title="For straightforward business books" price={`Rs ${annual?'9,990':'999'}`} period={`per ${annual?'year':'month'}`} note="For one company" features={['Core sales and purchases','Receipts and payments','Parties and ledgers','Core financial reports','Portable backup and export']} secondary/><Price name="Business" title="For stock-led retailers and traders" price={`Rs ${annual?'19,990':'1,999'}`} period={`per ${annual?'year':'month'}`} note="For one company" features={['Everything in Starter','Inventory and valuation','Returns and advanced reports','Receivable/payable ageing','Cheque management included']} featured/><Price name="Multi-company" title="For several business books" price="Custom" period="annual agreement" note="Based on company allowance" features={['Everything in Business','Licensed company allowance','Assisted onboarding','Priority support','Custom module terms']} custom/></div><p className="pricing-note">Need details about data access or technical safeguards? <a href={`mailto:${CONTACT_EMAIL}`}>Ask the KhataERP team.</a></p></div></section>
  <section className="section contact" id="contact" aria-labelledby="contact-title"><div className="container contact-layout"><div className="contact-copy"><h2 id="contact-title">eNepal Software Technologies</h2><p>Questions about setup, pricing, or moving your business records? Call, message, or visit us in Durgapur.</p><div className="contact-links"><a href={`mailto:${CONTACT_EMAIL}`}><Mail/><span><small>Email</small><b>{CONTACT_EMAIL}</b></span></a><a href={`tel:${PHONE_LINK}`}><Phone/><span><small>Call</small><b>{PHONE_DISPLAY}</b></span></a><a href={`https://wa.me/${PHONE_LINK.replace('+','')}`} target="_blank" rel="noopener noreferrer"><MessageCircle/><span><small>WhatsApp</small><b>{PHONE_DISPLAY}</b></span></a><a href={`https://www.google.com/maps/search/?api=1&query=${MAP_COORDINATES}`} target="_blank" rel="noopener noreferrer"><MapPin/><span><small>Visit</small><b>Kanakai-1, Durgapur, Jhapa</b></span><ExternalLink className="external"/></a></div></div><div className="map-wrap"><iframe title="eNepal Software Technologies in Kanakai-1, Durgapur, Jhapa" src={`https://www.google.com/maps?q=${MAP_COORDINATES}&z=16&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen></iframe><a href={`https://www.google.com/maps/search/?api=1&query=${MAP_COORDINATES}`} target="_blank" rel="noopener noreferrer">Open in Google Maps <ExternalLink size={15}/></a></div></div></section>
  <section className="section faq"><div className="container faq-layout"><SectionTitle title="Questions before you start" description="Practical answers about setup, trial access, data and support."/><div className="faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}<ChevronDown/></summary><p>{a}</p></details>)}</div></div></section>
  <section className="final"><div className="container"><div><h2>Ready to bring the books together?</h2><p>Start with your everyday entries and see the business clearly.</p></div><div><ButtonLink href={AUTH_URL} className="button-lg">Start free trial <ArrowRight size={17}/></ButtonLink><small>14 days free · No card required</small></div></div></section>
  </main><footer className="site-footer"><div className="container footer-grid"><div><a href="#top" className="logo light"><span>Khata</span><small>ERP for Nepal</small></a><p>Accounting, inventory and cheque management for businesses in Nepal.</p></div><div><b>Product</b><a href="#features">Features</a><a href="#pricing">Pricing</a><a href={AUTH_URL} target="_blank" rel="noopener noreferrer">Sign in</a></div><div><b>Company</b><a href="#contact">Contact</a><a href={`mailto:${CONTACT_EMAIL}?subject=KhataERP%20security%20question`}>Security</a></div><div><b>Legal</b><span>Privacy policy</span><span>Terms</span></div></div><div className="container footer-bottom"><span>© 2026 KhataERP. All rights reserved.</span><span>Built for Nepalese businesses.</span></div></footer></div>}

function Price({name,title,price,period,note,features,featured=false,secondary=false,custom=false}:{name:string;title:string;price:string;period:string;note:string;features:string[];featured?:boolean;secondary?:boolean;custom?:boolean}){return <article className={`price-card ${featured?'featured':''}`}>{featured&&<span className="popular">Recommended</span>}<small className="plan">{name}</small><h3>{title}</h3><div className="price"><b>{price}</b><span>{period}</span></div><p className="company-note">{note}</p><ul>{features.map(f=><li key={f}><Check size={15}/>{f}</li>)}</ul><ButtonLink href={custom?`mailto:${CONTACT_EMAIL}`:AUTH_URL} secondary={secondary||custom}>{custom?'Contact sales':'Start free trial'}</ButtonLink></article>}

export { App }
