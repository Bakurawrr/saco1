/* app.js — versión corregida y estable */

// Storage
const STORAGE_KEY = 'karaoke_clash_state_v1';

// Simple helper to query safely
const $ = id => document.getElementById(id);

// Default state
let state = {
  players: [],            // {id,name,score,starCount,playedRounds}
  currentIndex: 0,
  currentRound: 1,
  roundsPerPlayer: 5,
  perfTime: 40,
  history: [],
  lastAction: null,
  _currentVotes: {}
};

// --- SONGS, STYLES, CHALLENGES (use your large arrays) ---
const SONGS = (function(){
  // copy the SONGS array you had previously here.
  // For brevity I'll reuse the array you provided earlier.
  return [
    {"title":"Despacito","artist":"Luis Fonsi ft. Daddy Yankee","genre":"latin","lang":"es"},
    {"title":"Shape of You","artist":"Ed Sheeran","genre":"pop","lang":"en"},
    {"title":"Bad Romance","artist":"Lady Gaga","genre":"pop","lang":"en"},
    {"title":"Blinding Lights","artist":"The Weeknd","genre":"pop","lang":"en"},
    {"title":"Believer","artist":"Imagine Dragons","genre":"rock","lang":"en"},
    {"title":"Uptown Funk","artist":"Mark Ronson ft. Bruno Mars","genre":"pop","lang":"en"},
    {"title":"Bohemian Rhapsody","artist":"Queen","genre":"rock","lang":"en"},
    {"title":"Billie Jean","artist":"Michael Jackson","genre":"pop","lang":"en"},
    {"title":"Rolling in the Deep","artist":"Adele","genre":"pop","lang":"en"},
    {"title":"Hotel California","artist":"Eagles","genre":"rock","lang":"en"},
    {"title":"Smells Like Teen Spirit","artist":"Nirvana","genre":"rock","lang":"en"},
    {"title":"Hey Jude","artist":"The Beatles","genre":"rock","lang":"en"},
    {"title":"Wonderwall","artist":"Oasis","genre":"rock","lang":"en"},
    {"title":"Sweet Child O' Mine","artist":"Guns N' Roses","genre":"rock","lang":"en"},
    {"title":"Somebody That I Used To Know","artist":"Gotye","genre":"pop","lang":"en"},
    {"title":"Viva La Vida","artist":"Coldplay","genre":"pop","lang":"en"},
    {"title":"Royals","artist":"Lorde","genre":"pop","lang":"en"},
    {"title":"Señorita","artist":"Shawn Mendes & Camila Cabello","genre":"pop","lang":"en"},
    {"title":"Havana","artist":"Camila Cabello","genre":"pop","lang":"en"},
    {"title":"Livin' On A Prayer","artist":"Bon Jovi","genre":"rock","lang":"en"},
    {"title":"Dancing Queen","artist":"ABBA","genre":"pop","lang":"en"},
    {"title":"I Will Survive","artist":"Gloria Gaynor","genre":"pop","lang":"en"},
    {"title":"Let It Go","artist":"Idina Menzel","genre":"pop","lang":"en"},
    {"title":"Hallelujah","artist":"Jeff Buckley","genre":"pop","lang":"en"},
    {"title":"My Heart Will Go On","artist":"Celine Dion","genre":"pop","lang":"en"},
    {"title":"All of Me","artist":"John Legend","genre":"pop","lang":"en"},
    {"title":"Halo","artist":"Beyoncé","genre":"pop","lang":"en"},
    {"title":"Shallow","artist":"Lady Gaga & Bradley Cooper","genre":"pop","lang":"en"},
    {"title":"Stairway to Heaven","artist":"Led Zeppelin","genre":"rock","lang":"en"},
    {"title":"What's Up","artist":"4 Non Blondes","genre":"rock","lang":"en"},
    {"title":"Perfect","artist":"Ed Sheeran","genre":"pop","lang":"en"},
    {"title":"Take On Me","artist":"a-ha","genre":"pop","lang":"en"},
    {"title":"Take Me To Church","artist":"Hozier","genre":"pop","lang":"en"},
    {"title":"Cheap Thrills","artist":"Sia","genre":"pop","lang":"en"},
    {"title":"Chandelier","artist":"Sia","genre":"pop","lang":"en"},
    {"title":"Poker Face","artist":"Lady Gaga","genre":"pop","lang":"en"},
    {"title":"Toxic","artist":"Britney Spears","genre":"pop","lang":"en"},
    {"title":"Baby One More Time","artist":"Britney Spears","genre":"pop","lang":"en"},
    {"title":"Someone Like You","artist":"Adele","genre":"pop","lang":"en"},
    {"title":"Hello","artist":"Adele","genre":"pop","lang":"en"},
    {"title":"Fix You","artist":"Coldplay","genre":"pop","lang":"en"},
    {"title":"Yellow","artist":"Coldplay","genre":"pop","lang":"en"},
    {"title":"Radioactive","artist":"Imagine Dragons","genre":"rock","lang":"en"},
    {"title":"Thunder","artist":"Imagine Dragons","genre":"rock","lang":"en"},
    {"title":"Counting Stars","artist":"OneRepublic","genre":"pop","lang":"en"},
    {"title":"Sugar","artist":"Maroon 5","genre":"pop","lang":"en"},
    {"title":"Moves Like Jagger","artist":"Maroon 5","genre":"pop","lang":"en"},
    {"title":"Lean On","artist":"Major Lazer & DJ Snake","genre":"pop","lang":"en"},
    {"title":"Sorry","artist":"Justin Bieber","genre":"pop","lang":"en"},
    {"title":"Love Yourself","artist":"Justin Bieber","genre":"pop","lang":"en"},
    {"title":"Aserejé","artist":"Las Ketchup","genre":"latin","lang":"es"},
    {"title":"La Bicicleta","artist":"Carlos Vives & Shakira","genre":"latin","lang":"es"},
    {"title":"Waka Waka","artist":"Shakira","genre":"latin","lang":"es"},
    {"title":"Hips Don't Lie","artist":"Shakira","genre":"latin","lang":"es"},
    {"title":"Tusa","artist":"Karol G & Nicki Minaj","genre":"latin","lang":"es"},
    {"title":"Baila Baila Baila","artist":"Ozuna","genre":"latin","lang":"es"},
    {"title":"Dákiti","artist":"Bad Bunny & Jhay Cortez","genre":"latin","lang":"es"},
    {"title":"Callaíta","artist":"Bad Bunny","genre":"latin","lang":"es"},
    {"title":"Mi Gente","artist":"J Balvin & Willy William","genre":"latin","lang":"es"},
    {"title":"Felices los 4","artist":"Maluma","genre":"latin","lang":"es"},
    {"title":"Hawái","artist":"Maluma","genre":"latin","lang":"es"},
    {"title":"Vente Pa' Ca","artist":"Ricky Martin","genre":"latin","lang":"es"},
    {"title":"La Camisa Negra","artist":"Juanes","genre":"latin","lang":"es"},
    {"title":"A Dios le Pido","artist":"Juanes","genre":"latin","lang":"es"},
    {"title":"Corazón Espinado","artist":"Santana & Maná","genre":"latin","lang":"es"},
    {"title":"Oye Mi Amor","artist":"Maná","genre":"latin","lang":"es"},
    {"title":"Como La Flor","artist":"Selena","genre":"latin","lang":"es"},
    {"title":"Bidi Bidi Bom Bom","artist":"Selena","genre":"latin","lang":"es"},
    {"title":"Suavemente","artist":"Elvis Crespo","genre":"latin","lang":"es"},
    {"title":"La Vida es un Carnaval","artist":"Celia Cruz","genre":"latin","lang":"es"},
    {"title":"Vivir Mi Vida","artist":"Marc Anthony","genre":"latin","lang":"es"},
    {"title":"Te Conozco","artist":"Ricardo Arjona","genre":"latin","lang":"es"},
    {"title":"Historia de un Taxi","artist":"Ricardo Arjona","genre":"latin","lang":"es"},
    {"title":"Candle in the Wind","artist":"Elton John","genre":"pop","lang":"en"},
    {"title":"Rocket Man","artist":"Elton John","genre":"pop","lang":"en"},
    {"title":"Tiny Dancer","artist":"Elton John","genre":"pop","lang":"en"},
    {"title":"Someone You Loved","artist":"Lewis Capaldi","genre":"pop","lang":"en"},
    {"title":"Say You Won't Let Go","artist":"James Arthur","genre":"pop","lang":"en"},
    {"title":"Diamonds","artist":"Rihanna","genre":"pop","lang":"en"},
    {"title":"Umbrella","artist":"Rihanna","genre":"pop","lang":"en"},
    {"title":"Pompeii","artist":"Bastille","genre":"rock","lang":"en"},
    {"title":"I Gotta Feeling","artist":"Black Eyed Peas","genre":"pop","lang":"en"},
    {"title":"Hey Ya!","artist":"Outkast","genre":"pop","lang":"en"},
    {"title":"Crazy In Love","artist":"Beyoncé ft. Jay-Z","genre":"pop","lang":"en"},
    {"title":"Single Ladies","artist":"Beyoncé","genre":"pop","lang":"en"},
    {"title":"Mr Brightside","artist":"The Killers","genre":"rock","lang":"en"},
    {"title":"Take Me Out","artist":"Franz Ferdinand","genre":"rock","lang":"en"},
    {"title":"Photograph","artist":"Ed Sheeran","genre":"pop","lang":"en"},
    {"title":"I Want It That Way","artist":"Backstreet Boys","genre":"pop","lang":"en"},
    {"title":"Sk8er Boi","artist":"Avril Lavigne","genre":"pop","lang":"en"},
    {"title":"Complicated","artist":"Avril Lavigne","genre":"pop","lang":"en"},
    {"title":"Waterfalls","artist":"TLC","genre":"rnb","lang":"en"},
    {"title":"No Scrubs","artist":"TLC","genre":"rnb","lang":"en"},
    {"title":"Say My Name","artist":"Destiny's Child","genre":"rnb","lang":"en"},
    {"title":"Survivor","artist":"Destiny's Child","genre":"rnb","lang":"en"},
    {"title":"Set Fire to the Rain","artist":"Adele","genre":"pop","lang":"en"},
    {"title":"Back To Black","artist":"Amy Winehouse","genre":"pop","lang":"en"},
    {"title":"Rehab","artist":"Amy Winehouse","genre":"pop","lang":"en"},
    {"title":"Valerie","artist":"Amy Winehouse","genre":"pop","lang":"en"},
    {"title":"With or Without You","artist":"U2","genre":"rock","lang":"en"},
    {"title":"One","artist":"U2","genre":"rock","lang":"en"},
    {"title":"Beautiful Day","artist":"U2","genre":"rock","lang":"en"},
    {"title":"Thriller","artist":"Michael Jackson","genre":"pop","lang":"en"},
    {"title":"Beat It","artist":"Michael Jackson","genre":"pop","lang":"en"},
    {"title":"Smooth Criminal","artist":"Michael Jackson","genre":"pop","lang":"en"},
    {"title":"Girls Just Want to Have Fun","artist":"Cyndi Lauper","genre":"pop","lang":"en"},
    {"title":"Take Me Home, Country Roads","artist":"John Denver","genre":"country","lang":"en"},
    {"title":"Fast Car","artist":"Tracy Chapman","genre":"folk","lang":"en"},
    {"title":"Black","artist":"Pearl Jam","genre":"rock","lang":"en"},
    {"title":"Creep","artist":"Radiohead","genre":"rock","lang":"en"},
    {"title":"All Star","artist":"Smash Mouth","genre":"pop","lang":"en"},
    {"title":"The Middle","artist":"Jimmy Eat World","genre":"rock","lang":"en"},
    {"title":"Basket Case","artist":"Green Day","genre":"rock","lang":"en"},
    {"title":"American Idiot","artist":"Green Day","genre":"rock","lang":"en"},
    {"title":"Wake Me Up","artist":"Avicii","genre":"electronic","lang":"en"},
    {"title":"Levels","artist":"Avicii","genre":"electronic","lang":"en"},
    {"title":"Titanium","artist":"David Guetta ft. Sia","genre":"electronic","lang":"en"},
    {"title":"Don't You Worry Child","artist":"Swedish House Mafia","genre":"electronic","lang":"en"},
    {"title":"Sandstorm","artist":"Darude","genre":"electronic","lang":"en"},
    {"title":"Barbie Girl","artist":"Aqua","genre":"pop","lang":"en"},
    {"title":"Macarena","artist":"Los del Río","genre":"latin","lang":"es"},
    {"title":"La Copa de la Vida","artist":"Ricky Martin","genre":"latin","lang":"es"},
    {"title":"Zombie","artist":"The Cranberries","genre":"rock","lang":"en"}
  ];
})();

