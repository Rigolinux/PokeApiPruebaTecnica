import { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';

const Pagination = () => {
  const pokemonContext = useContext(PokemonContext);

  if (!pokemonContext) {
    return null;
  }

  const { currentPage, maxOffset, nextPage, prevPage, setPage } = pokemonContext;

  const jumpForward = () => {
    const newPage = Math.min(currentPage + 5, maxOffset);
    setPage(newPage);
  };

  const jumpBackward = () => {
    const newPage = Math.max(currentPage - 5, 1);
    setPage(newPage);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    let startPage = 1;
    let endPage = maxOffset;

    if (maxOffset > 5) {
      startPage = Math.max(currentPage - 2, 1);
      endPage = Math.min(currentPage + 2, maxOffset);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button key={i} className={'mx-3 border-lg border px-3 ' + (currentPage === i ? 'border-cyan-800' : 'border-cyan-400')} onClick={() => setPage(i)} disabled={i === currentPage}>
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <button className='btn m-3 h-12 w-12 text-white bg-slate-800 p-3 rounded-full disabled:bg-slate-600' disabled={currentPage <= 5} onClick={jumpBackward}>
        {'<<'}
      </button>
      <button className='btn m-3 h-12 w-12 text-white bg-slate-800 p-3 rounded-full disabled:bg-slate-600' disabled={currentPage === 1} onClick={prevPage}>
        {'<'}
      </button>
      {renderPagination()}
      <button className='btn m-3 h-12 w-12 text-white bg-slate-800 p-3 rounded-full disabled:bg-slate-600' disabled={currentPage === maxOffset} onClick={nextPage}>
        {'>'}
      </button>
      <button className='btn m-3 h-12 w-12 text-white bg-slate-800 p-3 rounded-full disabled:bg-slate-600' disabled={currentPage + 5 > maxOffset} onClick={jumpForward}>
        {'>>'}
      </button>
    </div>
  );
};

export default Pagination;
