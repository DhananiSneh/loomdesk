export function createLoom(name) {
  const clean = String(name || "").trim();
  if (!clean) throw new Error("A loom needs a name");
  return { id: Math.random().toString(36).slice(2, 10), name: clean, beam: "", worker: "", lit: false };
}

export function assignBeam(loom, { beam, worker }) {
  const cleanBeam = String(beam || "").trim();
  if (!cleanBeam) throw new Error("A beam needs a name");
  return { ...loom, beam: cleanBeam, worker: String(worker || "").trim(), lit: true };
}

export function clearLoom(loom) {
  return { ...loom, beam: "", worker: "", lit: false };
}

export function addKhata(entries, { party, note, amount }) {
  const cleanParty = String(party || "").trim();
  const value = Number(amount);
  if (!cleanParty) throw new Error("A khata line needs a party");
  if (!Number.isFinite(value)) throw new Error("Amount must be a number");
  return [{ id: Math.random().toString(36).slice(2, 10), party: cleanParty, note: String(note || "").trim(), amount: value }, ...entries];
}

export function khataTotal(entries) {
  return entries.reduce((sum, entry) => sum + entry.amount, 0);
}