const STYLES = [ "Feliz","Triste","Enojado","Tímido","Súper rápido","Súper lento","Susurrado","Romántico",
 "Cansado","Infantil","Misterioso","Dramático","Concierto grande","Robot","Ópera","Caricatura",
 "Vaquero","Rapero","Borracho (actuado)","Telenovela","Supervillano","Princesa Disney","Con prisa",
 "Militar","Sin vocales","Última sílaba","Beatbox","Cantando y bailando","Cambio de tono cada 2 palabras",
 "Actuación completa","Llorando","Riendo","Asustado","Ópera + Rap","Épico","Malévolo" ];

const CHALLENGES = [ "Empieza desde el final","Canta solo el coro","Canta la primera frase","Canta la parte más famosa",
 "Cambia una palabra por 'pollo'","Cambia una palabra por 'pizza'","Cambia todo por 'na na na'","A capella",
 "Sin moverte","Moviéndote demasiado","Tienes 5s para empezar","Tienes 10s de práctica","Imitar al cantante original",
 "Mirar al techo","Sin abrir los ojos","Mirar al público","No decir la letra exactamente","Volumen muy bajo",
 "Volumen muy alto","Cantar odiando la canción","Cantar como si fuera tu favorita","En audición",
 "Cantar como si te pagaran","Versión meme" ];

