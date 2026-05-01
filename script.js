/* === ECOSTRUXURE CSM DASHBOARD — script.js === */

const RATES = { USD:1, EUR:0.92, EGP:49.5 };
const SYMS = { USD:'$', EUR:'€', EGP:'E£' };
let currency = 'USD';

// ── 3 CUSTOMERS ──
const CUSTOMERS = [
  {
    id:'cairo-cement', name:'Cairo Cement Industries', region:'Middle East', regionShort:'MEA',
    initials:'CC', color:'#3DCD58',
    roi: 284500, satisfaction: 92, nps: 78, equipHealth: 96,
    status:'green', statusText:'Healthy',
    criticality: 1, revenue: 1850000,
    cbm:[
      {name:'Kiln Drive VSD ATV1200',loc:'Kiln Line 2',status:'green',val:97},
      {name:'Raw Mill Motor 3.2MW',loc:'Grinding Hall',status:'green',val:94},
      {name:'Bag Filter Fan VSD',loc:'Stack A',status:'green',val:91},
      {name:'Clinker Cooler Grate',loc:'Kiln Line 2',status:'yellow',val:72},
      {name:'MV Switchgear SM6',loc:'Substation 3',status:'green',val:95},
    ],
    history:[
      {title:'Kiln VSD thermography',desc:'All IGBTs within spec. Clean bill of health.',date:'25 Apr 2026',type:'green'},
      {title:'Raw mill bearing replacement',desc:'Replaced DE bearing on main motor — vibration reduced 60%.',date:'18 Apr 2026',type:'green'},
      {title:'Cooler grate inspection',desc:'Grate plate wear detected on row 3 — parts ordered.',date:'10 Apr 2026',type:'yellow'},
      {title:'Annual switchgear PM',desc:'All breakers tested, contacts cleaned, torques verified.',date:'01 Apr 2026',type:'green'},
    ],
    upcoming:[
      {title:'Cooler grate plate swap',sub:'Kiln Line 2 · Row 3',priority:'medium',due:'May 05',dueClass:'soon'},
      {title:'Motor alignment check',sub:'Raw Mill · DE side',priority:'low',due:'May 18',dueClass:'normal'},
      {title:'VSD firmware update',sub:'ATV1200 · v4.2.1',priority:'low',due:'Jun 01',dueClass:'normal'},
    ],
    financial:{labels:['Nov','Dec','Jan','Feb','Mar','Apr'],revenue:[310000,295000,320000,305000,330000,290000],cost:[180000,165000,195000,170000,182000,160000]},
    feedback:[
      {text:'Excellent response time on the kiln drive issue. Very professional team.',author:'Eng. Ahmed Refaat',sentiment:'positive'},
      {text:'Preventive schedules are keeping us ahead of failures. ROI is clear.',author:'Ops Director',sentiment:'positive'},
      {text:'Would like more detailed monthly reporting on energy savings.',author:'CFO Office',sentiment:'neutral'},
    ],
  },
  {
    id:'dubai-towers', name:'Dubai Marina Towers', region:'Gulf', regionShort:'GCC',
    initials:'DM', color:'#F5C518',
    roi: 156200, satisfaction: 74, nps: 52, equipHealth: 78,
    status:'yellow', statusText:'Needs Attention',
    criticality: 2, revenue: 920000,
    cbm:[
      {name:'Chiller Compressor #1',loc:'Plant Room B3',status:'yellow',val:68},
      {name:'ATS Panel — Tower A',loc:'LV Room Floor 1',status:'green',val:90},
      {name:'UPS Symmetra 500kVA',loc:'Data Center',status:'yellow',val:71},
      {name:'Fire Pump VSD',loc:'Basement 2',status:'green',val:88},
      {name:'BMS Server Rack',loc:'Facilities Office',status:'red',val:45},
    ],
    history:[
      {title:'Chiller refrigerant top-up',desc:'Low charge detected on Comp #1 — topped up R-134a, monitoring for leak.',date:'24 Apr 2026',type:'yellow'},
      {title:'BMS server crash recovery',desc:'Primary BMS server failed — switched to backup. Root cause: disk failure.',date:'20 Apr 2026',type:'red'},
      {title:'UPS battery impedance test',desc:'3 cells above threshold on string A — replacement recommended.',date:'14 Apr 2026',type:'yellow'},
      {title:'Fire pump annual test',desc:'Full flow test passed — 105% rated capacity.',date:'05 Apr 2026',type:'green'},
    ],
    upcoming:[
      {title:'BMS server replacement',sub:'Primary server · RAID rebuild',priority:'high',due:'Tomorrow',dueClass:'urgent'},
      {title:'UPS cell replacement',sub:'String A · 3 cells',priority:'high',due:'May 02',dueClass:'urgent'},
      {title:'Chiller leak detection',sub:'Comp #1 · Evaporator',priority:'medium',due:'May 08',dueClass:'soon'},
      {title:'ATS functional test',sub:'Tower A · Quarterly',priority:'low',due:'May 20',dueClass:'normal'},
    ],
    financial:{labels:['Nov','Dec','Jan','Feb','Mar','Apr'],revenue:[160000,145000,155000,148000,162000,150000],cost:[120000,130000,115000,125000,138000,142000]},
    feedback:[
      {text:'BMS outage caused tenant complaints. Need faster incident response.',author:'Property Manager',sentiment:'negative'},
      {text:'Fire safety systems are well maintained. Good compliance record.',author:'HSE Officer',sentiment:'positive'},
      {text:'Chiller issues recurring — request root cause analysis.',author:'Facilities Director',sentiment:'negative'},
    ],
  },
  {
    id:'berlin-pharma', name:'Berlin Pharma GmbH', region:'Europe', regionShort:'EU',
    initials:'BP', color:'#E8413C',
    roi: 58700, satisfaction: 51, nps: 22, equipHealth: 62,
    status:'red', statusText:'Critical',
    criticality: 3, revenue: 480000,
    cbm:[
      {name:'Clean Room AHU #4',loc:'Production Wing C',status:'red',val:42},
      {name:'Chilled Water Pump P3',loc:'Utility Building',status:'red',val:38},
      {name:'Emergency Generator',loc:'External Yard',status:'yellow',val:65},
      {name:'PLC Modicon M580',loc:'Automation Room',status:'green',val:88},
      {name:'Power Meter ION9000',loc:'Main Switchboard',status:'green',val:93},
    ],
    history:[
      {title:'AHU #4 fan failure',desc:'Supply fan motor burned out — emergency replacement. 8h production downtime.',date:'27 Apr 2026',type:'red'},
      {title:'Chilled water pump seizure',desc:'P3 bearing failure — catastrophic. Backup pump activated.',date:'22 Apr 2026',type:'red'},
      {title:'Generator load bank test',desc:'Failed at 85% load — fuel injector issue found.',date:'15 Apr 2026',type:'yellow'},
      {title:'PLC firmware patch',desc:'Applied security patch for Modicon M580 — no issues.',date:'08 Apr 2026',type:'green'},
    ],
    upcoming:[
      {title:'AHU #4 motor commissioning',sub:'Production Wing C · New motor',priority:'high',due:'Today',dueClass:'urgent'},
      {title:'Pump P3 full rebuild',sub:'Utility Building · Bearing + seal',priority:'high',due:'Tomorrow',dueClass:'urgent'},
      {title:'Generator injector repair',sub:'External Yard · Cylinder 3',priority:'high',due:'May 03',dueClass:'urgent'},
      {title:'Clean room validation',sub:'Wing C · Post-AHU repair',priority:'medium',due:'May 06',dueClass:'soon'},
    ],
    financial:{labels:['Nov','Dec','Jan','Feb','Mar','Apr'],revenue:[85000,78000,82000,76000,88000,71000],cost:[95000,92000,105000,98000,110000,120000]},
    feedback:[
      {text:'Unacceptable downtime on AHU #4. This affected GMP production. Escalation filed.',author:'Quality Director',sentiment:'negative'},
      {text:'Pump failures should have been caught by CBM. Review monitoring thresholds.',author:'Plant Engineer',sentiment:'negative'},
      {text:'PLC support team is responsive. Good work on cybersecurity patch.',author:'IT Manager',sentiment:'positive'},
    ],
  },
];

