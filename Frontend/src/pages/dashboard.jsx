import React, { useState, useEffect } from 'react';
import AppLayout from '../components/AppLayout';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSantri: 0,
    totalUstadz: 0,
    asrama: 0,
    kelas: 0
  });

  const [chartData] = useState([
    { month: 'Jan', santri: 420, ustadz: 89 },
    { month: 'Feb', santri: 532, ustadz: 95 },
    { month: 'Mar', santri: 478, ustadz: 102 },
    { month: 'Apr', santri: 689, ustadz: 118 },
    { month: 'May', santri: 545, ustadz: 125 },
    { month: 'Jun', santri: 612, ustadz: 134 }
  ]);

  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  // Animate numbers on load
  useEffect(() => {
    const targets = { totalSantri: 5789, totalUstadz: 1234, asrama: 24, kelas: 67 };
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    let current = { totalSantri: 0, totalUstadz: 0, asrama: 0, kelas: 0 };
    
    const timer = setInterval(() => {
      let complete = true;
      Object.keys(targets).forEach(key => {
        if (current[key] < targets[key]) {
          current[key] = Math.min(current[key] + Math.ceil(targets[key] / steps), targets[key]);
          complete = false;
        }
      });
      
      setStats({...current});
      
      if (complete) clearInterval(timer);
    }, increment);

    return () => clearInterval(timer);
  }, []);

  const StatCard = ({ title, value, icon, color, trend }) => (
    <div style={{
      backgroundColor: 'var(--color-white)',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      border: '1px solid rgba(0,0,0,0.05)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
    }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '60px',
        height: '60px',
        background: `linear-gradient(135deg, ${color}20, ${color}10)`,
        clipPath: 'polygon(100% 0, 0 100%, 100% 100%)'
      }} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ 
            margin: '0 0 0.5rem 0', 
            fontSize: '0.9rem', 
            color: '#6b7280',
            fontWeight: '500'
          }}>
            {title}
          </h3>
          <div style={{ 
            fontSize: '2.2rem', 
            fontWeight: '700', 
            color: color,
            lineHeight: '1'
          }}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          {trend && (
            <div style={{
              marginTop: '0.5rem',
              fontSize: '0.8rem',
              color: trend > 0 ? '#10b981' : '#ef4444',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{ marginRight: '0.25rem' }}>
                {trend > 0 ? '↗' : '↘'}
              </span>
              {Math.abs(trend)}% from last month
            </div>
          )}
        </div>
        <div style={{
          fontSize: '1.5rem',
          color: color,
          opacity: 0.7
        }}>
          {icon}
        </div>
      </div>
    </div>
  );

  const InteractiveChart = () => (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      marginTop: '2rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      border: '1px solid rgba(0,0,0,0.05)'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>
          Statistik Pertumbuhan
        </h3>
        <select 
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '0.9rem',
            cursor: 'pointer'
          }}
        >
          <option value="6months">6 Bulan Terakhir</option>
          <option value="1year">1 Tahun Terakhir</option>
          <option value="2years">2 Tahun Terakhir</option>
        </select>
      </div>
      
      <div style={{ height: '250px', position: 'relative' }}>
        <svg width="100%" height="100%" viewBox="0 0 800 250">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1="60"
              y1={50 + i * 40}
              x2="750"
              y2={50 + i * 40}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}
          
          {/* Y-axis labels */}
          {[800, 600, 400, 200, 0].map((val, i) => (
            <text
              key={i}
              x="50"
              y={55 + i * 40}
              fontSize="12"
              fill="#6b7280"
              textAnchor="end"
            >
              {val}
            </text>
          ))}
          
          {/* Bars and data points */}
          {chartData.map((data, i) => {
            const x = 80 + i * 110;
            const santriHeight = (data.santri / 800) * 160;
            const ustadzHeight = (data.ustadz / 200) * 160;
            
            return (
              <g key={i}>
                {/* Santri bars */}
                <rect
                  x={x}
                  y={210 - santriHeight}
                  width="35"
                  height={santriHeight}
                  fill="url(#santriGradient)"
                  rx="4"
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                  <title>{`Santri: ${data.santri}`}</title>
                </rect>
                
                {/* Ustadz bars */}
                <rect
                  x={x + 40}
                  y={210 - ustadzHeight}
                  width="35"
                  height={ustadzHeight}
                  fill="url(#ustadzGradient)"
                  rx="4"
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                  <title>{`Ustadz: ${data.ustadz}`}</title>
                </rect>
                
                {/* Month labels */}
                <text
                  x={x + 35}
                  y={235}
                  fontSize="12"
                  fill="#6b7280"
                  textAnchor="middle"
                >
                  {data.month}
                </text>
              </g>
            );
          })}
          
          {/* Gradients */}
          <defs>
            <linearGradient id="santriGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <linearGradient id="ustadzGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Legend */}
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '20px',
          display: 'flex',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem' }}>
            <div style={{
              width: '12px',
              height: '12px',
              background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
              borderRadius: '2px',
              marginRight: '0.5rem'
            }} />
            Santri
          </div>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem' }}>
            <div style={{
              width: '12px',
              height: '12px',
              background: 'linear-gradient(135deg, #10b981, #34d399)',
              borderRadius: '2px',
              marginRight: '0.5rem'
            }} />
            Ustadz
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        :root {
          --color-primary: #4f46e5;
          --color-primary-dark: #4338ca;
          --color-bg: #f8fafc;
          --color-white: #ffffff;
          --color-gray-light: #e5e7eb;
          --color-gray-dark: #374151;
          --color-green: #10b981;
          --color-red: #ef4444;
          --navbar-height: 60px;
          --sidebar-width: 250px;
        }

        * {
          box-sizing: border-box;
        }

        html, body, #root {
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
          background-color: var(--color-bg);
          color: var(--color-gray-dark);
          height: 100%;
          width: 100%;
        }

        .app-layout {
          min-height: 100vh;
          background-color: var(--color-bg);
        }
        
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 32px 16px 32px;
          background: transparent;
          position: relative;
          z-index: 110;
        }

        .navbar h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
          color: #22223b;
        }

        .profile {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 8px;
          transition: background-color 0.2s ease;
          cursor: pointer;
        }

        .profile img {
          border-radius: 50%;
          width: 40px;
          height: 40px;
        }

        .profile:hover {
          background-color: rgba(79, 70, 229, 0.1);
        }

        .profile span {
          font-weight: 600;
          color: var(--color-gray-dark);
        }

        .main-content {
          margin-left: var(--sidebar-width);
          padding: calc(var(--navbar-height) + 2rem) 2rem 2rem 2rem;
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          transition: margin-left 0.3s ease;
        }

        .cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 1rem;
        }

        .welcome-section {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: white;
          padding: 2rem;
          border-radius: 16px;
          margin-bottom: 2rem;
          box-shadow: 0 8px 32px rgba(79, 70, 229, 0.3);
        }

        .welcome-section h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.8rem;
          font-weight: 700;
        }

        .welcome-section p {
          margin: 0;
          opacity: 0.9;
          font-size: 1.1rem;
        }

        @media (max-width: 768px) {
          :root {
            --sidebar-width: 70px;
          }
          .main-content {
            margin-left: var(--sidebar-width);
            padding: calc(var(--navbar-height) + 1rem) 1rem 1rem 1rem;
          }
          .navbar {
            left: var(--sidebar-width);
            padding: 0 1rem;
          }
          .cards {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>

      <AppLayout currentPage="/dashboard">
        <nav className="navbar">
          <h1>Dashboard Overview</h1>
          <div className="profile">
            <img src="https://i.pravatar.cc/40" alt="User Profile" />
            <span>Admin</span>
          </div>
        </nav>

        <div className="welcome-section fade-in">
          <h2>Selamat Datang di SIMPONI</h2>
          <p>Sistem Informasi Manajemen Pondok Pesantren Terintegrasi</p>
        </div>

        <section className="cards fade-in">
          <StatCard
            title="Total Santri"
            value={stats.totalSantri}
            icon="👥"
            color="#4f46e5"
            trend={12.5}
          />
          <StatCard
            title="Total Ustadz"
            value={stats.totalUstadz}
            icon="👨‍🏫"
            color="#10b981"
            trend={8.2}
          />
          <StatCard
            title="Asrama"
            value={stats.asrama}
            icon="🏠"
            color="#f59e0b"
            trend={0}
          />
          <StatCard
            title="Kelas"
            value={`${stats.kelas}%`}
            icon="📚"
            color="#8b5cf6"
            trend={-2.1}
          />
        </section>

        <div className="fade-in">
          <InteractiveChart />
        </div>
      </AppLayout>
    </>
  );
};

export default Dashboard;