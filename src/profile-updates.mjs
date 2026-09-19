// Public LinkedIn project entries, resolved outbound links and live-site review.
const linkedin = 'https://www.linkedin.com/in/pamindu-karunadasa';
export const additionalProjects = [
  {
    id: 'sancharakaya', name: 'Sancharakaya', category: 'Applied AI', filters: ['ai', 'web'],
    label: 'Travel technology · Sri Lanka', color: 'green',
    summary: 'A Sri Lanka travel companion connecting personalized itineraries, local context, and AI assistance.',
    image: 'sancharakaya.webp', alt: 'Sancharakaya live application’s traveler account welcome and sign-in screen',
    demo: 'https://sancharakaya-kx2n.vercel.app/', demoLabel: 'Visit application',
    stack: ['JavaScript', 'Gemini', 'Supabase', 'HTML / CSS'],
    status: 'Live application · Account required', context: 'Smart tourism · August 2026 onward',
    role: 'Developed the tourism platform, combining trip planning, travel assistance, and user-facing tools, as documented in my public project entry.',
    problem: 'Planning a trip involves more than choosing destinations. Visitors also need local price context, safety information, and routes that fit their interests and travel pace.',
    solution: 'Sancharakaya brings itinerary planning, a Gemini travel assistant, price guidance, and sustainable travel recommendations into one interface. The application also presents an account workspace for saved trips and preferences.',
    architecture: ['Traveler preferences', 'Itinerary + local context', 'Gemini assistance', 'Saved travel workspace'],
    features: ['Itinerary planning around dates, budget, interests, and pace.', 'A virtual assistant for travel questions and changing plans.', 'Fair-price guidance, safety awareness, and responsible travel options.', 'Traveler accounts, saved trips, and preferences.'],
    challenge: 'The product brings several kinds of travel information into a coherent planning flow. Personalized suggestions need to remain understandable alongside practical details such as budget, transport, and local context.',
    limits: 'The public app and its account interface were reviewed. Signed-in workflows and AI responses were not independently tested. The repository linked from LinkedIn is currently unavailable publicly, so it is not offered as a source-code destination.',
    gallery: [], sources: [['Live application', 'https://sancharakaya-kx2n.vercel.app/'], ['Project description and technology', linkedin]],
  },
  {
    id: 'smart-face-door-lock', name: 'Smart Face Door Lock', category: 'Software & systems', filters: ['ai', 'software'],
    label: 'Computer vision · Edge authentication', color: 'blue',
    summary: 'A webcam-based authentication prototype combining face embeddings, blink checks, and a local control interface.',
    image: 'face-system.svg', imageLabel: 'CONCEPTUAL SYSTEM DIAGRAM',
    alt: 'Concept diagram connecting webcam capture, face matching, blink verification, and an access decision',
    repo: 'https://drive.google.com/file/d/18USPDAMRKrjWo054kX_OpdLGv92gKa6H/view', sourceLabel: 'View shared source',
    demo: 'https://drive.google.com/file/d/1AaoS7mup72aQQtSsl2NTPbSdoXgHu3Qh/view', demoLabel: 'Project walkthrough',
    stack: ['Python', 'ArcFace', 'MediaPipe', 'PyTorch', 'ONNX', 'Flask'],
    status: 'Documented prototype', context: 'Facial authentication · February–April 2026',
    role: 'Built the facial-authentication system and its local web interface, as documented in my LinkedIn project entry.',
    problem: 'Recognizing an enrolled face and deciding whether a live person is present are different tasks. An access-control prototype needs to consider both.',
    solution: 'The documented pipeline uses MediaPipe facial landmarks, ArcFace embeddings for identity comparison, and blink-based multi-frame verification. A Flask interface brings enrollment, camera authentication, and mobile monitoring together.',
    architecture: ['Webcam + face landmarks', 'ArcFace identity match', 'Blink / multi-frame check', 'Local access decision'],
    features: ['Webcam-based face alignment and embedding comparison.', 'Blink-based liveness checks across multiple frames.', 'Enrollment and management of multiple users.', 'A local authentication dashboard and mobile monitoring interface.'],
    challenge: 'Identity matching must be combined with a liveness signal before an access decision. The project explores this separation using standard camera input and local inference.',
    limits: 'A prototype documented by the author, not a certified security product. No security guarantee, anti-spoofing benchmark, timing claim, or independently measured recognition accuracy is asserted. The diagram illustrates the reported pipeline; it is not an application screenshot.',
    gallery: [], sources: [['Project entry and implementation description', linkedin], ['Shared project walkthrough', 'https://drive.google.com/file/d/1AaoS7mup72aQQtSsl2NTPbSdoXgHu3Qh/view']],
  },
];

export const certifications = [
  {name:'Arduino Automation & Robotics', issuer:'Alison', date:'Mar 2025', datetime:'2025-03'},
  {name:'Computer Hardware', issuer:'Cisco Networking Academy', date:'Jan 2025', datetime:'2025-01'},
  {name:'Introduction to IoT and Digital Transformation', issuer:'Cisco Networking Academy', date:'Jan 2025', datetime:'2025-01'},
  {name:'Introduction to Packet Tracer', issuer:'Cisco Networking Academy', date:'Aug 2024', datetime:'2024-08'},
  {name:'Python for Beginners', issuer:'University of Moratuwa · Credential zvrZ1bu7Nb', date:'Apr 2023', datetime:'2023-04'},
  {name:'Web Design for Beginners', issuer:'University of Moratuwa · Credential 0NJhYjmvEi'},
];

export function credentialSection(external, escape) {
  return `<section id="certifications" class="section wrap credential-section" aria-labelledby="credentials-heading"><div class="credential-layout"><div class="credential-intro"><p class="eyebrow">LEARNING / SELECTED CERTIFICATIONS</p><h2 id="credentials-heading">Building a stronger<br>foundation.</h2><p>Learning across programming, connected devices, and the hardware behind the software.</p>${external(linkedin,'View credentials on LinkedIn')}</div><ul class="credential-list">${certifications.map(c=>`<li><span class="credential-icon" aria-hidden="true">↗</span><div><h3>${escape(c.name)}</h3><p>${escape(c.issuer)}</p></div>${c.date?`<time datetime="${c.datetime}">${c.date}</time>`:''}</li>`).join('')}</ul></div></section>`;
}
