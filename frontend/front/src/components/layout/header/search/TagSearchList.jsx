import styled from "@emotion/styled";

function TagSearchList() {
    return (
        <List>
            <div>
                <li>tags</li>
                <li>tags</li>
                <li>tags</li>
                <li>tags</li>
                <li>tags</li>
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

export default TagSearchList;