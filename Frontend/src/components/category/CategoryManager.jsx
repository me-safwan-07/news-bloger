import React, { useState } from 'react';

export const category = [
  "Sports",
  "Entertainment",
  "Politics",
];

const CategoryManager = () => {
  const [categories, setCategories] = useState(category);
  const [newCategory, setNewCategory] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const handleUpdateCategory = () => {
    if (newCategory && editingIndex !== null) {
      const updatedCategories = categories.map((cat, index) =>
        index === editingIndex ? newCategory : cat
      );
      setCategories(updatedCategories);
      setNewCategory('');
      setEditingIndex(null);
    }
  };

  const handleEditCategory = (index) => {
    setNewCategory(categories[index]);
    setEditingIndex(index);
  };

  const handleDeleteCategory = (index) => {
    const updatedCategories = categories.filter((_, idx) => idx !== index);
    setCategories(updatedCategories);
  };

  return (
    <div>
      <h1>Category Manager</h1>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Add or update category"
      />
      <button onClick={editingIndex !== null ? handleUpdateCategory : handleAddCategory}>
        {editingIndex !== null ? 'Update Category' : 'Add Category'}
      </button>

      <ul>
        {categories.map((cat, index) => (
          <li key={index}>
            {cat}
            <button onClick={() => handleEditCategory(index)}>Edit</button>
            <button onClick={() => handleDeleteCategory(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;
