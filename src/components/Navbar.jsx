import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    if (menuOpen) {
      const t = setTimeout(() => setMenuOpen(false), 0)
      return () => clearTimeout(t)
    }
  }, [location.pathname, menuOpen])

  const isHome = location.pathname === '/'

  const scrollTo = id => {
    if (isHome) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    else navigate('/')
  }

  const navLinks = [
    { label: 'Home',     action: () => { navigate('/'); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50) } },
    { label: 'Projects', action: () => scrollTo('projects') },
    { label: 'Skills',   action: () => scrollTo('skills') },
    { label: 'About',    action: () => navigate('/about') },
    { label: 'Contact',  action: () => scrollTo('contact') },
  ]

  const isActive = label =>
    (label === 'About' && location.pathname === '/about') ||
    (label === 'Home' && location.pathname === '/')

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        padding: '0 8vw', // Chuyển sang 8vw để đồng bộ lề 2 bên 100% Fluid
        height: 'calc(50px + 2vw)', // Chiều cao linh hoạt
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(3,7,18,0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.5)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(96,165,250,0.08)' : '1px solid transparent',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        boxSizing: 'border-box'
      }}>
        {/* Logo */}
        <button onClick={() => navigate('/')} style={{
          background: 'linear-gradient(90deg, var(--green), var(--blue))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          border: 'none', cursor: 'pointer', padding: 0,
          fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 'calc(1.1rem + 0.4vw)',
        }}>&lt;HH /&gt;</button>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(1rem + 1.5vw)' }} className="nav-desktop">
          {navLinks.map(l => (
            <button key={l.label} onClick={() => { l.action(); setMenuOpen(false) }}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'calc(0.75rem + 0.25vw)', fontWeight: 500,
                color: isActive(l.label) ? 'var(--green)' : 'rgba(240,246,255,0.55)',
                transition: 'color .2s', padding: '0.3vw',
              }}
              onMouseEnter={e => { if (!isActive(l.label)) e.target.style.color = 'var(--text)' }}
              onMouseLeave={e => { if (!isActive(l.label)) e.target.style.color = 'rgba(240,246,255,0.55)' }}
            >{l.label}</button>
          ))}
          <button onClick={() => navigate('/cv')} style={{
            padding: 'calc(0.4rem + 0.3vw) calc(1rem + 0.6vw)', borderRadius: '5vw',
            background: 'linear-gradient(135deg, var(--green-mid), var(--blue-mid))',
            border: 'none', cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'calc(0.65rem + 0.25vw)', fontWeight: 600,
            color: '#fff', letterSpacing: '.02em',
            boxShadow: '0 0 18px rgba(34,197,94,0.25)',
            transition: 'all .25s ease',
          }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 4px 22px rgba(34,197,94,0.4)' }}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 0 18px rgba(34,197,94,0.25)' }}
          >View CV</button>
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="nav-ham" style={{
          display: 'none', background: 'none', border: '1px solid var(--border)',
          borderRadius: '1vw', cursor: 'pointer', color: 'var(--text)',
          fontSize: 'calc(1rem + 0.5vw)', width: 'calc(34px + 1vw)', height: 'calc(34px + 1vw)', alignItems: 'center', justifyContent: 'center',
          transition: 'all .2s',
        }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(74,222,128,0.35)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
        >{menuOpen ? '✕' : '☰'}</button>
      </nav>

      {/* Mobile menu */}
      <div style={{
        position: 'fixed', top: 'calc(50px + 2vw)', left: 0, right: 0, zIndex: 199,
        background: 'rgba(3,7,18,0.97)', backdropFilter: 'blur(20px)',
        padding: menuOpen ? '1.5vw 8vw 3vw 8vw' : '0 8vw',
        maxHeight: menuOpen ? '50vh' : '0px',
        overflow: 'hidden', transition: 'all .32s cubic-bezier(0.4,0,0.2,1)',
        borderBottom: menuOpen ? '1px solid var(--border)' : 'none',
        display: 'flex', flexDirection: 'column', gap: menuOpen ? '2.5vw' : '0',
      }}>
        {navLinks.map(l => (
          <button key={l.label} onClick={() => { l.action(); setMenuOpen(false) }}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'calc(0.9rem + 0.5vw)', fontWeight: 500,
              color: isActive(l.label) ? 'var(--green)' : 'rgba(240,246,255,0.6)',
              textAlign: 'left', padding: '1vw 0', transition: 'color .2s',
            }}>
            {l.label}
          </button>
        ))}
        <button onClick={() => { navigate('/cv'); setMenuOpen(false) }} style={{
          marginTop: '1vw', padding: 'calc(0.6rem + 0.5vw)', borderRadius: '2vw',
          background: 'linear-gradient(135deg, var(--green-mid), var(--blue-mid))',
          border: 'none', cursor: 'pointer', color: '#fff',
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 'calc(0.8rem + 0.4vw)',
        }}>View CV</button>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .nav-desktop { display: none !important; }
          .nav-ham { display: flex !important; }
        }
      `}</style>
    </>
  )
}