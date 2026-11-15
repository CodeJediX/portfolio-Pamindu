import { profile, projects } from './projects.mjs';
import { page, header, footer, escape as e, external } from './components.mjs';

export const workPath = 'work/';

const github = (repo, label = 'GitHub source') => [label, profile.github + '/' + repo];
const linkedin = ['LinkedIn profile', 'https://lk.linkedin.com/in/pamindu-karunadasa'];
const demo = url => ['Open demo', url];

export const collections = [
  {
    id: 'systems', label: 'Research & prototypes', items: [
      ['catatriage', 'CataTriage AI', 'Research prototype', 'Cataract research models with auditable review stages and a doctor-reviewed scheduling workflow.', github('CataTriage-AI'), ['Project website', 'https://catatriage-ai.vercel.app/']],
      ['aegis', 'Quantum-X AEGIS', 'Team research project', 'An analysis dashboard for comparing portfolio risk models, replaying market crises, and exporting results.', github('aegis-quantedge'), demo('https://quantumx-aegis.streamlit.app/')],
      ['deadline-atlas', 'Deadline Atlas', 'Competition tracker', 'A calendar and planning tool for tracking competition deadlines and importing event details from documents.', github('pouch-studio/tree/main/deadline-atlas'), ['Project website', 'https://codejedix.github.io/pouch-studio/deadline-atlas/']],
      ['pouch-studio', 'Pouch Studio', '3D design preview', 'A rotatable 3D model of a laptop pouch with alternate camera views and a reproducible model build.', github('pouch-studio'), demo('https://codejedix.github.io/pouch-studio/')],
      ['cre8x-desk', 'CRE8X Registration Desk', 'Event operations demo', 'A check-in and attendance demo with a finalist directory and reporting tools.', github('cre8x-registration-desk'), demo('https://codejedix.github.io/cre8x-registration-desk/')],
      ['sign-dataset', 'Sign Language Dataset', 'Published dataset', 'A collection of 17,668 sign language clips compiled from SignASL and its contributors.', ['Dataset and attribution', '../datasets/sign-language-recognition/']],
      ['codequest', 'CodeQuest Academy', 'Agent workshop demo', 'A Google ADK demo that teaches beginner programming concepts through interactive missions.', github('AgriAgent/tree/main/bwai-adk-basic-demo-main')],
      ['tinyml-nexus', 'TinyML Nexus', 'Interactive learning site', 'An introduction to running machine learning on small devices, with a model optimization simulator and quizzes.', github('TinyML')],
      ['waste-wiz', 'Waste-Wiz', 'Hardware team prototype', 'A prototype exploring automated waste sorting, documented with photos from the original portfolio.', ['Prototype photo', '../assets/images/wastewiz-detail.webp']],
      ['fallguard', 'FallGuard', 'Wearable research prototype', 'An ESP32-S3 wearable project exploring motion sensing, on-device fall detection, and caregiver alerts.', ['Research overview', '../#research']],
    ],
  },
  {
    id: 'software', label: 'Software builds', items: [
      ['grocery', 'Grocery Management', 'Retail interface prototype', 'A browser prototype for tracking products and stock and creating orders at a point of sale.', github('Grocery-Management-Web-System'), linkedin],
      ['car-rental', 'Car Rental System', 'Java application', 'A desktop project for organizing vehicles and rentals.', github('Car_Rent_System')],
      ['number-game', 'Number Guessing Game', 'Java Swing game', 'A desktop guessing game with multiple modes, a leaderboard, and sound and visual feedback.', github('Number-Choosing-Game'), linkedin],
      ['knighttask', 'KnightTask', 'Web task manager', 'A browser task manager with multiple lists and a record of completed tasks.', github('Infinity-ToDoWebApp')],
      ['android-tasks', 'To-Do List for Android', 'Kotlin application', 'An Android task-list project with its application code and resources in the public repository.', github('To-Do-List')],
      ['geovision', 'GeoVision LK Support', 'Support page', 'A public support page for GeoVision LK.', github('sasnaka-bot')],
      ['cre8x-round-one', 'CRE8X Round 01', 'Competition brief', 'The challenge website for Save the Sea, with the brief, deliverables, rules, and judging criteria.', github('Cre8X-Round-01')],
    ],
  },
  {
    id: 'websites', label: 'Websites & storefronts', items: [
      ['oulu-website', 'OULU Academy Website', 'Education website', 'The public website for OULU Academy, the education venture I co-founded.', github('OULU'), ['Visit OULU Academy', 'https://ouluacademy.lk/']],
      ['ieee-cs-web', 'IEEE Computer Society KDU', 'Student chapter website', 'A chapter website for IEEE Computer Society at KDU, where I serve as webmaster.', github('CS-web'), demo('https://cs-web-wheat.vercel.app/')],
      ['bcs-web', 'BCS Student Chapter KDU', 'Student chapter website', 'Website prototypes for the KDU BCS Student Chapter, grouped as one project.', github('BCS_KDU'), github('BCS-KDU', 'Alternate version')],
      ['araliya', 'Araliya Sōra', 'Multi-site design', 'A family of public web pages covering the brand, design and build, academy, and creative studio.', github('Araliya-S-ra-Main', 'Main site source'), github('Araliya-S-ra-Design---Build', 'Design & Build'), github('Araliya-S-ra-Academy', 'Academy'), github('Araliya-S-ra-Creative-Studio', 'Creative Studio')],
      ['golden-key', 'Golden Key Properties', 'Property website', 'A property website presenting short and long stay rental options.', github('Golden-Key-Properties'), demo('https://golden-key-properties.vercel.app/')],
      ['upzide', 'UPZIDE', 'Website design', 'A standalone web design project published as UPZIDE.', github('UPZIDE'), demo('https://upzide.vercel.app/')],
      ['nuula', 'Nuula.lk', 'Clothing storefront', 'A web storefront prototype for browsing clothing collections.', github('Nuula.lk'), demo('https://nuula-lk.vercel.app/')],
      ['leepola', 'LeePola', 'Online store', 'A storefront prototype published as LeePola Online Store.', github('leepola'), demo('https://leepola.vercel.app/')],
      ['soft-cakes', 'Soft Cakes', 'Bakery storefront', 'A bakery website prototype with shopping, wishlist and custom-cake pages.', github('Soft-Cake'), github('soft-cakes', 'Alternate version'), demo('https://soft-cake-eight.vercel.app/')],
      ['gramman', 'Gramman Wheels', 'Automotive website', 'An automotive concept site with vehicle collections and product presentation pages.', github('Gramman')],
    ],
  },
  {
    id: 'leadership', label: 'Community & leadership', items: [
      ['athwela', 'Athwela', 'BCS outreach · Chairperson', 'Led the BCS chapter behind an outreach project that brought learning resources and leadership activities to a school in Hambantota.', linkedin],
      ['artha', 'Artha 2.0', 'IEEE CS outreach · Co-chair', 'Co-chaired an outreach visit that brought computers, books and learning activities to a school in Sewanagala.', linkedin],
      ['memento', 'Memento', 'IEEE Student Branch · Project chair', 'Coordinated workshop planning, partner engagement, delivery, and post-event evaluation.', linkedin],
      ['legacy-link', 'Legacy Link', 'BCS · Project chair', 'Chaired the Legacy Link session series for the KDU BCS Student Chapter.', linkedin],
      ['membership-drive', 'IEEE Membership Development', 'IEEE · Program lead', 'Led the program supporting new IEEE memberships and renewals at KDU.', linkedin],
      ['career-fair', 'KDU Career Fair 2026', 'BCS · Project lead', 'Helped lead the university career fair through the KDU BCS Student Chapter.', linkedin],
      ['oulu-launch', 'OULU Academy Launch', 'Co-founder and CEO', 'Co-founded OULU Academy and helped bring the education venture from planning to its public launch.', linkedin, ['Academy profile', 'https://ouluacademy.lk/pamindu-karunadasa/']],
      ['step-to-industry', 'Step to Industry', 'IEEE · Session in-charge', 'Supported workshop delivery as a session in-charge for the university-to-industry program.', linkedin],
    ],
  },
  {
    id: 'events', label: 'Event design & publishing', items: [
      ['cre8x-leadership', 'CRE8X 3.0 Designathon', 'BCS · Chairperson', 'Led the BCS chapter team organizing the national inter-university UI/UX designathon.', linkedin, ['Event photos', '../photos/']],
      ['cre8x-two', 'CRE8X 2.0', 'BCS · Program lead', 'Designed competition tasks and rules, coordinated program flow, and contributed ceremony artwork.', linkedin],
      ['respawn', 'RESPAWN 2.0', 'BCS and IEEE CS · Event team', 'Worked as BCS chapter chair with the organizing team on KDU’s gaming event.', linkedin],
      ['genesiz', 'GENESIZ ’25', 'ERIC · Main designer', 'Led event identity and designed promotional assets, event materials, and magazine artwork.', linkedin],
      ['inspire', 'INSPIRE Magazine', 'ERIC · Design and writing', 'Contributed article content and led design work for the student magazine.', linkedin],
      ['spark', 'ERIC Spark Workshops', 'ERIC · Design lead', 'Designed the workshop branding, promotional graphics, and digital materials with the organizing team.', linkedin],
    ],
  },
].map(collection => ({
  ...collection,
  items: collection.items.map(([id, name, type, description, ...sources]) => ({id, name, type, description, sources})),
}));

