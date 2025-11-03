// import 'bootstrap/dist/css/bootstrap.min.css';
// import { MdDeleteForever } from 'react-icons/md';
// import { GiMoneyStack } from "react-icons/gi";
// import { MdOutlineInventory2 } from "react-icons/md";
// import { FaSearch } from 'react-icons/fa';
// import { FaRegSave } from "react-icons/fa";
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useDispatch, useSelector } from "react-redux";
// import { MdEdit } from "react-icons/md";

// import { fetchwarehouses } from '../redux/warehouseSlice';
// import { addstock, deletestock, fetchstocks } from '../redux/stockledgerSlice';
// import { addexpense, deleteexpense, fetchexpenses, updateexpense } from '../redux/expenseSlice';
// import { setAuthToken } from '../services/userService';
// const Expenses = () => {
//     const dispatch = useDispatch()
//     const { items: expenses, status } = useSelector((state) => state.expenses)

//     const { items: warehouses } = useSelector((state) => state.warehouses)

//     const user=JSON.parse(localStorage.getItem("user"))
//     const role=user?.role
//     const token=user?.token
//     const [form, setForm] = useState({
//         expenseDate:"",
//         warehouseId:"",
//          expenseHead:"",
//          amount:"",
//        notes:"",

//     })
//     useEffect(() => {
//         const user=JSON.parse(localStorage.getItem("user"))
//         if(!user || !user.token)
//             console.error("No user found Please Login")
//         const token=user?.token
//         setAuthToken(token)
//         dispatch(fetchwarehouses())
//         dispatch(fetchexpenses())
//     }, [dispatch])
//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setForm({ ...form, [name]: type === "checkbox" ? checked : value });

//     };
//     const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         if(editingexpense){
//             await dispatch(updateexpense({id:editingexpense,updatedData:form})).unwrap()
//             setEditingexpense(null)
//             console.log("Expense Updated Successfully")
//         }else{
//                 await dispatch(addexpense(form)).unwrap()
//                 console.log("Expense Added Successfully")
//         }
      
//         dispatch(fetchexpenses()); 
//         setForm({
//             expenseDate: "",
//             warehouseId: "",
//             expenseHead: "",
//             amount: "",
//             notes: "",
//         });
//         dispatch(fetchexpenses())
//     } catch (err) {
//         console.error(err.response?.data || err.message);
//     }
// };

//     const [search, setSearch] = useState("")

//     const filteredexpenses = (expenses || []).filter((e) => {
//         const warehousename =
//             e.warehouseId?.store_name || warehouses.find((w) => w._id === e.warehouseId)?.store_name || "";

//         return (
//             warehousename.toLowerCase().includes(search.trim().toLowerCase())  ||
//              e.txnDate?.toString().toLowerCase().includes(search.trim().toLowerCase())
           
//         );
//     });



//     const handleDelete = async (id) => {
//         dispatch(deleteexpense(id))
//     };

//     const [editingexpense,setEditingexpense]=useState(null)

//     const handleEdit=(expense)=>{
//         setEditingexpense(expense._id)
//         setForm({
//             expenseDate:expense.expenseDate || "",
//             warehouseId:expense.warehouseId || "",
//             expenseHead:expense.expenseHead || "",
//             amount:expense.amount || "",
//             notes:expense.notes || "",
//         })
//     }

//     return (
//         <div className="container mt-4">
//             <h2 className="mb-4 d-flex align-items-center fs-5"><span className="  me-2 d-flex align-items-center" style={{ color: "#4d6f99ff" }}><GiMoneyStack size={24} /></span>{" "}<b >EXPENSES</b></h2>
            
//             {["super_admin","admin"].includes(role) && (
//             <form className="row g-3" onSubmit={handleSubmit}>

//                 <div className="col-md-6">
//                     <label className="form-label">Date<span className="text-danger">*</span></label>
//                    <input type="Date" className='form-control bg-light' name="expenseDate" value={form.expenseDate} onChange={handleChange} required/>
//                 </div>

//                 <div className="col-md-6">
//                     <label className="form-label">Warehouse <span className="text-danger">*</span></label>
//                     <select className="form-select bg-light" name="warehouseId" value={form.warehouseId} onChange={handleChange} required>
//                         <option>-- Select Warehouse --</option>
//                         {warehouses.map(w => (<option key={w._id} value={w._id}>{w.store_name}</option>))}

//                     </select>
//                 </div>

