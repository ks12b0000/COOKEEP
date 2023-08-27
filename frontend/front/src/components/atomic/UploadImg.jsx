import styled from "@emotion/styled";
import {mobile} from '../../constants/media/media';

function UploadImg({img,onClick,imgIndex}){
    return (
        <>
            <Title>{img.length >= 2  && '이미지를선택해주세요'}</Title>
            <Upload>
                {img.map((item,index) => {
                    return <div key={index} onClick={()=>onClick(index)} className={imgIndex === index && 'on'}><img src={item.url} alt="게시글 이미지"/></div>
                })}
            </Upload>
        </>

    )
}
export default UploadImg;
const Title =styled.h2`
  margin:20px 0 10px;
  font-size: 14px;
  font-weight: 700;
  color:red;
  
  ${mobile} {
    margin:20px 0 5px;
  }
`
const Upload = styled.div`
 
  width: 100%;
  display: flex;
  gap:15px;
  >div{
    cursor: pointer;
    width: 25%;
    height: 300px;
    padding:30px;
    box-sizing:border-box ;
    border:1px solid #FFA590;

    border-radius: 5px;
    &.on {
      background:#FFA590;
    }
    
    img{
       width: 100%;
      height:100%;
      object-fit: contain;
    }
  }
`