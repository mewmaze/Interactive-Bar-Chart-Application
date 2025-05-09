import { data } from "./data.js";
import { updateAll } from "./main.js";

//새로운 데이터를 추가하는 함수
export function addNewData() {
  const addBtn = document.getElementById("add-btn");
  addBtn.addEventListener("click", () => {
    const idInput = document.getElementById("id");
    const valueInput = document.getElementById("value");
    const id = idInput.value.trim();
    const value = valueInput.value.trim();

    // ID와 value가 모두 입력되었는지 확인
    if (!id || !value) {
      alert("값을 모두 입력하세요");
      return;
    }

    // 중복된 ID가 있는지 확인
    const isDuplicate = data.some((item) => item.id === id);
    if (isDuplicate) {
      alert("중복된 ID입니다.");
      return;
    }

    // ID가 숫자인지 확인
    if (isNaN(Number(id))) {
      alert("ID는 숫자여야 합니다.");
      return;
    }

    // ID가 0보다 큰지 확인
    if (Number(id) < 0) {
      alert("ID는 0보다 커야 합니다.");
      return;
    }

    // value가 숫자인지 확인
    if (isNaN(Number(value))) {
      alert("value는 숫자여야합니다.");
      return;
    }

    const newData = {
      id,
      value: Number(value),
    };

    data.push(newData);
    updateAll();

    idInput.value = "";
    valueInput.value = "";
  });
}
