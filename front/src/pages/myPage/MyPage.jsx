import styled from "@emotion/styled";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import UserHttp from "../../http/userHttp";

const userHttp = new UserHttp();

function MyPage() {
    const params = useParams();
    const { userId } = params;

    const [UserInfo, setUserInfo] = useState([]);

    useEffect(()=>{
        onMypage();
        console.log(UserInfo);
    },[])

    const onMypage = async() => {

        try{
            const res = await userHttp.getMypage(userId)
            setUserInfo(res.data.result)
            console.log(res);
        }catch (err){
            console.log(err); 
        }
    }

    return (
        <>
            <Container>
                {UserInfo ?
                    <MypageBlock>
                        <div>이메일: {UserInfo.email}</div>
                        <div>이름: {UserInfo.username}</div>
                    </MypageBlock>
                :<></>
                }
            </Container>
        </>
    );
}

const Container = styled.section`
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    div {
        font-size: 64px;
    }
`;

const MypageBlock = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div{
        font-size: 40px;
        margin-bottom: 30px;
    }
`


export default MyPage;
