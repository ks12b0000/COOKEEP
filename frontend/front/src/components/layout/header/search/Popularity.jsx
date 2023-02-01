import styled from "@emotion/styled";

function Popularity() {
    return (
        <List>
            <div>
                <li>두번째리스트</li>
                <li>두번째리스트</li>
                <li>두번째리스트</li>
                <li>두번째리스트</li>
                <li>두번째리스트</li>

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

export default Popularity;