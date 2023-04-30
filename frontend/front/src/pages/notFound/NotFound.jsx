import styled from '@emotion/styled';
import Layout from '../../components/layout/Layout';


const NotFound = () => {
   return (
    <Layout>
         <Wrap>
            <ContentsWrap>
               <Img src='/image/notfound.png' />
               <Text>존재하지 않는 페이지 입니다.</Text>
            </ContentsWrap>
      </Wrap>
   </Layout>
 )
}

const Wrap = styled.div`
   width: 100vw;
   height: 84vh;
   display: flex;
   justify-content: center;
   align-items: center;
   padding-bottom: 40px;
   box-sizing: border-box;
`

const ContentsWrap = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
`

const Img = styled.img`
   margin-bottom: 15px;
`

const Text = styled.div`
   font-size: 18px;
   font-weight: 700;
`
export default NotFound;