import React, { useState, useEffect } from 'react';
import './App.css'; // Assurez-vous de mettre le CSS que tu as fourni dans App.css

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://backend:8081/api/data') // Docker service backend
        .then(res => res.json())
        .then(d => setData(d))
        .catch(err => console.log(err));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Health IoT Dashboard</h1>
          <div className="status-indicator">
            <span className="status-dot"></span>
            Connected
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">💓</div>
            <div className="stat-info">
              <h3>Total Devices</h3>
              <div className="stat-value">{data.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-info">
              <h3>Average ECG</h3>
              <div className="stat-value">
                {data.length ? (data.reduce((sum, d) => sum + d.ecg, 0) / data.length).toFixed(2) : 0}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💡</div>
            <div className="stat-info">
              <h3>Average PPG</h3>
              <div className="stat-value">
                {data.length ? (data.reduce((sum, d) => sum + d.ppg, 0) / data.length).toFixed(2) : 0}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🕹️</div>
            <div className="stat-info">
              <h3>Average ACC</h3>
              <div className="stat-value">
                {data.length ? (data.reduce((sum, d) => sum + d.acc, 0) / data.length).toFixed(2) : 0}
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="table-container">
          <div className="table-header">
            <h2>Sensor Data</h2>
            <span className="table-badge">{data.length} Records</span>
          </div>
          <div className="modern-table">
            <div className="table-row header-row">
              <div className="table-cell">ID</div>
              <div className="table-cell">ECG</div>
              <div className="table-cell">PPG</div>
              <div className="table-cell">ACC</div>
              <div className="table-cell">Status</div>
            </div>
            {data.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📭</div>
                <h3>No Data Available</h3>
              </div>
            ) : (
              data.map((item, i) => (
                <div className="table-row" key={i}>
                  <div className="table-cell sensor-id">{item.id}</div>
                  <div className="table-cell value-with-indicator">
                    <span className="value">{item.ecg}</span>
                    <span className="unit">mV</span>
                  </div>
                  <div className="table-cell value-with-indicator">
                    <span className="value">{item.ppg}</span>
                    <span className="unit">%</span>
                  </div>
                  <div className="table-cell value-with-indicator">
                    <span className="value">{item.acc}</span>
                    <span className="unit">g</span>
                  </div>
                  <div className="table-cell">
                    <span className={`status-badge ${item.ecg > 80 ? 'active' : 'warning'}`}>
                      {item.ecg > 80 ? 'Active' : 'Warning'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        © 2025 Health IoT Dashboard. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
