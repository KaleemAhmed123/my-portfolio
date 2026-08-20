import { useEffect } from "react";

// Per-route <head> handling. index.html carries the homepage tags; this patches
// them for the routes React owns and restores them on unmount, so navigating
// back to the homepage does not leave a case study's description behind.
//
// Deliberately not react-helmet: this is ~40 lines and the app renders one route
// at a time, so the ordering problems Helmet exists to solve do not apply here.

const ORIGIN = "https://kaleemahmed.in";

const setTag = (selector, attrs) => {
  let el = document.head.querySelector(selector);
  const created = !el;
  if (!el) {
    el = document.createElement(attrs.rel ? "link" : "meta");
    document.head.appendChild(el);
  }
  const previous = {};
  for (const [k, v] of Object.entries(attrs)) {
    previous[k] = el.getAttribute(k);
    el.setAttribute(k, v);
  }
  return () => {
    if (created) {
      el.remove();
      return;
    }
    for (const [k, v] of Object.entries(previous)) {
      if (v === null) el.removeAttribute(k);
      else el.setAttribute(k, v);
    }
  };
};

export const useDocumentHead = ({ title, description, path, noindex }) => {
  useEffect(() => {
    if (!title) return undefined;

    const previousTitle = document.title;
    document.title = title;

    const undo = [];
    if (description) {
      undo.push(setTag('meta[name="description"]', { name: "description", content: description }));
      undo.push(setTag('meta[property="og:description"]', { property: "og:description", content: description }));
    }
    undo.push(setTag('meta[property="og:title"]', { property: "og:title", content: title }));
    if (path) {
      const url = `${ORIGIN}${path}`;
      undo.push(setTag('link[rel="canonical"]', { rel: "canonical", href: url }));
      undo.push(setTag('meta[property="og:url"]', { property: "og:url", content: url }));
    }
    if (noindex) {
      undo.push(setTag('meta[name="robots"]', { name: "robots", content: "noindex, follow" }));
    }

    return () => {
      document.title = previousTitle;
      undo.forEach((fn) => fn());
    };
  }, [title, description, path, noindex]);
};
