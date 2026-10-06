import { useState, useEffect, useRef } from "react";

/* ─── TIMELINE DATA ─── */
const TIMELINE = [
  {
    id: 1,
    year: "2015",
    type: "education",
    icon: "🏫",
    title: "SMK Medikacom Bandung",
    subtitle: "Teknik Sepeda Motor / Teknik Otomotif",
    period: "2015 – 2018",
    color: "#6366f1",
    description: "Menyelesaikan pendidikan menengah kejuruan di bidang otomotif. Mengembangkan disiplin teknis dan kemampuan analisis masalah.",
    tags: ["Pendidikan", "SMK"],
    highlight: null,
  },
  {
    id: 2,
    year: "Jun 2018",
    type: "work",
    icon: "🔧",
    title: "Motorcycle Mechanic",
    subtitle: "PT. Daya Anugrah Mandiri",
    period: "Jun 2018 – Agt 2020",
    color: "#DC143C",
    description: "Melakukan diagnosis, troubleshooting, dan perbaikan menyeluruh pada sistem mesin, kelistrikan, bahan bakar, dan transmisi sepeda motor Honda. Melaksanakan servis berkala sesuai prosedur teknis dan standar keselamatan kerja.",
    tags: ["Teknisi", "Otomotif", "Honda", "Troubleshooting"],
    highlight: null,
  },
  {
    id: 3,
    year: "Sep 2020",
    type: "work",
    icon: "🎨",
    title: "Graphic Designer",
    subtitle: "Papyrus Photo",
    period: "Sep 2020 – Agt 2022",
    color: "#DC143C",
    description: "Menghasilkan materi desain grafis cetak dan digital (poster, banner, album foto, materi promosi). Melakukan photo editing & retouching menggunakan Adobe Photoshop, CorelDRAW, dan Canva, serta berkomunikasi langsung dengan pelanggan untuk eksekusi revisi.",
    tags: ["Desain Grafis", "Photoshop", "CorelDRAW", "Photo Editing"],
    highlight: null,
  },
  {
    id: 4,
    year: "2022",
    type: "education",
    icon: "🎓",
    title: "UNIBI Bandung",
    subtitle: "S1 Teknik Informatika",
    period: "2022 – 2026",
    color: "#0ea5e9",
    description: "Menempuh pendidikan S1 Teknik Informatika dengan fokus pada pengembangan perangkat lunak, basis data, dan sistem informasi.",
    tags: ["Pendidikan", "S1", "Teknik Informatika"],
    highlight: "IPK 3.65",
  },
  {
    id: 5,
    year: "Feb 2025",
    type: "work",
    icon: "💼",
    title: "Magang — Full Stack Developer",
    subtitle: "Pengadilan Negeri Bale Bandung",
    period: "Feb 2025 – Agt 2025",
    color: "#DC143C",
    description: "Magang sebagai Full Stack Developer selama 6 bulan. Membangun sistem administrasi Layung Peradilan dari requirement gathering hingga deployment production.",
    tags: ["Magang", "Full Stack", "Laravel", "PHP", "MySQL", "RESTful API"],
    highlight: "Nilai 90/100",
  },
  {
    id: 6,
    year: "Agt 2025",
    type: "achievement",
    icon: "🚀",
    title: "Layung Peradilan",
    subtitle: "Production Deployment",
    period: "Agt 2025",
    color: "#059669",
    description: "Sistem Layung Peradilan berhasil di-deploy ke production dan aktif digunakan oleh Pengadilan Negeri Bale Bandung. Terintegrasi dengan 3 API Disdukcapil.",
    tags: ["Production", "Deployment", "Achievement"],
  },
  {
    id: 7,
    year: "2026",
    type: "education",
    icon: "🏆",
    title: "Lulus S1 Teknik Informatika",
    subtitle: "UNIBI Bandung",
    period: "2026",
    color: "#f59e0b",
    description: "Menyelesaikan studi S1 Teknik Informatika di UNIBI Bandung dengan IPK 3.65. Siap terjun ke dunia profesional sebagai Full Stack Developer / Web Developer.",
    tags: ["Lulus", "S.Kom", "Fresh Graduate"],
    highlight: "IPK 3.65",
  },
  {
    id: 8,
    year: "Sekarang",
    type: "current",
    icon: "🎯",
    title: "Open to Work",
    subtitle: "Bandung",
    period: "2026",
    color: "#22c55e",
    description: "Aktif mencari peluang kerja sebagai Full Stack Developer atau Web Developer. Siap berkontribusi dan terus belajar teknologi baru.",
    tags: ["Available", "Full Stack"],
  },
];

