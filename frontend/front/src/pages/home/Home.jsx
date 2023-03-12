
import {useEffect, useState} from "react";
import Main from "../../components/layout/home/Main";
import Layout from "../../components/layout/Layout";
import SearchView from "../../components/atomic/Search.view";



function Home() {

    return (
        <>

            <Layout>
              <Main />
              <SearchView/>
            </Layout>

        </>
    );
}

export default Home;
