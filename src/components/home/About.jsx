import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { profile } from '../../data/projects'
import { Layers, Smartphone, Code, Coffee, LayoutGrid, Brain, BookOpen, Users, GraduationCap, MapPin, Globe, Mail } from 'lucide-react'

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

// Đã cập nhật lộ trình (Journey) 2026 -> 2022 với nội dung chi tiết
const timeline = [
  { 
    year: '2026', icon: <Brain style={{ width: 'calc(1.2rem + 0.5vw)', height: 'calc(1.2rem + 0.5vw)' }} />, color: '#f97316', 
    title: 'AI Integration & Machine Learning', 
    desc: 'Tập trung nghiên cứu và ứng dụng Trí tuệ Nhân tạo. Tích hợp các LLM (như Gemini) vào ứng dụng thực tế và tối ưu hóa trải nghiệm người dùng bằng các mô hình Machine Learning.' 
  },
  { 
    year: '2025', icon: <Layers style={{ width: 'calc(1.2rem + 0.5vw)', height: 'calc(1.2rem + 0.5vw)' }} />, color: '#4ade80', 
    title: 'Full-Stack: Flutter & Spring Boot', 
    desc: 'Làm chủ Flutter để xây dựng các ứng dụng di động đa nền tảng mượt mà. Đồng thời phát triển Backend mạnh mẽ, có khả năng mở rộng cao với Spring Boot và kiến trúc Microservices.' 
  },
  { 
    year: '2024', icon: <Smartphone style={{ width: 'calc(1.2rem + 0.5vw)', height: 'calc(1.2rem + 0.5vw)' }} />, color: '#a78bfa', 
    title: 'Native Android Development', 
    desc: 'Đào sâu vào hệ sinh thái Android nguyên bản (Native). Xây dựng các ứng dụng bằng Java, áp dụng chặt chẽ kiến trúc MVVM, quản lý state và local database.' 
  },
  { 
    year: '2023', icon: <Code style={{ width: 'calc(1.2rem + 0.5vw)', height: 'calc(1.2rem + 0.5vw)' }} />, color: '#60a5fa', 
    title: 'Algorithms & Software Engineering', 
    desc: 'Mài giũa tư duy logic qua Cấu trúc Dữ liệu và Thuật toán. Rèn luyện các kỹ năng phát triển phần mềm cốt lõi, áp dụng Clean Code và các nguyên tắc thiết kế phần mềm chuẩn mực.' 
  },
  { 
    year: '2022', icon: <Coffee style={{ width: 'calc(1.2rem + 0.5vw)', height: 'calc(1.2rem + 0.5vw)' }} />, color: '#fbbf24', 
    title: 'The Foundation', 
    desc: 'Bắt đầu hành trình với các môn học lập trình cơ bản và nền tảng. Làm quen với tư duy Lập trình Hướng đối tượng (OOP) và đặt viên gạch đầu tiên cho sự nghiệp lập trình.' 
  },
]

const values = [
  { icon: <LayoutGrid style={{ width: 'calc(1.2rem + 0.5vw)', height: 'calc(1.2rem + 0.5vw)' }} />, title: 'Clean Architecture', desc: 'Maintainable, scalable code with proper separation of concerns and well-defined boundaries.', color: '#4ade80' },
  { icon: <Brain style={{ width: 'calc(1.2rem + 0.5vw)', height: 'calc(1.2rem + 0.5vw)' }} />, title: 'AI-Driven Products', desc: 'Passionate about integrating LLMs and ML models into real apps that solve actual problems.', color: '#f97316' },
  { icon: <BookOpen style={{ width: 'calc(1.2rem + 0.5vw)', height: 'calc(1.2rem + 0.5vw)' }} />, title: 'Continuous Learning', desc: 'TOEIC 935 lets me read official docs and research papers directly. Always pushing the ceiling.', color: '#60a5fa' },
  { icon: <Users style={{ width: 'calc(1.2rem + 0.5vw)', height: 'calc(1.2rem + 0.5vw)' }} />, title: 'Team Player', desc: 'Strong communicator, ships on time, gives and receives feedback well. Code is a team sport.', color: '#a78bfa' },
]

