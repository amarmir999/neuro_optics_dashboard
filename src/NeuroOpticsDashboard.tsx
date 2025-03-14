import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Clock, Activity, Eye, Users, Bell, Search, Settings, User } from 'lucide-react';
import './NeuroOpticsDashboard.css';

// Sample data
const patientProgressData = [
  { name: 'שבוע 1', visualAcuity: 0.3, eyeTracking: 0.2, focusTime: 0.4 },
  { name: 'שבוע 2', visualAcuity: 0.4, eyeTracking: 0.3, focusTime: 0.5 },
  { name: 'שבוע 3', visualAcuity: 0.5, eyeTracking: 0.5, focusTime: 0.6 },
  { name: 'שבוע 4', visualAcuity: 0.6, eyeTracking: 0.6, focusTime: 0.7 },
  { name: 'שבוע 5', visualAcuity: 0.7, eyeTracking: 0.7, focusTime: 0.8 },
  { name: 'שבוע 6', visualAcuity: 0.8, eyeTracking: 0.8, focusTime: 0.9 },
];

const gameCompletionData = [
  { name: 'מציאת פוקוס', completed: 12, target: 15 },
  { name: 'מעקב ראייה', completed: 8, target: 10 },
  { name: 'תפיסת עומק', completed: 5, target: 8 },
  { name: 'אימון ניגודיות', completed: 9, target: 12 },
];

const patientList = [
  { id: 1, name: 'אמה יוסף', age: 34, condition: 'אמבליופיה', lastActivity: 'לפני שעתיים', progress: 68 },
  { id: 2, name: 'מיכאל כהן', age: 42, condition: 'פזילה', lastActivity: 'לפני יום', progress: 45 },
  { id: 3, name: 'שרה וילמס', age: 28, condition: 'אי-התכנסות', lastActivity: 'לפני 4 שעות', progress: 72 },
  { id: 4, name: 'רוברט גרסיה', age: 57, condition: 'טיפול ראייה', lastActivity: 'לפני 3 שעות', progress: 31 },
  { id: 5, name: 'אוליביה מרטינז', age: 19, condition: 'אמבליופיה', lastActivity: 'לפני יומיים', progress: 85 },
];

const recentActivities = [
  { patient: 'אמה יוסף', activity: 'השלימה משחק "מציאת פוקוס"', time: 'לפני שעתיים', score: '87/100' },
  { patient: 'שרה וילמס', activity: 'השלימה משחק "מעקב ראייה"', time: 'לפני 4 שעות', score: '92/100' },
  { patient: 'רוברט גרסיה', activity: 'התחיל מחזור טיפול חדש', time: 'לפני 3 שעות', score: 'N/A' },
];

const upcomingSessions = [
  { patient: 'מיכאל כהן', time: 'היום, 14:30', type: 'הערכה' },
  { patient: 'אוליביה מרטינז', time: 'היום, 16:00', type: 'אימון' },
  { patient: 'אמה יוסף', time: 'מחר, 10:15', type: 'בדיקה' },
];

