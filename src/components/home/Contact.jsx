import { useEffect, useRef, useState } from 'react'
import { profile } from '../../data/projects'
import { Mail, Phone, CheckCircle2 } from 'lucide-react'

function Github({ size = 24, color = "currentColor", style }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function useInView(t = 0.07) {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true) }, { threshold: t })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [t])
  return [ref, v]
}

const SOCIALS = [
  { label: 'Email', sub: 'Best way to reach me', href: `mailto:${profile.email}`, icon: <Mail style={{ width: 'calc(1rem + 0.3vw)', height: 'calc(1rem + 0.3vw)' }} />, color: '#4ade80', value: profile.email },
  { label: 'Phone', sub: 'Available during business hours', href: `tel:${profile.phone}`, icon: <Phone style={{ width: 'calc(1rem + 0.3vw)', height: 'calc(1rem + 0.3vw)' }} />, color: '#60a5fa', value: profile.phone },
  { label: 'GitHub', sub: 'Check out my projects', href: profile.github, icon: <Github style={{ width: 'calc(1rem + 0.3vw)', height: 'calc(1rem + 0.3vw)' }} />, color: '#a78bfa', value: 'github.com/Yoshiaki606' },
]

export default function Contact() {
  const [ref, visible] = useInView()
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = e => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false); setSent(true)
      setTimeout(() => setSent(false), 3200)
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 1100)
  }

  const inp = {
    width: '100%', 
    padding: 'calc(0.6rem + 0.4vw) calc(0.8rem + 0.5vw)', 
    borderRadius: '0.8vw',
    background: 'rgba(255,255,255,0.035)', 
    border: '1px solid rgba(96,165,250,0.15)',
    color: 'var(--text)', 
    fontFamily: "'Plus Jakarta Sans', sans-serif", 
    fontSize: 'calc(0.75rem + 0.25vw)',
    outline: 'none', 
    transition: 'border-color .2s, background .2s', 
    lineHeight: 1.6, 
    boxSizing: 'border-box'
  }

  return (
    <section id="contact" style={{ padding: '8vw 8vw', position: 'relative', zIndex: 10, width: '100vw', boxSizing: 'border-box' }}>
      <div style={{ position: 'absolute', top: 0, left: '8vw', right: '8vw', height: 1, background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.15), transparent)' }} />

      {/* ĐÃ BỎ maxWidth để full width tỷ lệ với màn hình */}
      <div ref={ref} style={{ width: '100%', margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4vw', transform: visible ? 'translateY(0)' : 'translateY(3vw)', opacity: visible ? 1 : 0, transition: 'all .6s ease' }}>
          <span style={{ fontSize: 'calc(0.6rem + 0.3vw)', fontWeight: 700, letterSpacing: '.2em', color: 'var(--green)', display: 'block', marginBottom: '0.8vw', textTransform: 'uppercase' }}>Contact</span>
          <h2 style={{ fontSize: 'calc(1.8rem + 2.5vw)', fontWeight: 800, color: 'var(--text)', marginBottom: '0.8vw' }}>
            Let&apos;s{' '}
            <span style={{ background: 'linear-gradient(90deg, var(--green), var(--blue))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Work Together</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 'calc(300px + 20vw)', margin: '0 auto', fontWeight: 300, fontSize: 'calc(0.8rem + 0.3vw)' }}>
            Open to Mobile/Backend Intern or full-time roles. Let&apos;s build something great.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr)',
          gap: '4vw', alignItems: 'start',
        }} className="contact-grid">

          {/* LEFT */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '1.2vw',
            transform: visible ? 'translateX(0)' : 'translateX(-3vw)',
            opacity: visible ? 1 : 0, transition: 'all .6s ease',
          }}>
            {/* Availability card */}
            <div style={{
              padding: 'calc(0.8rem + 0.5vw)', borderRadius: '1.2vw',
              background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.2)',
              backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', gap: '1vw',
            }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{ width: 'calc(2rem + 1.2vw)', height: 'calc(2rem + 1.2vw)', borderRadius: '0.8vw', background: 'rgba(74,222,128,0.14)', border: '1px solid rgba(74,222,128,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle2 style={{ width: 'calc(1rem + 0.4vw)', height: 'calc(1rem + 0.4vw)' }} color="var(--green)" />
                </div>
                <span style={{ position: 'absolute', top: -2, right: -2, width: 'calc(6px + 0.3vw)', height: 'calc(6px + 0.3vw)', borderRadius: '50%', background: 'var(--green)', border: '2px solid var(--bg)', animation: 'pulse 2s infinite' }} />
              </div>
              <div>
                <div style={{ fontSize: 'calc(0.7rem + 0.25vw)', fontWeight: 600, color: 'var(--green)', marginBottom: '0.2vw' }}>Currently Available</div>
                <div style={{ fontSize: 'calc(0.6rem + 0.2vw)', color: 'rgba(240,246,255,0.48)', fontWeight: 300 }}>Open to internship &amp; full-time</div>
              </div>
            </div>

            {/* Social Links */}
            {SOCIALS.map((s, i) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: '1vw', textDecoration: 'none',
                padding: 'calc(0.8rem + 0.5vw)', borderRadius: '1.2vw',
                background: 'rgba(9,19,38,0.7)', border: '1px solid rgba(96,165,250,0.1)',
                backdropFilter: 'blur(10px)', transition: 'all .25s ease',
                transform: visible ? 'translateX(0)' : 'translateX(-2vw)',
                opacity: visible ? 1 : 0,
                transitionDelay: `${.1 + i * .07}s`,
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = s.color + '40'; e.currentTarget.style.background = `${s.color}06`; e.currentTarget.style.transform = 'translateX(0.4vw)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(96,165,250,0.1)'; e.currentTarget.style.background = 'rgba(9,19,38,0.7)'; e.currentTarget.style.transform = 'translateX(0)' }}
              >
                <div style={{ width: 'calc(2.2rem + 1.2vw)', height: 'calc(2.2rem + 1.2vw)', borderRadius: '0.8vw', flexShrink: 0, background: `${s.color}14`, border: `1px solid ${s.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 'calc(0.6rem + 0.2vw)', color: 'var(--text-dim)', marginBottom: '0.2vw', letterSpacing: '.04em' }}>{s.label}</div>
                  <div style={{ fontSize: 'calc(0.75rem + 0.3vw)', color: 'rgba(240,246,255,0.78)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.value}</div>
                </div>
                <span style={{ color: s.color, fontSize: 'calc(0.8rem + 0.4vw)', flexShrink: 0 }}>↗</span>
              </a>
            ))}
          </div>

          {/* RIGHT — Form */}
          <div style={{
            background: 'rgba(9,19,38,0.7)', border: '1px solid var(--border)',
            borderRadius: '1.5vw', padding: 'calc(1.2rem + 1.5vw)',
            backdropFilter: 'blur(14px)',
            transform: visible ? 'translateX(0)' : 'translateX(3vw)',
            opacity: visible ? 1 : 0, transition: 'all .6s .15s ease',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--green-mid), var(--blue-mid))' }} />
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'calc(0.9rem + 0.4vw)', fontWeight: 700, color: 'var(--text)', marginBottom: '1.5vw' }}>Send a Message</h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2vw' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1vw' }} className="form-row">
                {[
                  { key: 'name', label: 'Name', type: 'text', ph: 'Hoàng Huy' },
                  { key: 'email', label: 'Email', type: 'email', ph: 'recruiter@company.com' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize: 'calc(0.55rem + 0.2vw)', color: 'var(--text-dim)', display: 'block', marginBottom: '0.4vw', letterSpacing: '.06em', textTransform: 'uppercase' }}>{f.label}</label>
                    <input type={f.type} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      required placeholder={f.ph} style={inp}
                      onFocus={e => { e.target.style.borderColor = 'rgba(74,222,128,0.42)'; e.target.style.background = 'rgba(74,222,128,0.04)' }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(96,165,250,0.15)'; e.target.style.background = 'rgba(255,255,255,0.035)' }}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label style={{ fontSize: 'calc(0.55rem + 0.2vw)', color: 'var(--text-dim)', display: 'block', marginBottom: '0.4vw', letterSpacing: '.06em', textTransform: 'uppercase' }}>Subject</label>
                <input type="text" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                  placeholder="Internship opportunity / Collaboration / Hi!"
                  style={inp}
                  onFocus={e => { e.target.style.borderColor = 'rgba(74,222,128,0.42)'; e.target.style.background = 'rgba(74,222,128,0.04)' }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(96,165,250,0.15)'; e.target.style.background = 'rgba(255,255,255,0.035)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: 'calc(0.55rem + 0.2vw)', color: 'var(--text-dim)', display: 'block', marginBottom: '0.4vw', letterSpacing: '.06em', textTransform: 'uppercase' }}>Message</label>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  required rows={4} placeholder="Hi Huy! I'd love to discuss..."
                  style={{ ...inp, resize: 'vertical', minHeight: 'calc(80px + 4vw)' }}
                  onFocus={e => { e.target.style.borderColor = 'rgba(74,222,128,0.42)'; e.target.style.background = 'rgba(74,222,128,0.04)' }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(96,165,250,0.15)'; e.target.style.background = 'rgba(255,255,255,0.035)' }}
                />
              </div>

              <button type="submit" disabled={sending || sent} style={{
                padding: 'calc(0.8rem + 0.4vw)', borderRadius: '0.8vw', border: 'none', cursor: sending || sent ? 'default' : 'pointer',
                background: sent ? 'linear-gradient(135deg,#4ade80,#22c55e)' : sending ? 'rgba(255,255,255,0.06)' : 'linear-gradient(135deg,var(--green-mid),var(--blue-mid))',
                color: sent ? '#fff' : sending ? 'var(--text-muted)' : '#fff',
                fontWeight: 600, fontSize: 'calc(0.8rem + 0.25vw)',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                boxShadow: sent ? '0 0.4vw 1.5vw rgba(74,222,128,0.32)' : 'none',
                transition: 'all .3s ease',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6vw',
                marginTop: '0.5vw'
              }}>
                {sending ? (
                  <><span style={{ width: 'calc(10px + 0.4vw)', height: 'calc(10px + 0.4vw)', border: '2px solid rgba(255,255,255,0.25)', borderTop: '2px solid var(--blue)', borderRadius: '50%', animation: 'spin .8s linear infinite', display: 'inline-block' }} />Sending...</>
                ) : sent ? '✓ Sent!' : 'Send Message →'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 6vw !important; }
          .form-row { grid-template-columns: 1fr !important; gap: 4vw !important; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  )
}