import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdPictureAsPdf } from "react-icons/md";
import { FaFileExcel } from "react-icons/fa6";
import { useDispatch,useSelector } from "react-redux";
import { fetchProfitLoss } from "../../redux/profitlossSlice";
import { fetchwarehouses } from "../../redux/warehouseSlice";
import ExportButtons from "../../components/ExportButtons"; // adjust path if needed
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ProfitLossReport = () => {
  const dispatch=useDispatch()
  const {items:profitloss,status,report}=useSelector((state)=>state.profitloss)
  const {items:warehouses}=useSelector((state)=>state.warehouses)
  const [form, setForm] = useState({
    from_date: "",
    to_date: "",
    warehouse_id: "",
  });

  useEffect(()=>{
    dispatch(fetchwarehouses())

  },[dispatch])
  
  const [search, setSearch] = useState("");

  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(fetchProfitLoss(form))
      
  };
  // ✅ Excel Export
const handleExportExcel = () => {
  const worksheetData = filteredreports.map((g) => ({
    "Report Type": g.report_type,
    "From Date": new Date(g.from_date).toLocaleDateString(),
    "To Date": new Date(g.to_date).toLocaleDateString(),
    [g.report_type === "Sales" ? "Customer" : "Supplier"]:
      g.report_type === "Sales"
        ? g.customer_id?.name
        : g.supplier_id?.name,
    HSN: g.hsn,
    State:
      g.report_type === "Sales"
        ? g.customer_id?.state_code
        : g.supplier_id?.state_code,
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "GST Report");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, "GST_Report.xlsx");
};

// ✅ PDF Export
const handleExportPdf = () => {
  const doc = new jsPDF();
  doc.text("GST Report", 14, 15);

  const tableData = filteredreports.map((g) => [
    g.report_type,
    new Date(g.from_date).toLocaleDateString(),
    new Date(g.to_date).toLocaleDateString(),
    g.report_type === "Sales"
      ? g.customer_id?.name
      : g.supplier_id?.name,
    g.hsn,
    g.report_type === "Sales"
      ? g.customer_id?.state_code
      : g.supplier_id?.state_code,
  ]);

  doc.autoTable({
    startY: 25,
    head: [["Report Type", "From Date", "To Date", "Customer/Supplier", "HSN", "State"]],
    body: tableData,
  });

  doc.save("GST_Report.pdf");
};

// ✅ Print
const handlePrint = () => {
  window.print();
};


  return (
    <div className="container mt-4">
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <label className="form-label">From Date</label>
          <input type="date" className="form-control bg-light" name="from_date" value={form.from_date}onChange={handleChange}/>
        </div>
        <div className="col-md-4">
          <label className="form-label">To Date</label>
          <input type="date" className="form-control bg-light" name="to_date" value={form.to_date} onChange={handleChange}/>
        </div>
        <div className="col-md-4">
          <label className="form-label">Warehouse</label>
          <select className="form-select bg-light" name="warehouse_id" value={form.warehouse_id} onChange={handleChange} >
            <option value="">All Warehouses</option>
            {warehouses.map((w) => (<option key={w._id} value={w._id}>{w.store_name}</option> ))}
          </select>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary px-4">
            Generate Report
          </button>
        </div>
      </form>

      {report && (
        <div className="row mt-4">
          <div className="col-md-2">
            <div className="card text-center p-3 bg-light">
              <h6>Net Sales</h6>
              <h5>₹{report.netSales}</h5>
            </div>
          </div>
          <div className="col-md-2">
            <div className="card text-center p-3 bg-light">
              <h6>COGS</h6>
              <h5>₹{report.cogs}</h5>
            </div>
          </div>
          <div className="col-md-2">
            <div className="card text-center p-3 bg-light">
              <h6>Gross Profit</h6>
              <h5>₹{report.grossProfit}</h5>
            </div>
          </div>
          <div className="col-md-2">
            <div className="card text-center p-3 bg-light">
              <h6>Expenses</h6>
              <h5>₹{report.expenses}</h5>
            </div>
          </div>
          <div className="col-md-2">
            <div
              className={`card text-center p-3 ${
                report.netProfit >= 0 ? "bg-success text-white" : "bg-danger text-white"
              }`}
            >
              <h6>Net Profit</h6>
              <h5>₹{report.netProfit}</h5>
            </div>
          </div>
        </div>
      )}

      {report && (
        <div className="card shadow-sm mt-4">
          <div className="card-body">
            <h5 className="mb-3">Profit & Loss Breakdown</h5>
 <ExportButtons
    onExcel={handleExportExcel}
    onPdf={handleExportPdf}
    onPrint={handlePrint}
  />
            <div className="mt-2 mb-2 input-group">
              <input type="text" className="form-control" placeholder="Search category..." value={search} onChange={(e) => setSearch(e.target.value)}/>
              <span className="input-group-text">
                <FaSearch />
              </span>
            </div>

            <table className="table table-bordered table-striped mt-3">
              <thead className="table-dark">
                <tr>
                  <th>Category</th>
                  <th>Amount (₹)</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {(report.details || [])
                  .filter((d) =>
                    d.category.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((d, idx) => (
                    <tr key={idx}>
                      <td>{d.category}</td>
                      <td>{d.amount}</td>
                      <td>{d.notes || "-"}</td>
                    </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-3">
              <button className="btn btn-danger me-2"><MdPictureAsPdf /> Export PDF</button>
              <button className="btn btn-success"><FaFileExcel /> Export Excel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfitLossReport;