const NeuroOpticsDashboard: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState(patientList[0]);
  
  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo-container">
            <Eye className="logo-icon" size={28} />
            <h1 className="dashboard-title">לוח בקרה לטיפול נוירו-אופטי</h1>
          </div>
          <div className="header-actions">
            <div className="search-container">
              <input 
                type="text" 
                placeholder="חיפוש מטופלים..." 
                className="search-input"
              />
              <Search className="search-icon" size={18} />
            </div>
            <button className="notification-button">
              <Bell size={20} />
              <span className="notification-indicator"></span>
            </button>
            <Settings className="settings-icon" size={20} />
            <div className="user-profile">
              <div className="user-avatar">
                <User size={18} />
              </div>
              <span className="user-name">ד״ר טיילור</span>
            </div>
          </div>
        </div>
      </header>
      
      <div className="dashboard-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <h2 className="sidebar-title">
              <Users size={18} className="sidebar-icon" />
              מטופלים
            </h2>
          </div>
          <div className="patient-list">
            {patientList.map(patient => (
              <div 
                key={patient.id}
                className={`patient-item ${selectedPatient.id === patient.id ? 'patient-selected' : ''}`}
                onClick={() => setSelectedPatient(patient)}
              >
                <div className="patient-header">
                  <h3 className="patient-name">{patient.name}</h3>
                  <span className="patient-activity">{patient.lastActivity}</span>
                </div>
                <div className="patient-details">
                  <span>{patient.age} שנים, {patient.condition}</span>
                </div>
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${patient.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </aside>
        
        {/* Main content */}
        <main className="main-content">
          <div className="patient-header-section">
            <div className="patient-header-content">
              <h2 className="selected-patient-name">{selectedPatient.name}</h2>
              <div className="patient-actions">
                <button className="secondary-button">
                  רשומות מטופל
                </button>
                <button className="primary-button">
                  קביעת פגישה
                </button>
              </div>
            </div>
            <p className="patient-summary">{selectedPatient.age} שנים • {selectedPatient.condition} • התקדמות טיפולית: {selectedPatient.progress}%</p>
          </div>
          
          {/* Stats cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <Activity className="stat-icon" size={18} />
                <h3 className="stat-title">פגישות שבועיות</h3>
              </div>
              <p className="stat-value">4 / 5</p>
              <p className="stat-trend positive">+12% משבוע שעבר</p>
            </div>
            <div className="stat-card">
              <div className="stat-header">
                <Eye className="stat-icon" size={18} />
                <h3 className="stat-title">חדות ראייה</h3>
              </div>
              <p className="stat-value">20/40</p>
              <p className="stat-trend positive">שיפור מ-20/60</p>
            </div>
            <div className="stat-card">
              <div className="stat-header">
                <Clock className="stat-icon" size={18} />
                <h3 className="stat-title">זמן מיקוד</h3>
              </div>
              <p className="stat-value">18 דקות</p>
              <p className="stat-trend positive">+4 דקות מקו הבסיס</p>
            </div>
            <div className="stat-card">
              <div className="stat-header">
                <Calendar className="stat-icon" size={18} />
                <h3 className="stat-title">ימים בתוכנית</h3>
              </div>
              <p className="stat-value">42</p>
              <p className="stat-trend neutral">יעד: 90 ימים</p>
            </div>
          </div>
          
          {/* Charts */}
          <div className="charts-grid">
            <div className="chart-card">
              <h3 className="chart-title">התקדמות טיפולית</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={patientProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="visualAcuity" stroke="#3B82F6" name="חדות ראייה" />
                  <Line type="monotone" dataKey="eyeTracking" stroke="#10B981" name="מעקב עיניים" />
                  <Line type="monotone" dataKey="focusTime" stroke="#8B5CF6" name="זמן מיקוד" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-card">
              <h3 className="chart-title">התקדמות השלמת משחקים</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={gameCompletionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="#3B82F6" name="הושלם" />
                  <Bar dataKey="target" fill="#E5E7EB" name="יעד" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Activity and Schedule */}
          <div className="activities-grid">
            <div className="activity-card">
              <h3 className="activity-title">פעילויות אחרונות</h3>
              <div className="activities-container">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-marker"></div>
                    <div className="activity-content">
                      <p className="activity-text">{activity.activity}</p>
                      <div className="activity-meta">
                        <span className="activity-time">{activity.time}</span>
                        {activity.score !== 'N/A' && (
                          <span className="activity-score">
                            {activity.score}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="activity-card">
              <h3 className="activity-title">פגישות קרובות</h3>
              <div className="activities-container">
                {upcomingSessions.map((session, index) => (
                  <div key={index} className="session-item">
                    <div className="session-icon-container">
                      {session.type === 'אימון' ? (
                        <Activity size={16} />
                      ) : session.type === 'הערכה' ? (
                        <Eye size={16} />
                      ) : (
                        <Clock size={16} />
                      )}
                    </div>
                    <div className="session-content">
                      <p className="session-patient">{session.patient}</p>
                      <div className="session-meta">
                        <span className="session-time">{session.time}</span>
                        <span className="session-type">
                          {session.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="view-schedule-button">
                  צפייה בלוח זמנים מלא
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NeuroOpticsDashboard;