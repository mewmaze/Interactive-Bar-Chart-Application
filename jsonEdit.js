import { data } from "./data.js";
import { updateAll } from "./main.js";

// data를 JSON 형식으로 textarea에 렌더링하는 함수
export function renderJSON() {
  const textarea = document.getElementById("json-textarea");
  if (textarea) {
    textarea.value = JSON.stringify(data, null, 2);
    textarea.addEventListener("input", () => {
      // 입력 시 자동으로 높이 조절
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    });
  }
}

// ID 중복 확인 함수
function checkDuplicateIds(parsedData) {
  const ids = parsedData.map((item) => item.id);
  const uniqueIds = new Set(ids);
  if (ids.length !== uniqueIds.size) {
    throw new Error("ID가 중복되었습니다.");
  }
  return true;
}

// ID와 value 값이 올바른 타입인지 확인하는 함수
function validateData(parsedData) {
  parsedData.forEach((item) => {
    if (typeof item.id !== "string" || isNaN(Number(item.id))) {
      throw new Error('ID는 숫자형식의 문자열이어야 합니다. 예:"1"');
    }

    if (typeof item.value !== "number" || isNaN(item.value)) {
      throw new Error("value는 숫자여야 합니다.");
    }
  });
}

//JSON 편집 및 적용하는 함수
export function jsonEdit() {
  const textarea = document.getElementById("json-textarea");
  const applyBtn = document.getElementById("json-apply-btn");

  textarea.addEventListener("input", () => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  });

  renderJSON();

  applyBtn.addEventListener("click", () => {
    try {
      const parsed = JSON.parse(textarea.value);
      if (!Array.isArray(parsed))
        throw new Error("JSON은 배열 형태여야 합니다.");

      checkDuplicateIds(parsed);
      validateData(parsed);

      //기존 data배열 비우고 새 데이터 추가
      data.length = 0;
      parsed.forEach((item) =>
        data.push({ id: String(item.id), value: Number(item.value) })
      );

      updateAll();
    } catch (e) {
      if (e instanceof SyntaxError) {
        alert("JSON 형식이 잘못되었습니다. 다시 확인해주세요.");
      } else {
        alert(e.message);
      }
    }
  });
}
