import styled from "@emotion/styled";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {useState} from "react";
import {useEffect} from "react";
import CategoryHttp from "../../../../http/categoryHttp";
import WriteHttp from "../../../../http/writeHttp";
import {useParams} from "react-router-dom";
import Quill from "../../writing/Quill";
const categoryHttp = new CategoryHttp();
const writeHttp = new WriteHttp();
function EditForm() {

    //hook from 가져오기
    const {
        handleSubmit,
    } = useForm();
    //초기값 지정
    const {id} = useParams();

    const {userId} = useSelector(state => state.persistedReducer.userReducer);
    const navigate = useNavigate();
    const [quillValue,setQuillValue] = useState("안녕");

    const [categoryList,setCategoryList] = useState([]);
    const [categoryError,setCategoryError] = useState(false);
    const [categoryValue, setCategoryValue] = useState('한식');

    const [board,setBoard] = useState([]);
    const [boardId,setBoardId] = useState(null);

    const [title, setTitle] = useState("");
    const [titleError,setTitleError] = useState(false);
    const [tag,setTag] = useState('');



    const [footText,setFootText]  =useState('');

    const [imagePreview, setImagePreview] = useState("https://w7.pngwing.com/pngs/828/705/png-transparent-jpeg-file-interchange-format-file-formats-forma-image-file-formats-text-logo.png");
    const [error, setError] = useState(false);

    const onCheckEnter = (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
        }
    }

    const disableState = () =>{


    }
    //카테고리
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
        e.preventDefault();
       navigate(-1)
    }
    //수정
    const onPatchSubmit = async (e) => {
        e.preventDefault();
        const FormData = {
          category:categoryValue,
          title,
          text:footText,
          user_id:userId,
          thumbnail:imagePreview,
          tags:tag
        }
        console.log(FormData)
       // try {
       //     // await categoryHttp.patchForm(boardId,FormData)
       //     // alert('글 수정이 완료되었습니다.');
       //     // navigate(-1);
       // }
       // catch (err){
       //      alert('작성한 유저가 아닙니다.')
       // }
    }
    useEffect(() => {
        (async () => {
            const result = await Promise.allSettled([categoryHttp.getCategoryMenu(),categoryHttp.getBoard(id)]);
            const [categoryMenu, board] = result.filter((res) => res.status === "fulfilled").map((res) => res.value);
            if(categoryMenu.code !== 1000 || board.code !== 1000){
                alert('잘못된 요청입니다.');
                return false;
            }

            console.log(board)
            setCategoryList(categoryMenu.result);
            setBoard(board.result);
            setCategoryValue(board.result.category)
            setTitle(board.result.title);
            setTag(board.result.tags);
            setImagePreview(board.result.thumbnail);
            setQuillValue(board.result.text);
            setBoardId(board.result.board_id);
        })()
    },[])


    useEffect(() => {

    }, [imagePreview]);

    const imageChange = async (e) => {
        const files = e.target.files; // FileList 객체
        console.log(files[0]);
        try {
            const { result } = await writeHttp.imgUpload({ imageFile: files[0], user_id:userId  });
            setImagePreview(result.url);
        } catch (err) {
            alert("파일 크기는 1메가로 지정되어있씁니다.");
        }
    };


    const Props = {
        quillValue,
        setQuillValue,



    }
    return(
        <form onKeyPress={onCheckEnter} >
            <Title>글 수정하기</Title>
            <InputBox>
                <select name="category" value={categoryValue} onChange={onChange} >
                    <option value="카테고리" disabled >카테고리</option>
                    {categoryList.map((categoryName,index) => {
                        return(
                            <option value={categoryName.name} key={index} >{categoryName.name}</option>
                        )
                    })}
                </select>
                {categoryError &&  <ErrorText><img src={`${process.env.PUBLIC_URL}/image/error.png`} alt="err"/>카테고리를 선택해주세요.</ErrorText> }
                <TitleInput>
                    <input name="title" type="text" placeholder="제목을 입력해주세요"   value={title}  onChange={TitleOnChange}  />
                    {titleError && <ErrorText><img src={`${process.env.PUBLIC_URL}/image/error.png`} alt="err"/>최소 5자 이상 입력해주세요 !! </ErrorText> }
                </TitleInput>
            </InputBox>
            <QuillBox>
                <Quill  {...Props}/>
            </QuillBox>
            <TagInput>
                <input  value={tag} name="tags" type="tags" onChange={TagOnChange} placeholder="#태그"/>

            </TagInput>
            <Upload>

                <InputFile htmlFor="input-file">썸네일을 등록해주세요</InputFile>
                <input type="file" id="input-file" style={{ display: "none" }} onChange={imageChange} accept=".svg, .gif, .jpg, .png" />

                {error && <ErrorText style={{ color: "red" }}><img src={`${process.env.PUBLIC_URL}/image/error.png`} alt="err"/>썸네일을 등록해주세요</ErrorText>}
            </Upload>

            <ButtonsWrap>
                <CancelButton  onClick={cancel}> <span>취소</span></CancelButton>
                <WritingButton  disabled={disableState()} onClick={(e) => onPatchSubmit(e)}>저장</WritingButton>
            </ButtonsWrap>
        </form>
    )
}
export default EditForm;
//스타일
const Title = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: #ED3419;
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
const ErrorText = styled.span`
    position: absolute;
    bottom:-5px;
    left:20px;
    width: 100%;
    display: block;
    color:red;
    font-size: 14px;
`
const TitleInput = styled.div`
  width: 100%;
  position: relative;
  input{
    width: 100%;
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
const InputBox = styled.fieldset`
  position: relative;
  margin-top: 24px;
  display: flex;
  gap:24px;
  flex-direction: row;
  border: none;
  label {
    font-size: 20px;
    font-weight: 500;
  }

  select {

    width: 137px;
    height: 48px;
    box-sizing: border-box;
    border: 1px solid #CED4DA;
    padding:12px;
    border-radius: 5px;
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    -webkit-appearance: none; /* for chrome */
    -moz-appearance: none; /*for firefox*/
    appearance: none;
    background: url('https://i.imgur.com/Adb9Pdi.png') 90% / 12px no-repeat;
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
    border: 1px solid #CED4DA;
    border-radius: 5px;
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;

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

const ButtonsWrap = styled.div`
  margin-top:42px;
  display: flex;
  width: 100%;
  gap: 20px;
  justify-content: end;
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

  &:hover {
    background: red;
    border: none;
    span {
      color: #fff;
    }
  }

`;
const Upload = styled.fieldset`
  position: relative;
  margin-top: 34px;
  display: flex;
  align-items: center;
  gap: 20px;
  border: none;
  label {
    display: flex;
    align-items: center;
    padding:12px;
    width: 250px;
    box-sizing: border-box;
    height: 48px;
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    color: #CED4DA;

  }
`;


const InputFile = styled.label`
    font-size: 16px !important;
    padding: 6px 25px;
    border: 1px solid #ccc;
    color: #aaa;
    border-radius: 4px;
    cursor: pointer;
`;
