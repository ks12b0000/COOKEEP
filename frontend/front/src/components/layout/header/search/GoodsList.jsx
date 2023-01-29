import styled from "@emotion/styled";

function GoodsList() {
    return (
        <List>
            <div>
                <li>강남역</li>
                <li>무슨역</li>
                <li>지구역</li>
                <li>지구역</li>
                <li>지구역</li>
                <li>지구역</li>
            </div>
        </List>
    )
}


const List  = styled.div`
    width: 100%;
    height: 200px;
    overflow-y: scroll;
    >div{
      height: 50px;
      >li{
        padding:1.5em;
        color:#333;
        border-bottom: 1px solid #ccc;
         
    }
  `

export default GoodsList;