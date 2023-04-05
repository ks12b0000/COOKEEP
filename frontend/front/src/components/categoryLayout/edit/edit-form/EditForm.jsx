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

function EditForm() {
    const categoryHttp = new CategoryHttp();
    const writeHttp = new WriteHttp();
    //hook from 가져오기
    const {
        handleSubmit,
    } = useForm();
    //초기값 지정
    const {id} = useParams();

    const {userId} = useSelector(state => state.persistedReducer.userReducer);
    const navigate = useNavigate();


    const [categoryList,setCategoryList] = useState([]);
    const [categoryValue, setCategoryValue] = useState('한식');
    const [board,setBoard] = useState([]);
    const [boardId,setBoardId] = useState(null);
    const [title, setTitle] = useState("");
    const realTitle = title.length < 5 ? 1:0 ;
    const [tag,setTag] = useState('');
    const realTag = tag.length < 5 ? 1:0 ;


    const [footText,setFootText]  =useState('');
    const isError = footText.length < 12 ? 1 : 0;
    const [imagePreview, setImagePreview] = useState("https://w7.pngwing.com/pngs/828/705/png-transparent-jpeg-file-interchange-format-file-formats-forma-image-file-formats-text-logo.png");
    const [error, setError] = useState(false);


    const disableState = () =>{
        let isData = true;
        if(title.length >= 5 && tag.length >= 5){
            isData = false;
            return  isData;
        }

        return  isData;

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
    const onPatchSubmit = async () => {
        const FormData = {
          category:categoryValue,
          title,
          text:footText,
          user_id:userId,
          thumbnail:imagePreview,
          tags:tag
        }
       try {
           await categoryHttp.patchForm(boardId,FormData)
           alert('글 수정이 완료되었습니다.');
           navigate(-1);
       }
       catch (err){
            alert('작성한 유저가 아닙니다.')
       }
    }
    useEffect(() => {
        (async () => {
            const result = await Promise.allSettled([categoryHttp.getCategoryMenu(),categoryHttp.getBoard(id)]);
            const [categoryMenu, board] = result.filter((res) => res.status === "fulfilled").map((res) => res.value);
            if(categoryMenu.code !== 1000 || board.code !== 1000){
                alert('잘못된 요청입니다.');
                return false;
            }
            setCategoryList(categoryMenu.result);
            setBoard(board.result);
            setCategoryValue(board.result.category)
            setTitle(board.result.title);
            setTag(board.result.tags);
            setImagePreview(board.result.thumbnail);
            setFootText(board.result.text);
            setBoardId(board.result.board_id);
        })()
    },[])


    useEffect(() => {

    }, [imagePreview]);

    const imageChange = async (e) => {
        const files = e.target.files; // FileList 객체
        try {
            const { result } = await writeHttp.imgUpload({ imageFile: files[0], user_id:userId  });
            setImagePreview(result.url);
        } catch (err) {
            alert("파일 크기는 1메가로 지정되어있씁니다.");
        }
    };



    return(
        <form onSubmit={handleSubmit(onPatchSubmit)}>
            <InputBox>
                <label htmlFor="">카테고리</label>
                <select name="category" value={categoryValue} onChange={onChange}>
                    {categoryList.map((categoryName,index) => {
                        return(
                            <option value={categoryName.name} key={index} >{categoryName.name}</option>
                        )
                    })}

                </select>
            </InputBox>
            <TitleInput>
                <label htmlFor="">제목</label>
                <input  name="title" type="title" value={title}  onChange={TitleOnChange} placeholder="제목을 입력해주세요"  />
                {realTitle ? <ErrorText>최소 5자 이상입력해주세요!!</ErrorText> : null }
            </TitleInput>
            <TagInput>
                <label htmlFor="" >태그</label>
                <input  value={tag} name="tags" type="tags" onChange={TagOnChange} placeholder="원하시는 태그를 입력해주세요"/>
                {realTag ? <ErrorText>최소 5자 이상 입력해주세요!!</ErrorText> : null}
            </TagInput>
            <Upload>
                <label htmlFor="">썸네일</label>
                <InputFile htmlFor="input-file">파일 선택</InputFile>
                <input type="file" id="input-file" style={{ display: "none" }} onChange={imageChange} accept=".svg, .gif, .jpg, .png" />
                <IMGBOX>
                    <img src={imagePreview} alt={imagePreview} />
                </IMGBOX>
            </Upload>
            {error && <p style={{ color: "red" }}>이미지를 업로드!!!</p>}
            <InputBox>
                <label htmlFor="">본문</label>
                <Quill />
            </InputBox>
            <ButtonsWrap>
                <CancelButton  onClick={cancel}> <span>취소</span></CancelButton>
                <WritingButton type="submit" disabled={disableState()}>저장</WritingButton>
            </ButtonsWrap>
        </form>
    )
}
export default EditForm;
//스타일

const ErrorText = styled.span`
    position: absolute;
    bottom:-5px;
    left:20px;
    width: 100%;
    display: block;
    color:red;
    font-size: 14px;
`
const TitleInput = styled.fieldset`
  position: relative;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  border: none;
  label {
    font-size: 20px;
    font-weight: 500;
  }

  input {
    width: 100%;
    margin: 20px 0;
    padding: 20px 25px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    border-radius: 10px;
    &:focus {
      outline: none;
    }
  }
  
`
const TagInput = styled.fieldset`
  position: relative;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  border: none;
  label {
    font-size: 20px;
    font-weight: 500;
  }

  input {
    width: 100%;
    margin: 20px 0;
    padding: 20px 25px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    border-radius: 10px;
    &:focus {
      outline: none;
    }
  }
  
`
const InputBox = styled.fieldset`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    border: none;
    label {
        font-size: 20px;
        font-weight: 500;
    }

    select {
        margin: 20px 0;
        padding: 20px 25px;
        border: 1px solid #ccc;
        border-radius: 10px;
        -webkit-appearance: none; /* for chrome */
        -moz-appearance: none; /*for firefox*/
        appearance: none;
        background: url("https://i.imgur.com/e60gpgR.png") 98% / 12px no-repeat;
        cursor: pointer;
        &:focus {
            outline: none;
        }
    }
    input {
        margin: 20px 0;
        padding: 20px 25px;
        border: 1px solid #ccc;
        border-radius: 10px;
        &:focus {
            outline: none;
        }
    }
`;
const Ckedit = styled.div`
    height: 500px;
    margin-top: 20px;
`;
const ButtonsWrap = styled.div`
    display: flex;
    width: 100%;
    gap: 20px;
    justify-content: end;
`;
const CancelButton = styled.div`
    cursor: pointer;
    text-align: center;
    min-width: 100px;
    width: auto;
    height: 45px;
    line-height: 45px;
    border: 1px solid #222222;
    box-sizing: border-box;
    background: #fff;
    &[disabled]{
      background:#ccc;
      &:hover{
        background:#ccc;
      }
    }
    &:hover {
        background: #35c5f0;
        border: none;
       
    }
  
`;
const WritingButton = styled.button`
    cursor: pointer;
    min-width: 100px;
    width: auto;
    padding: 10px;
    height: 45px;
    border: 1px solid #222222;
    background: #fff;
    &[disabled]{
      background:#ccc;
      &:hover{
        background:#ccc;
      }
    }
    &:hover {
        background: #35c5f0;
        border: none;
        span {
            color: #fff;
        }
    }
    span {
        color: #222222;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 0.7px;
        font-family: "Pretendard";
    }
`;
const Upload = styled.fieldset`
    margin-top: 20px;
    display: flex;
    align-items: center;
    gap: 20px;
    border: none;
    label {
        font-size: 20px;
        font-weight: 500;
    }
`;
const IMGBOX = styled.div`
    width: 150px;
    height: 150px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
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
