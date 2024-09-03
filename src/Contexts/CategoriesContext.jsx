
import React, { createContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import supabase from '../supaBase';

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filteredProducts, setFilteredProducts] = useState([]);
    
    const { data: categoriesData, error: categoriesError } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const { data, error } = await supabase.from('productsCategory').select('category');
            if (error) {
                throw new Error(error.message);
            }
            return Array.from(new Set(data.map(item => item.category)));
        },
        initialData: ['all'],
    });

    const { data: productsData, error: productsError, isLoading: isProductsLoading } = useQuery({
        queryKey: ['products', selectedCategory],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('productsCategory')
                .select('*')
                .ilike('category', selectedCategory === 'all' ? '%' : selectedCategory);

            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
        enabled: !!selectedCategory,
    });

    useEffect(() => {
        setFilteredProducts(productsData || []);
    }, [productsData]);

    if (categoriesError) {
        console.error('Error fetching categories:', categoriesError.message);
    }

    if (productsError) {
        console.error('Error filtering products:', productsError.message);
    }

    return (
        <CategoriesContext.Provider value={{
            categories: ['all', ...categoriesData],
            filterProductsByCategory: setSelectedCategory,
            selectedCategory,
            filteredProducts,
            isProductsLoading, // ارسال وضعیت بارگذاری
        }}>
            {children}
        </CategoriesContext.Provider>
    );
};

