'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

  updateFeaturedProject();
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

const PROJECT_PRIORITY = [
  "GDExtAbilities",
  "Pinky Engine",
  "Alien Extraction",
  "Suits",
  "Dreamward",
  "Twisted Tent",
  "Cartalà",
  "Magic Frogs",
  "Otaku's Realm",
  "Chimeras",
];

// project viewer variables
const projectCards = Array.from(document.querySelectorAll(".project-item"));
const projectModal = document.querySelector("[data-project-modal]");
const projectModalMedia = document.querySelector("[data-project-modal-media]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalMeta = document.querySelector("[data-project-modal-meta]");
const projectModalDescription = document.querySelector("[data-project-modal-description]");
const projectModalDetails = document.querySelector("[data-project-modal-details]");
const projectModalCounter = document.querySelector("[data-project-modal-counter]");
const projectModalLink = document.querySelector("[data-project-modal-link]");
const projectModalCloseButtons = document.querySelectorAll("[data-project-modal-close]");
const projectModalPrevious = document.querySelector("[data-project-modal-prev]");
const projectModalNext = document.querySelector("[data-project-modal-next]");
const projectModalImagePrevious = document.querySelector("[data-project-modal-image-prev]");
const projectModalImageNext = document.querySelector("[data-project-modal-image-next]");
const projectModalImageCounter = document.querySelector("[data-project-modal-image-counter]");
const projectList = document.querySelector(".project-list");
const sortButtons = document.querySelectorAll("[data-sort-btn]");
const sortMenu = document.querySelector("[data-sort-menu]");
const sortToggle = document.querySelector("[data-sort-toggle]");
const sortCurrent = document.querySelector("[data-sort-current]");
const imageLightbox = document.querySelector("[data-image-lightbox]");
const imageLightboxImage = document.querySelector("[data-image-lightbox-image]");
const imageLightboxClose = document.querySelector("[data-image-lightbox-close]");
const projectGalleries = new Map();
const GALLERY_DOT_ICON = "ellipse-outline";
const ACTIVE_GALLERY_DOT_ICON = "radio-button-on-outline";
let activeProjectIndex = 0;
let projectModalTrigger = null;

const updateFeaturedProject = function () {
  for (let i = 0; i < projectCards.length; i++) {
    projectCards[i].classList.remove("featured-project");
  }

  const firstVisibleProject = projectCards.find(function (project) {
    return project.classList.contains("active");
  });

  if (firstVisibleProject) firstVisibleProject.classList.add("featured-project");
};

const getProjectPriority = function (project) {
  const title = project.querySelector(".project-title").textContent.trim().toLowerCase();
  const index = PROJECT_PRIORITY.findIndex(function (name) {
    return title.startsWith(name.toLowerCase());
  });
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
};

const sortProjects = function (sortType) {
  projectCards.sort(function (firstProject, secondProject) {
    const firstTitle = firstProject.querySelector(".project-title").textContent.trim();
    const secondTitle = secondProject.querySelector(".project-title").textContent.trim();

    if (sortType === "name") return firstTitle.localeCompare(secondTitle);

    if (sortType === "date") {
      const firstDate = firstProject.dataset.projectDate || "0000-00-00";
      const secondDate = secondProject.dataset.projectDate || "0000-00-00";
      return secondDate.localeCompare(firstDate) || firstTitle.localeCompare(secondTitle);
    }

    return getProjectPriority(firstProject) - getProjectPriority(secondProject) || firstTitle.localeCompare(secondTitle);
  });

  projectList.append(...projectCards);
  updateFeaturedProject();
};

// Sets the blurred backdrop (--media-bg) used to fill the empty space around a fitted image.
const setMediaBackdrop = function (element, media) {
  if (media && media.tagName === "IMG" && media.src) {
    element.style.setProperty("--media-bg", `url("${media.src.replace(/"/g, "%22")}")`);
  } else {
    element.style.removeProperty("--media-bg");
  }
};

const createPlaceholderSlide = function () {
  const placeholder = document.createElement("div");
  placeholder.className = "project-carousel__placeholder";
  placeholder.setAttribute("aria-label", "Placeholder for a future project screenshot or GIF");
  placeholder.innerHTML = "<ion-icon name=\"images-outline\"></ion-icon><strong>Add a screenshot or GIF</strong><span>Replace this placeholder with a project image.</span>";
  return placeholder;
};

const setGalleryImage = function (gallery, index) {
  gallery.currentIndex = (index + gallery.slides.length) % gallery.slides.length;

  for (let i = 0; i < gallery.dots.length; i++) {
    const isActive = i === gallery.currentIndex;
    gallery.dots[i].classList.toggle("active", isActive);
    gallery.dots[i].setAttribute("name", isActive ? ACTIVE_GALLERY_DOT_ICON : GALLERY_DOT_ICON);
  }
};

const createGalleryDots = function (count) {
  const dots = [];
  for (let i = 0; i < count; i++) {
    const dot = document.createElement("ion-icon");
    dot.className = "project-carousel__dot";
    dot.setAttribute("name", GALLERY_DOT_ICON);
    dots.push(dot);
  }
  return dots;
};

for (let i = 0; i < projectCards.length; i++) {
  const projectCard = projectCards[i];
  const projectFigure = projectCard.querySelector(".project-img");
  const mainMedia = projectFigure.querySelector("img, .gdextension-preview");
  const additionalImagePaths = (projectCard.dataset.galleryImages || "")
    .split(",")
    .map(function (path) { return path.trim(); })
    .filter(Boolean);
  const mediaSlides = [mainMedia.cloneNode(true)];
  setMediaBackdrop(projectFigure, mainMedia);

  for (let j = 0; j < additionalImagePaths.length; j++) {
    const image = document.createElement("img");
    image.src = additionalImagePaths[j];
    image.alt = `${projectCard.querySelector(".project-title").textContent} screenshot`;
    mediaSlides.push(image);
  }

  if (additionalImagePaths.length === 0) mediaSlides.push(createPlaceholderSlide());

  const gallery = {
    slides: mediaSlides,
    currentIndex: 0,
    dots: [],
  };
  projectGalleries.set(projectCard, gallery);
  setGalleryImage(gallery, 0);

}

for (let i = 0; i < sortButtons.length; i++) {
  sortButtons[i].addEventListener("click", function () {
    sortProjects(this.dataset.sortBtn);
    sortCurrent.textContent = this.textContent;
    sortMenu.classList.remove("active");
    sortToggle.setAttribute("aria-expanded", "false");

    for (let j = 0; j < sortButtons.length; j++) {
      sortButtons[j].classList.toggle("active", sortButtons[j] === this);
    }
  });
}

sortToggle.addEventListener("click", function () {
  const isOpen = sortMenu.classList.toggle("active");
  sortToggle.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("click", function (event) {
  if (!sortMenu.contains(event.target)) {
    sortMenu.classList.remove("active");
    sortToggle.setAttribute("aria-expanded", "false");
  }
});

const getProjectLinkLabel = function (hostname) {
  if (hostname === "github.com") return "View code on GitHub";
  if (hostname.endsWith("itch.io")) return "Play on itch.io";
  if (hostname.endsWith("github.io")) return "Open project site";
  if (hostname.endsWith("google.com")) return "Open on Google Drive";
  return "Open project";
};

const updateProjectModal = function (index) {
  activeProjectIndex = (index + projectCards.length) % projectCards.length;

  const projectCard = projectCards[activeProjectIndex];
  const projectLink = projectCard.querySelector("a");
  const projectTitle = projectCard.querySelector(".project-title");
  const projectMeta = projectCard.querySelector(".project-meta");
  const projectDescription = projectCard.querySelector(".project-category");
  const projectGallery = projectGalleries.get(projectCard);

  const currentSlide = projectGallery.slides[projectGallery.currentIndex].cloneNode(true);
  projectModalMedia.replaceChildren(currentSlide);
  setMediaBackdrop(projectModalMedia, currentSlide);
  projectModalTitle.textContent = projectTitle.textContent;
  projectModalMeta.textContent = projectMeta ? projectMeta.textContent : "Project";
  const caseTemplate = projectCard.querySelector("template[data-project-case]");
  projectModalDetails.replaceChildren();
  if (caseTemplate) {
    projectModalDescription.hidden = true;
    projectModalDetails.append(caseTemplate.content.cloneNode(true));
  } else {
    projectModalDescription.hidden = false;
    projectModalDescription.textContent = projectDescription.innerText.trim();
  }
  projectModalCounter.textContent = `${activeProjectIndex + 1} / ${projectCards.length}`;
  projectModalLink.href = projectLink.href;
  projectModalLink.querySelector("span").textContent = getProjectLinkLabel(projectLink.hostname);
  projectGallery.dots = createGalleryDots(projectGallery.slides.length);
  projectModalImageCounter.replaceChildren(...projectGallery.dots);
  setGalleryImage(projectGallery, projectGallery.currentIndex);
};

const changeModalImage = function (direction) {
  const projectGallery = projectGalleries.get(projectCards[activeProjectIndex]);
  setGalleryImage(projectGallery, projectGallery.currentIndex + direction);
  updateProjectModal(activeProjectIndex);
};

const openProjectModal = function (index, trigger) {
  projectModalTrigger = trigger;
  updateProjectModal(index);
  projectModal.classList.add("active");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  projectModal.querySelector(".project-modal__close").focus();
};

const closeProjectModal = function () {
  projectModal.classList.remove("active");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  projectModalTrigger?.focus();
};

for (let i = 0; i < projectCards.length; i++) {
  const projectLink = projectCards[i].querySelector("a");
  projectLink.setAttribute("aria-haspopup", "dialog");
  projectLink.addEventListener("click", function (event) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    // projectCards is re-sorted at load, so look up the real index instead of using the loop's i
    openProjectModal(projectCards.indexOf(projectCards.find(function (card) { return card.contains(projectLink); })), projectLink);
  });
}

projectModalPrevious.addEventListener("click", function () {
  updateProjectModal(activeProjectIndex - 1);
});

projectModalNext.addEventListener("click", function () {
  updateProjectModal(activeProjectIndex + 1);
});

projectModalImagePrevious.addEventListener("click", function () {
  changeModalImage(-1);
});

projectModalImageNext.addEventListener("click", function () {
  changeModalImage(1);
});

projectModalMedia.addEventListener("click", function (event) {
  const image = event.target.closest("img");
  if (!image) return;

  imageLightboxImage.src = image.currentSrc || image.src;
  imageLightbox.classList.remove("is-actual");
  imageLightbox.scrollTo(0, 0);
  imageLightbox.classList.add("active");
  imageLightbox.setAttribute("aria-hidden", "false");
  imageLightboxClose.focus();
});

// Click the image to switch between "fit to screen" and its real size.
imageLightboxImage.addEventListener("click", function () {
  imageLightbox.classList.toggle("is-actual");
});

imageLightbox.addEventListener("click", function (event) {
  if (event.target !== imageLightbox && !event.target.closest("[data-image-lightbox-close]")) return;
  imageLightbox.classList.remove("active");
  imageLightbox.setAttribute("aria-hidden", "true");
});

for (let i = 0; i < projectModalCloseButtons.length; i++) {
  projectModalCloseButtons[i].addEventListener("click", closeProjectModal);
}

document.addEventListener("keydown", function (event) {
  if (imageLightbox.classList.contains("active") && event.key === "Escape") {
    imageLightbox.classList.remove("active");
    imageLightbox.setAttribute("aria-hidden", "true");
    return;
  }

  if (!projectModal.classList.contains("active")) return;

  if (event.key === "Escape") closeProjectModal();
  if (event.key === "ArrowLeft") changeModalImage(-1);
  if (event.key === "ArrowRight") changeModalImage(1);
});

sortProjects("priority");
