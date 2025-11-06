import React from 'react'
import Spinner from './Spinner'

export default function TicketForm() {
  const [title, setTitle] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [created, setCreated] = React.useState<{id:string}|null>(null)
  const [loading, setLoading] = React.useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/tickets', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ title, email, message }) })
    const data = await res.json()
    setCreated(data)
    setLoading(false)
  }

  if (created) {
    return (
      <div className="max-w-xl mx-auto p-6">
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-2">Ticket created</h2>
          <p className="text-gray-600">Your ticket ID is:</p>
          <code className="text-sm bg-gray-100 px-2 py-1 rounded">{created.id}</code>
          <p className="mt-4">Save this ID to check updates.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="bg-white shadow rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4">Create a Ticket</h1>
        <form onSubmit={submit} className="grid gap-3">
          <input className="border rounded-xl px-3 py-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
          <input className="border rounded-xl px-3 py-2" placeholder="Your email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <textarea className="border rounded-xl px-3 py-2 min-h-[120px]" placeholder="Describe the issue" value={message} onChange={e=>setMessage(e.target.value)} />
          <button className="mt-2 px-4 py-2 rounded-2xl shadow bg-brand-green text-white disabled:opacity-60" disabled={loading}>
            {loading ? <div className="flex items-center gap-2"><Spinner/> Submitting…</div> : 'Submit Ticket'}
          </button>
        </form>
      </div>
    </div>
  )
}
