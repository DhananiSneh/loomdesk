import assert from "node:assert/strict";
import test from "node:test";
import { addKhata, assignBeam, clearLoom, createLoom, khataTotal } from "../js/model.js";

test("assigning a beam lights a loom and clearing puts it dark", () => {
  const loom = assignBeam(createLoom("Loom 1"), { beam: "Gold warp", worker: "R. Patel" });
  assert.equal(loom.lit, true);
  assert.equal(loom.beam, "Gold warp");
  assert.equal(clearLoom(loom).lit, false);
});

test("khata lines add up and refuse a blank party", () => {
  const entries = addKhata([], { party: "Dye house", note: "Vat", amount: "1200" });
  assert.equal(khataTotal(entries), 1200);
  assert.throws(() => addKhata(entries, { party: " ", amount: 10 }));
});
