import React, {useEffect, useRef, useState} from "react";
import {useMemo} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import WriteHttp from "../../../http/writeHttp";
import {useSelector} from "react-redux";
import styled from "@emotion/styled";
const Quill = ({quillValue,setQuillValue,setOptionImg,optionImg}) => {
    const { userId } = useSelector(state => state.persistedReducer.userReducer);
    const writeHttp = new WriteHttp();



    // 이미지 처리를 하는 핸들러
    const imageHandler = () => {


        // 1. 이미지를 저장할 input type=file DOM을 만든다.
        const input = document.createElement('input');
        // 속성 써주기
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
        // input이 클릭되면 파일 선택창이 나타난다.

        // input에 변화가 생긴다면 = 이미지를 선택
        input.addEventListener('change', async () => {

            const file = input.files[0];
            // multer에 맞는 형식으로 데이터 만들어준다.
            const formData = new FormData();
            formData.append('img', file); // formData는 키-밸류 구조
            // 백엔드 multer라우터에 이미지를 보낸다.
            try {
                 const maxSize = 5 * 1024 * 1024;

               if(file.size > maxSize) {
                   alert('용량이 5MB가 넘어갑니다.')
                   return false;;
               }
                const {result} = await writeHttp.imgUpload({imageFile: file, user_id:userId });

                const IMG_URL = result.url;

                setOptionImg((prevState) => {
                    return [...prevState, {url: result.url,name:file.name}]
                })

                // 이 URL을 img 태그의 src에 넣은 요소를 현재 에디터의 커서에 넣어주면 에디터 내에서 이미지가 나타난다
                // src가 base64가 아닌 짧은 URL이기 때문에 데이터베이스에 에디터의 전체 글 내용을 저장할 수있게된다
                // 이미지는 꼭 로컬 백엔드 uploads 폴더가 아닌 다른 곳에 저장해 URL로 사용하면된다.

                // 이미지 태그를 에디터에 써주기 - 여러 방법이 있다.
                const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기
                // 1. 에디터 root의 innerHTML을 수정해주기
                // editor의 root는 에디터 컨텐츠들이 담겨있다. 거기에 img태그를 추가해준다.
                // 이미지를 업로드하면 -> 멀터에서 이미지 경로 URL을 받아와 -> 이미지 요소로 만들어 에디터 안에 넣어준다.
                // editor.root.innerHTML =
                //   editor.root.innerHTML + `<img src=${IMG_URL} /><br/>`; // 현재 있는 내용들 뒤에 써줘야한다.

                // 2. 현재 에디터 커서 위치값을 가져온다
                const range = editor.getSelection();
                // 가져온 위치에 이미지를 삽입한다
                editor.insertEmbed(range.index, 'image', IMG_URL);


                // 이미지 삭제 이벤트 감지
                const imageElements = editor.getModule('toolbar').container.querySelectorAll('img');
                imageElements.forEach((img) => {
                    img.addEventListener('click', () => {
                        // 삭제된 이미지 처리
                        console.log('삭제된 이미지:', img.src);
                        // 여기서 원하는 추가 작업을 수행할 수 있습니다.
                        // 예를 들면 이미지를 서버에서 삭제하거나 다른 동작을 수행할 수 있습니다.

                        // 이미지 삭제
                        const index = Array.from(img.parentNode.childNodes).indexOf(img);
                        editor.deleteText(range.index + index, 1);
                    });

                });
            } catch (error) {
                console.log('실패했어요ㅠ');
            }
        });
    };
    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, false] }],
                    ['image','link'],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],

                ],
                handlers: {
                    image: imageHandler,
                },
            },
        };
    }, []);

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'image',
    ];
  const quillRef= useRef();


  useEffect(() =>{

  },[optionImg])



    return (
        <QuillWrap>
            <ReactQuill
                ref={quillRef}
                theme="snow"
                placeholder="플레이스 홀더"
                value={quillValue}
                onChange={setQuillValue}
                modules={modules}
                formats={formats}
            />

        </QuillWrap>
    );
};

export  default Quill

const QuillWrap = styled.div`
  border-radius: 5px;
  border: 1px solid #CED4DA;
  margin:34px 0 20px;
    .ql-editor {
      min-height: 500px;
       
    }
 
`