//                 <div className="col-md-6">
//                     <label className="form-label">Expense Head<span className="text-danger">*</span></label>
//                     <select className="form-select bg-light" name="expenseHead" value={form.expenseHead} onChange={handleChange} required>
//                         <option>-- Select Type --</option>
//                         <option value="RENT">RENT</option>
//                         <option value="EB BILL">EB BILL</option>
//                         <option value="SALARY">SALARY</option>
//                     </select>
//                 </div>

//                 <div className="col-md-6">
//                     <label className="form-label">Amount <span className="text-danger">*</span></label>
//                     <input type="number" className="form-control bg-light" name='amount' onChange={handleChange} value={form.amount} required />
//                 </div>

//                 <div className="col-md-6">
//                     <label className="form-label">Notes <span className="text-danger">*</span></label>
//                     <input type="text" className="form-control bg-light" name='notes' value={form.notes} onChange={handleChange} required />
//                 </div>

               

//                 <div className="col-12">
//                     <button type="submit" className="btn btn-primary px-4 d-flex align-center justify-center">
//                         <span className="text-warning me-2 d-flex align-items-center"><FaRegSave />
//                         </span>{editingexpense ? "Update Expense" :"Add Expense"}</button>
//                 </div>
//             </form>)}<br />

//             <div className=" card shadow-sm">
//                 <div className="card-body">
//                     <h5 className="mb-3">Expenses Tree</h5>
//                     <div className="mt-4 mb-2 input-group">
//                         <input type="text" className="form-control" placeholder="Search warehouse name" value={search} onChange={(e) => setSearch(e.target.value)} />
//                         <span className="input-group-text"><FaSearch /></span>
//                     </div>
//                     <table className="table table-bordered table-striped">
//                         <thead className="table-dark">
//                             <tr>
//                                 <th className="fw-bold">Date</th>
//                                 <th className="fw-bold">Warehouse</th>
//                                 <th className="fw-bold">Expense Head</th>
//                                 <th className="fw-bold">Amount</th>
//                                 <th className="fw-bold">Notes</th>
                               
//                                 <th className="fw-bold">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filteredexpenses.length === 0 ? (
//                                 <tr>
//                                     <td colSpan="9" className="text-center">No expenses found.</td>
//                                 </tr>
//                             ) : (
//                                 filteredexpenses.map((e, index) => (
//                                     <tr key={index}>
//                                         <td>{new Date(e.expenseDate).toLocaleDateString()}</td>
//                                          <td>{e.warehouseId?.store_name || "Unknown"}</td>
//                                         <td>{e.expenseHead}</td>
//                                         <td>{e.amount}</td>
                                        
//                                         <td>{e.notes}</td>
                                        
//                                         <td>
//                                             {["super_admin"].includes(role) ? (
//                                                 <>
//                                                 <button className='btn btn-sm btn-warning' onClick={()=>handleEdit(e)}><MdEdit/>Edit</button>
//                                             <button
//                                                 className="btn btn-danger btn-sm px-4 d-flex align-items-center justify-content-center"
//                                                 onClick={() => handleDelete(e._id)}
//                                             ><span className="text-warning me-2 d-flex align-items-center">
//                                                                                                                                             <MdDeleteForever />
//                                                                                                                                           </span>
//                                                 Delete
//                                             </button></>):(
//                                                     <button className="btn btn-secondary btn-sm" disabled>
//                                                         View Only
//                                                     </button>
//                                             )}
//                                         </td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>


//                     </table></div></div>

//         </div>
//     );
// }

// export default Expenses
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdDeleteForever, MdEdit, MdClose, MdAdd } from 'react-icons/md';
import { GiMoneyStack } from "react-icons/gi";
import { FaSearch, FaRegSave } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { fetchwarehouses } from '../redux/warehouseSlice';
import { addexpense, deleteexpense, fetchexpenses, updateexpense } from '../redux/expenseSlice';
import { setAuthToken } from '../services/userService';