const TYPE_COLORS = {
  education: "#0ea5e9",
  work: "#DC143C",
  achievement: "#059669",
  current: "#22c55e",
};

const TYPE_LABELS = {
  education: "Pendidikan",
  work: "Pengalaman",
  achievement: "Pencapaian",
  current: "Status",
};

/* ─── USEOBSERVER ─── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── SKILL TAG ─── */
const PHOTOSHOP_SVG = (
  <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <path fill="#31A8FF" d="M0 0h24v24H0z"/>
    <path fill="#fff" d="M5.5 17.5V6.5h4.2c1 0 1.8.2 2.5.7s1 1.2 1 2.2c0 .6-.1 1.1-.4 1.5s-.7.8-1.2 1c.7.2 1.2.6 1.6 1.1s.6 1.2.6 1.9c0 1.1-.4 2-1.1 2.6s-1.7.9-3 .9H5.5zm2-6.6h2c.6 0 1-.1 1.3-.4s.5-.7.5-1.2-.2-.9-.5-1.2-1-.4-1.8-.4H7.5v3.2zm0 4.8h2.3c.7 0 1.2-.2 1.6-.5s.6-.8.6-1.4-.2-1.1-.5-1.4-1-.5-1.7-.5H7.5v3.8zm9.1.9c-.5 0-1-.1-1.5-.4s-.9-.6-1.2-1l1-1c.2.3.5.5.8.7s.6.2.9.2.6-.1.8-.2.3-.4.3-.6c0-.3-.1-.5-.3-.7s-.6-.4-1.1-.6c-.5-.2-.9-.4-1.2-.6s-.6-.5-.8-.8-.3-.7-.3-1.1c0-.5.1-.9.4-1.3s.6-.7 1-.8.9-.3 1.4-.3c.5 0 1 .1 1.4.3s.7.4 1 .7l-.9 1c-.2-.2-.5-.4-.7-.5s-.5-.2-.8-.2-.5.1-.7.2-.3.3-.3.6c0 .3.1.5.3.6s.5.3.9.5c.5.2 1 .4 1.3.7s.6.5.8.9.3.8.3 1.2c0 .5-.1 1-.4 1.3s-.6.7-1 .8-.9.4-1.4.4z"/>
  </svg>
);

