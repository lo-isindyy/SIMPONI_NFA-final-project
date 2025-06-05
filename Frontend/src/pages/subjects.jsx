import React, { useState, useEffect } from 'react';
import AppLayout from '../components/AppLayout';

const Subjects = () => {
  const [subjectsList, setSubjectsList] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    day: '',
    year: '',
    classroom_id: '',
    mudaris_id: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Data dummy untuk classroom
  const classroomsList = [
    { id: 1, name: 'Kelas 1A' },
    { id: 2, name: 'Kelas 1B' },
    { id: 3, name: 'Kelas 2A' },
    { id: 4, name: 'Kelas 2B' },
    { id: 5, name: 'Kelas 3A' },
    { id: 6, name: 'Kelas 3B' }
  ];

  // Data dummy untuk mudaris
  const mudarisList = [
    { id: 1, name: 'Ustadz Ahmad Fauzi' },
    { id: 2, name: 'Ustadz Muhammad Ridwan' },
    { id: 3, name: 'Ustadzah Siti Khadijah' },
    { id: 4, name: 'Ustadzah Fatimah Az-Zahra' },
    { id: 5, name: 'Ustadz Abdullah Hassan' },
    { id: 6, name: 'Ustadzah Aminah Yusuf' }
  ];

  useEffect(() => {
    // Data dummy untuk subjects
    setSubjectsList([
      {
        id: 1,
        name: 'Tahfidz Al-Quran',
        day: '2024-01-15T08:00',
        year: 2024,
        classroom_id: 1,
        mudaris_id: 1,
        classroom_name: 'Kelas 1A',
        mudaris_name: 'Ustadz Ahmad Fauzi'
      },
      {
        id: 2,
        name: 'Fiqh',
        day: '2024-01-15T10:00',
        year: 2024,
        classroom_id: 2,
        mudaris_id: 2,
        classroom_name: 'Kelas 1B',
        mudaris_name: 'Ustadz Muhammad Ridwan'
      },
      {
        id: 3,
        name: 'Akidah Akhlak',
        day: '2024-01-16T09:00',
        year: 2024,
        classroom_id: 3,
        mudaris_id: 3,
        classroom_name: 'Kelas 2A',
        mudaris_name: 'Ustadzah Siti Khadijah'
      },
      {
        id: 4,
        name: 'Bahasa Arab',
        day: '2024-01-16T11:00',
        year: 2024,
        classroom_id: 4,
        mudaris_id: 4,
        classroom_name: 'Kelas 2B',
        mudaris_name: 'Ustadzah Fatimah Az-Zahra'
      },
      {
        id: 5,
        name: 'Tafsir Al-Quran',
        day: '2024-01-17T08:30',
        year: 2024,
        classroom_id: 5,
        mudaris_id: 5,
        classroom_name: 'Kelas 3A',
        mudaris_name: 'Ustadz Abdullah Hassan'
      }
    ]);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getDayName = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleDateString('id-ID', { weekday: 'long' });
  };

  const getTime = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedClassroom = classroomsList.find(c => c.id === parseInt(formData.classroom_id));
    const selectedMudaris = mudarisList.find(m => m.id === parseInt(formData.mudaris_id));
    
    if (isEditing) {
      setSubjectsList(subjectsList.map(s => 
        s.id === formData.id 
          ? { 
              ...formData, 
              classroom_name: selectedClassroom.name,
              mudaris_name: selectedMudaris.name,
              year: parseInt(formData.year),
              classroom_id: parseInt(formData.classroom_id),
              mudaris_id: parseInt(formData.mudaris_id)
            }
          : s
      ));
    } else {
      setSubjectsList([
        ...subjectsList, 
        { 
          ...formData, 
          id: Date.now(),
          classroom_name: selectedClassroom.name,
          mudaris_name: selectedMudaris.name,
          year: parseInt(formData.year),
          classroom_id: parseInt(formData.classroom_id),
          mudaris_id: parseInt(formData.mudaris_id)
        }
      ]);
    }
    setFormData({ id: '', name: '', day: '', year: '', classroom_id: '', mudaris_id: '' });
    setIsEditing(false);
  };

  const handleEdit = (subject) => {
    setFormData({
      id: subject.id,
      name: subject.name,
      day: subject.day,
      year: subject.year.toString(),
      classroom_id: subject.classroom_id.toString(),
      mudaris_id: subject.mudaris_id.toString()
    });
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus jadwal mata pelajaran ini?')) {
      setSubjectsList(subjectsList.filter(s => s.id !== id));
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
          --color-purple: #8b5cf6;
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
          border-radius: 10px;
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

        .subject-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: capitalize;
          display: inline-block;
        }

        .subject-tahfidz {
          background-color: #dcfce7;
          color: #166534;
        }

        .subject-fiqh {
          background-color: #dbeafe;
          color: #1e40af;
        }

        .subject-akidah {
          background-color: #fef3c7;
          color: #92400e;
        }

        .subject-arabic {
          background-color: #ede9fe;
          color: #6b21a8;
        }

        .subject-tafsir {
          background-color: #fce7f3;
          color: #be185d;
        }

        .subject-default {
          background-color: #f3f4f6;
          color: var(--color-gray-dark);
        }

        .day-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          background-color: #f0f9ff;
          color: #0369a1;
        }

        .time-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          background-color: #f0fdf4;
          color: #166534;
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

      <AppLayout currentPage="/jadwal" >
        <nav className="navbar">
           <h1>Jadwal Mata Pelajaran</h1>
          <div className="profile" tabIndex="0" aria-label="User Profile">
            <img src="https://i.pravatar.cc/40" alt="User Profile" />
            <span>Admin</span>
          </div>
        </nav>

        <div className="page-header fade-in">
          <h2>Manajemen Data Mata Pelajaran</h2>
          <p>
            Kelola data mata pelajaran pondok pesantren dengan mudah dan terorganisir
          </p>
        </div>

        <div className="form-container fade-in">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Nama Mata Pelajaran</label>
                <input 
                  id="name"
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Contoh: Tahfidz Al-Quran" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="day">Hari & Waktu</label>
                <input 
                  id="day"
                  type="datetime-local"
                  name="day" 
                  value={formData.day} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="year">Tahun Ajaran</label>
                <input 
                  id="year"
                  type="number"
                  name="year" 
                  value={formData.year} 
                  onChange={handleChange} 
                  placeholder="2024"
                  min="2020"
                  max="2030"
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="classroom_id">Kelas</label>
                <select 
                  id="classroom_id"
                  name="classroom_id" 
                  value={formData.classroom_id} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Pilih Kelas</option>
                  {classroomsList.map(classroom => (
                    <option key={classroom.id} value={classroom.id}>
                      {classroom.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="mudaris_id">Pengajar (Mudaris)</label>
                <select 
                  id="mudaris_id"
                  name="mudaris_id" 
                  value={formData.mudaris_id} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Pilih Pengajar</option>
                  {mudarisList.map(mudaris => (
                    <option key={mudaris.id} value={mudaris.id}>
                      {mudaris.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <button type="submit" className="btn-primary">
              {isEditing ? 'Update Jadwal' : 'Tambah Jadwal'}
            </button>
          </form>
        </div>

        <div className="table-container fade-in">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Mata Pelajaran</th>
                  <th>Hari</th>
                  <th>Waktu</th>
                  <th>Tahun</th>
                  <th>Kelas</th>
                  <th>Pengajar</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {subjectsList.map(subject => (
                  <tr key={subject.id}>
                    <td>{subject.id}</td>
                    <td>
                      <span className={`subject-badge ${
                        subject.name.toLowerCase().includes('tahfidz') ? 'subject-tahfidz' :
                        subject.name.toLowerCase().includes('fiqh') ? 'subject-fiqh' :
                        subject.name.toLowerCase().includes('akidah') ? 'subject-akidah' :
                        subject.name.toLowerCase().includes('arab') ? 'subject-arabic' :
                        subject.name.toLowerCase().includes('tafsir') ? 'subject-tafsir' :
                        'subject-default'
                      }`}>
                        {subject.name}
                      </span>
                    </td>
                    <td>
                      <span className="day-badge">
                        {getDayName(subject.day)}
                      </span>
                    </td>
                    <td>
                      <span className="time-badge">
                        {getTime(subject.day)}
                      </span>
                    </td>
                    <td>{subject.year}</td>
                    <td>{subject.classroom_name}</td>
                    <td>{subject.mudaris_name}</td>
                    <td className="action-buttons">
                      <button className="btn-edit" onClick={() => handleEdit(subject)}>
                        Edit
                      </button>
                      <button className="btn-delete" onClick={() => handleDelete(subject.id)}>
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AppLayout>
    </>
  );
};

export default Subjects;