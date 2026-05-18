import './SearchHistory.css';

function SearchHistory({history,onSelectSearch,onClearHistory}) {
  return (

    <div className='history'>
      <div className='history__top'>
        <h3>Historial</h3>

        <button onClick={onClearHistory}>
          Limpiar
        </button>
      </div>

      <div className='history__buttons'>
        {history.map((item, index) => (

          <button
            key={index}
            onClick={() => onSelectSearch(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchHistory;