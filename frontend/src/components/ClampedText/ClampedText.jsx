import React, { useEffect, useRef, useState } from "react";

/**
 * Collapses its children to `lines` and offers a Read more toggle, but only
 * when the content actually overflows.
 *
 * The character-count heuristics this replaces got it wrong in both
 * directions: a short-but-wordy paragraph showed a pointless button, and a
 * wide viewport hid one that was needed. Line count depends on the rendered
 * width, so the only honest test is to measure.
 */
const ClampedText = ({ lines = 12, className = "", buttonClassName, children }) => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Only measurable while collapsed: once expanded, scrollHeight equals
    // clientHeight and the button would delete itself mid-read.
    const check = () => {
      if (open) return;
      setOverflows(el.scrollHeight > el.clientHeight + 1);
    };

    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open, children]);

  return (
    <>
      {/* Clamped whenever collapsed, not only when it overflows: the clamp is
          what makes the overflow measurable in the first place. It is a no-op
          when the content is shorter than `lines`. */}
      <div
        ref={ref}
        className={`${className} ${open ? "" : "is-clamped"}`}
        style={{ "--clamp-lines": lines }}
      >
        {children}
      </div>
      {overflows && (
        <button
          type="button"
          className={buttonClassName}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Show less" : "Read more"}
        </button>
      )}
    </>
  );
};

export default ClampedText;
