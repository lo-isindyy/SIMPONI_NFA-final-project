import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const menuItems = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'santri', label: 'Data Santri' },
  { key: 'ustadz', label: 'Data Ustadz' },
  { key: 'jadwal', label: 'Penjadwalan' },
  { key: 'asrama', label: 'Asrama', hasDropdown: true },
  { key: 'kelas', label: 'Ruang Kelas' },
  { key: 'nilai', label: 'Penilaian' },
  { key: 'logout', label: 'Logout' },
];

const Sidebar = ({ currentPage, onChangePage }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleDropdown = () => {
    setOpenDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      navigate('/login'); 
    }
  };

  return (
    <>
      <style>{`
        :root {
          --color-primary: #4f46e5;
          --color-white: #ffffff;
          --color-green: #10b981;
          --sidebar-width: 250px;
          --navbar-height: 60px;
        }
        /* Sidebar */
        .sidebar {
          position: fixed;
          top: 0; left: 0;
          width: var(--sidebar-width);
          height: 100vh;
          background-color: var(--color-primary);
          color: var(--color-white);
          display: flex;
          flex-direction: column;
          padding: 1rem 0;
          z-index: 100;
          overflow-y: auto;
          scrollbar-width: thin; 
          scrollbar-color: #aaa transparent;
        }
        .sidebar h2 {
          font-weight: 600;
          text-align: center;
          margin-bottom: 2rem;
          font-size: 1.75rem;
          letter-spacing: 2px;
          user-select: none;
        }
        .divider {
          height: 1px;
          background-color: rgba(255, 255, 255, 255);
          margin: 0 1.5rem 1rem;
        }
        .nav-links {
          list-style: none;
          padding-left: 0;
          margin: 0;
          flex-grow: 1;
        }
        .nav-links li {
          margin: 0.8rem 0;
        }
        .nav-links button {
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          color: var(--color-white);
          font-weight: 500;
          padding: 0.6rem 2rem;
          border-left: 4px solid transparent;
          cursor: pointer;
          user-select: none;
          transition: background-color 0.3s ease;
          font-family: inherit;
          font-size: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .nav-links button:hover,
        .nav-links button.active {
          background-color: #4338ca;
          border-left-color: var(--color-green);
          outline: none;
        }
        .nav-links button:focus {
          outline: 2px solid var(--color-green);
          outline-offset: -2px;
        }
        .dropdown {
          padding-left: 3rem;
          display: ${openDropdown ? 'block' : 'none'};
        }
        .dropdown button {
          padding: 0.5rem 0;
        }
        .arrow {
          transition: transform 0.3s ease;
          fill: var(--color-white);
          width: 12px;
          height: 12px;
          flex-shrink: 0;
          margin-left: 5px;
        }
        .arrow.open {
          transform: rotate(90deg);
        }

        /* Responsive */
        @media (max-width: 768px) {
          :root {
            --sidebar-width: 70px;
          }
          .sidebar {
            width: var(--sidebar-width);
            padding: 1rem 0.3rem;
          }
          .sidebar h2 {
            font-size: 1rem;
            letter-spacing: 1px;
            margin-bottom: 1.5rem;
            display: none;
            padding-top: 0;
          }
          .nav-links button {
            padding: 0.6rem 0.6rem;
            border: none;
            text-align: center;
            justify-content: center;
          }
          .nav-links button span {
            display: none;
          }
          .arrow {
            display: none;
          }
        }
      `}</style>
      <aside className="sidebar" aria-label="Sidebar Navigation">
        <h2>SIMPONI</h2>
        <hr className="divider" />
        <ul className="nav-links">
          {menuItems.map(({ key, label, hasDropdown }) => (
            <li key={key}>
              <button
                type="button"
                className={currentPage === key ? 'active' : ''}
                onClick={() => {
                  if (key === 'logout') {
                    handleLogout(); // Call handleLogout on logout
                  } else if (hasDropdown) {
                    toggleDropdown();
                  } else {
                    onChangePage(key);
                  }
                }}
                aria-current={currentPage === key ? 'page' : undefined}
                aria-expanded={hasDropdown ? openDropdown : undefined}
                aria-haspopup={hasDropdown ? 'true' : undefined}
              >
                <span>{label}</span>
                {hasDropdown && (
                  <svg
                    className={`arrow ${openDropdown ? 'open' : ''}`}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              {hasDropdown && openDropdown && (
                <div className="dropdown">
                  <button
                    type="button"
                    onClick={() => onChangePage('asrama')}
                    className={currentPage === 'asrama' ? 'active' : ''}
                  >
                    Kamar
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangePage('pembagian')}
                    className={currentPage === 'pembagian' ? 'active' : ''}
                  >
                    Pembagian Kamar
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
