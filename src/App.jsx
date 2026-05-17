import { useState, useEffect } from "react";
import { Lock, AlertTriangle, Globe, Building2, User, AlertCircle, Phone, MessageCircle, Shield, Zap, Code2, Clock } from "lucide-react";

/* ═══════════════ CONFIG ═══════════════ */
const DEVELOPER_PAID   = false;
const DEVELOPER_PHONE  = "254796668278";
const DEVELOPER_AGENCY = "Muchyz Digital Agency";
const CLIENT_NAME      = "Vagram Credit Limited";
const CLIENT_WEBSITE   = "vagramcompany.co.ke";

/* ═══════════════ LOCK SCREEN ═══════════════ */
function LockScreen() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const blink = tick % 2 === 0;

  return (
    <div style={{
      fontFamily:"'Inter',system-ui,sans-serif",
      minHeight:"100vh",
      background:"#060608",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      padding:"32px 20px",
      position:"relative", overflow:"hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700;800&display=swap');

        @keyframes rotateRing  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes rotateRingR { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes pulseGlow   { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
        @keyframes fadeUp      { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scanDown    { 0%{top:-4px} 100%{top:100%} }
        @keyframes shimmer     { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes borderPulse { 0%,100%{border-color:rgba(239,68,68,0.25)} 50%{border-color:rgba(239,68,68,0.7)} }
        @keyframes floatY      { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
        @keyframes gridMove    { 0%{background-position:0 0} 100%{background-position:40px 40px} }

        .fu0  { animation:fadeUp .5s ease .00s both }
        .fu1  { animation:fadeUp .5s ease .10s both }
        .fu2  { animation:fadeUp .5s ease .18s both }
        .fu3  { animation:fadeUp .5s ease .26s both }
        .fu4  { animation:fadeUp .5s ease .34s both }
        .fu5  { animation:fadeUp .5s ease .42s both }
        .fu6  { animation:fadeUp .5s ease .50s both }

        .lock-float { animation:floatY 3.5s ease-in-out infinite }
        .ring1      { animation:rotateRing  12s linear infinite }
        .ring2      { animation:rotateRingR 18s linear infinite }
        .ring3      { animation:rotateRing  25s linear infinite }
        .pulse-glow { animation:pulseGlow 2.5s ease infinite }

        .scan-line {
          position:absolute; left:0; right:0; height:2px;
          background:linear-gradient(90deg,transparent,rgba(239,68,68,0.6),transparent);
          animation:scanDown 4s linear infinite;
          pointer-events:none; z-index:1;
        }

        .shimmer-text {
          background: linear-gradient(90deg, #ef4444 0%, #ff6b6b 25%, #fbbf24 50%, #ff6b6b 75%, #ef4444 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        .grid-bg {
          position:absolute; inset:0;
          background-image:
            linear-gradient(rgba(239,68,68,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239,68,68,0.04) 1px, transparent 1px);
          background-size:40px 40px;
          animation:gridMove 8s linear infinite;
          pointer-events:none;
        }

        .border-pulse { animation:borderPulse 2s ease infinite }

        .cta-wa:hover  { filter:brightness(1.1); transform:translateY(-2px); }
        .cta-wa        { transition:all .2s; }
        .cta-call:hover{ filter:brightness(1.15); transform:translateY(-2px); }
        .cta-call      { transition:all .2s; }
        .detail-row:hover { background:rgba(239,68,68,0.05) !important; }
        .detail-row { transition:background .15s; }
      `}</style>

      {/* Grid background */}
      <div className="grid-bg" />

      {/* Scan line */}
      <div className="scan-line" />

      {/* Radial glow */}
      <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse 60% 50% at 50% 50%, rgba(239,68,68,0.07) 0%, transparent 70%)",pointerEvents:"none" }} />

      {/* Corner accents */}
      {[{top:0,left:0},{top:0,right:0},{bottom:0,left:0},{bottom:0,right:0}].map((pos,i)=>(
        <div key={i} style={{ position:"absolute",...pos,width:60,height:60,pointerEvents:"none",
          borderTop:i<2?"2px solid rgba(239,68,68,0.3)":undefined,
          borderBottom:i>=2?"2px solid rgba(239,68,68,0.3)":undefined,
          borderLeft:i%2===0?"2px solid rgba(239,68,68,0.3)":undefined,
          borderRight:i%2===1?"2px solid rgba(239,68,68,0.3)":undefined,
        }} />
      ))}

      {/* Main content */}
      <div style={{ position:"relative",zIndex:2,maxWidth:420,width:"100%",textAlign:"center" }}>

        {/* ── ICON CLUSTER ── */}
        <div className="fu0" style={{ position:"relative",width:140,height:140,margin:"0 auto 28px" }}>
          {/* Rotating rings */}
          <div className="ring1" style={{ position:"absolute",inset:0,borderRadius:"50%",border:"1px dashed rgba(239,68,68,0.2)" }} />
          <div className="ring2" style={{ position:"absolute",inset:10,borderRadius:"50%",border:"1.5px solid rgba(239,68,68,0.12)" }} />
          <div className="ring3" style={{ position:"absolute",inset:22,borderRadius:"50%",border:"1px dotted rgba(239,68,68,0.18)" }} />

          {/* Glow */}
          <div className="pulse-glow" style={{ position:"absolute",inset:30,borderRadius:"50%",background:"radial-gradient(circle,rgba(239,68,68,0.18) 0%,transparent 70%)" }} />

          {/* Lock icon */}
          <div className="lock-float" style={{ position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center" }}>
            <div style={{ width:72,height:72,borderRadius:20,background:"linear-gradient(135deg,#1a0a0a,#2a0f0f)",border:"1.5px solid rgba(239,68,68,0.4)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 32px rgba(239,68,68,0.25),inset 0 1px 0 rgba(255,255,255,0.05)" }}>
              <Lock size={32} color="#ef4444" strokeWidth={2} />
            </div>
          </div>

          {/* Orbiting dots */}
          {[0,60,120,180,240,300].map((deg,i)=>(
            <div key={i} style={{ position:"absolute",top:"50%",left:"50%",width:6,height:6,marginTop:-3,marginLeft:-3,borderRadius:"50%",background:i%2===0?"rgba(239,68,68,0.7)":"rgba(251,191,36,0.5)",transform:`rotate(${deg + tick*2}deg) translateX(62px)`,transition:"transform 0.05s linear" }} />
          ))}
        </div>

        {/* ── STATUS BADGE ── */}
        <div className="fu1 border-pulse" style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(239,68,68,0.08)",border:"1.5px solid rgba(239,68,68,0.3)",borderRadius:30,padding:"7px 18px",marginBottom:22 }}>
          <div style={{ width:8,height:8,borderRadius:"50%",background:blink?"#ef4444":"#7f1d1d",boxShadow:blink?"0 0 8px #ef4444":"none",transition:"all .3s" }} />
          <span style={{ fontSize:11,fontWeight:700,color:"#fca5a5",letterSpacing:".12em",textTransform:"uppercase" }}>Service Suspended</span>
          <AlertCircle size={13} color="#fca5a5" />
        </div>

        {/* ── HEADLINE ── */}
        <h1 className="fu2" style={{ fontSize:"clamp(28px,7vw,38px)",fontWeight:900,color:"#fff",fontFamily:"'Space Grotesk',sans-serif",lineHeight:1.05,marginBottom:8,letterSpacing:"-1px" }}>
          Website Access
        </h1>
        <h1 className="fu2" style={{ fontSize:"clamp(28px,7vw,38px)",fontWeight:900,fontFamily:"'Space Grotesk',sans-serif",lineHeight:1.05,marginBottom:20,letterSpacing:"-1px" }}>
          <span className="shimmer-text">Has Been Blocked</span>
        </h1>

        {/* ── REASON CARD ── */}
        <div className="fu3" style={{ background:"rgba(239,68,68,0.06)",border:"1px solid rgba(239,68,68,0.2)",borderRadius:18,padding:"20px 22px",marginBottom:20,textAlign:"left" }}>
          <div style={{ display:"flex",alignItems:"flex-start",gap:14 }}>
            <div style={{ width:40,height:40,borderRadius:12,background:"rgba(239,68,68,0.12)",border:"1px solid rgba(239,68,68,0.25)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2 }}>
              <AlertTriangle size={20} color="#ef4444" />
            </div>
            <div>
              <div style={{ fontSize:13,fontWeight:800,color:"#fca5a5",textTransform:"uppercase",letterSpacing:".07em",marginBottom:6 }}>Reason for Suspension</div>
              <p style={{ fontSize:14,color:"rgba(255,255,255,0.75)",lineHeight:1.75,margin:0 }}>
                The developer <strong style={{ color:"#fff" }}>{DEVELOPER_AGENCY}</strong> has not received payment for building this website. Access will be restored immediately upon payment.
              </p>
            </div>
          </div>
        </div>

        {/* ── DETAILS GRID ── */}
        <div className="fu4" style={{ background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:18,marginBottom:24,overflow:"hidden" }}>
          {[
            { Icon:Code2,    label:"Developer",  value:DEVELOPER_AGENCY,  color:"#a78bfa" },
            { Icon:Building2,label:"Client",     value:CLIENT_NAME,        color:"#60a5fa" },
            { Icon:Globe,    label:"Website",    value:CLIENT_WEBSITE,     color:"#34d399" },
            { Icon:Clock,    label:"Status",     value:"Payment Pending",  color:"#f87171", highlight:true },
            { Icon:Shield,   label:"Locked by",  value:DEVELOPER_AGENCY,  color:"#fbbf24" },
          ].map(({ Icon,label,value,color,highlight },i)=>(
            <div key={label} className="detail-row" style={{ display:"flex",alignItems:"center",gap:14,padding:"13px 18px",borderBottom:i<4?"1px solid rgba(255,255,255,0.05)":"none" }}>
              <div style={{ width:34,height:34,borderRadius:10,background:`${color}15`,border:`1px solid ${color}30`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                <Icon size={16} color={color} strokeWidth={2} />
              </div>
              <div style={{ flex:1,minWidth:0 }}>
                <div style={{ fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.28)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:2 }}>{label}</div>
                <div style={{ fontSize:13,fontWeight:700,color:highlight?"#f87171":"rgba(255,255,255,0.82)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{value}</div>
              </div>
              {highlight && <div style={{ width:8,height:8,borderRadius:"50%",background:blink?"#f87171":"#7f1d1d",boxShadow:blink?"0 0 6px #ef4444":"none",flexShrink:0,transition:"all .3s" }} />}
            </div>
          ))}
        </div>

        {/* ── CTA BUTTONS ── */}
        <div className="fu5" style={{ display:"flex",flexDirection:"column",gap:12,marginBottom:28 }}>
          <a href={`https://wa.me/${DEVELOPER_PHONE}?text=Hello%20${encodeURIComponent(DEVELOPER_AGENCY)}%2C%20I%20would%20like%20to%20arrange%20payment%20for%20the%20${encodeURIComponent(CLIENT_NAME)}%20website.`}
            target="_blank" rel="noopener noreferrer" className="cta-wa"
            style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:10,width:"100%",background:"linear-gradient(135deg,#16a34a,#15803d)",color:"#fff",textDecoration:"none",borderRadius:14,padding:"16px 20px",fontSize:15,fontWeight:800,boxShadow:"0 6px 28px rgba(21,128,61,0.35)" }}>
            <MessageCircle size={20} color="#fff" strokeWidth={2.5} />
            Pay via WhatsApp
          </a>

          <a href={`tel:0${DEVELOPER_PHONE.slice(3)}`} className="cta-call"
            style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:10,width:"100%",background:"rgba(255,255,255,0.05)",color:"rgba(255,255,255,0.8)",textDecoration:"none",border:"1px solid rgba(255,255,255,0.12)",borderRadius:14,padding:"14px 20px",fontSize:15,fontWeight:700 }}>
            <Phone size={18} color="rgba(255,255,255,0.7)" strokeWidth={2} />
            Call Developer
          </a>
        </div>

        {/* ── AGENCY BRANDING ── */}
        <div className="fu6" style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:10,padding:"14px 20px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:14,marginBottom:20 }}>
          <div style={{ width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#7c3aed,#6d28d9)",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <Zap size={18} color="#fff" strokeWidth={2.5} />
          </div>
          <div style={{ textAlign:"left" }}>
            <div style={{ fontSize:13,fontWeight:800,color:"rgba(255,255,255,0.85)" }}>{DEVELOPER_AGENCY}</div>
            <div style={{ fontSize:10,color:"rgba(255,255,255,0.3)",fontWeight:500,marginTop:1 }}>Professional Web Development · Kenya</div>
          </div>
        </div>

        {/* ── LEGAL NOTE ── */}
        <p style={{ fontSize:11,color:"rgba(255,255,255,0.18)",lineHeight:1.8 }}>
          This suspension was applied due to non-payment of development services.<br />
          All intellectual property remains with {DEVELOPER_AGENCY} until full payment is received.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  if (!DEVELOPER_PAID) return <LockScreen />;

  return (
    <div style={{ fontFamily:"Inter,sans-serif", padding:40, textAlign:"center" }}>
      <h1>App Unlocked ✅</h1>
      <p>Paste full app code here after payment is received.</p>
    </div>
  );
}
