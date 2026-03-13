// ---- TEMA CLARO/ESCURO ----
function toggleTheme() {
  const html = document.documentElement;
  const icon = document.getElementById('theme-icon');
  if (html.dataset.theme === 'dark') {
    html.dataset.theme = 'light';
    icon.textContent = 'dark_mode';
  } else {
    html.dataset.theme = 'dark';
    icon.textContent = 'light_mode';
  }
}

// ---- TOAST ----
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ---- AÇÕES DOS POSTS ----
function toggleLike(el) {
  const icon = el.querySelector('.material-icons');
  const post = el.closest('.post');
  const likesEl = post.querySelector('.post-likes');
  let count = parseInt(likesEl.dataset.count);

  if (icon.textContent === 'favorite_border') {
    icon.textContent = 'favorite';
    icon.style.color = 'red';
    count++;
  } else {
    icon.textContent = 'favorite_border';
    icon.style.color = '';
    count--;
  }

  likesEl.dataset.count = count;
  likesEl.textContent = count.toLocaleString('pt-BR') + ' curtidas';
}

function toggleSave(el) {
  const icon = el.querySelector('.material-icons');
  if (icon.textContent === 'bookmark_border') {
    icon.textContent = 'bookmark';
    icon.style.color = 'var(--icon-color)';
    showToast('Salvo na sua coleção');
  } else {
    icon.textContent = 'bookmark_border';
    icon.style.color = '';
    showToast('Removido dos salvos');
  }
}

function toggleComments(el) {
  const post = el.closest('.post');
  openCommentModal(post);
}

// ---- MODAL DE COMENTÁRIOS ----
let cmCurrentPost = null;

function openCommentModal(post) {
  cmCurrentPost = post;

  // Mídia: carrossel, video ou imagem
  const mediaContent = document.getElementById('cm-media-content');
  const carousel = post.querySelector('.carousel');
  const video = post.querySelector('video');
  const img = post.querySelector('.post-image');

  if (carousel) {
    mediaContent.innerHTML = carousel.outerHTML;
    // Reinicia carrossel no modal (id diferente para não colidir)
    const newCarousel = mediaContent.querySelector('.carousel');
    newCarousel.id = 'cm-carousel';
    newCarousel.querySelectorAll('.carousel-btn.prev').forEach(b => b.setAttribute('onclick', "moveCarousel('cm-carousel',-1)"));
    newCarousel.querySelectorAll('.carousel-btn.next').forEach(b => b.setAttribute('onclick', "moveCarousel('cm-carousel',1)"));
    newCarousel.querySelector('.prev').style.display = 'none';
  } else if (video) {
    mediaContent.innerHTML = `<video autoplay loop muted playsinline style="width:100%;height:100%;object-fit:cover;" src="${video.src}"></video>`;
  } else if (img) {
    mediaContent.innerHTML = `<img src="${img.src}" style="width:100%;height:100%;object-fit:cover;display:block;"/>`;
  }

  // Header
  const avatar = post.querySelector('.post-header img').src;
  const username = post.querySelector('.username').textContent;
  const locationEl = post.querySelector('.location');
  document.getElementById('cm-avatar').src = avatar;
  document.getElementById('cm-username').textContent = username;
  document.getElementById('cm-location').textContent = locationEl ? locationEl.textContent : '';

  // Likes
  const likesEl = post.querySelector('.post-likes');
  document.getElementById('cm-likes').textContent = likesEl.textContent;
  document.getElementById('cm-likes').dataset.count = likesEl.dataset.count;

  // Sincroniza estado do like
  const likeIcon = post.querySelector('.post-actions a .material-icons');
  const cmLikeIcon = document.getElementById('cm-like-btn').querySelector('.material-icons');
  cmLikeIcon.textContent = likeIcon.textContent;
  cmLikeIcon.style.color = likeIcon.style.color;

  // Sincroniza estado do salvo
  const saveIcon = post.querySelector('.post-actions .save .material-icons');
  const cmSaveIcon = document.getElementById('cm-save-btn').querySelector('.material-icons');
  cmSaveIcon.textContent = saveIcon.textContent;
  cmSaveIcon.style.color = saveIcon.style.color;

  // Comentários
  const commentsList = document.getElementById('cm-comments-list');
  commentsList.innerHTML = '';

  // Caption como primeiro "comentário"
  const caption = post.querySelector('.post-caption');
  if (caption) {
    const div = document.createElement('div');
    div.className = 'comment';
    div.innerHTML = `<img src="${avatar}"/><div>${caption.innerHTML}<a href="#" class="comment-like" onclick="toggleCommentLike(this);return false;"><span class="material-icons">favorite_border</span></a></div>`;
    commentsList.appendChild(div);
  }

  // Comentários existentes
  const existing = post.querySelectorAll('.comments-list .comment');
  existing.forEach(c => {
    commentsList.appendChild(c.cloneNode(true));
  });

  // Reanexa eventos nos likes de comentários clonados
  commentsList.querySelectorAll('.comment-like').forEach(btn => {
    btn.onclick = function() { toggleCommentLike(this); return false; };
  });

  document.getElementById('comment-modal').classList.add('active');
  document.getElementById('cm-input').focus();
}

