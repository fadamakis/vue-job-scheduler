export async function fetchJobs() {
  const response = await fetch("jobs.json");
  return await response.json();
}
