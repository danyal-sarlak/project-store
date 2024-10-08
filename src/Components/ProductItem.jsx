import React from 'react';
import { FaRegHeart, FaStar } from 'react-icons/fa';
import { SlBasket } from 'react-icons/sl';
import { SiTicktick } from 'react-icons/si';
import { IoTrashOutline } from 'react-icons/io5';
import { CiStar } from 'react-icons/ci';

export default function ProductItem({
    product,
    likes,
    hoveredProductId,
    isInBasket,
    onHover,
    onLeave,
    onHeartClick,
    onBasketIconClick,
    onRemoveItem
}) {
    return (
        <div key={product.id} className="p-1 rounded-lg">
            <span
                className="relative block"
                onMouseEnter={() => onHover(product.id)}
                onMouseLeave={() => onLeave()}
            >
                <img className="rounded-lg h-56  w-full sm:h-48 object-fill" src={product.image} alt="" />

                <div className="absolute top-2 z-10 right-1 rounded-full w-6 h-6 bg-white flex items-center justify-center">
                    <FaRegHeart
                        className={`text-gray-500 cursor-pointer ${likes[product.id] > 0 ? 'text-red-500' : ''}`}
                        onClick={() => onHeartClick(product.id)}
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
                                        onClick={() => onRemoveItem(product)}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div
                                onClick={() => onBasketIconClick(product)}
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
    );
}
