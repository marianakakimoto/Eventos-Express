const nav = document.querySelector(".nav");
const btnMenu = document.querySelector(".btn-menu");
const menu = document.querySelector(".menu");

function handleButtonClick(event) {
  if (event.type === "touchstart") event.preventDefault();
  event.stopPropagation();
  nav.classList.toggle("active");
  handleClickOutside(menu, () => {
    nav.classList.remove("active");
    setAria();
  });
  setAria();
}

function handleClickOutside(targetElement, callback) {
  const html = document.documentElement;
  function handleHTMLClick(event) {
    if (!targetElement.contains(event.target)) {
      targetElement.removeAttribute("data-target");
      html.removeEventListener("click", handleHTMLClick);
      html.removeEventListener("touchstart", handleHTMLClick);
      callback();
    }
  }
  if (!targetElement.hasAttribute("data-target")) {
    html.addEventListener("click", handleHTMLClick);
    html.addEventListener("touchstart", handleHTMLClick);
    targetElement.setAttribute("data-target", "");
  }
}

function setAria() {
  const isActive = nav.classList.contains("active");
  btnMenu.setAttribute("aria-expanded", isActive);
  if (isActive) {
    btnMenu.setAttribute("aria-label", "Fechar Menu");
  } else {
    btnMenu.setAttribute("aria-label", "Abrir Menu");
  }
}

btnMenu.addEventListener("click", handleButtonClick);
btnMenu.addEventListener("touchstart", handleButtonClick);


//Função para o modal da galeria de fotos:

// Obtém todas as miniaturas
const thumbnails = document.querySelectorAll('.thumbnail');
const fullImage = document.getElementById('full-image');
const modal = document.querySelector('.image-modal');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

let currentIndex = 0;

function showImage(index) {
    const fullImageSrc = thumbnails[index].getAttribute('data-full-image');
    fullImage.src = fullImageSrc;
    currentIndex = index;
}

function previousImage() {
    if (currentIndex > 0) {
        showImage(currentIndex - 1);
    }
}

// Função para fechar o modal
function closeModal() {
  modal.style.display = 'none';
}

// Adicione um evento de clique no botão de fechar
document.getElementById('close-button').addEventListener('click', closeModal);


function nextImage() {
    if (currentIndex < thumbnails.length - 1) {
        showImage(currentIndex + 1);
    }
}

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', function() {
      const fullImageSrc = this.getAttribute('data-full-image');
      fullImage.src = fullImageSrc;
      modal.style.display = 'block'; // Exibe o modal
      currentIndex = index; // Atualiza o índice da imagem atual
  });
});

modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

function removerItem(id) {
  const elemento = document.getElementById(id);

  if (elemento) {
    elemento.remove();
    atualizarTotal();
  }
}

function atualizarTotal() {
  // Adicione o código para recalcular o total conforme necessário
}

/* Função para ajustar o tamanho da imagem no modal - PRECISA TESTAR AINDA
function adjustImageSize() {
  const modalWidth = modal.offsetWidth;
  const modalHeight = modal.offsetHeight;
  const maxWidth = modalWidth - 20; // Reduz 20 pixels de margem para garantir um ajuste adequado
  const maxHeight = modalHeight - 20;

  const aspectRatio = fullImage.naturalWidth / fullImage.naturalHeight;
  if (maxWidth / maxHeight > aspectRatio) {
      fullImage.style.width = maxWidth + 'px';
      fullImage.style.height = (maxWidth / aspectRatio) + 'px';
  } else {
      fullImage.style.height = maxHeight + 'px';
      fullImage.style.width = (maxHeight * aspectRatio) + 'px';
  }
}

// Adicione um evento de redimensionamento da janela para ajustar o tamanho da imagem
window.addEventListener('resize', adjustImageSize);

// Chame a função `adjustImageSize` sempre que a imagem do modal mudar
fullImage.onload = adjustImageSize;
*/
