import { useState, useEffect, useRef, lazy, Suspense } from "react";
const SmartHome3D = lazy(() => import("./SmartHome3D"));


const PROJECTS = [
  {
    id: 1,
    title: "Layung Peradilan",
    subtitle: "Sistem Administrasi Peradilan",
    category: "Web App",
    featured: true,
    status: "production",
    statusLabel: "Live Production",
    org: "Pengadilan Negeri Bale Bandung",
    duration: "6 Bulan · Feb – Agt 2025",
    role: "Full Stack Developer",
    score: "Nilai 90/100",
    description: "Sistem administrasi peradilan terintegrasi yang dibangun secara mandiri untuk Pengadilan Negeri Bale Bandung. Terhubung langsung dengan layanan Disdukcapil Cimahi, Kab. Bandung, dan Kab. Bandung Barat melalui RESTful API untuk verifikasi data kependudukan pemohon secara otomatis dan real-time.",
    highlights: [
      "Requirement gathering intensif dengan pemangku kepentingan Pengadilan & Disdukcapil",
      "Perancangan database relasional, skema tabel, dan alur sistem end-to-end",
      "Integrasi RESTful API Disdukcapil (Cimahi, Kab. Bandung, Bandung Barat)",
      "Fitur pendaftaran pemohon, usulan pengajuan, manajemen modul, user, dan role",
      "Sistem notifikasi otomatis via Email untuk pembaruan status pengajuan",
      "Deployment hingga aktif digunakan di production lingkungan instansi",
      "Maintenance, optimalisasi performa, dan bug fixing pasca deployment",
    ],
    stack: ["PHP", "Laravel", "MySQL", "RESTful API", "JavaScript", "HTML/CSS", "Git"],
    images: [
      { src: "./img Pengadilan Negeri Bale Bandung/dashboard utama.png", caption: "Dashboard Utama Layung Peradilan" },
      { src: "./img Pengadilan Negeri Bale Bandung/menu login.png", caption: "Halaman Login Sistem Layung Peradilan" },
      { src: "./img Pengadilan Negeri Bale Bandung/dashboard usulan pengajuan.png", caption: "Dashboard Usulan Pengajuan Pemohon" },
      { src: "./img Pengadilan Negeri Bale Bandung/dashboard untuk mendaftarkan pemohon.png", caption: "Form Registrasi & Pendaftaran Pemohon" },
      { src: "./img Pengadilan Negeri Bale Bandung/dashboard untuk mendaftarkan disdukcapil.png", caption: "Form Pendaftaran Integrasi Disdukcapil" },
      { src: "./img Pengadilan Negeri Bale Bandung/dashboard manajemen user.png", caption: "Manajemen Pengguna & Pegawai" },
      { src: "./img Pengadilan Negeri Bale Bandung/dashboard manajemen role.png", caption: "Manajemen Role & Hak Akses Pengguna" },
      { src: "./img Pengadilan Negeri Bale Bandung/dashboard managemen modul.png", caption: "Manajemen Modul Layanan Peradilan" },
      { src: "./img Pengadilan Negeri Bale Bandung/dashboard profile.png", caption: "Halaman Pengaturan Profil Pengguna" },
      { src: "./img Pengadilan Negeri Bale Bandung/notifikasi email.png", caption: "Notifikasi Otomatis Dispatch Email" },
    ],
    link: "https://layungperadilan.pn-balebandung.go.id/login",
    linkLabel: "Lihat Langsung",
    color: "#DC143C",
  },
  {
    id: 2,
    title: "Renato Kitchen & Resto",
    subtitle: "Sistem Manajemen Terintegrasi Restoran & Kitchen berbasis Laravel & React TypeScript",
    category: "Web App",
    featured: true,
    status: "production",
    statusLabel: "Open Source / Full Stack",
    org: "Personal Project",
    duration: "2026",
    role: "Full Stack Developer",
    score: null,
    description: "Sistem manajemen operasional terintegrasi restoran dan kitchen modern berbasis Laravel & React TypeScript. Dirancang untuk efisiensi F&B menyeluruh, mencakup Point of Sale (POS) kasir cepat, Kitchen Display System (KDS) real-time untuk kru dapur, denah & manajemen status meja, kontrol inventaris stok bahan baku otomatis terintegrasi formula resep (Bill of Materials), stock opname berkala, pengadaan (procurement) & manajemen supplier, pelacakan biaya operasional resto, laporan keuangan & analitik performa bisnis mendalam, hingga pembayaran digital QRIS dinamis.",
    highlights: [
      "Point of Sale (POS) cepat dengan visualisasi katalog menu, varian rasa, diskon, dan cetak struk kasir",
      "Kitchen Display System (KDS) real-time untuk koordinasi otomatis antara kru dapur dan pramusaji",
      "Interactive Table Management & floor plan denah meja dengan visualisasi status pesanan real-time",
      "Manajemen Menu, Kategori, Resep (BOM) & otomatisasi pengurangan stok bahan baku per pesanan",
      "Inventaris Bahan Baku Real-time & fitur Stock Opname berkala untuk audit dan pencegahan selisih stok",
      "Modul Pembelian (Purchasing) & Manajemen Supplier untuk efisiensi rantai pasok restoran",
      "Pencatatan Biaya Operasional & Pengeluaran harian/bulanan restoran secara rapi dan terstruktur",
      "Laporan Bisnis & Analitik Omzet mendalam dengan metrik grafik penjualan, laba rugi, dan margin",
      "Integrasi Pembayaran Digital QRIS dinamis untuk kemudahan proses transaksi pelanggan",
      "Multi-Role Permission System (Admin/Owner, Manager, Kasir, Koki Dapur) dan logging aktivitas sistem",
    ],
    stack: ["Laravel", "React", "TypeScript", "Tailwind CSS", "MySQL", "RESTful API", "Vite"],
    images: [
      { src: "./img Aplikasi Renato kitchen Resto/tampilan dashboar overview.png", caption: "Dashboard Overview & Metrik Resto" },
      { src: "./img Aplikasi Renato kitchen Resto/tampilan dashboar point of sale.png", caption: "Point of Sale (POS) Kasir Resto" },
      { src: "./img Aplikasi Renato kitchen Resto/tampilan dashboar kitchen display.png", caption: "Kitchen Display System (KDS) Real-time" },
      { src: "./img Aplikasi Renato kitchen Resto/tampilan dashboar orders.png", caption: "Manajemen Pesanan & Status Order" },
      { src: "./img Aplikasi Renato kitchen Resto/tampilan dashboar menu & resep.png", caption: "Manajemen Menu & Formula Resep (BOM)" },
      { src: "./img Aplikasi Renato kitchen Resto/tampilan dashboar manajamen meja.png", caption: "Manajemen Layout & Denah Meja Resto" },
      { src: "./img Aplikasi Renato kitchen Resto/tampilan dashboar investaris stock.png", caption: "Inventaris Bahan Baku & Stok" },
      { src: "./img Aplikasi Renato kitchen Resto/tampilan dashboar stock opname.png", caption: "Pencatatan & Audit Stock Opname" },
      { src: "./img Aplikasi Renato kitchen Resto/tampilan dashboar pembelian & supplier.png", caption: "Pengadaan Bahan & Manajemen Supplier" },
      { src: "./img Aplikasi Renato kitchen Resto/tampilan dashboar pengeluaran.png", caption: "Pencatatan Biaya Operasional Resto" },
      { src: "./img Aplikasi Renato kitchen Resto/tampilan dashboar laporan bisnis.png", caption: "Laporan Bisnis, Omzet & Analitik Margin" },
      { src: "./img Aplikasi Renato kitchen Resto/tampilan dashboar staff & pengguna.png", caption: "Manajemen Karyawan & Hak Akses Multi-role" },
      { src: "./img Aplikasi Renato kitchen Resto/tampilan dashboar Pengaturan resto.png", caption: "Pengaturan Restoran & Konfigurasi Sistem" },
      { src: "./img Aplikasi Renato kitchen Resto/pembayaran transaksi qris.png", caption: "Metode Pembayaran Digital QRIS" },
    ],
    link: "https://github.com/tonnyheru/Aplikasi_Renato_Kitchen_Resto",
    linkLabel: "Lihat di GitHub",
    color: "#f43f5e",
  },
  {
    id: 3,
    title: "Smart Home 3D + IoT",
    subtitle: "Interactive 3D Villa & Full IoT Smart Home Dashboard",
    category: "3D/WebGL",
    featured: true,
    status: "demo",
    statusLabel: "Interactive 3D",
    org: "Personal Portfolio Project",
    duration: "2026",
    role: "3D & Full Stack Developer",
    score: null,
    description: "Aplikasi web interaktif 3D Smart Home Modern & IoT Control Center. Pengguna dapat mengeksplorasi villa 3D secara bebas dengan kontrol kamera orbit/zoom/fly-to pada 6 ruangan (Living Room, Bedroom, Kitchen, Bathroom, Garage, Smart Control Room), mengklik objek 3D untuk menyalakan lampu, AC inverter, Smart OLED TV, smart door lock, CCTV, tirai motorized, dan monitoring energi real-time dengan sinkronisasi dua arah ke dashboard glassmorphism futuristik.",
    highlights: [
      "Arsitektur 6 Ruangan 3D: Living Room, Bedroom, Kitchen, Bathroom, Garage, Smart Control Room",
      "Interaksi Raycasting 3D: Klik langsung pada objek lampu, AC, TV, kunci pintu, tirai, dan gerbang garasi",
      "Camera Controller: Orbit, zoom, pan, dan cinematic fly-to ke setiap ruangan secara mulus",
      "Sinkronisasi State 2 Arah: Setiap aksi pada 3D model langsung sinkron dengan Dashboard UI",
      "Smart Lighting Studio: On/Off per ruangan, slider brightness 0-100%, dan 6 preset warna cahaya",
      "Climate Inverter AC: Pengaturan suhu 16-30°C, simulasi suhu ruangan, dan partikel hembusan angin",
      "Smart OLED TV: Simulasi layar animasi dinamis (Cyber Stream, Matrix Rain, Ambient, CCTV)",
      "Perimeter Security: Biometric Door Lock, animasi pintu terbuka, CCTV scanline, dan event logs",
      "Energy Monitoring: Kalkulasi wattage real-time, daily kWh, monthly cost, dan kurva konsumsi 24 jam",
      "Day / Night Cycle: Transisi dinamis pencahayaan matahari/bulan, langit, bayangan, dan neon glow",
    ],
    stack: ["Three.js", "React", "WebGL", "Tailwind CSS", "Lucide Icons", "Canvas API", "Web Audio API"],
    images: [{ src: "./images/smarthome-3d.svg", caption: "3D Smart Home + IoT Dashboard" }],
    link: null,
    linkLabel: null,
    color: "#00d4ff",
    is3D: true,
  },
  {
    id: 4,
    title: "Portofolio Website",
    subtitle: "Personal Portfolio & Showcase",
    category: "Frontend",
    featured: false,
    status: "live",
    statusLabel: "Live",
    org: "Personal Project",
    duration: "2026",
    role: "Frontend Developer",
    score: null,
    description: "Website portofolio personal responsif dibangun dengan React 19 + Vite + Tailwind CSS. Dilengkapi showcase proyek interaktif, live chat room real-time via Firebase Firestore, particle canvas interaktif dengan mouse tracking, custom cyber cursor, animated marquee tech stack, dan integrasi EmailJS untuk pengiriman pesan langsung.",
    highlights: [
      "Particle canvas dinamis interaktif dengan cursor tracking & network constellation",
      "Live chat room real-time via Firebase Firestore dengan filter username & custom avatar",
      "Online presence counter real-time dengan Firebase RTDB",
      "Animated skill marquee, interactive 3D tilt cards, dan glassmorphism aesthetics",
      "Modal galeri showcase proyek dengan navigasi keyboard & screenshot interaktif",
      "Integrasi EmailJS untuk form pesan kontak langsung ke email pribadi",
    ],
    stack: ["React", "Vite", "Tailwind CSS", "Firebase", "EmailJS", "JavaScript"],
    images: [
      { src: "./img portofolio/halaman home.png", caption: "Halaman Utama & Visual Hero" },
      { src: "./img portofolio/halaman about.png", caption: "Halaman Tentang Saya & Profil" },
      { src: "./img portofolio/halaman project.png", caption: "Showcase Proyek & Filter Interaktif" },
      { src: "./img portofolio/halaman tools.png", caption: "Keahlian & Ekosistem Tools" },
      { src: "./img portofolio/halaman resume.png", caption: "Pengalaman Kerja & Riwayat Pendidikan" },
      { src: "./img portofolio/halaman contact.png", caption: "Formulir Kontak Langsung & Live Chat" },
    ],
    link: "https://tonnyheru.github.io",
    linkLabel: "Buka Website",
    color: "#4079ff",
  },
  {
    id: 5,
    title: "Aplikasi Ice Cream Diaz",
    subtitle: "Aplikasi Pemesanan & Kasir Es Krim",
    category: "Mobile App",
    featured: false,
    status: "demo",
    statusLabel: "Open Source",
    org: "Personal Project",
    duration: "2026",
    role: "Full Stack Developer",
    score: null,
    description: "Aplikasi pemesanan dan kasir es krim modern berbasis JavaScript, HTML, dan CSS. Memudahkan pengelolaan varian menu, transaksi kasir Point of Sale (POS), pencatatan inventaris stok bahan & es krim, integrasi pembayaran digital via QRIS, dan rekap laporan omzet penjualan secara digital untuk UMKM.",
    highlights: [
      "Manajemen menu es krim dengan berbagai pilihan varian rasa, ukuran, dan aneka topping",
      "Sistem kasir digital POS yang cepat, akurat, dan mudah digunakan kasir",
      "Dukungan metode pembayaran digital nontunai dengan QRIS",
      "Manajemen stok bahan baku dan peringatan stok menipis secara visual",
      "Rekap dan laporan penjualan harian otomatis untuk analisa omzet",
      "Antarmuka yang ramah pengguna, ringan, dan responsif di berbagai perangkat",
      "Source code terbuka dan dapat diakses publik di GitHub",
    ],
    stack: ["JavaScript", "HTML", "CSS"],
    images: [
      { src: "./img Aplikasi ice cream diaz/menu dahboard.png", caption: "Dashboard Manajemen Es Krim" },
      { src: "./img Aplikasi ice cream diaz/menu kasir.png", caption: "Point of Sale (POS) Transaksi Kasir" },
      { src: "./img Aplikasi ice cream diaz/pembayaran via qris.png", caption: "Pembayaran Transaksi via QRIS" },
      { src: "./img Aplikasi ice cream diaz/menu prodak.png", caption: "Manajemen Katalog Produk & Varian Rasa" },
      { src: "./img Aplikasi ice cream diaz/menu stock.png", caption: "Manajemen Stok Es Krim & Bahan" },
      { src: "./img Aplikasi ice cream diaz/menu laporan.png", caption: "Laporan Omzet & Penjualan Harian" },
      { src: "./img Aplikasi ice cream diaz/tampilan login.png", caption: "Halaman Login Kasir & Admin" },
      { src: "./img Aplikasi ice cream diaz/menu lainnya.png", caption: "Menu Konfigurasi & Fitur Tambahan" },
    ],
    link: "https://github.com/tonnyheru/Aplikasi_Ice_Cream_Diaz",
    linkLabel: "Lihat di GitHub",
    color: "#f59e0b",
  },
  {
    id: 6,
    title: "API Integration Module",
    subtitle: "Disdukcapil Data Verifier",
    category: "Backend",
    featured: false,
    status: "production",
    statusLabel: "Production",
    org: "Pengadilan Negeri Bale Bandung",
    duration: "2025",
    role: "Backend Developer",
    score: null,
    description: "Modul integrasi backend RESTful API yang menghubungkan sistem administrasi Layung Peradilan dengan tiga instansi Disdukcapil (Disdukcapil Cimahi, Disdukcapil Kab. Bandung, dan Disdukcapil Bandung Barat) untuk proses verifikasi dan validasi data kependudukan secara otomatis, terenkripsi, dan real-time.",
    highlights: [
      "Konsumsi endpoint API Disdukcapil Cimahi & Kab. Bandung dengan format JSON standar",
      "Validasi NIK & data kependudukan otomatis sebelum data masuk ke berkas pengadilan",
      "Error handling, timeout management, & fallback mechanism jika service instansi kendala",
      "Response caching cerdas untuk mempercepat query berulang dan menghemat bandwidth",
      "Logging & monitoring request/response secara komprehensif untuk audit keamanan",
      "Dispatch notifikasi email otomatis ke pemohon saat usulan disetujui / ditolak",
    ],
    stack: ["PHP", "Laravel", "RESTful API", "JSON", "MySQL", "Postman"],
    images: [
      { src: "./img API integration/form login API.png", caption: "Form Autentikasi API Disdukcapil" },
      { src: "./img API integration/API list usulan yang masuk.png", caption: "Endpoint API List Usulan Masuk" },
      { src: "./img API integration/API approve usulan.png", caption: "Endpoint API Approval Usulan" },
      { src: "./img API integration/API reject usulan.png", caption: "Endpoint API Penolakan Usulan" },
      { src: "./img API integration/API send Email.png", caption: "Endpoint API Dispatch Notifikasi Email" },
    ],
    link: null,
    linkLabel: null,
    color: "#059669",
  },
  {
    id: 7,
    title: "Database Architecture",
    subtitle: "Relational DB Design — Peradilan",
    category: "Backend",
    featured: false,
    status: "production",
    statusLabel: "Production",
    org: "Pengadilan Negeri Bale Bandung",
    duration: "2025",
    role: "Database Engineer",
    score: null,
    description: "Perancangan arsitektur database relasional untuk sistem administrasi peradilan Layung Peradilan. Mencakup pemodelan entitas pengguna, tracking alur status perkara, pelaporan digital, dan audit trail.",
    highlights: [
      "Entity Relationship Diagram (ERD) komprehensif memodelkan puluhan relasi tabel",
      "Normalisasi basis data hingga bentuk 3NF untuk integritas dan mencegah redundansi",
      "Indexing kolom kunci untuk optimalisasi query performance pada data bervolume tinggi",
      "Stored procedures, database views, dan triggers untuk otomasi proses data",
      "Mekanisme audit trail log dan soft delete untuk keamanan dan riwayat kepatuhan data",
    ],
    stack: ["MySQL", "SQL", "ERD", "Laravel Eloquent", "PHP"],
    images: [],
    link: null,
    linkLabel: null,
    color: "#7c3aed",
  },
];

