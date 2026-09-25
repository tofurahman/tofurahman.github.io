// Progressive enhancement for research.qmd; all entries remain readable without JS.
document.documentElement.classList.add('js');
const queryInput = document.querySelector('#paper-search');
const topicButtons = [...document.querySelectorAll('[data-topic-filter]')];
const paperEntries = [...document.querySelectorAll('.research-section .paper[data-topics]')];
const paperSections = [...document.querySelectorAll('.research-section')];
const emptyState = document.querySelector('#empty-state');
let topic = 'all';

function filterPapers() {
  if (!queryInput) return;
  const query = queryInput.value.trim().toLocaleLowerCase();
  let visibleCount = 0;
  for (const paper of paperEntries) {
    const topics = paper.dataset.topics.split(/\s+/);
    const visible = (topic === 'all' || topics.includes(topic)) &&
      (!query || paper.textContent.toLocaleLowerCase().includes(query));
    paper.hidden = !visible;
    if (visible) visibleCount++;
  }
  for (const section of paperSections) {
    section.hidden = ![...section.querySelectorAll('.paper')].some(paper => !paper.hidden);
  }
  if (emptyState) emptyState.hidden = visibleCount > 0;
}

for (const button of topicButtons) {
  button.addEventListener('click', () => {
    topic = button.dataset.topicFilter;
    for (const candidate of topicButtons) {
      candidate.setAttribute('aria-pressed', String(candidate === button));
    }
    filterPapers();
  });
}
queryInput?.addEventListener('input', filterPapers);