const Expenses = () => {
  const dispatch = useDispatch();
  const { items: expenses, status } = useSelector((state) => state.expenses);
  const { items: warehouses } = useSelector((state) => state.warehouses);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  const token = user?.token;

  const [form, setForm] = useState({
    expenseDate: "",
    warehouseId: "",
    expenseHead: "",
    amount: "",
    notes: "",
  });

  const [editingExpense, setEditingExpense] = useState(null);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) console.error("No user found. Please login.");
    setAuthToken(user?.token);
    dispatch(fetchwarehouses());
    dispatch(fetchexpenses());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingExpense) {
        await dispatch(updateexpense({ id: editingExpense, updatedData: form })).unwrap();
        console.log("Expense Updated Successfully");
      } else {
        await dispatch(addexpense(form)).unwrap();
        console.log("Expense Added Successfully");
      }

      // Reset form
      setForm({
        expenseDate: "",
        warehouseId: "",
        expenseHead: "",
        amount: "",
        notes: "",
      });
      setEditingExpense(null);
      setShowExpenseForm(false);
      dispatch(fetchexpenses());
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense._id);
    setForm({
      expenseDate: expense.expenseDate || "",
      warehouseId: expense.warehouseId || "",
      expenseHead: expense.expenseHead || "",
      amount: expense.amount || "",
      notes: expense.notes || "",
    });
    setShowExpenseForm(true);
  };

  const handleDelete = async (id) => {
    dispatch(deleteexpense(id));
  };

  const handleCloseForm = () => {
    setShowExpenseForm(false);
    setEditingExpense(null);
    setForm({
      expenseDate: "",
      warehouseId: "",
      expenseHead: "",
      amount: "",
      notes: "",
    });
  };

  const filteredExpenses = (expenses || []).filter((e) => {
    const warehousename =
      e.warehouseId?.store_name ||
      warehouses.find((w) => w._id === e.warehouseId)?.store_name ||
      "";
    return (
      warehousename.toLowerCase().includes(search.trim().toLowerCase()) ||
      e.txnDate?.toString().toLowerCase().includes(search.trim().toLowerCase())
    );
  });

  return (
    <div className="container mt-4">
      <h2 className="mb-4 d-flex align-items-center fs-5">
        <span className="me-2 d-flex align-items-center" style={{ color: "#4d6f99ff" }}>
          <GiMoneyStack size={24} />
        </span>
        <b>EXPENSES</b>
      </h2>

      {/* Action Buttons */}
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-start">
          {["super_admin", "admin"].includes(role) && (
            <button
              className="btn btn-primary d-flex align-items-center"
              onClick={() => setShowExpenseForm(true)}
            >
              <MdAdd className="me-2" /> Add Expense
            </button>
          )}
        </div>
      </div>

      {/* Expense Modal */}
      {showExpenseForm && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">{editingExpense ? "Edit Expense" : "Add Expense"}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={handleCloseForm}></button>
              </div>
              <div className="modal-body" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-md-6">
                    <label className="form-label">Date <span className="text-danger">*</span></label>
                    <input
                      type="date"
                      className="form-control bg-light"
                      name="expenseDate"
                      value={form.expenseDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Warehouse <span className="text-danger">*</span></label>
                    <select
                      className="form-select bg-light"
                      name="warehouseId"
                      value={form.warehouseId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Select Warehouse --</option>
                      {warehouses.map((w) => (
                        <option key={w._id} value={w._id}>
                          {w.store_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Expense Head <span className="text-danger">*</span></label>
                    <select
                      className="form-select bg-light"
                      name="expenseHead"
                      value={form.expenseHead}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Select Type --</option>
                      <option value="RENT">RENT</option>
                      <option value="EB BILL">EB BILL</option>
                      <option value="SALARY">SALARY</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Amount <span className="text-danger">*</span></label>
                    <input
                      type="number"
                      className="form-control bg-light"
                      name="amount"
                      value={form.amount}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label">Notes <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control bg-light"
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12 d-flex justify-content-end gap-2 mt-3">
                    <button type="submit" className="btn btn-primary d-flex align-items-center">
                      <FaRegSave className="me-2 text-warning" />
                      {editingExpense ? "Update Expense" : "Add Expense"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary d-flex align-items-center"
                      onClick={handleCloseForm}
                    >
                      <MdClose className="me-2" /> Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expense Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">Expenses List</h5>
          <div className="mt-4 mb-2 input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search warehouse name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="input-group-text">
              <FaSearch />
            </span>
          </div>
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Date</th>
                <th>Warehouse</th>
                <th>Expense Head</th>
                <th>Amount</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">No expenses found.</td>
                </tr>
              ) : (
                filteredExpenses.map((e, index) => (
                  <tr key={index}>
                    <td>{new Date(e.expenseDate).toLocaleDateString()}</td>
                    <td>{e.warehouseId?.store_name || "Unknown"}</td>
                    <td>{e.expenseHead}</td>
                    <td>{e.amount}</td>
                    <td>{e.notes}</td>
                    <td>
                      {["super_admin"].includes(role) ? (
                        <>
                          <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(e)}>
                            <MdEdit /> Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm d-flex align-items-center"
                            onClick={() => handleDelete(e._id)}
                          >
                            <MdDeleteForever className="me-1" /> Delete
                          </button>
                        </>
                      ) : (
                        <button className="btn btn-secondary btn-sm" disabled>
                          View Only
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
