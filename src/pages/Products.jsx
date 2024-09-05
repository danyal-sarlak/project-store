/* import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LikesContext } from "../Contexts/LikesProvider";
import { CategoriesContext } from "../Contexts/CategoriesContext";
import { addItem, basketState, removeItem } from "../redux/baketSlice";
import AddItemModal from "../Components/AddItemModal";
import Loading from "../Components/Loading";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LazyProductItem = lazy(() => import("../Components/ProductItem"));

export default function Products() {
  const { likes, setLikes } = useContext(LikesContext);
  const { filteredProducts, isProductsLoading } = useContext(CategoriesContext);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector(basketState);

  useEffect(() => {
    const storedLikes = localStorage.getItem("likes");
    if (storedLikes) {
      setLikes(JSON.parse(storedLikes));
    }
  }, [setLikes]);

  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
  }, [likes]);

  const isInBasket = (productId) => {
    return items.some((item) => item.id === productId);
  };

  const handleBasketIconClick = (product) => {
    const Authorisation = localStorage.getItem("token");

    if (Authorisation) {
      if (!isInBasket(product.id)) {
        setSelectedProduct(product);
        setIsModalVisible(true);
      }
    } else {
      navigate("/login");
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  const handleConfirm = () => {
    dispatch(addItem(selectedProduct));
    closeModal();
  };

  const handleHeartClick = (productId) => {
    setLikes((prevLikes) => {
      const currentLikes = prevLikes[productId] || 0;
      const updatedLikes = currentLikes + (currentLikes > 0 ? -1 : 1);
      return { ...prevLikes, [productId]: updatedLikes };
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-7 py-4">
      {filteredProducts.map((product) => (
        <Suspense
          fallback={
            <div className="flex justify-center  h-screen">
              <Skeleton />
            </div>
          }
          key={product.id}
        >
          <LazyProductItem
            product={product}
            likes={likes}
            hoveredProductId={hoveredProductId}
            isInBasket={isInBasket}
            onHover={setHoveredProductId}
            onLeave={() => setHoveredProductId(null)}
            onHeartClick={handleHeartClick}
            onBasketIconClick={handleBasketIconClick}
            onRemoveItem={(product) => dispatch(removeItem(product))}
          />
        </Suspense>
      ))}

      {isModalVisible && selectedProduct && (
        <AddItemModal
          product={selectedProduct}
          closeModal={closeModal}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
 */
import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LikesContext } from "../Contexts/LikesProvider";
import { CategoriesContext } from "../Contexts/CategoriesContext";
import { addItem, basketState, removeItem } from "../redux/baketSlice";
import AddItemModal from "../Components/AddItemModal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Loading from "../Components/Loading";

const LazyProductItem = lazy(() => import("../Components/ProductItem"));

export default function Products() {
  const { likes, setLikes } = useContext(LikesContext);
  const { filteredProducts, isProductsLoading } = useContext(CategoriesContext);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector(basketState);

  useEffect(() => {
    const storedLikes = localStorage.getItem("likes");
    if (storedLikes) {
      setLikes(JSON.parse(storedLikes));
    }
  }, [setLikes]);

  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
  }, [likes]);

  const isInBasket = (productId) => {
    return items.some((item) => item.id === productId);
  };

  const handleBasketIconClick = (product) => {
    const Authorisation = localStorage.getItem("token");

    if (Authorisation) {
      if (!isInBasket(product.id)) {
        setSelectedProduct(product);
        setIsModalVisible(true);
      }
    } else {
      navigate("/login");
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  const handleConfirm = () => {
    dispatch(addItem(selectedProduct));
    closeModal();
  };

  const handleHeartClick = (productId) => {
    setLikes((prevLikes) => {
      const currentLikes = prevLikes[productId] || 0;
      const updatedLikes = currentLikes + (currentLikes > 0 ? -1 : 1);
      return { ...prevLikes, [productId]: updatedLikes };
    });
  };
  if (isProductsLoading) {
    return <div className="flex justify-center pt-8 h-screen">
        <Loading/>
    </div>; // نمایش صفحه بارگذاری
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-7 py-4">
      {filteredProducts.map((product) => (
        <Suspense
          fallback={
            <div className="p-1 rounded-lg bg-gray-300">
              <Skeleton height={200} />
              <Skeleton height={20} width="60%" className="bg-gray-400" />
              <Skeleton height={20} width="40%" className="bg-gray-400" />
              <Skeleton height={20} width="80%" className="bg-gray-400" />
            </div>
          }
          key={product.id}
        >
          <LazyProductItem
            product={product}
            likes={likes}
            hoveredProductId={hoveredProductId}
            isInBasket={isInBasket}
            onHover={setHoveredProductId}
            onLeave={() => setHoveredProductId(null)}
            onHeartClick={handleHeartClick}
            onBasketIconClick={handleBasketIconClick}
            onRemoveItem={(product) => dispatch(removeItem(product))}
          />
        </Suspense>
      ))}

      {isModalVisible && selectedProduct && (
        <AddItemModal
          product={selectedProduct}
          closeModal={closeModal}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
