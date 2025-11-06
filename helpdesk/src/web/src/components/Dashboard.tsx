import React from 'react'
import Spinner from './Spinner'
import { StatusBadge } from './StatusBadge'

export default function Dashboard() {
  const [tickets, setTickets] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)
  const [selected, setSelected] = React.useState<any|null>(null)
  const [status, setStatus] = React.useState('OPEN')
  const [reply, setReply] = React.useState('')

  const load = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/tickets')
    setTickets(await res.json())
    setLoading(false)
  }
  React.useEffect(() => { load() }, [])

  const open = async (id: string) => {
    const res = await fetch(`/api/tickets/${id}`)
    const t = await res.json()
    setSelected(t)
    setStatus(t.status)
  }

  const updateStatus = async () => {
    if (!selected) return
    await fetch(`/api/tickets/${selected.id}/status`, { method: 'PATCH', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ status }) })
    await open(selected.id)
    await load()
  }

  const sendReply = async () => {
    if (!selected || !reply) return
    await fetch(`/api/tickets/${selected.id}/messages`, { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ author: 'helpdesk', body: reply }) })
    setReply('')
    await open(selected.id)
    await load()
  }

  if (loading) return <div className="p-6"><Spinner/></div>

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-6">
      <div className="bg-white shadow rounded-2xl overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="font-semibold">Tickets</div>
          <button className="text-sm text-brand-green" onClick={load}>Refresh</button>
        </div>
        <div className="divide-y max-h-[70vh] overflow-auto">
          {tickets.map((t:any)=> (
            <button key={t.id} onClick={()=>open(t.id)} className="w-full text-left p-3 hover:bg-neutral-50">
              <div className="flex items-center gap-2">
                <StatusBadge status={t.status}/>
                <div className="font-medium truncate">{t.title}</div>
              </div>
              <div className="text-xs text-gray-500 flex justify-between">
                <span>#{t.id}</span>
                <span>{new Date(t.updatedAt).toLocaleString()}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white shadow rounded-2xl p-4 min-h-[60vh]">
        {selected ? (
          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold">{selected.title}</div>
                <div className="text-xs text-gray-500">{selected.email}</div>
              </div>
              <div className="flex items-center gap-2">
                <select value={status} onChange={e=>setStatus(e.target.value)} className="border rounded-xl px-2 py-1 text-sm">
                  {['NEW','OPEN','PENDING','RESOLVED','NEW_ALERT'].map(s=> <option key={s} value={s}>{s}</option>)}
                </select>
                <button onClick={updateStatus} className="px-3 py-1 rounded-xl bg-brand-green text-white">Update</button>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-xl p-3 space-y-2 max-h-[40vh] overflow-auto border">
              {selected.messages.map((m:any)=> (
                <div key={m.id} className={`flex ${m.author==='helpdesk'?'justify-end':'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow ${m.author==='helpdesk'?'bg-brand-green text-white':'bg-white'}`}>
                    <div className="opacity-70 text-xs mb-1">{m.author}</div>
                    <div>{m.body}</div>
                    <div className="opacity-50 text-[10px] mt-1">{new Date(m.createdAt).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input value={reply} onChange={e=>setReply(e.target.value)} className="border rounded-xl px-3 py-2 flex-1" placeholder="Reply as helpdesk" />
              <button onClick={sendReply} className="px-4 py-2 rounded-2xl shadow bg-brand-green text-white">Send</button>
            </div>
          </div>
        ) : (
          <div className="text-gray-500">Select a ticket to view and reply.</div>
        )}
      </div>
    </div>
  )
}
