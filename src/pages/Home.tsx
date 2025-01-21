import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import AddBookForm from "../components/Forms/AddBookForm";
import RenderBooks from "../components/Renders/RenderBooks";
import { Book } from "../components/Renders/RenderBooks";
import Loading from "../components/Loading";
import ErrorMsg from "../components/ErrorMsg";


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
    <div className="home">
        Home
        <section>
            <h2>Submit a Book</h2>
            <AddBookForm />
        </section>

        <section>
            <h2>Browse</h2>
            {isLoading && <Loading />}
            {error && <ErrorMsg error={error} />}
            {
                bookList?.results.map(book => 
                    <div key={book.id}>
                        <RenderBooks book={book} />
                    </div>
                )
            }
        </section>
    </div> );
}

export default Home;