import "../../component/input";
import { useEffect, useState } from "react";
import InputArea from "../../component/input";
import { useNavigate } from "react-router-dom";
import { cities, mkRoutes, radioOptions } from "../../static/constants";

/**
 * Main 컴포넌트
 * @returns {JSX.Element} Main 컴포넌트
 */
const Main = () => {
  const navigate = useNavigate();
  const [emptyColumns, setEmptyColumns] = useState([]);
  const [formValue, setFormValue] = useState({
    location: "",
    companyName: "",
    phone: "",
    ableTime: [],
    contents: "",
    routes: [],
    privacyAgree: [{ key: 0, value: "true" }],
  });

  /**
   * 입력값 핸들링을 위해
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - 입력 이벤트
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  /**
   * 폼 제출 핸들러
   */
  const onSubmit = () => {
    const valueModified = {
      ...formValue,
      ableTime: formValue["ableTime"].map((e) => e.value),
      routes: formValue["routes"].map((e) => e.value),
      privacyAgree: true,
    };
    navigate("/finish", { state: valueModified });
  };

  useEffect(() => {
    let empty = [];
    // formValue 객체의 속성을 순회
    for (const key in formValue) {
      // hasOwnProperty를 사용하여 객체 자신의 속성인지 확인
      if (
        key !== "contents" &&
        key !== "routes" &&
        formValue.hasOwnProperty(key)
      ) {
        // 값이 비어있는 경우에만 배열에 추가
        if (formValue[key] === "" || formValue[key].length === 0) {
          empty.push(key);
        }
      }
    }
    setEmptyColumns([...empty]);
  }, [formValue]);

  return (
    <div className="main">
      <section className="form_wrap">
        <InputArea
          value={formValue["location"]}
          onChange={handleChange}
          name="location"
          label={"지역"}
          type={"select"}
          options={cities}
        />
        <InputArea
          value={formValue["companyName"]}
          onChange={handleChange}
          maxLength={12}
          name="companyName"
          label={"업체명"}
          placeholder={"업체명을 입력해주세요"}
        />
        <InputArea
          value={formValue["phone"]}
          onChange={handleChange}
          name="phone"
          label={"담당자 전화번호"}
          placeholder={"담당자 전화번호를 입력해주세요"}
        />
        <InputArea
          value={formValue["ableTime"]}
          onChange={handleChange}
          name="ableTime"
          label={"담당자 통화가능한 시간"}
          type={"radio"}
          options={radioOptions}
          placeholder={"22:30~24:00 / 04:00~06:30"}
        />
        <InputArea
          value={formValue["contents"]}
          onChange={handleChange}
          name="contents"
          label={"문의내용"}
          type={"textarea"}
          maxLength={300}
          placeholder={"문의내용을 입력해주세요"}
        />
      </section>
      <section className="form_wrap">
        <InputArea
          value={formValue["routes"]}
          onChange={handleChange}
          name="routes"
          label={"마캉스를 알게 된 경로(중복가능)"}
          maxLength={100}
          type={"checkbox"}
          options={mkRoutes}
          placeholder={"마캉스를 알게된 경로를 자세히 입력해주세요."}
        />
      </section>
      <section className="form_wrap">
        <InputArea
          value={formValue["privacyAgree"]}
          onChange={handleChange}
          name="privacyAgree"
          type={"checkbox"}
          options={[{ label: "개인정보 수집 및 이용동의(필수)", value: true }]}
        />
        <article>
          <section>
            (주)뷰리드 제휴입점문의 접수 시, 필요한 최소한의 개인정보만을 수집
            및 이용합니다.
          </section>
          <section>
            1.수집하는 개인정보항목
            <div className="grid_container">
              <div className="grid_item header_item">
                수집하는 개인정보 항목
              </div>
              <div className="grid_item header_item">수집 및 이용목적</div>
              <div className="grid_item data_item">지역명, 업체명, 연락처</div>
              <div className="grid_item data_item">
                제휴/입점 문의사항 접수 및 처리결과 회신
              </div>
            </div>
          </section>
          <section>
            2.수집 및 이용목적: 입점문의사항 접수 및 처리결과 회신
          </section>
          <section>
            3.개인정보의 이용기간: 목적 달성 후, 해당 개인정보를 지체없이 파기
          </section>
          <section>
            위 개인정보 수집 및 이용에 대한 동의를 거부할 권리가
            있습니다.동의하지 않은 경우 제휴/입점 문의가 제한될 수 있습니다.
          </section>
        </article>
        <button
          onClick={emptyColumns.length === 0 ? onSubmit : undefined}
          className={`finish_button ${
            emptyColumns.length > 0 ? "disabled" : ""
          }`}
        >
          입점신청
        </button>
      </section>
    </div>
  );
};

export default Main;
