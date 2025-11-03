

import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdAdd, MdOutlineCategory, MdClose } from "react-icons/md";
import { RiFunctionAddLine } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, addCategory, deleteCategory } from "../redux/categorySlice";
import { setAuthToken } from "../services/userService";
import { updateCategory } from "../redux/categorySlice";
import { MdEdit } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
const Category = () => {
  const dispatch = useDispatch()
  const { items: categories, status } = useSelector((state) => state.categories)

  const user = JSON.parse(localStorage.getItem("user"))
  const role = user?.role || "user"
  const token = user?.token

  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [form, setForm] = useState({
    parental_id: "",
    name: "",
    code: "",
    subcategory: "",
    brand: "",
    status: false,
  });

  const categoryData = {
    Pharmacy: {
      Medicines: ["Cipla", "Sun Pharma", "Dr. Reddy's", "Torrent", "Lupin", "Zydus", "Glenmark", "Mankind", "Intas", "Alkem"],
      BabyCare: ["Johnson's Baby", "Himalaya Baby", "Sebamed", "Pigeon", "Mee Mee"],
      PersonalCare: ["Nivea", "Dove", "Himalaya", "Garnier", "Pond's", "Vaseline", "Fiama"],
    },
  };

  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [editingCategory, setEditingCategory] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user || !user.token) {
      console.error("No user found Please Login")
    }

    const token = user.token
    setAuthToken(token)
    dispatch(fetchCategories())
  }, [dispatch])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "name") {
      setSubcategories(Object.keys(categoryData[value] || {}));
      setBrands([]);
      setForm({ ...form, name: value, subcategory: "", brand: "" });
    } else if (name === "subcategory") {
      setBrands(categoryData[form.name][value] || []);
      setForm({ ...form, subcategory: value, brand: "" });
    } else {
      setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, brands: form.brand ? [form.brand] : [] };
    try {
      if (editingCategory) {
        await dispatch(updateCategory({ id: editingCategory, updatedData: payload })).unwrap();
        setEditingCategory(null);
        console.log("✅ Category Updated Successfully");
      } else {
        await dispatch(addCategory(payload)).unwrap();
        console.log("✅ Category Added Successfully");
      }

      dispatch(fetchCategories());

      setForm({
        parental_id: "",
        name: "",
        code: "",
        subcategory: "",
        brand: "",
        status: false,
      });

      setSubcategories([]);
      setBrands([]);
      setShowCategoryForm(false)
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const filteredCategories = categories.filter((c) => {
    const name = c.name?.toLowerCase() || "";
    const code = c.code?.toLowerCase() || "";
    const parental_id = c.parental_id?.toLowerCase() || "";
    return (
      name.includes(search.toLowerCase()) ||
      code.includes(search.toLowerCase()) ||
      parental_id.includes(search.toLowerCase())
    );
  });

  const uniqueCategories = filteredCategories.filter(
    (c, index, self) => index === self.findIndex((obj) => obj._id === c._id)
  );

  const handleDelete = async (id) => {
    dispatch(deleteCategory(id))
  };

  const handleEdit = (category) => {
    setEditingCategory(category._id)
    setForm({
      parental_id: category.parental_id || "",
      name: category.name || "",
      code: category.code || "",
      subcategory: category.subcategory || "",
      brand: category.brand || "",
      status: category.status || false,
    })

    // Set subcategories and brands when editing
    if (category.name && categoryData[category.name]) {
      setSubcategories(Object.keys(categoryData[category.name]));
      if (category.subcategory && categoryData[category.name][category.subcategory]) {
        setBrands(categoryData[category.name][category.subcategory]);
      }
    }

    setShowCategoryForm(true)
  }

  const handleCloseForm = () => {
    setShowCategoryForm(false)
    setEditingCategory(null)
    setForm({
      parental_id: "",
      name: "",
      code: "",
      subcategory: "",
      brand: "",
      status: false,
    });
    setSubcategories([]);
    setBrands([]);
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 d-flex align-items-center fs-5">
        <span className="me-2 d-flex align-items-center" style={{ color: "#4d6f99ff" }}>
          <MdOutlineCategory size={24} />
        </span>
        <b>CATEGORY MASTER</b>
      </h2>

      {/* Action Buttons - Above the category area */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex gap-2">
            {["super_admin", "admin"].includes(role) && (
              <button
                className="btn btn-primary d-flex align-items-center"
                onClick={() => setShowCategoryForm(true)}
              >
                <MdAdd className="me-2" />
                Add Category
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Form Popup/Modal */}
      {showCategoryForm && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  {editingCategory ? "Edit Category" : "Add New Category"}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={handleCloseForm}
                ></button>
              </div>
              <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-md-6">
                    <label className="form-label">Category ID<span className="text-danger">*</span></label>
                    <input
                      type="number"
                      className="form-control bg-light"
                      name="parental_id"
                      value={form.parental_id}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Category Name<span className="text-danger">*</span></label>
                    <select
                      className="form-control"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Select Category --</option>
                      {Object.keys(categoryData).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Category Code</label>
                    <input
                      type="text"
                      className="form-control bg-light"
                      name="code"
                      value={form.code}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {subcategories.length > 0 && (
                    <div className="col-md-6">
                      <label className="form-label">Subcategory<span className="text-danger">*</span></label>
                      <select
                        className="form-control"
                        name="subcategory"
                        value={form.subcategory}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Subcategory</option>
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
                      <label className="form-label">Brand</label>
                      <select
                        className="form-control"
                        name="brand"
                        value={form.brand}
                        onChange={handleChange}
                      >
                        <option value="">-- Select Brand --</option>
                        {brands.map((b, index) => (
                          <option key={index} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="col-md-4 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="status"
                      checked={form.status}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Status</label>
                  </div>
                  <div className="col-12 d-flex justify-content-end gap-2 mt-3">
  <button
    type="submit"
    className="btn btn-primary d-flex align-items-center"
  >
    <FaCartPlus className="me-2 text-warning" />
    {editingCategory ? "Update Category" : "Add Category"}
  </button>

  <button
    type="button"
    className="btn btn-secondary d-flex align-items-center"
    onClick={handleCloseForm}
  >
    <MdClose className="me-2" />
    Cancel
  </button>
</div>

                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Always Visible Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">Category Tree</h5>
          <div className="mt-4 mb-2 input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search Category code, Category name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="input-group-text"><FaSearch /></span>
          </div>

          {status === "loading" ? (
            <p>Loading...</p>
          ) : (
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th className="fw-bold">Category ID</th>
                  <th className="fw-bold">Category Name</th>
                  <th className="fw-bold">Subcategory</th>
                  <th className="fw-bold">Brand</th>
                  <th className="fw-bold">Category Code</th>
                  <th className="fw-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No categories found.
                    </td>
                  </tr>
                ) : (
                  uniqueCategories.map((c) => (
                    <tr key={c._id}>
                      <td>{c.parental_id}</td>
                      <td>{c.name}</td>
                      <td>{c.subcategory || "-"}</td>
                      <td>{c.brands?.join("") || "-"}</td>
                      <td>{c.code}</td>
                      <td>
                        {["super_admin", "admin"].includes(role) ? (
                          <>
                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={() => handleEdit(c)}
                            >
                              <MdEdit />
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(c._id)}
                            >
                              <span className="text-warning">
                                <MdDeleteForever />
                              </span>
                              Delete
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

export default Category;