import { useNavigate } from 'react-router-dom'
import { profile } from '../data/projects'

export default function Footer() {
  const navigate = useNavigate()
  const year = new Date().getFullYear()

  const links = [
    { label: 'Home',     action: () => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }) } },
    { label: 'About',   action: () => navigate('/about') },
    { label: 'CV',      action: () => navigate('/cv') },
    { label: 'Projects',action: () => { navigate('/'); setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 80) } },
    { label: 'Contact', action: () => { navigate('/'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 80) } },
  ]

  const socials = [
    { label: 'GitHub',   href: profile.github },
    { label: 'Email',    href: `mailto:${profile.email}` },
    { label: 'Phone',    href: `tel:${profile.phone}` },
  ]

  return (
    <footer style={{
      position: 'relative', zIndex: 10,
      borderTop: '1px solid rgba(96,165,250,0.08)',
      padding: '4vw 8vw', // Đổi padding ra vw để phủ kín
      background: 'rgba(3,7,18,0.65)', backdropFilter: 'blur(10px)',
      width: '100vw', boxSizing: 'border-box'
    }}>
      <div style={{
        width: '100%', margin: '0 auto', // Bỏ maxWidth để Footer tự căng đều sang 2 bên
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        alignItems: 'center',
        gap: '2vw',
        flexWrap: 'wrap',
      }} className="footer-grid">

        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8vw' }}>
          <span style={{
            fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 'calc(0.85rem + 0.3vw)',
            background: 'linear-gradient(90deg, var(--green), var(--blue))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>&lt;HH /&gt;</span>
          <span style={{ color: 'var(--text-dim)', fontSize: 'calc(0.65rem + 0.2vw)' }}>
            © {year} {profile.name}
          </span>
        </div>

        {/* Nav links — center */}
        <div style={{ display: 'flex', gap: 'calc(0.8rem + 1vw)', justifyContent: 'center', flexWrap: 'wrap' }}>
          {links.map(l => (
            <button key={l.label} onClick={l.action} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'calc(0.65rem + 0.3vw)', color: 'var(--text-muted)',
              transition: 'color .2s', padding: '0.2vw 0',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--green)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
            >{l.label}</button>
          ))}
        </div>

        {/* Socials */}
        <div style={{ display: 'flex', gap: 'calc(0.6rem + 0.8vw)', alignItems: 'center' }}>
          {socials.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{
              fontSize: 'calc(0.65rem + 0.2vw)', color: 'var(--text-dim)', textDecoration: 'none',
              transition: 'color .2s',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--blue)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-dim)'}
            >{s.label}</a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            gap: 4vw !important;
          }
          .footer-grid > div { justify-content: center !important; }
        }
      `}</style>
    </footer>
  )
}