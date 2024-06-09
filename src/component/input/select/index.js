import React, { useState } from "react";
import "../../../scss/custom-select.scss";
import OptionModal from "./option-modal";
import arrowImage from "../../../static/images/arrow.svg";

/**
 * CustomSelect 컴포넌트
 * @param {object} props - 부모 컴포넌트로부터 전달받은 속성들
 * @param {string} props.inputValue - 입력 값
 * @param {function} props.handleInputChange - 입력 값이 변경될 때 호출되는 콜백 함수
 * @param {Array} props.options - 옵션들의 배열
 * @param {string} props.name - input 요소의 name 속성 값
 * @returns {JSX.Element} CustomSelect 컴포넌트
 */
const CustomSelect = (props) => {
  const { inputValue, handleInputChange, options, name } = props;
  const [showOptions, setShowOptions] = useState(false);

  /**
   * 옵션 모달의 표시/숨김을 토글하는 함수
   */
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <>
      <div
        className={`custom_select ${showOptions ? "modal_open" : ""} _cp`}
        onClick={toggleOptions}
      >
        {inputValue || "지역"}
        <img src={arrowImage} alt="arrow" />
      </div>
      <OptionModal
        name={name}
        toggleOptions={toggleOptions}
        handleInputChange={handleInputChange}
        showOptions={showOptions}
        options={options}
      />
    </>
  );
};

export default CustomSelect;
