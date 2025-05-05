const AddNew = () => {
    const categories = [
        { id: 1, name: "Category 1" },
        { id: 2, name: "Category 2" },
        { id: 3, name: "Category 3" },
        { id: 4, name: "Category 4" },
    ];

    return (
        <div>
            <h1>Add New Item</h1>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />

            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" required></textarea>

            <label htmlFor="price">Price</label>
            <input type="number" id="price" name="price" required />

            <label htmlFor="img">Image URL</label>
            <input type="url" id="img" name="img" required />
            <div>
                {categories.map((category) => (
                    <div key={category.id}>
                        <input
                            type="checkbox"
                            id={category.id}
                            name="categories"
                            value={category.name}
                        />
                        <label htmlFor={category.id}>{category.name}</label>
                    </div>
                ))}
            </div>
            <button type="submit">Add Item</button>
        </div>
    );
};

export default AddNew;
