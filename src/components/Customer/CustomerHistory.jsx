import { Form, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import CardHistory from "./CardHistory";
import { axiosInstance as axios } from "../../config/https";
import handleErrorMessage from "../../utils/handleErrorMessage";
import formatCurrency from "../../utils/currency"

export default function CustomerHistory() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const _id = user._id;

  const [isLoad, setIsLoad] = useState(true);
  const [dataHistory, setDataHistory] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0)

  const [params, setParams] = useState({
    q: "",
    sort_by: "DECS",
    page: 1,
    per_page: 10,
  });

  const [totalData, setTotalData] = useState(0)

  function handleChange(event) {
    const key = event.target.name
    setParams({...params, [key]: event.target.value})
    setIsLoad(true)
  }
  
  function handleChangeSearch (event) {
    const key = event.target.name
    setParams({...params, [key]: event.target.value})

    if (event.target.value.length === 0) setIsLoad (true)
  }

  function handleSubmit (page) {
    page.preventDefault()
    setIsLoad(true)
  }

  function handlePagination  (page)  {
    setParams({...params, page})
    setIsLoad(true)
  };

  useEffect(() => {
    if (isLoad) {
      dispatch({ type: "SET_LOADING", value: true });
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/checkout/${_id}/history`, { params: { ...params } })
        .then(response => {
          setDataHistory(response.data.data.data);
          setTotalExpenses(response.data.data.total_expenses)
          setTotalData(response.data.pagination.total)
        })
        .catch(error => {
          // TOAST ERROR
          const message = error.response?.data?.message;
          toast(handleErrorMessage(message), {
            position: toast.POSITION.TOP_RIGHT,
            type: toast.TYPE.ERROR,
          });
        })
        .finally(() => {
          dispatch({ type: "SET_LOADING", value: false });
        });
      setIsLoad(false);
    }
  }, [isLoad, dispatch, params, _id]);

  return (
    <>
      {/* SORT BY AND SEACRH */}
      <Form 
        className=" mt-md-0 mt-2 mb-4" 
        onSubmit={handleSubmit}>
        <InputGroup >
          <Form.Select
            name="sort_by"
            value={params.sort_by}
            onChange={handleChange}
            style={{ width: "10%" }}
          >
            <option value="ASC">ASC</option>
            <option value="DESC">DESC</option>
          </Form.Select>

          <Form.Control
            name="q"
            value={params.q}
            onChange={handleChangeSearch}
            style={{ width: "90%" }} 
            placeholder="search by code invoices"
          />
        </InputGroup>

      </Form>
      
      {/* CARD HISTORY */}
      
        { 
          !dataHistory.length ? 
        (
        <div className=" d-flex justify-content-center align-items-center" style={{ height: "calc(100vh - 20rem)", overflow: "auto" }}>
          <h5>Data not Found</h5>
        </div>
        ) : (
          <>
          <div 
            style={{ height: "calc(100vh - 20rem)", overflow: "auto" }} 
            className="mb-4">
              {
                dataHistory.map((detail, index) => (
                  <CardHistory 
                    key={`card-history-${index}-${detail.invoice}`} 
                    detail={detail}
                    />
                ))
              }
          </div>

          <div className="d-flex justify-content-between align-items-center">
             <h5>Total Expenses: {formatCurrency(totalExpenses)}</h5>
          
           <div className="d-flex justify-content-end align-items-center">
            <Form.Select 
              name="per_page"
              value={params.per_page}
              onChange={handleChange}
              className=" w-auto me-4 mb-3"
              >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
            </Form.Select>

              <PaginationControl
                page={params.page} 
                total={totalData} 
                limit={params.per_page} 
                between={4}
                ellipsis={2}
                changePage={handlePagination}
              >
              </PaginationControl>
          </div>
          </div>
          </>
        )
         
      }
      

      {/* PAGINATIOn */}
      
    </>
  );
}