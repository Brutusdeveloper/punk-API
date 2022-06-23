import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import "./styles.css";

function getNumberOfPages(rowCount, rowsPerPage) {
  return Math.ceil(rowCount / rowsPerPage);
}

function toPages(pages) {
  const results = [];

  for (let i = 1; i < pages; i++) {
    results.push(i);
  }

  return results;
}

const columns = [
  {
    name: "Title",
    selector: (row) => row.name,
    sortable: true
  },
  {
    name: "Date",
    selector: (row) => row.first_brewed,
    sortable: true
  },
  {
    name: "target",
    selector: (row) => row.target_fg,
    sortable: true,
    right: true
  },
  
];

// RDT exposes the following internal pagination properties
const BootyPagination = ({
  rowsPerPage,
  rowCount,
  onChangePage,
  onChangeRowsPerPage, // available but not used here
  currentPage
}) => {
  const handleBackButtonClick = () => {
    onChangePage(currentPage - 1);
  };

  const handleNextButtonClick = () => {
    onChangePage(currentPage + 1);
  };

  const handlePageNumber = (e) => {
    onChangePage(Number(e.target.value));
  };

  const pages = getNumberOfPages(rowCount, rowsPerPage);
  const pageItems = toPages(pages);
  const nextDisabled = currentPage === pageItems.length;
  const previosDisabled = currentPage === 1;



  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            onClick={handleBackButtonClick}
            disabled={previosDisabled}
            aria-disabled={previosDisabled}
            aria-label="previous page"
          >
            Previous
          </button>
        </li>
        {pageItems.map((page) => {
          const className =
            page === currentPage ? "page-item active" : "page-item";

          return (
            <li key={page} className={className}>
              <button
                className="page-link"
                onClick={handlePageNumber}
                value={page}
              >
                {page}
              </button>
            </li>
          );
        })}
        <li className="page-item">
          <button
            className="page-link"
            onClick={handleNextButtonClick}
            disabled={nextDisabled}
            aria-disabled={nextDisabled}
            aria-label="next page"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

const BootyCheckbox = React.forwardRef(({ onClick, ...rest }, ref) => (
  <div className="form-check">
    <input
      htmlFor="booty-check"
      type="checkbox"
      className="form-check-input"
      ref={ref}
      onClick={onClick}
      {...rest}
    />
    <label className="form-check-label" id="booty-check" />
  </div>
));

const MainComponent=()=> {
  const dispatch=useDispatch();

  const StoreData=async()=>{
    // TO GET THE DATA FROM THE PUNK API
    await axios.get('https://api.punkapi.com/v2/beers').then((response)=>{
     
      // UPDATING TO THE REDUX 
        dispatch({type:'PUNKAPI', payload:response.data})
    }).catch(err=>console.log(err))
  }
// COMPONENT DID MOUNT
  useEffect(()=>{
    StoreData();
  }, [])

  const selector = useSelector((state)=>state.punkAPI) || [];
  const [searchText, setSearch] = useState('');
  // WILL FILTER THE RECORDS BASED ON USER SEARCH
  const searchedItems = selector.filter((loop)=>JSON.stringify(loop).toLocaleLowerCase().indexOf(searchText.toLowerCase()) !== -1);
  return (
    <div className="App">
      <div className="searchbox">
        <span className="fw-bold mx-2">Search</span>
          <input onChange={(e)=>setSearch(e.target.value)}/>
      </div>
      {/* USE react-data-table-component NODE MODULE TO LIST THE ROW AND COLUMN */}
      {selector && <div className="card">
        <DataTable
          title="Punk API"
          columns={columns}
          data={searchedItems}
          defaultSortFieldID={1}
          pagination
          paginationComponent={BootyPagination}
          selectableRows
          selectableRowsComponent={BootyCheckbox}
        />
      
      </div>}
    </div>
  );
}
export default MainComponent;

