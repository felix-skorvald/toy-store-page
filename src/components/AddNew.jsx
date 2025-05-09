import { useAdminStore } from "../data/store";

const AddNew = () => {
    const isAdmin = useAdminStore((state) => state.isAdmin);
    return !isAdmin ? (
        <div>
            <h1>Försök inte ens</h1>
            <h2>40000000004</h2>
        </div>
    ) : (
        <div>
            <label htmlFor="name">Title</label>
            <input type="text" id="name" />

            <label htmlFor="img">Image URL</label>
            <input type="text" id="img" />

            <label htmlFor="description">Beskrivning</label>
            <input type="text" id="description" />

            <label htmlFor="price">Pris</label>
            <input type="text" id="price" />
        </div>
    );
};

export default AddNew;
