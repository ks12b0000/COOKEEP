
import { useNavigate } from "react-router";

import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import WriteHttp from "../../../../http/writeHttp";
import CategoryHttp from "../../../../http/categoryHttp";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import Quill from "../Quill";
import {mobile} from "../../../../constants/media/media";
import CancelPopup from "../popup/CancelPopup";
import CreatePopup from "../popup/CreatePopup";
import LoadingPopup from "../popup/LoadingPopup";
import CompletePopup from "../popup/CompletePopup";
import UploadImg from "../../../atomic/UploadImg";
import ImgList from "./ ImgList";



const writeHttp = new WriteHttp();
const categoryHttp = new CategoryHttp();

function WritingForm() {


    //hook from 가져오기
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    //초기값 지정
    const { category } = useParams();

    const { userId } = useSelector(state => state.persistedReducer.userReducer);
    const [isOpen,setIsOpen] = useState(false);
    const [createIsOpen,setCreateIsOpen] = useState(false);
    const [isLoading,setIsLoading] =useState(false);
    const [isComplete,setIsComplete] =useState(false);

    const navigate = useNavigate();
    const [categoryList,setCategoryList] = useState([]);
    const [categoryValue, setCategoryValue] = useState('카테고리');
    const [categoryError,setCategoryError] = useState(false);

    const [quillValue,setQuillValue] = useState();
    const [title, setTitle] = useState("");
    const [titleError,setTitleError] = useState(false);
    const [tag,setTag] = useState('');
    const [tagError,setTagError] = useState(false);
    const [imagePreview, setImagePreview] = useState([]);
    const [imgIndex,setImgIndex] =useState(0);
    const [error, setError] = useState(false);

    const [optionImg,setOptionImg] = useState([]);
    const [isSelect,setIsSelect] = useState(0);



    const onCheckEnter = (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
        }
    }
    const onChange = (e) =>{
        setCategoryValue(e.target.value);
    }

    //타이틀
    const TitleOnChange = (e) => {
        setTitle(e.target.value);
    }
    //태그
    const TagOnChange = (e) => {
        setTag(e.target.value);
    }
    //취소
    const cancel = (e) => {
        setIsOpen(true)
        // navigate(-1)
    }

    useEffect(() => {
        (async () => {
           try {
               const res = await categoryHttp.getCategoryMenu();
               setCategoryList(res.result);
           } catch (err){
               console.log(err);
           }
        })()
    },[])
    useEffect(() => {

    }, [imagePreview]);




    const ImgSelect = (index) => {
        setImgIndex(index);
    }

    const onSubmit =  () => {
        const FormData = {
            category:categoryValue,
            title,
            text:quillValue,
            user_id:userId,
            thumbnail:isSelect,
            tags:tag
        }
        setIsLoading(true)
         setTimeout(async ()=> {
             try {
                 await writeHttp.submitWritingForm(FormData, { headers: { "Content-Type": "multipart/form-data" } });
                 setIsComplete(true);

             } catch (err) {
                 console.log(err);
             }
             setIsLoading(false);
         },2000)


    };
   const CreateOpen = (e) => {
       e.preventDefault();

       if(categoryValue === "카테고리") {
           alert('카테고리를 선택해주세요');
           setCategoryError(true)
           return  false;
       }else{
           setCategoryError(false);
       }

       if (title.length < 5 ) {
           alert('제목 최소 5자 이상 입력해주세요');
           setTitleError(true);
           return false;
       }else{
           setTitleError(false);
       }




       if( isSelect === 0 || isSelect === '0') {
           alert('썸네일을 둥록과 내용을 입력해주세요');
           setError(true)
           return false;
       }
       else{
           setError(false);
       }

       setCreateIsOpen(true);
   }

    const Props = {
        quillValue,
        setQuillValue,
        setOptionImg,
        error,
        optionImg,
        Cancel:{
            setOpenModal:() => setIsOpen(false),
            body:{
                text:'글쓰기 등록을 취소하겠습니까?',
                icon:(
                    <img src={`${process.env.PUBLIC_URL}/image/modal-icon.png`} alt=""/>
                ),
                subText:(
                    <>
                        글쓰기 등록을 취소하시면 <br/>
                        작성하신 내용이 전부 삭제됩니다.
                    </>
                ),
            },
            buttons:{
                btn:[
                    {
                        text:'취소',
                        onClick:() => setIsOpen(false)
                    },
                    {
                        text:'확인',
                        onClick:() => navigate(-1),
                    },
                ]
            }
        },


    }


    return (
        <>
            <form  onKeyPress={onCheckEnter}  >
                <Title>글쓰기</Title>
                <InputBox categoryError ={categoryError} titleError={titleError}>
                    <select  name="category" value={categoryValue} onChange={onChange}  >
                        <option value="카테고리" disabled >카테고리</option>
                        {categoryList.map((categoryName,index) => {
                            return(
                                <option value={categoryName.name} key={index} >{categoryName.name}</option>
                            )
                        })}
                    </select>
                    {categoryError &&  <ErrorText><img src={`${process.env.PUBLIC_URL}/image/error.png`} alt="err"/>카테고리를 선택해주세요.</ErrorText> }
                     <TitleInput>
                      <input name="title" type="text" placeholder="제목을 입력해주세요"   value={title}  onChange={TitleOnChange} titleError ={titleError} />
                      {titleError && <ErrorText><img src={`${process.env.PUBLIC_URL}/image/error.png`} alt="err"/>최소 5자 이상 입력해주세요 !! </ErrorText> }
                     </TitleInput>
                </InputBox>
                <QuillBox>
                    <Quill  {...Props}/>

                </QuillBox>
                <TagInput>
                    <input  value={tag} name="tags" type="tags" onChange={TagOnChange} placeholder="#태그"/>
                </TagInput>

                <ImgList optionImg={optionImg}  setIsSelect={setIsSelect} isSelect={isSelect}/>
                <IMgWrap>
                    {imagePreview && <UploadImg img={imagePreview} onClick={ImgSelect} imgIndex={imgIndex}/>}
                </IMgWrap>
                <ButtonsWrap>
                    <CancelButton onClick={cancel}>취소</CancelButton>
                    <WritingButton onClick={CreateOpen} >등록</WritingButton>
                </ButtonsWrap>

            </form>

            {isOpen && <CancelPopup {...Props}/> }
            {createIsOpen && <CreatePopup setCreateIsOpen={setCreateIsOpen} onSubmit={onSubmit} /> }
            {isLoading && <LoadingPopup /> }
            {isComplete && <CompletePopup category={category} sentence={'등록이 완료되었습니다.'} />}

        </>

    );
}


