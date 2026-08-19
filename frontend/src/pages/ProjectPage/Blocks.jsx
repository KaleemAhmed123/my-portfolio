import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

// One renderer per block tag. Content files stay declarative arrays; adding a
// tab never touches this file.
const Block = ({ block }) => {
  const [kind] = block;

  switch (kind) {
    // chapter break inside a long tab: ["h", "01", "The buyer's side"]
    case "h":
      return (
        <h3 className="cs-h">
          <span className="cs-h__num">{block[1]}</span>
          <span className="cs-h__text">{block[2]}</span>
          <span className="cs-h__rule" />
        </h3>
      );

    case "lead":
      return <p className="cs-lead">{block[1]}</p>;

    case "p":
      return <p className="cs-p">{block[1]}</p>;

    case "list": {
      const [, title, items] = block;
      return (
        <div className="cs-list">
          {title ? <h4 className="cs-list__title">{title}</h4> : null}
          <ul>
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      );
    }

    case "pre":
      return (
        <div className="cs-pre">
          <pre>{block[1]}</pre>
        </div>
      );

    case "table": {
      const [, heads, rows] = block;
      return (
        <div className="cs-table">
          <table>
            <thead>
              <tr>
                {heads.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    case "cards": {
      const [, cards] = block;
      // Cards with labelled rows are long-form. Sitting them in a multi-column
      // grid next to a two-line card is what leaves holes, so a block that
      // contains any of them goes single-column instead.
      const longForm = cards.some((card) => card.rows);
      return (
        <div className={`cs-cards${longForm ? " cs-cards--stack" : ""}`}>
          {cards.map((card, i) => (
            <article className="cs-card" key={i}>
              <h4>{card.t}</h4>
              {card.body ? <p>{card.body}</p> : null}
              {card.rows
                ? card.rows.map(([label, text], j) => (
                    <div className="cs-card__row" key={j}>
                      <span className="cs-card__label">{label}</span>
                      <p>{text}</p>
                    </div>
                  ))
                : null}
            </article>
          ))}
        </div>
      );
    }

    // ["video", src, caption] — preload metadata only so a 15MB clip doesn't
    // download until someone actually wants it.
    case "video": {
      const [, src, caption] = block;
      // poster sits beside the clip as a .jpg; a missing one just falls back to
      // the browser's first frame
      const poster = src.replace(/\.(mp4|webm)$/, ".jpg");
      return (
        <figure className="cs-video">
          <video
            src={src}
            poster={poster}
            controls
            muted
            playsInline
            preload="metadata"
          />
          {caption ? <figcaption>{caption}</figcaption> : null}
        </figure>
      );
    }

    case "note":
      return <aside className="cs-note">{block[1]}</aside>;

    case "stats": {
      const [, stats] = block;
      return (
        <div className="cs-stats">
          {stats.map(([value, label], i) => (
            <div className="cs-stat" key={i}>
              <span className="cs-stat__value">{value}</span>
              <span className="cs-stat__label">{label}</span>
            </div>
          ))}
        </div>
      );
    }

    default:
      return null;
  }
};

// Shown on tabs whose real diagrams still live in the project repo as Excalidraw
// source. Better to name the gap than to quietly ship ASCII as if it were final.
export const DiagramDebt = () => (
  <aside className="cs-debt">
    <FiAlertTriangle />
    <span>
      Diagrams below are the text versions. The project repo holds 25 Excalidraw
      sources that have not been exported and dropped in here yet.
    </span>
  </aside>
);

const Blocks = ({ blocks }) => (
  <>
    {blocks.map((block, i) => (
      <Block block={block} key={i} />
    ))}
  </>
);

export default Blocks;
