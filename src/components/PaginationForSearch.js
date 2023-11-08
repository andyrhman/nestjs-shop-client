// ? https://www.phind.com/search?cache=ykrhjdbv7h91czcw8mtojdxm
const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage, totalPages, start, end, setInputVisibleStart, setInputVisibleEnd, inputVisibleStart, inputVisibleEnd, inputValueStart, inputValueEnd, setInputValueStart, setInputValueEnd }) => {
    return (
        <div className="flex justify-center">
            <div className="join">
                <button className="join-item btn" onClick={() => paginate(Math.max(currentPage - 1, 0))}>«</button>
                {currentPage > 2 && <button className={`join-item btn ${currentPage === 0 ? 'btn-active' : ''}`} onClick={() => paginate(0)}>1</button>}
                {currentPage > 2 && (inputVisibleStart ? (
                    <input className="w-11" type="number" min={1} max={totalPages} value={inputValueStart} onChange={e => setInputValueStart(e.target.value)} onBlur={() => setInputVisibleStart(false)} onKeyUp={(e) => {if (e.key === 'Enter') {paginate(parseInt(inputValueStart) - 1); setInputVisibleStart(false);}}}/> 
                ) : (
                    <button className="join-item btn" onClick={() => setInputVisibleStart(true)}>...</button>
                ))}
                {Array.from({ length: end - start }, (_, i) => (
                    <button key={i} className={`join-item btn ${currentPage === i + start ? 'btn-active' : ''}`} onClick={() => paginate(i + start)}>{i + start + 1}</button>
                ))}
                {currentPage < totalPages - 3 && (inputVisibleEnd ? (
                    <input className="w-11" type="number" min={1} max={totalPages} value={inputValueEnd} onChange={e => setInputValueEnd(e.target.value)} onBlur={() => setInputVisibleEnd(false)} onKeyUp={(e) => {if (e.key === 'Enter') {paginate(parseInt(inputValueEnd) - 1); setInputVisibleEnd(false);}}}/> 
                ) : (
                    <button className="join-item btn" onClick={() => setInputVisibleEnd(true)}>...</button>
                ))}
                {currentPage < totalPages - 3 && <button className={`join-item btn ${currentPage === totalPages - 1 ? 'btn-active' : ''}`} onClick={() => paginate(totalPages - 1)}>{totalPages}</button>}
                <button className="join-item btn" onClick={() => paginate(Math.min(currentPage + 1, totalPages - 1))}>»</button>
            </div>
        </div>
    );
};


export default Pagination