const ALERTS = [
  {type:'critical',title:'AHU #4 Motor Failure',desc:'Berlin Pharma — fan motor burned out. Emergency replacement underway.',meta:'27 Apr · 2h ago',icon:'⚠️'},
  {type:'critical',title:'Chilled Water Pump P3 Down',desc:'Berlin Pharma — backup pump active. Full rebuild scheduled.',meta:'22 Apr',icon:'⚠️'},
  {type:'warning',title:'BMS Primary Server Offline',desc:'Dubai Marina — running on backup server. Replacement hardware en route.',meta:'20 Apr',icon:'🔧'},
  {type:'warning',title:'UPS Battery Degradation',desc:'Dubai Marina — 3 cells above impedance threshold on String A.',meta:'14 Apr',icon:'🔋'},
  {type:'info',title:'Cooler Grate Wear Detected',desc:'Cairo Cement — grate plate wear on Row 3. Parts on order.',meta:'10 Apr',icon:'📋'},
  {type:'info',title:'All Quarterly PMs Complete',desc:'Cairo Cement — 100% PM compliance for Q1 2026.',meta:'01 Apr',icon:'✅'},
];

// ── UTILS ──
const fmt = (usd) => {
    const v = usd * RATES[currency];
    const s = SYMS[currency];
    if(v>=1e6) return s+(v/1e6).toFixed(2)+'M';
    if(v>=1e3) return s+(v/1e3).toFixed(1)+'K';
    return s+v.toFixed(0);
};

