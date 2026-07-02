import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { profile } from '../../data/projects'
import { GraduationCap, Award, Languages, Smartphone, Server, Sparkles, Flame } from 'lucide-react'

function useTypewriter(words, speed = 75, pause = 2000) {
  const [display, setDisplay] = useState('')
  const [idx, setIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const word = words[idx % words.length]
    let timer
    if (!deleting) {
      if (display.length < word.length) timer = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), speed)
      else timer = setTimeout(() => setDeleting(true), pause)
    } else {
      if (display.length > 0) timer = setTimeout(() => setDisplay(display.slice(0, -1)), speed / 2)
      else {
        timer = setTimeout(() => {
          setDeleting(false)
          setIdx(i => i + 1)
        }, speed)
      }
    }
    return () => clearTimeout(timer)
  }, [display, deleting, idx, words, speed, pause])
  return display
}

function ParticleCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H, raf
    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    const count = Math.min(70, Math.floor(window.innerWidth / 18))
    const pts = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28,
      r: Math.random() * 1.4 + .4,
      c: Math.random() > .5 ? '#4ade80' : '#60a5fa',
      a: Math.random() * .45 + .12,
    }))
    let mx = 9999, my = 9999
    const onM = e => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onM)
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      pts.forEach(p => {
        const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy)
        if (d < 110 && d > 0) { p.vx += dx / d * .03; p.vy += dy / d * .03 }
        const sp = Math.hypot(p.vx, p.vy)
        if (sp > 1.1) { p.vx *= .97; p.vy *= .97 }
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.c; ctx.globalAlpha = p.a; ctx.fill()
      })
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.hypot(dx, dy)
        if (d < 115) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y)
          ctx.strokeStyle = `rgba(96,165,250,${(1 - d / 115) * .065})`
          ctx.globalAlpha = 1; ctx.lineWidth = .5; ctx.stroke()
        }
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onM)
    }
  }, [])
  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none', display: 'block' }}
    />
  )
}

function FloatingBadge({ label, icon, style }) {
  return (
    <div style={{
      position: 'absolute',
      display: 'flex', alignItems: 'center', gap: '0.6vw',
      padding: '0.8vw 1.5vw',
      borderRadius: '1vw',
      background: 'rgba(6,15,30,0.9)', backdropFilter: 'blur(16px)',
      border: '1px solid rgba(96,165,250,0.18)',
      boxShadow: '0 6px 24px rgba(0,0,0,0.4)',
      fontSize: 'calc(0.6rem + 0.4vw)', fontWeight: 600, color: 'rgba(240,246,255,0.85)',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      userSelect: 'none', whiteSpace: 'nowrap',
      animation: 'badgeFloat 4s ease-in-out infinite',
      zIndex: 3,
      ...style,
    }}>
      <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>{label}
    </div>
  )
}

