import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfitLoss } from "../redux/profitlossSlice"; 
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCartShopping } from "react-icons/fa6";
import { GiBoxUnpacking } from "react-icons/gi";
import { GiProfit } from "react-icons/gi";
import { FaUserGroup } from "react-icons/fa6";
import { MdWarehouse } from "react-icons/md";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { fetchcustomers } from "../redux/customerSlice";
import { fetchsuppliers } from "../redux/supplierSlice";
import { fetchpurchases } from "../redux/purchaseSlice";
import { fetchsales } from "../redux/saleSlice";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useMemo } from "react";


const DashboardSummary = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { report } = useSelector((state) => state.profitloss);
  const { items: customers } = useSelector((state) => state.customers);
  const { items: suppliers}=useSelector((state)=>state.suppliers)
  const {items:purchases}=useSelector((state)=>state.purchases)
  const {items:sales}=useSelector((state)=>state.sales)

  useEffect(() => {
    dispatch(fetchProfitLoss());
    dispatch(fetchcustomers())
    dispatch(fetchsuppliers())
    dispatch(fetchpurchases())
    dispatch(fetchsales())
  }, [dispatch]);

  const totalPurchases = purchases.reduce((acc, p) => acc + (Number(p.grand_total) || 0), 0);
   const topSellingProducts = useMemo(() => {
    const productCount = {};

    sales.forEach((sale) => {
      sale.items?.forEach((item) => {
        const name = item.product_id?.name || "Unknown Product";
        productCount[name] = (productCount[name] || 0) + (Number(item.qty) || 0);
      });
    });

    const sortedProducts = Object.entries(productCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return sortedProducts;
  }, [sales]);

  const goSale=()=>{
    navigate("/sales")
  }
  const goCustomer=()=>{
    navigate("/customers")
  }
  return (
    <div className="container mt-4">
  <div className="row g-3">
    <div className="col-md-4">
    <div className="card mt-0 text-center hovers shadow-lg rounded" style={{ width:"100%",minHeight:190,cursor:"pointer" }} onClick={goSale}>
      <div className="card-body d-flex flex-column align-items-center justify-content-center">
        <span className=" mb-1" style={{ fontSize: 35,color:"#4d6f99ff" }}><FaCartShopping /></span>
        <h5 className="card-title mb-0">TOTAL SALES</h5>
        <p className=" fw-bold mb-0" style={{fontSize:20,color:"#4d6f99ff"}}> ₹{report?.netSales || 0}
        </p>
      </div>
    </div>
    </div>
    <div className="col-md-4">
    <div className="card mt-0 text-center hovers shadow-lg" style={{ width:"100%",minHeight:190 }}>
      <div className="card-body d-flex flex-column align-items-center justify-content-center">
        <span className=" mb-2" style={{ fontSize: 35,color:"#4d6f99ff" }}><GiBoxUnpacking/></span>
        <h5 className="card-title mb-1">COGS</h5>
        <p className=" fw-bold mb-0" style={{fontSize:20,color:"#4d6f99ff"}}> ₹{report?.cogs || 0}
        </p>
      </div>
    </div>
    </div>
    <div className="col-md-4">
    <div className="card mt-0 text-center hovers shadow-lg" style={{ width:"100%",minHeight:190 }}>
      <div className="card-body d-flex flex-column align-items-center justify-content-center">
        <span className=" mb-2" style={{ fontSize: 35,color:'#4d6f99ff' }}><GiProfit /></span>
        <h5 className="card-title mb-1">GROSS PROFIT</h5>
        <p className=" fw-bold mb-0" style={{fontSize:20,color:"#4d6f99ff"}}> ₹{report?.cogs || 0}
        </p>
      </div>
    </div>
    </div>
    <div className="col-md-4">
    <div className="card mt-0 text-center hovers shadow-lg" style={{ width:"100%",minHeight:190 }}>
      <div className="card-body d-flex flex-column align-items-center justify-content-center">
        <span className=" mb-2" style={{ fontSize: 35,color:"#4d6f99ff" }}><BiSolidPurchaseTag /></span>
        <h5 className="card-title mb-1">TOTAL PURCHASES</h5>
        <p className=" fw-bold mb-0" style={{fontSize:20,color:"#4d6f99ff"}}> ₹{totalPurchases.toFixed(2)}
        </p>
      </div>
    </div>
    </div>
    <div className="col-md-4">
    <div className="card mt-0 text-center hovers shadow-lg" style={{ width:"100%",minHeight:190}} onClick={goCustomer}>
      <div className="card-body d-flex flex-column align-items-center justify-content-center">
        <span className=" mb-2" style={{ fontSize: 35,color:"#4d6f99ff" }}><FaUserGroup/></span>
        <h5 className="card-title mb-1">TOTAL CUSTOMERS</h5>
        <p className=" fw-bold mb-0" style={{fontSize:20,color:"#4d6f99ff"}}> ₹{customers?.length || 0}
        </p>
      </div>
    </div>
    </div>
    <div className="col-md-4">
    <div className="card mt-0 text-center hovers shadow-lg" style={{ width:"100%",minHeight:190}}>
      <div className="card-body d-flex flex-column align-items-center justify-content-center">
        <span className=" mb-2" style={{ fontSize: 35,color:"#4d6f99ff" }}><MdWarehouse /></span>
        <h5 className="card-title mb-1">TOTAL SUPPLIERS</h5>
        <p className=" fw-bold mb-0" style={{fontSize:20,color:"#4d6f99ff"}}> ₹{suppliers?.length || 0}
        </p>
      </div>
    </div>
    </div>
  </div>
   <div className="card shadow-lg mt-4">
        <div className="card-body">
          <h5 className="fw-bold mb-3" style={{ color: "#4d6f99ff" }}>
            📊 Top 5 Selling Products
          </h5>
          {topSellingProducts.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topSellingProducts} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4d6f99ff" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted text-center mt-3">No sales data available to display.</p>
          )}
        </div>
      </div>
</div>

  );
};

export default DashboardSummary;
