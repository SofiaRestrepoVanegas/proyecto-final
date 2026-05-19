import './Pagination.css';

function Pagination({currentPage,totalPages,onPageChange,itemsPerPage,setItemsPerPage,totalItems}) {
  return (

    <div className="pagination">
      <div className="pagination__info">
        Mostrando {
          (currentPage - 1) * itemsPerPage + 1
        }
        -
        {
          Math.min( currentPage * itemsPerPage,totalItems)
        }
        {' '}de {totalItems}
      </div>

      <select
        value={itemsPerPage}
        onChange={(e) => {
          setItemsPerPage(Number(e.target.value));
          onPageChange(1);
        }}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>

      <div className="pagination__buttons">

        <button
          onClick={() => onPageChange(1)}
        >
          Primera
        </button>

        <button
          onClick={() =>
            onPageChange(currentPage - 1)
          }
          disabled={currentPage === 1}
        >
          Anterior
        </button>

        {
          [...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={
                currentPage === index + 1
                  ? 'active'
                  : ''
              }
              onClick={() =>
                onPageChange(index + 1)
              }
            >
              {index + 1}
            </button>
          ))
        }

        <button
          onClick={() =>
            onPageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>

        <button
          onClick={() =>
            onPageChange(totalPages)
          }
        >
          Última
        </button>

      </div>
    </div>
  );
}

export default Pagination;