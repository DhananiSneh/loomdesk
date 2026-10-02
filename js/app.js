import { addKhata, assignBeam, clearLoom, khataTotal } from "./model.js";
import { load, save } from "./store.js";

let state = load();
const floor = document.querySelector("#floor-grid");
const khataList = document.querySelector("#khata-list");
const total = document.querySelector("#total");
const assign = document.querySelector("#assign-form");
const khataForm = document.querySelector("#khata-form");
const loomSelect = document.querySelector("#loom");

function show(name) {
  document.querySelectorAll(".view").forEach((view) => {
    view.hidden = view.id !== name;
  });
  document.querySelectorAll(".nav button").forEach((button) => {
    button.classList.toggle("is-on", button.dataset.view === name);
  });
}

function render() {
  loomSelect.innerHTML = "";
  floor.innerHTML = "";
  state.looms.forEach((loom) => {
    const option = document.createElement("option");
    option.value = loom.id;
    option.textContent = loom.name;
    loomSelect.appendChild(option);

    const card = document.createElement("article");
    card.className = loom.lit ? "loom lit" : "loom";
    const title = document.createElement("h2");
    title.textContent = loom.name;
    const line = document.createElement("p");
    line.textContent = loom.lit ? loom.beam + (loom.worker ? " · " + loom.worker : "") : "Dark";
    const clear = document.createElement("button");
    clear.type = "button";
    clear.className = "quiet";
    clear.textContent = "Clear";
    clear.disabled = !loom.lit;
    clear.addEventListener("click", () => {
      state.looms = state.looms.map((item) => item.id === loom.id ? clearLoom(item) : item);
      save(state);
      render();
    });
    card.append(title, line, clear);
    floor.appendChild(card);
  });

  khataList.innerHTML = "";
  state.khata.forEach((entry) => {
    const row = document.createElement("li");
    row.textContent = entry.party + " · ₹ " + entry.amount + (entry.note ? " · " + entry.note : "");
    khataList.appendChild(row);
  });
  total.textContent = "₹ " + khataTotal(state.khata);
}

document.querySelectorAll(".nav button").forEach((button) => {
  button.addEventListener("click", () => show(button.dataset.view));
});

assign.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(assign);
  state.looms = state.looms.map((loom) => loom.id === data.get("loom") ? assignBeam(loom, { beam: data.get("beam"), worker: data.get("worker") }) : loom);
  save(state);
  assign.reset();
  render();
  show("floor");
});

khataForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(khataForm);
  state.khata = addKhata(state.khata, { party: data.get("party"), note: data.get("note"), amount: data.get("amount") });
  save(state);
  khataForm.reset();
  render();
});

render();
show("floor");
