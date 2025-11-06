import React from 'react'
import Spinner from './Spinner'
import { StatusBadge } from './StatusBadge'
import ChatMessage from './ChatMessage'

export default function TicketView() {
  const [id, setId] = React.useState('')
  const [ticket, setTicket] = React.useState<any|null>(null)
  const [loading, setLoading] = React.useState(false)
  const [msg, setMsg] = React.useState('')

  const fetchTicket = async () => {
    if (!id) return
    setLoading(true)
    const res = await fetch(`/api/tickets/${id}`)
    setTicket(res.ok ? await res.json() : null)
    setLoading(false)
  }

  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ticket) return
    await fetch(`/api/tickets/${ticket.id}/messages`, { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ author: 'user', body: msg }) })
    setMsg('')
    await fetchTicket()
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow rounded-2xl p-4">
        <div className="flex gap-2">
          <input className="border rounded-xl px-3 py-2 flex-1" placeholder="Enter your Ticket ID" value={id} onChange={e=>setId(e.target.value)} />
          <button onClick={fetchTicket} className="px-4 py-2 rounded-2xl shadow bg-brand-green text-white">Find</button>
        </div>

        {loading && <div className="mt-6"><Spinner/></div>}

        {ticket && (
          <div className="mt-6 grid gap-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold">{ticket.title}</div>
                <div className="text-sm text-gray-500">Ticket ID: <code>{ticket.id}</code></div>
              </div>
              <StatusBadge status={ticket.status} />
            </div>

            <div className="bg-neutral-50 rounded-xl p-3 space-y-2 max-h-[50vh] overflow-auto border">
              {ticket.messages.map((m:any)=> <ChatMessage key={m.id} m={m} />)}
            </div>

            <form onSubmit={send} className="flex gap-2">
              <input className="border rounded-xl px-3 py-2 flex-1" placeholder="Write a message to helpdesk" value={msg} onChange={e=>setMsg(e.target.value)} />
              <button className="px-4 py-2 rounded-2xl shadow bg-brand-green text-white">Send</button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
