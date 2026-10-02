import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const events = [
  { title: 'Robotics Club', start: new Date().toISOString().slice(0, 10) + 'T10:00', end: new Date().toISOString().slice(0, 10) + 'T12:00', status: 'approved' },
  { title: 'Guest Lecture', start: new Date().toISOString().slice(0, 10) + 'T14:00', end: new Date().toISOString().slice(0, 10) + 'T16:00', status: 'pending' },
].map(b => ({ ...b, color: b.status === 'approved' ? '#16a34a' : '#f59e0b' }))

export default function CalendarPage() {
  return (
    <div className="card stagger p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Live calendar</h1>
        <div className="flex gap-3 text-xs">
          <span className="chip bg-emerald-50 text-emerald-700">● Approved</span>
          <span className="chip bg-amber-50 text-amber-700">● Pending</span>
        </div>
      </div>
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{ left: 'prev,next today', center: 'title', right: 'timeGridDay,timeGridWeek,dayGridMonth' }}
        slotMinTime="08:00:00" slotMaxTime="20:00:00"
        height="auto" nowIndicator selectable events={events}
      />
    </div>
  )
}