const CANVA_SVG = (
  <svg width="14" height="14" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <g fill="#00C4CC">
      <path d="M59.39.152c-.484.051-1.995.23-3.328.387-5.374.613-11.468 2.227-16.816 4.48C19.891 13.106 5.324 30.849 1.305 51.2.359 56.04.129 58.418.129 64c0 7.195.715 12.16 2.61 18.434 6.195 20.53 22.323 36.632 42.906 42.851 6.195 1.871 11.187 2.586 18.355 2.586 7.195 0 12.16-.715 18.434-2.61 20.53-6.195 36.632-22.323 42.851-42.906 1.871-6.195 2.586-11.187 2.586-18.355 0-3.047-.152-6.527-.332-7.809-2.074-14.796-8.168-27.238-18.328-37.402C99.07 8.703 86.68 2.586 72.19.512c-1.996-.282-11.238-.54-12.8-.36zm-20.863 40.32c1.36.41 1.996.794 2.918 1.715 1.793 1.82 2.203 2.817 2.203 5.555 0 2.051-.078 2.434-.691 3.508-1.18 1.996-3.918 3.84-5.812 3.89-1.333.028-1.278-.562.18-2.097 1.945-2.023 2.226-2.79 2.226-5.813-.024-2.917-.383-3.914-1.739-4.734-1.128-.691-2.355-.64-4.148.203-4.66 2.23-9.703 9.653-11.672 17.258-2.613 10.137 2.02 18.25 9.649 16.867 2.226-.41 6.425-2.558 8.246-4.25 1.508-1.379 1.508-1.406 1.66-3.12.336-3.587 2.867-7.169 6.25-8.833 1.558-.77 1.945-.844 4.043-.844 1.996 0 2.457.102 3.43.637 3.097 1.77 2.457 5.89-.895 5.89-1.945 0-2.945-1-1.535-1.534 1.383-.512.867-2.434-.742-2.868-1.895-.488-4.047.793-5.403 3.25-1.64 2.97-1.715 6.504-.156 8.114 1.512 1.613 3.406.336 4.867-3.329.766-1.867 1.867-2.867 3.149-2.867 1.125 0 1.332.692.843 2.793-.718 3.25-.23 4.094 1.793 3.098.664-.309 1.766-1.023 2.43-1.535l1.254-1 .848-4.43c.922-4.965 1.277-5.633 3.172-5.988 1.82-.336 2.23.562 1.562 3.402l-.36 1.59 1.333-1.36c3.148-3.226 7.015-4.812 8.347-3.48.715.715.637 1.613-.386 4.785-.485 1.512-1.153 3.895-1.457 5.25-.461 2.047-.489 2.535-.23 2.868.82.972 3.327-.028 5.554-2.204l1.305-1.277.156-2.844c.152-3.277.457-4.453 1.328-5.504.82-.972 2.305-1.687 3.098-1.484.793.207.793.973.078 3.227-1 3.097-.895 10.238.129 10.238.41 0 2.507-2.2 3.84-4.043l.996-1.36-.793-.816c-1.383-1.46-1.715-2.406-1.715-4.789 0-1.738.129-2.379.562-3.227.719-1.328 1.844-2.3 3.176-2.687 1.406-.434 3.148.281 3.863 1.562.719 1.305.54 4.223-.383 6.223l-.664 1.457h.895c1.23 0 1.715-.305 3.918-2.379 1.152-1.101 2.484-2.05 3.48-2.511 3.918-1.84 8.528-.895 9.293 1.921.64 2.254-.765 3.84-3.226 3.66-1.766-.128-2.098-.59-1.074-1.456 1.843-1.54 0-3.508-2.637-2.793-1.434.386-3.047 1.996-3.89 3.867-1.692 3.738-.794 8.14 1.636 8.14.973 0 2.691-1.921 3.355-3.789.793-2.152 2.457-3.507 3.711-3.02.692.255.743.946.309 3.122-.488 2.383-.563 4.61-.18 5.633.153.382.614 1.101 1.051 1.586.816.921.844 1.254.152 1.691-.332.23-.77.129-1.843-.46-1.485-.77-2.766-2.153-3.227-3.458l-.281-.766-1.024.766c-.59.41-1.511.871-2.047 1.023-2.125.563-4.738-.894-5.964-3.351-.489-.95-.641-3.738-.282-4.813.204-.59.204-.59-.617-.18-.433.231-1.355.485-2.07.563-1.18.13-1.36.258-2.535 1.742-1.664 2.07-4.61 4.864-5.813 5.454-2.558 1.277-3.402.918-4.07-1.72l-.461-1.765-1.102.973c-1.406 1.23-4.222 2.715-5.836 3.074-1.535.332-3.175-.156-3.84-1.18-.995-1.535-.663-4.785.922-9.164 1.176-3.25.333-3.3-2.636-.203-2.203 2.328-3.149 3.992-3.762 6.578-.64 2.688-1.41 3.66-3.148 4.07-1.051.231-1.54-.41-1.332-1.816l.152-1.129-.973.668c-1.383.946-3.125 1.817-4.328 2.149-1.203.332-2.789-.024-3.172-.692-.691-1.175-.691-1.175-1.765-.332-2.332 1.895-5.66 1.356-7.348-1.152l-.54-.793-1.687 1.562c-4.867 4.454-10.957 6.45-15.464 5.067-5.735-1.738-8.907-6.656-8.856-13.746.024-7.117 3.172-14.617 8.473-20.172 2.996-3.125 5.812-4.969 8.68-5.66 2.07-.512 3.328-.485 5.296.129zm0 0"/>
      <path d="M90.418 58.676c-.563.562-.356 2.816.36 4.25.359.742.742 1.332.87 1.332.102 0 .332-.59.512-1.309.64-2.66-.512-5.504-1.742-4.273zm0 0"/>
    </g>
  </svg>
);

