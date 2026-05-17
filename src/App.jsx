import { useState, useEffect } from "react";

/* ═══════════════ CONFIG ═══════════════ */
const DEVELOPER_PAID   = false;
const DEVELOPER_PHONE  = "254705427449";
const DEVELOPER_AGENCY = "Muchyz Digital Agency";
const CLIENT_NAME      = "Vagram Credit Limited";
const CLIENT_WEBSITE   = "vagramcompany.co.ke";

/* ═══════════════ SVG ICONS ═══════════════ */
const Icon = ({ d, size = 20, color = "currentColor", stroke = 2, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const icons = {
  lock:    ["M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z","M7 11V7a5 5 0 0 1 10 0v4"],
  alert:   ["M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z","M12 9v4","M12 17h.01"],
  globe:   ["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z","M2 12h20","M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"],
  building:["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z","M9 22V12h6v10"],
  code:    ["M16 18l6-6-6-6","M8 6l-6 6 6 6"],
  shield:  ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"],
  zap:     ["M13 2 3 14h9l-1 8 10-12h-9l1-8z"],
  clock:   ["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z","M12 6v6l4 2"],
  phone:   ["M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"],
  msg:     ["M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"],
  terminal:["M4 17l6-6-6-6","M12 19h8"],
  wifi:    ["M5 12.55a11 11 0 0 1 14.08 0","M1.42 9a16 16 0 0 1 21.16 0","M8.53 16.11a6 6 0 0 1 6.95 0","M12 20h.01"],
  cpu:     ["M9 3H5a2 2 0 0 0-2 2v4","M9 21H5a2 2 0 0 0-2-2v-4","M15 3h4a2 2 0 0 1 2 2v4","M15 21h4a2 2 0 0 1 2-2v-4","M9 9h6v6H9z"],
};

/* ═══════════════ MAIN COMPONENT ═══════════════ */
function LockScreen() {
  const [tick,    setTick]    = useState(0);
  const [typed,   setTyped]   = useState("");
  const [lineIdx, setLineIdx] = useState(0);

  const termLines = [
    "$ initializing system check...",
    "$ scanning payment records...",
    "> ERROR: payment_status = PENDING",
    "> access_granted = false",
    "$ blocking public access...",
    "> site.lock(reason='unpaid')",
    "$ contact developer to resolve",
  ];

  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (lineIdx >= termLines.length) return;
    const line = termLines[lineIdx];
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(line.slice(0, i));
      if (i >= line.length) {
        clearInterval(t);
        setTimeout(() => {
          setLineIdx(l => l + 1);
          setTyped("");
        }, 600);
      }
    }, 35);
    return () => clearInterval(t);
  }, [lineIdx]);

  const blink = tick % 2 === 0;

  return (
    <div style={{
      fontFamily:"'Inter',system-ui,-apple-system,sans-serif",
      minHeight:"100vh", minWidth:"100vw",
      background:"#050507",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      padding:"24px 16px",
      position:"relative", overflow:"hidden",
      boxSizing:"border-box",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes rotSlow   { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
        @keyframes rotSlowR  { from{transform:rotate(0deg)}   to{transform:rotate(-360deg)} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scanDown  { 0%{top:0%} 100%{top:100%} }
        @keyframes blinkDot  { 0%,49%{opacity:1} 50%,100%{opacity:0.15} }
        @keyframes shimmer   { 0%{background-position:-300% center} 100%{background-position:300% center} }
        @keyframes floatLock { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes gridAnim  { 0%{opacity:0.4} 50%{opacity:0.7} 100%{opacity:0.4} }
        @keyframes borderBlink { 0%,100%{border-color:rgba(239,68,68,0.2)} 50%{border-color:rgba(239,68,68,0.6)} }
        @keyframes glowPulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
        @keyframes slideInLeft { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:translateX(0)} }

        .fu0{animation:fadeUp .55s ease 0.00s both}
        .fu1{animation:fadeUp .55s ease 0.08s both}
        .fu2{animation:fadeUp .55s ease 0.16s both}
        .fu3{animation:fadeUp .55s ease 0.24s both}
        .fu4{animation:fadeUp .55s ease 0.32s both}
        .fu5{animation:fadeUp .55s ease 0.40s both}
        .fu6{animation:fadeUp .55s ease 0.48s both}
        .fu7{animation:fadeUp .55s ease 0.56s both}

        .lock-float { animation: floatLock 3.5s ease-in-out infinite }
        .ring-cw    { animation: rotSlow  14s linear infinite }
        .ring-ccw   { animation: rotSlowR 20s linear infinite }
        .ring-slow  { animation: rotSlow  30s linear infinite }
        .blink-dot  { animation: blinkDot 1.2s step-start infinite }
        .border-blink { animation: borderBlink 2s ease infinite }
        .glow-pulse { animation: glowPulse 3s ease infinite }

        .shimmer-red {
          background: linear-gradient(90deg, #ef4444 0%, #ff8080 30%, #fbbf24 50%, #ff8080 70%, #ef4444 100%);
          background-size: 300% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .scan-bar {
          position: absolute; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(239,68,68,0.5) 30%, rgba(239,68,68,0.8) 50%, rgba(239,68,68,0.5) 70%, transparent 100%);
          animation: scanDown 5s linear infinite;
          pointer-events: none; z-index: 0;
        }

        .detail-row { transition: background 0.15s; }
        .detail-row:hover { background: rgba(239,68,68,0.04) !important; }
        .cta-btn { transition: all 0.2s; cursor: pointer; }
        .cta-btn:hover { filter: brightness(1.1); transform: translateY(-2px); box-shadow: 0 8px 32px rgba(37,211,102,0.4) !important; }
        .cta-btn2:hover { filter: brightness(1.2); transform: translateY(-2px); }
        .cta-btn2 { transition: all 0.2s; cursor: pointer; }

        .term-line { animation: slideInLeft 0.3s ease both; }
      `}</style>

      {/* ── BACKGROUND LAYERS ── */}
      {/* Dot grid */}
      <div style={{ position:"fixed",inset:0,backgroundImage:"radial-gradient(rgba(239,68,68,0.08) 1px,transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none",zIndex:0,animation:"gridAnim 4s ease infinite" }} />
      {/* Radial glow center */}
      <div className="glow-pulse" style={{ position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"min(600px,90vw)",height:"min(600px,90vw)",borderRadius:"50%",background:"radial-gradient(circle,rgba(239,68,68,0.07) 0%,transparent 65%)",pointerEvents:"none",zIndex:0 }} />
      {/* Scan bar */}
      <div className="scan-bar" />
      {/* Corner brackets */}
      {[{t:0,l:0,bt:"2px solid rgba(239,68,68,0.35)",bl:"2px solid rgba(239,68,68,0.35)"},
        {t:0,r:0,bt:"2px solid rgba(239,68,68,0.35)",br:"2px solid rgba(239,68,68,0.35)"},
        {b:0,l:0,bb:"2px solid rgba(239,68,68,0.35)",bl:"2px solid rgba(239,68,68,0.35)"},
        {b:0,r:0,bb:"2px solid rgba(239,68,68,0.35)",br:"2px solid rgba(239,68,68,0.35)"}
      ].map((s,i)=>(
        <div key={i} style={{ position:"fixed",width:48,height:48,pointerEvents:"none",zIndex:0,
          top:s.t!==undefined?s.t:undefined, bottom:s.b!==undefined?s.b:undefined,
          left:s.l!==undefined?s.l:undefined, right:s.r!==undefined?s.r:undefined,
          borderTop:s.bt, borderBottom:s.bb, borderLeft:s.bl, borderRight:s.br
        }} />
      ))}

      {/* ── CONTENT WRAPPER ── */}
      <div style={{ position:"relative",zIndex:2,width:"100%",maxWidth:460,margin:"0 auto",textAlign:"center" }}>

        {/* ── AGENCY HEADER ── */}
        <div className="fu0" style={{ display:"inline-flex",alignItems:"center",gap:10,background:"rgba(124,58,237,0.1)",border:"1px solid rgba(124,58,237,0.25)",borderRadius:30,padding:"7px 16px 7px 10px",marginBottom:28 }}>
          <div style={{ width:28,height:28,borderRadius:8,background:"linear-gradient(135deg,#7c3aed,#6d28d9)",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <Icon d={icons.zap} size={14} color="#fff" stroke={2.5} />
          </div>
          <span style={{ fontSize:12,fontWeight:700,color:"rgba(167,139,250,0.9)",letterSpacing:".04em" }}>{DEVELOPER_AGENCY}</span>
        </div>

        {/* ── LOCK ICON CLUSTER ── */}
        <div className="fu1" style={{ position:"relative",width:130,height:130,margin:"0 auto 24px" }}>
          <div className="ring-cw"  style={{ position:"absolute",inset:0,borderRadius:"50%",border:"1px dashed rgba(239,68,68,0.18)" }} />
          <div className="ring-ccw" style={{ position:"absolute",inset:12,borderRadius:"50%",border:"1.5px solid rgba(239,68,68,0.1)" }} />
          <div className="ring-slow" style={{ position:"absolute",inset:24,borderRadius:"50%",border:"1px dotted rgba(251,191,36,0.15)" }} />
          <div className="glow-pulse" style={{ position:"absolute",inset:30,borderRadius:"50%",background:"radial-gradient(circle,rgba(239,68,68,0.2),transparent 70%)" }} />
          {/* Orbiting dots */}
          {[0,72,144,216,288].map((deg,i)=>(
            <div key={i} style={{ position:"absolute",top:"50%",left:"50%",width:5,height:5,marginTop:-2.5,marginLeft:-2.5,borderRadius:"50%",background:i%2===0?"rgba(239,68,68,0.8)":"rgba(251,191,36,0.6)",transform:`rotate(${deg + tick * 3}deg) translateX(58px)`,transition:"transform 0.1s linear" }} />
          ))}
          <div className="lock-float" style={{ position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center" }}>
            <div style={{ width:66,height:66,borderRadius:18,background:"linear-gradient(135deg,#160808,#2a0a0a)",border:"1.5px solid rgba(239,68,68,0.45)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 30px rgba(239,68,68,0.25),0 0 60px rgba(239,68,68,0.08),inset 0 1px 0 rgba(255,255,255,0.05)" }}>
              <Icon d={icons.lock} size={28} color="#ef4444" stroke={2} />
            </div>
          </div>
        </div>

        {/* ── STATUS BADGE ── */}
        <div className="fu2 border-blink" style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(239,68,68,0.07)",border:"1.5px solid rgba(239,68,68,0.3)",borderRadius:30,padding:"7px 16px",marginBottom:18 }}>
          <div className="blink-dot" style={{ width:8,height:8,borderRadius:"50%",background:"#ef4444",boxShadow:"0 0 8px #ef4444",flexShrink:0 }} />
          <span style={{ fontSize:11,fontWeight:700,color:"#fca5a5",letterSpacing:".12em",textTransform:"uppercase" }}>Access Suspended</span>
          <Icon d={icons.alert} size={13} color="#fca5a5" stroke={2} />
        </div>

        {/* ── HEADLINE ── */}
        <h1 className="fu3" style={{ fontSize:"clamp(26px,6.5vw,40px)",fontWeight:900,color:"#fff",lineHeight:1.08,marginBottom:6,letterSpacing:"-0.5px" }}>
          This Website Is
        </h1>
        <h1 className="fu3" style={{ fontSize:"clamp(26px,6.5vw,40px)",fontWeight:900,lineHeight:1.08,marginBottom:20,letterSpacing:"-0.5px" }}>
          <span className="shimmer-red">Currently Locked</span>
        </h1>

        {/* ── TERMINAL BOX ── */}
        <div className="fu4" style={{ background:"#0d0d10",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:"14px 16px",marginBottom:18,textAlign:"left",fontFamily:"'JetBrains Mono',monospace",fontSize:12 }}>
          <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:12,paddingBottom:10,borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
            {["#ef4444","#fbbf24","#22c55e"].map((c,i)=><div key={i} style={{ width:10,height:10,borderRadius:"50%",background:c,opacity:.7 }} />)}
            <span style={{ fontSize:10,color:"rgba(255,255,255,0.2)",marginLeft:6,fontFamily:"'JetBrains Mono',monospace" }}>system_check.sh</span>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:5,minHeight:120 }}>
            {termLines.slice(0, lineIdx).map((line, i) => (
              <div key={i} className="term-line" style={{ color: line.startsWith(">") ? (line.includes("ERROR") || line.includes("false") ? "#f87171" : "#fbbf24") : "rgba(255,255,255,0.45)", lineHeight:1.5 }}>{line}</div>
            ))}
            {lineIdx < termLines.length && (
              <div style={{ color: typed.startsWith(">") ? (typed.includes("ERROR") || typed.includes("false") ? "#f87171" : "#fbbf24") : "rgba(255,255,255,0.45)", lineHeight:1.5 }}>
                {typed}<span style={{ opacity: blink ? 1 : 0, color:"#ef4444" }}>▌</span>
              </div>
            )}
          </div>
        </div>

        {/* ── REASON CARD ── */}
        <div className="fu4" style={{ background:"rgba(239,68,68,0.05)",border:"1px solid rgba(239,68,68,0.18)",borderRadius:16,padding:"16px 18px",marginBottom:18,textAlign:"left" }}>
          <div style={{ display:"flex",alignItems:"flex-start",gap:12 }}>
            <div style={{ width:36,height:36,borderRadius:10,background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1 }}>
              <Icon d={icons.alert} size={18} color="#ef4444" stroke={2} />
            </div>
            <div>
              <div style={{ fontSize:11,fontWeight:800,color:"#fca5a5",textTransform:"uppercase",letterSpacing:".08em",marginBottom:6 }}>Reason for Suspension</div>
              <p style={{ fontSize:13,color:"rgba(255,255,255,0.7)",lineHeight:1.75,margin:0 }}>
                <strong style={{ color:"#fff" }}>{DEVELOPER_AGENCY}</strong> has not received payment for developing this software. The site will be fully restored upon payment.
              </p>
            </div>
          </div>
        </div>

        {/* ── DETAILS GRID ── */}
        <div className="fu5" style={{ background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.055)",borderRadius:16,marginBottom:20,overflow:"hidden" }}>
          {[
            { icon:icons.code,     label:"Developer",  value:DEVELOPER_AGENCY, color:"#a78bfa" },
            { icon:icons.building, label:"Client",     value:CLIENT_NAME,       color:"#60a5fa" },
            { icon:icons.globe,    label:"Website",    value:CLIENT_WEBSITE,    color:"#34d399" },
            { icon:icons.clock,    label:"Status",     value:"Payment Pending", color:"#f87171", red:true },
            { icon:icons.shield,   label:"Locked by",  value:DEVELOPER_AGENCY, color:"#fbbf24" },
          ].map(({ icon,label,value,color,red },i,arr)=>(
            <div key={label} className="detail-row" style={{ display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderBottom:i<arr.length-1?"1px solid rgba(255,255,255,0.04)":"none" }}>
              <div style={{ width:32,height:32,borderRadius:9,background:`${color}12`,border:`1px solid ${color}28`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                <Icon d={icon} size={15} color={color} stroke={2} />
              </div>
              <div style={{ flex:1,minWidth:0 }}>
                <div style={{ fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.25)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:2 }}>{label}</div>
                <div style={{ fontSize:13,fontWeight:700,color:red?"#f87171":"rgba(255,255,255,0.8)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{value}</div>
              </div>
              {red && <div className="blink-dot" style={{ width:7,height:7,borderRadius:"50%",background:"#ef4444",boxShadow:"0 0 6px #ef4444",flexShrink:0 }} />}
            </div>
          ))}
        </div>

        {/* ── CTA BUTTONS ── */}
        <div className="fu6" style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:24 }}>
          <a href={`https://wa.me/${DEVELOPER_PHONE}?text=Hello%20${encodeURIComponent(DEVELOPER_AGENCY)}%2C%20I%20would%20like%20to%20arrange%20payment%20for%20the%20${encodeURIComponent(CLIENT_NAME)}%20website.`}
            target="_blank" rel="noopener noreferrer" className="cta-btn"
            style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:10,width:"100%",background:"linear-gradient(135deg,#16a34a,#15803d)",color:"#fff",textDecoration:"none",borderRadius:13,padding:"15px 20px",fontSize:15,fontWeight:800,boxShadow:"0 4px 24px rgba(21,128,61,0.3)" }}>
            <Icon d={icons.msg} size={19} color="#fff" stroke={2.5} />
            Pay Developer via WhatsApp
          </a>
          <a href={`tel:0${DEVELOPER_PHONE.slice(3)}`} className="cta-btn2"
            style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:10,width:"100%",background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.75)",textDecoration:"none",border:"1px solid rgba(255,255,255,0.1)",borderRadius:13,padding:"13px 20px",fontSize:14,fontWeight:700 }}>
            <Icon d={icons.phone} size={17} color="rgba(255,255,255,0.6)" stroke={2} />
            Call Developer
          </a>
        </div>

        {/* ── SYSTEM STATS ── */}
        <div className="fu7" style={{ display:"flex",gap:8,marginBottom:22 }}>
          {[
            { icon:icons.wifi,    label:"Network",  value:"Blocked",  color:"#f87171" },
            { icon:icons.cpu,     label:"Services", value:"Offline",  color:"#f87171" },
            { icon:icons.terminal,label:"Access",   value:"Denied",   color:"#fbbf24" },
          ].map(({ icon,label,value,color })=>(
            <div key={label} style={{ flex:1,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:12,padding:"10px 8px",textAlign:"center" }}>
              <div style={{ display:"flex",justifyContent:"center",marginBottom:6 }}><Icon d={icon} size={16} color={color} stroke={1.8} /></div>
              <div style={{ fontSize:9,color:"rgba(255,255,255,0.25)",textTransform:"uppercase",letterSpacing:".07em",marginBottom:3 }}>{label}</div>
              <div style={{ fontSize:11,fontWeight:800,color }}>{value}</div>
            </div>
          ))}
        </div>

        {/* ── FOOTER ── */}
        <p style={{ fontSize:11,color:"rgba(255,255,255,0.16)",lineHeight:1.8,marginBottom:4 }}>
          This suspension was applied by <strong style={{ color:"rgba(255,255,255,0.3)" }}>{DEVELOPER_AGENCY}</strong> due to non-payment.<br />
          All intellectual property and source code remain with the developer until full payment is received.
        </p>
        <p style={{ fontSize:10,color:"rgba(255,255,255,0.1)",fontFamily:"'JetBrains Mono',monospace" }}>
          error_code: PAYMENT_REQUIRED_402
        </p>
      </div>
    </div>
  );
}

/* ═══════════════ APP EXPORT ═══════════════ */
export default function App() {
  if (!DEVELOPER_PAID) return <LockScreen />;

  return (
    <div style={{ fontFamily:"Inter,sans-serif", padding:40, textAlign:"center" }}>
      <h1>✅ App Unlocked</h1>
      <p>Paste the full Vagram Credit app here after payment is received.</p>
    </div>
  );
}
