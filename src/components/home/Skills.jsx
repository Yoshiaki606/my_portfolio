import { useEffect, useRef, useState } from 'react'
import { skills, tools } from '../../data/projects'
import { Smartphone, Server, Brain, Wrench, Code } from 'lucide-react'

function useInView(t = 0.08) {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true) }, { threshold: t })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [t])
  return [ref, v]
}

const LEVEL_META = {
  'Advanced':     { label: 'Advanced',     dot: '#4ade80', bg: 'rgba(74,222,128,0.12)',  border: 'rgba(74,222,128,0.3)',  bars: 3 },
  'Intermediate': { label: 'Intermediate', dot: '#60a5fa', bg: 'rgba(96,165,250,0.12)',  border: 'rgba(96,165,250,0.3)',  bars: 2 },
  'Beginner':     { label: 'Beginner',     dot: '#f97316', bg: 'rgba(249,115,22,0.12)',  border: 'rgba(249,115,22,0.3)',  bars: 1 },
}

const CATEGORY_META = {
  mobile:  { icon: <Smartphone style={{ width: 'calc(0.8rem + 0.3vw)', height: 'calc(0.8rem + 0.3vw)' }} />, label: 'Mobile',  color: '#4ade80' },
  frontend: { icon: <Code style={{ width: 'calc(0.8rem + 0.3vw)', height: 'calc(0.8rem + 0.3vw)' }} />, label: 'Frontend', color: '#06b6d4' },
  backend: { icon: <Server style={{ width: 'calc(0.8rem + 0.3vw)', height: 'calc(0.8rem + 0.3vw)' }} />, label: 'Backend', color: '#60a5fa' },
  ai:      { icon: <Brain style={{ width: 'calc(0.8rem + 0.3vw)', height: 'calc(0.8rem + 0.3vw)' }} />, label: 'AI / ML', color: '#f97316' },
  tools:   { icon: <Wrench style={{ width: 'calc(0.8rem + 0.3vw)', height: 'calc(0.8rem + 0.3vw)' }} />, label: 'Tools',   color: '#fbbf24' },
}

function SignalBars({ level, color }) {
  const meta = LEVEL_META[level] || LEVEL_META['Beginner']
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'calc(2px + 0.2vw)', height: 'calc(12px + 0.4vw)', flexShrink: 0 }}>
      {[1, 2, 3].map(n => (
        <div key={n} style={{
          width: 'calc(3px + 0.15vw)',
          height: n === 1 ? '40%' : n === 2 ? '70%' : '100%',
          borderRadius: 'calc(1px + 0.1vw)',
          background: n <= meta.bars ? color : 'rgba(255,255,255,0.1)',
          transition: 'background .3s',
          boxShadow: n <= meta.bars ? `0 0 calc(4px + 0.2vw) ${color}80` : 'none',
        }} />
      ))}
    </div>
  )
}