const stats = [
  { num: '5', label: 'Projects Shipped', sub: 'mobile · backend · AI' },
  { num: '7.79', label: 'GPA', sub: 'Ton Duc Thang Univ.' },
  { num: '935', label: 'TOEIC L&R', sub: 'English advantage' },
  { num: '∞', label: 'Curiosity', sub: 'always learning' },
]

function TimelineCard({ item }) {
  const [hov, setHov] = useState(false)
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      background: hov ? 'rgba(13,34,64,0.9)' : 'rgba(9,19,38,0.7)',
      border: `1px solid ${hov ? item.color + '40' : 'rgba(96,165,250,0.1)'}`,
      borderRadius: '1.2vw', padding: 'calc(1rem + 0.5vw) calc(1.2rem + 0.8vw)',
      backdropFilter: 'blur(10px)', transition: 'all .28s ease',
      boxShadow: hov ? `0 0.8vw 2vw ${item.color}18` : 'none',
      width: '100%',
    }}>
      <div style={{ fontSize: 'calc(0.8rem + 0.3vw)', fontWeight: 600, color: 'var(--text)', marginBottom: '0.5vw' }}>{item.title}</div>
      <div style={{ fontSize: 'calc(0.7rem + 0.25vw)', color: 'var(--text-muted)', fontWeight: 300, lineHeight: 1.65 }}>{item.desc}</div>
    </div>
  )
}