function SkillTag({ label, color, icon }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      border: `1.5px solid ${color}`,
      borderRadius: 999, padding: "6px 14px",
      background: `${color}12`,
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "none",
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 4px 14px ${color}40`; }}
    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
      {icon === "photoshop" ? PHOTOSHOP_SVG : icon === "canva" ? CANVA_SVG : (
        <img src={`https://cdn.simpleicons.org/${icon}/${color.replace("#","")}`} alt={label}
          style={{ width: 14, height: 14, objectFit: "contain", flexShrink: 0 }} />
      )}
      <span style={{ fontSize: 12, fontWeight: 600, color, whiteSpace: "nowrap" }}>{label}</span>
    </div>
  );
}

/* ─── TIMELINE NODE ─── */
function TimelineNode({ item, index, isActive, onClick }) {
  const nodeRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (nodeRef.current) obs.observe(nodeRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @media (max-width: 600px) {
          .timeline-node { flex-direction: row !important; }
          .timeline-card-wrap { padding: 0 0 0 16px !important; justify-content: flex-start !important; }
          .timeline-empty { display: none !important; }
        }
      `}</style>
      <div
        ref={nodeRef}
        onClick={onClick}
        className="timeline-node"
        style={{
          display: "flex",
          flexDirection: index % 2 === 0 ? "row" : "row-reverse",
          alignItems: "flex-start",
          gap: 0,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
          cursor: "none",
          marginBottom: 8,
        }}
      >
        {/* Card side */}
        <div className="timeline-card-wrap" style={{
          flex: 1,
          padding: index % 2 === 0 ? "0 28px 0 0" : "0 0 0 28px",
          display: "flex",
          justifyContent: index % 2 === 0 ? "flex-end" : "flex-start",
        }}>
        <div
          style={{
            maxWidth: 320,
            background: isActive ? `rgba(${hexToRgb(item.color)},0.1)` : "rgba(255,255,255,0.03)",
            border: `1px solid ${isActive ? `rgba(${hexToRgb(item.color)},0.4)` : "rgba(255,255,255,0.08)"}`,
            borderRadius: 14,
            padding: "16px 18px",
            transition: "all 0.3s ease",
            boxShadow: isActive ? `0 8px 32px rgba(${hexToRgb(item.color)},0.15)` : "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
            <span style={{
              fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em",
              color: item.color, background: `rgba(${hexToRgb(item.color)},0.1)`,
              border: `1px solid rgba(${hexToRgb(item.color)},0.25)`,
              borderRadius: 999, padding: "2px 10px", filter: "brightness(1.3)",
            }}>{TYPE_LABELS[item.type]}</span>
            {item.highlight && (
              <span style={{
                fontSize: 10, fontWeight: 700,
                color: "rgba(255,255,255,0.7)",
                background: "rgba(255,255,255,0.06)",
                borderRadius: 999, padding: "2px 10px",
              }}>✦ {item.highlight}</span>
            )}
          </div>

          <h4 style={{ fontSize: 14, fontWeight: 700, color: "white", margin: "0 0 3px", lineHeight: 1.3 }}>{item.title}</h4>
          <p style={{ fontSize: 12, color: item.color, marginBottom: 6, fontWeight: 500, filter: "brightness(1.3)" }}>{item.subtitle}</p>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: isActive ? 10 : 0 }}>{item.period}</p>

          {isActive && (
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 10, marginTop: 4 }}>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 10, textAlign: "justify" }}>{item.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {item.tags.map((t) => (
                  <span key={t} style={{
                    fontSize: 10, color: "rgba(255,255,255,0.4)",
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 6, padding: "2px 8px",
                  }}>{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center dot */}
      <div style={{
        width: 44, flexShrink: 0,
        display: "flex", flexDirection: "column", alignItems: "center",
        paddingTop: 14,
      }}>
        <div style={{
          width: isActive ? 40 : 32,
          height: isActive ? 40 : 32,
          borderRadius: "50%",
          background: isActive ? item.color : `rgba(${hexToRgb(item.color)},0.15)`,
          border: `2px solid ${isActive ? item.color : `rgba(${hexToRgb(item.color)},0.4)`}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: isActive ? 16 : 13,
          transition: "all 0.3s ease",
          boxShadow: isActive ? `0 0 20px rgba(${hexToRgb(item.color)},0.5)` : "none",
          zIndex: 2, position: "relative",
        }}>
          {item.icon}
        </div>
      </div>

      {/* Empty opposite side */}
      <div className="timeline-empty" style={{ flex: 1 }} />
    </div>
    </>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

