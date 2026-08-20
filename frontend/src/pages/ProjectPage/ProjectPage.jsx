import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiExternalLink, FiGithub, FiChevronDown } from "react-icons/fi";
import { HiOutlineKey } from "react-icons/hi";

import { client } from "../../client";
import { slugForWork, studyFor } from "../../content/projects";
import Blocks, { DiagramDebt } from "./Blocks";
import "./ProjectPage.scss";
import { useDocumentHead } from "../../seo";

// Tabs are declared per project, so the group rail only renders groups that a
// given project actually has content for.
const groupsOf = (tabs) =>
  tabs.reduce((acc, tab) => {
    const found = acc.find((g) => g.name === tab.group);
    if (found) found.tabs.push(tab);
    else acc.push({ name: tab.group, tabs: [tab] });
    return acc;
  }, []);

const ProjectPage = () => {
  const { slug, tab: tabParam } = useParams();
  const navigate = useNavigate();
  const [work, setWork] = useState(null);
  const [state, setState] = useState("loading");
  // mobile only: the accordion collapses everything by default
  const [openMobile, setOpenMobile] = useState(null);
  const headRef = useRef(null);

  useEffect(() => {
    client
      .fetch('*[_type == "works"]')
      .then((works) => {
        const match = works.find((w) => slugForWork(w) === slug);
        setWork(match || null);
        setState(match ? "ready" : "missing");
      })
      .catch(() => setState("missing"));
  }, [slug]);

  const study = useMemo(() => (work ? studyFor(work) : null), [work]);
  const groups = useMemo(() => (study ? groupsOf(study.tabs) : []), [study]);

  const active =
    study?.tabs.find((t) => t.id === tabParam) || study?.tabs[0] || null;

  // /work/eudoro and any unknown tab id both land on the first tab
  useEffect(() => {
    if (active && active.id !== tabParam) {
      navigate(`/work/${slug}/${active.id}`, { replace: true });
    }
  }, [active, tabParam, slug, navigate]);

  // The page scrolls now, not the panel, so switching tabs has to reset it. If the
  // header is already scrolled away, land under the pinned bar rather than yanking
  // the reader back up to the title they just scrolled past.
  //
  // Two traps here, both from global CSS:
  //   html { zoom: 110% } puts offsetHeight (layout px) and scrollY (visual px) 1.1x
  //   apart, so measuring with offsetHeight scrolls ~21px short and leaves the header
  //   peeking. getBoundingClientRect is in the same space as scrollY, so add the two.
  //   * { scroll-behavior: smooth } would turn this into a ~600ms glide that the tab
  //   swap runs straight through, so the reset has to say instant.
  useLayoutEffect(() => {
    const head = headRef.current;
    if (!head) return;
    const target = Math.max(0, Math.round(head.getBoundingClientRect().bottom + window.scrollY));
    window.scrollTo({ top: window.scrollY > target ? target : 0, behavior: "instant" });
  }, [active?.id]);

  // An unknown slug renders a "no case study here" screen, which must not be
  // indexed as a real page. Note this keys off state === "missing" and not
  // !study: while the Sanity fetch is in flight study is also null, and a
  // transient noindex is something Googlebot's renderer can genuinely catch.
  const missing = state === "missing";
  useDocumentHead({
    title: study?.title
      ? `${study.title} — case study by Kaleem Ahmed`
      : missing
        ? "Case study not found — Kaleem Ahmed"
        : "Loading case study — Kaleem Ahmed",
    description: study?.tagline || undefined,
    path: study ? `/work/${slug}` : undefined,
    noindex: missing,
  });

  if (state === "loading") {
    return (
      <div className="case app__whitebg">
        <div className="case__loading">Loading the case study…</div>
      </div>
    );
  }

  if (state === "missing" || !study || !active) {
    return (
      <div className="case app__whitebg">
        <div className="case__loading">
          <p>No case study here.</p>
          <Link to="/#work" className="case__back">
            <FiArrowLeft /> Back to projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="case app__whitebg">
      {/* ---------------------------------------------------------- header */}
      <header className="case__head" ref={headRef}>
        <Link to="/#work" className="case__back">
          <FiArrowLeft /> Projects
        </Link>

        <div className="case__title-row">
          <h1 className="head-text">{study.title}</h1>
          {study.role ? <span className="case__pill">{study.role}</span> : null}
          {/* the green pill means live. Anything else (UAT, archived) stays neutral. */}
          {study.status ? (
            <span
              className={`case__pill${study.status === "Live" ? " case__pill--live" : ""}`}
            >
              {study.status}
            </span>
          ) : null}
        </div>

        {study.tagline ? <p className="case__tagline">{study.tagline}</p> : null}

        <div className="case__meta">
          <div className="case__stack">
            {study.stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>

          <div className="case__actions">
            {study.liveUrl ? (
              <a href={study.liveUrl} target="_blank" rel="noreferrer">
                <FiExternalLink /> Live
              </a>
            ) : null}
            {/* Eudoro and Shaza are products rather than portfolio pieces, so
                their source is private. Say so plainly instead of leaving a
                gap where a Code button would sit. */}
            {study.codeUrl ? (
              <a href={study.codeUrl} target="_blank" rel="noreferrer">
                <FiGithub /> Code
              </a>
            ) : (
              <a
                className="case__actions--muted"
                href="mailto:shaamidreez@gmail.com?subject=Source%20access%20request"
                title="The source is private. Email me and I'll walk you through it or grant read access."
              >
                <FiGithub /> Source on request
              </a>
            )}
            {study.credentialsKey ? (
              <Link
                className="case__actions--key"
                to={`/credentials?q=${encodeURIComponent(study.credentialsKey)}`}
              >
                <HiOutlineKey /> Test access
              </Link>
            ) : null}
          </div>
        </div>
      </header>

      {/* ---------------------- tabs, desktop only — pinned once the head scrolls */}
      <div className="case__tabsbar">
        <nav className="case__tabs">
          {groups.map((group) => (
            <div className="case__tabgroup" key={group.name}>
              <span className="case__tabgroup-name">{group.name}</span>
              <div className="case__tabrow">
                {group.tabs.map((t) => (
                  <Link
                    key={t.id}
                    to={`/work/${slug}/${t.id}`}
                    aria-current={t.id === active.id ? "page" : undefined}
                    className={`case__tab ${t.id === active.id ? "is-active" : ""}`}
                  >
                    {t.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* ------------------------------------------------------ panel, one tab */}
      {/* No AnimatePresence: an exit animation unmounts this panel and mounts the
          next one ~180ms later, and in that gap the document has no content, so the
          browser clamps the scroll position. Swapping on `key` in one commit keeps
          the page tall throughout, which is what makes the scroll reset above land
          where it is told. The enter animation survives; only the exit is gone. */}
      <motion.section
        key={active.id}
        className="case__panel"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        <div className="case__panel-inner">
          <h2 className="case__panel-title">{active.label}</h2>
          {active.diagramDebt ? <DiagramDebt /> : null}
          <Blocks blocks={active.blocks} />
        </div>
      </motion.section>

      {/* -------------------------------------- accordion, mobile replacement */}
      <div className="case__accordion">
        {study.tabs.map((t) => {
          const open = openMobile === t.id;
          return (
            <div className={`case__acc ${open ? "is-open" : ""}`} key={t.id}>
              <button
                type="button"
                onClick={() => setOpenMobile(open ? null : t.id)}
                aria-expanded={open}
              >
                <span className="case__acc-group">{t.group}</span>
                <span className="case__acc-label">{t.label}</span>
                <FiChevronDown />
              </button>
              {open ? (
                <div className="case__acc-body">
                  {t.diagramDebt ? <DiagramDebt /> : null}
                  <Blocks blocks={t.blocks} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectPage;