// ---------- persistence ----------
function saveState(){ try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }catch(e){ console.warn('No se pudo guardar state', e); } }
function loadState(){ try{ const s = localStorage.getItem(STORAGE_KEY); if(s) Object.assign(state, JSON.parse(s)); }catch(e){ console.warn('No se pudo cargar state', e); } }
loadState();

// ---------- helpers ----------
function escapeHtml(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function pickRandom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function safe(fn){ return function(...a){ try{ return fn(...a); } catch(e){ console.error(e); alert('Error interno: '+(e.message||e)); } }; }

// ---------- UI rendering ----------
function renderPlayers(){
  const list = $('playersList'); if(!list) return;
  list.innerHTML = '';
  state.players.forEach(p=>{
    const div = document.createElement('div'); div.className='player-row';
    div.innerHTML = `<div><div style="font-weight:800">${escapeHtml(p.name)}</div><div style="font-size:12px;color:#aaa">P:${p.score} • E:${p.starCount||0}</div></div>
      <div><button class="ghost" data-edit="${p.id}">Editar</button>
      <button class="ghost" data-remove="${p.id}">X</button></div>`;
    list.appendChild(div);
  });
  // attach edit/remove handlers
  list.querySelectorAll('[data-edit]').forEach(btn=>{
    btn.onclick = ()=> {
      const id = btn.getAttribute('data-edit');
      const p = state.players.find(x=>x.id===id);
      if(!p) return;
      const n = prompt('Nuevo nombre', p.name);
      if(n){ p.name = n; addHistory(`Jugador editado: ${p.name}`); renderPlayers(); renderLeaderboard(); saveState(); }
    };
  });
  list.querySelectorAll('[data-remove]').forEach(btn=>{
    btn.onclick = ()=> {
      const id = btn.getAttribute('data-remove');
      if(!confirm('Eliminar jugador?')) return;
      state.players = state.players.filter(x=>x.id!==id);
      addHistory('Jugador eliminado');
      renderPlayers(); renderLeaderboard(); saveState();
    };
  });
}

function addPlayer(){
  const nameInput = $('playerName'); if(!nameInput) return;
  const name = nameInput.value.trim();
  if(!name) return alert('Escribe un nombre');
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2,6);
  state.players.push({id,name,score:0,starCount:0,playedRounds:0});
  nameInput.value = '';
  addHistory(`Jugador añadido: ${name}`);
  renderPlayers(); renderLeaderboard(); saveState();
}
window.addPlayer = safe(addPlayer);

