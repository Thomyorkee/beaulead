// 이모지를 검사하는 정규식
const emojiRegex =
  /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2300}-\u{23FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}]/gu;

// 업체명 정규식
const companyRegex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;

// 숫자가 아닌 문자를 제거하는 정규식
const phoneRegex = /[^0-9]/g;

// 입력 변경 핸들러
export const checkValid = (event, rule) => {
  const regx =
    rule === "emoji"
      ? emojiRegex
      : rule === "phone"
      ? phoneRegex
      : companyRegex;
  const validate = (text) => {
    return text.replace(regx, "");
  };
  const { value } = event.target;
  event.target.value = validate(value);

  return event;
};
