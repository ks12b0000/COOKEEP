import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from "react-router";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
<<<<<<< HEAD
import WriteHttp from "../../../../http/writeHttp";
import {useSelector} from "react-redux";
const writeHttp = new WriteHttp();
function WritingForm() {
    //hook from 가져오기
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const {userId} = useSelector(state => state.persistedReducer.userReducer);
    const navigate = useNavigate();
    const [text, setText] = useState("");
    const [isError, setIsError] = useState(false);
    const [imagePreview, setImagePreview] = useState("https://w7.pngwing.com/pngs/828/705/png-transparent-jpeg-file-interchange-format-file-formats-forma-image-file-formats-text-logo.png");
    const [error, setError] = useState(false);

    const imageChange = async (e) => {
        const files = e.target.files; // FileList 객체
        try {
            const { result } = await writeHttp.imgUpload({ imageFile: files[0], user_id: 5 });
            setImagePreview(result.url);
        } catch (err) {
            alert("파일 크기는 1메가로 지정되어있씁니다.");
        }
    };
    useEffect(() => {
        imagePreview === "https://w7.pngwing.com/pngs/828/705/png-transparent-jpeg-file-interchange-format-file-formats-forma-image-file-formats-text-logo.png" ? setError(true) : setError(false);
    }, [imagePreview]);

    const onSubmit = async (data) => {
        data.user_id = userId;
        if (text.length < 5) {
            setIsError(true);
            return 0;
        } else {
            setIsError(false);
        }
        data.text = text;
        data.thumbnail = imagePreview;
        console.log(data);
        if (error) {
            alert("이미지를 업로드해주세요");
            return false;
        }
        try {
            const { code } = await writeHttp.submitWritingForm(data, { headers: { "Content-Type": "multipart/form-data" } });
            alert("글 작성이 완료되었습니다.");
            navigate("/category1");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputBox>
                    <label htmlFor="">카테고리</label>
                    <select name="category" defaultValue="category1" {...register("category")}>
                        ><option value="카테고리1">카테고리1</option>
                        <option value="카테고리3">카테고리3</option>
                    </select>
                </InputBox>
                <InputBox>
                    <label htmlFor="">제목</label>
                    <input name="title" type="text" placeholder="제목을 입력해주세요" {...register("title", { required: true, minLength: 5 })} />
                    {errors.title && <p style={{ color: "red", padding: " 0 20px" }}>최소 5자리를 입력해주세요</p>}
                </InputBox>
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
                    <Ckedit>
                        <CKEditor
                            name="ckeditor"
                            editor={ClassicEditor}
                            data=""
                            config={{
                                placeholder: "글을 입력해보세요!"
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setText(data);
                                text.length < 5 ? setIsError(true) : setIsError(false);
                            }}
                            required
                        />
                        {isError && <p style={{ color: "red", padding: " 10px 20px" }}>최소 5자리를 입력해주세요</p>}
                    </Ckedit>
                </InputBox>
                <ButtonsWrap>
                    <WritingButton onClick={() => navigate(-1)}>취소</WritingButton>
                    <WritingButton type="submit">등록</WritingButton>
                </ButtonsWrap>
            </form>
        </>
    );
}
=======
import CategoryHttp from "../../../../http/categoryHttp";
import axios from "axios";
>>>>>>> c895c0ef131ad3c7e020e886707b505ecbb5cbed

//스타일
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
<<<<<<< HEAD
=======

>>>>>>> c895c0ef131ad3c7e020e886707b505ecbb5cbed
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
const WritingButton = styled.button`
    cursor: pointer;
    min-width: 100px;
    width: auto;
    padding: 10px;
    height: 45px;
    border: 1px solid #222222;
    background: #fff;

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
<<<<<<< HEAD
=======
const categoryHttp = new CategoryHttp();
function WritingForm() {
    //hook from 가져오기
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const navigate = useNavigate();
    const [text, setText] = useState("");
    const [isError, setIsError] = useState(false);
    const [imagePreview, setImagePreview] = useState("https://w7.pngwing.com/pngs/828/705/png-transparent-jpeg-file-interchange-format-file-formats-forma-image-file-formats-text-logo.png");
    const [error, setError] = useState(false);

    const imageChange = (e) => {
        const files = e.target.files; // FileList 객체
        if (files[0].size > 65000) {
            alert("파일 크기 5메가 이상은안됩니다 ");
            return false;
        }
        let formData = {
            imageFile: files[0],
            user_id: 5
        };
        // const fileReader = new FileReader();
        // fileReader.readAsDataURL(files[0]);
        // fileReader.onload = function (e) {
        //     setImagePreview(e.currentTarget.result);
        // };
        axios
            .post("https://www.teamprojectvv.shop/image/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        // setImagePreview(URL.createObjectURL(files[0]));
    };
    useEffect(() => {
        imagePreview === "" ? setError(true) : setError(false);
    }, [imagePreview]);

    const onSubmit = async (data) => {
        data.user_id = 5;
        if (text.length < 5) {
            setIsError(true);
            return 0;
        } else {
            setIsError(false);
        }
        data.text = text;
        data.thumbnail = imagePreview;
        if (error) {
            alert("빈칸 없이 전부 입력해주세요 !!");
            return false;
        }
        try {
            // const { code } = await categoryHttp.submitWritingForm(data, {
            //     headers: {
            //         "Content-Type": "multipart/form-data"
            //     }
            // });
            alert("글 작성이 완료되었습니다.");
            navigate("/category1");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputBox>
                    <label htmlFor="">카테고리</label>
                    <select name="category" defaultValue="category1" {...register("category")}>
                        ><option value="카테고리1">카테고리1</option>
                        <option value="카테고리3">카테고리3</option>
                    </select>
                </InputBox>
                <InputBox>
                    <label htmlFor="">제목</label>
                    <input name="title" type="text" placeholder="제목을 입력해주세요" {...register("title", { required: true, minLength: 5 })} />
                    {errors.title && <p style={{ color: "red", padding: " 0 20px" }}>최소 5자리를 입력해주세요</p>}
                </InputBox>
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
                    <Ckedit>
                        <CKEditor
                            name="ckeditor"
                            editor={ClassicEditor}
                            data=""
                            config={{
                                placeholder: "글을 입력해보세요!"
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setText(data.replace(/<[^>]*>?/g, "").replace(/\s/g, ""));
                                text.length < 5 ? setIsError(true) : setIsError(false);
                            }}
                            required
                        />
                        {isError && <p style={{ color: "red", padding: " 10px 20px" }}>최소 5자리를 입력해주세요</p>}
                    </Ckedit>
                </InputBox>
                <ButtonsWrap>
                    <WritingButton onClick={() => navigate(-1)}>취소</WritingButton>
                    <WritingButton type="submit">등록</WritingButton>
                </ButtonsWrap>
            </form>
        </>
    );
}
>>>>>>> c895c0ef131ad3c7e020e886707b505ecbb5cbed
export default WritingForm;