function updateDate(){
    const d=new Date();
    document.getElementById('liveDate').textContent=d.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric',hour:'2-digit',minute:'2-digit'});
}

// ── RENDER OVERVIEW ──
function renderKPIStrip(){
    const avgRoi = CUSTOMERS.reduce((s,c)=>s+c.roi,0)/CUSTOMERS.length;
    const avgSat = Math.round(CUSTOMERS.reduce((s,c)=>s+c.satisfaction,0)/CUSTOMERS.length);
    const totalRev = CUSTOMERS.reduce((s,c)=>s+c.revenue,0);
    document.getElementById('avgRoiVal').textContent = fmt(avgRoi);
    document.getElementById('avgSatVal').textContent = avgSat+'%';
    document.getElementById('totalRevVal').textContent = fmt(totalRev);
}

function renderCustomerCards(){
    const grid = document.getElementById('customerGrid');
    const sorted = [...CUSTOMERS];
    const sortBy = document.querySelector('.sort-option.active')?.dataset.sort||'name';
    sorted.sort((a,b)=>{
        if(sortBy==='roi') return b.roi-a.roi;
        if(sortBy==='satisfaction') return b.satisfaction-a.satisfaction;
        if(sortBy==='criticality') return a.criticality-b.criticality;
        if(sortBy==='region') return a.region.localeCompare(b.region);
        return a.name.localeCompare(b.name);
    });
    grid.innerHTML = sorted.map((c,i)=>{
        const satColor = c.satisfaction>=80?'green':c.satisfaction>=60?'yellow':'red';
        const healthColor = c.equipHealth>=85?'green':c.equipHealth>=65?'yellow':'red';
        const barColor = c.equipHealth>=85?'var(--se-green)':c.equipHealth>=65?'var(--se-yellow)':'var(--se-red)';
        return `<div class="cust-card" data-id="${c.id}" style="animation-delay:${i*.08}s">
            <div class="cust-card-top">
                <div class="cust-header">
                    <span class="cust-name">${c.name}</span>
                    <span class="cust-region">${c.regionShort}</span>
                </div>
                <div class="cust-kpis">
                    <div class="cust-kpi"><span class="cust-kpi-label">ROI</span><span class="cust-kpi-value green">${fmt(c.roi)}</span></div>
                    <div class="cust-kpi"><span class="cust-kpi-label">Satisfaction</span><span class="cust-kpi-value ${satColor}">${c.satisfaction}%</span></div>
                    <div class="cust-kpi"><span class="cust-kpi-label">Equip. Health</span><span class="cust-kpi-value ${healthColor}">${c.equipHealth}%</span></div>
                </div>
                <div class="health-bar-mini"><div class="health-bar-fill" style="width:${c.equipHealth}%;background:${barColor}"></div></div>
            </div>
            <div class="cust-card-bottom">
                <span class="cust-status"><span class="status-dot ${c.status}"></span>${c.statusText}</span>
                <span class="cust-open">Details <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></span>
            </div>
        </div>`;
    }).join('');

    grid.querySelectorAll('.cust-card').forEach(card=>{
        card.addEventListener('click',()=>openDrilldown(card.dataset.id));
    });
}

function renderAlerts(){
    document.getElementById('alertsGrid').innerHTML = ALERTS.map(a=>{
        const cls = a.type==='critical'?'critical':a.type==='warning'?'warning':'info';
        const iconColor = a.type==='critical'?'var(--se-red)':a.type==='warning'?'#A07800':'var(--se-green-dark)';
        return `<div class="alert-tile ${cls}">
            <div class="alert-icon-wrap"><span style="font-size:1.1rem">${a.icon}</span></div>
            <div class="alert-body">
                <div class="alert-title">${a.title}</div>
                <div class="alert-desc">${a.desc}</div>
                <div class="alert-meta">${a.meta}</div>
            </div>
        </div>`;
    }).join('');
}

