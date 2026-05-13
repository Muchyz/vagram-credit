import { useState, useRef, useEffect } from "react";

/* ═══════════════ CONFIG ═══════════════ */
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz2t0aNbiLuHa77HIAsuQgV7oPpbl-C1uBg891ev-gQqp8sEYyL2KFuzxGBz8CxUeOq/exec";
const WHATSAPP_NUMBER = "254721471417";

/* ═══════════════ DATA ═══════════════ */
const PACKAGES = [
  { id:"welfare",    icon:"🤝", name:"Welfare",              desc:"Compulsory for all adults 18+", must:true, color:"#15803d", light:"#f0fdf4", border:"#86efac" },
  { id:"soft",       icon:"💵", name:"Soft Loans",           desc:"Affordable, flexible repayment",            color:"#1d4ed8", light:"#eff6ff", border:"#93c5fd" },
  { id:"emergency",  icon:"🚨", name:"Emergency Loans",      desc:"Instant disbursement when urgent",          color:"#b45309", light:"#fffbeb", border:"#fcd34d" },
  { id:"school",     icon:"🎓", name:"School Fees Loans",    desc:"Education financing, all levels",           color:"#7c3aed", light:"#f5f3ff", border:"#c4b5fd" },
  { id:"hospital",   icon:"🏥", name:"Hospital Insurance",   desc:"Medical cover for your family",             color:"#be185d", light:"#fdf2f8", border:"#f9a8d4" },
  { id:"group",      icon:"👥", name:"Group Projects",       desc:"Community investment initiatives",          color:"#0f766e", light:"#f0fdfa", border:"#5eead4" },
  { id:"initiation", icon:"🌱", name:"Initiation",           desc:"New member onboarding",                     color:"#c2410c", light:"#fff7ed", border:"#fdba74" },
  { id:"water",      icon:"💧", name:"Water Drilling",       desc:"Borehole & water access projects",          color:"#0284c7", light:"#f0f9ff", border:"#38bdf8" },
  { id:"farming",    icon:"🌾", name:"Fertilizers & Seeds",  desc:"Agricultural inputs & support",             color:"#65a30d", light:"#f7fee7", border:"#bef264" },
  { id:"title",      icon:"🏠", name:"Title & Logbook Loans",desc:"Secured loans on property/vehicle",         color:"#6d28d9", light:"#faf5ff", border:"#a78bfa" },
];
const LOAN_TYPES     = ["Soft Loan","Emergency Loan","School Fees Loan","Title Loan","Logbook Loan"];
const REPAYMENTS     = ["1 Month","3 Months","6 Months","12 Months","18 Months","24 Months","36 Months"];
const EMP_TYPES      = ["Employed (Salaried)","Self Employed","Business Owner","Farmer","Casual Worker","Student","Retired","Other"];
const RELATIONS      = ["Spouse","Parent","Sibling","Child","Friend","Colleague","Other"];
const BUSINESS_TYPES = ["Chama / Self-Help Group","Sole Proprietorship","Partnership","Limited Company","NGO / CBO","Cooperative Society","Church / Religious Org","School / Institution","Other"];
const REG_STEPS      = ["Personal","Employment","Packages","Documents","Review"];
const GRP_STEPS      = ["Group Info","Members","Documents","Review"];
const LOAN_STEPS     = ["Details","Employment","Loan Info","Guarantor","Documents","Review"];
const HERO_BG        = "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80";

/* ═══════════════ CSS ═══════════════ */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  body { background:#f1f5f9; -webkit-font-smoothing:antialiased; }
  input, select, textarea {
    font-family:'Outfit',sans-serif; font-size:15px; color:#0f172a;
    background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:12px;
    padding:12px 14px; width:100%; outline:none; transition:border .2s,box-shadow .2s;
  }
  input:focus, select:focus, textarea:focus {
    border-color:#15803d !important; box-shadow:0 0 0 3px rgba(21,128,61,0.12) !important; background:#fff !important;
  }
  input::placeholder, textarea::placeholder { color:#cbd5e1; }
  select option { background:#fff; color:#0f172a; }
  textarea { resize:vertical; font-family:'Outfit',sans-serif; }
  button { font-family:'Outfit',sans-serif; }
  button:active { opacity:.87; transform:scale(.98); }

  @keyframes fadeUp    { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes bounce    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }
  @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:.4} }
  @keyframes spin      { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes waPulse   { 0%,100%{box-shadow:0 4px 20px rgba(37,211,102,0.5)} 50%{box-shadow:0 4px 32px rgba(37,211,102,0.85)} }
  @keyframes drawerIn  { from{transform:translateX(-100%)} to{transform:translateX(0)} }
  @keyframes overlayIn { from{opacity:0} to{opacity:1} }

  .fu      { animation:fadeUp .38s ease both; }
  .pkg-tile{ transition:transform .2s,box-shadow .2s; }
  .pkg-tile:hover{ transform:translateY(-3px); box-shadow:0 8px 22px rgba(0,0,0,0.1); }
  .spinner { width:22px;height:22px;border:3px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite; }
  .wa-btn  { animation:waPulse 2.5s ease infinite; }
  .drawer  { animation:drawerIn .32s cubic-bezier(.4,0,.2,1) both; }
  .overlay { animation:overlayIn .28s ease both; }

  .nav-item { transition:background .18s,color .18s; }
  .nav-item:hover { background:rgba(74,222,128,0.08) !important; }
  .nav-item:active { background:rgba(74,222,128,0.15) !important; }
`;

const T = {
  app:      { fontFamily:"'Outfit',sans-serif", minHeight:"100vh", background:"#f1f5f9", maxWidth:480, margin:"0 auto" },
  main:     { padding:"20px 16px 40px" },
  card:     { background:"#fff", borderRadius:20, padding:20, boxShadow:"0 2px 18px rgba(0,0,0,0.06)", marginBottom:18, border:"1px solid #f1f5f9" },
  cardTitle:{ fontSize:20, fontWeight:800, color:"#0f172a", marginBottom:4, fontFamily:"'Playfair Display',serif" },
  cardSub:  { fontSize:13, color:"#64748b", marginBottom:18 },
  secHead:  { fontSize:11, fontWeight:800, color:"#475569", textTransform:"uppercase", letterSpacing:".08em", marginBottom:12 },
  noteBox:  { background:"#fefce8", border:"1.5px solid #fde047", borderRadius:12, padding:"10px 14px", fontSize:12, color:"#713f12", lineHeight:1.6 },
  noteBlue: { background:"#eff6ff", border:"1.5px solid #93c5fd", borderRadius:12, padding:"10px 14px", fontSize:12, color:"#1e40af", lineHeight:1.6 },
  noteRed:  { background:"#fef2f2", border:"1.5px solid #fca5a5", borderRadius:12, padding:"10px 14px", fontSize:12, color:"#991b1b", lineHeight:1.6 },
  pkgGrid:  { display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:20 },
  pkgTile:  { borderRadius:16, padding:"14px 12px", border:"1.5px solid", textAlign:"center" },
  mustBadge:{ marginTop:6, display:"inline-block", background:"#fef3c7", color:"#92400e", fontSize:9, fontWeight:800, padding:"2px 8px", borderRadius:20, letterSpacing:".06em" },
  btnGreen: { width:"100%", background:"linear-gradient(135deg,#15803d,#0f5c2a)", color:"#fff", border:"none", borderRadius:16, padding:"17px 20px", fontSize:16, fontWeight:800, cursor:"pointer", boxShadow:"0 6px 24px rgba(21,128,61,0.32)", display:"flex", alignItems:"center", justifyContent:"center", gap:10 },
  btnBlue:  { width:"100%", background:"linear-gradient(135deg,#1d4ed8,#1e40af)", color:"#fff", border:"none", borderRadius:16, padding:"17px 20px", fontSize:16, fontWeight:800, cursor:"pointer", boxShadow:"0 6px 24px rgba(29,78,216,0.32)", display:"flex", alignItems:"center", justifyContent:"center", gap:10 },
  btnOut:   { width:"100%", background:"#fff", color:"#15803d", border:"2.5px solid #15803d", borderRadius:16, padding:"15px 20px", fontSize:16, fontWeight:800, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:10 },
  formHdr:  { background:"#fff", borderBottom:"1px solid #f1f5f9", padding:"13px 16px", display:"flex", alignItems:"center", gap:12, position:"sticky", top:0, zIndex:100, boxShadow:"0 1px 10px rgba(0,0,0,0.05)" },
  backBtn:  { background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:12, width:38, height:38, fontSize:20, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#334155", lineHeight:1, flexShrink:0 },
  stepWrap: { background:"#fff", borderBottom:"1px solid #f1f5f9", padding:"14px 20px", display:"flex", alignItems:"center" },
  label:    { display:"block", fontSize:11, fontWeight:800, color:"#374151", marginBottom:5, textTransform:"uppercase", letterSpacing:".05em" },
  row2:     { display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 },
  pill:     { flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:6, padding:"11px 8px", border:"1.5px solid #e2e8f0", borderRadius:12, cursor:"pointer", fontSize:12, fontWeight:700, color:"#475569", background:"#f8fafc", transition:"all .18s" },
  pillOn:   { borderColor:"#15803d", background:"#f0fdf4", color:"#15803d" },
  listRow:  { display:"flex", alignItems:"center", gap:12, padding:"13px 14px", border:"2px solid #f1f5f9", borderRadius:14, background:"#fff", cursor:"pointer", transition:"all .15s", marginBottom:8 },
  photoSec: { background:"#f8faff", border:"1px solid #e8edf5", borderRadius:16, padding:14, marginBottom:14 },
  photoHd:  { fontSize:11, fontWeight:800, color:"#334155", textTransform:"uppercase", letterSpacing:".07em", marginBottom:10 },
  photoLbl: { fontSize:10, fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:".05em", marginBottom:5 },
  revBlock: { background:"#fff", border:"1.5px solid #f1f5f9", borderRadius:16, padding:16, marginBottom:12 },
  revHead:  { fontSize:11, fontWeight:800, color:"#15803d", textTransform:"uppercase", letterSpacing:".07em", marginBottom:12 },
  revRow:   { display:"flex", gap:10, marginBottom:8, alignItems:"flex-start" },
  revLbl:   { fontSize:11, color:"#94a3b8", minWidth:100, flexShrink:0, textTransform:"uppercase", letterSpacing:".04em" },
  revVal:   { fontSize:13, color:"#0f172a", fontWeight:700, wordBreak:"break-word" },
  totalBox: { display:"flex", justifyContent:"space-between", alignItems:"center", background:"#f0fdf4", border:"1.5px solid #86efac", borderRadius:14, padding:"14px 16px", marginBottom:16 },
};

async function submitToGoogle(payload) {
  const res = await fetch(SCRIPT_URL, { method:"POST", headers:{"Content-Type":"text/plain"}, body:JSON.stringify(payload) });
  return res.json();
}

/* ═══════════════ WHATSAPP BUTTON ═══════════════ */
function WAButton() {
  return (
    <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Vagram%20Credit%2C%20I%20need%20assistance.`}
      target="_blank" rel="noopener noreferrer" className="wa-btn"
      style={{ position:"fixed",bottom:24,right:16,zIndex:500,width:58,height:58,borderRadius:"50%",background:"#25d366",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,textDecoration:"none" }}>
      💬
    </a>
  );
}