// leaderboard & turn info
function renderLeaderboard(){
  const box = $('leaderboard'); if(!box) return;
  box.innerHTML = '';
  state.players.slice().sort((a,b)=>b.score-a.score).forEach(p=>{
    const d = document.createElement('div'); d.className='player-score';
    d.innerHTML = `<div>${escapeHtml(p.name)}</div><div style="font-weight:800">${p.score}</div>`;
    box.appendChild(d);
  });
  const turnInfo = $('turnInfo'); if(turnInfo){
    if(state.players.length>0){
      const current = state.players[state.currentIndex % state.players.length];
      turnInfo.innerText = `Jugador actual: ${current.name}`;
    } else turnInfo.innerText = 'Juego no iniciado';
  }
  const rc = $('roundCounter'); if(rc) rc.innerText = state.currentRound;
}

// history
function addHistory(text){
  state.history = state.history || [];
  state.history.unshift(`${new Date().toLocaleTimeString()} — ${text}`);
  if(state.history.length>200) state.history.pop();
  renderHistory(); saveState();
}
function renderHistory(){
  const h = $('history'); if(!h) return;
  h.innerHTML = (state.history||[]).map(x=>`<div style="padding:4px;border-bottom:1px dashed rgba(255,255,255,0.02)">${escapeHtml(x)}</div>`).join('');
}

