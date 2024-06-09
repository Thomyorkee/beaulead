import React, { useState } from "react";
import "../../../scss/custom-radio.scss";
import { checkValid } from "../../../service/util";

/**
 * CustomRadio 컴포넌트
 * @param {string} type - 입력 타입 (radio 또는 checkbox)
 * @param {string} name - input 요소의 name 속성 값
 * @param {Array} value - 선택된 옵션들의 배열
 * @param {Array} options - 라디오 버튼 또는 체크박스 옵션들의 배열
 * @param {number} maxLength - text 최대 길이
 * @param {string} placeholder - 입력 필드의 placeholder
 * @param {function} handleInputChange - 입력 값이 변경될 때 호출되는 콜백 함수
 * @returns {JSX.Element} CustomRadio 컴포넌트
 */
const CustomRadio = ({
  type,
  name,
  value,
  options,
  maxLength,
  placeholder,
  handleInputChange,
}) => {
  const [text, setText] = useState("");
  const [inputVisible, setInputVisible] = useState(false);
  const lastFieldKey = options.length - 1;

  /**
   * 라디오 또는 체크박스 옵션 변경 핸들러
   * @param {object} event - 변경된 이벤트 객체
   * @param {number} key - 변경된 옵션의 인덱스
   */
  const handleOptionChange = (event, key) => {
    const inputValue = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      if (inputValue === "직접입력") {
        setInputVisible(true);
        if (!value.some((option) => option.key === key)) {
          handleInputChange({
            target: {
              name: name,
              value: [...value, { key, value: inputValue }],
            },
          });
        }
      } else {
        handleInputChange({
          target: {
            name: name,
            value: [...value, { key: key, value: inputValue }],
          },
        });
      }
    } else {
      const valueFiltered = value.filter((option) => option.key !== key);
      handleInputChange({
        target: {
          name: name,
          value: valueFiltered,
        },
      });
      inputValue === "직접입력" && setInputVisible(false);
    }
  };

  /**
   * 입력 확인 핸들러
   */
  const handleInputConfirm = () => {
    if (text.trim() !== "") {
      let updatedOptions = [...value];
      updatedOptions[
        updatedOptions.findIndex((e) => e.key === lastFieldKey)
      ].value = text;
      handleInputChange({ target: { name: name, value: updatedOptions } });
    }
  };

  return (
    <>
      <div className="custom-radio-group">
        {options &&
          options.map((e, i) => (
            <label
              key={i}
              className={`custom-radio-label custom-checkbox-label ${
                value.some((option) => option.key === i) ? "selected" : ""
              }`}
            >
              <input
                type={"checkbox"}
                value={e.value}
                checked={value.some((option) => option.key === i)}
                onChange={(event) => handleOptionChange(event, i)}
              />
              <span
                className={type === "checkbox" ? "checkbox-dot" : "radio-dot"}
              />
              <p>{e.label}</p>
            </label>
          ))}
      </div>
      <>
        {type === "radio" ? (
          <input
            value={text}
            onBlur={handleInputConfirm}
            placeholder={placeholder && placeholder}
            className={`custom_input ${inputVisible ? "visible" : "invisible"}`}
            onChange={(e) => setText(e.target.value)}
          />
        ) : (
          <div
            className={`textarea_container ${
              inputVisible ? "visible" : "invisible"
            }`}
          >
            <textarea
              value={text}
              maxLength={maxLength}
              onBlur={handleInputConfirm}
              placeholder={placeholder && placeholder}
              onChange={(e) => setText(checkValid(e, "emoji").target.value)}
            />
            <div className="count">
              <span>{`${text ? text.length : 0}`}</span>
              {`/${maxLength}`}
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default CustomRadio;
