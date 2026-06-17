const htmlBreakPattern = /<br\s*\/?>/gi;
const htmlTagPattern = /<[^>]+>/g;

export function formatVideoDescription(description: string) {
  const descriptionAsText = description
    .replace(/\r\n?/g, "\n")
    .replace(htmlBreakPattern, "\n")
    .replace(htmlTagPattern, "");

  const decodedDescription = decodeHtmlEntities(descriptionAsText);

  return decodedDescription
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function decodeHtmlEntities(text: string) {
  if (typeof document === "undefined") {
    return text;
  }

  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}
