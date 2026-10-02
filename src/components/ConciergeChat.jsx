import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'

export default function ConciergeChat() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [msgs, setMsgs] = useState([{ from: 'ai', text: 'Hi! Try: "Book a room for 40 people tomorrow 3–5pm with a projector."' }])
  const panel = useRef(null)

  useEffect(() => {
    if (open) gsap.fromTo(panel.current, { opacity: 0, y: 20, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'back.out(1.6)' })
  }, [open])

  const send = async () => {
    if (!input.trim()) return
    setMsgs(m => [...m, { from: 'me', text: input }])
    setInput('')
    // Replace with: POST /api/concierge
    setTimeout(() => setMsgs(m => [...m, { from: 'ai', text: 'Seminar Hall 2 is free tomorrow 15:00–17:00 (120 seats, projector). Want me to draft the booking?' }]), 600)
  }

  return (
    <>
      {open && (
        <div ref={panel} className="fixed bottom-24 right-6 z-40 flex h-[480px] w-[360px] flex-col card shadow-2xl">
          <div className="flex items-center gap-2 rounded-t-2xl bg-gradient-to-r from-brand-600 to-violet-600 p-4 text-white">
            <Sparkles size={18} /><p className="flex-1 font-semibold">AI Concierge</p>
            <button onClick={() => setOpen(false)}><X size={18} /></button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {msgs.map((m, i) => (
              <div key={i} className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm ${m.from === 'me' ? 'ml-auto bg-brand-600 text-white rounded-br-sm' : 'bg-slate-100 rounded-bl-sm'}`}>{m.text}</div>
            ))}
          </div>
          <div className="flex gap-2 border-t border-slate-100 p-3">
            <input className="input" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask anything…" />
            <button onClick={send} className="btn-primary px-3"><Send size={16} /></button>
          </div>
        </div>
      )}
      <button onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-violet-600 text-white shadow-xl shadow-brand-600/40 hover:scale-105 transition">
        {open ? <X /> : <MessageCircle />}
      </button>
    </>
  )
}