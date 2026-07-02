import { useState, useEffect, useRef } from 'react'
import { projects } from '../../data/projects'
import * as Icons from 'lucide-react'
import { ExternalLink, X, ArrowRight } from 'lucide-react'

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

function ProjectIcon({ name, color, style }) {
  const IconComponent = Icons[name] || Icons.Code
  return <IconComponent style={style} color={color} />
}


function useInView(threshold = 0.06) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ── Modal ─────────────────────────────── */
function Modal({ project, onClose }) {
  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = '' }
  }, [onClose])
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(3,7,18,0.88)', backdropFilter: 'blur(14px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '4vw', animation: 'fadeIn .2s ease',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'linear-gradient(145deg, rgba(9,24,56,0.98), rgba(3,7,18,0.99))',
        border: '1px solid rgba(96,165,250,0.18)',
        borderRadius: '1.5vw', padding: 'calc(1.2rem + 1.5vw)',
        width: 'calc(300px + 30vw)', maxWidth: '90vw', position: 'relative',
        boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
        animation: 'scaleIn .25s cubic-bezier(0.34,1.56,0.64,1)',
        maxHeight: '90vh', overflowY: 'auto',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '0.3vw', minHeight: 3, background: `linear-gradient(90deg, ${project.color}, ${project.color === '#4ade80' ? '#60a5fa' : project.color === '#60a5fa' ? '#4ade80' : '#60a5fa'})`, borderRadius: '1.5vw 1.5vw 0 0' }} />
        <button onClick={onClose} style={{
          position: 'absolute', top: '1vw', right: '1vw',
          width: 'calc(1.5rem + 1vw)', height: 'calc(1.5rem + 1vw)', borderRadius: '0.5vw', border: '1px solid rgba(96,165,250,0.15)',
          background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
          zIndex: 10,
        }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'rgba(96,165,250,0.3)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'rgba(96,165,250,0.15)' }}
        ><X size={16} /></button>

        {project.image && (
          <div style={{
            width: '100%',
            aspectRatio: '16/8',
            borderRadius: '1vw',
            overflow: 'hidden',
            marginBottom: '1.5vw',
            border: '1px solid rgba(255,255,255,0.08)',
            position: 'relative'
          }}>
            <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 40%, rgba(3,7,18,0.92))` }} />
          </div>
        )}

        <div style={{ display: 'flex', gap: '1vw', alignItems: 'flex-start', marginBottom: '1.5vw', paddingRight: '3vw' }}>
          <div style={{
            width: 'calc(2.5rem + 2vw)', height: 'calc(2.5rem + 2vw)', borderRadius: '1vw', flexShrink: 0,
            background: `linear-gradient(135deg, ${project.color}22, ${project.color}08)`,
            border: `1px solid ${project.color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><ProjectIcon name={project.icon} color={project.color} style={{ width: 'calc(1.2rem + 1.2vw)', height: 'calc(1.2rem + 1.2vw)' }} /></div>
          <div style={{ minWidth: 0 }}>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'calc(1.1rem + 0.8vw)', fontWeight: 700, color: 'var(--text)', marginBottom: '0.3vw' }}>{project.title}</h3>
            <span style={{ fontSize: 'calc(0.55rem + 0.3vw)', fontWeight: 700, letterSpacing: '.07em', color: project.color, background: `${project.color}15`, border: `1px solid ${project.color}30`, padding: '0.2vw 0.8vw', borderRadius: '5vw', textTransform: 'uppercase' }}>{project.label}</span>
          </div>
        </div>

        <p style={{ color: 'rgba(240,246,255,0.62)', lineHeight: 1.8, fontSize: 'calc(0.8rem + 0.3vw)', fontWeight: 300, marginBottom: '1.5vw' }}>{project.fullDesc}</p>

        <div style={{ marginBottom: '1.5vw' }}>
          <p style={{ fontSize: 'calc(0.6rem + 0.2vw)', color: 'var(--text-dim)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '0.6vw' }}>Tech Stack</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5vw' }}>
            {project.tech.map(t => (
              <span key={t} style={{ fontSize: 'calc(0.65rem + 0.2vw)', color: project.color, background: `${project.color}10`, border: `1px solid ${project.color}25`, padding: '0.3vw 0.8vw', borderRadius: '0.5vw', fontWeight: 500 }}>{t}</span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1vw', flexWrap: 'wrap' }}>
          <a href={project.github} target="_blank" rel="noreferrer" style={{
            flex: '1 1 calc(100px + 5vw)', padding: '1vw 0', borderRadius: '0.8vw',
            background: 'linear-gradient(135deg, var(--green-mid), var(--blue-mid))',
            color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 'calc(0.75rem + 0.3vw)',
            fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: '0 4px 20px rgba(34,197,94,0.2)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5vw'
          }}><Github size={16} /> GitHub</a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" style={{
              flex: '1 1 calc(100px + 5vw)', padding: '1vw 0', borderRadius: '0.8vw',
              border: '1px solid rgba(96,165,250,0.25)', background: 'transparent',
              color: 'var(--text)', textDecoration: 'none', fontWeight: 500, fontSize: 'calc(0.75rem + 0.3vw)',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5vw'
            }}><ExternalLink size={16} /> Live Demo</a>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Featured zig-zag row ─────────────── */
function FeaturedRow({ project, index, visible }) {
  const [hov, setHov] = useState(false)
  const [modal, setModal] = useState(false)
  const isEven = index % 2 === 0

  return (
    <>
      {modal && <Modal project={project} onClose={() => setModal(false)} />}
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
          gap: '6vw', // Tự động căng dãn ra xa nhau
          alignItems: 'center',
          marginBottom: '8vw', // Margin dựa theo % màn hình
          transform: visible ? 'translateY(0)' : 'translateY(4vw)',
          opacity: visible ? 1 : 0,
          transition: `all .65s ${index * .15}s cubic-bezier(0.4,0,0.2,1)`,
          cursor: 'pointer',
        }}
        className={`zigzag-row${isEven ? '' : ' zigzag-row-reverse'}`}
        onClick={() => setModal(true)}
      >
        {/* Visual */}
        <div style={{ position: 'relative', order: isEven ? 0 : 1 }} className="zigzag-visual">
          <div style={{
            borderRadius: '1.5vw', overflow: 'hidden', position: 'relative',
            border: `1px solid ${hov ? project.color + '50' : 'rgba(96,165,250,0.12)'}`,
            transition: 'all .4s ease',
            boxShadow: hov ? `0 20px 60px ${project.glow}, 0 0 0 1px ${project.color}18` : '0 8px 40px rgba(0,0,0,0.4)',
            aspectRatio: '16/10',
            background: 'linear-gradient(135deg, rgba(9,24,56,0.95), rgba(3,7,18,0.98))',
          }}>
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: hov ? 0.22 : 0.58,
                  transition: 'all .4s ease',
                  transform: hov ? 'scale(1.05)' : 'scale(1)',
                }}
              />
            )}
            <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 30% 30%, ${project.color}14 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, ${project.color === '#4ade80' ? 'rgba(96,165,250,0.09)' : 'rgba(74,222,128,0.09)'} 0%, transparent 60%)` }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${project.color}cc, transparent)`, opacity: hov ? 1 : 0.4, transition: 'opacity .4s' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1vw' }}>
              <div style={{
                width: 'calc(3rem + 3vw)', height: 'calc(3rem + 3vw)', borderRadius: '1.2vw',
                background: `linear-gradient(135deg, ${project.color}22, ${project.color}08)`,
                border: `1px solid ${project.color}28`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 8px 28px ${project.glow}`,
                transform: hov ? 'scale(1.08) translateY(-0.2vw)' : 'scale(1)', transition: 'transform .4s',
              }}><ProjectIcon name={project.icon} color={project.color} style={{ width: 'calc(1.5rem + 1.2vw)', height: 'calc(1.5rem + 1.2vw)' }} /></div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4vw', justifyContent: 'center', padding: '0 2vw' }}>
                {project.tech.slice(0, 3).map(t => (
                  <span key={t} style={{ fontSize: 'calc(0.5rem + 0.3vw)', color: project.color, background: `${project.color}12`, border: `1px solid ${project.color}22`, padding: '0.3vw 0.8vw', borderRadius: '0.4vw', fontWeight: 600 }}>{t}</span>
                ))}
              </div>
            </div>
            {project.featured && (
              <div style={{ position: 'absolute', top: '1vw', left: '1vw', fontSize: 'calc(0.4rem + 0.3vw)', fontWeight: 700, letterSpacing: '.08em', color: '#fff', background: 'linear-gradient(135deg, var(--green-mid), var(--blue-mid))', padding: '0.3vw 0.8vw', borderRadius: '5vw' }}>FEATURED</div>
            )}
          </div>
          <div style={{
            position: 'absolute', top: '20%', left: isEven ? '-6%' : 'auto', right: isEven ? 'auto' : '-6%',
            width: '55%', height: '55%', borderRadius: '50%',
            background: `radial-gradient(circle, ${project.glow} 0%, transparent 70%)`,
            zIndex: -1, filter: 'blur(28px)',
            transform: hov ? 'scale(1.2)' : 'scale(1)', transition: 'transform .6s',
          }} />
        </div>

        {/* Text */}
        <div style={{ order: isEven ? 1 : 0 }} className="zigzag-text">
          <span style={{ fontSize: 'calc(0.5rem + 0.3vw)', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: project.color, display: 'block', marginBottom: '0.6vw' }}>{project.label}</span>
          <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'calc(1.2rem + 1.5vw)', fontWeight: 800, color: 'var(--text)', lineHeight: 1.1, marginBottom: '0.8vw', letterSpacing: '-.02em' }}>{project.title}</h3>
          <p style={{ color: 'rgba(240,246,255,0.52)', lineHeight: 1.8, fontWeight: 300, fontSize: 'calc(0.8rem + 0.4vw)', marginBottom: '1.5vw' }}>{project.fullDesc}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5vw', marginBottom: '1.8vw' }}>
            {project.tech.map(t => (
              <span key={t} style={{ fontSize: 'calc(0.6rem + 0.3vw)', color: 'rgba(240,246,255,0.48)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', padding: '0.3vw 0.8vw', borderRadius: '0.5vw' }}>{t}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1vw', flexWrap: 'wrap' }}>
            <a href={project.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5vw',
              padding: '0.8vw 1.8vw', borderRadius: '5vw',
              background: `linear-gradient(135deg, ${project.color}dd, ${project.color === '#4ade80' ? '#60a5fa' : '#4ade80'}aa)`,
              color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 'calc(0.65rem + 0.3vw)',
              fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: `0 4px 18px ${project.glow}`,
              transition: 'all .25s',
            }}><Github size={14} /> GitHub</a>
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5vw',
                padding: '0.8vw 1.8vw', borderRadius: '5vw',
                border: '1px solid rgba(255,255,255,0.14)', background: 'transparent',
                color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, fontSize: 'calc(0.65rem + 0.3vw)',
                fontFamily: "'Plus Jakarta Sans', sans-serif", transition: 'all .25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)' }}
              ><ExternalLink size={14} /> Live Demo</a>
            )}
            <button onClick={e => { e.stopPropagation(); setModal(true) }} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4vw',
              padding: '0.8vw 1.8vw', borderRadius: '5vw', border: '1px solid rgba(255,255,255,0.1)',
              background: 'transparent', color: 'var(--text-dim)', cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'calc(0.65rem + 0.3vw)', fontWeight: 500, transition: 'all .25s',
            }}
              onMouseEnter={e => { e.target.style.color = 'var(--text)'; e.target.style.borderColor = 'rgba(255,255,255,0.22)' }}
              onMouseLeave={e => { e.target.style.color = 'var(--text-dim)'; e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
            >Details <ArrowRight size={14} /></button>
          </div>
        </div>
      </div>
    </>
  )
}

/* ── Small card ───────────────────────── */
function SmallCard({ project, index, visible }) {
  const [hov, setHov] = useState(false)
  const [modal, setModal] = useState(false)
  return (
    <>
      {modal && <Modal project={project} onClose={() => setModal(false)} />}
      <div
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        onClick={() => setModal(true)}
        style={{
          background: hov ? 'rgba(13,34,64,0.92)' : 'rgba(9,19,38,0.7)',
          border: `1px solid ${hov ? project.color + '42' : 'rgba(96,165,250,0.1)'}`,
          borderRadius: '1.5vw', padding: '2vw',
          display: 'flex', flexDirection: 'column', gap: '1vw',
          transition: 'all .32s cubic-bezier(0.4,0,0.2,1)',
          transform: visible ? 'translateY(0)' : 'translateY(4vw)',
          opacity: visible ? 1 : 0,
          transitionDelay: `${index * .08}s`,
          boxShadow: hov ? `0 1vw 4vw ${project.glow}` : 'none',
          backdropFilter: 'blur(12px)', position: 'relative', overflow: 'hidden', cursor: 'pointer',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${project.color}88, transparent)`, opacity: hov ? 1 : 0, transition: 'opacity .28s' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.8vw' }}>
          <div style={{
            width: 'calc(2.5rem + 1vw)', height: 'calc(2.5rem + 1vw)', borderRadius: '1vw', flexShrink: 0,
            background: `linear-gradient(135deg, ${project.color}20, ${project.color}07)`,
            border: `1px solid ${project.color}28`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: hov ? 'scale(1.06)' : 'scale(1)', transition: 'transform .28s',
          }}>
            <ProjectIcon name={project.icon} color={project.color} style={{ width: 'calc(1.1rem + 0.6vw)', height: 'calc(1.1rem + 0.6vw)' }} />
          </div>
          <span style={{ fontSize: 'calc(0.55rem + 0.3vw)', fontWeight: 700, letterSpacing: '.07em', color: project.color, background: `${project.color}14`, border: `1px solid ${project.color}28`, padding: '0.3vw 0.8vw', borderRadius: '5vw', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{project.label.split('·')[0].trim()}</span>
        </div>
        <div>
          <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'calc(0.9rem + 0.5vw)', fontWeight: 700, color: 'var(--text)', marginBottom: '0.6vw' }}>{project.title}</h3>
          <p style={{ fontSize: 'calc(0.7rem + 0.3vw)', color: 'rgba(240,246,255,0.48)', lineHeight: 1.7, fontWeight: 300 }}>{project.shortDesc}</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4vw' }}>
          {project.tech.slice(0, 4).map(t => (
            <span key={t} style={{ fontSize: 'calc(0.55rem + 0.3vw)', color: 'rgba(240,246,255,0.45)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', padding: '0.3vw 0.6vw', borderRadius: '0.4vw' }}>{t}</span>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.8vw' }}>
          <a href={project.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3vw', fontSize: 'calc(0.65rem + 0.3vw)', color: hov ? project.color : 'rgba(240,246,255,0.35)', textDecoration: 'none', fontWeight: 500, transition: 'color .2s' }}><Github size={12} /> GitHub</a>
          {project.demo
            ? <a href={project.demo} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3vw', fontSize: 'calc(0.65rem + 0.3vw)', color: 'var(--blue)', textDecoration: 'none', fontWeight: 500 }}><ExternalLink size={12} /> Demo</a>
            : <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3vw', fontSize: 'calc(0.6rem + 0.3vw)', color: 'var(--text-dim)' }}>Details <ArrowRight size={12} /></span>
          }
        </div>
      </div>
    </>
  )
}

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'flutter', label: 'Flutter' },
  { key: 'spring', label: 'Spring Boot' },
  { key: 'android', label: 'Android' },
]

export default function Projects() {
  const [active, setActive] = useState('all')
  const [sectionRef, visible] = useInView()
  const featured = projects.filter(p => p.featured && (active === 'all' || p.type === active))
  const rest = projects.filter(p => !p.featured && (active === 'all' || p.type === active))

  return (
    <section id="projects" style={{ 
      padding: '8vw 8vw', // Đổi padding ra vw để phủ kín và lấy tỷ lệ chuẩn 
      position: 'relative', 
      zIndex: 10,
      width: '100vw', 
      boxSizing: 'border-box'
    }}>
      <div style={{ position: 'absolute', top: 0, left: '8vw', right: '8vw', height: 1, background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.15), transparent)' }} />

      {/* ĐÃ BỎ maxWidth: 1400 để phần tử tự căng theo màn hình */}
      <div ref={sectionRef} style={{ width: '100%', margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4vw', transform: visible ? 'translateY(0)' : 'translateY(3vw)', opacity: visible ? 1 : 0, transition: 'all .6s ease' }}>
          <span style={{ fontSize: 'calc(0.6rem + 0.4vw)', fontWeight: 700, letterSpacing: '.2em', color: 'var(--green)', display: 'block', marginBottom: '1vw', textTransform: 'uppercase' }}>Portfolio</span>
          <h2 style={{ fontSize: 'calc(1.8rem + 2.5vw)', fontWeight: 800, color: 'var(--text)', marginBottom: '1.2vw' }}>
            Selected{' '}
            <span style={{ background: 'linear-gradient(90deg, var(--green), var(--blue))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Projects</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 'calc(0.8rem + 0.4vw)', fontWeight: 300 }}>{projects.length} projects — mobile · backend · AI/ML</p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '0.8vw', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4vw', transform: visible ? 'translateY(0)' : 'translateY(2vw)', opacity: visible ? 1 : 0, transition: 'all .6s .1s ease' }}>
          {FILTERS.map(f => (
            <button key={f.key} onClick={() => setActive(f.key)} style={{
              padding: '0.6vw 1.5vw', borderRadius: '5vw', cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'calc(0.7rem + 0.3vw)', fontWeight: 500,
              background: active === f.key ? 'linear-gradient(135deg, var(--green-mid), var(--blue-mid))' : 'rgba(255,255,255,0.03)',
              border: active === f.key ? 'none' : '1px solid rgba(96,165,250,0.15)',
              color: active === f.key ? '#fff' : 'var(--text-muted)',
              transition: 'all .22s ease',
              boxShadow: active === f.key ? '0 0.4vw 1.5vw rgba(34,197,94,0.22)' : 'none',
            }}>{f.label}</button>
          ))}
        </div>

        {/* Featured */}
        {featured.map((p, i) => <FeaturedRow key={p.id} project={p} index={i} visible={visible} />)}

        {/* Rest */}
        {rest.length > 0 && (
          <>
            {featured.length > 0 && (
              <div style={{ textAlign: 'center', marginBottom: '2vw', marginTop: '-1vw' }}>
                <span style={{ fontSize: 'calc(0.6rem + 0.2vw)', color: 'var(--text-dim)', letterSpacing: '.15em', textTransform: 'uppercase' }}>More Projects</span>
              </div>
            )}
            {/* Chỉnh lại Grid để kích thước Card tự do co dãn với calc(vw) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, calc(250px + 10vw)), 1fr))', gap: '2vw' }}>
              {rest.map((p, i) => <SmallCard key={p.id} project={p} index={i} visible={visible} />)}
            </div>
          </>
        )}
        {featured.length === 0 && rest.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '5vw 0', fontSize: 'calc(0.8rem + 0.5vw)' }}>No projects for this filter.</p>
        )}
      </div>

      <style>{`
        @media (max-width: 680px) {
          .zigzag-row { grid-template-columns: 1fr !important; gap: 8vw !important; }
          .zigzag-visual { order: 0 !important; }
          .zigzag-text   { order: 1 !important; text-align: center; }
          .zigzag-text > div { justify-content: center; }
        }
      `}</style>
    </section>
  )
}