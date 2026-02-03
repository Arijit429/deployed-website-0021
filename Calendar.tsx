import { useState } from 'react'

interface Event {
  id: number
  title: string
  desc: string
  date: string
  type: string
}

function Calendar() {
  const [events, setEvents] = useState<Event[]>([
    { id: 1, title: 'Math Exam', desc: 'Final exam for Algebra', date: 'Jan 30, 2026', type: 'exam' },
    { id: 2, title: 'Study Session', desc: 'Review chemistry notes', date: 'Jan 28, 2026', type: 'study_session' },
    { id: 3, title: 'Project Deadline', desc: 'Submit history essay', date: 'Feb 1, 2026', type: 'deadline' }
  ])

  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    date: '',
    time: '',
    type: 'study_session'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newEvent: Event = {
      id: Date.now(),
      title: formData.title,
      desc: formData.desc,
      date: new Date(formData.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      type: formData.type
    }
    setEvents([...events, newEvent])
    setShowModal(false)
    setFormData({ title: '', desc: '', date: '', time: '', type: 'study_session' })
  }

  const typeIcons: { [key: string]: string } = {
    study_session: '📚',
    deadline: '📝',
    exam: '🎯'
  }

  const typeClasses: { [key: string]: string } = {
    study_session: 'study',
    deadline: 'deadline',
    exam: 'exam'
  }

  return (
    <div className="page">
      <div className="banner gradient-orange">
        <div className="banner-content">
          <span className="banner-tag">📅 Organizer</span>
          <h1>Your Calendar</h1>
          <p>Track deadlines and study sessions.</p>
          <button className="btn btn-white" onClick={() => setShowModal(true)}>
            ➕ Add Event
          </button>
        </div>
      </div>

      <div className="events-grid">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <div className={`event-icon ${typeClasses[event.type]}`}>
              {typeIcons[event.type]}
            </div>
            <div className="event-content">
              <h4>{event.title}</h4>
              <p>{event.desc}</p>
              <span className="event-date">📅 {event.date}</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal active" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>➕ Add Event</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Math Exam"
                required
              />
              <label>Description</label>
              <input
                type="text"
                value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                placeholder="Optional details"
              />
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
              </div>
              <label>Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="study_session">📚 Study Session</option>
                <option value="deadline">📝 Deadline</option>
                <option value="exam">🎯 Exam</option>
              </select>
              <button type="submit" className="btn btn-primary btn-full">Create Event</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Calendar