const CATEGORIES = ["Semua","Web App","Frontend","Backend","3D/WebGL","Mobile App"];

function hexToRgb(hex) {
  return `${parseInt(hex.slice(1,3),16)},${parseInt(hex.slice(3,5),16)},${parseInt(hex.slice(5,7),16)}`;
}

function StatusBadge({ status, label }) {
  const colors = {
    production: { bg:"rgba(5,150,105,0.1)", border:"rgba(5,150,105,0.3)", text:"#059669", dot:"#22c55e" },
    live: { bg:"rgba(64,121,255,0.1)", border:"rgba(64,121,255,0.3)", text:"#4079ff", dot:"#3b82f6" },
    demo: { bg:"rgba(0,212,255,0.1)", border:"rgba(0,212,255,0.3)", text:"#00b8d9", dot:"#00d4ff" },
    default: { bg:"rgba(0,0,0,0.05)", border:"rgba(0,0,0,0.1)", text:"#666", dot:"#aaa" },
  };
  const c = colors[status]||colors.default;
  return (
    <span style={{ display:"inline-flex",alignItems:"center",gap:6,background:c.bg,border:`1px solid ${c.border}`,borderRadius:999,padding:"4px 12px",fontSize:11,fontWeight:600,color:c.text }}>
      <span style={{ width:6,height:6,borderRadius:"50%",background:c.dot,boxShadow:`0 0 6px ${c.dot}` }} />
      {label}
    </span>
  );
}