// populate filters
function initFilters(){
  const genres = Array.from(new Set(SONGS.map(s=>s.genre))).sort();
  const langs = Array.from(new Set(SONGS.map(s=>s.lang))).sort();
  const gsel = $('genreFilter'); const lsel = $('langFilter');
  if(gsel) gsel.innerHTML = '<option value="all">Todos los géneros</option>' + genres.map(g=>`<option value="${g}">${g}</option>`).join('');
  if(lsel) lsel.innerHTML = '<option value="all">Todos los idiomas</option>' + langs.map(l=>`<option value="${l}">${l}</option>`).join('');
}

// songs selection
function selectRandomSong(){
  const g = $('genreFilter') ? $('genreFilter').value : 'all';
  const l = $('langFilter') ? $('langFilter').value : 'all';
  let pool = SONGS.slice();
  if(g && g !== 'all') pool = pool.filter(s=>s.genre===g);
  if(l && l !== 'all') pool = pool.filter(s=>s.lang===l);
  if(pool.length===0) return alert('No hay canciones con esos filtros');
  const s = pickRandom(pool);
  const cs = $('currentSong'); if(cs) cs.innerText = `Canción: ${s.title} — ${s.artist}`;
  addHistory(`Canción seleccionada: ${s.title}`);
}
window.randomSong = safe(selectRandomSong);