export default function About() {
  const navigate = useNavigate()
  const [heroRef, heroV] = useInView(0.04)
  const [timeRef, timeV] = useInView(0.06)
  const [valRef, valV] = useInView(0.06)

  return (
    <main style={{ paddingTop: 'calc(50px + 2vw)', position: 'relative', zIndex: 10, width: '100vw', boxSizing: 'border-box' }}>

      {/* HERO SECTION */}
      <section ref={heroRef} style={{
        padding: '8vw 8vw', // Đổi ra vw để tự co dãn 100% Fluid
        width: '100%', margin: "0 auto",
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,0.9fr)', // Tỷ lệ cột
        gap: '5vw', alignItems: 'center',
      }} className="about-hero-grid">
        
        {/* Text */}
        <div style={{ transform: heroV ? 'translateY(0)' : 'translateY(3vw)', opacity: heroV ? 1 : 0, transition: 'all .7s ease' }}>
          <span style={{ fontSize: 'calc(0.6rem + 0.3vw)', fontWeight: 700, letterSpacing: '.2em', color: 'var(--green)', display: 'block', marginBottom: '1vw', textTransform: 'uppercase' }}>About Me</span>
          <h1 style={{ fontSize: 'calc(1.8rem + 2.2vw)', fontWeight: 800, color: 'var(--text)', marginBottom: '1.2vw', lineHeight: 1.08, letterSpacing: '-.025em' }}>
            Developer who{' '}
            <span style={{ background: 'linear-gradient(135deg, var(--green), var(--blue))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>ships things</span>
          </h1>
          {profile.bio.map((b, i) => (
            <p key={i} style={{ color: 'rgba(240,246,255,0.6)', lineHeight: 1.85, fontWeight: 300, marginBottom: '1vw', fontSize: 'calc(0.8rem + 0.35vw)' }}>{b}</p>
          ))}
          
          {/* Info row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6vw', marginBottom: '1.8vw', marginTop: '1vw' }}>
            {[
              { icon: <GraduationCap style={{ width: 'calc(0.6rem + 0.3vw)', height: 'calc(0.6rem + 0.3vw)' }} />, text: 'Ton Duc Thang University' },
              { icon: <MapPin style={{ width: 'calc(0.6rem + 0.3vw)', height: 'calc(0.6rem + 0.3vw)' }} />, text: profile.location },
              { icon: <Globe style={{ width: 'calc(0.6rem + 0.3vw)', height: 'calc(0.6rem + 0.3vw)' }} />, text: `TOEIC ${profile.toeic}` },
            ].map(c => (
              <span key={c.text} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4vw',
                fontSize: 'calc(0.6rem + 0.25vw)', fontWeight: 500, color: 'rgba(240,246,255,0.6)',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                padding: 'calc(4px + 0.2vw) calc(10px + 0.6vw)', borderRadius: '5vw',
              }}><span style={{ display: 'inline-flex', alignItems: 'center' }}>{c.icon}</span>{c.text}</span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1vw', flexWrap: 'wrap' }}>
            <a href={`mailto:${profile.email}`} style={{
              padding: 'calc(10px + 0.4vw) calc(20px + 1vw)', borderRadius: '5vw',
              background: 'linear-gradient(135deg, var(--green-mid), var(--blue-mid))',
              color: '#fff', fontWeight: 600, fontSize: 'calc(0.75rem + 0.3vw)',
              textDecoration: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif",
              boxShadow: '0 0.4vw 1.5vw rgba(34,197,94,0.24)', transition: 'all .25s ease',
              display: 'inline-flex', alignItems: 'center', gap: '0.5vw',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0.6vw 2vw rgba(34,197,94,0.38)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0.4vw 1.5vw rgba(34,197,94,0.24)' }}
            >Get In Touch <Mail style={{ width: 'calc(0.8rem + 0.3vw)', height: 'calc(0.8rem + 0.3vw)' }} /></a>
            <button onClick={() => navigate('/cv')} style={{
              padding: 'calc(10px + 0.4vw) calc(20px + 1vw)', borderRadius: '5vw',
              background: 'transparent', border: '1px solid rgba(96,165,250,0.25)',
              color: 'var(--text)', fontWeight: 500, fontSize: 'calc(0.75rem + 0.3vw)', cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif", transition: 'all .25s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(96,165,250,0.5)'; e.currentTarget.style.background = 'rgba(96,165,250,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(96,165,250,0.25)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}
            >View CV</button>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2vw',
          transform: heroV ? 'translateY(0)' : 'translateY(3vw)',
          opacity: heroV ? 1 : 0, transition: 'all .7s .15s ease',
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: 'rgba(9,19,38,0.8)', border: '1px solid var(--border)',
              borderRadius: '1.2vw', padding: 'calc(1rem + 1vw)',
              backdropFilter: 'blur(12px)', transition: 'all .25s ease', cursor: 'default',
              position: 'relative', overflow: 'hidden',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(74,222,128,0.28)'; e.currentTarget.style.background = 'rgba(74,222,128,0.04)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(9,19,38,0.8)' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--green-mid), var(--blue-mid))', opacity: .35 }} />
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'calc(1.5rem + 1.5vw)', fontWeight: 800, background: 'linear-gradient(135deg, var(--green), var(--blue))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1, marginBottom: '0.5vw' }}>{s.num}</div>
              <div style={{ fontSize: 'calc(0.7rem + 0.3vw)', fontWeight: 600, color: 'var(--text)', marginBottom: '0.2vw' }}>{s.label}</div>
              <div style={{ fontSize: 'calc(0.6rem + 0.2vw)', color: 'var(--text-dim)' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE (JOURNEY) */}
      <section ref={timeRef} style={{
        padding: '6vw 8vw', // Đồng bộ tỷ lệ
        width: '100%', margin: "0 auto", boxSizing: 'border-box'
      }}>
        <div style={{ position: 'absolute', left: '8vw', right: '8vw', height: 1, background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.15), transparent)' }} />
        <h2 style={{
          fontSize: 'calc(1.5rem + 1.8vw)', fontWeight: 800, color: 'var(--text)',
          marginBottom: '4vw', textAlign: 'center', marginTop: '2vw',
          transform: timeV ? 'translateY(0)' : 'translateY(2vw)',
          opacity: timeV ? 1 : 0, transition: 'all .6s ease',
        }}>
          My{' '}<span style={{ background: 'linear-gradient(90deg, var(--green), var(--blue))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Journey</span>
        </h2>

        <div className="timeline-wrapper" style={{ maxWidth: '80vw', margin: '0 auto' }}>
          {timeline.map((t, i) => {
            const isRight = i % 2 !== 0
            return (
              <div key={i} style={{
                transform: timeV ? 'translateY(0)' : 'translateY(3vw)',
                opacity: timeV ? 1 : 0,
                transition: `all .52s ${i * .11}s ease`,
              }} className="tl-entry">
                
                {/* Desktop layout: grid 3 cols */}
                <div className="tl-inner" style={{ display: 'grid', gridTemplateColumns: '1fr calc(3rem + 2vw) 1fr', alignItems: 'start', marginBottom: '1.5vw' }}>
                  
                  <div className={`tl-left ${isRight ? 'tl-hide' : ''}`} style={{ padding: '0 2vw 2vw 0', display: 'flex', justifyContent: 'flex-end' }}>
                    {!isRight && <TimelineCard item={t} />}
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                    {i < timeline.length - 1 && (
                      <div style={{ position: 'absolute', top: 'calc(3rem + 2vw)', bottom: '-1vw', width: 2, background: `linear-gradient(to bottom, ${t.color}55, transparent)` }} />
                    )}
                    <div style={{
                      width: 'calc(3rem + 1vw)', height: 'calc(3rem + 1vw)', borderRadius: '1vw',
                      background: `linear-gradient(135deg, ${t.color}22, ${t.color}08)`,
                      border: `1.5px solid ${t.color}48`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 'calc(1.2rem + 0.5vw)', flexShrink: 0,
                      boxShadow: `0 0 1.5vw ${t.color}28`, zIndex: 1,
                    }}>{t.icon}</div>
                    <span style={{ fontSize: 'calc(0.6rem + 0.25vw)', fontWeight: 700, color: t.color, marginTop: '0.6vw', letterSpacing: '.03em' }}>{t.year}</span>
                  </div>

                  <div className={`tl-right ${!isRight ? 'tl-hide' : ''}`} style={{ padding: '0 0 2vw 2vw' }}>
                    {isRight && <TimelineCard item={t} />}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* VALUES */}
      <section ref={valRef} style={{
        padding: '6vw 8vw 8vw 8vw',
        width: '100%', margin: "0 auto", boxSizing: 'border-box'
      }}>
        <h2 style={{
          fontSize: 'calc(1.5rem + 1.8vw)', fontWeight: 800, color: 'var(--text)',
          marginBottom: '3vw', textAlign: 'center',
          transform: valV ? 'translateY(0)' : 'translateY(2vw)',
          opacity: valV ? 1 : 0, transition: 'all .6s ease',
        }}>
          How I{' '}<span style={{ background: 'linear-gradient(90deg, var(--green), var(--blue))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Work</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, calc(220px + 6vw)), 1fr))', gap: '1.5vw' }}>
          {values.map((v, i) => (
            <div key={i} style={{
              background: 'rgba(9,19,38,0.7)', border: '1px solid var(--border)',
              borderRadius: '1.2vw', padding: 'calc(1.2rem + 0.8vw)',
              backdropFilter: 'blur(10px)',
              transform: valV ? 'translateY(0)' : 'translateY(3vw)',
              opacity: valV ? 1 : 0,
              transition: `all .5s ${i * .1}s ease`,
              cursor: 'default', position: 'relative', overflow: 'hidden',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = v.color + '32'; e.currentTarget.style.background = `${v.color}06` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(9,19,38,0.7)' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${v.color}bb, transparent)`, opacity: .55 }} />
              <div style={{ width: 'calc(2.5rem + 1vw)', height: 'calc(2.5rem + 1vw)', borderRadius: '0.8vw', background: `${v.color}14`, border: `1px solid ${v.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'calc(1.2rem + 0.5vw)', marginBottom: '1vw' }}>{v.icon}</div>
              <div style={{ fontSize: 'calc(0.8rem + 0.35vw)', fontWeight: 600, color: 'var(--text)', marginBottom: '0.5vw' }}>{v.title}</div>
              <div style={{ fontSize: 'calc(0.7rem + 0.3vw)', color: 'var(--text-muted)', fontWeight: 300, lineHeight: 1.7 }}>{v.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .about-hero-grid { grid-template-columns: 1fr !important; gap: 8vw !important; text-align: center; }
          .about-hero-grid > div:first-child { display: flex; flex-direction: column; align-items: center; }
          .timeline-wrapper { max-width: 100% !important; }
          .tl-inner { grid-template-columns: calc(3rem + 2vw) 1fr !important; gap: 3vw; }
          .tl-left { display: none !important; }
          .tl-right { display: block !important; padding-left: 0 !important; padding-right: 0 !important; }
          .tl-hide { display: none !important; }
        }
      `}</style>
    </main>
  )
}