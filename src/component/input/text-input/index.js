import "../../../scss/custom-input.scss";
import { checkValid } from "../../../service/util";

/**
 * CustomInput 컴포넌트
 * @param {object} props - 부모 컴포넌트로부터 전달받은 속성들
 * @param {string} props.type - 입력 필드의 타입 (text 또는 textarea)
 * @param {string} props.name - input 요소의 name 속성 값
 * @param {object} props.style - 입력 필드의 스타일
 * @param {number} props.maxLength - 최대 입력 길이
 * @param {string} props.inputValue - 입력 값
 * @param {string} props.placeholder - 입력 필드의 placeholder
 * @param {function} props.handleInputChange - 입력 값이 변경될 때 호출되는 콜백 함수
 * @returns {JSX.Element} CustomInput 컴포넌트
 */
const CustomInput = (props) => {
  const {
    type,
    name,
    style,
    maxLength,
    inputValue,
    placeholder,
    handleInputChange,
  } = props;

  /**
   * 입력값 유효성 검사 및 처리 함수
   * @param {object} event - 입력 이벤트 객체
   */
  const validateInput = (event) => {
    const replacedValue = checkValid(event, name);
    handleInputChange && handleInputChange(replacedValue);
  };

  return (
    <>
      {type === "text" ? (
        <input
          type={type}
          name={name}
          value={inputValue}
          maxLength={maxLength}
          style={style && style}
          className="custom_input"
          placeholder={placeholder && placeholder}
          onChange={validateInput}
        />
      ) : (
        <div className="textarea_container">
          <textarea
            name={name}
            style={style && style}
            value={inputValue}
            onChange={(event) =>
              handleInputChange && handleInputChange(checkValid(event, "emoji"))
            }
            maxLength={maxLength}
            placeholder={placeholder && placeholder}
          />
          <div className="count">
            <span>{`${inputValue ? inputValue.length : 0}`}</span>
            {`/${maxLength}`}
          </div>
        </div>
      )}
    </>
  );
};

export default CustomInput;