function closeCommentModal() {
  document.getElementById('comment-modal').classList.remove('active');
  cmCurrentPost = null;
}

function cmToggleLike() {
  if (!cmCurrentPost) return;
  const cmIcon = document.getElementById('cm-like-btn').querySelector('.material-icons');
  const postLikeBtn = cmCurrentPost.querySelector('.post-actions a');
  toggleLike(postLikeBtn);
  // Espelha no modal
  const postIcon = postLikeBtn.querySelector('.material-icons');
  cmIcon.textContent = postIcon.textContent;
  cmIcon.style.color = postIcon.style.color;
  // Atualiza contagem no modal
  const likesEl = cmCurrentPost.querySelector('.post-likes');
  document.getElementById('cm-likes').textContent = likesEl.textContent;
}

function cmToggleSave() {
  if (!cmCurrentPost) return;
  const cmIcon = document.getElementById('cm-save-btn').querySelector('.material-icons');
  const postSaveBtn = cmCurrentPost.querySelector('.post-actions .save');
  toggleSave(postSaveBtn);
  const postIcon = postSaveBtn.querySelector('.material-icons');
  cmIcon.textContent = postIcon.textContent;
  cmIcon.style.color = postIcon.style.color;
}

function cmSubmitComment(event) {
  if (event.key !== 'Enter') return;
  const input = document.getElementById('cm-input');
  const text = input.value.trim();
  if (!text) return;

  const list = document.getElementById('cm-comments-list');
  const div = document.createElement('div');
  div.className = 'comment';
  div.innerHTML = `<img src="https://i.pinimg.com/736x/d3/ce/e3/d3cee34439bb3e3035ec5251ad185a48.jpg"/><div><strong>joao.vitor</strong> ${text}<a href="#" class="comment-like" onclick="toggleCommentLike(this);return false;"><span class="material-icons">favorite_border</span></a></div>`;
  list.appendChild(div);
  list.scrollTop = list.scrollHeight;

  // Também salva no post original
  if (cmCurrentPost) {
    const origList = cmCurrentPost.querySelector('.comments-list');
    const origDiv = div.cloneNode(true);
    origList.appendChild(origDiv);
  }

  input.value = '';
}

function toggleCommentLike(el) {
  const icon = el.querySelector('.material-icons');
  if (icon.textContent === 'favorite_border') {
    icon.textContent = 'favorite';
    icon.style.color = 'red';
  } else {
    icon.textContent = 'favorite_border';
    icon.style.color = '';
  }
}

function submitComment(event, input) {
  if (event.key !== 'Enter') return;
  const text = input.value.trim();
  if (!text) return;

  const post = input.closest('.post');
  const section = post.querySelector('.comments-section');
  const list = section.querySelector('.comments-list');

  section.style.display = 'block';

  const div = document.createElement('div');
  div.className = 'comment';
  div.innerHTML = `<img src="https://i.pinimg.com/736x/d3/ce/e3/d3cee34439bb3e3035ec5251ad185a48.jpg"/><div><strong>joao.vitor</strong> ${text}<a href="#" class="comment-like" onclick="toggleCommentLike(this);return false;"><span class="material-icons">favorite_border</span></a></div>`;
  list.appendChild(div);

  input.value = '';
}

// ---- SEGUIR / SEGUINDO ----
function toggleFollow(btn) {
  if (btn.classList.contains('seguindo')) {
    btn.classList.remove('seguindo');
    btn.textContent = 'Seguir';
  } else {
    btn.classList.add('seguindo');
    btn.textContent = 'Seguindo';
  }
}

// ---- STORIES SCROLL ----
function scrollStories(dir) {
  const inner = document.getElementById('stories-inner');
  inner.scrollLeft += dir * 200;
  setTimeout(() => {
    document.getElementById('stories-prev').style.display = inner.scrollLeft > 0 ? 'flex' : 'none';
    document.getElementById('stories-next').style.display = inner.scrollLeft + inner.clientWidth < inner.scrollWidth - 1 ? 'flex' : 'none';
  }, 350);
}

// ---- CARROSSEL ----
const carouselState = {};