// ── DRILL-DOWN ──
let ddFinChart, ddEqChart;
function openDrilldown(id){
    const c = CUSTOMERS.find(x=>x.id===id);
    if(!c) return;
    document.getElementById('overviewPage').classList.add('hidden');
    document.getElementById('drilldownPage').classList.remove('hidden');
    document.getElementById('pageTitle').textContent = c.name;

    // Header
    const satColor = c.satisfaction>=80?'green':c.satisfaction>=60?'yellow':'red';
    document.getElementById('ddHeader').innerHTML = `
        <div class="dd-cust-info">
            <div class="dd-cust-avatar" style="background:linear-gradient(135deg,${c.color},var(--se-green-dark))">${c.initials}</div>
            <div><div class="dd-cust-name">${c.name}</div><div class="dd-cust-region">${c.region} · ${c.statusText}</div></div>
        </div>
        <div class="dd-kpi-strip">
            <div class="dd-kpi-item"><span class="dd-kpi-label">ROI</span><span class="dd-kpi-val" style="color:var(--se-green-dark)">${fmt(c.roi)}</span></div>
            <div class="dd-kpi-item"><span class="dd-kpi-label">Satisfaction</span><span class="dd-kpi-val" style="color:${satColor==='green'?'var(--se-green-dark)':satColor==='yellow'?'#A07800':'var(--se-red)'}">${c.satisfaction}%</span></div>
            <div class="dd-kpi-item"><span class="dd-kpi-label">NPS</span><span class="dd-kpi-val">${c.nps}</span></div>
            <div class="dd-kpi-item"><span class="dd-kpi-label">Revenue</span><span class="dd-kpi-val" style="color:var(--se-green-dark)">${fmt(c.revenue)}</span></div>
        </div>`;

    // Financial chart
    if(ddFinChart) ddFinChart.destroy();
    const fCtx = document.getElementById('ddFinancialChart').getContext('2d');
    ddFinChart = new Chart(fCtx,{
        type:'bar',
        data:{
            labels:c.financial.labels,
            datasets:[
                {label:'Revenue',data:c.financial.revenue.map(v=>v*RATES[currency]),backgroundColor:'rgba(61,205,88,.7)',borderRadius:6,borderSkipped:false},
                {label:'Cost',data:c.financial.cost.map(v=>v*RATES[currency]),backgroundColor:'rgba(245,197,24,.6)',borderRadius:6,borderSkipped:false},
            ]
        },
        options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'top',align:'end',labels:{font:{family:'Inter',size:11,weight:'600'},boxWidth:10,boxHeight:10,borderRadius:3,useBorderRadius:true,padding:14}},tooltip:{backgroundColor:'#fff',titleColor:'#1A1D2B',bodyColor:'#4B4F5E',borderColor:'#E2E4E9',borderWidth:1,padding:12,cornerRadius:8,titleFont:{family:'Inter',size:12,weight:'600'},bodyFont:{family:'Inter',size:11}}},scales:{x:{grid:{display:false},ticks:{font:{family:'Inter',size:11}},border:{display:false}},y:{grid:{color:'rgba(0,0,0,.04)'},ticks:{font:{family:'Inter',size:11},callback:v=>fmt(v/RATES[currency]),maxTicksLimit:5},border:{display:false}}}}
    });

    // Satisfaction Gauge
    drawGauge('ddSatGauge',c.satisfaction,100,c.satisfaction>=80?'#3DCD58':c.satisfaction>=60?'#F5C518':'#E8413C');
    // NPS Gauge
    drawGauge('ddNpsGauge',c.nps,100,c.nps>=60?'#3DCD58':c.nps>=40?'#F5C518':'#E8413C');

    // Feedback
    document.getElementById('ddFeedback').innerHTML = c.feedback.map(f=>`
        <div class="feedback-item ${f.sentiment==='negative'?'negative':f.sentiment==='neutral'?'neutral':''}">
            <div class="feedback-text">"${f.text}"</div>
            <div class="feedback-author">— ${f.author}</div>
        </div>`).join('');

    // CBM
    document.getElementById('ddCbmList').innerHTML = c.cbm.map(e=>`
        <div class="cbm-row">
            <div class="cbm-dot ${e.status}"></div>
            <div class="cbm-eq-info"><div class="cbm-eq-name">${e.name}</div><div class="cbm-eq-loc">${e.loc}</div></div>
            <span class="cbm-eq-val ${e.status}">${e.val}%</span>
        </div>`).join('');

    // Timeline
    document.getElementById('ddTimeline').innerHTML = c.history.map((h,i)=>`
        <div class="tl-item">
            <div class="tl-dot-col"><div class="tl-dot ${h.type}"></div>${i<c.history.length-1?'<div class="tl-line"></div>':''}</div>
            <div class="tl-body"><div class="tl-title">${h.title}</div><div class="tl-desc">${h.desc}</div><div class="tl-date">📅 ${h.date}</div></div>
        </div>`).join('');

    // Actions
    document.getElementById('ddActions').innerHTML = c.upcoming.map(a=>`
        <li class="act-item">
            <div class="act-pri ${a.priority}"></div>
            <div class="act-body"><div class="act-title">${a.title}</div><div class="act-sub">${a.sub}</div></div>
            <span class="act-due ${a.dueClass}">${a.due}</span>
        </li>`).join('');

    // Equipment chart
    if(ddEqChart) ddEqChart.destroy();
    const eCtx = document.getElementById('ddEquipChart').getContext('2d');
    ddEqChart = new Chart(eCtx,{
        type:'doughnut',
        data:{
            labels:c.cbm.map(e=>e.name.split(' ')[0]),
            datasets:[{data:c.cbm.map(e=>e.val),backgroundColor:c.cbm.map(e=>e.status==='green'?'#3DCD58':e.status==='yellow'?'#F5C518':'#E8413C'),borderWidth:2,borderColor:'#fff'}]
        },
        options:{responsive:true,maintainAspectRatio:false,cutout:'60%',plugins:{legend:{position:'right',labels:{font:{family:'Inter',size:11},boxWidth:10,padding:10}},tooltip:{backgroundColor:'#fff',titleColor:'#1A1D2B',bodyColor:'#4B4F5E',borderColor:'#E2E4E9',borderWidth:1,padding:10,cornerRadius:8}}}
    });

    window.scrollTo({top:0,behavior:'smooth'});
}

