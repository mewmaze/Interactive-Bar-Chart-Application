import { data } from "./data.js";

//그래프 렌더링 함수
export function renderGraph() {
  const canvas = document.getElementById("graph");
  const ctx = canvas.getContext("2d");

  const graphWidth = canvas.width;
  const graphHeight = canvas.height;
  const barWidth = 20;
  const barSpacing = 30;

  if (data.length === 0) {
    ctx.clearRect(0, 0, graphWidth, graphHeight);
    ctx.fillText("데이터가 없습니다", graphWidth / 2, graphHeight / 2);
    return;
  }

  const maxValue = Math.max(...data.map((item) => item.value));

  //이전 그래프 지우기
  ctx.clearRect(0, 0, graphWidth, graphHeight);

  //Y축 그리기
  ctx.beginPath();
  ctx.moveTo(40, 20);
  ctx.lineTo(40, graphHeight - 30);
  ctx.stroke();

  //x축 그리기
  ctx.beginPath();
  ctx.moveTo(40, graphHeight - 30);
  ctx.lineTo(graphWidth - 30, graphHeight - 30);
  ctx.stroke();

  data.forEach((item, index) => {
    const barHeight = (item.value / maxValue) * (graphHeight - 80);
    const x = 50 + index * (barWidth + barSpacing);
    const y = graphHeight - 30 - barHeight;

    // 막대 그리기
    ctx.fillStyle = "#4BC0C0";
    ctx.fillRect(x, y, barWidth, barHeight);

    // X축 레이블 (id 값)
    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.fillText(item.id, x + barWidth / 2 - 5, graphHeight - 10);
  });

  // Y축 레이블
  const labelSpacing = (graphHeight - 80) / 5;
  for (let i = 0; i <= 5; i++) {
    const yLabel = graphHeight - 30 - i * labelSpacing;
    ctx.fillText(Math.round((i / 5) * maxValue), 10, yLabel);
  }
}

renderGraph();
