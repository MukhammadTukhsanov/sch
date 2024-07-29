import { useState, useEffect } from 'react';
import { Table, Form, Pagination } from 'react-bootstrap';
import BaseSelect from '../BaseSelect/BaseSelect';
import { machine, statusData } from '../../data/users';
import { fetchGetMa, fetchSearch } from '../../api/index';
import BaseTable from '../BaseTable/BaseTable';

import './BaseSearchPage.css';
import BasePagination from '../BasePagination/BasePagination';

// const shiftFilter = ['F1', 'S2', 'N3']
const statusFilter = statusData;
const machineFilter = machine.map((item, i) => item.name);

function BaseSearchPage({ darkMode, setTableData, setDatLength }) {
  const [isVisible, setIsVisible] = useState(true);
  const [maFilter, setMaFilter] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [toArticle, setToArticle] = useState('');
  const [toMA, setToMA] = useState('');
  const [toProductionsnummer, setToProductionsnummer] = useState('');

  // partnr
  // const [timeFormatSelect, setTimeFormatSelect] = useState('')
  const [statusSelect, setStatusSelect] = useState('');
  const [maSelect, setMaSelect] = useState('');
  const [machineSelect, setMachineSelect] = useState('');

  const handleSelectStatus = (e) => {
    const status = statusFilter.find((item) => item.name === e);
    e !== 'Wählen' ? setStatusSelect(status.id) : setStatusSelect('');
  }

  const handleSelectMa = (e) =>
    e !== 'Wählen' ? setMaSelect(e) : setMaSelect('');

  const handleSelectMachine = (e) =>
    e !== 'Wählen' ? setMachineSelect(e) : setMachineSelect('');

  // if(action === 'schicht') setTimeFormatSelect(e)

  const handleFromDate = (e) => {
    setFromDate(e.target.value);
  };
  const handleToDate = (e) => {
    setToDate(e.target.value);
  };
  const handleToArticle = (e) => {
    setToArticle(e.target.value);
  };
  const handleToMA = (e) => {
    setToMA(e.target.value);
  }
  const handleProductionsnummer = (e) => {
    setToProductionsnummer(e.target.value);
  }

  const [activePage, setActivePage] = useState(0)



  const handleSubmit = () => {
    // if (fromDate || toDate || toArticle || statusSelect || maSelect || toArticle ) {
      fetchSearch(fromDate, toDate, toArticle, statusSelect, maSelect, toProductionsnummer).then(
        (res) => {
          console.log('res', res);
          setSearchData(res?.data);
        }
      );
    // } else {
    //   setSearchData([]);
    // }
  };

  const resetValues = () => {
    setFromDate('');
    setToDate('');
    setToArticle('');
    setStatusSelect('');
    setMaSelect('');
    setMachineSelect('');

    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    });

    setSearchData([]);
  };

  // useEffect(() => {
  //   if (!(fromDate || toDate || toArticle || statusSelect || maSelect || machineSelect)) {
  //     setSearchData([]);
  //   }
  // }, [fromDate, toDate, toArticle , statusSelect, maSelect, machineSelect]);

  // useEffect(() => {
  //   fetchGetMa().then((res) => {
  //     console.log('res', res);
  //     setMaFilter(res.data.ma);
  //   });
  // }, []);

  return (
    <div>
      {isVisible && (
        <Table className="my-4" striped bordered>
          <tbody className={`${darkMode ? 'search_page-dark' : 'search_page'}`}>
            <tr>
              <td>
                <div className="d-flex align-items-center date_picker">
                  <p
                    className={`fs-5 my-0 px-2 py-1 search_page-text fw-bold bg-transparent text-${
                      darkMode ? 'white' : ''
                    }`}
                    style={{ width: '200px' }}
                  >
                    Datum von:
                  </p>
                  <Form.Control
                    onChange={(e) => handleFromDate(e)}
                    size="sm"
                    className="ms-2 w-100"
                    type="date"
                  />
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center date_picker">
                  <p
                    className={`fs-5 my-0 px-2 py-1 search_page-text fw-bold bg-transparent text-${
                      darkMode ? 'white' : ''
                    }`}
                    style={{ width: '200px' }}
                  >
                    Datum bis:
                  </p>
                  <Form.Control
                    onChange={(e) => handleToDate(e)}
                    size="sm"
                    className="ms-2 w-100"
                    type="date"
                  />
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center date_picker justify-content-between">
                  <p
                    className={`fs-5 my-0 px-2 py-1 search_page-text fw-bold bg-transparent text-${
                      darkMode ? 'white' : ''
                    }`}
                    style={{ minWidth: '200px' }}
                  >
                    Artikel Status:
                  </p>
                  <BaseSelect
                    select={(e) => setStatusSelect(
                      [
                        {
                          value: '1',
                          name: 'OK'
                        },
                        {
                          value: '0',
                          name: 'Nicht OK'
                        }
                      ].find((item) => item.name === e).value
                    )}
                    size="sm"
                    options={
                      [
                        {
                          value: '1',
                          name: 'OK'
                        },
                        {
                          value: '0',
                          name: 'Nicht OK'
                        }
                      ].map((item) => item.name)
                    }
                    className="w-100"
                  />
                </div>
              </td>
            </tr>
            <tr>
                {/* <td className='search_page-text' >
                              <div className='d-flex align-items-center' >
                                  <p className={`my-0 me-2 px-2 py-1 fw-bold text-${darkMode ? 'white' : ''}`} >Schicht:</p>
                                  <BaseSelect select={(e) => handleSelect(e, 'schicht')} size='sm' options={shiftFilter} />
                              </div>
                          </td> */}

              <td className="search_page-text">

                <div className="d-flex align-items-center justify-content-between">
                  <p
                    className={`fs-5 my-0 px-2 py-1 fw-bold text-${
                      darkMode ? 'white' : ''
                    }`}
                    style={{ width: '200px' }}
                  >
                    Notiz:
                  </p>
                  <Form.Control
                    onChange={(e) => handleToArticle(e)}
                    size="sm"
                    className="ms-2 w-100"
                    type="text"
                  />
                  {/* <BaseSelect
                    select={(e) => handleSelectStatus(e)}
                    size="sm"
                    options={statusFilter.map((item) => item.name)}
                  /> */}
                </div>
              </td>
              <td className="search_page-text">
                <div className="d-flex align-items-center">
                  <p
                    className={`fs-5 my-0 me-2 px-2 py-1 fw-bold text-${
                      darkMode ? 'white' : ''
                    }`}
                    style={{ width: '200px' }}
                  >
                    MA:
                  </p>
                  {/* <Form.Control
                    onChange={(e) => handleToMA(e)}
                    size="sm"
                    className="ms-2"
                    type="text"
                  /> */}
                  <BaseSelect
                    select={(e) => handleSelectMa(e)}
                    size="sm"
                    options={
                      machine ? machine.map((item) => item.name) : maFilter
                    }
                    className="w-100"
                  />
                </div>
              </td>
              <td className="search_page-text">
                <div className="d-flex align-items-center
                justify-content-between
                ">
                  <p
                    className={`fs-5 my-0 me-2 px-2 py-1 fw-bold text-${
                      darkMode ? 'white' : ''
                    }`}
                  >
                    Produktionsnummer:
                  </p>
                  <Form.Control
                    onChange={(e) => handleProductionsnummer(e)}
                    size="sm"
                    className="ms-2 w-100"
                    type="text"
                  />
                  {/* <BaseSelect
                    select={(e) => handleSelectMachine(e)}
                    size="sm"
                    options={machineFilter}
                  /> */}
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      )}
      {searchData.length > 0 ? (
        <BaseTable
          darkMode={darkMode}
          setDatLength={setDatLength}
          setTableData={setTableData}
          data={searchData.slice(activePage, activePage + 11)}
          setSearchData={setSearchData}
          searchFetch={[
            fromDate,
            toDate,
            toArticle,
            statusSelect,
            maSelect,
            machineSelect,
          ]}
        />
      ) : null}
      <div className="d-flex justify-content-between mb-4">
        {/* Pagination for table */}
        <nav aria-label="...">
          {searchData.length > 0 ?
          <ul class="pagination">
            <li class={`page-item ${activePage > 0 ? "" : "disabled"}`}>
              <a class="page-link" onClick={() => setActivePage(activePage - 10)} tabindex="-1">Zurück</a>
            </li>
            <li class={`page-item ${Math.floor(searchData.length / 10) * 10 <= activePage ? 'disabled' : '' } `}>
              <a class="page-link" onClick={
                () => {
                  console.log("page", Math.floor(searchData.length / 10) * 10)
                  console.log("activePage", activePage)
                  return setActivePage(activePage + 10)
                }
              }>Vor</a>
            </li>
          </ul>: null
          }
        </nav>


        <div className="d-flex justify-content-end mb-4">
          <button
            onClick={resetValues}
            className={`mx-3 fw-bold ${
              darkMode ? 'reset_btn-dark' : 'reset_btn'
            }`}
            disabled={
              !(fromDate || toDate  || toArticle || statusSelect || maSelect || machineSelect)
            }
          >
            Suche zurücksetzen
          </button>
          <button
            onClick={handleSubmit}
            className={`fw-bold ${darkMode ? 'search_btn-dark' : 'search_btn'}`}
            // disabled={
            //   !(fromDate || toDate || toArticle || statusSelect || maSelect || machineSelect)
            // }
          >
            Suchen..
          </button>
        </div>
      </div>
    </div>
  );
}

export default BaseSearchPage;