function closeDrilldown(){
    document.getElementById('drilldownPage').classList.add('hidden');
    document.getElementById('overviewPage').classList.remove('hidden');
    document.getElementById('pageTitle').textContent = 'Customer Success Overview';
}

// ── GAUGE ──
function drawGauge(id,value,max,color){
    const canvas=document.getElementById(id);
    if(!canvas)return;
    const ctx=canvas.getContext('2d');
    const w=canvas.width,h=canvas.height;
    const cx=w/2,cy=h-10,r=Math.min(cx,cy)-12;
    ctx.clearRect(0,0,w,h);
    // bg arc
    ctx.beginPath();ctx.arc(cx,cy,r,Math.PI,0);ctx.strokeStyle='#E2E4E9';ctx.lineWidth=12;ctx.lineCap='round';ctx.stroke();
    // value arc
    const angle=Math.PI+(value/max)*Math.PI;
    ctx.beginPath();ctx.arc(cx,cy,r,Math.PI,angle);ctx.strokeStyle=color;ctx.lineWidth=12;ctx.lineCap='round';ctx.stroke();
    // text
    ctx.fillStyle='#1A1D2B';ctx.font='bold 22px Inter';ctx.textAlign='center';ctx.fillText(value,cx,cy-10);
}

// ── CURRENCY ──
function initCurrency(){
    const btns=document.querySelectorAll('.curr-btn');
    const ind=document.querySelector('.curr-indicator');
    btns.forEach((b,i)=>{
        b.addEventListener('click',()=>{
            btns.forEach(x=>x.classList.remove('active'));
            b.classList.add('active');
            ind.style.transform=`translateX(${i*100}%)`;
            currency=b.dataset.curr;
            renderKPIStrip();
            renderCustomerCards();
        });
    });
}

// ── SORT ──
function initSort(){
    const btn=document.getElementById('sortBtn');
    const menu=document.getElementById('sortMenu');
    btn.addEventListener('click',e=>{e.stopPropagation();menu.classList.toggle('open')});
    document.addEventListener('click',()=>menu.classList.remove('open'));
    menu.querySelectorAll('.sort-option').forEach(opt=>{
        opt.addEventListener('click',e=>{
            e.stopPropagation();
            menu.querySelectorAll('.sort-option').forEach(o=>o.classList.remove('active'));
            opt.classList.add('active');
            menu.classList.remove('open');
            renderCustomerCards();
        });
    });
}

// ── SIDEBAR ──
function initSidebar(){
    document.getElementById('hamburger').addEventListener('click',()=>{
        document.getElementById('sidebar').classList.toggle('open');
    });
}

// ── INIT ──
document.addEventListener('DOMContentLoaded',()=>{
    updateDate();setInterval(updateDate,60000);
    renderKPIStrip();
    renderCustomerCards();
    renderAlerts();
    initCurrency();
    initSort();
    initSidebar();
    document.getElementById('backBtn').addEventListener('click',closeDrilldown);
});
