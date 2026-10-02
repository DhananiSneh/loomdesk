import { createLoom } from "./model.js";

const KEY = "loomdesk.v1";

export function load() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return seed();
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.looms) || !Array.isArray(parsed.khata)) return seed();
    return parsed;
  } catch {
    return seed();
  }
}

export function save(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

function seed() {
  const state = {
    looms: [createLoom("Loom 1"), createLoom("Loom 2"), createLoom("Loom 3"), createLoom("Loom 4")],
    khata: [],
  };
  save(state);
  return state;
}
