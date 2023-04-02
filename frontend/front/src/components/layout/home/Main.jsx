
import Popularity from "./popularity/Popularity";
import Ranking from "./ranking/Ranking";
import Banner from "./banner/Banner";
import {useEffect, useState} from "react";
import CategoryHttp from "../../../http/categoryHttp";



const client = new CategoryHttp();

function Main() {

    const [likeList,setLikeList] = useState([]);
    const [commented,setCommented] = useState([]);
    const [banner,setBanner] = useState([])

    useEffect(() =>{
        (async () => {
            const result = await Promise.allSettled([client.getMainLike(),client.getCommented(),client.getBanner()]);
            const [resLike,resComment,resBanner] = result.filter((res) => res.status = 'fulfilled').map((res) => res.value);
            if(resLike.code !== 1000 || resComment.code !== 1000){
                alert('잘못된 요청입니다.');
                return false;
            }
            setLikeList(resLike.result);
            setCommented(resComment.result);
            setBanner(resBanner.result);
        })()
       },[])

    const Props = {
        Banner:{
            banner
        },
        like:{
            likeList
        },
        comment:{
            commented
        }
    }

    return(
       <>
           <Banner  {...Props.Banner} />
           <Popularity {...Props.like} />
           <Ranking   {...Props.comment}/>

       </>
   )
}

export default Main;
