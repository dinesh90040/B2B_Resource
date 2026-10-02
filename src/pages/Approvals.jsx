import { Check, X, Sparkles } from 'lucide-react'

const requests = [
  { id: 1, title: 'Guest Lecture: AI Ethics', by: 'Dr. Mehta', room: 'Auditorium A', when: 'Fri 14:00–16:00', score: 88,
    summary: 'Academic talk, ~250 attendees. No hard conflicts. High priority (faculty, academic purpose).' },
  { id: 2, title: 'Dance Practice', by: 'Cultural Club', room: 'Seminar Hall 2', when: 'Fri 16:00–18:00', score: 54,
    summary: 'Soft conflict with Design Sprint (30 min overlap). Suggest moving to 18:00.' },
]

export default function Approvals() {
  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <h1 className="stagger text-2xl font-bold">Approvals inbox</h1>
      {requests.map(r => (
        <div key={r.id} className="card stagger p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold">{r.title}</h3>
              <p className="text-sm text-slate-500">{r.by} · {r.room} · {r.when}</p>
            </div>
            <span className={`chip ${r.score > 75 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>Priority {r.score}</span>
          </div>
          <div className="mt-4 flex gap-2 rounded-xl bg-brand-50/60 p-3 text-sm text-slate-700">
            <Sparkles size={16} className="mt-0.5 shrink-0 text-brand-600" /> {r.summary}
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button className="btn-ghost text-red-600 hover:bg-red-50"><X size={16} />Reject</button>
            <button className="btn-primary"><Check size={16} />Approve</button>
          </div>
        </div>
      ))}
    </div>
  )
}