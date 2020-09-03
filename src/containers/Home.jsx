import React from 'react';
import ItemListContainer from "../components/ItemListContainer/ItemListContainer";
import Banner from "../components/Banner/Banner"
function Home() {
   
    return (
        <div>
            <Banner/>
            <ItemListContainer/>
        </div>
    )
}

export default Home;