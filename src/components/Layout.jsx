import { useRef } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { LayoutDashboard, Building2, CalendarDays, PlusCircle, Inbox, Search, Bell } from 'lucide-react'
import ConciergeChat from './ConciergeChat'

const nav = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/explore', label: 'Resources', icon: Building2 },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/book', label: 'New Booking', icon: PlusCircle },
  { to: '/approvals', label: 'Approvals', icon: Inbox, badge: 3 },
]

export default function Layout() {
  const main = useRef(null)
  const { pathname } = useLocation()

  useGSAP(() => {
    gsap.from(main.current, { opacity: 0, y: 12, duration: 0.45, ease: 'power2.out' })
    gsap.from('.stagger', { opacity: 0, y: 16, stagger: 0.06, duration: 0.5, ease: 'power2.out', delay: 0.1 })
  }, { dependencies: [pathname], scope: main })

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-slate-200 bg-white px-4 py-6">
        <div className="mb-8 flex items-center gap-2 px-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-500 text-white font-bold">C</div>
          <div>
            <p className="font-semibold leading-tight">CampusBook</p>
            <p className="text-xs text-slate-400">Smart resource booking</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          {nav.map(({ to, label, icon: Icon, badge }) => (
            <NavLink key={to} to={to} end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100'}`}>
              <Icon size={18} />
              <span className="flex-1">{label}</span>
              {badge && <span className="chip bg-brand-600 text-white">{badge}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto card p-4 bg-gradient-to-br from-brand-50 to-white">
          <p className="text-sm font-semibold">Need a room fast?</p>
          <p className="mt-1 text-xs text-slate-500">Ask the AI Concierge in plain English.</p>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-slate-200 bg-white/80 px-6 py-3 backdrop-blur">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className="input pl-9" placeholder="Search rooms, labs, equipment…" />
          </div>
          <button className="btn-ghost relative"><Bell size={18} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" /></button>
          <img src="https://i.pravatar.cc/40" className="h-9 w-9 rounded-full ring-2 ring-brand-100" alt="" />
        </header>
        <main ref={main} className="flex-1 p-6 lg:p-8"><Outlet /></main>
      </div>

      <ConciergeChat />
    </div>
  )
}