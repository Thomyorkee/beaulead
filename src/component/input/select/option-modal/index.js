import React, { useState } from "react";
import "../../../../scss/custom-select.scss";

/**
 * OptionModal 컴포넌트
 * @param {string} name - input 요소의 name 속성 값
 * @param {function} handleInputChange - 입력 값이 변경될 때 호출되는 콜백 함수
 * @param {Array} options - 옵션들의 배열
 * @param {boolean} showOptions - 옵션 모달의 표시 여부
 * @param {function} toggleOptions - 옵션 모달의 표시/숨김을 토글하는 함수
 * @returns {JSX.Element} OptionModal 컴포넌트
 */
const OptionModal = ({
  name,
  handleInputChange,
  options,
  showOptions,
  toggleOptions,
}) => {
  const [current, setCurrent] = useState();

  /**
   * 옵션 클릭 핸들러
   * @param {string} value - 클릭된 옵션의 값
   */
  const handleClick = (value) => {
    handleInputChange({ target: { name: name, value: value } });
    toggleOptions();
  };

  return (
    <div
      className={`option_modal ${showOptions ? "active" : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="header">
        <div>
          <i className="fas fa-times fa-2x _cp" onClick={toggleOptions} />
        </div>
        <p>지역 선택</p>
        <div></div>
      </div>
      <div className="option_body">
        <p>대지역</p>
        <div className="option_container">
          {options.map((option, index) => (
            <div
              key={index}
              className={`option_button _cp ${
                current === option.value && "selected"
              }`}
              onClick={() => setCurrent(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
      <button className="select_button" onClick={() => handleClick(current)}>
        선택 완료
      </button>
    </div>
  );
};

export default OptionModal;
