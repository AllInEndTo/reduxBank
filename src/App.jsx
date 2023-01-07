import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {addCustomerAction, removeCustomerAction} from "./store/customerReducer";
import {addAsyncCashAction, addCashAction, getCashAction} from "./store/cashReducer";
import {fetchCustomers} from "./asyncActions/customers";

function App() {
  const dispatch = useDispatch()
  const cash = useSelector(state => state.cash.cash);
  const customers = useSelector(state => state.customers.customers);

  const addCash = (cash) => {
      dispatch(addCashAction(cash))
  }
  const addAsyncCash = (cash) => {
      dispatch(addAsyncCashAction(cash))
  }

  const getCash = (cash) => {
      dispatch(getCashAction(cash))
  }

  const addCustomer = (name) => {
      const customer = {
          name,
          id: Date.now(),
      }
      dispatch(addCustomerAction(customer))
  }

  const removeCustomer = (customer) => {
      dispatch(removeCustomerAction(customer.id))
  }

  return (
    <div className="app">
        <div style={{fontSize:'3rem', marginBottom:'10'}}>Баланс: {cash}</div>
        <div style={{display:"flex"}}>
            <button className='btn' onClick={() => addAsyncCash(Number(prompt()))}>Пополнить счёт асинхронно [Сломано]</button>
            <button className='btn' onClick={() => addCash(Number(prompt()))}>Пополнить счёт</button>
            <button className='btn' onClick={() => getCash(Number(prompt()))}>Снять со счёта</button>
            <button className='btn' onClick={() => addCustomer(prompt())}>Добавить клиента</button>
            <button className='btn' onClick={() => dispatch(fetchCustomers())}>Получить клиентов из базы</button>
        </div>
        {customers.length > 0 ?
            <div>
                {customers.map(customer =>
                    <div onClick={() => removeCustomer(customer)}
                        style={{fontSize:'2rem',
                        border:'1px solid black',
                        padding:'10px 20px',
                        marginTop:'5px',
                        cursor:'pointer'}}
                    >
                        {customer.name}
                    </div>
                )}
            </div>
            :
            <div style={{fontSize:'2rem', marginTop:'20'}}>
                Клиенты отсутствуют!
            </div>
        }
    </div>
  );
}

export default App;
