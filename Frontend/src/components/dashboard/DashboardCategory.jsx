import React, { useContext, useEffect, useState } from 'react';
import { List, arrayMove } from "react-movable";
import { NavbarContext } from '../../context/NavbarContext';
import { DashboardContext } from '../../context/DashboardContext';

export default function DashboardCategory() {
    // const [categories, setCategories] = useState([]);
    const { category, setCategory } = useContext(DashboardContext);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/categories');
                const data = await res.json();
                console.log(data);
                setCategory(data);
            } catch (err) {
                console.error('Error fetching categories data:', err);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = ({ oldIndex, newIndex }) => {
        const updatedCategories = arrayMove(categories, oldIndex, newIndex);
        setCategory(updatedCategories);
        // setNavbar(updatedCategories);
        // Log the updated list line by line
        console.log("Updated Categories:");
        updatedCategories.forEach(cat => console.log(cat.category));
    };

    return (
        <div>
            <List 
                values={category.map(cat => cat.category)} // Map to get an array of category names
                onChange={handleChange} // Use the handler here
                renderList={({ children, props }) => <ul {...props}>{children}</ul>}
                renderItem={({ value, props }) => <li {...props}>{value}</li>}
            />
        </div>
    );
}
