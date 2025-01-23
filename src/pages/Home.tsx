import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import AddBookForm from "../components/Forms/AddBookForm";
import RenderBooks from "../components/Renders/RenderBooks";
import { Book } from "../components/Renders/RenderBooks";
import Loading from "../components/Loading";
import ErrorMsg from "../components/ErrorMsg";
import RenderBooksSideInfo from "../components/Renders/RenderBooksSideInfo";
import Header from "../components/Header";



export interface FetchData {
    count: number,
    next: undefined,
    previous: undefined,
    results: Book[]
}


const Home = () => {
    const {data: returns, isLoading, error, fetchData} = useFetch();
    const [bookList, setBookList] = useState<FetchData>();

    useEffect(() => {
        fetchData('library/books/');
    }, []);

    useEffect(() => {
        if (returns) {
            setBookList(returns);
            console.log(returns)
        };
    }, [returns])


    return (    
    <>
    
    <Header />



    {/* Main Home Container  */}
    <div className="flex flex-wrap md:grid md:grid-cols-5 md:gap-x-20">
    
    {isLoading && <Loading />}
    {error && <ErrorMsg error={error} />}
    {/* Popular Uploads */}
    <div className="md:col-span-3">
    <b className="text-lg">Popular Uploads</b>
        <section className="flex flex-wrap gap-4">
            {
                bookList?.results.map(book => 
                    <div key={book.id} className="h-full w-32">
                        <RenderBooks book={book} />
                    </div>
                )
            }
        </section>
    </div>

    {/* New Uploads */}
    <div className="col-span-2">
        <b className="text-lg">New & Trending</b>
        <section className="flex flex-col gap-8">
                {isLoading && <Loading />}
                {error && <ErrorMsg error={error} />}
                {
                    bookList?.results.map(book => 
                        <div key={book.id} className="">
                            <RenderBooksSideInfo book={book} />
                        <hr />
                        </div>
                    )
                }
            </section>
    </div>
        

    </div> 
    </>
    );
}

export default Home;