/* ═══════════════ SIDE DRAWER NAVBAR ═══════════════ */
function Navbar({ onRegister, onLoan, onGroupReg, onHome }) {
  const [open,    setOpen]    = useState(false);
  const [scrolled,setScrolled]= useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const close = () => setOpen(false);

  const menuItems = [
    { icon:"🏠", label:"Home",                       sub:"Back to main page",             fn:onHome,      color:"#4ade80" },
    { icon:"🤝", label:"Individual Registration",    sub:"Join as a single member",       fn:onRegister,  color:"#86efac" },
    { icon:"👥", label:"Group / Institution",        sub:"Register a group or company",   fn:onGroupReg,  color:"#93c5fd" },
    { icon:"💵", label:"Apply for a Loan",           sub:"Quick loan application",        fn:onLoan,      color:"#fcd34d" },
    { icon:"📞", label:"Call Us",                    sub:"0721 471 417",                  fn:()=>window.open("tel:0721471417"), color:"#f9a8d4" },
    { icon:"💬", label:"WhatsApp Us",                sub:"Chat instantly",                fn:()=>window.open(`https://wa.me/${WHATSAPP_NUMBER}`,"_blank"), color:"#4ade80" },
  ];

  return (
    <>
      <div style={{ position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,zIndex:300,background:scrolled?"rgba(4,22,10,0.96)":"rgba(0,0,0,0.28)",backdropFilter:"blur(18px)",WebkitBackdropFilter:"blur(18px)",borderBottom:scrolled?"1px solid rgba(255,255,255,0.07)":"none",boxShadow:scrolled?"0 4px 28px rgba(0,0,0,0.4)":"none",transition:"all .28s" }}>
        <div style={{ display:"flex",alignItems:"center",height:56,padding:"0 14px",gap:10 }}>
          <button onClick={()=>setOpen(true)} style={{ width:38,height:38,borderRadius:10,background:"rgba(255,255,255,0.10)",border:"1px solid rgba(255,255,255,0.18)",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5,padding:0,flexShrink:0 }}>
            <span style={{ display:"block",width:16,height:2,background:"#fff",borderRadius:2 }} />
            <span style={{ display:"block",width:12,height:2,background:"rgba(255,255,255,0.6)",borderRadius:2 }} />
            <span style={{ display:"block",width:16,height:2,background:"#fff",borderRadius:2 }} />
          </button>
          <div onClick={onHome} style={{ display:"flex",alignItems:"center",gap:10,flex:1,cursor:"pointer" }}>
            <div style={{ width:34,height:34,borderRadius:10,background:"linear-gradient(135deg,#16a34a,#15803d)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,boxShadow:"0 2px 10px rgba(21,128,61,0.5)",flexShrink:0 }}>🏦</div>
            <div>
              <div style={{ fontSize:14,fontWeight:900,color:"#fff",fontFamily:"'Playfair Display',serif",lineHeight:1.1 }}>VAGRAM</div>
              <div style={{ fontSize:8,color:"rgba(255,255,255,0.45)",fontWeight:700,letterSpacing:".14em",textTransform:"uppercase" }}>Credit Limited</div>
            </div>
          </div>
          <button onClick={onRegister} style={{ background:"rgba(255,255,255,0.12)",color:"#fff",border:"1px solid rgba(255,255,255,0.22)",borderRadius:8,padding:"7px 13px",fontSize:12,fontWeight:700,cursor:"pointer",lineHeight:1,whiteSpace:"nowrap",flexShrink:0 }}>Join</button>
          <button onClick={onLoan} style={{ background:"#15803d",color:"#fff",border:"none",borderRadius:8,padding:"7px 13px",fontSize:12,fontWeight:700,cursor:"pointer",lineHeight:1,whiteSpace:"nowrap",flexShrink:0,boxShadow:"0 2px 10px rgba(21,128,61,0.55)" }}>Loan</button>
        </div>
      </div>

      {open && (
        <div className="overlay" onClick={close} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",zIndex:400,backdropFilter:"blur(4px)",WebkitBackdropFilter:"blur(4px)" }} />
      )}

      {open && (
        <div className="drawer" style={{ position:"fixed",top:0,left:0,width:300,height:"100vh",background:"linear-gradient(180deg,#04160a 0%,#071a0e 60%,#030f07 100%)",zIndex:500,display:"flex",flexDirection:"column",overflowY:"auto",boxShadow:"4px 0 40px rgba(0,0,0,0.6)" }}>
          <div style={{ padding:"20px 20px 16px",borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16 }}>
              <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                <div style={{ width:40,height:40,borderRadius:12,background:"linear-gradient(135deg,#16a34a,#15803d)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,boxShadow:"0 2px 12px rgba(21,128,61,0.5)" }}>🏦</div>
                <div>
                  <div style={{ fontSize:16,fontWeight:900,color:"#fff",fontFamily:"'Playfair Display',serif",lineHeight:1.1 }}>VAGRAM</div>
                  <div style={{ fontSize:9,color:"rgba(255,255,255,0.4)",fontWeight:700,letterSpacing:".12em",textTransform:"uppercase" }}>Credit Limited</div>
                </div>
              </div>
              <button onClick={close} style={{ width:34,height:34,borderRadius:9,background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.6)",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1 }}>✕</button>
            </div>
            <div style={{ display:"inline-flex",alignItems:"center",gap:7,background:"rgba(21,128,61,0.2)",border:"1px solid rgba(74,222,128,0.25)",borderRadius:30,padding:"5px 12px" }}>
              <span style={{ width:7,height:7,borderRadius:"50%",background:"#4ade80",display:"block",animation:"blink 1.8s ease infinite" }} />
              <span style={{ fontSize:10,fontWeight:800,color:"rgba(255,255,255,0.8)",letterSpacing:".08em",textTransform:"uppercase" }}>Trusted Financial Partner</span>
            </div>
          </div>
          <div style={{ padding:"12px 12px",flex:1 }}>
            <div style={{ fontSize:9,fontWeight:800,color:"rgba(255,255,255,0.25)",letterSpacing:".12em",textTransform:"uppercase",padding:"4px 8px",marginBottom:6 }}>Navigation</div>
            {menuItems.map(({ icon,label,sub,fn,color }) => (
              <div key={label} className="nav-item" onClick={()=>{ fn(); close(); }} style={{ display:"flex",alignItems:"center",gap:14,padding:"13px 12px",borderRadius:14,cursor:"pointer",marginBottom:4 }}>
                <div style={{ width:42,height:42,borderRadius:12,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0 }}>{icon}</div>
                <div style={{ flex:1,minWidth:0 }}>
                  <div style={{ fontSize:14,fontWeight:800,color:"rgba(255,255,255,0.9)",lineHeight:1.2 }}>{label}</div>
                  <div style={{ fontSize:11,color:"rgba(255,255,255,0.38)",marginTop:2 }}>{sub}</div>
                </div>
                <span style={{ fontSize:16,color:color,fontWeight:900 }}>›</span>
              </div>
            ))}
          </div>
          <div style={{ padding:"16px 20px 32px",borderTop:"1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
              <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                <span style={{ fontSize:14 }}>📍</span>
                <span style={{ fontSize:12,color:"rgba(255,255,255,0.45)",lineHeight:1.4 }}>Biashara Plaza, 2nd Floor, Naivasha</span>
              </div>
              <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                <span style={{ fontSize:14 }}>📞</span>
                <span style={{ fontSize:12,color:"rgba(255,255,255,0.45)" }}>0721 471 417</span>
              </div>
              <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                <span style={{ fontSize:14 }}>✉️</span>
                <span style={{ fontSize:12,color:"rgba(255,255,255,0.45)" }}>info@vagramcompany.co.ke</span>
              </div>
            </div>
            <div style={{ marginTop:14,fontSize:10,color:"rgba(255,255,255,0.18)",textAlign:"center" }}>© 2026 Vagram Credit Limited</div>
          </div>
        </div>
      )}
    </>
  );
}

/* ═══════════════ HERO ═══════════════ */
function Hero({ onRegister, onGroupReg, onLoan }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <div style={{ position:"relative",height:"100svh",minHeight:560,maxHeight:820,overflow:"hidden" }}>
      <div style={{ position:"absolute",inset:0,background:"linear-gradient(150deg,#052e16,#14532d,#052e16)" }} />
      <img src={HERO_BG} alt="" onLoad={()=>setImgLoaded(true)} style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 30%",opacity:imgLoaded?1:0,transition:"opacity 1s ease" }} />
      <div style={{ position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(0,0,0,0.35) 0%,rgba(3,18,9,0.58) 45%,rgba(2,12,6,0.91) 100%)" }} />
      <div style={{ position:"relative",zIndex:2,height:"100%",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"76px 20px 30px" }}>
        <div className="fu" style={{ alignSelf:"flex-start",display:"flex",alignItems:"center",gap:8,background:"rgba(21,128,61,0.25)",backdropFilter:"blur(10px)",border:"1px solid rgba(74,222,128,0.28)",borderRadius:50,padding:"5px 14px 5px 8px",marginBottom:16 }}>
          <span style={{ width:8,height:8,borderRadius:"50%",background:"#4ade80",display:"block",animation:"blink 1.8s ease infinite" }} />
          <span style={{ fontSize:10,fontWeight:800,color:"rgba(255,255,255,0.88)",letterSpacing:".09em",textTransform:"uppercase" }}>Trusted Financial Partner</span>
        </div>
        <h1 className="fu" style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(30px,9vw,44px)",fontWeight:800,color:"#fff",lineHeight:1.05,letterSpacing:"-1px",marginBottom:10,animationDelay:".06s" }}>
          VAGRAM<br /><em style={{ fontStyle:"italic",color:"#4ade80" }}>CREDIT</em> LIMITED
        </h1>
        <p className="fu" style={{ fontSize:13,color:"rgba(255,255,255,0.6)",lineHeight:1.85,marginBottom:22,animationDelay:".1s" }}>Welfare · Loans · Insurance<br />Farming · Group Projects</p>
        <div className="fu" style={{ display:"flex",gap:8,marginBottom:24,animationDelay:".13s" }}>
          {[["🤝","500+","Members"],["📦","10+","Packages"],["⚡","Fast","Loans"]].map(([ic,val,lbl])=>(
            <div key={lbl} style={{ flex:1,textAlign:"center",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.13)",borderRadius:14,padding:"10px 6px" }}>
              <div style={{ fontSize:15,marginBottom:3 }}>{ic}</div>
              <div style={{ fontSize:16,fontWeight:900,color:"#4ade80",fontFamily:"'Playfair Display',serif",lineHeight:1 }}>{val}</div>
              <div style={{ fontSize:9,color:"rgba(255,255,255,0.5)",fontWeight:700,marginTop:3,letterSpacing:".06em",textTransform:"uppercase" }}>{lbl}</div>
            </div>
          ))}
        </div>
        <div className="fu" style={{ display:"flex",gap:10,marginBottom:10,animationDelay:".16s" }}>
          <button onClick={onRegister} style={{ flex:1,background:"linear-gradient(135deg,#16a34a,#15803d)",color:"#fff",border:"none",borderRadius:14,padding:"15px 10px",fontSize:13,fontWeight:800,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6 }}>🤝 Join (Individual)</button>
          <button onClick={onGroupReg} style={{ flex:1,background:"rgba(29,78,216,0.75)",color:"#fff",border:"1.5px solid rgba(147,197,253,0.4)",borderRadius:14,padding:"15px 10px",fontSize:13,fontWeight:800,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6 }}>👥 Join (Group)</button>
        </div>
        <div className="fu" style={{ animationDelay:".19s" }}>
          <button onClick={onLoan} style={{ width:"100%",background:"rgba(255,255,255,0.09)",color:"#fff",border:"1.5px solid rgba(255,255,255,0.25)",borderRadius:14,padding:"13px 10px",fontSize:14,fontWeight:800,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}>💵 Apply for a Loan</button>
        </div>
        <div style={{ textAlign:"center",marginTop:18,animation:"bounce 2s ease infinite" }}>
          <div style={{ fontSize:9,color:"rgba(255,255,255,0.3)",letterSpacing:".1em",textTransform:"uppercase" }}>Scroll</div>
          <div style={{ fontSize:13,color:"rgba(255,255,255,0.28)",marginTop:1 }}>↓</div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ CONTACT FOOTER ═══════════════ */
function ContactFooter({ onRegister, onGroupReg, onLoan }) {
  return (
    <div style={{ background:"#0f172a",marginTop:10 }}>
      <div style={{ padding:"28px 20px 20px",borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ fontSize:13,fontWeight:800,color:"#4ade80",letterSpacing:".1em",textTransform:"uppercase",marginBottom:16,textAlign:"center" }}>Quick Links</div>
        {[{label:"Individual Registration",fn:onRegister},{label:"Group / Institution Registration",fn:onGroupReg},{label:"Apply for a Loan",fn:onLoan}].map(({label,fn})=>(
          <div key={label} onClick={fn} style={{ textAlign:"center",padding:"11px 0",cursor:"pointer",fontSize:14,fontWeight:500,color:"rgba(255,255,255,0.65)",borderBottom:"1px solid rgba(255,255,255,0.05)" }}>{label}</div>
        ))}
      </div>
      <div style={{ padding:"24px 20px",borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ fontSize:13,fontWeight:800,color:"#4ade80",letterSpacing:".1em",textTransform:"uppercase",marginBottom:16,textAlign:"center" }}>Working Hours</div>
        {[["Mon – Fri","8:00 AM – 6:00 PM"],["Saturday","8:00 AM – 5:00 PM"],["Sunday","Closed"]].map(([day,hrs])=>(
          <div key={day} style={{ display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
            <span style={{ fontSize:14,color:"rgba(255,255,255,0.55)",fontWeight:500 }}>{day}</span>
            <span style={{ fontSize:14,color:hrs==="Closed"?"#f87171":"rgba(255,255,255,0.85)",fontWeight:700 }}>{hrs}</span>
          </div>
        ))}
      </div>
      <div style={{ padding:"24px 20px",borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ fontSize:13,fontWeight:800,color:"#4ade80",letterSpacing:".1em",textTransform:"uppercase",marginBottom:16,textAlign:"center" }}>Contact Info</div>
        <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
          <a href="tel:0721471417" style={{ display:"flex",alignItems:"center",gap:14,textDecoration:"none" }}>
            <div style={{ width:42,height:42,borderRadius:12,flexShrink:0,background:"rgba(21,128,61,0.25)",border:"1px solid rgba(74,222,128,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18 }}>📞</div>
            <div><div style={{ fontSize:10,color:"rgba(255,255,255,0.35)",fontWeight:700,textTransform:"uppercase",letterSpacing:".06em",marginBottom:2 }}>Phone</div><div style={{ fontSize:16,fontWeight:800,color:"#4ade80" }}>0721 471 417</div></div>
          </a>
          <a href="mailto:info@vagramcompany.co.ke" style={{ display:"flex",alignItems:"center",gap:14,textDecoration:"none" }}>
            <div style={{ width:42,height:42,borderRadius:12,flexShrink:0,background:"rgba(29,78,216,0.25)",border:"1px solid rgba(147,197,253,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18 }}>✉️</div>
            <div><div style={{ fontSize:10,color:"rgba(255,255,255,0.35)",fontWeight:700,textTransform:"uppercase",letterSpacing:".06em",marginBottom:2 }}>Email</div><div style={{ fontSize:13,fontWeight:700,color:"rgba(255,255,255,0.75)" }}>info@vagramcompany.co.ke</div></div>
          </a>
          <div style={{ display:"flex",alignItems:"center",gap:14 }}>
            <div style={{ width:42,height:42,borderRadius:12,flexShrink:0,background:"rgba(180,83,9,0.25)",border:"1px solid rgba(252,211,77,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18 }}>📍</div>
            <div><div style={{ fontSize:10,color:"rgba(255,255,255,0.35)",fontWeight:700,textTransform:"uppercase",letterSpacing:".06em",marginBottom:2 }}>Location</div><div style={{ fontSize:14,fontWeight:800,color:"rgba(255,255,255,0.85)",lineHeight:1.4 }}>Biashara Plaza, 2nd Floor<br /><span style={{ fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.5)" }}>Naivasha</span></div></div>
          </div>
        </div>
      </div>
      <div style={{ padding:"20px",textAlign:"center",fontSize:11,color:"rgba(255,255,255,0.22)",lineHeight:1.7 }}>© 2026 Vagram Credit Limited · All Rights Reserved</div>
    </div>
  );
}

/* ═══════════════ SHARED COMPONENTS ═══════════════ */
function StepBar({ steps, current }) {
  return (
    <div style={T.stepWrap}>
      {steps.map((s,i)=>(
        <div key={i} style={{ display:"flex",alignItems:"center",flex:i<steps.length-1?1:"none" }}>
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:3 }}>
            <div style={{ width:26,height:26,borderRadius:"50%",fontSize:11,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",background:i<current?"#15803d":i===current?"#0f4c27":"#f1f5f9",color:i<=current?"#fff":"#94a3b8",border:i===current?"2.5px solid #15803d":"2px solid transparent" }}>{i<current?"✓":i+1}</div>
            <span style={{ fontSize:9,fontWeight:700,letterSpacing:".05em",textTransform:"uppercase",whiteSpace:"nowrap",color:i===current?"#15803d":i<current?"#15803d":"#cbd5e1" }}>{s}</span>
          </div>
          {i<steps.length-1&&<div style={{ flex:1,height:2,margin:"0 5px",marginBottom:16,borderRadius:2,background:i<current?"#15803d":"#f1f5f9" }} />}
        </div>
      ))}
    </div>
  );
}
function Fld({ label, required, children, mb }) {
  return (
    <div style={{ marginBottom:mb??14 }}>
      {label&&<label style={T.label}>{label}{required&&<span style={{ color:"#ef4444",marginLeft:3 }}>*</span>}</label>}
      {children}
    </div>
  );
}
function PhotoBox({ label, preview, inputRef, onPick, icon }) {
  return (
    <div style={{ flex:1 }}>
      <div style={T.photoLbl}>{label}</div>
      <div onClick={()=>inputRef.current?.click()} style={{ height:112,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",overflow:"hidden",position:"relative",background:preview?"transparent":"#f8faff",border:preview?"2px solid #15803d":"2px dashed #cbd5e1" }}>
        {preview?<img src={preview} alt={label} style={{ width:"100%",height:"100%",objectFit:"cover" }} />:<div style={{ textAlign:"center" }}><div style={{ fontSize:28,marginBottom:5 }}>{icon}</div><div style={{ fontSize:10,color:"#94a3b8",fontWeight:700 }}>Tap to upload</div></div>}
        {preview&&<div style={{ position:"absolute",top:6,right:6,background:"#15803d",borderRadius:"50%",width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#fff",fontWeight:900 }}>✓</div>}
      </div>
      <input ref={inputRef} type="file" accept="image/*" capture="environment" style={{ display:"none" }} onChange={e=>onPick(e.target.files[0])} />
    </div>
  );
}
function RevRow({ label, value }) {
  if (!value) return null;
  return <div style={T.revRow}><span style={T.revLbl}>{label}</span><span style={T.revVal}>{value}</span></div>;
}
function FormHeader({ title, step, total, onBack, color }) {
  return (
    <div style={T.formHdr}>
      <button style={T.backBtn} onClick={onBack}>‹</button>
      <div style={{ flex:1,minWidth:0 }}>
        <div style={{ fontSize:15,fontWeight:800,color:"#0f172a",fontFamily:"'Playfair Display',serif",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{title}</div>
        <div style={{ fontSize:10,color:"#94a3b8",textTransform:"uppercase",letterSpacing:".06em" }}>Vagram Credit Limited</div>
      </div>
      <div style={{ fontSize:11,fontWeight:700,color:color||"#15803d",background:color?"#eff6ff":"#f0fdf4",border:`1px solid ${color?"#93c5fd":"#86efac"}`,borderRadius:20,padding:"4px 12px",flexShrink:0 }}>{step+1}/{total}</div>
    </div>
  );
}
function EmploymentSection({ empType,setEmpType,employer,setEmployer,income,setIncome }) {
  return (
    <div style={T.card}>
      <div style={T.cardTitle}>Employment & Income</div>
      <div style={T.cardSub}>Helps us assess your loan eligibility</div>
      <Fld label="Employment Type" required><select value={empType} onChange={e=>setEmpType(e.target.value)}><option value="">Select employment type</option>{EMP_TYPES.map(t=><option key={t}>{t}</option>)}</select></Fld>
      <Fld label="Employer / Business Name"><input placeholder="e.g. Naivasha County, Self" value={employer} onChange={e=>setEmployer(e.target.value)} /></Fld>
      <Fld label="Monthly Income (KES)">
        <input type="number" placeholder="e.g. 30000" value={income} onChange={e=>setIncome(e.target.value)} />
        {income&&<div style={{ fontSize:12,color:"#15803d",fontWeight:700,marginTop:4 }}>KES {Number(income).toLocaleString()}/month</div>}
      </Fld>
    </div>
  );
}
function GuarantorSection({ gName,setGName,gPhone,setGPhone,gId,setGId,gRelation,setGRelation }) {
  return (
    <div style={T.card}>
      <div style={T.cardTitle}>Guarantor / Next of Kin</div>
      <div style={T.cardSub}>Someone who can vouch for you</div>
      <div style={{ ...T.noteBox,marginBottom:14 }}>⚠️ Guarantor must be a Vagram Credit member or known to the organisation</div>
      <Fld label="Full Name" required><input placeholder="Guarantor's full name" value={gName} onChange={e=>setGName(e.target.value)} /></Fld>
      <div style={T.row2}><Fld label="Phone" required><input type="tel" placeholder="+254 7XX XXX" value={gPhone} onChange={e=>setGPhone(e.target.value)} /></Fld><Fld label="ID Number"><input placeholder="ID number" value={gId} onChange={e=>setGId(e.target.value)} /></Fld></div>
      <Fld label="Relationship to You" required><select value={gRelation} onChange={e=>setGRelation(e.target.value)}><option value="">Select relationship</option>{RELATIONS.map(r=><option key={r}>{r}</option>)}</select></Fld>
    </div>
  );
}
function TermsBox({ agreed, setAgreed }) {
  return (
    <div style={{ background:"#f8fafc",border:"1.5px solid #e2e8f0",borderRadius:16,padding:16,marginBottom:16 }}>
      <div style={{ fontSize:12,color:"#374151",lineHeight:1.7,marginBottom:12 }}>
        By submitting I confirm that:
        <ul style={{ paddingLeft:18,marginTop:6,color:"#475569" }}>
          <li>All information provided is true and accurate</li>
          <li>I consent to Vagram Credit processing my data</li>
          <li>I agree to the terms and conditions</li>
          <li>False information may lead to rejection</li>
        </ul>
      </div>
      <div onClick={()=>setAgreed(!agreed)} style={{ display:"flex",alignItems:"center",gap:12,cursor:"pointer" }}>
        <div style={{ width:24,height:24,borderRadius:7,flexShrink:0,background:agreed?"#15803d":"#fff",border:`2px solid ${agreed?"#15803d":"#cbd5e1"}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .18s" }}>
          {agreed&&<span style={{ fontSize:12,color:"#fff",fontWeight:900 }}>✓</span>}
        </div>
        <span style={{ fontSize:13,fontWeight:700,color:agreed?"#15803d":"#374151" }}>I agree to the terms and conditions</span>
      </div>
    </div>
  );
}

/* ═══════════════ APP ═══════════════ */
export default function App() {
  const [screen,  setScreen]  = useState("home");
  const [step,    setStep]    = useState(0);
  const [done,    setDone]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  // Individual Reg
  const [rFirst,setRFirst]=useState(""); const [rLast,setRLast]=useState("");
  const [rDob,setRDob]=useState(""); const [rPhone,setRPhone]=useState("");
  const [rEmail,setREmail]=useState(""); const [rIdType,setRIdType]=useState("national_id");
  const [rIdNum,setRIdNum]=useState(""); const [rBizType,setRBizType]=useState("");
  const [rEmpType,setREmpType]=useState(""); const [rEmployer,setREmployer]=useState(""); const [rIncome,setRIncome]=useState("");
  const [rGName,setRGName]=useState(""); const [rGPhone,setRGPhone]=useState(""); const [rGId,setRGId]=useState(""); const [rGRelation,setRGRelation]=useState("");
  const [rPkgs,setRPkgs]=useState(["welfare"]);
  const [rSelP,setRSelP]=useState(null); const [rFrtP,setRFrtP]=useState(null); const [rBckP,setRBckP]=useState(null);
  const [rAgreed,setRAgreed]=useState(false);

  // Group Reg
  const [gName,setGName]=useState(""); const [gBizType,setGBizType]=useState("");
  const [gRegNo,setGRegNo]=useState(""); const [gPhone,setGPhone]=useState("");
  const [gEmail,setGEmail]=useState(""); const [gLocation,setGLocation]=useState("");
  const [gContact,setGContact]=useState(""); const [gContactPhone,setGContactPhone]=useState(""); const [gContactId,setGContactId]=useState("");
  const [gMembers,setGMembers]=useState([{name:"",phone:"",id:""},{name:"",phone:"",id:""}]);
  const [gSelP,setGSelP]=useState(null); const [gFrtP,setGFrtP]=useState(null); const [gBckP,setGBckP]=useState(null); const [gLetterP,setGLetterP]=useState(null);
  const [gAgreed,setGAgreed]=useState(false);

  // Loan
  const [lFirst,setLFirst]=useState(""); const [lLast,setLLast]=useState("");
  const [lPhone,setLPhone]=useState(""); const [lIdNum,setLIdNum]=useState("");
  const [lEmpType,setLEmpType]=useState(""); const [lEmployer,setLEmployer]=useState(""); const [lIncome,setLIncome]=useState("");
  const [lType,setLType]=useState(""); const [lAmount,setLAmount]=useState(""); const [lPurpose,setLPurpose]=useState(""); const [lRepay,setLRepay]=useState("");
  const [lGName,setLGName]=useState(""); const [lGPhone,setLGPhone]=useState(""); const [lGId,setLGId]=useState(""); const [lGRelation,setLGRelation]=useState("");
  const [lSelP,setLSelP]=useState(null); const [lFrtP,setLFrtP]=useState(null); const [lBckP,setLBckP]=useState(null);
  const [lAgreed,setLAgreed]=useState(false);

  const rSelRef=useRef(); const rFrtRef=useRef(); const rBckRef=useRef();
  const gSelRef=useRef(); const gFrtRef=useRef(); const gBckRef=useRef(); const gLetRef=useRef();
  const lSelRef=useRef(); const lFrtRef=useRef(); const lBckRef=useRef();

  // ── CHANGE 1: Photo compression (replaces old FileReader version) ──
  const loadPhoto=(file,setter)=>{ if(!file) return; const img=new Image(); const url=URL.createObjectURL(file); img.onload=()=>{ const canvas=document.createElement("canvas"); const max=800; let w=img.width,h=img.height; if(w>max){h=h*max/w;w=max;} canvas.width=w;canvas.height=h; canvas.getContext("2d").drawImage(img,0,0,w,h); setter(canvas.toDataURL("image/jpeg",0.6)); URL.revokeObjectURL(url); }; img.src=url; };

  const togglePkg=id=>{ if(id==="welfare") return; setRPkgs(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]); };
  const totalFees=()=>(700+(rPkgs.includes("welfare")?1000:0)).toLocaleString();
  const updateMember=(i,f,v)=>setGMembers(m=>m.map((x,idx)=>idx===i?{...x,[f]:v}:x));
  const addMember=()=>setGMembers(m=>[...m,{name:"",phone:"",id:""}]);
  const removeMember=i=>{ if(gMembers.length<=2) return; setGMembers(m=>m.filter((_,idx)=>idx!==i)); };

  const canR0=rFirst&&rLast&&rDob&&rPhone&&rIdNum;
  const canR3=rSelP&&rFrtP&&rBckP;
  const canG0=gName&&gBizType&&gPhone&&gEmail&&gContact&&gContactPhone&&gContactId;
  const canG1=gMembers.every(m=>m.name&&m.phone);
  const canG2=gSelP&&gFrtP&&gBckP;
  const canL0=lFirst&&lLast&&lPhone&&lIdNum;
  const canL2=lType&&lAmount&&lPurpose&&lRepay;
  const canL3=lGName&&lGPhone&&lGRelation;
  const canL4=lSelP&&lFrtP&&lBckP;

  const goHome=()=>{setScreen("home");setStep(0);setDone(false);setError("");};
  const goReg=()=>{setScreen("register");setStep(0);setDone(false);setError("");};
  const goGroup=()=>{setScreen("group");setStep(0);setDone(false);setError("");};
  const goLoan=()=>{setScreen("loan");setStep(0);setDone(false);setError("");};

  const handleSubmit = async (payload) => {
    setLoading(true); setError("");
    try {
      const res = await submitToGoogle(payload);
      if (res.success) setDone(true);
      else setError("Submission failed. Please try again or contact us on WhatsApp.");
    } catch(e) { setError("Network error. Check your connection and try again."); }
    setLoading(false);
  };

  const SubmitBtn = ({ label, payload, disabled, agreed, setAgreed, blue }) => (
    <>
      {error&&<div style={{...T.noteRed,marginBottom:12}}>❌ {error}</div>}
      <TermsBox agreed={agreed} setAgreed={setAgreed} />
      <button style={{...(blue?T.btnBlue:T.btnGreen),opacity:(disabled||loading||!agreed)?0.5:1}} disabled={disabled||loading||!agreed} onClick={()=>handleSubmit(payload)}>
        {loading?<><div className="spinner"/><span>Submitting...</span></>:<span>{label}</span>}
      </button>
    </>
  );

  /* SUCCESS */
  if (done) return (
    <div style={T.app}><style>{CSS}</style><WAButton />
      <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:"40px 20px",textAlign:"center" }}>
        <div className="fu" style={{ fontSize:72,marginBottom:18 }}>✅</div>
        <h2 className="fu" style={{ fontSize:24,fontWeight:800,fontFamily:"'Playfair Display',serif",color:"#0f4c27",marginBottom:10,animationDelay:".07s" }}>
          {screen==="loan"?"Application Submitted!":"Registration Submitted!"}
        </h2>
        <p className="fu" style={{ fontSize:14,color:"#64748b",lineHeight:1.8,marginBottom:24,animationDelay:".11s" }}>
          Thank you, <strong style={{ color:"#0f172a" }}>{screen==="group"?gName:screen==="loan"?lFirst:rFirst}</strong>.<br/>Our team will review and contact you shortly.
        </p>
        <div className="fu" style={{ ...T.card,width:"100%",maxWidth:300,marginBottom:16,textAlign:"center",animationDelay:".15s" }}>
          <div style={{ fontSize:20,fontWeight:900,color:"#15803d",fontFamily:"'Playfair Display',serif" }}>
            {screen==="register"?`Total Fees: KES ${totalFees()}`:screen==="loan"?`Loan Request: KES ${Number(lAmount||0).toLocaleString()}`:"Registration Received"}
          </div>
          <div style={{ fontSize:12,color:"#94a3b8",marginTop:6 }}>📞 0721 471 417 · Biashara Plaza, Naivasha</div>
        </div>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20just%20submitted%20my%20application%20on%20vagramcompany.co.ke`} target="_blank" rel="noopener noreferrer" className="fu" style={{ ...T.btnGreen,maxWidth:300,marginBottom:12,textDecoration:"none",animationDelay:".17s" }}>💬 Chat on WhatsApp</a>
        <button className="fu" style={{ ...T.btnOut,maxWidth:300,animationDelay:".19s" }} onClick={goHome}>← Back to Home</button>
      </div>
    </div>
  );

  /* HOME */
  if (screen==="home") return (
    <div style={T.app}><style>{CSS}</style>
    <Navbar onRegister={goReg} onLoan={goLoan} onGroupReg={goGroup} onHome={goHome} />
    <Hero onRegister={goReg} onGroupReg={goGroup} onLoan={goLoan} />
    <WAButton />
    <div style={T.main}>
      <div className="fu" style={T.card}>
        <div style={T.secHead}>📋 Membership Fees</div>
        <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:14 }}>
          {[{icon:"📋",label:"Registration Fee",sub:"One-time on joining",amount:"500",clr:"#15803d",bg:"#f0fdf4",bd:"#86efac"},{icon:"🗂️",label:"File Fee",sub:"Document processing",amount:"200",clr:"#1d4ed8",bg:"#eff6ff",bd:"#93c5fd"},{icon:"🤝",label:"Welfare Fee (18+)",sub:"Compulsory for adults",amount:"1,000",clr:"#b45309",bg:"#fffbeb",bd:"#fcd34d"}].map(({icon,label,sub,amount,clr,bg,bd})=>(
            <div key={label} style={{ display:"flex",alignItems:"center",background:bg,border:`1.5px solid ${bd}`,borderRadius:14,padding:"12px 14px",gap:12 }}>
              <div style={{ width:42,height:42,borderRadius:12,flexShrink:0,background:"rgba(255,255,255,0.7)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20 }}>{icon}</div>
              <div style={{ flex:1,minWidth:0 }}><div style={{ fontSize:13,fontWeight:800,color:"#1e293b" }}>{label}</div><div style={{ fontSize:10,color:"#64748b",marginTop:2 }}>{sub}</div></div>
              <div style={{ textAlign:"right" }}><div style={{ fontSize:9,color:"#94a3b8",fontWeight:700 }}>KES</div><div style={{ fontSize:22,fontWeight:900,color:clr,fontFamily:"'Playfair Display',serif" }}>{amount}</div></div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",background:"#052e16",borderRadius:14,padding:"13px 16px",marginBottom:14 }}>
          <div><div style={{ fontSize:11,color:"rgba(255,255,255,0.5)",textTransform:"uppercase" }}>Total (with Welfare)</div></div>
          <span style={{ fontSize:24,fontWeight:900,color:"#4ade80",fontFamily:"'Playfair Display',serif" }}>KES 1,700</span>
        </div>
        <div style={T.noteBox}>⚠️ <strong>Welfare (KES 1,000)</strong> is compulsory for every member above 18 years.</div>
      </div>
      <div className="fu" style={{ animationDelay:".06s" }}>
        <div style={T.secHead}>📦 Packages Offered</div>
        <div style={T.pkgGrid}>
          {PACKAGES.map((p,i)=>(
            <div key={p.id} className="fu pkg-tile" style={{ ...T.pkgTile,background:p.light,borderColor:p.border,animationDelay:`${i*.04}s` }}>
              <div style={{ fontSize:28,marginBottom:6 }}>{p.icon}</div>
              <div style={{ fontSize:12,fontWeight:800,color:p.color,marginBottom:3 }}>{p.name}</div>
              <div style={{ fontSize:10,color:"#64748b",lineHeight:1.4 }}>{p.desc}</div>
              {p.must&&<div style={T.mustBadge}>MUST</div>}
            </div>
          ))}
        </div>
      </div>
      <div className="fu" style={{ display:"flex",flexDirection:"column",gap:12,animationDelay:".1s" }}>
        <button style={T.btnGreen} onClick={goReg}><span>🤝</span><span>Join as a Member</span></button>
        <button style={T.btnBlue}  onClick={goGroup}><span>👥</span><span>Group / Institution Registration</span></button>
        <button style={T.btnOut}   onClick={goLoan}><span>💵</span><span>Apply for a Loan</span></button>
      </div>
    </div>
    <ContactFooter onRegister={goReg} onGroupReg={goGroup} onLoan={goLoan} />
    </div>
  );

  /* INDIVIDUAL REGISTRATION */
  if (screen==="register") return (
    <div style={T.app}><style>{CSS}</style><WAButton />
    <FormHeader title="Member Registration" step={step} total={REG_STEPS.length} onBack={()=>step===0?goHome():setStep(s=>s-1)} />
    <StepBar steps={REG_STEPS} current={step} />
    <div style={T.main}>
      {step===0&&(<div className="fu" style={T.card}>
        <div style={T.cardTitle}>Personal Information</div><div style={T.cardSub}>Please fill in your details accurately</div>
        <div style={T.row2}><Fld label="First Name" required><input placeholder="e.g. John" value={rFirst} onChange={e=>setRFirst(e.target.value)} /></Fld><Fld label="Last Name" required><input placeholder="e.g. Kamau" value={rLast} onChange={e=>setRLast(e.target.value)} /></Fld></div>
        <Fld label="Date of Birth" required><input type="date" value={rDob} onChange={e=>setRDob(e.target.value)} /></Fld>
        <Fld label="Phone Number" required><input type="tel" placeholder="+254 700 000 000" value={rPhone} onChange={e=>setRPhone(e.target.value)} /></Fld>
        <Fld label="Email Address"><input type="email" placeholder="your@email.com" value={rEmail} onChange={e=>setREmail(e.target.value)} /></Fld>
        <Fld label="Business / Occupation Type"><select value={rBizType} onChange={e=>setRBizType(e.target.value)}><option value="">Select type (optional)</option>{BUSINESS_TYPES.map(t=><option key={t}>{t}</option>)}</select></Fld>
        <Fld label="ID Type" required><div style={{ display:"flex",gap:8 }}>{[["national_id","National ID"],["passport","Passport"],["birth_cert","Birth Cert"]].map(([v,l])=>(<div key={v} onClick={()=>setRIdType(v)} style={{ ...T.pill,...(rIdType===v?T.pillOn:{}) }}>{l}</div>))}</div></Fld>
        <Fld label="Document Number" required><input placeholder="ID / Passport number" value={rIdNum} onChange={e=>setRIdNum(e.target.value)} /></Fld>
        <button style={{ ...T.btnGreen,opacity:canR0?1:.4 }} disabled={!canR0} onClick={()=>setStep(1)}>Continue →</button>
      </div>)}
      {step===1&&(<div className="fu"><EmploymentSection empType={rEmpType} setEmpType={setREmpType} employer={rEmployer} setEmployer={setREmployer} income={rIncome} setIncome={setRIncome} /><GuarantorSection gName={rGName} setGName={setRGName} gPhone={rGPhone} setGPhone={setRGPhone} gId={rGId} setGId={setRGId} gRelation={rGRelation} setGRelation={setRGRelation} /><button style={T.btnGreen} onClick={()=>setStep(2)}>Continue →</button></div>)}
      {step===2&&(<div className="fu">
        <div style={T.card}><div style={T.cardTitle}>Select Packages</div><div style={T.cardSub}>Welfare is mandatory for adults 18+</div><div style={T.noteBox}>🟢 Welfare is pre-selected and cannot be removed</div></div>
        <div style={T.card}>{PACKAGES.map(p=>{const sel=rPkgs.includes(p.id);return(<div key={p.id} onClick={()=>togglePkg(p.id)} style={{ ...T.listRow,background:sel?p.light:"#fff",borderColor:sel?p.color:"#f1f5f9",cursor:p.must?"default":"pointer" }}><span style={{ fontSize:22 }}>{p.icon}</span><div style={{ flex:1 }}><div style={{ fontSize:13,fontWeight:800,color:sel?p.color:"#374151" }}>{p.name}</div><div style={{ fontSize:11,color:"#94a3b8" }}>{p.desc}</div></div>{p.must&&<span style={T.mustBadge}>MUST</span>}<div style={{ width:22,height:22,borderRadius:"50%",flexShrink:0,background:sel?p.color:"#f1f5f9",border:`2px solid ${sel?p.color:"#e2e8f0"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#fff",fontWeight:900 }}>{sel?"✓":""}</div></div>);})}</div>
        <div style={T.totalBox}><span style={{ fontWeight:800,color:"#0f172a" }}>Total Fees Payable</span><span style={{ fontSize:22,fontWeight:900,color:"#15803d",fontFamily:"'Playfair Display',serif" }}>KES {totalFees()}</span></div>
        <button style={T.btnGreen} onClick={()=>setStep(3)}>Continue →</button>
      </div>)}
      {step===3&&(<div className="fu" style={T.card}>
        <div style={T.cardTitle}>Upload Documents</div><div style={T.cardSub}>Tap each box to capture or choose a photo</div>
        <div style={T.photoSec}><div style={T.photoHd}>📸 Selfie</div><div style={{ display:"flex" }}><PhotoBox label="Live selfie photo" preview={rSelP} inputRef={rSelRef} icon="🤳" onPick={f=>loadPhoto(f,setRSelP)} /></div></div>
        <div style={T.photoSec}><div style={T.photoHd}>🪪 ID / Passport</div><div style={{ display:"flex",gap:12 }}><PhotoBox label="Front Side" preview={rFrtP} inputRef={rFrtRef} icon="🪪" onPick={f=>loadPhoto(f,setRFrtP)} /><PhotoBox label="Back Side" preview={rBckP} inputRef={rBckRef} icon="🔄" onPick={f=>loadPhoto(f,setRBckP)} /></div></div>
        <button style={{ ...T.btnGreen,opacity:canR3?1:.4 }} disabled={!canR3} onClick={()=>setStep(4)}>Continue →</button>
      </div>)}
      {step===4&&(<div className="fu">
        <div style={{ ...T.cardTitle,marginBottom:4 }}>Review & Submit</div><p style={{ fontSize:13,color:"#64748b",marginBottom:16 }}>Confirm your details below</p>
        <div style={T.revBlock}><div style={T.revHead}>👤 Personal Details</div><RevRow label="Full Name" value={`${rFirst} ${rLast}`} /><RevRow label="DOB" value={rDob} /><RevRow label="Phone" value={rPhone} /><RevRow label="Email" value={rEmail||"—"} /><RevRow label="ID Type" value={rIdType.replace("_"," ").toUpperCase()} /><RevRow label="ID Number" value={rIdNum} /></div>
        {rEmpType&&<div style={T.revBlock}><div style={T.revHead}>💼 Employment</div><RevRow label="Type" value={rEmpType} /><RevRow label="Employer" value={rEmployer||"—"} /><RevRow label="Income" value={rIncome?`KES ${Number(rIncome).toLocaleString()}/mo`:"—"} /></div>}
        {rGName&&<div style={T.revBlock}><div style={T.revHead}>👥 Guarantor</div><RevRow label="Name" value={rGName} /><RevRow label="Phone" value={rGPhone} /><RevRow label="Relation" value={rGRelation} /></div>}
        <div style={T.revBlock}><div style={T.revHead}>📦 Packages</div><div style={{ display:"flex",flexWrap:"wrap",gap:7 }}>{rPkgs.map(id=>{const p=PACKAGES.find(x=>x.id===id);return<span key={id} style={{ background:p.light,border:`1px solid ${p.border}`,color:p.color,fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:20 }}>{p.icon} {p.name}</span>;})}</div></div>
        <div style={T.revBlock}><div style={T.revHead}>📷 Documents</div><div style={{ display:"flex",gap:10 }}>{[["Selfie",rSelP],["ID Front",rFrtP],["ID Back",rBckP]].map(([l,src])=><div key={l} style={{ flex:1,textAlign:"center" }}><img src={src} alt={l} style={{ width:"100%",height:72,objectFit:"cover",borderRadius:10,border:"1.5px solid #e2e8f0" }} /><div style={{ fontSize:10,color:"#94a3b8",marginTop:4 }}>{l}</div></div>)}</div></div>
        <div style={T.totalBox}><span style={{ fontWeight:800,color:"#0f172a" }}>Total Fees</span><span style={{ fontSize:22,fontWeight:900,color:"#15803d",fontFamily:"'Playfair Display',serif" }}>KES {totalFees()}</span></div>
        <SubmitBtn label="✅ Submit Registration" agreed={rAgreed} setAgreed={setRAgreed} payload={{ type:"registration",firstName:rFirst,lastName:rLast,dob:rDob,phone:rPhone,email:rEmail,bizType:rBizType,idType:rIdType,idNumber:rIdNum,employmentType:rEmpType,employer:rEmployer,monthlyIncome:rIncome,guarantorName:rGName,guarantorPhone:rGPhone,guarantorId:rGId,guarantorRelation:rGRelation,packages:rPkgs,totalFees:totalFees(),selfie:rSelP,idFront:rFrtP,idBack:rBckP }} />
      </div>)}
    </div></div>
  );

  /* GROUP REGISTRATION */
  if (screen==="group") return (
    <div style={T.app}><style>{CSS}</style><WAButton />
    <FormHeader title="Group / Institution Reg." step={step} total={GRP_STEPS.length} onBack={()=>step===0?goHome():setStep(s=>s-1)} color="#1d4ed8" />
    <StepBar steps={GRP_STEPS} current={step} />
    <div style={T.main}>
      {step===0&&(<div className="fu" style={T.card}>
        <div style={T.cardTitle}>Group Information</div><div style={T.cardSub}>Tell us about your group or organisation</div>
        <div style={{ ...T.noteBlue,marginBottom:14 }}>👥 For chamas, companies, churches, schools and organisations</div>
        <Fld label="Group / Organisation Name" required><input placeholder="e.g. Tumaini Chama" value={gName} onChange={e=>setGName(e.target.value)} /></Fld>
        <Fld label="Type of Organisation" required><select value={gBizType} onChange={e=>setGBizType(e.target.value)}><option value="">Select type</option>{BUSINESS_TYPES.map(t=><option key={t}>{t}</option>)}</select></Fld>
        <Fld label="Registration Number (if any)"><input placeholder="e.g. CPR/2023/001234" value={gRegNo} onChange={e=>setGRegNo(e.target.value)} /></Fld>
        <div style={T.row2}><Fld label="Phone" required><input type="tel" placeholder="+254 7XX XXX XXX" value={gPhone} onChange={e=>setGPhone(e.target.value)} /></Fld><Fld label="Email" required><input type="email" placeholder="group@email.com" value={gEmail} onChange={e=>setGEmail(e.target.value)} /></Fld></div>
        <Fld label="Physical Location"><input placeholder="Town / Estate / Area" value={gLocation} onChange={e=>setGLocation(e.target.value)} /></Fld>
        <div style={{ borderTop:"1.5px dashed #e2e8f0",margin:"16px 0 14px",paddingTop:14 }}><div style={T.secHead}>👤 Contact Person / Chairperson</div></div>
        <Fld label="Full Name" required><input placeholder="Contact person's full name" value={gContact} onChange={e=>setGContact(e.target.value)} /></Fld>
        <div style={T.row2}><Fld label="Phone" required><input type="tel" placeholder="+254 7XX XXX" value={gContactPhone} onChange={e=>setGContactPhone(e.target.value)} /></Fld><Fld label="National ID No." required><input placeholder="ID number" value={gContactId} onChange={e=>setGContactId(e.target.value)} /></Fld></div>
        <button style={{ ...T.btnBlue,opacity:canG0?1:.4 }} disabled={!canG0} onClick={()=>setStep(1)}>Continue →</button>
      </div>)}
      {step===1&&(<div className="fu">
        <div style={T.card}>
          <div style={T.cardTitle}>Group Members</div><div style={T.cardSub}>Add at least 2 members</div>
          {gMembers.map((m,i)=>(<div key={i} style={{ background:"#f8fafc",border:"1.5px solid #e2e8f0",borderRadius:16,padding:14,marginBottom:12 }}><div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}><div style={{ fontSize:12,fontWeight:800,color:"#334155" }}>Member {i+1}</div>{gMembers.length>2&&<button onClick={()=>removeMember(i)} style={{ background:"#fee2e2",border:"none",borderRadius:8,padding:"4px 10px",fontSize:11,fontWeight:700,color:"#dc2626",cursor:"pointer" }}>Remove</button>}</div><Fld label="Full Name" required mb={8}><input placeholder="Member's full name" value={m.name} onChange={e=>updateMember(i,"name",e.target.value)} /></Fld><div style={T.row2}><Fld label="Phone" mb={0}><input type="tel" placeholder="+254 7XX" value={m.phone} onChange={e=>updateMember(i,"phone",e.target.value)} /></Fld><Fld label="ID No." mb={0}><input placeholder="ID number" value={m.id} onChange={e=>updateMember(i,"id",e.target.value)} /></Fld></div></div>))}
          <button onClick={addMember} style={{ width:"100%",background:"#eff6ff",border:"2px dashed #93c5fd",borderRadius:14,padding:"13px",fontSize:13,fontWeight:800,color:"#1d4ed8",cursor:"pointer" }}>+ Add Another Member</button>
        </div>
        <button style={{ ...T.btnBlue,opacity:canG1?1:.4 }} disabled={!canG1} onClick={()=>setStep(2)}>Continue →</button>
      </div>)}
      {step===2&&(<div className="fu" style={T.card}>
        <div style={T.cardTitle}>Upload Documents</div><div style={T.cardSub}>Contact person's ID and group letter</div>
        <div style={T.photoSec}><div style={T.photoHd}>📸 Contact Person Selfie</div><div style={{ display:"flex" }}><PhotoBox label="Live selfie photo" preview={gSelP} inputRef={gSelRef} icon="🤳" onPick={f=>loadPhoto(f,setGSelP)} /></div></div>
        <div style={T.photoSec}><div style={T.photoHd}>🪪 Contact Person ID</div><div style={{ display:"flex",gap:12 }}><PhotoBox label="Front Side" preview={gFrtP} inputRef={gFrtRef} icon="🪪" onPick={f=>loadPhoto(f,setGFrtP)} /><PhotoBox label="Back Side" preview={gBckP} inputRef={gBckRef} icon="🔄" onPick={f=>loadPhoto(f,setGBckP)} /></div></div>
        <div style={T.photoSec}><div style={T.photoHd}>📄 Authorisation Letter (Optional)</div><div style={{ display:"flex" }}><PhotoBox label="Letter / Certificate" preview={gLetterP} inputRef={gLetRef} icon="📄" onPick={f=>loadPhoto(f,setGLetterP)} /></div></div>
        <button style={{ ...T.btnBlue,opacity:canG2?1:.4 }} disabled={!canG2} onClick={()=>setStep(3)}>Continue →</button>
      </div>)}
      {step===3&&(<div className="fu">
        <div style={{ ...T.cardTitle,marginBottom:4 }}>Review & Submit</div><p style={{ fontSize:13,color:"#64748b",marginBottom:16 }}>Confirm group details before submitting</p>
        <div style={{ ...T.revBlock,borderColor:"#bfdbfe",background:"#f0f9ff" }}><div style={{ ...T.revHead,color:"#1d4ed8" }}>👥 Group Details</div><RevRow label="Group Name" value={gName} /><RevRow label="Type" value={gBizType} /><RevRow label="Phone" value={gPhone} /><RevRow label="Email" value={gEmail} /><RevRow label="Location" value={gLocation||"—"} /></div>
        <div style={T.revBlock}><div style={T.revHead}>👤 Contact Person</div><RevRow label="Name" value={gContact} /><RevRow label="Phone" value={gContactPhone} /><RevRow label="ID No." value={gContactId} /></div>
        <div style={T.revBlock}><div style={T.revHead}>👥 Members ({gMembers.length})</div>{gMembers.map((m,i)=><RevRow key={i} label={`Member ${i+1}`} value={`${m.name}${m.phone?" · "+m.phone:""}`} />)}</div>
        <SubmitBtn label="✅ Submit Group Registration" agreed={gAgreed} setAgreed={setGAgreed} blue payload={{ type:"group",groupName:gName,bizType:gBizType,regNo:gRegNo,phone:gPhone,email:gEmail,location:gLocation,contactName:gContact,contactPhone:gContactPhone,contactId:gContactId,members:gMembers,selfie:gSelP,idFront:gFrtP,idBack:gBckP,letter:gLetterP }} />
      </div>)}
    </div></div>
  );

  /* LOAN APPLICATION */
  if (screen==="loan") return (
    <div style={T.app}><style>{CSS}</style><WAButton />
    <FormHeader title="Loan Application" step={step} total={LOAN_STEPS.length} onBack={()=>step===0?goHome():setStep(s=>s-1)} />
    <StepBar steps={LOAN_STEPS} current={step} />
    <div style={T.main}>
      {step===0&&(<div className="fu" style={T.card}>
        <div style={T.cardTitle}>Applicant Details</div><div style={T.cardSub}>Your personal information</div>
        <div style={T.row2}><Fld label="First Name" required><input placeholder="First name" value={lFirst} onChange={e=>setLFirst(e.target.value)} /></Fld><Fld label="Last Name" required><input placeholder="Last name" value={lLast} onChange={e=>setLLast(e.target.value)} /></Fld></div>
        <Fld label="Phone Number" required><input type="tel" placeholder="+254 700 000 000" value={lPhone} onChange={e=>setLPhone(e.target.value)} /></Fld>
        <Fld label="National ID / Passport No." required><input placeholder="Document number" value={lIdNum} onChange={e=>setLIdNum(e.target.value)} /></Fld>
        <button style={{ ...T.btnGreen,opacity:canL0?1:.4 }} disabled={!canL0} onClick={()=>setStep(1)}>Continue →</button>
      </div>)}
      {step===1&&(<div className="fu"><EmploymentSection empType={lEmpType} setEmpType={setLEmpType} employer={lEmployer} setEmployer={setLEmployer} income={lIncome} setIncome={setLIncome} /><button style={T.btnGreen} onClick={()=>setStep(2)}>Continue →</button></div>)}
      {step===2&&(<div className="fu" style={T.card}>
        <div style={T.cardTitle}>Loan Details</div><div style={T.cardSub}>Tell us about the loan you need</div>
        <Fld label="Loan Type" required><div style={{ display:"flex",flexDirection:"column",gap:8 }}>{LOAN_TYPES.map(t=>(<div key={t} onClick={()=>setLType(t)} style={{ ...T.listRow,cursor:"pointer",padding:"12px 14px",background:lType===t?"#f0fdf4":"#fff",borderColor:lType===t?"#15803d":"#f1f5f9" }}><div style={{ width:16,height:16,borderRadius:"50%",flexShrink:0,border:`2px solid ${lType===t?"#15803d":"#cbd5e1"}`,background:lType===t?"#15803d":"transparent",display:"flex",alignItems:"center",justifyContent:"center" }}>{lType===t&&<div style={{ width:6,height:6,borderRadius:"50%",background:"#fff" }} />}</div><span style={{ fontSize:13,fontWeight:700,color:lType===t?"#15803d":"#374151" }}>{t}</span></div>))}</div></Fld>
        <Fld label="Loan Amount (KES)" required><input type="number" placeholder="e.g. 50000" value={lAmount} onChange={e=>setLAmount(e.target.value)} />{lAmount&&<div style={{ fontSize:12,color:"#15803d",fontWeight:700,marginTop:4 }}>KES {Number(lAmount).toLocaleString()}</div>}</Fld>
        <Fld label="Repayment Period" required><select value={lRepay} onChange={e=>setLRepay(e.target.value)}><option value="">Select period</option>{REPAYMENTS.map(r=><option key={r}>{r}</option>)}</select></Fld>
        <Fld label="Loan Purpose" required><textarea rows={3} placeholder="How will you use this loan?" value={lPurpose} onChange={e=>setLPurpose(e.target.value)} /></Fld>
        <button style={{ ...T.btnGreen,opacity:canL2?1:.4 }} disabled={!canL2} onClick={()=>setStep(3)}>Continue →</button>
      </div>)}
      {step===3&&(<div className="fu"><GuarantorSection gName={lGName} setGName={setLGName} gPhone={lGPhone} setGPhone={setLGPhone} gId={lGId} setGId={setLGId} gRelation={lGRelation} setGRelation={setLGRelation} /><button style={{ ...T.btnGreen,opacity:canL3?1:.4 }} disabled={!canL3} onClick={()=>setStep(4)}>Continue →</button></div>)}
      {step===4&&(<div className="fu" style={T.card}>
        <div style={T.cardTitle}>Upload Documents</div><div style={T.cardSub}>Clear photos of yourself and your ID</div>
        <div style={T.photoSec}><div style={T.photoHd}>📸 Selfie</div><div style={{ display:"flex" }}><PhotoBox label="Live selfie photo" preview={lSelP} inputRef={lSelRef} icon="🤳" onPick={f=>loadPhoto(f,setLSelP)} /></div></div>
        <div style={T.photoSec}><div style={T.photoHd}>🪪 National ID / Passport</div><div style={{ display:"flex",gap:12 }}><PhotoBox label="Front Side" preview={lFrtP} inputRef={lFrtRef} icon="🪪" onPick={f=>loadPhoto(f,setLFrtP)} /><PhotoBox label="Back Side" preview={lBckP} inputRef={lBckRef} icon="🔄" onPick={f=>loadPhoto(f,setLBckP)} /></div></div>
        <button style={{ ...T.btnGreen,opacity:canL4?1:.4 }} disabled={!canL4} onClick={()=>setStep(5)}>Continue →</button>
      </div>)}
      {step===5&&(<div className="fu">
        <div style={{ ...T.cardTitle,marginBottom:4 }}>Review & Submit</div><p style={{ fontSize:13,color:"#64748b",marginBottom:16 }}>Confirm before submitting</p>
        <div style={T.revBlock}><div style={T.revHead}>👤 Applicant</div><RevRow label="Full Name" value={`${lFirst} ${lLast}`} /><RevRow label="Phone" value={lPhone} /><RevRow label="ID No." value={lIdNum} /></div>
        {lEmpType&&<div style={T.revBlock}><div style={T.revHead}>💼 Employment</div><RevRow label="Type" value={lEmpType} /><RevRow label="Employer" value={lEmployer||"—"} /><RevRow label="Income" value={lIncome?`KES ${Number(lIncome).toLocaleString()}/mo`:"—"} /></div>}
        <div style={{ ...T.revBlock,borderColor:"#bfdbfe",background:"#f0f9ff" }}><div style={{ ...T.revHead,color:"#1d4ed8" }}>💵 Loan Details</div><RevRow label="Type" value={lType} /><RevRow label="Repayment" value={lRepay} /><RevRow label="Purpose" value={lPurpose} /><div style={T.revRow}><span style={T.revLbl}>Amount</span><span style={{ ...T.revVal,fontSize:20,color:"#15803d",fontFamily:"'Playfair Display',serif" }}>KES {Number(lAmount).toLocaleString()}</span></div></div>
        <div style={T.revBlock}><div style={T.revHead}>👥 Guarantor</div><RevRow label="Name" value={lGName} /><RevRow label="Phone" value={lGPhone} /><RevRow label="Relation" value={lGRelation} /></div>
        <div style={T.revBlock}><div style={T.revHead}>📷 Documents</div><div style={{ display:"flex",gap:10 }}>{[["Selfie",lSelP],["ID Front",lFrtP],["ID Back",lBckP]].map(([l,src])=><div key={l} style={{ flex:1,textAlign:"center" }}><img src={src} alt={l} style={{ width:"100%",height:72,objectFit:"cover",borderRadius:10,border:"1.5px solid #e2e8f0" }} /><div style={{ fontSize:10,color:"#94a3b8",marginTop:4 }}>{l}</div></div>)}</div></div>
        <div style={{ ...T.totalBox,borderColor:"#93c5fd",background:"#eff6ff" }}><span style={{ fontWeight:800,color:"#0f172a" }}>Loan Requested</span><span style={{ fontSize:22,fontWeight:900,color:"#1d4ed8",fontFamily:"'Playfair Display',serif" }}>KES {Number(lAmount).toLocaleString()}</span></div>
        <SubmitBtn label="✅ Submit Loan Application" agreed={lAgreed} setAgreed={setLAgreed} payload={{ type:"loan",firstName:lFirst,lastName:lLast,phone:lPhone,idNumber:lIdNum,employmentType:lEmpType,employer:lEmployer,monthlyIncome:lIncome,loanType:lType,amount:lAmount,repayment:lRepay,purpose:lPurpose,guarantorName:lGName,guarantorPhone:lGPhone,guarantorId:lGId,guarantorRelation:lGRelation,selfie:lSelP,idFront:lFrtP,idBack:lBckP }} />
      </div>)}
    </div></div>
  );
}
