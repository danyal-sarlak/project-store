
import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LikesContext } from "../Contexts/LikesProvider";
import { CategoriesContext } from "../Contexts/CategoriesContext";
import { addItem, basketState, removeItem } from "../redux/baketSlice";
import AddItemModal from "../Components/AddItemModal";
import Loading from "../Components/Loading";
import LoadingSkeleton from "../Components/LoadingSkeleton";
import { motion } from "framer-motion";

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
    return (
      <div className="flex justify-center pt-8 h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-7 py-4">
      {filteredProducts.map((product) => (
        <Suspense
          fallback={<LoadingSkeleton />}
          key={product.id}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
            className="relative"
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
          </motion.div>
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
