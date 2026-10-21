
import { useState } from "react";
import "./App.css";

const pages = [
  "DIGITAL DETECTIVE",
  "MISSION BRIEFING",
  "EVIDENCE ACADEMY",
  "DIGITAL CRIME SCENE",
  "DETECTIVE CHALLENGES",
  "THE DECISION ROOM",
  "FINAL INVESTIGATION REPORT",
  "PROJECT CREDITS",
];

const evidenceCards = [
  {
    id: 0,
    title: "SUSPICIOUS LINKS",
    icon: "🔗",
    description: "Check the website address before opening any link.",
    details:
      "Fake websites may use strange addresses, extra words, and misspellings.",
    clue: "A link that does not match the official website is a warning sign.",
  },
  {
    id: 1,
    title: "FAKE PRIZES",
    icon: "🎁",
    description: "Be careful with unexpected prizes and special offers.",
    details:
      "Scammers may claim you won a prize and ask for money or personal information.",
    clue: "A prize requiring passwords or payment may be a scam.",
  },
  {
    id: 2,
    title: "WEBSITE MISTAKES",
    icon: "🕵️",
    description: "Look for spelling errors and suspicious website design.",
    details:
      "Fake websites may contain spelling mistakes, broken pages, and copied logos.",
    clue: "A professional-looking design does not prove a website is trustworthy.",
  },
  {
    id: 3,
    title: "PERSONAL DATA",
    icon: "🔐",
    description: "Protect passwords and verification codes.",
    details:
      "Never share your password or one-time verification code on suspicious pages.",
    clue: "Unexpected requests for private information are a major warning sign.",
  },
];

const cases = [
  {
    title: "CASE 01 — THE FREE PHONE",
    story:
      "A website says you won a new phone. It asks for your password and a delivery fee.",
    question: "What should the detective do?",
    options: [
      "Enter the password",
      "Pay the delivery fee",
      "Avoid the website and verify the offer",
    ],
    correct: 2,
    explanation:
      "Unexpected prizes asking for passwords or payments are suspicious.",
  },
  {
    title: "CASE 02 — THE URGENT MESSAGE",
    story:
      "A message says your account will close in five minutes unless you click a link.",
    question: "What is the safest response?",
    options: [
      "Click the link immediately",
      "Open the official website independently",
      "Send your verification code",
    ],
    correct: 1,
    explanation:
      "Verify account warnings through the official website or app.",
  },
  {
    title: "CASE 03 — THE STRANGE ADDRESS",
    story:
      "A page looks like your bank's website, but its address has extra words and spelling mistakes.",
    question: "What should you do?",
    options: [
      "Enter your banking details",
      "Trust the logo",
      "Leave and use the official bank website",
    ],
    correct: 2,
    explanation:
      "Always check the complete website address before entering sensitive information.",
  },
];

const decisionOptions = [
  {
    title: "CLICK THE LINK",
    description: "Open the suspicious page and continue.",
  },
  {
    title: "SHARE YOUR DETAILS",
    description: "Enter your password and verification code.",
  },
  {
    title: "STOP AND VERIFY",
    description: "Leave the page and check through an official source.",
  },
];

