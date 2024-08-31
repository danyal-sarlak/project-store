
   /*  import React, { useContext, useEffect, useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { useDispatch, useSelector } from 'react-redux';
    import { LikesContext } from '../Contexts/LikesProvider';
    import { CategoriesContext } from '../Contexts/CategoriesContext';
    import { addItem, basketState, removeItem } from '../redux/baketSlice';
    import AddItemModal from '../Components/AddItemModal';
    import { FaRegHeart, FaStar } from 'react-icons/fa';
    import { SlBasket } from 'react-icons/sl';
    import { SiTicktick } from 'react-icons/si';
    import { IoTrashOutline } from 'react-icons/io5';
    import { CiStar } from 'react-icons/ci';
import Loading from '../Components/Loading';
   
    export default function Products() {
        const { likes, setLikes } = useContext(LikesContext);
        const { filteredProducts, isProductsLoading } = useContext(CategoriesContext); // استفاده از وضعیت بارگذاری
        const [hoveredProductId, setHoveredProductId] = useState(null);
        const [selectedProduct, setSelectedProduct] = useState(null);
        const [isModalVisible, setIsModalVisible] = useState(false);
    
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const { items } = useSelector(basketState);
    
        useEffect(() => {
            const storedLikes = localStorage.getItem('likes');
            if (storedLikes) {
                setLikes(JSON.parse(storedLikes));
            }
        }, [setLikes]);
    
        useEffect(() => {
            localStorage.setItem('likes', JSON.stringify(likes));
        }, [likes]);
    
        const isInBasket = (productId) => {
            return items.some(item => item.id === productId);
        };
    
        const handleBasketIconClick = (product) => {
            const Authorisation = localStorage.getItem("token");
    
            if (Authorisation) {
                if (!isInBasket(product.id)) {
                    setSelectedProduct(product);
                    setIsModalVisible(true);
                }
            } else {
                navigate('/login');
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
            setLikes(prevLikes => {
                const currentLikes = prevLikes[productId] || 0;
                const updatedLikes = currentLikes + (currentLikes > 0 ? -1 : 1);
                return { ...prevLikes, [productId]: updatedLikes };
            });
        };
    
        if (isProductsLoading) {
            return   <div className="flex justify-center pt-8 h-screen">
            <Loading/>
        </div>; // نمایش صفحه بارگذاری
        }
    
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7 py-4">
                {filteredProducts.map(product => (
                    <div key={product.id} className="p-1 rounded-lg">
                        <span
                            className="relative block"
                            onMouseEnter={() => setHoveredProductId(product.id)}
                            onMouseLeave={() => setHoveredProductId(null)}
                        >
                            <img className="rounded-lg w-full h-44 object-cover" src={product.image} alt="" />
    
                            <div className="absolute top-2 z-10 right-1 rounded-full w-6 h-6 bg-white flex items-center justify-center">
                                <FaRegHeart
                                    className={`text-gray-500 cursor-pointer ${likes[product.id] > 0 ? 'text-red-500' : ''}`}
                                    onClick={() => handleHeartClick(product.id)}
                                />
                            </div>
    
                            {hoveredProductId === product.id && (
                                <div className="absolute inset-0 bg-black rounded-lg bg-opacity-50 flex items-center justify-center text-white font-bold text-lg">
                                    {isInBasket(product.id) ? (
                                        <div className="absolute inset-0 bg-green-500 bg-opacity-50 flex items-center justify-center text-white font-bold text-lg">
                                            <div className="bg-black text-white p-2 rounded-full"><SiTicktick /></div>
    
                                            <div className="top-1 z-10 rounded-full absolute right-1 p-2 bg-red-500">
                                                <IoTrashOutline
                                                    className="text-white cursor-pointer"
                                                    onClick={() => dispatch(removeItem(product))}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => handleBasketIconClick(product)}
                                            className="rounded-full cursor-pointer w-7 h-7 bg-white flex items-center justify-center"
                                        >
                                            <SlBasket className="text-gray-500" />
                                        </div>
                                    )}
                                </div>
                            )}
                        </span>
    
                        <div className="flex justify-between pt-2">
                            <h2>{product.name}</h2>
                            <h2>{product.price}$</h2>
                        </div>
                        <h2>{product.material}</h2>
                        <p className="text-gray-500 font-medium pt-1">
                            {product.details}
                        </p>
                        <div className="flex pt-2">
                            <FaStar className="text-yellow-600" />
                            <FaStar className="text-yellow-600" />
                            <FaStar className="text-yellow-600" />
                            <CiStar className="text-yellow-600" />
                            <CiStar className="text-yellow-600" />
                        </div>
                    </div>
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
    } */
    
    // Products.js
    import React, { lazy, Suspense, useContext, useState } from "react";
    import { useNavigate } from "react-router-dom";
    import { useDispatch, useSelector } from "react-redux";
    import { LikesContext } from "../Contexts/LikesProvider";
    import { CategoriesContext } from "../Contexts/CategoriesContext";
    import { addItem, basketState, removeItem } from "../redux/baketSlice";
    import AddItemModal from "../Components/AddItemModal";
import Loading from "../Components/Loading";
    
    const LazyProductItem = lazy(() => import("../Components/ProductItem"));
    
    
    export default function Products() {
      const { likes, setLikes } = useContext(LikesContext);
      const { filteredProducts, isProductsLoading } = useContext(CategoriesContext);
      const [selectedProduct, setSelectedProduct] = useState(null);
      const [isModalVisible, setIsModalVisible] = useState(false);
    
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const { items } = useSelector(basketState);
    
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
    
      const isInBasket = (productId) => {
        return items.some((item) => item.id === productId);
      };
    
      if (isProductsLoading) {
        return   <div className="flex justify-center pt-8 h-screen">
        <Loading/>
    </div>; // نمایش صفحه بارگذاری
    }

    
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7 py-4">
          <Suspense
            fallback={
              <div className=" col-start-3 col-end-4 pt-8">
               <Loading/>
              </div>
            }
          >
            {filteredProducts.map((product) => (
              <LazyProductItem
                key={product.id}
                product={product}
                onBasketIconClick={handleBasketIconClick}
              />
            ))}
          </Suspense>
    
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


 