// Shared by the credentials page and the command palette, which had identical
// copies of it. The fallback covers http:// and older Safari, where the async
// clipboard API is unavailable.
export const copyText = async (value) => {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const el = document.createElement("textarea");
    el.value = value;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }
};

export default copyText;
