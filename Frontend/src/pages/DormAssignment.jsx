import React, { useState, useEffect } from 'react';
import AppLayout from '../components/AppLayout';

const DormAssignment = () => {
  const [assignmentsList, setAssignmentsList] = useState([]);
  const [formData, setFormData] = useState({
    santri_id: '',
    dorm_id: '',
    entry_date: '',
    exit_date: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editKey, setEditKey] = useState('');

  // Data dummy untuk santri
  const santriList = [
    { id: 1, name: 'Ahmad Rizki Maulana', gender: 'Laki-laki' },
    { id: 2, name: 'Muhammad Faiz Abdullah', gender: 'Laki-laki' },
    { id: 3, name: 'Siti Aisyah Rahmawati', gender: 'Perempuan' },
    { id: 4, name: 'Fatimah Zahara Putri', gender: 'Perempuan' },
    { id: 5, name: 'Ali Hassan Mubarak', gender: 'Laki-laki' },
    { id: 6, name: 'Khadijah Salma Azzahra', gender: 'Perempuan' },
    { id: 7, name: 'Omar Faruk Hakim', gender: 'Laki-laki' },
    { id: 8, name: 'Aminah Nur Hidayah', gender: 'Perempuan' }
  ];

  // Data dummy untuk asrama
  const dormsList = [
    { id: 1, name: 'Asrama Putra A', capacity: 50, mudaris_name: 'Ustadz Ahmad Fauzi' },
    { id: 2, name: 'Asrama Putra B', capacity: 45, mudaris_name: 'Ustadz Muhammad Ridwan' },
    { id: 3, name: 'Asrama Putri A', capacity: 40, mudaris_name: 'Ustadzah Siti Khadijah' },
    { id: 4, name: 'Asrama Putri B', capacity: 35, mudaris_name: 'Ustadzah Fatimah Az-Zahra' }
  ];

  useEffect(() => {
    // Data dummy untuk dorm assignments
    setAssignmentsList([
      {
        santri_id: 1,
        dorm_id: 1,
        entry_date: '2024-01-15',
        exit_date: '2024-12-15',
        santri_name: 'Ahmad Rizki Maulana',
        dorm_name: 'Asrama Putra A',
        mudaris_name: 'Ustadz Ahmad Fauzi'
      },
      {
        santri_id: 2,
        dorm_id: 2,
        entry_date: '2024-01-16',
        exit_date: '2024-12-16',
        santri_name: 'Muhammad Faiz Abdullah',
        dorm_name: 'Asrama Putra B',
        mudaris_name: 'Ustadz Muhammad Ridwan'
      },
      {
        santri_id: 3,
        dorm_id: 3,
        entry_date: '2024-01-20',
        exit_date: '2024-12-20',
        santri_name: 'Siti Aisyah Rahmawati',
        dorm_name: 'Asrama Putri A',
        mudaris_name: 'Ustadzah Siti Khadijah'
      },
      {
        santri_id: 4,
        dorm_id: 4,
        entry_date: '2024-02-01',
        exit_date: '2024-12-31',
        santri_name: 'Fatimah Zahara Putri',
        dorm_name: 'Asrama Putri B',
        mudaris_name: 'Ustadzah Fatimah Az-Zahra'
      },
      {
        santri_id: 5,
        dorm_id: 1,
        entry_date: '2024-02-15',
        exit_date: '2024-12-15',
        santri_name: 'Ali Hassan Mubarak',
        dorm_name: 'Asrama Putra A',
        mudaris_name: 'Ustadz Ahmad Fauzi'
      }
    ]);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAssignmentKey = (santri_id, dorm_id) => {
    return `${santri_id}-${dorm_id}`;
  };

  const getStatusBadge = (entry_date, exit_date) => {
    const today = new Date();
    const entryDate = new Date(entry_date);
    const exitDate = new Date(exit_date);
    
    if (today < entryDate) {
      return { status: 'Belum Masuk', class: 'status-pending' };
    } else if (today > exitDate) {
      return { status: 'Sudah Keluar', class: 'status-expired' };
    } else {
      return { status: 'Aktif', class: 'status-active' };
    }
  };

  const getDormOccupancy = (dorm_id) => {
    const activeAssignments = assignmentsList.filter(assignment => {
      const today = new Date();
      const entryDate = new Date(assignment.entry_date);
      const exitDate = new Date(assignment.exit_date);
      return assignment.dorm_id === dorm_id && today >= entryDate && today <= exitDate;
    });
    const dorm = dormsList.find(d => d.id === dorm_id);
    return {
      occupied: activeAssignments.length,
      capacity: dorm ? dorm.capacity : 0
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedSantri = santriList.find(s => s.id === parseInt(formData.santri_id));
    const selectedDorm = dormsList.find(d => d.id === parseInt(formData.dorm_id));
    
    const newAssignment = {
      santri_id: parseInt(formData.santri_id),
      dorm_id: parseInt(formData.dorm_id),
      entry_date: formData.entry_date,
      exit_date: formData.exit_date,
      santri_name: selectedSantri.name,
      dorm_name: selectedDorm.name,
      mudaris_name: selectedDorm.mudaris_name
    };
    
    if (isEditing) {
      setAssignmentsList(assignmentsList.map(a => 
        getAssignmentKey(a.santri_id, a.dorm_id) === editKey
          ? newAssignment
          : a
      ));
    } else {
      // Check if assignment already exists
      const existingAssignment = assignmentsList.find(a => 
        a.santri_id === parseInt(formData.santri_id) && a.dorm_id === parseInt(formData.dorm_id)
      );
      
      if (existingAssignment) {
        alert('Santri sudah memiliki penempatan di asrama ini!');
        return;
      }
      
      setAssignmentsList([...assignmentsList, newAssignment]);
    }
    
    setFormData({ santri_id: '', dorm_id: '', entry_date: '', exit_date: '' });
    setIsEditing(false);
    setEditKey('');
  };

  const handleEdit = (assignment) => {
    setFormData({
      santri_id: assignment.santri_id.toString(),
      dorm_id: assignment.dorm_id.toString(),
      entry_date: assignment.entry_date,
      exit_date: assignment.exit_date
    });
    setEditKey(getAssignmentKey(assignment.santri_id, assignment.dorm_id));
    setIsEditing(true);
  };

  const handleDelete = (santri_id, dorm_id) => {
    if (window.confirm('Yakin ingin menghapus pembagian kamar ini?')) {
      setAssignmentsList(assignmentsList.filter(a => 
        !(a.santri_id === santri_id && a.dorm_id === dorm_id)
      ));
    }
  };

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
          --color-blue: #3b82f6;
          --color-yellow: #f59e0b;
          --color-orange: #ea580c;
          --navbar-height: 60px;
          --sidebar-width: 250px;
        }

        * {
          box-sizing: border-box;
        }

        body, html, #root {
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

        .page-header {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: white;
          padding: 2rem;
          border-radius: 16px;
          margin-bottom: 2rem;
          box-shadow: 0 8px 32px rgba(79, 70, 229, 0.3);
        }

        .page-header h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.8rem;
          font-weight: 700;
        }

        .page-header p {
          margin: 0;
          opacity: 0.9;
          font-size: 1.1rem;
        }

        .form-container {
          background-color: var(--color-white);
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          border: 1px solid rgba(0,0,0,0.05);
          margin-bottom: 2rem;
        }

        .form-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          margin-bottom: 2rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--color-gray-dark);
          font-size: 0.9rem;
        }

        input, select, textarea {
          padding: 0.75rem;
          border-radius: 8px;
          border: 1px solid var(--color-gray-light);
          font-size: 1rem;
          background-color: var(--color-white);
          color: var(--color-gray-dark);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          font-family: 'Inter', sans-serif;
        }

        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        textarea {
          resize: vertical;
          min-height: 80px;
        }

        .stats-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background-color: var(--color-white);
          border-radius: 10px;
          padding: 1.5rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          border-left: 4px solid var(--color-primary);
        }

        .stat-card h3 {
          margin: 0 0 0.5rem 0;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-gray-dark);
          text-transform: uppercase;
        }

        .stat-card .stat-number {
          font-size: 2rem;
          font-weight: 600;
          color: var(--color-primary);
          margin: 0;
        }

        .stat-card .stat-detail {
          font-size: 0.875rem;
          color: #6b7280;
          margin-top: 0.5rem;
        }

        select option {
          color: var(--color-gray-dark);
          background-color: var(--color-white);
        }

        button {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.2s ease;
          font-family: 'Inter', sans-serif;
        }

        .btn-primary {
          background-color: var(--color-primary);
          color: white;
        }

        .btn-primary:hover {
          background-color: var(--color-primary-dark);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
        }

        .btn-edit {
          background-color: var(--color-green);
          color: white;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }

        .btn-edit:hover {
          background-color: #059669;          
          transform: translateY(-1px);
        }

        .btn-delete {
          background-color: var(--color-red);
          color: white;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }

        .btn-delete:hover {
          background-color: #dc2626;           
          transform: translateY(-1px);
        }

        .table-container {
          background-color: var(--color-white);
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          border: 1px solid rgba(0,0,0,0.05);
          overflow: hidden;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
        }

        th {
          background-color: var(--color-primary);
          color: white;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        th:first-child {
          border-top-left-radius: 8px;
        }

        th:last-child {
          border-top-right-radius: 8px;
        }

        td {
          padding: 1rem;
          border-bottom: 1px solid var(--color-gray-light);
          color: var(--color-gray-dark);
        }

        tr:hover {
          background-color: #f8fafc;
        }

        tr:last-child td {
          border-bottom: none;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-active {
          background-color: #dcfce7;
          color: #166534;
        }

        .status-pending {
          background-color: #fef3c7;
          color: #92400e;
        }

        .status-expired {
          background-color: #fee2e2;
          color: #991b1b;
        }

        .occupancy-info {
          font-size: 0.75rem;
          color: #6b7280;
          margin-top: 0.25rem;
        }

        .occupancy-bar {
          width: 100%;
          height: 4px;
          background-color: #e5e7eb;
          border-radius: 2px;
          margin-top: 0.25rem;
          overflow: hidden;
        }

        .occupancy-fill {
          height: 100%;
          background-color: var(--color-primary);
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .wide-field {
          grid-column: span 2;
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
            padding: 8px 16px 16px 16px;
          }

          .navbar h1 {
            font-size: 1.5rem;
          }
          
          .form-grid {
            display: grid;
            gap: 1.5rem;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            margin-bottom: 2rem;
          }

          .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--color-gray-dark);
          font-size: 0.9rem;
        }

        input, select {
          padding: 0.75rem;
          border-radius: 8px;
          border: 1px solid var(--color-gray-light);
          font-size: 1rem;
          background-color: var(--color-white);
          color: var(--color-gray-dark);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          font-family: 'Inter', sans-serif;
        }

        input:focus, select:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        select option {
          color: var(--color-gray-dark);
          background-color: var(--color-white);
        }

        input[type="date"] {
          color: var(--color-gray-dark);
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: opacity(0.7);
        }

        button {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.2s ease;
          font-family: 'Inter', sans-serif;
        }

        .btn-primary {
          background-color: var(--color-primary);
          color: white;
        }

        .btn-primary:hover {
          background-color: var(--color-primary-dark);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
        }

        .btn-edit {
          background-color: var(--color-green);
          color: white;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }

        .btn-edit:hover {
          background-color: #059669;
          transform: translateY(-1px);
        }

        .btn-delete {
          background-color: var(--color-red);
          color: white;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }

        .btn-delete:hover {
          background-color: #dc2626;
          transform: translateY(-1px);
        }

        .table-container {
          background-color: var(--color-white);
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          border: 1px solid rgba(0,0,0,0.05);
          overflow: hidden;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
        }

        th {
          background-color: var(--color-primary);
          color: white;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        th:first-child {
          border-top-left-radius: 8px;
        }

        th:last-child {
          border-top-right-radius: 8px;
        }

        td {
          padding: 1rem;
          border-bottom: 1px solid var(--color-gray-light);
          color: var(--color-gray-dark);
        }

        tr:hover {
          background-color: #f8fafc;
        }

        tr:last-child td {
          border-bottom: none;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
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
            padding: 8px 16px 16px 16px;
          }
          
          .navbar h1 {
            font-size: 1.5rem;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .form-container,
          .table-container {
            padding: 1.5rem;
          }
          
          .page-header {
            padding: 1.5rem;
          }
          
          .page-header h2 {
            font-size: 1.5rem;
          }
          
          .table-wrapper {
            overflow-x: scroll;
          }
          
          table {
            min-width: 600px;
          }

          .stats-container {
            grid-template-columns: 1fr;
          }

          @media (max-width: 480px) {
          .main-content {
            padding: calc(var(--navbar-height) + 1rem) 0.75rem 1rem 0.75rem;
          }
          
          .form-container,
          .table-container,
          .page-header {
            padding: 1rem;
          }
          
          .navbar h1 {
            font-size: 1.25rem;
          }
          
          .page-header h2 {
            font-size: 1.25rem;
          }

          .stats-container {
            grid-template-columns: 1fr;
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

      <AppLayout currentPage="/pembagian-kamar" >
        <nav className="navbar">         
          <h1>Pembagian Kamar Asrama</h1>
          <div className="profile">
            <img src="https://i.pravatar.cc/40" alt="User Profile" />
            <span>Admin</span>
          </div>
        </nav>

        <div className="page-header fade-in">
          <h2>Manajemen Data Pembagian Kamar Asrama</h2>
          <p>
            Kelola data pembagian kamar asrama pondok pesantren dengan mudah dan terorganisir
          </p>
        </div>

        <div className="stats-container fade-in">
          {dormsList.map(dorm => {
            const occupancy = getDormOccupancy(dorm.id);
            const percentage = (occupancy.occupied / occupancy.capacity) * 100;
            return (
              <div key={dorm.id} className="stat-card">
                <h3>{dorm.name}</h3>
                <p className="stat-number">{occupancy.occupied}/{occupancy.capacity}</p>
                <div className="occupancy-bar">
                  <div 
                    className="occupancy-fill" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="stat-detail">
                  {percentage.toFixed(1)}% terisi • {dorm.mudaris_name}
                </p>
              </div>
            );
          })}
        </div>

        <div className="form-container fade-in">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="santri_id">Nama Santri</label>
                <select 
                  id="santri_id"
                  name="santri_id" 
                  value={formData.santri_id} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Pilih Santri</option>
                  {santriList.map(santri => (
                    <option key={santri.id} value={santri.id}>
                      {santri.name} ({santri.gender})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="dorm_id">Asrama</label>
                <select 
                  id="dorm_id"
                  name="dorm_id" 
                  value={formData.dorm_id} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Pilih Asrama</option>
                  {dormsList.map(dorm => {
                    const occupancy = getDormOccupancy(dorm.id);
                    return (
                      <option key={dorm.id} value={dorm.id}>
                        {dorm.name} ({occupancy.occupied}/{occupancy.capacity})
                      </option>
                    );
                  })}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="entry_date">Tanggal Masuk</label>
                <input 
                  id="entry_date"
                  type="date"
                  name="entry_date" 
                  value={formData.entry_date} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="exit_date">Tanggal Keluar</label>
                <input 
                  id="exit_date"
                  type="date"
                  name="exit_date" 
                  value={formData.exit_date} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            
            <button type="submit" className="btn-primary">
              {isEditing ? 'Update Pembagian Kamar' : 'Tambah Pembagian Kamar'}
            </button>
          </form>
        </div>

        <div className="table-container fade-in">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Nama Santri</th>
                  <th>Asrama</th>
                  <th>Pengasuh</th>
                  <th>Tanggal Masuk</th>
                  <th>Tanggal Keluar</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {assignmentsList.map(assignment => {
                  const statusInfo = getStatusBadge(assignment.entry_date, assignment.exit_date);
                  return (
                    <tr key={getAssignmentKey(assignment.santri_id, assignment.dorm_id)}>
                      <td>{assignment.santri_name}</td>
                      <td>
                        {assignment.dorm_name}
                        <div className="occupancy-info">
                          {(() => {
                            const occupancy = getDormOccupancy(assignment.dorm_id);
                            return `${occupancy.occupied}/${occupancy.capacity} terisi`;
                          })()}
                        </div>
                      </td>
                      <td>{assignment.mudaris_name}</td>
                      <td>{formatDate(assignment.entry_date)}</td>
                      <td>{formatDate(assignment.exit_date)}</td>
                      <td>
                        <span className={`status-badge ${statusInfo.class}`}>
                          {statusInfo.status}
                        </span>
                      </td>
                      <td className="action-buttons">
                        <button className="btn-edit" onClick={() => handleEdit(assignment)}>
                          Edit
                        </button>
                        <button className="btn-delete" onClick={() => handleDelete(assignment.santri_id, assignment.dorm_id)}>
                          Hapus
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </AppLayout>
    </>
  );
};

export default DormAssignment;