function ProjectModal({ project, onClose }) {
  const [activeImg, setActiveImg] = useState(0);
  const overlayRef = useRef(null);

  useEffect(() => {
    setActiveImg(0);
  }, [project]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && project.images?.length > 1) {
        setActiveImg((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
      }
      if (e.key === "ArrowRight" && project.images?.length > 1) {
        setActiveImg((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, project.images]);

  const is3DProject = project.is3D;

  return (
    <div ref={overlayRef} onClick={(e)=>{ if(e.target===overlayRef.current) onClose(); }}
      style={{ position:"fixed",inset:0,zIndex:99999,background:"rgba(0,0,0,0.75)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20,animation:"modalFadeIn 0.25s ease forwards" }}>
      <style>{`
        @keyframes modalFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes modalSlideUp { from{opacity:0;transform:translateY(24px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        .modal-scroll::-webkit-scrollbar{width:5px;height:5px;}
        .modal-scroll::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:999px;}
        .modal-scroll::-webkit-scrollbar-track{background:transparent;}
      `}</style>
      <div style={{ width:"100%",maxWidth:is3DProject?1080:820,maxHeight:"94vh",background:"white",border:"1px solid rgba(0,0,0,0.08)",borderRadius:20,overflow:"hidden",display:"flex",flexDirection:"column",animation:"modalSlideUp 0.3s ease forwards",boxShadow:"0 32px 80px rgba(0,0,0,0.3)" }}>
        {/* Header */}
        <div style={{ padding:"24px 28px 20px",borderBottom:"1px solid #f0f0f0",display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:16,flexShrink:0,background:`linear-gradient(135deg, rgba(${hexToRgb(project.color)},0.06) 0%, white 65%)` }}>
          <div>
            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:8,flexWrap:"wrap" }}>
              <StatusBadge status={project.status} label={project.statusLabel} />
              <span style={{ fontSize:11,fontWeight:600,color:"#888",background:"#f5f5f5",border:"1px solid #eee",borderRadius:999,padding:"4px 12px" }}>{project.category}</span>
              {project.score && <span style={{ fontSize:11,fontWeight:600,background:"rgba(220,20,60,0.08)",border:"1px solid rgba(220,20,60,0.2)",color:"crimson",borderRadius:999,padding:"4px 12px" }}>{project.score}</span>}
            </div>
            <h2 style={{ fontSize:22,fontWeight:700,color:"#111",margin:0,lineHeight:1.2 }}>{project.title}</h2>
            <p style={{ fontSize:13,color:"#888",marginTop:4 }}>{project.subtitle}</p>
          </div>
          <button onClick={onClose} style={{ width:36,height:36,borderRadius:"50%",background:"#f5f5f5",border:"1px solid #eee",color:"#666",fontSize:18,cursor:"none",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.2s" }}
            onMouseEnter={(e)=>{ e.currentTarget.style.background="rgba(220,20,60,0.1)"; e.currentTarget.style.color="crimson"; }}
            onMouseLeave={(e)=>{ e.currentTarget.style.background="#f5f5f5"; e.currentTarget.style.color="#666"; }}>✕</button>
        </div>
        {/* Body */}
        <div className="modal-scroll" style={{ overflowY:"auto",padding:"24px 28px",display:"flex",flexDirection:"column",gap:20 }}>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:10 }}>
            {[{icon:"🏛️",label:"Organisasi",val:project.org},{icon:"⏱️",label:"Durasi",val:project.duration},{icon:"👤",label:"Peran",val:project.role}].map((m)=>(
              <div key={m.label} style={{ background:"#fafafa",border:"1px solid #f0f0f0",borderRadius:12,padding:"12px 14px" }}>
                <p style={{ fontSize:11,color:"#aaa",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.1em" }}>{m.icon} {m.label}</p>
                <p style={{ fontSize:13,color:"#333",fontWeight:500 }}>{m.val}</p>
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontSize:11,fontWeight:700,color:"#bbb",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:8 }}>Deskripsi</p>
            <p style={{ fontSize:14,color:"#555",lineHeight:1.8 }}>{project.description}</p>
          </div>
          <div>
            <p style={{ fontSize:11,fontWeight:700,color:"#bbb",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:10 }}>Yang Dikerjakan</p>
            <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
              {project.highlights.map((h,i)=>(
                <div key={i} style={{ display:"flex",alignItems:"flex-start",gap:10,background:"#fafafa",border:"1px solid #f0f0f0",borderRadius:10,padding:"10px 14px" }}>
                  <span style={{ color:project.color,fontSize:13,marginTop:1,flexShrink:0 }}>›</span>
                  <span style={{ fontSize:13,color:"#555",lineHeight:1.6 }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize:11,fontWeight:700,color:"#bbb",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:10 }}>Tech Stack</p>
            <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
              {project.stack.map((t)=>(
                <span key={t} style={{ fontSize:12,fontWeight:500,background:`rgba(${hexToRgb(project.color)},0.08)`,border:`1px solid rgba(${hexToRgb(project.color)},0.2)`,color:project.color,borderRadius:8,padding:"5px 12px" }}>{t}</span>
              ))}
            </div>
          </div>
          {/* 3D Interactive Scene OR static screenshots */}
          {is3DProject ? (
            <div>
              <p style={{ fontSize:11,fontWeight:700,color:"#00b8d9",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:10 }}>🎮 3D Interactive Demo</p>
              <Suspense fallback={
                <div style={{ aspectRatio:"16/9",borderRadius:12,background:"#0a0e1a",display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(0,212,255,0.2)" }}>
                  <span style={{ color:"#00d4ff",fontFamily:"monospace",fontSize:12 }}>⟳ Loading 3D Scene...</span>
                </div>
              }>
                <SmartHome3D />
              </Suspense>
            </div>
          ) : project.images && project.images.length > 0 && (
            <div>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}>
                <p style={{ fontSize:11,fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:"0.12em",margin:0 }}>
                  Screenshot ({activeImg + 1} dari {project.images.length})
                </p>
                {project.images.length > 1 && (
                  <div style={{ display:"flex",gap:6 }}>
                    <button
                      onClick={()=>setActiveImg((prev)=>(prev===0?project.images.length-1:prev-1))}
                      style={{ padding:"4px 12px",borderRadius:6,border:"1px solid #e0e0e0",background:"#fff",fontSize:12,fontWeight:600,color:"#555",cursor:"none",transition:"all 0.2s" }}
                      onMouseEnter={(e)=>{ e.currentTarget.style.background="#f5f5f5"; e.currentTarget.style.color="#111"; }}
                      onMouseLeave={(e)=>{ e.currentTarget.style.background="#fff"; e.currentTarget.style.color="#555"; }}>
                      ◀ Sebelumnya
                    </button>
                    <button
                      onClick={()=>setActiveImg((prev)=>(prev===project.images.length-1?0:prev+1))}
                      style={{ padding:"4px 12px",borderRadius:6,border:"1px solid #e0e0e0",background:"#fff",fontSize:12,fontWeight:600,color:"#555",cursor:"none",transition:"all 0.2s" }}
                      onMouseEnter={(e)=>{ e.currentTarget.style.background="#f5f5f5"; e.currentTarget.style.color="#111"; }}
                      onMouseLeave={(e)=>{ e.currentTarget.style.background="#fff"; e.currentTarget.style.color="#555"; }}>
                      Berikutnya ▶
                    </button>
                  </div>
                )}
              </div>
              <div style={{ borderRadius:12,overflow:"hidden",background:"#0a0f1d",aspectRatio:"16/9",position:"relative",marginBottom:12,boxShadow:"0 4px 20px rgba(0,0,0,0.15)",display:"flex",alignItems:"center",justifyContent:"center" }}>
                <img
                  src={project.images[activeImg]?.src}
                  alt={project.images[activeImg]?.caption}
                  style={{ width:"100%",height:"100%",objectFit:"contain" }}
                />
                <div style={{ position:"absolute",bottom:12,left:"50%",transform:"translateX(-50%)",background:"rgba(0,0,0,0.8)",backdropFilter:"blur(6px)",color:"white",fontSize:12,fontWeight:500,padding:"6px 18px",borderRadius:999,whiteSpace:"nowrap",maxWidth:"92%",overflow:"hidden",textOverflow:"ellipsis",boxShadow:"0 2px 10px rgba(0,0,0,0.4)" }}>
                  {project.images[activeImg]?.caption}
                </div>
              </div>
              {project.images.length > 1 && (
                <div style={{ display:"flex",gap:8,overflowX:"auto",paddingBottom:8,scrollBehavior:"smooth" }} className="modal-scroll">
                  {project.images.map((img,i)=>(
                    <button
                      key={i}
                      onClick={()=>setActiveImg(i)}
                      style={{
                        flex:"0 0 96px",
                        aspectRatio:"16/9",
                        borderRadius:8,
                        overflow:"hidden",
                        border:`2px solid ${i===activeImg?project.color:"#e5e7eb"}`,
                        padding:0,
                        background:"#0f172a",
                        cursor:"none",
                        transition:"all 0.2s",
                        opacity: i===activeImg ? 1 : 0.65,
                        transform: i===activeImg ? "scale(1.02)" : "scale(1)"
                      }}
                      onMouseEnter={(e)=>{ e.currentTarget.style.opacity="1"; }}
                      onMouseLeave={(e)=>{ if(i!==activeImg) e.currentTarget.style.opacity="0.65"; }}>
                      <img src={img.src} alt={img.caption} style={{ width:"100%",height:"100%",objectFit:"cover" }} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,padding:"13px 24px",borderRadius:12,background:`linear-gradient(135deg,${project.color},${project.color}cc)`,color:"white",fontWeight:600,fontSize:14,textDecoration:"none",transition:"transform 0.2s,box-shadow 0.2s" }}
              onMouseEnter={(e)=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 8px 24px rgba(${hexToRgb(project.color)},0.35)`; }}
              onMouseLeave={(e)=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
              {project.linkLabel}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function SmartHomeThumbnail() {
  return (
    <div style={{ width:"100%", aspectRatio:"16/9", borderRadius:10, overflow:"hidden", marginBottom:14, position:"relative", background:"#0a0e1a", border:"1px solid rgba(0,212,255,0.2)" }}>
      <img src="./images/smarthome-3d.svg" alt="3D Smart Home IoT Dashboard" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,212,255,0.08) 0%, transparent 60%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:8, left:8, background:"rgba(0,0,0,0.6)", border:"1px solid rgba(0,212,255,0.4)", color:"#00d4ff", fontSize:9, fontWeight:700, padding:"3px 8px", borderRadius:6, fontFamily:"monospace", backdropFilter:"blur(4px)" }}>⬡ THREE.JS / WEBGL</div>
    </div>
  );
}

function ProjectCard({ project, onClick, delay }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setVisible(true); },{ threshold:0.1 });
    if(cardRef.current) obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX-rect.left)/rect.width-0.5)*10;
    const y = ((e.clientY-rect.top)/rect.height-0.5)*-10;
    cardRef.current.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
  };

  const is3DCard = project.is3D;

  return (
    <div ref={cardRef} onClick={onClick} onMouseMove={handleMouseMove}
      onMouseLeave={()=>{ if(cardRef.current) cardRef.current.style.transform=""; }}
      style={{
        background: "white",
        border: "1px solid rgba(0,0,0,0.07)",
        borderTop: `3px solid ${project.color}`,
        borderRadius:18, padding:"22px 24px", cursor:"none",
        transition:"transform 0.15s ease, box-shadow 0.3s ease, opacity 0.5s ease",
        transformStyle:"preserve-3d", opacity:visible?1:0, transitionDelay:`${delay}ms`,
        position:"relative", overflow:"hidden",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      onMouseEnter={(e)=>{ e.currentTarget.style.boxShadow=`0 20px 48px rgba(${hexToRgb(project.color)},0.15)`; }}
      onMouseLeave={(e)=>{ e.currentTarget.style.boxShadow="0 2px 16px rgba(0,0,0,0.06)"; }}>

      <div style={{ position:"absolute",top:-40,right:-40,width:140,height:140,borderRadius:"50%",background:`radial-gradient(circle, rgba(${hexToRgb(project.color)},0.06) 0%, transparent 70%)`,pointerEvents:"none" }} />

      <div>
        {project.featured && (
          <div style={{ position:"absolute",top:16,right:16,background:"rgba(220,20,60,0.08)",border:"1px solid rgba(220,20,60,0.2)",color:"crimson",fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:999,textTransform:"uppercase",letterSpacing:"0.1em" }}>★ Featured</div>
        )}

        <div style={{ marginBottom:14 }}>
          <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:10,flexWrap:"wrap" }}>
            <StatusBadge status={project.status} label={project.statusLabel} />
            <span style={{ fontSize:10,fontWeight:600,color:"#999",background:"#f5f5f5",border:"1px solid #eee",borderRadius:999,padding:"3px 10px" }}>{project.category}</span>
          </div>
          <h3 style={{ fontSize:17,fontWeight:700,color:"#111",margin:0,lineHeight:1.3 }}>{project.title}</h3>
          <p style={{ fontSize:12,color:"#aaa",marginTop:3 }}>{project.subtitle}</p>
        </div>

        {is3DCard ? (
          <SmartHomeThumbnail />
        ) : project.images && project.images.length > 0 ? (
          <div style={{ width:"100%", aspectRatio:"16/9", borderRadius:10, overflow:"hidden", marginBottom:14, position:"relative", background:"#f1f5f9", border:"1px solid rgba(0,0,0,0.06)" }}>
            <img
              src={project.images[0].src}
              alt={project.images[0].caption || project.title}
              loading="lazy"
              style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.3s ease" }}
              onMouseEnter={(e)=>{ e.currentTarget.style.transform="scale(1.05)"; }}
              onMouseLeave={(e)=>{ e.currentTarget.style.transform="scale(1)"; }}
            />
            <div style={{ position:"absolute", bottom:8, right:8, background:"rgba(0,0,0,0.7)", backdropFilter:"blur(4px)", color:"white", fontSize:10, fontWeight:600, padding:"3px 8px", borderRadius:6, display:"flex", alignItems:"center", gap:4 }}>
              <span>📷 {project.images.length} Gambar</span>
            </div>
          </div>
        ) : null}

        <p style={{ fontSize:13,color:"#666",lineHeight:1.7,marginBottom:16,display:"-webkit-box",WebkitLineClamp:(is3DCard || (project.images && project.images.length > 0)) ? 2 : 3,WebkitBoxOrient:"vertical",overflow:"hidden" }}>{project.description}</p>

        <div style={{ display:"flex",flexWrap:"wrap",gap:6,marginBottom:18 }}>
          {project.stack.slice(0,4).map((t)=>(
            <span key={t} style={{ fontSize:11,color:"#666",background:"#f5f5f5",border:"1px solid #eee",borderRadius:6,padding:"3px 9px",fontWeight:500 }}>{t}</span>
          ))}
          {project.stack.length>4 && <span style={{ fontSize:11,color:"#aaa",background:"#fafafa",border:"1px solid #eee",borderRadius:6,padding:"3px 9px" }}>+{project.stack.length-4}</span>}
        </div>
      </div>

      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:14,borderTop:"1px solid #f0f0f0",marginTop:"auto" }}>
        <span style={{ fontSize:12,color:"#bbb" }}>{project.org}</span>
        <span style={{ fontSize:12,fontWeight:600,color:project.color,display:"flex",alignItems:"center",gap:5 }}>
          Detail
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [selectedProject, setSelectedProject] = useState(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setTitleVisible(true); },{ threshold:0.1 });
    if(titleRef.current) obs.observe(titleRef.current);
    return () => obs.disconnect();
  }, []);

  const filtered = activeFilter==="Semua" ? PROJECTS : PROJECTS.filter(p=>p.category===activeFilter);

  return (
    <>
      <style>{`
        .filter-tab{padding:8px 20px;border-radius:999px;font-size:13px;font-weight:600;border:1px solid #e0e0e0;background:white;color:#888;cursor:none;transition:all 0.2s;box-shadow:0 1px 4px rgba(0,0,0,0.05);}
        .filter-tab:hover{color:#333;border-color:#ccc;background:#fafafa;}
        .filter-tab.active{background:crimson;border-color:crimson;color:white;box-shadow:0 4px 16px rgba(220,20,60,0.3);}
      `}</style>
      <section id="featured" style={{ padding:"96px 0", background:"linear-gradient(135deg, #fff5f5 0%, #ffffff 35%, #f0f4ff 65%, #fff0f3 100%)", fontFamily:"'Poppins', sans-serif", position:"relative", overflow:"hidden" }}>
        {/* bg dots */}
        <div style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(220,20,60,0.06) 1px, transparent 1px)",backgroundSize:"32px 32px",pointerEvents:"none",opacity:0.7 }} />
        {/* blobs */}
        <div style={{ position:"absolute",top:-100,right:-100,width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle, rgba(220,20,60,0.05) 0%, transparent 65%)",pointerEvents:"none" }} />
        <div style={{ position:"absolute",bottom:-80,left:-80,width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle, rgba(64,121,255,0.04) 0%, transparent 65%)",pointerEvents:"none" }} />

        <div ref={titleRef} style={{ maxWidth:1300,margin:"0 auto",padding:"0 80px",position:"relative" }} className="projects-container">
          {/* Title */}
          <div style={{ textAlign:"center",marginBottom:56,opacity:titleVisible?1:0,transform:titleVisible?"translateY(0)":"translateY(20px)",transition:"opacity 0.6s ease, transform 0.6s ease" }}>
            <h2 style={{ fontSize:"clamp(32px,4vw,48px)",fontWeight:600,color:"crimson",marginBottom:8,fontFamily:"'Ubuntu', sans-serif" }}>Projects</h2>
            <div style={{ width:48,height:2,background:"crimson",margin:"0 auto 12px",borderRadius:2 }} />
            <p style={{ fontSize:13,color:"#aaa",letterSpacing:"0.15em",textTransform:"uppercase" }}>Karya & pengalaman saya</p>
          </div>

          {/* Filter */}
          <div style={{ display:"flex",justifyContent:"center",gap:10,marginBottom:48,flexWrap:"wrap",opacity:titleVisible?1:0,transition:"opacity 0.6s ease 0.2s" }}>
            {CATEGORIES.map((cat)=>(
              <button key={cat} className={`filter-tab ${activeFilter===cat?"active":""}`} onClick={()=>setActiveFilter(cat)}>
                {cat}{cat==="Semua"?` (${PROJECTS.length})`:`  (${PROJECTS.filter(p=>p.category===cat).length})`}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:20 }}>
            {filtered.map((project,i)=>(
              <ProjectCard key={project.id} project={project} onClick={()=>setSelectedProject(project)} delay={i*80} />
            ))}
          </div>
        </div>

        {selectedProject && <ProjectModal project={selectedProject} onClose={()=>setSelectedProject(null)} />}
        <style>{`@media(max-width:768px){.projects-container{padding:0 20px !important;}}`}</style>
      </section>
    </>
  );
}