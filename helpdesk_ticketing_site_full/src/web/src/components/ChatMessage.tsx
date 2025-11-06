export default function ChatMessage({ m }: { m: any }) {
  const isAgent = m.author === 'helpdesk'
  return (
    <div className={`flex ${isAgent ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow ${isAgent ? 'bg-brand-green text-white' : 'bg-white'}`}>
        <div className="opacity-70 text-xs mb-1">{isAgent ? 'Helpdesk' : 'You'}</div>
        <div>{m.body}</div>
        <div className="opacity-50 text-[10px] mt-1">{new Date(m.createdAt).toLocaleString()}</div>
      </div>
    </div>
  )
}