/* ─── MAIN SECTION ─── */
export default function ResumeSection() {
  const [activeId, setActiveId] = useState(3);
  const [titleRef, titleInView] = useInView(0.1);

  const SKILLS = [
    { label: "PHP",              color: "#8892bf", icon: "php" },
    { label: "Laravel",          color: "#FF2D20", icon: "laravel" },
    { label: "MySQL",            color: "#4479A1", icon: "mysql" },
    { label: "HTML5",            color: "#E34F26", icon: "html5" },
    { label: "CSS3",             color: "#1572B6", icon: "css" },
    { label: "JavaScript",       color: "#F7DF1E", icon: "javascript" },
    { label: "Bootstrap",        color: "#7952B3", icon: "bootstrap" },
    { label: "RESTful API",      color: "#FF6C37", icon: "postman" },
    { label: "Postman",          color: "#FF6C37", icon: "postman" },
    { label: "Git",              color: "#F05032", icon: "git" },
    { label: "GitHub",           color: "#ffffff", icon: "github" },
    { label: "Composer",         color: "#885630", icon: "composer" },
    { label: "Apache",           color: "#D22128", icon: "apache" },
    { label: "React",            color: "#61DAFB", icon: "react" },
    { label: "Vite",             color: "#646CFF", icon: "vite" },
    { label: "Firebase",         color: "#FFCA28", icon: "firebase" },
    { label: "Photoshop",        color: "#31A8FF", icon: "photoshop" },
    { label: "Canva",            color: "#00C4CC", icon: "canva" },
  ];

  return (
    <section
      id="resume"
      style={{
        padding: "96px 0",
        background: "#0d0d12",
        fontFamily: "'Poppins', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* bg glows */}
      <div style={{
        position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: 600, height: 600, borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(circle, rgba(220,20,60,0.04) 0%, transparent 60%)",
      }} />

      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 80px" }} className="resume-container">

        {/* Title */}
        <div
          ref={titleRef}
          style={{
            textAlign: "center", marginBottom: 64,
            opacity: titleInView ? 1 : 0,
            transform: titleInView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <h2 style={{
            fontSize: "clamp(32px,4vw,48px)", fontWeight: 600,
            color: "crimson", marginBottom: 8,
            fontFamily: "'Ubuntu', sans-serif",
          }}>Resume</h2>
          <div style={{ width: 48, height: 2, background: "crimson", margin: "0 auto 12px", borderRadius: 2 }} />
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Latar belakang & pengalaman saya
          </p>
        </div>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }} className="resume-grid">

          {/* LEFT — Timeline */}
          <div>
            <p style={{
              fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.25)",
              textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 32,
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
              Perjalanan Karir
              <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
            </p>

            {/* Timeline */}
            <div style={{ position: "relative" }}>
              {/* Vertical line */}
              <div style={{
                position: "absolute",
                left: "50%", top: 20, bottom: 20,
                width: 2,
                background: "linear-gradient(to bottom, transparent, rgba(220,20,60,0.3) 15%, rgba(220,20,60,0.3) 85%, transparent)",
                transform: "translateX(-50%)",
                zIndex: 1,
              }} />

              {TIMELINE.map((item, i) => (
                <TimelineNode
                  key={item.id}
                  item={item}
                  index={i}
                  isActive={activeId === item.id}
                  onClick={() => setActiveId(activeId === item.id ? null : item.id)}
                />
              ))}
            </div>
          </div>

          {/* RIGHT — Profile + Skills + Contact */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Profile */}
            <div style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 18, padding: "24px 24px",
              opacity: titleInView ? 1 : 0,
              transform: titleInView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}>
              <h3 style={{
                fontSize: 11, fontWeight: 700, color: "crimson",
                textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 14,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span>👤</span> Profil
              </h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.85, textAlign: "justify" }}>
                Full Stack Web Developer dengan latar belakang pengalaman profesional di pengembangan aplikasi web,
                desain grafis, dan layanan teknis. Memahami alur pengembangan end-to-end, integrasi API, dan
                pengelolaan database MySQL. Problem solver yang adaptif terhadap teknologi baru, terbiasa bekerja
                dengan target waktu yang ketat, dan selalu berorientasi pada kepuasan serta kebutuhan pengguna.
              </p>
            </div>

            {/* Skills */}
            <div
              style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 18, padding: "24px 24px",
                opacity: titleInView ? 1 : 0,
                transform: titleInView ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease 0.35s, transform 0.6s ease 0.35s",
              }}
            >
              <h3 style={{
                fontSize: 11, fontWeight: 700, color: "crimson",
                textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 18,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span>💻</span> Tech Skills
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, overflowX: "hidden" }}>
                {SKILLS.map((s) => (
                  <SkillTag key={s.label} {...s} />
                ))}
              </div>
            </div>

            {/* Soft skills */}
            <div style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 18, padding: "24px 24px",
              opacity: titleInView ? 1 : 0,
              transform: titleInView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s",
            }}>
              <h3 style={{
                fontSize: 11, fontWeight: 700, color: "crimson",
                textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 14,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span>🧠</span> Soft Skills
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  "Problem Solving", 
                  "Komunikasi Teknis", 
                  "System Analysis",
                  "Berorientasi Kebutuhan Pengguna", 
                  "Adaptif terhadap Teknologi Baru", 
                  "Troubleshooting",
                  "Kerja di Bawah Tekanan", 
                  "Manajemen Waktu"
                ].map((s) => (
                  <span key={s} style={{
                    fontSize: 12, color: "rgba(255,255,255,0.6)",
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: 8, padding: "6px 12px", fontWeight: 500,
                  }}>{s}</span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div style={{
              background: "rgba(220,20,60,0.05)", border: "1px solid rgba(220,20,60,0.15)",
              borderRadius: 18, padding: "20px 24px",
              opacity: titleInView ? 1 : 0,
              transform: titleInView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s",
            }}>
              <h3 style={{
                fontSize: 11, fontWeight: 700, color: "crimson",
                textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 14,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span>📞</span> Kontak
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { icon: "🐙", label: "github.com/tonnyheru" },     
                  { icon: "📸", label: "instagram.com/tonnyheru" },   
                  { icon: "💼", label: "linkedin.com/tonnyheru" }, 
                  { icon: "✉️", label: "tonnyheru29@gmail.com" },
                  { icon: "📍", label: "Bandung, West Java, Indonesia" },
                ].map((c) => (
                  <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 14 }}>{c.icon}</span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .resume-container { padding: 0 20px !important; }
          .resume-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}