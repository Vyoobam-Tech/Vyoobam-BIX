// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {fetchProducts,addProduct,deleteProduct,} from "../redux/productSlice";
// import { MdProductionQuantityLimits, MdDeleteForever } from "react-icons/md";
// import { FaCartPlus, FaSearch } from "react-icons/fa";
// import axios from "axios";
// import { fetchCategories } from "../redux/categorySlice";
// import { variants } from "../data/variants";
// import { setAuthToken } from "../services/userService";
// import { updateProduct } from "../redux/productSlice";
// import { MdEdit } from "react-icons/md";

// const Product = () => {
//   const dispatch=useDispatch();
//   const {items:products,status}=useSelector((state) => state.products);
//   const {items:categories}=useSelector((state) => state.categories);

//   const user=JSON.parse(localStorage.getItem("user"));
//   const role=user?.role || "user";
//   const token=user?.token;

//   const [form, setForm] = useState({
//     name: "",
//     sku: "",
//     category_id: "",
//     category_name:"",
//     brand_name: "",
//     unit_id: "Kg",
//     hsn_code: "",
//     tax_rate_id: "18%",
//     mrp: "",
//     purchase_price: "",
//     sale_price: "",
//     min_stock: "",
//     barcode: "",
//     is_batch_tracked: false,
//     is_serial_tracked: false,
//     status: false,
//   });
//   const [subcategories, setSubcategories] = useState([]);

//   const [brands, setBrands] = useState([]);
//   const [search, setSearch] = useState("");
//   useEffect(() => {
//     if (!user || !user.token) {
//       console.error("No token found in user object. Please login again.");
//       return;
//     }
//     setAuthToken(token);
//     dispatch(fetchCategories());
//     dispatch(fetchProducts());
//   }, [dispatch]);
//   useEffect(() => {
//     const checkProduct=async () => {
//       const name=form.name.trim();
//       if (!name) {
//         setForm((prev) => ({ ...prev, status: false }));
//         return;
//       }
//       try {
//         const res=await axios.get(
//           `http://localhost:5000/api/products/check-exists?name=${encodeURIComponent(name)}`
//         );
//         setForm((prev)=>({ ...prev, status: res.data.exists }));
//       } catch (err) {
//         console.error("Error checking product:", err);
//         setForm((prev) => ({ ...prev, status: false }));
//       }
//     };
// const delayDebounce=setTimeout(checkProduct, 400);
//     return () => clearTimeout(delayDebounce);
//   }, [form.name]);
//   const handleChange = async(e) => {
//     const { name, value, type, checked } = e.target;
//     let updatedForm = { ...form, [name]: type === "checkbox" ? checked : value };
// if (name === "category_id") {
//   updatedForm.brand_name = "";
//   updatedForm.subcategory = "";
//   setBrands([]);
//   setSubcategories([]);

//   // if (value) {
//   //   try {
//   //     const res = await axios.get(
//   //       `http://localhost:5000/api/categories/subcategories/id/${value}`,
//   //       { headers: { Authorization: `Bearer ${token}` } }
//   //     );
//   //     setSubcategories(res.data.subcategories || []);
//   //     setBrands(res.data.brands || []);
//   //   } catch (err) {
//   //     console.error("Error fetching subcategories/brands:", err);
//   //   }
//   // }
// }

//  setForm(updatedForm);
//   };
//   const handleSubmit=async (e) => {
//     e.preventDefault();
//     try {
//       if(editingProduct) {
//         await dispatch(updateProduct({id:editingProduct,updatedData:form})).unwrap()
//         setEditingProduct(null)
//         console.log("Product Update Successfully")
//       }else{
//         await dispatch(addProduct(form)).unwrap();
//         console.log("Product added Successfully")
//       }
      
//       setForm({
//         name: "",
//         sku: "",
//         category_id: "",
//         subcategory:"",
//         brand_name: "",
//         unit_id: "Kg",
//         hsn_code: "",
//         tax_rate_id: "18%",
//         mrp: "",
//         purchase_price: "",
//         sale_price: "",
//         min_stock: "",
//         barcode: "",
//         is_batch_tracked: false,
//         is_serial_tracked: false,
//         status: true,
//       });
//       dispatch(fetchProducts());
  
