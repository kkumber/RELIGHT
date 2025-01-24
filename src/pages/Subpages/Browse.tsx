import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import RenderBooks from "../../components/Renders/RenderBooks";
import useFetch from "../../hooks/useFetch";
import { FetchData } from "../Home";
import { useEffect, useState } from "react";

const Browse = () => {
    const {data, isLoading, error, fetchData} = useFetch();
    const [bookList, setBookList] = useState<FetchData>();

    const handleFetchPopular = () => {

    };

    const handleFetchExplore = () => {

    };

    const handleFetchNew= () => {
        
    };
    
    const handleFetchAZList = () => {
        
    };

    useEffect(() => {
        if (data) {
            setBookList(data);
        }
    }, [])
    return ( 
        <div className="min-h-screen flex flex-col">
            <Header />
            {/* Main Container */}
            <div className="flex flex-grow">
                <nav>
                    <ul className="flex gap-4 items-center ">
                        <li><button onClick={() => handleFetchPopular}>Popular</button></li>
                        <li><button onClick={() => handleFetchExplore}>Explore</button></li>
                        <li><button onClick={() => handleFetchNew}>What's New</button></li>
                        <li><button onClick={() => handleFetchAZList}>A-Z List</button></li>
                    </ul>
                    <hr className="bg-primaryRed p-[2px] mb-4 rounded-full"/>
                </nav>
                <section className="flex flex-wrap gap-8">
                    {
                        bookList?.results.map(book => 
                            <div key={book.id} className="h-full w-28 md:w-40">
                                <RenderBooks book={book} />
                            </div>
                        )
                    }
        </section>
            </div>
            <Footer />
        </div>
     );
}
 
export default Browse;