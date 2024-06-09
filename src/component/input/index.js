import CustomRadio from "./radio";
import React from "react";
import CustomInput from "./text-input";
import CustomSelect from "./select";

/**
 * InputArea 컴포넌트
 * @param {object} props - 부모 컴포넌트로부터 전달받은 속성들
 * @param {string} props.type - 입력 필드의 타입
 * @param {string} props.name - input 요소의 name 속성 값
 * @param {string} props.label - 입력 필드의 레이블
 * @param {string} props.value - 입력 값
 * @param {number} props.maxLength - 최대 입력 길이 (textarea 또는 text-input인 경우에만 사용)
 * @param {Array} props.options - 선택지 옵션들의 배열 (select 또는 radio인 경우에만 사용)
 * @param {string} props.placeholder - 입력 필드의 placeholder (text-input 또는 select인 경우에만 사용)
 * @param {function} props.onChange - 입력 값이 변경될 때 호출되는 콜백 함수
 * @returns {JSX.Element} InputArea 컴포넌트
 */
const InputArea = (props) => {
  const {
    type,
    name,
    label,
    value,
    maxLength,
    options,
    placeholder,
    onChange,
  } = props;

  /**
   * 입력 필드를 렌더링하는 함수
   * @returns {JSX.Element} 렌더링된 입력 필드 컴포넌트
   */
  const inputFieldRenderer = () => {
    switch (type) {
      case "select":
        return (
          <CustomSelect
            inputValue={value}
            options={options}
            handleInputChange={onChange}
            name={name}
          />
        );
      case "textarea":
        return (
          <CustomInput
            type={"textarea"}
            inputValue={value}
            handleInputChange={onChange}
            maxLength={maxLength}
            placeholder={placeholder && placeholder}
            name={name}
          />
        );
      case "radio":
      case "checkbox":
        return (
          <CustomRadio
            options={options}
            type={type}
            value={value}
            maxLength={maxLength}
            handleInputChange={onChange}
            placeholder={placeholder}
            name={name}
          />
        );
      default:
        return (
          <CustomInput
            type={"text"}
            inputValue={value}
            maxLength={maxLength}
            handleInputChange={onChange}
            placeholder={placeholder && placeholder}
            name={name}
          />
        );
    }
  };

  return (
    <div className="input_area">
      <p>{label && label}</p>
      {inputFieldRenderer()}
    </div>
  );
};

export default InputArea;
