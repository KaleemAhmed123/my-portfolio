import React, { useState, useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiSearch, FiCornerDownLeft, FiExternalLink } from "react-icons/fi";
import "./CommandPalette.scss";
import { copyText } from "../../copyText";

// Flatten projects → environments → portals into a flat list of "commands".
const buildCommands = (projects) => {
  const out = [];
  (projects || []).forEach((p) => {
    (p.environments || []).forEach((env) => {
      (env.portals || []).forEach((portal) => {
        const identifier = portal.email || portal.username;
        out.push({
          project: p.name,
          env: env.name,
          role: portal.role,
          url: portal.url,
          email: identifier,
          password: portal.password,
          haystack: `${p.name} ${env.name || ""} ${portal.role} ${identifier || ""} ${(p.tags || []).join(" ")}`.toLowerCase(),
        });
      });
    });
  });
  return out;
};

const CommandPalette = ({ open, onClose, projects }) => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [flash, setFlash] = useState(null); // {email} just-copied confirmation
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const commands = useMemo(() => buildCommands(projects), [projects]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    const terms = q.split(/\s+/);
    return commands.filter((c) => terms.every((t) => c.haystack.includes(t)));
  }, [commands, query]);

  // Reset + focus each time it opens
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setFlash(null);
      const t = setTimeout(() => inputRef.current?.focus(), 20);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Keep the active row in view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const runCommand = async (cmd) => {
    if (!cmd) return;
    if (cmd.password) await copyText(cmd.password);
    setFlash({ email: cmd.email });
    // brief confirmation, then open the portal and close
    setTimeout(() => {
      if (cmd.url) window.open(cmd.url, "_blank", "noreferrer");
      onClose();
    }, 450);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runCommand(results[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="cmdk__overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={onClose}
        >
          <motion.div
            className="cmdk__panel"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            <div className="cmdk__search">
              <FiSearch />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Jump to a login — try “udoro admin”…"
              />
              <span className="cmdk__esc">esc</span>
            </div>

            <div className="cmdk__list" ref={listRef}>
              {results.length ? (
                results.map((c, i) => (
                  <button
                    type="button"
                    key={`${c.project}-${c.env}-${c.role}-${i}`}
                    data-idx={i}
                    className={`cmdk__row ${i === active ? "is-active" : ""}`}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => runCommand(c)}
                  >
                    <span className="cmdk__row-main">
                      <span className="cmdk__row-project">{c.project}</span>
                      <span className="cmdk__row-sep">·</span>
                      <span className="cmdk__row-role">{c.role}</span>
                      {c.env ? <span className="cmdk__row-env">{c.env}</span> : null}
                    </span>
                    <span className="cmdk__row-meta">
                      <span className="cmdk__row-email">{c.email}</span>
                      <FiExternalLink />
                    </span>
                  </button>
                ))
              ) : (
                <div className="cmdk__empty">No matches for “{query}”.</div>
              )}
            </div>

            <div className="cmdk__footer">
              {flash ? (
                <span className="cmdk__flash">
                  ✓ Password copied for {flash.email} — opening…
                </span>
              ) : (
                <>
                  <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
                  <span><kbd><FiCornerDownLeft /></kbd> copy password &amp; open</span>
                  <span><kbd>esc</kbd> close</span>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default CommandPalette;