//     } catch (err) {
//       console.error("Error adding product:", err.response?.data || err.message);
//     }
//   };

//   const handleCategoryChange=async (e) => {
//     const selectedCategory=e.target.value;
//     setForm({ ...form,category:selectedCategory,subcategory: "",brand:""});
// if (selectedCategory) {
//       try {
//         const res=await axios.get(`/api/categories/subcategories/${selectedCategory}`);
//         setSubcategories(res.data.subcategories);
//         setBrands(res.data.brands);
//       } catch (err) {
//         console.error(err);
//         setSubcategories([]);
//         setBrands([]);
//       }
//     } else {
//       setSubcategories([]);
//       setBrands([]);
//     }
//   };

//   const [editingProduct, setEditingProduct] = useState(null);

//   const handleEdit = (product) => {
//   setEditingProduct(product._id);
//   setForm({
//     name: product.name || "",
//     sku: product.sku || "",
//     category_id: product.category_id?._id || "",
//     brand_name: product.brand_name || "",
//     unit_id: product.unit_id || "Kg",
//     hsn_code: product.hsn_code || "",
//     tax_rate_id: product.tax_rate_id || "18%",
//     mrp: product.mrp || "",
//     purchase_price: product.purchase_price || "",
//     sale_price: product.sale_price || "",
//     min_stock: product.min_stock || "",
//     barcode: product.barcode || "",
//     is_batch_tracked: product.is_batch_tracked || false,
//     is_serial_tracked: product.is_serial_tracked || false,
//     status: product.status || false,
//   });
// };

//  const handleDelete=(id) => {
//     dispatch(deleteProduct(id));
//   };
// const filteredProducts = products.filter(
//     (p) =>
//       p.name.toLowerCase().includes(search.toLowerCase()) ||
//       p.sku.toLowerCase().includes(search.toLowerCase()) ||
//       (p.category_id?.name || p.category_id || "").toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="container mt-4 bg-gradient-warning">
//       <h2 className="mb-4 d-flex align-items-center fs-5"><span className="me-2 d-flex align-items-center" style={{ color: "#4d6f99ff" }} ><MdProductionQuantityLimits size={24} /> </span><b>PRODUCT MASTER</b></h2>
//       {["super_admin", "admin"].includes(role) && (
//         <form className="row g-3" onSubmit={handleSubmit}>
//           <div className="col-md-6">
//             <label className="form-label"> Product Name <span className="text-danger">*</span></label>
//             <input type="text" className="form-control bg-light"  name="name" value={form.name}onChange={handleChange} required />
//           </div>

//           <div className="col-md-6">
//             <label className="form-label"> SKU / Item Code <span className="text-danger">*</span> </label>
//             <input type="text" className="form-control bg-light" name="sku" value={form.sku} onChange={handleChange} required/>
//           </div>

//           <div className="col-md-6">
//             <label className="form-label"> Category <span className="text-danger">*</span></label>
//             <select className="form-select bg-light" name="category_id" value={form.category_name} onChange={handleChange} required >
//               <option value="">Select Category</option>{categories.map((cat) => (<option key={cat._id} value={cat._id}>{cat.name} </option>
//               ))}
//             </select>
//           </div>

//           {subcategories.length > 0 && (
//           <div className="col-md-4">
//             <label className="form-label">Subcategory</label>
//             <select name="subcategory" className="form-control" value={form.subcategory} onChange={handleChange} required>
//               <option value="">-- Select Subcategory --</option>{subcategories.map((sub, i) => ( <option key={i} value={sub}>{sub}</option>))}</select>
//           </div>
//         )}

//           <div className="col-md-6">
//             <label className="form-label">Brand (Optional)</label>
//             <select className="form-select bg-light" name="brand_name" value={form.brand_name} onChange={handleChange}>
//               <option value="">Select Brand</option>{brands.map((b, idx) => (<option key={idx} value={b}>  {b}</option> ))}
//             </select>
//           </div>

//           <div className="col-md-6">
//             <label className="form-label"> Variant <span className="text-danger">*</span>
//             </label>
//             <select className="form-select bg-light" name="variant" value={form.variant}  onChange={handleChange}>
//               <option value="">Select Variant</option>
//               {Object.keys(variants).map((group) => (<optgroup key={group} label={group.replace(/([A-Z])/g, " $1")}>
//                   {variants[group].map((v) => (<option key={v.value} value={v.value}>{v.label}</option>))}
//                 </optgroup>
//               ))}
//             </select>
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">HSN Code (Optional)</label>
//             <input type="number" className="form-control bg-light"  name="hsn_code" value={form.hsn_code} onChange={handleChange}/>
//           </div>