export default WritingForm;

const InputBox = styled.fieldset`
    position: relative;
    margin-top: 24px;
    display: flex;
    gap:24px;
    flex-direction: row;
    border: none;
   ${mobile} {
     margin-top: 12px;
     flex-direction: column;
   }
    label {
        font-size: 20px;
        font-weight: 500;
    }

    select {
        background: ${props => (props.categoryError ? '#FFEAE4  url(\'https://i.imgur.com/Adb9Pdi.png\') 90% / 12px no-repeat;': ' url(\'https://i.imgur.com/Adb9Pdi.png\') 90% / 12px no-repeat;')};
        width: 137px;
        height: 48px;
        box-sizing: border-box;
        border: ${props =>  (props.categoryError ?' 1px solid  #E52F2F' :  '1px solid #CED4DA') }; 
        padding:12px;
        border-radius: 5px;
        font-weight: 400;
        font-size: 16px;
        line-height: 23px;
      -webkit-appearance: none; /* for chrome */
        -moz-appearance: none; /*for firefox*/
        appearance: none;
        cursor: pointer;
        &:focus {
            outline: none;
        }
        
   
      
    }
    input {
      height: 48px;
      flex-grow: 1;
      box-sizing: border-box;
      padding: 10px 12px;
      border: ${props => props.titleError ?' 1px solid  #E52F2F' :  '1px solid #CED4DA'};
      border-radius: 5px;
      font-weight: 400;
      font-size: 16px;
      line-height: 23px;
      background:${props => props.titleError ? '#FFEAE4 ' : '#fff'};
     
      &::placeholder {
        color: #CED4DA;
      }
      &:focus {
         outline: none;
         box-shadow: none;
        border:1px solid #FFA590;
        }
    }
`;
const IMgWrap = styled.div`

`

const TitleInput = styled.div`
  width: 100%;
  position: relative;
  input{
    width: 100%;
  }
`
const Title = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: #ED3419;
  
  ${mobile}{
  
    font-size: 18px;
  }
`
const ErrorText = styled.div`
    position: absolute;
    top:52px;
    left:0;
    width: 100%;
    display: flex;
    align-items: center;
    gap:4px;
    font-size: 12px;
    line-height: 14px;
    color: #E62F2F;
    img{
      width: 12px;
      height: 12px;
    }

`
const QuillBox = styled.div`
    
  
   .quill {
    
     
     .ql-toolbar.ql-snow{
       border:none;
       .ql-picker-label{
         color:#CED4DA;
        
       }
     }
     .ql-container.ql-snow{
       border:none;
     }

     .ql-snow .ql-stroke{
       stroke:#CED4DA;
     
     }
     .ql-snow .ql-fill, .ql-snow .ql-stroke.ql-fill{
       stroke:#CED4DA;
       fill:#CED4DA;
     }
     .ql-editor.ql-blank::before{
       color:#CED4DA;
     }
   }

`
const TagInput = styled.fieldset`
  position: relative;

  display: flex;
  flex-direction: column;
  border: none;
  label {
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    color: #CED4DA;
  }

  input {
    padding: 10px 12px;
    box-sizing: border-box;
    width: 250px;
    height: 48px;
    border: 1px solid #CED4DA;
    border-radius: 5px;
    &::placeholder{
      font-weight: 400;
      font-size: 16px;
      line-height: 23px;
      color: #CED4DA;
    }

    &:focus {
      outline: none;
      box-shadow: none;
      border:1px solid #FFA590;
    }
  }
  
`


const ButtonsWrap = styled.div`
    margin-top:42px;
    display: flex;
    width: 100%;
    gap: 20px;
    justify-content: end;
  ${mobile} {
    justify-content: space-between;
  }
`;
const CancelButton = styled.div`
  cursor: pointer;
  text-align: center;
  width: 130px;
  height: 48px;
  line-height: 48px;
  border:1px solid #FF4122;;
  border-radius: 5px;
  font-weight: 600;
  font-size: 16px;
  box-sizing: border-box;
  color:#FF4122;
  
  ${mobile} {
    width: 165px;
  }
    &:hover {
    
        background: red;
        color:#ffffff;
        border: none;
       
    }
  
`;
const WritingButton = styled.button`
  cursor: pointer;
  width: 130px;
  height: 48px;
  line-height: 48px;
  background: #FF4122;
  border-radius: 5px;
  border:none;
  font-weight: 600;
  font-size: 16px;
  color:#ffffff;
  ${mobile} {
    width: 165px;
  }
    &:hover {
        background: red;
        border: none;
        span {
            color: #fff;
        }
    }
   
`;
