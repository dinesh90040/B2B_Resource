import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { CalendarCheck, Clock, AlertTriangle, Users } from 'lucide-react'

const stats = [
  { label: 'Bookings today', value: 42, icon: CalendarCheck, tone: 'bg-emerald-50 text-emerald-600' },
  { label: 'Pending approvals', value: 7, icon: Clock, tone: 'bg-amber-50 text-amber-600' },
  { label: 'Conflicts resolved', value: 12, icon: AlertTriangle, tone: 'bg-red-50 text-red-600' },
  { label: 'On waitlist', value: 9, icon: Users, tone: 'bg-brand-50 text-brand-600' },
]
const usage = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d, i) => ({ d, v: [62,71,80,77,90,40,22][i] }))
const upcoming = [
  { title: 'Robotics Club Meetup', room: 'Lab 204', time: '10:00 – 12:00', status: 'approved' },
  { title: 'Guest Lecture: AI Ethics', room: 'Auditorium A', time: '14:00 – 16:00', status: 'pending' },
  { title: 'Design Sprint', room: 'Seminar Hall 2', time: '16:30 – 18:00', status: 'approved' },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="stagger">
        <h1 className="text-2xl font-bold">Good morning 👋</h1>
        <p className="text-slate-500">Here's what's happening across campus today.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className="card stagger p-5 hover:shadow-md transition">
            <div className={`mb-4 grid h-10 w-10 place-items-center rounded-xl ${tone}`}><Icon size={20} /></div>
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-sm text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card stagger p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">Utilization this week</h2>
            <span className="chip bg-brand-50 text-brand-700">AI forecast: Fri peak</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={usage}>
              <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} /></linearGradient></defs>
              <XAxis dataKey="d" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} unit="%" />
              <Tooltip />
              <Area type="monotone" dataKey="v" stroke="#6366f1" strokeWidth={2.5} fill="url(#g)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card stagger p-6">
          <h2 className="mb-4 font-semibold">Upcoming</h2>
          <ul className="space-y-3">
            {upcoming.map(b => (
              <li key={b.title} className="flex items-start gap-3 rounded-xl p-3 hover:bg-slate-50 transition">
                <span className={`mt-1.5 h-2.5 w-2.5 rounded-full ${b.status === 'approved' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{b.title}</p>
                  <p className="text-xs text-slate-500">{b.room} · {b.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}