function searchSong(){
  const q = $('songSearch') ? $('songSearch').value.trim().toLowerCase() : '';
  if(!q) return alert('Escribe algo para buscar');
  const found = SONGS.filter(s=> (s.title + ' ' + s.artist).toLowerCase().includes(q));
  if(found.length===0) return alert('No se encontró');
  const s = pickRandom(found);
  const cs = $('currentSong'); if(cs) cs.innerText = `Canción: ${s.title} — ${s.artist}`;
  addHistory(`Canción buscada: ${s.title}`);
}
window.searchSong = safe(searchSong);

// cards
function drawStyle(){ const s = pickRandom(STYLES); const el = $('styleCard'); if(el) el.innerText = `Estilo: ${s}`; return s; }
function drawChallenge(){ const c = pickRandom(CHALLENGES); const el = $('challengeCard'); if(el) el.innerText = `Desafío: ${c}`; return c; }
function drawBoth(){ drawStyle(); drawChallenge(); addHistory('Robó estilo + desafío'); }
window.drawBoth = safe(drawBoth);
window.rerollStyle = safe(()=>{ drawStyle(); addHistory('Reroll estilo'); });
window.rerollChallenge = safe(()=>{ drawChallenge(); addHistory('Reroll desafío'); });

// timers
let timerInterval = null;
function clearTimer(){ if(timerInterval){ clearInterval(timerInterval); timerInterval = null; } }
function startTimer(seconds, onTick, onDone){
  clearTimer();
  let t = seconds;
  if(onTick) onTick(t);
  timerInterval = setInterval(()=>{
    t--;
    if(onTick) onTick(t);
    if(t<=0){ clearTimer(); if(onDone) onDone(); }
  }, 1000);
}
function pad2(n){ return String(n).padStart(2,'0'); }
function formatMMSS(s){
  const m = Math.floor(s/60); const sec = s%60; return `${pad2(m)}:${pad2(sec)}`;
}

function startPrep(sec){
  const timerEl = $('timer'); if(!timerEl) return;
  startTimer(sec, t=> timerEl.innerText = `Prep ${formatMMSS(t)}`, ()=> addHistory(`Preparación ${sec}s finalizada`));
}
window.startPrep = safe(startPrep);

function startPerformance(){
  const perfInput = $('perfTime');
  const t = perfInput ? parseInt(perfInput.value||state.perfTime,10) : state.perfTime;
  const timerEl = $('timer'); if(timerEl) timerEl.innerText = formatMMSS(t);
  renderVotes(); // show voting UI
  startTimer(t, tt=> { if(timerEl) timerEl.innerText = formatMMSS(tt); }, ()=> addHistory('Performance terminado — iniciar votación'));
}
window.startPerformance = safe(startPerformance);
window.startPerf = window.startPerformance;

// voting
function renderVotes(){
  const area = $('voteArea'); if(!area) return;
  if(!state.players || state.players.length < 2){ area.innerText = 'Necesitas al menos 2 jugadores para votar'; return; }
  const current = state.players[state.currentIndex % state.players.length];
  let html = `<div style="font-size:13px;color:#aaa">Votar por ${escapeHtml(current.name)}:</div>`;
  state._currentVotes = {}; // reset current votes
  state.players.forEach(p=>{
    if(p.id === current.id) return;
    html += `<div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px">
      <div>${escapeHtml(p.name)}</div>
      <div>
        <button class="voteBtn" data-vote="${p.id}:1">✔</button>
        <button class="voteBtn" data-vote="${p.id}:0">✖</button>
      </div>
    </div>`;
  });
  area.innerHTML = html;
  area.querySelectorAll('[data-vote]').forEach(btn=>{
    btn.onclick = ()=>{
      const [pid, val] = btn.getAttribute('data-vote').split(':');
      state._currentVotes[pid] = parseInt(val,10);
      const voter = state.players.find(x=>x.id===pid);
      addHistory(`Voto registrado (${val==1?'Sí':'No'}) por ${voter? voter.name : pid}`);
    };
  });
}
window.renderVotes = renderVotes;

