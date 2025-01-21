import { useState } from "react";
import axios from 'axios';

function AddTour() {
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [difficulty, setDifficulty] = useState('easy');
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!name || !duration) {
            setError("Name and Duration are required.");
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5173/api/v1/tours', {
                name,
                duration,
                difficulty
            });
            console.log(response.data);
            // Reset form fields after successful submission
            setName("");
            setDuration("");
            setDifficulty("easy");
            setError(""); // Reset error message
        } catch (error) {
            console.error("There was an error adding the tour!", error);
            setError(`There was an error adding the tour: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    return (
        <div>
            <h1>Add Tour</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="tourName">Name</label>
                <input 
                    type="text" 
                    id="tourName"
                    placeholder="Enter tour name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                /><br/>

                <label htmlFor="tourDuration">Duration</label>
                <input 
                    type="number" 
                    id="tourDuration"
                    placeholder="Enter tour duration"
                    value={duration} 
                    onChange={(e) => setDuration(e.target.value)} 
                /><br/>

                <label htmlFor="tourDifficulty">Difficulty</label>
                <select 
                    id="tourDifficulty"
                    value={difficulty} 
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="difficult">Difficult</option>
                </select><br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddTour;
