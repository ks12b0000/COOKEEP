import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Buttons from "../../../buttons/Buttons";
import {useNavigate} from "react-router";
import styled from "@emotion/styled";
import Axios from "../../../../http/http";
import {useState,useEffect} from "react";


const InputBox =styled.fieldset`
    margin-top:20px;
    display: flex;
    flex-direction: column;
    border:none;
    label{
      font-size: 20px;
      font-weight: 500;
    }
  
    select{
      margin:20px 0;
      padding:20px 25px;
      border:1px solid #ccc;
      border-radius: 10px;
      -webkit-appearance:none; /* for chrome */
      -moz-appearance:none; /*for firefox*/
      appearance:none;
      background: url("https://i.imgur.com/e60gpgR.png") 98% / 12px no-repeat;
      cursor: pointer;
      &:focus {outline: none;}
      
    }
    input{
      margin:20px 0;
      padding:20px 25px;
      border:1px solid #ccc;
      border-radius: 10px;
      &:focus {outline: none;}
    
    
    }
`

const Upload = styled.fieldset`
     margin-top:20px;
     display: flex;
     align-items: center;
     gap:20px;
     border:none;
     label{
        font-size: 20px;
        font-weight: 500;
     }
  
`
const InputFile = styled.label`
     font-size: 16px !important;
     padding: 6px 25px;
     border:1px solid #ccc;
     color:#aaa;
     border-radius: 4px;
     cursor: pointer;

`
const Ckedit = styled.div`
     height: 500px;
     margin-top:20px;
`
const ButtonsWrap = styled.div`
     display: flex;
     width: 100%;
     gap:20px;
     justify-content: end;
`


function WritingForm(){

    const navigate =useNavigate();
    const [category,setCategory] = useState("");
    const [title,setTitle] = useState("");
    const [text,setText] = useState(``);
    const [userId,setUserId] = useState(5);


    const submit = () =>{
        let data = {
            category:category,
            title:title,
            text:text,
            user_id:userId
        }
        Axios.post('auth/board/write',data);

    }
    return(
        <>
            <InputBox>
                <label htmlFor="">카테고리</label>
                <select name="" id="" onChange={(e) => setCategory(e.currentTarget.value)}>
                    <option value="카테고리1" >카테고리1</option>
                    <option value="카테고리2" > 카테고리2</option>
                </select>

            </InputBox>
            <InputBox>
                <label htmlFor="">제목</label>
                <input type="text" placeholder="제목을 입력해주세요" onChange={(e) => setTitle(e.currentTarget.value) }/>
            </InputBox>
            <Upload>
                <label htmlFor="">썸네일</label>
                <InputFile htmlFor="input-file">파일 선택</InputFile>
                <input type="file" id="input-file" style={{display:"none"}} />
            </Upload>
            <InputBox>
                <label htmlFor="">본문</label>
                <Ckedit>
                    <CKEditor
                        editor={ ClassicEditor }
                        data=""
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        config={{

                            placeholder: "글을 입력해보세요!",
                        }}
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            setText(data.replace((/<[^>]*>?/g),""));

                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                    />
                </Ckedit>
            </InputBox>
            <ButtonsWrap>
                <Buttons text="취소" event={() => navigate(-1)} />
                <Buttons text="등록" event={submit} />
            </ButtonsWrap>


        </>
    )
}
export default WritingForm;