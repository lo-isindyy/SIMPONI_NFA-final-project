import React from 'react';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

        :root {
          --color-primary: #4f46e5;
          --color-primary-dark: #4338ca;
          --color-bg: #f9fafb;
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

        body, html, #root {
          margin: 0;
          font-family: 'Inter', sans-serif;
          background-color: var(--color-bg);
          color: var(--color-gray-dark);
          height: 100%;
          width: 100%;
        }

        /* Navbar fixed top */
        .navbar {
          position: fixed;
          top: 0;
          left: var(--sidebar-width);
          right: 0;
          height: var(--navbar-height);
          background-color: var(--color-white);
          border-bottom: 1px solid var(--color-gray-light);
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 0 1.5rem;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
          z-index: 110;
          user-select: none;
        }

        .profile {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .profile img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          margin-right: 0.7rem;
          border: 2px solid var(--color-primary);
        }

        .profile span {
          font-weight: 600;
          color: var(--color-gray-dark);
        }

        /* Main content with padding for navbar and sidebar */
        .main-content {
          margin-left: var(--sidebar-width);
          padding: calc(var(--navbar-height) + 1.5rem) 2rem 1.5rem 2rem;
          min-height: 100vh;
          background-color: var(--color-bg);
          transition: padding 0.3s ease;
        }

        /* Dashboard cards */
        .cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .card {
          background-color: var(--color-white);
          border-radius: 10px;
          padding: 1.5rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          user-select: none;
        }

        .card h3 {
          margin: 0;
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--color-gray-dark);
        }

        .card .value {
          margin-top: 0.5rem;
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-primary);
        }

        /* Simple chart placeholder */
        .chart {
          height: 200px;
          margin-top: 2rem;
          background: linear-gradient(135deg, #4f46e5 0%, #818cf8 100%);
          border-radius: 10px;
          box-shadow: inset 0 0 15px rgba(255,255,255,0.3);
          position: relative;
          overflow: hidden;
          user-select: none;
        }

        .chart svg {
          position: absolute;
          bottom: 0;
          left: 0;
        }

        /* Responsive */
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
          }
          .cards {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <Sidebar />

      <div className="main-content">
        <nav className="navbar">
          <div className="profile" tabIndex="0" aria-label="User Profile">
            <img src="https://i.pravatar.cc/40" alt="User Profile" />
            <span>Admin</span>
          </div>
        </nav>

        <h1>Dashboard</h1>

        <section className="cards" aria-label="Dashboard Statistics">
          <div className="card">
            <h3>Total Santri</h3>
            <div className="value" id="total-users">5789</div>
          </div>
          <div className="card">
            <h3>Total Ustadz</h3>
            <div className="value" id="active-sessions">1234</div>
          </div>
          <div className="card">
            <h3>Asrama</h3>
            <div className="value" id="sales-today">$9,876</div>
          </div>
          <div className="card">
            <h3>Kelas</h3>
            <div className="value" id="server-load">67%</div>
          </div>
        </section>

        <section className="chart" aria-label="Sales chart">
          <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <rect x="20" y="120" width="30" height="80" fill="#60a5fa"></rect>
            <rect x="70" y="70" width="30" height="130" fill="#3b82f6"></rect>
            <rect x="120" y="100" width="30" height="100" fill="#2563eb"></rect>
            <rect x="170" y="40" width="30" height="160" fill="#1d4ed8"></rect>
            <rect x="220" y="90" width="30" height="110" fill="#1e40af"></rect>
            <rect x="270" y="130" width="30" height="70" fill="#4338ca"></rect>
          </svg>
        </section>
      </div>
    </>
  );
};

export default Dashboard;

