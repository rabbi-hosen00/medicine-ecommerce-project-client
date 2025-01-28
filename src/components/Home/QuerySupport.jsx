import { useState } from "react";

const QuerySupport = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        query: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // Handle query submission logic here
        setFormData({ name: "", email: "", query: "" });
    };

    return (
        <div className="py-10 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto bg-white text-gray-800 shadow-sm rounded-lg p-4">
                    <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
                        Submit Your Query
                    </h2>
                    <p className="text-center text-gray-600 mb-4 text-xs">
                        Need help? Fill out the form, and well get back to you soon.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="flex gap-3">
                            <div className="mb-3">
                                <label
                                    className="block text-xs font-medium mb-1 text-gray-700"
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    className="block text-xs font-medium mb-1 text-gray-700"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label
                                className="block text-xs font-medium mb-1 text-gray-700"
                                htmlFor="query"
                            >
                                Query
                            </label>
                            <textarea
                                id="query"
                                name="query"
                                value={formData.query}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                rows="3"
                                placeholder="Write your query here"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-500 text-white font-medium rounded-md text-sm shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            Submit Query
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default QuerySupport;
