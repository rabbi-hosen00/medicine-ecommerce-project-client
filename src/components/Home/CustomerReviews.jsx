import Container from "../Shared/Container";


const CustomerReviews = () => {
  // Static reviews data
  const reviews = [
    {
      id: 1,
      customerName: "John Doe",
      date: "January 15, 2025",
      comment: "Amazing service! The medicines were delivered on time, and the quality was excellent.",
      rating: 5,
    },
    {
      id: 2,
      customerName: "Jane Smith",
      date: "January 20, 2025",
      comment: "Very satisfied with the expert advice I received. Highly recommend this platform!",
      rating: 4,
    },
    {
      id: 3,
      customerName: "Mike Johnson",
      date: "January 25, 2025",
      comment: "The selection of healthcare products is impressive, but delivery could be faster.",
      rating: 3,
    },
  ];

  return (
    <div className=" py-10">
      <Container className=" mx-auto border-4 border-red-500 px-4">
        <h2 className="text-4xl font-semibold text-center mb-7 text-orange-600">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col"
            >
              <h3 className="text-lg font-bold">{review.customerName}</h3>
              <p className="text-gray-500 text-sm">{review.date}</p>
              <p className="mt-4 text-gray-700">{review.comment}</p>
              <div className="mt-4 flex">
                {Array(review.rating)
                  .fill(0)
                  .map((_, index) => (
                    <span key={index} className="text-yellow-500">
                      ★
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default CustomerReviews;