function endVote(){
  const votes = state._currentVotes || {};
  const vals = Object.values(votes);
  if(vals.length === 0) return alert('Aún no hay votos');
  const yes = vals.filter(v=>v==1).length;
  const no = vals.filter(v=>v==0).length;
  const total = state.players.length - 1;
  const unanimous = (yes === total);
  const majorityYes = yes > no;
  const current = state.players[state.currentIndex % state.players.length];
  if(majorityYes){
    current.score = (current.score||0) + 2;
    addHistory(`${current.name} aprobado por mayoría (+2). Votos: ${yes}/${total}`);
    if(unanimous){ current.score = (current.score||0) + 1; current.starCount = (current.starCount||0) + 1; addHistory(`¡Unánime! ${current.name} recibe +1 y Carta Estrella`); }
  } else {
    addHistory(`${current.name} no logró mayoría (0 puntos). Votos: ${yes}/${total}`);
  }
  current.playedRounds = (current.playedRounds||0) + 1;
  state.lastAction = { type:'voteResult', playerId: current.id, yes, no, majorityYes, unanimous };
  renderLeaderboard(); saveState();
}
window.endVote = safe(endVote);

// turn flow
function nextTurn(){
  if(!state.players || state.players.length === 0) return alert('Añade jugadores');
  state.currentIndex = (state.currentIndex + 1) % state.players.length;
  if(state.currentIndex === 0) state.currentRound++;
  const roundsDesired = parseInt(($('rounds') && $('rounds').value) || state.roundsPerPlayer, 10);
  if(state.currentRound > roundsDesired){
    addHistory('Juego finalizado. Revisa puntuaciones.');
    alert('Juego finalizado — revisa puntuaciones.');
    return;
  }
  // reset cards & song for next turn
  const sc = $('styleCard'); const cc = $('challengeCard'); const cs = $('currentSong');
  if(sc) sc.innerText = 'Estilo: —';
  if(cc) cc.innerText = 'Desafío: —';
  if(cs) cs.innerText = 'Canción: —';
  renderLeaderboard(); addHistory(`Turno: ${state.players[state.currentIndex].name}`);
}
window.nextTurn = safe(nextTurn);

// undo last
function undoLast(){
  const la = state.lastAction;
  if(!la) return alert('Nada que deshacer');
  if(la.type === 'voteResult'){
    const p = state.players.find(x=>x.id===la.playerId);
    if(!p) return;
    if(la.majorityYes) p.score = Math.max(0, p.score - 2);
    if(la.unanimous){ p.score = Math.max(0, p.score - 1); p.starCount = Math.max(0, (p.starCount||0)-1); }
    p.playedRounds = Math.max(0, (p.playedRounds||0)-1);
    addHistory('Deshacer: resultado de votación revertido');
    state.lastAction = null; renderLeaderboard(); saveState();
  } else alert('Última acción no reversible');
}
window.undoLast = safe(undoLast);

// give star / export
function giveStar(){
  if(!state.players || state.players.length === 0) return;
  const p = state.players[state.currentIndex % state.players.length];
  p.starCount = (p.starCount||0) + 1;
  addHistory(`Carta Estrella entregada a ${p.name}`);
  saveState(); renderLeaderboard();
}
window.giveStar = safe(giveStar);

