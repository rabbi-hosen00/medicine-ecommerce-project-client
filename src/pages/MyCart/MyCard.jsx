

import useCard from "../Shop/useCard";
import Card from "../../pages/MyCart/Card";
import Container from "../../components/Shared/Container";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const MyCard = () => {
    const [cart,,isLoading] = useCard(); // Assuming useCard returns a state array
    console.log(cart);

    if(isLoading) <LoadingSpinner></LoadingSpinner>


    return (
        <Container>
            <Helmet>
                <title> Medicine | cart page</title>
            </Helmet>
            <div className="grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-9">
                {cart?.map((medicine) => (
                    <Card key={medicine._id} medicine={medicine}></Card>
                ))}
            </div>
        </Container>
    );
};

export default MyCard;