function moveCarousel(id, direction) {
  const carousel = document.getElementById(id);
  const track = carousel.querySelector('.carousel-track');
  const images = track.querySelectorAll('.post-image');
  const dots = carousel.querySelectorAll('.dot');
  const total = images.length;

  if (!carouselState[id]) carouselState[id] = 0;

  carouselState[id] = (carouselState[id] + direction + total) % total;
  const current = carouselState[id];

  track.style.transform = `translateX(-${current * 100}%)`;

  dots.forEach((d, i) => d.classList.toggle('active', i === current));

  // Esconde botoes nas pontas
  carousel.querySelector('.prev').style.display = current === 0 ? 'none' : 'flex';
  carousel.querySelector('.next').style.display = current === total - 1 ? 'none' : 'flex';
}

// Inicializa carrosseis: esconde botao prev no inicio
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel').forEach(carousel => {
    carousel.querySelector('.prev').style.display = 'none';
  });
});

// ---- STORIES ----
const stories = [
  null, // index 0 = "Seu story" (sem viewer)
  {
    name: 'ana.silva',
    avatar: 'https://i.pinimg.com/736x/f0/21/ec/f021ecfb624d5a2b8880791234c557cc.jpg',
    img: 'https://i.pinimg.com/1200x/6f/f2/58/6ff25890a447bf156f814c4ae94d7324.jpg'
  },
  {
    name: 'leo_farias',
    avatar: 'https://i.pinimg.com/736x/3d/e7/d9/3de7d9c0b9131d7f28c0f2396e7e801f.jpg',
    img: 'https://i.pinimg.com/736x/b0/3c/12/b03c129b0884be348f3acd9b290e90ab.jpg'
  },
  {
    name: 'maria.clara',
    avatar: 'https://i.pinimg.com/736x/b3/5e/28/b35e284102c06b7912a198e7ee5921da.jpg',
    img: 'https://i.pinimg.com/1200x/35/cf/1b/35cf1b9145faa1bbfd19905efcb0dc77.jpg'
  },
  {
    name: 'pedro.cardorso',
    avatar: 'https://i.pinimg.com/736x/eb/21/b7/eb21b78ca42da83699df72f2b0c2e17f.jpg',
    img: 'https://i.pinimg.com/736x/bf/39/4d/bf394dc9d3bd414b01df12dec7a91486.jpg'
  },
  {
    name: 'julia.slv',
    avatar: 'https://i.pinimg.com/736x/81/bc/3a/81bc3a6e257392d0c509e1f02b844639.jpg',
    img: 'https://i.pinimg.com/736x/4c/6f/84/4c6f848ceaa58edd3c418aff65d74282.jpg'
  }
];

let currentStory = 1;
let storyTimer = null;
let storyProgressTimer = null;
const STORY_DURATION = 4000; // ms

function openStory(index) {
  if (index === 0 || !stories[index]) return; // "Seu story" não abre
  currentStory = index;
  showStory(currentStory);
  document.getElementById('story-overlay').classList.add('active');
}

function showStory(index) {
  const s = stories[index];
  if (!s) { closeStory(); return; }

  document.getElementById('story-viewer-avatar').src = s.avatar;
  document.getElementById('story-viewer-name').textContent = s.name;
  document.getElementById('story-viewer-img').src = s.img;

  // Marca como visto
  markSeen(index);

  // Reset e inicia barra de progresso
  startProgress();
}

function startProgress() {
  const bar = document.getElementById('story-progress');
  bar.style.transition = 'none';
  bar.style.width = '0%';

  clearTimeout(storyTimer);
  clearTimeout(storyProgressTimer);

  // Força reflow para reiniciar a animação
  bar.offsetWidth;

  bar.style.transition = `width ${STORY_DURATION}ms linear`;
  bar.style.width = '100%';

  storyTimer = setTimeout(() => {
    nextStory();
  }, STORY_DURATION);
}

function nextStory() {
  const next = currentStory + 1;
  if (next < stories.length && stories[next]) {
    currentStory = next;
    showStory(currentStory);
  } else {
    closeStory();
  }
}

function prevStory() {
  const prev = currentStory - 1;
  if (prev >= 1 && stories[prev]) {
    currentStory = prev;
    showStory(currentStory);
  }
}

function closeStory() {
  document.getElementById('story-overlay').classList.remove('active');
  clearTimeout(storyTimer);
  const bar = document.getElementById('story-progress');
  bar.style.transition = 'none';
  bar.style.width = '0%';
}

function markSeen(index) {
  const el = document.getElementById(`story-${index}`);
  if (el) {
    const ring = el.querySelector('.story-ring');
    if (ring) ring.classList.add('seen');
  }
}