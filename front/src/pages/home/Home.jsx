import { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/layout/header/Header";
import Main from "../../components/layout/main/Main";

function Home() {
<<<<<<< HEAD

    const user = useSelector( state => state )

    useEffect(() => {

        console.log(user);

    },[])
=======
    const user = useSelector( state => state )

    useEffect(() => {
        console.log(user);
    }, []);

>>>>>>> c895c0ef131ad3c7e020e886707b505ecbb5cbed

    return (
        <>
            <Header />
            <Main />
        </>
    );
}

export default Home;
