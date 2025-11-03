
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { MdOutlineInventory2, MdEdit, MdDeleteForever } from 'react-icons/md';
import { FaSearch, FaRegSave, FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from '../redux/productSlice';
import { fetchwarehouses } from '../redux/warehouseSlice';
import { addstock, deletestock, fetchstocks, updatestock } from '../redux/stockledgerSlice';
import { setAuthToken } from '../services/userService';

const StockLedger = () => {
  const dispatch = useDispatch();
  const { items: stocks } = useSelector((state) => state.stockss);
  const { items: products } = useSelector((state) => state.products);
  const { items: warehouses } = useSelector((state) => state.warehouses);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "user";
  const token = user?.token;

  const [form, setForm] = useState({
    productId: "",
    warehouseId: "",
    txnType: "",
    txnId: "",
    txnDate: "",
    inQty: "",
    outQty: "",
    rate: "",
    balanceQty: "",
  });

  const [editingStockLedger, setEditingStockLedger] = useState(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) console.error("No user found. Please login.");

    setAuthToken(token);
    dispatch(fetchProducts());
    dispatch(fetchwarehouses());
    dispatch(fetchstocks());
  }, [dispatch, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStockLedger) {
        await dispatch(updatestock({ id: editingStockLedger, updatedData: form })).unwrap();
        console.log("Stock Ledger Updated Successfully");
      } else {
        await dispatch(addstock(form)).unwrap();
        console.log("Stock Ledger Added Successfully");
      }

      setForm({
        productId: "",
        warehouseId: "",
        txnType: "",
        txnId: "",
        txnDate: "",
        inQty: "",
        outQty: "",
        rate: "",
        balanceQty: "",
      });
      setEditingStockLedger(null);
      setShowModal(false);
      dispatch(fetchstocks());
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    dispatch(deletestock(id));
  };

  const handleEdit = (stock) => {
    setEditingStockLedger(stock._id);
    setForm({
      productId: stock.productId || "",
      warehouseId: stock.warehouseId || "",
      txnType: stock.txnType || "",
      txnId: stock.txnId || "",
      txnDate: stock.txnDate ? stock.txnDate.slice(0, 10) : "",
      inQty: stock.inQty || "",
      outQty: stock.outQty || "",
      rate: stock.rate || "",
      balanceQty: stock.balanceQty || "",
    });
    setShowModal(true);
  };

  const openModal = () => {
    setEditingStockLedger(null);
    setForm({
      productId: "",
      warehouseId: "",
      txnType: "",
      txnId: "",
      txnDate: "",
      inQty: "",
      outQty: "",
      rate: "",
      balanceQty: "",
    });
    setShowModal(true);
  };

  const filteredStocks = (stocks || []).filter((s) => {
    const warehouseName =
      s.warehouseId?.store_name ||
      warehouses.find((w) => w._id === s.warehouseId)?.store_name ||
      "";

    const productName =
      s.productId?.name ||
      products.find((p) => p._id === s.productId)?.name ||
      "Unknown";

    return (
      warehouseName.toLowerCase().includes(search.toLowerCase()) ||
      productName.toLowerCase().includes(search.toLowerCase()) ||
      s.txnId?.toLowerCase().includes(search.toLowerCase()) ||
      s.txnDate?.toString().toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="container mt-4">
      <h2 className="mb-4 d-flex align-items-center fs-5">
        <span className="me-2 d-flex align-items-center" style={{ color: "#4d6f99ff" }}>
          <MdOutlineInventory2 size={24} />
        </span>
        <b>STOCK LEDGER</b>
      </h2>

      {["super_admin"].includes(role) && (
        <button className="btn btn-primary mb-3 d-flex align-items-center" onClick={openModal}>
          <FaPlus className="me-2" /> Add Ledger
        </button>
      )}

      {/* ===================== Modal ===================== */}
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        style={{ backgroundColor: showModal ? "rgba(0,0,0,0.5)" : "transparent" }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">
                {editingStockLedger ? "Edit Stock Ledger" : "Add Stock Ledger"}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setShowModal(false)}
              ></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Product *</label>
                    <select
                      className="form-select bg-light"
                      name="productId"
                      value={form.productId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Select Product --</option>
                      {products.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Warehouse *</label>
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
                    <label className="form-label">Type *</label>
                    <select
                      className="form-select bg-light"
                      name="txnType"
                      value={form.txnType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Select Type --</option>
                      <option value="SALE">SALE</option>
                      <option value="PURCHASE">PURCHASE</option>
                      <option value="ADJUSTMENT">ADJUSTMENT</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Transaction ID *</label>
                    <input
                      type="text"
                      className="form-control bg-light"
                      name="txnId"
                      value={form.txnId}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Date *</label>
                    <input
                      type="date"
                      className="form-control bg-light"
                      name="txnDate"
                      value={form.txnDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">In Qty</label>
                    <input
                      type="number"
                      className="form-control bg-light"
                      name="inQty"
                      value={form.inQty}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Out Qty</label>
                    <input
                      type="number"
                      className="form-control bg-light"
                      name="outQty"
                      value={form.outQty}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Rate</label>
                    <input
                      type="number"
                      className="form-control bg-light"
                      name="rate"
                      value={form.rate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Balance Qty</label>
                    <input
                      type="number"
                      className="form-control bg-light"
                      name="balanceQty"
                      value={form.balanceQty}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary d-flex align-items-center">
                  <FaRegSave className="me-2" />
                  {editingStockLedger ? "Update Ledger" : "Save Ledger"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ===================== Table ===================== */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">Stock Ledger List</h5>
          <div className="mt-3 mb-3 input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by warehouse or product"
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
                <th>Product</th>
                <th>Warehouse</th>
                <th>Type</th>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>In Qty</th>
                <th>Out Qty</th>
                <th>Rate</th>
                <th>Balance Qty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStocks.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center">
                    No records found.
                  </td>
                </tr>
              ) : (
                filteredStocks.map((s, index) => (
                  <tr key={index}>
                    <td>{s.productId?.name || "Unknown"}</td>
                    <td>{s.warehouseId?.store_name || "Unknown"}</td>
                    <td>{s.txnType}</td>
                    <td>{s.txnId}</td>
                    <td>{new Date(s.txnDate).toLocaleDateString()}</td>
                    <td>{s.inQty}</td>
                    <td>{s.outQty}</td>
                    <td>{s.rate}</td>
                    <td>{s.balanceQty}</td>
                    <td>
                      {["super_admin"].includes(role) ? (
                        <>
                          <button
                            className="btn btn-sm btn-warning me-2"
                            onClick={() => handleEdit(s)}
                          >
                            <MdEdit /> Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm d-flex align-items-center"
                            onClick={() => handleDelete(s._id)}
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

export default StockLedger;
