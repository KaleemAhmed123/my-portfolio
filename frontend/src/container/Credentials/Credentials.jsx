import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiCopy,
  FiCheck,
  FiExternalLink,
  FiSearch,
  FiLogIn,
} from "react-icons/fi";
import { HiOutlineKey } from "react-icons/hi";

import { client } from "../../client";
import { credentials as seedCredentials } from "../../constants/credentials";
import CommandPalette from "../../components/CommandPalette/CommandPalette";
import "./Credentials.scss";

// GROQ: pull every credentials document with its nested environments → portals.
const CREDENTIALS_QUERY = `*[_type == "credentials"] | order(order asc, name asc){
  "id": _id,
  name,
  description,
  tags,
  projectLink,
  codeLink,
  environments[]{
    name,
    note,
    portals[]{ role, url, email, username, password, token, note }
  }
}`;

const copyText = async (value) => {
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

// A copyable email / password chip.
const CopyField = ({ label, value }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await copyText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="cred__field">
      <span className="cred__field-label p-text">{label}</span>
      <button
        type="button"
        className={`cred__field-value ${copied ? "is-copied" : ""}`}
        onClick={handleCopy}
        title="Click to copy"
      >
        <span className="cred__field-text">{value}</span>
        {copied ? <FiCheck /> : <FiCopy />}
      </button>
    </div>
  );
};

// One-click "Copy login" — grabs the identifier (email/username) + password.
const CopyLoginButton = ({ identifier, password }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await copyText(`${identifier}\n${password}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      type="button"
      className={`cred__portal-copy ${copied ? "is-copied" : ""}`}
      onClick={handleCopy}
      title="Copy login + password"
    >
      {copied ? <FiCheck /> : <FiLogIn />}
      {copied ? "Copied" : "Copy login"}
    </button>
  );
};

// Shimmer placeholder shown while credentials load — mirrors the real card.
const SkeletonCard = () => (
  <div className="cred__project cred__skeleton" aria-hidden="true">
    <div className="cred__project-head">
      <div style={{ flex: 1 }}>
        <span className="sk sk-title" />
        <span className="sk sk-line" />
        <span className="sk sk-line sk-short" />
      </div>
    </div>
    <span className="sk sk-pill" />
    <span className="sk sk-portal" />
    <span className="sk sk-portal" />
  </div>
);

const PortalCard = ({ portal }) => {
  const identifier = portal.email || portal.username;
  return (
    <div className="cred__portal">
      <div className="cred__portal-head">
        <div className="cred__portal-role">
          <span className="cred__portal-dot" />
          <h5 className="bold-text">{portal.role}</h5>
          {portal.url ? (
            <a
              className="cred__portal-url p-text"
              href={portal.url}
              target="_blank"
              rel="noreferrer"
            >
              {portal.url}
            </a>
          ) : null}
        </div>
        <div className="cred__portal-actions">
          {identifier && portal.password ? (
            <CopyLoginButton identifier={identifier} password={portal.password} />
          ) : null}
          {portal.url ? (
            <a
              className="cred__portal-open"
              href={portal.url}
              target="_blank"
              rel="noreferrer"
              title={`Open ${portal.url}`}
            >
              Open <FiExternalLink />
            </a>
          ) : null}
        </div>
      </div>

      <div className="cred__fields">
        {portal.email ? <CopyField label="Email" value={portal.email} /> : null}
        {portal.username ? <CopyField label="User" value={portal.username} /> : null}
        {portal.password ? <CopyField label="Pass" value={portal.password} /> : null}
        {portal.token ? <CopyField label="Token" value={portal.token} /> : null}
      </div>

      {portal.note ? <p className="cred__portal-note p-text">{portal.note}</p> : null}
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  const [activeEnv, setActiveEnv] = useState(0);
  const environments = project.environments || [];
  const env = environments[activeEnv] || environments[0] || { portals: [] };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay: Math.min(index, 8) * 0.07 }}
      className="cred__project"
    >
      <div className="cred__project-head">
        <h3 className="bold-text cred__project-name">{project.name}</h3>
        {project.tags?.length ? (
          <div className="cred__tags">
            {project.tags.map((tag) => (
              <span className="cred__tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      {project.description ? (
        <p className="p-text cred__project-desc">{project.description}</p>
      ) : null}

      {/* Environment switcher — only when there's more than one */}
      {environments.length > 1 ? (
        <div className="cred__envs">
          {environments.map((e, i) => (
            <button
              type="button"
              key={e.name || i}
              className={`cred__env-tab ${i === activeEnv ? "is-active" : ""}`}
              onClick={() => setActiveEnv(i)}
            >
              {e.name}
            </button>
          ))}
        </div>
      ) : null}

      <div className="cred__portal-count p-text">
        {(env.portals || []).length} {(env.portals || []).length === 1 ? "portal" : "portals"}
        {env.note ? <span className="cred__env-note"> · {env.note}</span> : null}
      </div>

      <div className="cred__portals">
        {(env.portals || []).map((portal, i) => (
          <PortalCard portal={portal} key={`${env.name}-${i}`} />
        ))}
      </div>
    </motion.div>
  );
};

const Credentials = () => {
  // Seed the search from ?q= so a project card can deep-link a recruiter
  // straight to its credentials without them typing anything.
  const [query, setQuery] = useState(
    () => new URLSearchParams(window.location.search).get("q") || ""
  );
  const [projects, setProjects] = useState(null); // null = loading
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    client
      .fetch(CREDENTIALS_QUERY)
      .then((data) => {
        if (!mounted) return;
        // Sanity is the source of truth; fall back to the local seed only
        // while the CMS has no `credentials` documents yet.
        setProjects(data && data.length ? data : seedCredentials);
      })
      .catch(() => {
        if (mounted) setProjects(seedCredentials);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Global ⌘K / Ctrl+K to open the command palette.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const list = projects || [];
  const filtered = list.filter((p) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      p.name?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <>
      <h2 className="head-text">
        Test <span>Access</span> for Recruiters
      </h2>
      <p className="cred__subhead p-text">
        Everything you need to explore my projects hands-on. Pick a project, choose a
        portal, and click any field to copy it — or hit{" "}
        <kbd className="cred__kbd">⌘K</kbd> to jump straight to a login. All accounts
        are demo-only sandboxes.
      </p>

      <div className="cred__toolbar">
        <div className="cred__search">
          <FiSearch />
          <input
            type="text"
            placeholder="Search projects, roles or tech…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="cred__cmdk-trigger"
          onClick={() => setPaletteOpen(true)}
        >
          <span>Quick access</span>
          <kbd>⌘K</kbd>
        </button>
      </div>

      <div className="cred__grid">
        {projects === null ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : filtered.length ? (
          filtered.map((project, i) => (
            <ProjectCard project={project} index={i} key={project.id || project.name || i} />
          ))
        ) : (
          <div className="cred__empty app__flex">
            <HiOutlineKey />
            <p className="p-text">No projects match “{query}”.</p>
          </div>
        )}
      </div>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        projects={list}
      />
    </>
  );
};

export default Credentials;
