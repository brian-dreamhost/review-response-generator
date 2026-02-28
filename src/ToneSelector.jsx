const TONES = [
  {
    id: 'professional',
    label: 'Professional',
    description: 'Formal and corporate',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    id: 'warm',
    label: 'Warm & Friendly',
    description: 'Personable and casual',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    ),
  },
  {
    id: 'brief',
    label: 'Brief & Direct',
    description: 'Short and to the point',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
      </svg>
    ),
  },
]

export default function ToneSelector({ selected, onSelect }) {
  return (
    <div className="card-gradient border border-metal/20 rounded-2xl p-5 sm:p-8">
      <h2 className="text-lg font-bold text-white mb-4">Response Tone</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {TONES.map((tone) => (
          <button
            key={tone.id}
            type="button"
            onClick={() => onSelect(tone.id)}
            className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-200 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss ${
              selected === tone.id
                ? 'border-azure bg-azure/10 text-white'
                : 'border-metal/20 hover:border-metal/40 text-cloudy hover:text-white'
            }`}
          >
            <div className={`flex-shrink-0 ${selected === tone.id ? 'text-azure' : 'text-galactic'}`}>
              {tone.icon}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold">{tone.label}</div>
              <div className="text-xs text-galactic">{tone.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
