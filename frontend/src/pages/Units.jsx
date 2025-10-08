
// import React, { useEffect, useState } from 'react'
// import { LiaWeightSolid } from "react-icons/lia";
// import { IoSaveOutline } from "react-icons/io5";
// import axios from 'axios';
// import { FaSearch } from "react-icons/fa";
// import { useDispatch, useSelector } from 'react-redux';

// import { MdDeleteForever } from "react-icons/md";
// import { addUnit, deleteUnit, fetchUnits } from '../redux/unitSlice';
// const Units = () => {
//   const dispatch=useDispatch()
//     const {items:units,status}=useSelector((state)=>state.units)
//   const [form, setForm] = useState({
//     name: "",
//     symbol: ""
//   })

//   useEffect(() => {
//     dispatch(fetchUnits())
//   }, [])

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target
//     setForm({ ...form, [name]: type === "checkbox" ? checked : value })
//   }
  
//   const handleSubmit = async (e) => {
//     e.preventDefault()
    
//      dispatch(addUnit(form))
//       setForm({
//         name: "",
//         symbol: ""
//       })

    
    
//   }

//   const [search, setSearch] = useState("");
//   const filteredUnits = units.filter(
//     (u) =>
//       u.name.toLowerCase().includes(search.toLowerCase()) ||
//       u.symbol.toLowerCase().includes(search.toLowerCase())

//   );

//   const handleDelete = async (id) => {
//    dispatch(deleteUnit(id))
//   };



//   return (
//     <div className="container mt-4 bg-gradient-warning">
//       <h2 className="mb-4 d-flex align-items-center fs-5"><span className="  me-2 d-flex align-items-center" style={{ color: "#4d6f99ff" }}><LiaWeightSolid size={24} /></span>{" "}<b >UNITS MASTER</b></h2>
//       <form className="row g-3" onSubmit={handleSubmit}>
//         <div className="col-md-6">
//           <label className="form-label ">Unit Name<span className="text-danger">*</span></label>
//           <input type="text" className='form-control bg-light' name="name" value={form.name} onChange={handleChange} placeholder='e.g,Kilogram' pattern="[A-Za-z\s]+" required />
//         </div>
//         <div className="col-md-6">
//           <label className="form-label ">Symbol<span className="text-danger">*</span></label>
//           <input type="text" className='form-control bg-light' name="symbol" value={form.symbol} onChange={handleChange} placeholder='e.g,Kg' required />
//         </div>
//         <div className="col-12">
//           <button type="submit" className='btn btn-primary'>
//             <span className="text-warning"><IoSaveOutline /></span>
//             Save Unit</button>

//         </div>
//       </form><br />
//       <div className=" card shadow-sm">
//         <div className="card-body">
//           <h5 className="mb-3">Unit Tree</h5>
//           <div className="mt-4 mb-2 input-group">
//             <input type="text" className="form-control" placeholder="Search Unit name , symbol" value={search} onChange={(e) => setSearch(e.target.value)} />
//             <span className="input-group-text"><FaSearch /></span>
//           </div>
//           <table className="table table-bordered table-striped">
//             <thead className="table-dark">
//               <tr>
//                 <th className="fw-bold">Unit Name</th>
//                 <th className="fw-bold">Unit Symbol</th>
//                 <th className="fw-bold">Actions</th>
//               </tr>
//             </thead>
//             <tbody>{filteredUnits.length === 0 ? (
//               <tr>
//                 <td colSpan="11" className="text-center">
//                   No units found.
//                 </td>
//               </tr>
//             ) : (
//               units.map(u => (
//                 <>
//                   <tr key={u.id}>
//                     <td>{u.name}</td>
//                     <td>{u.symbol}</td>
//                     <td>
//                       <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u._id)}>
//                         <span className="text-warning">
//                           <MdDeleteForever />
//                         </span>
//                         Delete
//                       </button></td>
//                   </tr>
//                 </>
//               )
//               ))}
//             </tbody>
//           </table>

//         </div>
//       </div>
//     </div>
//   )
// }

// export default Units 
