import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, MapPin, Projector, Wifi } from 'lucide-react'

const resources = [
  { id: 1, name: 'Auditorium A', type: 'Hall', cap: 300, loc: 'Main Block', free: true, img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600' },
  { id: 2, name: 'Lab 204', type: 'Lab', cap: 40, loc: 'CS Block', free: false, img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600' },
  { id: 3, name: 'Seminar Hall 2', type: 'Hall', cap: 120, loc: 'Admin Block', free: true, img: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=600' },
  { id: 4, name: 'Meeting Room 1', type: 'Room', cap: 12, loc: 'Library', free: true, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600' },
]
const types = ['All', 'Hall', 'Lab', 'Room']

export default function Explorer() {
  const [filter, setFilter] = useState('All')
  const list = resources.filter(r => filter === 'All' || r.type === filter)

  return (
    <div className="space-y-6">
      <div className="stagger flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Resources</h1>
          <p className="text-slate-500">Find and book the right space.</p>
        </div>
        <div className="flex gap-1 rounded-xl bg-white p-1 border border-slate-200">
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition ${filter === t ? 'bg-brand-600 text-white shadow' : 'text-slate-600 hover:bg-slate-100'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {list.map(r => (
          <div key={r.id} className="card stagger group overflow-hidden hover:-translate-y-1 hover:shadow-lg transition duration-300">
            <div className="relative h-40 overflow-hidden">
              <img src={r.img} alt="" className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
              <span className={`chip absolute left-3 top-3 backdrop-blur ${r.free ? 'bg-emerald-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
                {r.free ? '● Available now' : '● In use'}
              </span>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{r.name}</h3>
                <span className="chip bg-slate-100 text-slate-600">{r.type}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Users size={14} />{r.cap}</span>
                <span className="flex items-center gap-1"><MapPin size={14} />{r.loc}</span>
                <span className="flex items-center gap-1"><Projector size={14} />Projector</span>
                <span className="flex items-center gap-1"><Wifi size={14} />Wi-Fi</span>
              </div>
              <Link to={`/book/${r.id}`} className="btn-primary mt-5 w-full justify-center">Book this space</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}