//           <div className="col-md-6">
//             <label className="form-label"> Tax Rate <span className="text-danger">*</span></label>
//             <select className="form-select bg-light" name="tax_rate_id" value={form.tax_rate_id} onChange={handleChange} required >
//               <option>0%</option>
//               <option>5%</option>
//               <option>12%</option>
//               <option>18%</option>
//               <option>28%</option>
//             </select>
//           </div>

//           <div className="col-md-6">
//             <label className="form-label"> MRP <span className="text-danger">*</span></label>
//             <input type="number" step="0.01" className="form-control bg-light" name="mrp" value={form.mrp} onChange={handleChange} required />
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Purchase Price <span className="text-danger">*</span></label>
//             <input type="number" className="form-control bg-light" name="purchase_price"  value={form.purchase_price} onChange={handleChange} required/>
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Sale Price <span className="text-danger">*</span></label>
//             <input type="number" step="0.01" className="form-control bg-light" name="sale_price" value={form.sale_price} onChange={handleChange} required/>
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Min Stock / Reorder Level <span className="text-danger">*</span></label>
//             <input type="number" className="form-control bg-light" name="min_stock" value={form.min_stock} onChange={handleChange} />
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Barcode (Optional)</label>
//             <input  type="text" className="form-control bg-light" name="barcode" value={form.barcode} onChange={handleChange} />
//           </div>

//           <div className="col-md-4 form-check">
//             <input type="checkbox" className="form-check-input" name="is_batch_tracked" checked={form.is_batch_tracked} onChange={handleChange}/>
//             <label className="form-check-label">Batch Tracking</label>
//           </div>

//           <div className="col-md-4 form-check">
//             <input type="checkbox" className="form-check-input" name="is_serial_tracked" checked={form.is_serial_tracked} onChange={handleChange} />
//             <label className="form-check-label">Serial Tracking</label>
//           </div>

//           <div className="col-md-4 form-check">
//             <input type="checkbox" className="form-check-input" name="status" checked={form.status} onChange={handleChange}/>
//             <label className="form-check-label">Active Status</label>
//           </div>

//           <div className="col-12">
//             <button
//               type="submit"
//               className="btn btn-primary px-4 d-flex align-items-center justify-content-center"
//             >
//               <span className="text-warning me-2 d-flex align-items-center">
//                 <FaCartPlus />
//               </span>
//               {editingProduct ? "Update Product" : "Add Product"}
//             </button>
//           </div>
//         </form>
//       )}

//       <br />

   
//       <div className="card shadow-sm">
//         <div className="card-body">
//           <h5 className="mb-3">Product Tree</h5>
//           <div className="mt-4 mb-2 input-group">
//             <input type="text" className="form-control"  placeholder="Search by Name, SKU, Category" value={search} onChange={(e) => setSearch(e.target.value)}/>
//             <span className="input-group-text">
//               <FaSearch />
//             </span>
//           </div>

