import React, { useEffect, useState } from "react";
import "./AllProductes.css"; 

const AllProducts = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
   const [sortOrder, setSortOrder] = useState(""); 
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 6; 

  const fetchData = async (page) => {
    try {
      const skip = (page - 1) * productsPerPage;
      const res = await fetch(
        `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`
      );
      const pro = await res.json();
      setData(pro.products);
      setTotalProducts(pro.total);
    } catch (error) {
      console.log("Something went wrong while fetching the data", error);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleNextPage = () => {
    if (page < Math.ceil(totalProducts / productsPerPage)) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const sortData = (order) => {
    const sortedData = [...data].sort((a, b) => {
      if (order === "lowToHigh") {
        return a.rating - b.rating;
      } else if (order === "highToLow") {
        return b.rating - a.rating;
      }
      return 0;
    });
    setData(sortedData);
    setSortOrder(order);
  };

  return (
    <div>
      <h1>All Products</h1>
      <div className="sort-buttons">
        <button onClick={() => sortData("lowToHigh")}>
          Rating: Low to High
        </button>
        <button onClick={() => sortData("highToLow")}>
          Rating: High to Low
        </button>
      </div>
      <div className="product-list">
        {data.map((product) => (
          <div key={product.id} className="product-card">
            <h2>{product.title}</h2>
            <img src={product.thumbnail} alt={product.title} />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={handleNextPage}
          disabled={page === Math.ceil(totalProducts / productsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
