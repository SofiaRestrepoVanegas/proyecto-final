import './StatsPanel.css';

function StatsPanel({ stats }) {
  return (

    <div className='stats'>
      <div className='stats__card stats__card--yellow'>
        <p>JUGADORES EN TABLA</p>
        <h2>{stats.total}</h2>
      </div>

      <div className='stats__card'>
        <p>PROMEDIO EDAD</p>
        <h2>{stats.avgAge.toFixed(1)}</h2>
      </div>

      <div className='stats__card'>
        <p>LÍDER</p>
        <h2>{stats.topScorer.name}</h2>
        <span>{stats.topScorer.points} pts</span>
      </div>

      <div className='stats__card'>
        <p>POSICIONES</p>

        {Object.entries(stats.positions).map(
          ([position, count]) => (
            <div key={position}>
              <small>
                {position} ({count})
              </small>

              <div className='bar'>
                <div
                  className='bar__fill'
                  style={{ width: `${count * 20}%` }}
                ></div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default StatsPanel;