function SkillCard({ skill, index, visible }) {
  const [hov, setHov] = useState(false)
  const meta = LEVEL_META[skill.level] || LEVEL_META['Beginner']
  const catMeta = CATEGORY_META[skill.category] || { icon: 'CODE', color: skill.color }

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? 'rgba(13,34,64,0.92)' : 'rgba(9,19,38,0.72)',
        border: `1px solid ${hov ? skill.color + '45' : 'rgba(96,165,250,0.1)'}`,
        borderRadius: 'calc(10px + 0.8vw)',
        padding: 'calc(0.8rem + 0.5vw) calc(1rem + 0.6vw)',
        display: 'flex', flexDirection: 'column', gap: 'calc(6px + 0.4vw)',
        transition: 'all .32s cubic-bezier(0.4,0,0.2,1)',
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(2vw) scale(0.97)',
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 0.05}s`,
        boxShadow: hov ? `0 calc(0.5vw) calc(1.5vw) ${skill.color}1a` : 'none',
        backdropFilter: 'blur(12px)',
        cursor: 'default',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 'calc(1px + 0.1vw)',
        background: `linear-gradient(90deg, ${skill.color}cc, transparent)`,
        opacity: hov ? 1 : 0.35, transition: 'opacity .3s',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'calc(4px + 0.2vw)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(4px + 0.3vw)', minWidth: 0 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>{catMeta.icon}</span>
          <span style={{
            fontSize: 'calc(0.75rem + 0.3vw)', fontWeight: 700, color: 'var(--text)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{skill.name}</span>
        </div>
        <SignalBars level={skill.level} color={skill.color} />
      </div>

      {/* Level + exp */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(4px + 0.3vw)', flexWrap: 'wrap' }}>
        <span style={{
          fontSize: 'calc(0.55rem + 0.15vw)', fontWeight: 700, letterSpacing: '.06em',
          color: meta.dot, background: meta.bg, border: `1px solid ${meta.border}`,
          padding: 'calc(2px + 0.1vw) calc(6px + 0.3vw)', borderRadius: '5vw', textTransform: 'uppercase',
          display: 'inline-flex', alignItems: 'center', gap: 'calc(2px + 0.2vw)', flexShrink: 0,
        }}>
          <span style={{ width: 'calc(3px + 0.2vw)', height: 'calc(3px + 0.2vw)', borderRadius: '50%', background: meta.dot, display: 'inline-block' }} />
          {meta.label}
        </span>
        <span style={{ fontSize: 'calc(0.6rem + 0.15vw)', color: 'var(--text-dim)' }}>{skill.yearsExp}</span>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'calc(3px + 0.2vw)' }}>
        {skill.tags.map(tag => (
          <span key={tag} style={{
            fontSize: 'calc(0.55rem + 0.15vw)', fontWeight: 500,
            color: hov ? skill.color : 'rgba(240,246,255,0.4)',
            background: hov ? `${skill.color}10` : 'rgba(255,255,255,0.04)',
            border: `1px solid ${hov ? skill.color + '28' : 'rgba(255,255,255,0.07)'}`,
            padding: 'calc(2px + 0.1vw) calc(5px + 0.2vw)', borderRadius: 'calc(3px + 0.2vw)',
            transition: 'all .28s',
          }}>{tag}</span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const [ref, visible] = useInView()
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = ['all', ...Object.keys(CATEGORY_META)]
  const filtered = activeCategory === 'all' ? skills : skills.filter(s => s.category === activeCategory)

  const grouped = {}
  filtered.forEach(s => {
    if (!grouped[s.category]) grouped[s.category] = []
    grouped[s.category].push(s)
  })

  return (
    <section id="skills" style={{
      padding: '8vw 8vw', // Đổi padding ra vw để phủ kín
      position: 'relative', zIndex: 10,
      width: '100vw',
      boxSizing: 'border-box'
    }}>
      <div style={{
        position: 'absolute', top: 0, left: '8vw', right: '8vw', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.15), transparent)',
      }} />

      {/* ĐÃ BỎ maxWidth để tự phình to theo trình duyệt */}
      <div ref={ref} style={{ width: '100%', margin: "0 auto" }}>

        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: '4vw',
          transform: visible ? 'translateY(0)' : 'translateY(2vw)',
          opacity: visible ? 1 : 0, transition: 'all .6s ease',
        }}>
          <span style={{ fontSize: 'calc(0.6rem + 0.4vw)', fontWeight: 700, letterSpacing: '.2em', color: 'var(--blue)', display: 'block', marginBottom: '1vw', textTransform: 'uppercase' }}>Skills</span>
          <h2 style={{ fontSize: 'calc(1.8rem + 2.5vw)', fontWeight: 800, color: 'var(--text)', marginBottom: '0.8vw' }}>
            Tech{' '}
            <span style={{ background: 'linear-gradient(90deg, var(--green), var(--blue))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Stack</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 'calc(0.8rem + 0.4vw)', fontWeight: 300 }}>
            From mobile to backend to AI/ML
          </p>
        </div>

        {/* Legend */}
        <div style={{
          display: 'flex', gap: 'calc(10px + 1vw)', justifyContent: 'center', flexWrap: 'wrap',
          marginBottom: '2vw',
          transform: visible ? 'translateY(0)' : 'translateY(1vw)',
          opacity: visible ? 1 : 0, transition: 'all .6s .08s ease',
        }}>
          {Object.entries(LEVEL_META).map(([lvl, meta]) => (
            <div key={lvl} style={{ display: 'flex', alignItems: 'center', gap: 'calc(4px + 0.2vw)' }}>
              <SignalBars level={lvl} color={meta.dot} />
              <span style={{ fontSize: 'calc(0.65rem + 0.2vw)', color: 'var(--text-dim)', fontWeight: 500 }}>{meta.label}</span>
            </div>
          ))}
        </div>

        {/* Category tabs */}
        <div style={{
          display: 'flex', gap: 'calc(4px + 0.5vw)', justifyContent: 'center', flexWrap: 'wrap',
          marginBottom: '4vw',
          transform: visible ? 'translateY(0)' : 'translateY(1vw)',
          opacity: visible ? 1 : 0, transition: 'all .6s .12s ease',
        }}>
          {categories.map(cat => {
            const meta = CATEGORY_META[cat]
            const isActive = activeCategory === cat
            const accentColor = meta?.color || 'rgba(255,255,255,0.7)'
            return (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: 'calc(4px + 0.3vw) calc(10px + 0.8vw)', borderRadius: '5vw', cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'calc(0.7rem + 0.3vw)', fontWeight: 500,
                display: 'flex', alignItems: 'center', gap: 'calc(3px + 0.3vw)',
                background: isActive ? `${accentColor}18` : 'rgba(255,255,255,0.03)',
                border: isActive ? `1px solid ${accentColor}45` : '1px solid rgba(96,165,250,0.12)',
                color: isActive ? accentColor : 'var(--text-muted)',
                transition: 'all .22s ease',
              }}>
                {meta && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{meta.icon}</span>}
                {cat === 'all' ? 'All' : meta?.label || cat}
              </button>
            )
          })}
        </div>

        {/* Grid — grouped when "all" */}
        {activeCategory === 'all' ? (
          Object.entries(grouped).map(([cat, catSkills]) => {
            const meta = CATEGORY_META[cat] || {}
            return (
              <div key={cat} style={{ marginBottom: '4vw' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(6px + 0.4vw)', marginBottom: '1.5vw', paddingLeft: 2 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center' }}>{meta.icon}</span>
                  <span style={{ fontSize: 'calc(0.65rem + 0.3vw)', fontWeight: 700, color: meta.color || 'var(--text-muted)', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                    {meta.label || cat}
                  </span>
                  <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${(meta.color || '#fff')}30, transparent)` }} />
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, calc(200px + 6vw)), 1fr))',
                  gap: 'calc(8px + 0.8vw)',
                }}>
                  {catSkills.map(s => {
                    const gi = skills.indexOf(s)
                    return <SkillCard key={s.name} skill={s} index={gi} visible={visible} />
                  })}
                </div>
              </div>
            )
          })
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, calc(200px + 6vw)), 1fr))',
            gap: 'calc(8px + 0.8vw)', marginBottom: '4vw',
          }}>
            {filtered.map((s, i) => <SkillCard key={s.name} skill={s} index={i} visible={visible} />)}
          </div>
        )}

        {/* Tools */}
        <div style={{
          transform: visible ? 'translateY(0)' : 'translateY(1.5vw)',
          opacity: visible ? 1 : 0, transition: 'all .6s .5s ease',
          background: 'rgba(9,19,38,0.62)', border: '1px solid var(--border)',
          borderRadius: 'calc(12px + 0.8vw)', padding: 'calc(1rem + 1vw) calc(1rem + 1.5vw)',
          backdropFilter: 'blur(12px)',
        }}>
          <p style={{ fontSize: 'calc(0.6rem + 0.25vw)', color: 'var(--text-dim)', letterSpacing: '.12em', marginBottom: '1.5vw', textTransform: 'uppercase', textAlign: 'center' }}>
            Tools &amp; Environment
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'calc(5px + 0.5vw)', justifyContent: 'center' }}>
            {tools.map((t, i) => (
              <span key={t} style={{
                fontSize: 'calc(0.65rem + 0.3vw)', color: 'var(--text-muted)',
                background: 'rgba(96,165,250,0.05)', border: '1px solid rgba(96,165,250,0.12)',
                padding: 'calc(4px + 0.2vw) calc(10px + 0.6vw)', borderRadius: '5vw',
                transition: 'all .2s', cursor: 'default',
                transform: visible ? 'translateY(0)' : 'translateY(0.8vw)',
                opacity: visible ? 1 : 0,
                transitionDelay: `${0.55 + i * 0.04}s`,
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(74,222,128,0.35)'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'rgba(74,222,128,0.07)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(96,165,250,0.12)'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'rgba(96,165,250,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}