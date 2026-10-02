import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { AlertTriangle, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react'

export default function BookingForm() {
  const [form, setForm] = useState({ title: '', purpose: '', date: '', start: '', end: '', attendees: '' })
  const [check, setCheck] = useState(null) // { conflict, message, alternatives }
  const banner = useRef(null)
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  // Debounced availability check (400 ms), as described in Build.md
  useEffect(() => {
    if (!form.date || !form.start || !form.end) return
    const t = setTimeout(async () => {
      // Replace with: fetch(`/api/resources/${id}/availability?start=...&end=...`)
      const conflict = form.start < '12:00'
      setCheck(conflict
        ? { conflict: true, message: 'Overlaps with "Robotics Club Meetup" (10:00–12:00).',
            alternatives: [
              { label: 'Same room · 12:30 – 14:00', score: 96 },
              { label: 'Seminar Hall 2 · your time', score: 91 },
              { label: 'Lab 205 · your time', score: 84 },
            ] }
        : { conflict: false, message: 'This slot is free. You are good to go!' })
    }, 400)
    return () => clearTimeout(t)
  }, [form.date, form.start, form.end])

  useEffect(() => {
    if (banner.current) gsap.fromTo(banner.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' })
  }, [check])

  return (
    <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
      <form className="card stagger space-y-5 p-6 lg:col-span-2" onSubmit={e => e.preventDefault()}>
        <div>
          <h1 className="text-xl font-bold">New booking</h1>
          <p className="text-sm text-slate-500">Auditorium A · Main Block</p>
        </div>

        <div><label className="label">Event title</label>
          <input className="input" value={form.title} onChange={set('title')} placeholder="e.g. Hackathon kickoff" /></div>
        <div><label className="label">Purpose</label>
          <textarea rows={3} className="input" value={form.purpose} onChange={set('purpose')} placeholder="What is this event about?" /></div>

        <div className="grid gap-4 sm:grid-cols-4">
          <div className="sm:col-span-2"><label className="label">Date</label><input type="date" className="input" onChange={set('date')} /></div>
          <div><label className="label">Start</label><input type="time" className="input" onChange={set('start')} /></div>
          <div><label className="label">End</label><input type="time" className="input" onChange={set('end')} /></div>
        </div>
        <div><label className="label">Expected attendees</label>
          <input type="number" className="input" onChange={set('attendees')} placeholder="50" /></div>

        {check && (
          <div ref={banner} className={`flex gap-3 rounded-xl border p-4 ${check.conflict ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
            {check.conflict ? <AlertTriangle size={20} /> : <CheckCircle2 size={20} />}
            <p className="text-sm font-medium">{check.message}</p>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button type="button" className="btn-ghost">Cancel</button>
          <button className="btn-primary" disabled={check?.conflict}>Submit request <ArrowRight size={16} /></button>
        </div>
      </form>

      {/* Smart suggestions side panel */}
      <aside className="card stagger h-fit p-6">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles size={18} className="text-brand-600" />
          <h2 className="font-semibold">Smart suggestions</h2>
        </div>
        {check?.conflict ? (
          <ul className="space-y-2">
            {check.alternatives.map(a => (
              <li key={a.label}>
                <button className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-3 text-left text-sm hover:border-brand-500 hover:bg-brand-50 transition">
                  <span>{a.label}</span>
                  <span className="chip bg-brand-100 text-brand-700">{a.score}% fit</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500">Pick a date and time. If the slot is taken, we'll suggest the best alternatives here.</p>
        )}
      </aside>
    </div>
  )
}