import { useState } from 'react'
import { profile } from '../../data/projects'

export default function CVPage() {
  const [loaded, setLoaded] = useState(false)

  return (
    <main style={{ paddingTop: 'calc(50px + 2vw)', minHeight: '100dvh', position: 'relative', zIndex: 10, width: '100vw', boxSizing: 'border-box' }}>
      
      {/* Đã bỏ maxWidth, sử dụng padding theo vw để đồng bộ lề với toàn hệ thống */}
      <div style={{ width: '100%', margin: '0 auto', padding: '4vw 8vw 6vw 8vw', boxSizing: 'border-box' }}>

        {/* Header */}
        <div style={{
          marginBottom: '3vw',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '2vw',
        }}>
          <div>
            <span style={{ fontSize: 'calc(0.6rem + 0.3vw)', fontWeight: 700, letterSpacing: '.2em', color: 'var(--green)', display: 'block', marginBottom: '0.8vw', textTransform: 'uppercase' }}>
              Resume
            </span>
            <h1 style={{ fontSize: 'calc(1.6rem + 2vw)', fontWeight: 800, color: 'var(--text)', marginBottom: '0.6vw', lineHeight: 1.1 }}>
              Curriculum{' '}
              <span style={{ background: 'linear-gradient(135deg, var(--green), var(--blue))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Vitae
              </span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 'calc(0.8rem + 0.4vw)', fontWeight: 300 }}>
              {profile.name} · {profile.title}
            </p>
          </div>

          <a href={profile.cvFile} download style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5vw',
            padding: 'calc(10px + 0.4vw) calc(20px + 1vw)', borderRadius: '5vw',
            background: 'linear-gradient(135deg, var(--green-mid), var(--blue-mid))',
            color: '#fff', fontWeight: 600, fontSize: 'calc(0.75rem + 0.3vw)',
            textDecoration: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif",
            boxShadow: '0 0.4vw 1.5vw rgba(34,197,94,0.24)',
            transition: 'all .25s ease', whiteSpace: 'nowrap',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0.6vw 2vw rgba(34,197,94,0.38)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0.4vw 1.5vw rgba(34,197,94,0.24)' }}
          >
            ↓ Download PDF
          </a>
        </div>

        {/* PDF viewer */}
        <div style={{
          background: 'rgba(9,19,38,0.8)', border: '1px solid var(--border)',
          borderRadius: '1.5vw', overflow: 'hidden',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 1.5vw 4vw rgba(0,0,0,0.4)',
          minHeight: '60vh', position: 'relative',
        }}>
          {!loaded && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1vw',
            }}>
              <div style={{
                width: 'calc(30px + 2vw)', height: 'calc(30px + 2vw)', borderRadius: '50%',
                border: '2px solid rgba(96,165,250,0.15)',
                borderTop: '2px solid var(--blue)',
                animation: 'spin .9s linear infinite',
              }} />
              <span style={{ color: 'var(--text-muted)', fontSize: 'calc(0.7rem + 0.3vw)' }}>Loading CV...</span>
            </div>
          )}
          <iframe
            src={profile.cvFile}
            title="Nguyễn Hoàng Huy — CV"
            width="100%"
            style={{
              border: 'none', display: 'block',
              height: '85dvh', // Sử dụng dvh để PDF viewer chiếm trọn phần lớn màn hình
              opacity: loaded ? 1 : 0, transition: 'opacity .4s ease',
            }}
            onLoad={() => setLoaded(true)}
          />
        </div>

        <p style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: 'calc(0.65rem + 0.25vw)', marginTop: '2vw' }}>
          Having trouble viewing?{' '}
          <a href={profile.cvFile} download style={{ color: 'var(--blue)', textDecoration: 'none' }}>
            Download the PDF directly.
          </a>
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          /* Canh giữa chữ và nút trên mobile */
          div[style*="justify-content: space-between"] {
            flex-direction: column;
            align-items: center !important;
            text-align: center;
          }
        }
      `}</style>
    </main>
  )
}