const excludedRepos = new Set(['gytajengbre.github.io', 'recolecciondefondos']);

function ogImage(user, repo){
  // GitHub OpenGraph preview image
  return `https://opengraph.githubassets.com/1/${user}/${repo}`;
}

function el(tag, cls){
  const e = document.createElement(tag);
  if(cls) e.className = cls;
  return e;
}

async function loadRepos(){
  const container = document.getElementById('githubProjects');
  container.innerHTML = '';

  try{
    const res = await fetch('https://api.github.com/users/gytajengbre/repos?sort=updated&per_page=12');
    const data = await res.json();

    const repos = data
      .filter(r => !excludedRepos.has(r.name))
      .slice(0, 8);

    repos.forEach(repo => {
      const card = el('article','item');
      const img = el('img','item__img');
      img.src = ogImage('gytajengbre', repo.name);
      img.alt = `Vista previa ${repo.name}`;
      img.loading = 'lazy';

      const body = el('div','item__body');
      const h = el('h3','item__title'); h.textContent = repo.name;

      const meta = el('div','item__meta');
      const lang = repo.language ? repo.language : '—';
      const stars = repo.stargazers_count ?? 0;
      const upd = repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : '';
      meta.textContent = `${lang} • ★ ${stars} • Updated: ${upd}`;

      const p = el('p','item__desc');
      const desc = repo.description || (currentLang === 'es'
        ? 'Proyecto de práctica para demostrar estructura, lógica y UI.'
        : 'Practice project to showcase structure, logic and UI.');
      p.textContent = desc;

      const actions = el('div','item__actions');
      const a = el('a','btn'); a.href = repo.html_url; a.target='_blank'; a.rel='noreferrer';
      a.textContent = currentLang === 'es' ? 'Ver repositorio' : 'View repo';

      const b = el('button','btn btn--ghost'); b.type='button';
      b.textContent = currentLang === 'es' ? 'Vista previa' : 'Preview';
      b.addEventListener('click', () => openModal(ogImage('gytajengbre', repo.name), repo.name, desc, repo.html_url));

      actions.appendChild(a);
      actions.appendChild(b);

      body.appendChild(h);
      body.appendChild(meta);
      body.appendChild(p);
      body.appendChild(actions);

      card.appendChild(img);
      card.appendChild(body);
      container.appendChild(card);
    });

  }catch(err){
    container.innerHTML = `<div class="card">No se pudieron cargar los repositorios. Intenta más tarde.</div>`;
  }
}

const certs = [
  {
    title_es: "Curso de IA 2026 (BIG school)",
    title_en: "AI Course 2026 (BIG school)",
    desc_es: "Certificado de asistencia: jornadas de Inteligencia Artificial (Vibe Coding y Automatizaciones). 6 horas • 16/01/2026.",
    desc_en: "Attendance certificate: AI sessions (Vibe Coding and Automations). 6 hours • 2026-01-16.",
    img: "assets/certificates/ia_2026_bigschool.png",
    link: "assets/certificates/ia_2026_bigschool.png"
  },
  {
    title_es: "Prompt Engineering (LinkedIn Learning)",
    title_en: "Prompt Engineering (LinkedIn Learning)",
    desc_es: "Curso completado • Ingeniería de Prompts e IA generativa.",
    desc_en: "Course completed • Prompt Engineering and Generative AI.",
    img: "assets/certificates/linkedin_prompt_engineering.png",
    link: "assets/certificates/linkedin_prompt_engineering.png"
  },
  {
    title_es: "Power BI + IA (Daxus Latam)",
    title_en: "Power BI + AI (Daxus Latam)",
    desc_es: "Certificado de participación • 8 horas • 20/11/2025.",
    desc_en: "Participation certificate • 8 hours • 2025-11-20.",
    img: "assets/certificates/daxus_powerbi_ia.png",
    link: "assets/certificates/daxus_powerbi_ia.png"
  },
  {
    title_es: "IA en la Práctica (Daxus Latam)",
    title_en: "AI in Practice (Daxus Latam)",
    desc_es: "Certificado de participación • 8 horas • 02/10/2025.",
    desc_en: "Participation certificate • 8 hours • 2025-10-02.",
    img: "assets/certificates/daxus_ia_practica.png",
    link: "assets/certificates/daxus_ia_practica.png"
  },
  {
    title_es: "Inglés B1 (Cevamar)",
    title_en: "English B1 (Cevamar)",
    desc_es: "Reconocimiento académico en inglés: excelente desempeño y nota 19/20.",
    desc_en: "Academic recognition in English: excellent performance and grade 19/20.",
    img: "assets/certificates/english_b1_cevamar.jpg",
    link: "assets/certificates/english_b1_cevamar.jpg"
  }
];

