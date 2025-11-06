export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    NEW: 'bg-sky-100 text-sky-700',
    OPEN: 'bg-emerald-100 text-emerald-700',
    PENDING: 'bg-amber-100 text-amber-700',
    RESOLVED: 'bg-gray-100 text-gray-700',
    NEW_ALERT: 'bg-rose-100 text-rose-700',
  }
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${map[status] || 'bg-gray-100'}`}>{status}</span>
}
