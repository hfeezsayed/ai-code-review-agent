const API_URL = "http://127.0.0.1:8000";

export async function analyzeCode(
  code: string,
  language: string
) {
  const response = await fetch(
    `${API_URL}/analyze-code`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        language,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to analyze code");
  }

  return response.json();
}