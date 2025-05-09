import { data } from "./data.js";
import { updateAll } from "./main.js";

// 표 테이블 렌더링 함수
export function renderTable() {
  const tbody = document.querySelector("#value-table tbody");
  tbody.innerHTML = "";

  // data 마다 테이블 행 생성
  data.forEach((item) => {
    const row = document.createElement("tr");

    // ID 셀 생성
    const idCell = document.createElement("td");
    idCell.textContent = item.id;
    row.appendChild(idCell);

    // 값 셀 생성 (편집 가능)
    const valueCell = document.createElement("td");
    valueCell.textContent = item.value;
    valueCell.setAttribute("contenteditable", "true");
    row.appendChild(valueCell);

    // 값 셀이 포커스를 잃었을 때 데이터 갱신
    valueCell.addEventListener("blur", () => {
      item.value = valueCell.textContent;
    });

    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.classList.add("delete-btn");
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    // 삭제 버튼 클릭 시 데이터에서 항목 제거
    deleteButton.addEventListener("click", () => {
      const index = data.indexOf(item);
      if (index > -1) {
        data.splice(index, 1);
        updateAll();
      }
    });
    tbody.appendChild(row);

    const applyBtn = document.getElementById("apply-btn");
    applyBtn.addEventListener("click", () => {
      data.forEach((item, index) => {
        const row = tbody.rows[index];
        const valueCell = row.cells[1];

        item.value = valueCell.textContent;
      });
      updateAll();
    });
  });
}