export default function Hero() {
  const navigate = useNavigate()
  const typed = useTypewriter(['Mobile Developer', 'Flutter Expert', 'Backend Engineer', 'AI Enthusiast'], 75, 2000)
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const firstName = profile.name.split(' ').slice(-1)[0]

  return (
    <section id="hero" style={{
      position: 'relative',
      width: '100vw', // Lấy full chiều rộng trình duyệt
      minHeight: '100dvh', // Lấy full chiều cao trình duyệt
      display: 'flex',
      alignItems: 'center', 
      justifyContent: 'center', 
      overflow: 'hidden',
      padding: '0',
      boxSizing: 'border-box'
    }}>
      <ParticleCanvas />

      {/* Ambient glows */}
      <div style={{ position: 'absolute', top: '-15%', left: '-8%', width: '55vw', height: '55vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 65%)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '0%', right: '-8%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 65%)', zIndex: 0, pointerEvents: 'none' }} />

      {/* INNER WRAPPER: Loại bỏ hoàn toàn giới hạn maxWidth */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%',
        padding: '0 8vw', // Cách lề trái phải bằng 8% chiều rộng màn hình
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr', 
        gap: '6vw', // Khoảng cách 2 cột tự co giãn theo tỷ lệ
        alignItems: 'center',
        boxSizing: 'border-box',
      }} className="hero-inner">

        {/* ── LEFT (THÔNG TIN) ── */}
        <div className="hero-text-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6vw',
            background: 'rgba(74,222,128,0.07)', border: '1px solid rgba(74,222,128,0.22)',
            borderRadius: '10vw', padding: '0.6vw 1.5vw', marginBottom: '1.5vw',
            animation: 'fadeUp .6s ease both',
          }}>
            <span style={{ width: '0.6vw', height: '0.6vw', borderRadius: '50%', background: 'var(--green)', display: 'inline-block', animation: 'pulse 2s ease infinite' }} />
            <span style={{ fontSize: 'calc(0.5rem + 0.4vw)', color: 'var(--green)', fontWeight: 600, letterSpacing: '.05em' }}>
              Available for opportunities
            </span>
          </div>

          <p style={{ fontSize: 'calc(0.8rem + 0.6vw)', color: 'var(--text-muted)', fontWeight: 400, marginBottom: '0.2vw', animation: 'fadeUp .6s .05s ease both' }}>
            Hello, I&apos;m
          </p>

          <h1 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'calc(1.5rem + 4.5vw)', // Tự do phóng to theo chiều rộng trình duyệt
            fontWeight: 800, lineHeight: 1.05,
            marginBottom: '0.8vw', letterSpacing: '-0.03em',
            animation: 'fadeUp .6s .1s ease both', color: 'var(--text)',
          }}>
            {firstName}
          </h1>

          <div style={{ height: 'calc(2rem + 2vw)', marginBottom: '1.5vw', animation: 'fadeUp .6s .16s ease both', display: 'flex', alignItems: 'center' }}>
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'calc(1rem + 2vw)', fontWeight: 600,
              background: 'linear-gradient(135deg, var(--green), var(--blue))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>{typed}</span>
            <span style={{ width: '0.2vw', height: 'calc(1.2rem + 2vw)', background: 'var(--green)', marginLeft: '0.5vw', display: 'inline-block', animation: 'blink .9s step-end infinite', flexShrink: 0 }} />
          </div>

          <p style={{
            fontSize: 'calc(0.7rem + 0.5vw)',
            color: 'rgba(240,246,255,0.6)',
            lineHeight: 1.8, maxWidth: '100%',
            marginBottom: '2vw', fontWeight: 300,
            animation: 'fadeUp .6s .22s ease both',
          }}>{profile.tagline}</p>

          <div className="hero-flex-wrap" style={{ display: 'flex', gap: '1vw', flexWrap: 'wrap', marginBottom: '2vw', animation: 'fadeUp .6s .27s ease both' }}>
            {[
              { icon: <GraduationCap style={{ width: 'calc(0.6rem + 0.4vw)', height: 'calc(0.6rem + 0.4vw)' }} />, text: 'Ton Duc Thang Univ.' },
              { icon: <Award style={{ width: 'calc(0.6rem + 0.4vw)', height: 'calc(0.6rem + 0.4vw)' }} />, text: `GPA ${profile.gpa}` },
              { icon: <Languages style={{ width: 'calc(0.6rem + 0.4vw)', height: 'calc(0.6rem + 0.4vw)' }} />, text: `TOEIC ${profile.toeic.split('·')[0].trim()}` },
            ].map(c => (
              <span key={c.text} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5vw',
                fontSize: 'calc(0.6rem + 0.3vw)', fontWeight: 500, color: 'rgba(240,246,255,0.7)',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                padding: '0.6vw 1.2vw', borderRadius: '5vw',
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center' }}>{c.icon}</span>{c.text}
              </span>
            ))}
          </div>

          <div className="hero-flex-wrap" style={{ display: 'flex', gap: '1.2vw', flexWrap: 'wrap', animation: 'fadeUp .6s .32s ease both' }}>
            <button onClick={() => scrollTo('projects')} className="btn-primary">View Projects ↓</button>
            <button onClick={() => navigate('/cv')} className="btn-ghost">Download CV</button>
            <button onClick={() => scrollTo('contact')} className="btn-outline">Let&apos;s Talk</button>
          </div>

          <div className="hero-flex-wrap" style={{ display: 'flex', gap: '2vw', marginTop: '2.5vw', animation: 'fadeUp .6s .38s ease both', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 'calc(0.5rem + 0.3vw)', color: 'var(--text-dim)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Find me</span>
            {[
              { label: 'GitHub', href: profile.github },
              { label: 'LinkedIn', href: profile.linkedin },
              { label: 'Email', href: `mailto:${profile.email}` },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{
                fontSize: 'calc(0.6rem + 0.4vw)', color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, transition: 'color .2s',
              }}
                onMouseEnter={e => e.target.style.color = 'var(--green)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
              >{s.label}</a>
            ))}
          </div>
        </div>

        {/* ── RIGHT (CARD CODE & BADGES) ── */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', animation: 'fadeUp .7s .2s ease both' }}>
          
          {/* Card lấy tỷ lệ 35% của toàn bộ màn hình, phình to thoải mái */}
          <div style={{ position: 'relative', width: '35vw' }}>
            
            <div style={{
              width: '100%',
              aspectRatio: '3/4',
              background: 'linear-gradient(145deg, rgba(9,24,56,0.92), rgba(3,7,18,0.97))',
              border: '1px solid rgba(96,165,250,0.14)',
              borderRadius: '2vw', overflow: 'hidden', position: 'relative',
              boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(74,222,128,0.05)',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 20%, rgba(74,222,128,0.1) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(59,130,246,0.1) 0%, transparent 55%)' }} />
              <div style={{ position: 'absolute', top: 0, right: 0, width: '30%', height: '30%', background: 'linear-gradient(225deg, rgba(74,222,128,0.1), transparent)', borderBottomLeftRadius: '5vw' }} />

              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '85%' }}>
                <div style={{ background: 'rgba(3,7,18,0.82)', borderRadius: '1vw', border: '1px solid rgba(96,165,250,0.12)', overflow: 'hidden', fontFamily: 'monospace', fontSize: 'calc(0.4rem + 0.6vw)' }}>
                  <div style={{ padding: '0.8vw 1vw', background: 'rgba(96,165,250,0.05)', borderBottom: '1px solid rgba(96,165,250,0.08)', display: 'flex', gap: '0.5vw', alignItems: 'center' }}>
                    {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: '0.8vw', height: '0.8vw', borderRadius: '50%', background: c }} />)}
                    <span style={{ marginLeft: '0.5vw', color: 'var(--text-dim)', fontSize: '0.9em' }}>developer.dart</span>
                  </div>
                  <div style={{ padding: '1.5vw', lineHeight: 1.9 }}>
                    <div><span style={{ color: '#60a5fa' }}>class</span> <span style={{ color: '#4ade80' }}>HoangHuy</span> <span style={{ color: 'rgba(240,246,255,0.3)' }}>{'{'}</span></div>
                    <div style={{ paddingLeft: '1.2em' }}><span style={{ color: '#c084fc' }}>gpa</span> <span style={{ color: 'rgba(240,246,255,0.3)' }}>=</span> <span style={{ color: '#fbbf24' }}>&apos;7.79/10&apos;</span><span style={{ color: 'rgba(240,246,255,0.18)' }}>;</span></div>
                    <div style={{ paddingLeft: '1.2em' }}><span style={{ color: '#c084fc' }}>toeic</span> <span style={{ color: 'rgba(240,246,255,0.3)' }}>=</span> <span style={{ color: '#fbbf24' }}>&apos;935&apos;</span><span style={{ color: 'rgba(240,246,255,0.18)' }}>;</span></div>
                    <div style={{ paddingLeft: '1.2em' }}><span style={{ color: '#f97316' }}>bool</span> <span style={{ color: '#c084fc' }}>available</span> <span style={{ color: 'rgba(240,246,255,0.3)' }}>=</span> <span style={{ color: '#60a5fa' }}>true</span><span style={{ color: 'rgba(240,246,255,0.18)' }}>;</span></div>
                    <div style={{ height: '0.8em' }} />
                    <div style={{ paddingLeft: '1.2em' }}><span style={{ color: '#4ade80' }}>skills</span><span style={{ color: 'rgba(240,246,255,0.3)' }}>()</span> <span style={{ color: 'rgba(240,246,255,0.3)' }}>{'=>'}</span> <span style={{ color: '#fbbf24' }}>[</span></div>
                    <div style={{ paddingLeft: '2.4em', color: '#4ade80', fontSize: '0.9em' }}>&apos;Flutter&apos;, &apos;SpringBoot&apos;,</div>
                    <div style={{ paddingLeft: '2.4em', color: '#4ade80', fontSize: '0.9em' }}>&apos;Gemini AI&apos;, &apos;PyTorch&apos;,</div>
                    <div style={{ paddingLeft: '1.2em' }}><span style={{ color: '#fbbf24' }}>]</span><span style={{ color: 'rgba(240,246,255,0.18)' }}>;</span></div>
                    <div><span style={{ color: 'rgba(240,246,255,0.3)' }}>{'}'}</span></div>
                  </div>
                </div>
              </div>

              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5vw', background: 'linear-gradient(to top, rgba(3,7,18,0.92), transparent)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 'calc(0.4rem + 0.4vw)', color: 'var(--text-dim)', marginBottom: 2 }}>Status</div>
                  <div style={{ fontSize: 'calc(0.5rem + 0.5vw)', color: 'var(--green)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
                    <span style={{ width: '0.6vw', height: '0.6vw', borderRadius: '50%', background: 'var(--green)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                    Open to intern / fulltime
                  </div>
                </div>
                <span style={{ fontSize: 'calc(1rem + 1vw)' }}>🚀</span>
              </div>
            </div>

            <FloatingBadge label="Flutter" icon={<Smartphone style={{ width: 'calc(0.6rem + 0.5vw)', height: 'calc(0.6rem + 0.5vw)' }} color="#4ade80" />} style={{ top: '10%', left: '-12%', animationDelay: '0s' }} />
            <FloatingBadge label="Spring Boot" icon={<Server style={{ width: 'calc(0.6rem + 0.5vw)', height: 'calc(0.6rem + 0.5vw)' }} color="#60a5fa" />} style={{ top: '24%', right: '-14%', animationDelay: '1.2s' }} />
            <FloatingBadge label="AI Prompt engineering" icon={<Sparkles style={{ width: 'calc(0.6rem + 0.5vw)', height: 'calc(0.6rem + 0.5vw)' }} color="#f97316" />} style={{ bottom: '26%', left: '-10%', animationDelay: '2.1s' }} />
            <FloatingBadge label="Android" icon={<Smartphone style={{ width: 'calc(0.6rem + 0.5vw)', height: 'calc(0.6rem + 0.5vw)' }} color="#a78bfa" />} style={{ top: '3%', right: '-10%', animationDelay: '1.2s' }} />
            <FloatingBadge label="PyTorch" icon={<Flame style={{ width: 'calc(0.6rem + 0.5vw)', height: 'calc(0.6rem + 0.5vw)' }} color="#f97316" />} style={{ bottom: '12%', right: '-12%', animationDelay: '.6s' }} />

          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: '2vh', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5vh', zIndex: 2,
        animation: 'fadeUp .7s .6s ease both',
      }}>
        <span style={{ fontSize: 'calc(0.4rem + 0.3vw)', color: 'var(--text-dim)', letterSpacing: '.18em' }}>SCROLL</span>
        <div style={{ position: 'relative', width: 1, height: '4vh', background: 'rgba(255,255,255,0.08)', overflow: 'hidden', borderRadius: 1 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, var(--green), var(--blue))', animation: 'lineScroll 2s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .hero-inner {
            grid-template-columns: 1fr !important;
            padding-top: 10vh !important;
            padding-bottom: 5vh !important;
            gap: 5vh !important;
          }
          .hero-text-col {
            align-items: center !important;
            text-align: center !important;
          }
          .hero-flex-wrap {
            justify-content: center !important;
          }
          .hero-inner > div:last-child { display: none !important; }
        }
        .btn-primary {
          padding: 1vw 2.5vw; border-radius: 100px; border: none; cursor: pointer;
          background: linear-gradient(135deg, var(--green-mid), var(--green-dark));
          color: #fff; font-weight: 600; font-size: calc(0.6rem + 0.4vw);
          font-family: 'Plus Jakarta Sans', sans-serif;
          box-shadow: 0 0 28px rgba(34,197,94,0.28); transition: all .3s ease;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(34,197,94,0.42); }
        .btn-ghost {
          padding: 1vw 2.5vw; border-radius: 100px; cursor: pointer;
          background: rgba(96,165,250,0.07); border: 1px solid rgba(96,165,250,0.25);
          color: var(--text); font-weight: 500; font-size: calc(0.6rem + 0.4vw);
          font-family: 'Plus Jakarta Sans', sans-serif; transition: all .3s ease; backdrop-filter: blur(4px);
        }
        .btn-ghost:hover { border-color: rgba(96,165,250,0.5); background: rgba(96,165,250,0.12); transform: translateY(-2px); }
        .btn-outline {
          padding: 1vw 2.5vw; border-radius: 100px; cursor: pointer;
          background: transparent; border: 1px solid rgba(255,255,255,0.1);
          color: var(--text-muted); font-weight: 500; font-size: calc(0.6rem + 0.4vw);
          font-family: 'Plus Jakarta Sans', sans-serif; transition: all .3s ease;
        }
        .btn-outline:hover { border-color: rgba(255,255,255,0.22); color: var(--text); transform: translateY(-2px); }
        @keyframes blink { 0%,100%{opacity:1}50%{opacity:0} }
        @keyframes badgeFloat { 0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)} }
      `}</style>
    </section>
  )
}