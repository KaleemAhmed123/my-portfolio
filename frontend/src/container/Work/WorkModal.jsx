import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiExternalLink, FiGithub, FiArrowRight } from "react-icons/fi";
import { HiOutlineKey } from "react-icons/hi";

// Case-study preview for a single project. `imgSrc` is the already-resolved
// image (Work.jsx handles urlFor + fallback), so this stays presentational.
const WorkModal = ({ work, imgSrc, onClose }) => {
  useEffect(() => {
    if (!work) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [work, onClose]);

  return createPortal(
    <AnimatePresence>
      {work ? (
        <motion.div
          className="work-modal__backdrop"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="work-modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.97, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <button className="work-modal__close" onClick={onClose} aria-label="Close">
              <FiX />
            </button>

            {/* Left rail — clip (falls back to image) + actions, sticky on desktop */}
            <aside className="work-modal__rail">
              <div className="work-modal__media">
                {work.clipUrl ? (
                  <video
                    src={work.clipUrl}
                    poster={imgSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                  />
                ) : (
                  <img src={imgSrc} alt={work.title} />
                )}
              </div>

              {/* Test-access CTA — the whole point: let them try it, not read about it */}
              {work.credentialsKey ? (
                <Link
                  className="work-modal__cta"
                  to={`/credentials?q=${encodeURIComponent(work.credentialsKey)}`}
                >
                  <span className="work-modal__cta-icon">
                    <HiOutlineKey />
                  </span>
                  <span className="work-modal__cta-copy">
                    <strong>Don't take my word for it</strong>
                    <span>
                      I set up real demo logins for every role. Jump in and click
                      around — no signup, nothing to install.
                    </span>
                    <span className="work-modal__cta-link">
                      Get test logins <FiArrowRight />
                    </span>
                  </span>
                </Link>
              ) : null}

              <div className="work-modal__links">
                {work.projectLink ? (
                  <a
                    className="work-modal__btn work-modal__btn--primary"
                    href={work.projectLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FiExternalLink /> Live demo
                  </a>
                ) : null}
                {work.codeLink ? (
                  <a
                    className="work-modal__btn"
                    href={work.codeLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FiGithub /> View code
                  </a>
                ) : null}
              </div>
            </aside>

            {/* Right — the story */}
            <div className="work-modal__body">
              {work.role ? (
                <span className="work-modal__role">{work.role}</span>
              ) : null}
              <h3 className="bold-text work-modal__title">{work.title}</h3>

              {work.tags?.length ? (
                <div className="work-modal__tags">
                  {work.tags.map((tag) => (
                    <span className="work-modal__tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}

              {work.problem ? (
                <section className="work-modal__section">
                  <h4 className="work-modal__heading">The idea</h4>
                  <p className="p-text work-modal__text">{work.problem}</p>
                </section>
              ) : null}

              {work.highlights?.length ? (
                <section className="work-modal__section">
                  <h4 className="work-modal__heading">How I built it</h4>
                  <ul className="work-modal__list">
                    {work.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {work.description ? (
                <section className="work-modal__section">
                  <h4 className="work-modal__heading">Overview</h4>
                  <p className="p-text work-modal__text">{work.description}</p>
                </section>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
};

export default WorkModal;