function exportScores(){
  const data = JSON.stringify((state.players||[]).map(p=>({name:p.name,score:p.score,stars:p.starCount})), null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'karaoke_scores.json'; a.click(); URL.revokeObjectURL(url);
}
window.exportScores = safe(exportScores);

// printable cards
function generatePrintableCards(){
  let html = `<!doctype html><html><head><meta charset="utf-8"><title>Cartas Karaoke Clash</title>
    <style>@page{size:A4;margin:6mm}body{font-family:Arial;background:white;color:#111} .sheet{display:flex;flex-wrap:wrap;gap:6px}
    .card{width:63mm;height:88mm;border:2px solid #222;padding:6px;display:flex;flex-direction:column;justify-content:center;align-items:center}
    .style{background:linear-gradient(135deg,#7b1fa2,#4a148c);color:white} .challenge{background:linear-gradient(135deg,#e53935,#b71c1c);color:white}</style></head><body>
    <h2>Karaoke Clash — Cartas imprimibles</h2><div class="sheet">`;
  STYLES.forEach(s=> html += `<div class="card style"><div style="font-weight:800">${escapeHtml(s)}</div></div>`);
  CHALLENGES.forEach(c=> html += `<div class="card challenge"><div style="font-weight:800">${escapeHtml(c)}</div></div>`);
  html += '</div></body></html>';
  const w = window.open('','_blank'); if(w){ w.document.write(html); w.document.close(); } else alert('Pop-up bloqueado. Permite pop-ups para imprimir.');
}
window.printCards = safe(generatePrintableCards);

// add player via UI
function attachUI(){
  // safe attach (elements might not exist if file loaded twice)
  const el = id => document.getElementById(id);
  if(el('addPlayer')) el('addPlayer').addEventListener('click', addPlayer);
  if(el('startGame')) el('startGame').addEventListener('click', ()=> {
    if((state.players||[]).length < 2) return alert('Añade al menos 2 jugadores');
    state.currentIndex = 0; state.currentRound = 1;
    state.roundsPerPlayer = parseInt((el('rounds') && el('rounds').value) || state.roundsPerPlayer, 10);
    state.perfTime = parseInt((el('perfTime') && el('perfTime').value) || state.perfTime, 10);
    state.history = []; state.lastAction = null;
    addHistory('Juego iniciado'); renderLeaderboard(); saveState();
  });
  if(el('randomSong')) el('randomSong').addEventListener('click', selectRandomSong);
  if(el('searchBtn')) el('searchBtn').addEventListener('click', searchSong);
  if(el('drawBoth')) el('drawBoth').addEventListener('click', ()=>{ drawBoth(); });
  if(el('rerollStyle')) el('rerollStyle').addEventListener('click', ()=>{ drawStyle(); addHistory('Reroll estilo'); });
  if(el('rerollChallenge')) el('rerollChallenge').addEventListener('click', ()=>{ drawChallenge(); addHistory('Reroll desafío'); });
  if(el('prep5')) el('prep5').addEventListener('click', ()=> startPrep(5));
  if(el('prep10')) el('prep10').addEventListener('click', ()=> startPrep(10));
  if(el('startPerf')) el('startPerf').addEventListener('click', ()=> startPerformance());
  if(el('endVote')) el('endVote').addEventListener('click', ()=> endVote());
  if(el('nextTurn')) el('nextTurn').addEventListener('click', ()=> nextTurn());
  if(el('giveStar')) el('giveStar').addEventListener('click', ()=> giveStar());
  if(el('undoLast')) el('undoLast').addEventListener('click', ()=> undoLast());
  if(el('exportScores')) el('exportScores').addEventListener('click', ()=> exportScores());
  if(el('printCards')) el('printCards').addEventListener('click', ()=> generatePrintableCards());
  if(el('resetApp')) el('resetApp').addEventListener('click', ()=> { if(confirm('Resetear juego y borrar jugadores?')){ localStorage.removeItem(STORAGE_KEY); location.reload(); } });
}

// initialize UI state
function bootstrap(){
  initFilters();
  renderPlayers();
  renderLeaderboard();
  renderHistory();
  attachUI();
  saveState();
}
bootstrap();