const previews = {
  'waste-wiz': 'wastewiz.webp',
  'ieee-cs-web': 'ieee-cs-kdu-preview.webp',
  'cre8x-leadership': 'pamindu-karunadasa-cre8x-3-lamp-lighting-2026.webp',
};

export function flightCollectionData() {
  return JSON.stringify(Object.fromEntries(collections.map(({id,items}) => [
    id, items.map(({id,name,type})=>({id,name,type,image:previews[id]})),
  ])));
}

function sourceLink([label,url]) {
  return url.startsWith('https://') ? external(url,label) : `<a class="text-link" href="${e(url)}">${e(label)} ↗</a>`;
}

export function workPage() {
  const caseStudies = projects.map(p=>`<li><a class="text-link" href="../projects/${p.id}/">${e(p.name)} ↗</a></li>`).join('');
  const body = `${header('../',false)}<main id="main" class="wrap work-catalog">
    <header class="work-catalog-heading"><a class="text-link" href="../#project-flight">← Project Flight</a><h1>Work index<span class="accent">.</span></h1>
      <p>Engineering projects, public repositories, and community work.</p>
      <nav aria-label="Work collections"><a href="#case-studies">Case studies</a>${collections.map(c=>`<a href="#${c.id}">${e(c.label)}</a>`).join('')}</nav>
    </header>
    <section id="case-studies" aria-labelledby="case-studies-heading"><h2 id="case-studies-heading">Case studies</h2><ul class="catalog-cases">${caseStudies}</ul></section>
    ${collections.map(c=>`<section id="${c.id}" aria-labelledby="${c.id}-heading"><h2 id="${c.id}-heading">${e(c.label)}</h2><div class="catalog-grid">
      ${c.items.map(p=>`<article id="${p.id}"><p class="eyebrow">${e(p.type)}</p><h3>${e(p.name)}</h3><p>${e(p.description)}</p><div class="catalog-sources">${p.sources.map(sourceLink).join('')}</div></article>`).join('')}
    </div></section>`).join('')}
  </main>${footer('../')}`;
  return page({title:'Work index — Pamindu Karunadasa',description:'Public technical projects and documented community work by Pamindu Karunadasa.',body,base:'../',path:workPath});
}
