import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import SideBar from "./SideBar";
import Header from "./Header";

export default function AllProduct() {
  const [seeProduct, setSeeProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate=useNavigate()
  const [open,setOpen]=useState(null)
    const location = useLocation();
  
      useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    if (search) setSearchTerm(search);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const isInsideMenu = e.target.closest(".menu-wrapper");
      if (!isInsideMenu) {
        setOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (id) => {
    setOpen(open === id ? null : id);
  };

  useEffect(() => {
    fetch("http://localhost:8007/api/showProduct")
      .then((res) => res.json())
      .then((data) => setSeeProduct(data.data || []))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const filteredProducts = seeProduct.filter((product) => {
    const matchesSearch =
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter
      ? product.category === categoryFilter
      : true;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

const handleDelete=(_id)=>{
  fetch(`http://localhost:8007/api/DeleteProduct/${_id}`,{
    method:'DELETE'
  })
  .then(res=>res.json())
  .then((data)=>{
    console.log(data);
    setSeeProduct((prev) => prev.filter(product => product._id !== _id));
  })
}


  return (
    <div className="container-scroller">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm}  />
      <div className="container-fluid page-body-wrapper">
        <SideBar />
        <div className="main-panel" style={{ marginLeft: "250px", marginTop: "40px" }}>
          <div className="content-wrapper px-4 py-5">

            {/* Top Bar */}
      <div className="d-flex justify-content-end align-items-center mb-4 gap-3">
  {/* Add Product Button */}
 <div style={{marginRight:'700px',fontSize:'20px'}}>  all product</div>
  <Link
    to="/add-product"
    className="btn btn-primary pe-3 ps-3 rounded-2"
  >
    ➕ Add Product
  </Link>

  {/* Category Filter Dropdown */}
  <select
    value={categoryFilter}
    onChange={(e) => setCategoryFilter(e.target.value)}
    className="form-select"
    style={{ width: "220px" }}
  >
    <option value="" className="text-dark">⏳Filter</option>
    <option value="">All</option>
    {[...new Set(seeProduct.map((p) => p.category))].map((cat, i) => (
      <option key={i} value={cat}>{cat}</option>
    ))}
  </select>
</div>

            {/* Filter Bar */}
          

            {/* Product Table */}
         <div className="col-lg-12 grid-margin stretch-card ">
             <div className="card2  w-100">
              <div className="card-body2 p-4" >
                <table className="table table-bordered table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: "5%" }}>#</th>
                      <th style={{ width: "30%" }}>Product</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Rating</th>
                      <th>Stock</th>
                      <th style={{ width: "15%" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedProducts.length===0 ?(
                      <tr>
                            <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: 'gray' }}>
                              Data Not Found
                            </td>
                          </tr>
                    )
                    :
                     (displayedProducts.map((product, index) => {
                      const imageUrl = product.Image?.startsWith("http")
                        ? product.Image
                        : `http://localhost:8007${product.Image || ""}`;

                      return (
                        <tr key={product._id}>
                          <td>{startIndex + index + 1}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={imageUrl}
                                alt="product"
                                className="me-3"
                                style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px" }}
                              />
                              <span className="fw-medium">{product.title}</span>
                            </div>
                          </td>
                          <td>{product.category}</td>
                          <td>₹{product.Price}</td>
                          <td>⭐ {product.rate}</td>
                          <td>
                              {product.stock === 0 ? (
                                <span style={{ color: "red", fontWeight: "bold" }}>Out of Stock</span>
                              ) : (
                                product.stock
                              )}
                          </td> 
                     
                           <td className="menu-wrapper" style={{ position: "relative" }}>
                                <i
                                  className="ri-more-2-line"
                                  onClick={() => toggleMenu(product._id)}
                                  style={{ cursor: "pointer" }}
                                ></i>

                                {open === product._id && (
                                  <div className="Menu position-absolute bg-white shadow p-2 rounded">
                                    <div className="menuBtn mb-1 " >
                                      <Link to={`/product-details/${product._id}`} style={{color:'grey',textDecoration:'none'}}>
                                        <i className="ri-eye-fill"></i> View
                                      </Link>
                                    </div>
                                    <div
                                      className="menuBtn mb-1"  style={{color:'grey',textDecoration:'none'}}
                                      onClick={() => navigate(`/edit-product/${product._id}`)}
                                    >
                                      <i className="ri-edit-line"></i> Edit
                                    </div>
                                    <div className="menuBtn text-danger" onClick={() => handleDelete(product._id)}>
                                      <i className="ri-delete-bin-6-line"></i> Delete
                                    </div>
                                  </div>
                                )}
                              </td>
                        </tr>
                      );
                    })
                  )}
                   
                  </tbody>
                </table>
              </div>
            </div>
         </div>

            {/* Pagination */}
            <div className="mt-4 text-center">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`btn btn-sm mx-1 ${currentPage === i + 1 ? "btn-primary text-white" : "btn-outline-secondary"}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