export default function App() {
  const [page, setPage] = useState(0);
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [evidenceViewed, setEvidenceViewed] = useState([]);
  const [simulationOpen, setSimulationOpen] = useState(false);
  const [showClues, setShowClues] = useState(false);
  const [crimeChoice, setCrimeChoice] = useState(null);
  const [caseIndex, setCaseIndex] = useState(0);
  const [caseAnswers, setCaseAnswers] = useState({});
  const [decision, setDecision] = useState(null);

  const answeredCount = Object.keys(caseAnswers).length;

  const correctCount = Object.values(caseAnswers).filter(
    (item) => item.correct
  ).length;

  const analyzeEarned = evidenceViewed.length === evidenceCards.length;
  const investigateEarned = answeredCount === cases.length;
  const protectEarned = decision === 2;

  function goToPage(index) {
    setPage(Math.max(0, Math.min(index, pages.length - 1)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selectEvidence(item) {
    setSelectedEvidence(item);
    setEvidenceViewed((previous) =>
      previous.includes(item.id) ? previous : [...previous, item.id]
    );
  }

  function answerCase(optionIndex) {
    if (caseAnswers[caseIndex] !== undefined) return;

    setCaseAnswers((previous) => ({
      ...previous,
      [caseIndex]: {
        answer: optionIndex,
        correct: optionIndex === cases[caseIndex].correct,
      },
    }));
  }

  function nextCase() {
    if (caseAnswers[caseIndex] === undefined) return;

    if (caseIndex < cases.length - 1) {
      setCaseIndex((previous) => previous + 1);
    } else {
      goToPage(5);
    }
  }

  function resetProject() {
    setPage(0);
    setSelectedEvidence(null);
    setEvidenceViewed([]);
    setSimulationOpen(false);
    setShowClues(false);
    setCrimeChoice(null);
    setCaseIndex(0);
    setCaseAnswers({});
    setDecision(null);
  }

  const currentCase = cases[caseIndex];
  const currentAnswer = caseAnswers[caseIndex];

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">C</div>
          <div>
            <div className="brand-name">CYBERGUARD</div>
            <div className="brand-subtitle">DIGITAL SAFETY LAB</div>
          </div>
        </div>

        <div className="status">
          <span className="status-dot" />
          INVESTIGATION MODE
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <div className="side-label">INVESTIGATION FILES</div>

          {pages.map((item, index) => (
            <button
              key={item}
              className={`nav-item ${page === index ? "active" : ""}`}
              onClick={() => goToPage(index)}
            >
              <span className="nav-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </button>
          ))}

          <div className="sidebar-progress">
            <div className="side-label">MISSION PROGRESS</div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${((page + 1) / pages.length) * 100}%` }}
              />
            </div>

            <p>
              FILE {String(page + 1).padStart(2, "0")} / 08
            </p>
          </div>
        </aside>

        <main className="content">
          {/* PAGE 1: ORIGINAL COVER */}
          {page === 0 && (
            <section className="page-section">
              <div className="hero">
                <div className="hero-copy">
                  <div className="eyebrow">
                    <span className="status-dot" />
                    CYBER SECURITY INVESTIGATION
                  </div>

                  <h1>
                    DIGITAL
                    <br />
                    <span className="accent">DETECTIVE</span>
                  </h1>

                  <p className="description">
                    Think like a detective. Investigate suspicious websites,
                    uncover digital clues, and learn how to protect your
                    personal information online.
                  </p>

                  <div className="tag-row">
                    <span className="tag">8 INVESTIGATION FILES</span>
                    <span className="tag">INTERACTIVE LEARNING</span>
                    <span className="tag">CYBER SAFETY</span>
                  </div>

                  <button
                    className="primary-btn"
                    onClick={() => goToPage(1)}
                  >
                    START INVESTIGATION <span>→</span>
                  </button>
                </div>

                <div className="scanner-panel">
                  <div className="scanner-top">
                    <span>SECURITY SCANNER</span>
                    <span className="scanner-light">● ONLINE</span>
                  </div>

                  <div className="scanner-graphic">
                    <div className="scanner-ring ring-one" />
                    <div className="scanner-ring ring-two" />
                    <div className="scanner-ring ring-three" />
                    <div className="scanner-center">⌕</div>
                    <div className="scanner-line" />
                  </div>

                  <div className="scanner-info">
                    <span>THREAT DETECTION</span>
                    <strong>READY TO SCAN</strong>
                  </div>
                </div>
              </div>

              {/* THREE SEPARATE FEATURE BOXES */}
              <div className="feature-grid">
                {[
                  [
                    "⌕",
                    "ANALYZE",
                    "Inspect digital evidence.",
                    analyzeEarned,
                  ],
                  [
                    "◈",
                    "INVESTIGATE",
                    "Solve the detective cases.",
                    investigateEarned,
                  ],
                  [
                    "⬡",
                    "PROTECT",
                    "Make safe online decisions.",
                    protectEarned,
                  ],
                ].map(([icon, title, description, earned]) => (
                  <div className="feature" key={title}>
                    <div className="feature-icon">{icon}</div>

                    <div className="feature-content">
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>

                    <b className="feature-status">
                      {earned ? "✓" : "○"}
                    </b>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* PAGE 2: MISSION BRIEFING */}
          {page === 1 && (
            <section className="page-section">
              <div className="eyebrow">FILE 02 / MISSION BRIEFING</div>

              <h1 className="page-title">
                YOUR <span className="accent">MISSION</span>
              </h1>

              <p className="description">
                Fake websites are designed to look trustworthy. Identify
                warning signs before they cause harm.
              </p>

              <div className="case-card">
                <div className="card-topline">MISSION OBJECTIVES</div>

                {[
                  [
                    "01",
                    "IDENTIFY THE CLUES",
                    "Recognize suspicious links, fake prizes, and misleading details.",
                  ],
                  [
                    "02",
                    "INVESTIGATE THE EVIDENCE",
                    "Examine a simulated website and identify warning signs.",
                  ],
                  [
                    "03",
                    "MAKE SAFE DECISIONS",
                    "Solve cases and choose safe responses to online threats.",
                  ],
                ].map(([number, title, description]) => (
                  <div className="objective" key={number}>
                    <span className="objective-number">{number}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hint">
                <strong>DETECTIVE TIP</strong>
                <p>
                  Never trust a website just because it looks professional.
                  Check its address and requests.
                </p>
              </div>

              <button className="primary-btn" onClick={() => goToPage(2)}>
                OPEN EVIDENCE ACADEMY →
              </button>
            </section>
          )}

          {/* PAGE 3: EVIDENCE ACADEMY */}
          {page === 2 && (
            <section className="page-section">
              <div className="eyebrow">FILE 03 / EVIDENCE ACADEMY</div>

              <h1 className="page-title">
                EXAMINE THE <span className="accent">EVIDENCE</span>
              </h1>

              <p className="description">
                Select each card to investigate its warning signs.
              </p>

              <div className="evidence-grid">
                {evidenceCards.map((item) => (
                  <button
                    key={item.id}
                    className={`evidence-card ${
                      selectedEvidence?.id === item.id ? "selected" : ""
                    }`}
                    onClick={() => selectEvidence(item)}
                  >
                    <div className="evidence-icon">{item.icon}</div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>

                    <span className="evidence-link">
                      {evidenceViewed.includes(item.id)
                        ? "✓ INVESTIGATED"
                        : "INSPECT EVIDENCE →"}
                    </span>
                  </button>
                ))}
              </div>

              {selectedEvidence && (
                <div className="case-card evidence-detail">
                  <div className="card-topline">EVIDENCE REPORT</div>
                  <h2>{selectedEvidence.title}</h2>
                  <p>{selectedEvidence.details}</p>

                  <div className="hint">
                    <strong>DETECTIVE CLUE</strong>
                    <p>{selectedEvidence.clue}</p>
                  </div>
                </div>
              )}

              <div className="achievement-status">
                EVIDENCE COLLECTED: {evidenceViewed.length} / 4
              </div>

              <button className="primary-btn" onClick={() => goToPage(3)}>
                ENTER DIGITAL CRIME SCENE →
              </button>
            </section>
          )}

          {/* PAGE 4: DIGITAL CRIME SCENE */}
          {page === 3 && (
            <section className="page-section">
              <div className="eyebrow">FILE 04 / DIGITAL CRIME SCENE</div>

              <h1 className="page-title">
                INSPECT THE <span className="accent">WEBSITE</span>
              </h1>

              <p className="description">
                This training simulation is not a real website.
              </p>

              <div className="browser-window">
                <div className="browser-bar">
                  <div className="browser-dots">
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="browser-address">
                    {simulationOpen
                      ? "http://claim-your-prize.example"
                      : "Training browser — no external website"}
                  </div>
                </div>

                {!simulationOpen ? (
                  <div className="browser-content">
                    <div className="fake-site-icon">◈</div>
                    <h2>SIMULATED WEBSITE LAB</h2>
                    <p>
                      Open the training page and look for suspicious signs.
                      Nothing is sent to a real website.
                    </p>

                    <button
                      className="primary-btn"
                      onClick={() => {
                        setSimulationOpen(true);
                        setShowClues(false);
                        setCrimeChoice(null);
                      }}
                    >
                      OPEN SIMULATED PAGE →
                    </button>
                  </div>
                ) : (
                  <div className="browser-content suspicious-site">
                    <div className="warning-banner">
                      ⚠ TRAINING EXAMPLE — SUSPICIOUS WEBSITE
                    </div>

                    <div className="fake-site-icon">🎁</div>
                    <h2>CONGRATULATIONS!</h2>
                    <h3>YOU HAVE WON A FREE PHONE!</h3>

                    <p>
                      Enter your password and personal information to claim
                      your reward.
                    </p>

                    <div className="fake-input">
                      Enter your password...
                    </div>

                    <div className="fake-input">
                      Enter verification code...
                    </div>

                    <button
                      className="primary-btn"
                      onClick={() => setCrimeChoice("unsafe")}
                    >
                      CLAIM MY PRIZE
                    </button>

                    <button
                      className="secondary-btn"
                      onClick={() => setCrimeChoice("safe")}
                    >
                      LEAVE THE WEBSITE
                    </button>

                    <button
                      className="text-btn"
                      onClick={() =>
                        setShowClues((previous) => !previous)
                      }
                    >
                      {showClues ? "HIDE CLUES" : "REVEAL WEBSITE CLUES"}
                    </button>

                    {showClues && (
                      <div className="hint">
                        <strong>CLUES DISCOVERED</strong>
                        <p>• Unexpected free prize.</p>
                        <p>
                          • Requests for passwords and verification codes.
                        </p>
                        <p>• Example domain used for training.</p>
                      </div>
                    )}

                    {crimeChoice && (
                      <div className="hint">
                        <strong>
                          {crimeChoice === "safe"
                            ? "SAFE DECISION"
                            : "RISKY DECISION"}
                        </strong>

                        <p>
                          {crimeChoice === "safe"
                            ? "Correct! Leave suspicious pages and verify offers independently."
                            : "Unsafe! Never enter passwords or verification codes on suspicious pages."}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button className="primary-btn" onClick={() => goToPage(4)}>
                CONTINUE TO CHALLENGES →
              </button>
            </section>
          )}

          {/* PAGE 5: DETECTIVE CHALLENGES */}
          {page === 4 && (
            <section className="page-section">
              <div className="eyebrow">FILE 05 / DETECTIVE CHALLENGES</div>

              <h1 className="page-title">
                SOLVE THE <span className="accent">CASES</span>
              </h1>

              <p className="description">
                Answer all three cases to continue to the decision room.
              </p>

              <div className="challenge-progress">
                CASE {caseIndex + 1} / {cases.length}

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(answeredCount / cases.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="case-card">
                <div className="card-topline">{currentCase.title}</div>

                <p>{currentCase.story}</p>
                <h2>{currentCase.question}</h2>

                <div className="answer-list">
                  {currentCase.options.map((option, index) => (
                    <button
                      key={option}
                      disabled={Boolean(currentAnswer)}
                      className={`answer-option ${
                        currentAnswer &&
                        currentAnswer.answer === index &&
                        currentAnswer.correct
                          ? "correct-answer"
                          : ""
                      } ${
                        currentAnswer &&
                        currentAnswer.answer === index &&
                        !currentAnswer.correct
                          ? "wrong-answer"
                          : ""
                      }`}
                      onClick={() => answerCase(index)}
                    >
                      <span className="answer-letter">
                        {String.fromCharCode(65 + index)}
                      </span>

                      {option}

                      {currentAnswer &&
                        currentAnswer.answer === index &&
                        currentAnswer.correct && <span> ✓</span>}

                      {currentAnswer &&
                        currentAnswer.answer === index &&
                        !currentAnswer.correct && <span> ✕</span>}
                    </button>
                  ))}
                </div>

                {currentAnswer && (
                  <div className="hint">
                    <strong>
                      {currentAnswer.correct
                        ? "CORRECT ANSWER"
                        : "INCORRECT ANSWER"}
                    </strong>
                    <p>{currentCase.explanation}</p>
                  </div>
                )}

                <button
                  className="primary-btn"
                  disabled={!currentAnswer}
                  onClick={nextCase}
                >
                  {caseIndex === cases.length - 1
                    ? "GO TO DECISION ROOM →"
                    : "NEXT CASE →"}
                </button>
              </div>

              <div className="achievement-status">
                CASES ANSWERED: {answeredCount} / {cases.length}
                {" · "}
                CORRECT: {correctCount}
              </div>
            </section>
          )}

          {/* PAGE 6: THE DECISION ROOM */}
          {page === 5 && (
            <section className="page-section">
              <div className="eyebrow">FILE 06 / THE DECISION ROOM</div>

              <h1 className="page-title">
                MAKE YOUR <span className="accent">DECISION</span>
              </h1>

              <p className="description">
                You discovered suspicious signs. Choose the safest action.
              </p>

              <div className="decision-list">
                {decisionOptions.map((item, index) => (
                  <button
                    key={item.title}
                    className={`decision-option ${
                      decision === index ? "selected" : ""
                    }`}
                    onClick={() => setDecision(index)}
                  >
                    <span className="decision-number">0{index + 1}</span>

                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>

                    {/* Neutral selection indicator, not a correctness mark */}
                    <span>{decision === index ? "●" : "○"}</span>
                  </button>
                ))}
              </div>

              {decision !== null && (
                <div className="case-card">
                  <div className="card-topline">
                    {decision === 2 ? "SAFE DECISION" : "SECURITY WARNING"}
                  </div>

                  <p>
                    {decision === 2
                      ? "Excellent! Stop, leave the suspicious page, and verify information through an official source."
                      : "This action can expose you to scams. The safest choice is STOP AND VERIFY."}
                  </p>
                </div>
              )}

              <button
                className="primary-btn"
                disabled={decision === null}
                onClick={() => goToPage(6)}
              >
                GENERATE FINAL REPORT →
              </button>
            </section>
          )}

          {/* PAGE 7: FINAL INVESTIGATION REPORT */}
          {page === 6 && (
            <section className="page-section">
              <div className="eyebrow">
                FILE 07 / FINAL INVESTIGATION REPORT
              </div>

              <h1 className="page-title">
                INVESTIGATION <span className="accent">REPORT</span>
              </h1>

              <p className="description">
                Your training results and detective achievements.
              </p>

              <div className="report-banner">
                <div className="report-icon">⌕</div>

                <div>
                  <h2>INVESTIGATION COMPLETE</h2>
                  <p>
                    You have reviewed the evidence, investigated the cases,
                    and made your security decision.
                  </p>
                </div>
              </div>

              <div className="report-grid">
                <div className="report-stat">
                  <span>EVIDENCE REVIEWED</span>
                  <strong>{evidenceViewed.length}/4</strong>
                </div>

                <div className="report-stat">
                  <span>CASES ANSWERED</span>
                  <strong>{answeredCount}/3</strong>
                </div>

                <div className="report-stat">
                  <span>CORRECT ANSWERS</span>
                  <strong>{correctCount}/3</strong>
                </div>

                <div className="report-stat">
                  <span>SAFE DECISION</span>
                  <strong>{protectEarned ? "YES" : "NO"}</strong>
                </div>
              </div>

              <div className="case-card">
                <div className="card-topline">ACHIEVEMENTS</div>

                <div className="achievement-list">
                  {[
                    [
                      "🔎",
                      "ANALYZE",
                      "Reviewed all four evidence cards.",
                      analyzeEarned,
                    ],
                    [
                      "🧩",
                      "INVESTIGATE",
                      "Answered all three cases.",
                      investigateEarned,
                    ],
                    [
                      "🛡️",
                      "PROTECT",
                      "Selected the safest action.",
                      protectEarned,
                    ],
                  ].map(([icon, title, description, earned]) => (
                    <div className="achievement-row" key={title}>
                      <span className="achievement-icon">{icon}</span>

                      <div>
                        <h3>{title}</h3>
                        <p>{description}</p>
                      </div>

                      <b>{earned ? "COMPLETED ✓" : "IN PROGRESS"}</b>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hint">
                <strong>REMEMBER</strong>
                <p>
                  Check website addresses, ignore unexpected prize messages,
                  never share verification codes, and verify through official
                  sources.
                </p>
              </div>

              <button className="primary-btn" onClick={() => goToPage(7)}>
                VIEW PROJECT CREDITS →
              </button>
            </section>
          )}

          {/* PAGE 8: PROJECT CREDITS */}
          {page === 7 && (
            <section className="page-section credits-page">
              <div className="credits-mark">C</div>

              <div className="eyebrow">PROJECT CREDITS / FILE 08</div>

              <h1 className="page-title">
                PROJECT <span className="accent">CREDITS</span>
              </h1>

              <h2>THE DIGITAL DETECTIVE</h2>

              <p className="description">
                An interactive educational project about identifying fake
                websites and protecting personal information online.
              </p>

              <div className="case-card">
                <div className="card-topline">PROJECT INFORMATION</div>

                <div className="credit-row">
                  <span>PROJECT TITLE</span>
                  <strong>THE DIGITAL DETECTIVE</strong>
                </div>

                <div className="credit-row">
                  <span>PROJECT TYPE</span>
                  <strong>FIELD TRAINING</strong>
                </div>

                <div className="credit-row">
                  <span>PREPARED BY</span>
                  <strong>Fatma Elzahraa Bakhit Abdelrahim</strong>
                </div>

                <div className="credit-row">
                  <span>SUPERVISED BY</span>
                  <strong>Dr. Nermin Nasr</strong>
                </div>

                <div className="credit-row">
                  <span>SUPERVISED BY</span>
                  <strong>Dr. Hossam Hamdy</strong>
                </div>
              </div>

              <button className="primary-btn" onClick={resetProject}>
                ↻ BACK TO PROJECT COVER
              </button>
            </section>
          )}

          <footer className="page-footer">
            <span>CYBERGUARD</span> DIGITAL SAFETY LAB

            <div className="footer-navigation">
              <button
                className="secondary-btn"
                disabled={page === 0}
                onClick={() => goToPage(page - 1)}
              >
                ← PREVIOUS
              </button>

              <span className="footer-counter">
                {String(page + 1).padStart(2, "0")} / 08
              </span>

              <button
                className="secondary-btn"
                disabled={page === 7}
                onClick={() => goToPage(page + 1)}
              >
                NEXT →
              </button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
