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
import ImgList from "../../writing/writingForm/ ImgList";
import EditImgList from "../../writing/writingForm/EditImgList";
import CreatePopup from "../../writing/popup/CreatePopup";
import EditPopup from "../../writing/popup/EditPopup";
import CancelPopup from "../../writing/popup/CancelPopup";
import LoadingPopup from "../../writing/popup/LoadingPopup";
import CompletePopup from "../../writing/popup/CompletePopup";
import {mobile} from "../../../../constants/media/media";

const categoryHttp = new CategoryHttp();
const writeHttp = new WriteHttp();

function EditForm() {

    //팝업상태값
    const [isOpen,setIsOpen] =useState(false);
    const [editIsOpen,setEditIsOpen] = useState(false);
    const [isLoading,setIsLoading] =useState(false);
    const [isComplete,setIsComplete] =useState(false);


    //hook from 가져오기
    const {
        handleSubmit,
    } = useForm();
    //초기값 지정
    const {id} = useParams();
    const {userId} = useSelector(state => state.persistedReducer.userReducer);
    const navigate = useNavigate();
    const [quillValue, setQuillValue] = useState("");

    const [categoryList, setCategoryList] = useState([]);
    const [categoryError, setCategoryError] = useState(false);
    const [categoryValue, setCategoryValue] = useState('한식');

    const [board, setBoard] = useState([]);
    const [boardId, setBoardId] = useState(null);

    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState(false);
    const [tag, setTag] = useState('');


    const [imgList, setImgList] = useState(null);
    const [thum, setThum] = useState(null);

    const [footText, setFootText] = useState('');
    const [inital, setInital] = useState();
    const [optionImg, setOptionImg] = useState([]);
    const [isSelect, setIsSelect] = useState(0);

    const onCheckEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }
    const cancel = (e) => {
        setIsOpen(true)
    }
    const disableState = (e) => {
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
        setEditIsOpen(true)


    }
    //카테고리
    const onChange = (e) => {
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


    //수정
    const onPatchSubmit = async (e) => {
        e.preventDefault();
        const FormData = {
            category: categoryValue,
            title,
            text: quillValue,
            user_id: userId,
            thumbnail: isSelect,
            tags: tag
        }
        setIsLoading(true)
        setTimeout(async ()=> {
            try {
                await categoryHttp.patchForm(boardId, FormData)
                setIsComplete(true);
            } catch (err) {
                console.log(err);
            }
            setIsLoading(false);
        },3000)

    }

    useEffect(() => {
        (async () => {
            const result = await Promise.allSettled([categoryHttp.getCategoryMenu(), categoryHttp.getBoard(id)]);
            const [categoryMenu, board] = result.filter((res) => res.status === "fulfilled").map((res) => res.value);
            if (categoryMenu.code !== 1000 || board.code !== 1000) {
                alert('잘못된 요청입니다.');
                return false;
            }


            setCategoryList(categoryMenu.result);
            setBoard(board.result);
            setCategoryValue(board.result.category)
            setTitle(board.result.title);
            setTag(board.result.tags);
            setInital(board.result.thumbnail);
            setQuillValue(board.result.text);
            setBoardId(board.result.board_id);
            setIsSelect(board.result.thumbnail);
            setImgList(board.result.imageResponses);
            setThum(board.result.thumbnail);
        })()
    }, [])


    useEffect(() => {

    }, [optionImg]);

    const newArray = [imgList, {url: thum}];


    const Props = {
        quillValue,
        setQuillValue,
        setOptionImg,
        optionImg,

        imgList: {
            optionImg,
            setIsSelect,
            isSelect,
            inital,
            newArray
        },
        Cancel:{
            setOpenModal:() => setIsOpen(false),
            body:{
                text:'글 수정을 취소하겠습니까?',
                icon:(
                    <img src={`${process.env.PUBLIC_URL}/image/modal-icon.png`} alt=""/>
                ),
                subText:(
                    <>
                        글 수정을 취소하시면 <br/>
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
            <form onKeyPress={onCheckEnter}>
                <Title>글 수정하기</Title>
                <InputBox categoryError ={categoryError} titleError={titleError}>
                    <select name="category" value={categoryValue} onChange={onChange}>
                        <option value="카테고리" disabled>카테고리</option>
                        {categoryList.map((categoryName, index) => {
                            return (
                                <option value={categoryName.name} key={index}>{categoryName.name}</option>
                            )
                        })}
                    </select>
                    {categoryError && <ErrorText><img src={`${process.env.PUBLIC_URL}/image/error.png`} alt="err"/>카테고리를
                        선택해주세요.</ErrorText>}
                    <TitleInput>
                        <input name="title" type="text" placeholder="제목을 입력해주세요" value={title}
                               onChange={TitleOnChange}/>
                        {titleError &&
                            <ErrorText><img src={`${process.env.PUBLIC_URL}/image/error.png`} alt="err"/>최소 5자 이상 입력해주세요
                                !! </ErrorText>}
                    </TitleInput>
                </InputBox>
                <QuillBox>
                    <Quill  {...Props}/>
                </QuillBox>
                <TagInput>
                    <input value={tag} name="tags" type="tags" onChange={TagOnChange} placeholder="#태그"/>
                </TagInput>

                <EditImgList {...Props.imgList}/>
                <ButtonsWrap>
                    <CancelButton onClick={cancel}> <span>취소</span></CancelButton>
                    <WritingButton  onClick={disableState}>저장</WritingButton>
                </ButtonsWrap>
            </form>
            {isOpen && <CancelPopup {...Props}/> }
            {editIsOpen && <EditPopup setCreateIsOpen={setEditIsOpen} onSubmit={onPatchSubmit}/>}
            {isLoading && <LoadingPopup /> }
            {isComplete && <CompletePopup category={categoryValue} sentence={'수정이 완료되었습니다.'} />}
        </>
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
  ${mobile}{

    font-size: 18px;
  }
`

const QuillBox = styled.div`


  .quill {


    .ql-toolbar.ql-snow {
      border: none;

      .ql-picker-label {
        color: #CED4DA;

      }
    }

    .ql-container.ql-snow {
      border: none;
    }

    .ql-snow .ql-stroke {
      stroke: #CED4DA;

    }

    .ql-snow .ql-fill, .ql-snow .ql-stroke.ql-fill {
      stroke: #CED4DA;
      fill: #CED4DA;
    }

    .ql-editor.ql-blank::before {
      color: #CED4DA;
    }
  }

`
const ErrorText = styled.span`
  display: flex;
  align-items: center;
  gap:2px;
  position: absolute;
  bottom: -20px;
  left: 5px;
  width: 100%;
  color: red;
  font-size: 14px;
  
  
`
const TitleInput = styled.div`
  width: 100%;
  position: relative;

  input {
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

    &::placeholder {
      font-weight: 400;
      font-size: 16px;
      line-height: 23px;
      color: #CED4DA;
    }

    &:focus {
      outline: none;
      box-shadow: none;
      border: 1px solid #FFA590;
    }
  }

`
const InputBox = styled.fieldset`
  position: relative;
  margin-top: 24px;
  display: flex;
  gap: 24px;
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
      border: 1px solid #FFA590;
    }
  }
`;

const ButtonsWrap = styled.div`
  margin-top: 42px;
  display: flex;
  width: 100%;
  gap: 20px;
  justify-content: end;
  ${mobile} {
    margin-top: 30px;
    justify-content: space-between;
  }
`;
const CancelButton = styled.div`
  cursor: pointer;
  text-align: center;
  width: 130px;
  height: 48px;
  line-height: 48px;
  border: 1px solid #FF4122;;
  border-radius: 5px;
  font-weight: 600;
  font-size: 16px;
  box-sizing: border-box;
  color: #FF4122;

  ${mobile} {
    width: 165px;
  }
  &:hover {

    background: red;
    color: #ffffff;
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
  border: none;
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;

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