function loadCerts(){
  const grid = document.getElementById('certGrid');
  grid.innerHTML = '';
  certs.forEach(c => {
    const card = el('article','item');
    const img = el('img','item__img');
    img.src = c.img; img.alt = 'Certificado'; img.loading='lazy';

    const body = el('div','item__body');
    const h = el('h3','item__title'); h.textContent = currentLang==='es' ? c.title_es : c.title_en;
    const p = el('p','item__desc'); p.textContent = currentLang==='es' ? c.desc_es : c.desc_en;

    const actions = el('div','item__actions');
    const b = el('button','btn btn--ghost'); b.type='button';
    b.textContent = currentLang==='es' ? 'Vista previa' : 'Preview';
    b.addEventListener('click', () => openModal(c.link, (currentLang==='es'?c.title_es:c.title_en), (currentLang==='es'?c.desc_es:c.desc_en), c.link));

    actions.appendChild(b);

    body.appendChild(h);
    body.appendChild(p);
    body.appendChild(actions);

    card.appendChild(img);
    card.appendChild(body);

    grid.appendChild(card);
  });
}

/* Modal */
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalLink = document.getElementById('modalLink');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');

function openModal(img, title, desc, link){
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden','false');
  modalImg.src = img;
  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  modalLink.href = link;
  modalLink.textContent = currentLang === 'es' ? 'Abrir' : 'Open';
}

function closeModal(){
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden','true');
  modalImg.src = '';
}
modalBackdrop.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });

/* Language */
let currentLang = 'es';

const t = {
  es: {
    title: "Desarrollador Web Junior | Data & IA",
    subtitle: "HTML • CSS • JavaScript • C/C++ • Estructuras de Datos • Power BI",
    lead: "Soy estudiante de Informática y construyo proyectos pequeños pero muy útiles para demostrar habilidades reales: interfaces limpias, lógica clara y buen orden del código. Te invito a ver mis repositorios (con vista previa), porque ahí está mi trabajo.",
    ctaProjects: "Ver Proyectos",
    ctaCerts: "Ver Certificados",
    chip1:"Inglés B1 (certificado)",
    chip2:"Office + Power BI",
    chip3:"C / C++ + Algoritmos",
    aboutTitle:"Perfil",
    aboutText:"Estudiante de Informática con base en C y C++, Estructuras de Datos y Algoritmos. Desarrollo proyectos web (HTML, CSS, JavaScript) y también trabajo con análisis de datos (Excel/Power BI). Busco oportunidades remotas o junior donde pueda aportar, aprender rápido y entregar resultados.",
    projectsTitle:"Proyectos (GitHub)",
    projectsSubtitle:"Vista previa + descripción. Cada proyecto incluye el enlace directo al repositorio.",
    certsTitle:"Certificaciones",
    certsSubtitle:"Haz clic para ver en grande.",
    contactTitle:"Contacto"
  },
  en: {
    title: "Junior Web Developer | Data & AI",
    subtitle: "HTML • CSS • JavaScript • C/C++ • Data Structures • Power BI",
    lead: "I’m a Computer Science student and I build small but useful projects to prove real skills: clean interfaces, clear logic, and well-organized code. Please check my repositories (with previews) — that’s where my work is.",
    ctaProjects: "View Projects",
    ctaCerts: "View Certificates",
    chip1:"English B1 (certified)",
    chip2:"Office + Power BI",
    chip3:"C / C++ + Algorithms",
    aboutTitle:"Profile",
    aboutText:"Computer Science student with foundations in C/C++, Data Structures and Algorithms. I build web projects (HTML, CSS, JavaScript) and work with data analysis (Excel/Power BI). Looking for remote or junior roles to contribute, learn fast, and deliver results.",
    projectsTitle:"Projects (GitHub)",
    projectsSubtitle:"Preview + description. Each project links directly to its repository.",
    certsTitle:"Certificates",
    certsSubtitle:"Click to view full size.",
    contactTitle:"Contact"
  }
};

function applyLang(lang){
  currentLang = lang;

  document.getElementById('t_title').innerText = t[lang].title;
  document.getElementById('t_subtitle').innerText = t[lang].subtitle;
  document.getElementById('t_lead').innerText = t[lang].lead;
  document.getElementById('t_cta_projects').innerText = t[lang].ctaProjects;
  document.getElementById('t_cta_certs').innerText = t[lang].ctaCerts;

  document.getElementById('t_chip_1').innerText = t[lang].chip1;
  document.getElementById('t_chip_2').innerText = t[lang].chip2;
  document.getElementById('t_chip_3').innerText = t[lang].chip3;

  document.getElementById('t_about_title').innerText = t[lang].aboutTitle;
  document.getElementById('t_about_text').innerText = t[lang].aboutText;

  document.getElementById('t_projects_title').innerText = t[lang].projectsTitle;
  document.getElementById('t_projects_subtitle').innerText = t[lang].projectsSubtitle;

  document.getElementById('t_certs_title').innerText = t[lang].certsTitle;
  document.getElementById('t_certs_subtitle').innerText = t[lang].certsSubtitle;

  document.getElementById('t_contact_title').innerText = t[lang].contactTitle;

  // Reload dynamic content labels
  loadCerts();
  loadRepos();
}

document.getElementById('btnES').addEventListener('click', ()=>applyLang('es'));
document.getElementById('btnEN').addEventListener('click', ()=>applyLang('en'));

loadCerts();
loadRepos();
