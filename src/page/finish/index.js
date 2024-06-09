import "../../component/input";
import sign_icon from "../../static/images/sign_icon.png";
import { useLocation, useNavigate } from "react-router-dom";

const Finish = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <div className="main">
      <section className="finish_wrap">
        <img src={sign_icon} alt="완료" />
        <h2>
          <span>입점신청</span>이 완료됐습니다!
        </h2>
        <section className="info-space">
          <div className="option-section">
            <p>지역</p>
            <p>{state.location}</p>
          </div>
          <div className="option-section">
            <p>업체명</p>
            <p>{state.companyName}</p>
          </div>
          <div className="option-section">
            <p>담당자 전화번호</p>
            <p>{state.phone}</p>
          </div>
          <div className="option-section">
            <p>담당자 통화가능 시간</p>
            <p>{state.ableTime.join(", ")}</p>
          </div>
        </section>
        <button className="finish_button" onClick={() => navigate("/")}>
          메인으로
        </button>
      </section>
    </div>
  );
};

export default Finish;
