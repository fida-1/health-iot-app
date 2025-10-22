import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:8081/api/data')
        .then(res => res.json())
        .then(d => setData(d))
        .catch(err => console.log('Erreur fetch:', err));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.app}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>Smart Health Dashboard</h1>
          <div style={styles.status}>
            <span style={styles.statusDot}></span>
            Connected
          </div>
        </div>
      </header>

      {/* Main */}
      <main style={styles.main}>
        {/* Stats Cards */}
        <div style={styles.statsGrid}>
          <StatCard icon="⌚" title="Smartwatch Connected" value={1} />
          <StatCard
            icon="📈"
            title="Average ECG"
            value={data.length ? (data.reduce((sum, d) => sum + d.ecg, 0) / data.length).toFixed(2) : 0}
          />
          <StatCard
            icon="💡"
            title="Average PPG"
            value={data.length ? (data.reduce((sum, d) => sum + d.ppg, 0) / data.length).toFixed(2) : 0}
          />
          <StatCard
            icon="🕹️"
            title="Average ACC"
            value={data.length ? (data.reduce((sum, d) => sum + d.acc, 0) / data.length).toFixed(2) : 0}
          />
        </div>

        {/* Table */}
        <div style={styles.tableContainer}>
          <div style={styles.tableHeader}>
            <h2>Sensor Data</h2>
            <span style={styles.tableBadge}>{data.length} Records</span>
          </div>
          <div style={styles.table}>
            <div style={{ ...styles.tableRow, ...styles.headerRow }}>
              <div>ID</div>
              <div>ECG</div>
              <div>PPG</div>
              <div>ACC</div>
              <div>Status</div>
            </div>

            {data.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>📭</div>
                <h3>No Data Available</h3>
              </div>
            ) : (
              data.map((item, i) => (
                <div style={styles.tableRow} key={i}>
                  <div>{item.id}</div>
                  <div>{item.ecg} mV</div>
                  <div>{item.ppg} %</div>
                  <div>{item.acc} g</div>
                  <div
                    style={{
                      ...styles.statusBadge,
                      backgroundColor: item.ecg > 80 ? '#0d47a1' : '#b71c1c',
                      boxShadow: item.ecg > 80
                        ? '0 6px 15px rgba(13,71,161,0.4)'
                        : '0 6px 15px rgba(183,28,28,0.4)'
                    }}
                  >
                    {item.ecg > 80 ? 'Active' : 'Warning'}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        © 2025 Smart Health Dashboard. All rights reserved.
      </footer>
    </div>
  );
}

// StatCard Component
const StatCard = ({ icon, title, value }) => (
  <div style={styles.statCard}>
    <div style={styles.statIcon}>{icon}</div>
    <div>
      <h3 style={styles.statTitle}>{title}</h3>
      <div style={styles.statValue}>{value}</div>
    </div>
  </div>
);

// Styles
const styles = {
  app: { fontFamily: 'Poppins, sans-serif', minHeight: '100vh', background: '#e8eaf6', display: 'flex', flexDirection: 'column' },
  header: { background: 'linear-gradient(90deg, #0d47a1, #1976d2)', padding: 25, color: '#fff', boxShadow: '0 8px 25px rgba(0,0,0,0.2)', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerContent: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: '2rem', fontWeight: 700, letterSpacing: 1 },
  status: { display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: '0.9rem' },
  statusDot: { width: 14, height: 14, borderRadius: '50%', backgroundColor: '#64b5f6', marginRight: 8, boxShadow: '0 0 10px #64b5f688', animation: 'pulse 1.5s infinite' },
  main: { flex: 1, padding: '30px 40px' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 25, marginBottom: 50 },
  statCard: {
    background: '#ffffffdd',
    borderRadius: 20,
    padding: 25,
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
    transition: '0.5s',
    cursor: 'default'
  },
  statIcon: { fontSize: '3rem', marginRight: 20 },
  statTitle: { fontSize: '1rem', color: '#222', marginBottom: 8 },
  statValue: { fontSize: '1.8rem', fontWeight: 700, color: '#0d47a1' },
  tableContainer: { background: '#ffffffdd', borderRadius: 20, padding: 25, boxShadow: '0 15px 35px rgba(0,0,0,0.15)' },
  tableHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  tableBadge: { background: '#0d47a1', color: '#fff', padding: '6px 14px', borderRadius: 20, fontSize: '0.85rem', fontWeight: 600, boxShadow: '0 6px 15px rgba(0,0,0,0.2)' },
  table: { display: 'grid', gridTemplateRows: 'auto', width: '100%' },
  tableRow: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', padding: '14px 10px', borderBottom: '1px solid #ccc', alignItems: 'center', transition: '0.3s', borderRadius: 12, marginBottom: 6 },
  headerRow: { fontWeight: 600, color: '#333', background: '#c5cae9', borderRadius: 12 },
  statusBadge: { padding: '6px 14px', borderRadius: 20, fontWeight: 600, fontSize: '0.85rem', color: '#fff', textAlign: 'center', transition: '0.3s' },
  emptyState: { textAlign: 'center', padding: 30, color: '#aaa' },
  emptyIcon: { fontSize: '3rem', marginBottom: 10 },
  footer: { background: '#0d47a1', padding: 18, textAlign: 'center', fontSize: '0.85rem', color: '#fff', boxShadow: '0 -8px 20px rgba(0,0,0,0.15)' }
};

// Animation Keyframes
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`@keyframes pulse { 0% { transform: scale(0.8); opacity: 0.7; } 50% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(0.8); opacity: 0.7; } }`, styleSheet.cssRules.length);

export default App;
