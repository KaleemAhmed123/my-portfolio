import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiExternalLink, FiGithub, FiChevronDown } from "react-icons/fi";
import { HiOutlineKey } from "react-icons/hi";

import { client } from "../../client";
import { slugForWork, studyFor } from "../../content/projects";
import Blocks, { DiagramDebt } from "./Blocks";
import "./ProjectPage.scss";

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

  useEffect(() => {
    if (!study?.title) return undefined;
    const previous = document.title;
    document.title = `${study.title} — case study`;
    return () => {
      document.title = previous;
    };
  }, [study]);

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
      <header className="case__head">
        <Link to="/#work" className="case__back">
          <FiArrowLeft /> Projects
        </Link>

        <div className="case__title-row">
          <h1 className="head-text">{study.title}</h1>
          {study.role ? <span className="case__pill">{study.role}</span> : null}
          {study.status ? (
            <span className="case__pill case__pill--live">{study.status}</span>
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
            {study.codeUrl ? (
              <a href={study.codeUrl} target="_blank" rel="noreferrer">
                <FiGithub /> Code
              </a>
            ) : null}
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

      {/* ------------------------------------------------ tabs, desktop only */}
      <nav className="case__tabs">
        {groups.map((group) => (
          <div className="case__tabgroup" key={group.name}>
            <span className="case__tabgroup-name">{group.name}</span>
            <div className="case__tabrow">
              {group.tabs.map((t) => (
                <Link
                  key={t.id}
                  to={`/work/${slug}/${t.id}`}
                  className={`case__tab ${t.id === active.id ? "is-active" : ""}`}
                >
                  {t.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* ------------------------------------------------------ panel, one tab */}
      <AnimatePresence mode="wait">
        <motion.section
          key={active.id}
          className="case__panel"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <div className="case__panel-inner">
            <h2 className="case__panel-title">{active.label}</h2>
            {active.diagramDebt ? <DiagramDebt /> : null}
            <Blocks blocks={active.blocks} />
          </div>
        </motion.section>
      </AnimatePresence>

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
