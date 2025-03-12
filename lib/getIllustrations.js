export async function getIllustrations() {
  const r = await fetch("/illustrations-data.json");
  return await r.json();
}