//           {status === "loading" ? (
//             <p>Loading...</p>
//           ) : (
//             <table className="table table-bordered table-striped">
//               <thead className="table-dark">
//                 <tr>
//                   <th>SKU</th>
//                   <th>Name</th>
//                   <th>Category</th>
//                   <th>Brand</th>
//                   <th>UoM</th>
//                   <th>Tax</th>
//                   <th>MRP</th>
//                   <th>Purchase</th>
//                   <th>Sale</th>
//                   {/* <th>Status</th> */}
//                   <th>Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filteredProducts.length === 0 ? (
//                   <tr>
//                     <td colSpan="11" className="text-center">
//                       No products found.
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredProducts.map((p) => (
//                     <tr key={p._id}>
//                       <td>{p.sku}</td>
//                       <td>{p.name}</td>
//                       <td>{p.category_id?.name || p.category_id || ""}</td>
//                       <td>{p.brand_name || ""}</td>
//                       <td>{p.unit_id}</td>
//                       <td>{p.tax_rate_id}</td>
//                       <td>{p.mrp}</td>
//                       <td>{p.purchase_price}</td>
//                       <td>{p.sale_price}</td>
//                       {/* <td
//                         className={p.status ? "text-success" : "text-danger"}
//                       >
//                         {p.status ? "Active" : "Inactive"}
//                       </td> */}
//                       <td>
//                         {["super_admin", "admin"].includes(role) ? (
//                           <>
//                           <button
//         className="btn btn-warning btn-sm me-2"
//         onClick={() => handleEdit(p)}
//       > <MdEdit />
//         Edit
//       </button>
//                           <button
//                             className="btn btn-danger btn-sm"
//                             onClick={() => handleDelete(p._id)}
//                           >
//                             <MdDeleteForever /> Delete
//                           </button>
//                           </>
//                         ) : (
//                           <button className="btn btn-secondary btn-sm" disabled>
//                             View Only
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Product;


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addProduct, deleteProduct, updateProduct } from "../redux/productSlice";
import { MdProductionQuantityLimits, MdDeleteForever } from "react-icons/md";
import { FaCartPlus, FaSearch } from "react-icons/fa";
import axios from "axios";
import { fetchCategories } from "../redux/categorySlice";
import { variants } from "../data/variants";
import { setAuthToken } from "../services/userService";
import { MdEdit } from "react-icons/md";

const Product = () => {
  const dispatch = useDispatch();
  const { items: products, status } = useSelector((state) => state.products);
  const { items: categories } = useSelector((state) => state.categories);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "user";
  const token = user?.token;

  const [form, setForm] = useState({
    name: "",
    sku: "",
    category_id: "",
    category_name: "", // Add this to track category name
    brand_name: "",
    unit_id: "Kg",
    hsn_code: "",
    tax_rate_id: "18%",
    mrp: "",
    purchase_price: "",
    sale_price: "",
    min_stock: "",
    barcode: "",
    is_batch_tracked: false,
    is_serial_tracked: false,
    status: false,
  });

  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [uniqueCategories, setUniqueCategories] = useState([]);

  // Get unique categories
  useEffect(() => {
    if (categories.length > 0) {
      const unique = categories.reduce((acc, category) => {
        if (!acc.find(item => item.name === category.name)) {
          acc.push({
            _id: category._id,
            name: category.name,
            subcategories: [], // We'll populate this dynamically
            brands: category.brands || []
          });
        }
        return acc;
      }, []);
      setUniqueCategories(unique);
    }
  }, [categories]);

  useEffect(() => {
    if (!user || !user.token) {
      console.error("No token found in user object. Please login again.");
      return;
    }
    setAuthToken(token);
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  // Check product existence
  useEffect(() => {
    const checkProduct = async () => {
      const name = form.name.trim();
      if (!name) {
        setForm((prev) => ({ ...prev, status: false }));
        return;
      }
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/check-exists?name=${encodeURIComponent(name)}`
        );
        setForm((prev) => ({ ...prev, status: res.data.exists }));
      } catch (err) {
        console.error("Error checking product:", err);
        setForm((prev) => ({ ...prev, status: false }));
      }
    };

    const delayDebounce = setTimeout(checkProduct, 400);
    return () => clearTimeout(delayDebounce);
  }, [form.name]);

  // Handle category change - dynamically load subcategories and brands
  const handleCategoryChange = async (e) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = uniqueCategories.find(cat => cat._id === selectedCategoryId);
    
    if (selectedCategory) {
      // Get all subcategories for this category name
      const categorySubcategories = categories
        .filter(cat => cat.name === selectedCategory.name)
        .map(cat => cat.subcategory)
        .filter(sub => sub && sub.trim() !== ""); // Remove empty subcategories

      // Get all brands for this category name
      const categoryBrands = categories
        .filter(cat => cat.name === selectedCategory.name)
        .flatMap(cat => cat.brands || [])
        .filter(brand => brand && brand.trim() !== ""); // Remove empty brands

      // Remove duplicates
      const uniqueSubcategories = [...new Set(categorySubcategories)];
      const uniqueBrands = [...new Set(categoryBrands)];

      setSubcategories(uniqueSubcategories);
      setBrands(uniqueBrands);

      setForm({
        ...form,
        category_id: selectedCategoryId,
        category_name: selectedCategory.name,
        subcategory: "",
        brand_name: ""
      });
    } else {
      setSubcategories([]);
      setBrands([]);
      setForm({
        ...form,
        category_id: selectedCategoryId,
        category_name: "",
        subcategory: "",
        brand_name: ""
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await dispatch(updateProduct({ id: editingProduct, updatedData: form })).unwrap();
        setEditingProduct(null);
        console.log("Product Updated Successfully");
      } else {
        await dispatch(addProduct(form)).unwrap();
        console.log("Product added Successfully");
      }

      setForm({
        name: "",
        sku: "",
        category_id: "",
        category_name: "",
        brand_name: "",
        unit_id: "Kg",
        hsn_code: "",
        tax_rate_id: "18%",
        mrp: "",
        purchase_price: "",
        sale_price: "",
        min_stock: "",
        barcode: "",
        is_batch_tracked: false,
        is_serial_tracked: false,
        status: true,
      });
      
      setSubcategories([]);
      setBrands([]);
      dispatch(fetchProducts());
    } catch (err) {
      console.error("Error adding product:", err.response?.data || err.message);
    }
  };

  const [editingProduct, setEditingProduct] = useState(null);

  const handleEdit = (product) => {
    setEditingProduct(product._id);
    
    // When editing, we need to populate the subcategories and brands for the selected category
    const productCategory = categories.find(cat => cat._id === product.category_id);
    if (productCategory) {
      const categorySubcategories = categories
        .filter(cat => cat.name === productCategory.name)
        .map(cat => cat.subcategory)
        .filter(sub => sub && sub.trim() !== "");

      const categoryBrands = categories
        .filter(cat => cat.name === productCategory.name)
        .flatMap(cat => cat.brands || [])
        .filter(brand => brand && brand.trim() !== "");

      setSubcategories([...new Set(categorySubcategories)]);
      setBrands([...new Set(categoryBrands)]);
    }

    setForm({
      name: product.name || "",
      sku: product.sku || "",
      category_id: product.category_id?._id || product.category_id || "",
      category_name: productCategory?.name || "",
      brand_name: product.brand_name || "",
      unit_id: product.unit_id || "Kg",
      hsn_code: product.hsn_code || "",
      tax_rate_id: product.tax_rate_id || "18%",
      mrp: product.mrp || "",
      purchase_price: product.purchase_price || "",
      sale_price: product.sale_price || "",
      min_stock: product.min_stock || "",
      barcode: product.barcode || "",
      is_batch_tracked: product.is_batch_tracked || false,
      is_serial_tracked: product.is_serial_tracked || false,
      status: product.status || false,
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      (p.category_id?.name || p.category_id || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4 bg-gradient-warning">
      <h2 className="mb-4 d-flex align-items-center fs-5">
        <span className="me-2 d-flex align-items-center" style={{ color: "#4d6f99ff" }}>
          <MdProductionQuantityLimits size={24} />
        </span>
        <b>PRODUCT MASTER</b>
      </h2>
      
      {["super_admin", "admin"].includes(role) && (
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Product Name <span className="text-danger">*</span></label>
            <input 
              type="text" 
              className="form-control bg-light" 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">SKU / Item Code <span className="text-danger">*</span></label>
            <input 
              type="text" 
              className="form-control bg-light" 
              name="sku" 
              value={form.sku} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Category <span className="text-danger">*</span></label>
            <select 
              className="form-select bg-light" 
              name="category_id" 
              value={form.category_id} 
              onChange={handleCategoryChange} 
              required
            >
              <option value="">Select Category</option>
              {uniqueCategories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {subcategories.length > 0 && (
            <div className="col-md-6">
              <label className="form-label">Subcategory</label>
              <select 
                className="form-select bg-light" 
                name="subcategory" 
                value={form.subcategory} 
                onChange={handleChange}
              >
                <option value="">-- Select Subcategory --</option>
                {subcategories.map((sub, index) => (
                  <option key={index} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          )}

          {brands.length > 0 && (
            <div className="col-md-6">
              <label className="form-label">Brand (Optional)</label>
              <select 
                className="form-select bg-light" 
                name="brand_name" 
                value={form.brand_name} 
                onChange={handleChange}
              >
                <option value="">Select Brand</option>
                {brands.map((brand, index) => (
                  <option key={index} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Rest of your form fields remain the same */}
          <div className="col-md-6">
            <label className="form-label">Variant <span className="text-danger">*</span></label>
            <select className="form-select bg-light" name="variant" value={form.variant} onChange={handleChange}>
              <option value="">Select Variant</option>
              {Object.keys(variants).map((group) => (
                <optgroup key={group} label={group.replace(/([A-Z])/g, " $1")}>
                  {variants[group].map((v) => (
                    <option key={v.value} value={v.value}>{v.label}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">HSN Code (Optional)</label>
            <input 
              type="number" 
              className="form-control bg-light" 
              name="hsn_code" 
              value={form.hsn_code} 
              onChange={handleChange} 
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Tax Rate <span className="text-danger">*</span></label>
            <select 
              className="form-select bg-light" 
              name="tax_rate_id" 
              value={form.tax_rate_id} 
              onChange={handleChange} 
              required
            >
              <option>0%</option>
              <option>5%</option>
              <option>12%</option>
              <option>18%</option>
              <option>28%</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">MRP <span className="text-danger">*</span></label>
            <input 
              type="number" 
              step="0.01" 
              className="form-control bg-light" 
              name="mrp" 
              value={form.mrp} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Purchase Price <span className="text-danger">*</span></label>
            <input 
              type="number" 
              className="form-control bg-light" 
              name="purchase_price" 
              value={form.purchase_price} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Sale Price <span className="text-danger">*</span></label>
            <input 
              type="number" 
              step="0.01" 
              className="form-control bg-light" 
              name="sale_price" 
              value={form.sale_price} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Min Stock / Reorder Level</label>
            <input 
              type="number" 
              className="form-control bg-light" 
              name="min_stock" 
              value={form.min_stock} 
              onChange={handleChange} 
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Barcode (Optional)</label>
            <input 
              type="text" 
              className="form-control bg-light" 
              name="barcode" 
              value={form.barcode} 
              onChange={handleChange} 
            />
          </div>

          <div className="col-md-4 form-check">
            <input 
              type="checkbox" 
              className="form-check-input" 
              name="is_batch_tracked" 
              checked={form.is_batch_tracked} 
              onChange={handleChange} 
            />
            <label className="form-check-label">Batch Tracking</label>
          </div>

          <div className="col-md-4 form-check">
            <input 
              type="checkbox" 
              className="form-check-input" 
              name="is_serial_tracked" 
              checked={form.is_serial_tracked} 
              onChange={handleChange} 
            />
            <label className="form-check-label">Serial Tracking</label>
          </div>

          <div className="col-md-4 form-check">
            <input 
              type="checkbox" 
              className="form-check-input" 
              name="status" 
              checked={form.status} 
              onChange={handleChange} 
            />
            <label className="form-check-label">Active Status</label>
          </div>

          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary px-4 d-flex align-items-center justify-content-center"
            >
              <span className="text-warning me-2 d-flex align-items-center">
                <FaCartPlus />
              </span>
              {editingProduct ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      )}

      {/* Rest of your component (table section) remains the same */}
      <br />
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">Product Tree</h5>
          <div className="mt-4 mb-2 input-group">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search by Name, SKU, Category" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
            <span className="input-group-text">
              <FaSearch />
            </span>
          </div>

          {status === "loading" ? (
            <p>Loading...</p>
          ) : (
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>SKU</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>UoM</th>
                  <th>Tax</th>
                  <th>MRP</th>
                  <th>Purchase</th>
                  <th>Sale</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => (
                    <tr key={p._id}>
                      <td>{p.sku}</td>
                      <td>{p.name}</td>
                      <td>{p.category_id?.name || p.category_id || ""}</td>
                      <td>{p.brand_name || ""}</td>
                      <td>{p.unit_id}</td>
                      <td>{p.tax_rate_id}</td>
                      <td>{p.mrp}</td>
                      <td>{p.purchase_price}</td>
                      <td>{p.sale_price}</td>
                      <td>
                        {["super_admin", "admin"].includes(role) ? (
                          <>
                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={() => handleEdit(p)}
                            >
                              <MdEdit />
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(p._id)}
                            >
                              <MdDeleteForever /> Delete
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;