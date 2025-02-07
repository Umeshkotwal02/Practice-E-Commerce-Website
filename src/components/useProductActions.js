// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { add } from "../redux/counter/cartSlice";

// // Reusable logic functions
// export const useProductActions = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [editProduct, setEditProduct] = useState(null);
//   const [updateProduct, setUpdateProduct] = useState({});

//   // Update product handler
//   const updateProductHandler = async (id) => {
//     try {
//       const response = await axios.put(
//         `https://fakestoreapi.com/products/${id}`,
//         updateProduct
//       );
//       setProducts(products.map((prod) => (prod.id === id ? response.data : prod)));
//       setEditProduct(null);
//       Swal.fire("Success", "Product updated successfully!", "success");
//     } catch (error) {
//       console.error("Error updating product:", error);
//       Swal.fire("Error", "There was an error updating the product.", "error");
//     }
//   };

//   // Delete product handler
//   const handleDeleteProduct = async (id) => {
//     try {
//       const result = await Swal.fire({
//         title: "Are you sure?",
//         text: "Delete This Product",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#DD6B55",
//         confirmButtonText: "Yes, delete it!",
//         cancelButtonText: "No, cancel please!",
//       });

//       if (result.isConfirmed) {
//         await axios.delete(`https://fakestoreapi.com/products/${id}`);
//         setProducts(products.filter((product) => product.id !== id));
//         Swal.fire("Deleted!", "Your product has been deleted.", "success");
//       } else {
//         Swal.fire("Cancelled", "Your product is safe", "error");
//       }
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       Swal.fire("Error", "There was an error deleting the product.", "error");
//     }
//   };

//   // Add product to cart
//   const handleAddToCart = (product, setAddedToCart) => {
//     dispatch(add(product));
//     if (setAddedToCart) setAddedToCart(true);
//   };

//   // Edit product handler
//   const handleEditProduct = (product) => {
//     setEditProduct(product);
//     setUpdateProduct({
//       title: product.title,
//       price: product.price,
//       description: product.description,
//     });
//   };

//   // Handle cancel edit
//   const handleCancelEdit = () => {
//     setEditProduct(null);
//   };

//   // Navigate to the cart page
//   const handleViewCart = () => {
//     navigate("/Cart");
//   };

//   return {
//     handleDeleteProduct,
//     handleAddToCart,
//     handleEditProduct,
//     handleCancelEdit,
//     handleViewCart,
//     editProduct,
//     updateProductHandler,
//     updateProduct,
//     setUpdateProduct,
//   };
// };
// export default useProductActions ;
