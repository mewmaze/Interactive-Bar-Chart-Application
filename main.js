import { data } from "./data.js";
import { renderTable } from "./table.js";
import { addNewData } from "./addData.js";
import { jsonEdit } from "./jsonEdit.js";
import { renderJSON } from "./jsonEdit.js";
import { renderGraph } from "./graph.js";

export function updateAll() {
  renderTable(data);
  renderJSON(data);
  renderGraph(data);
}

document.addEventListener("DOMContentLoaded", () => {
  updateAll();
  addNewData();
  jsonEdit();
});
