import 'bootstrap/dist/css/bootstrap.min.css';
import { MdAttachMoney } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { useState } from 'react';
const StockLedger = () => {
    const [stockledger, setStockledger] = useState()
    const [form, setForm] = useState({
        productId: "",
        warehouseId: "",
        txnType: "SALE" | "PURCHASE" | "ADJUSTMENT",
        txnId: "",
        txnDate: "",
        inQty: "",
        outQty: "",
        rate: "",
        balanceQty: "",
    })
      useEffect(() => {
        axios.get("http://localhost:5000/api/stockledger")
            .then(res => setCustomer(res.data))
            .catch(err => console.error(err))
    }, [])
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });

    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:5000/api/stockledger", form);
            setStockledger([...stockledger, res.data])
            setForm({
                name: "",
                phone: "",
                gstin: "",
                email: "",
                billing_address: "",
                shipping_address: "",
                state_code: "",
                credit_limit: "",
                opening_balance: "",
            })
        }
        catch (err) {
            console.error(err.response?.data || err.message);
        }

    }

    return (
        <div className="container mt-4">
            <h3 className="mb-4 fw-bold"><span className='text-success'><MdAttachMoney /></span>CUSTOMER PAYMENT RECEIPT</h3>
            <form className="row g-3">

                <div className="col-md-6">
                    <label className="form-label">Customer <span className="text-danger">*</span></label>
                    <select className="form-select bg-light">
                        <option>-- Select Customer --</option>
                        <option>John</option>
                        <option>Akash Enterprises</option>
                        <option>Mehta Traders</option>
                    </select>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Date <span className="text-danger">*</span></label>
                    <input type="date" className="form-control bg-light" />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Amount (₹) *</label>
                    <input type="number" className="form-control bg-light" placeholder="Enter amount" />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Payment Mode <span className="text-danger">*</span></label>
                    <select className="form-select bg-light">
                        <option>-- Select Mode --</option>
                        <option>Cash</option>
                        <option>UPI</option>
                        <option>Bank Transfer</option>
                    </select>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Reference No (UTR/Cheque)</label>
                    <input type="text" className="form-control bg-light" placeholder="Enter reference no" />
                </div>

                <div className="col-md-6">
                    <label className="form-label bg-light">Invoice to Adjust</label>
                    <select className="form-select">
                        <option>-- Optional --</option>
                        <option>INV-1001</option>
                        <option>INV-1002</option>
                        <option>INV-1003</option>
                    </select>
                </div>

                <div className="col-12">
                    <label className="form-label">Notes</label>
                    <textarea className="form-control bg-light" rows="2" placeholder="Enter notes"></textarea>
                </div>

                <div className="col-12">
                    <button type="button" className="btn btn-primary px-4 d-flex align-center justify-center">
                        <span className="text-warning me-2 d-flex align-items-center"><FaRegSave />
                        </span>Save Payment</button>
                </div>
            </form>
        </div>
    );
}

export default StockLedger;