import {useState} from "react";

function My() {
    const[diary, setDiary] = useState(null);
    const name = localStorage.getItem("name");
    const user_id = localStorage.getItem("user_id");



    return(
        <div>
            <div>
                <div>
                    <div>프로필</div>
                    <div>
                        <span>{name}</span>
                        <span>#{user_id}</span>
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <div>감사일기</div>
                    <div></div>
                </div>
                <div>여기가 커밋</div>

                <div>
                    <div>후회일기</div>
                    <div></div>
                </div>
                <div>여기가 커밋</div>
            </div>

            <div>
                <div>로그아웃</div> 
                <img />
            </div>
        </div>
    )
}
export default My;