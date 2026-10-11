// LensCraft demo interactions.
// IMPORTANT: Replace the placeholder below with the photographer's WhatsApp number,
// including country code but no + sign, spaces, or punctuation. Example format: 919876543210.
const WHATSAPP_NUMBER = "91XXXXXXXXXX";

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

document.querySelector("#year").textContent = new Date().getFullYear();

const filters = document.querySelectorAll(".filter");
const cards = [...document.querySelectorAll(".gallery-card")];
filters.forEach(filter => filter.addEventListener("click", () => {
  filters.forEach(item => item.classList.toggle("active", item === filter));
  const chosen = filter.dataset.filter;
  cards.forEach(card => {
    card.hidden = chosen !== "all" && card.dataset.category !== chosen;
  });
}));

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
let currentCardIndex = 0;
function visibleCards() { return cards.filter(card => !card.hidden); }
function openLightbox(card) {
  currentCardIndex = visibleCards().indexOf(card);
  showLightboxCard();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function showLightboxCard() {
  const list = visibleCards();
  if (!list.length) return;
  const card = list[(currentCardIndex + list.length) % list.length];
  lightboxImage.src = card.dataset.image;
  lightboxImage.alt = card.querySelector("img").alt;
  lightboxCaption.textContent = card.dataset.title;
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
cards.forEach(card => card.addEventListener("click", () => openLightbox(card)));
document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
document.querySelector(".lightbox-prev").addEventListener("click", () => { currentCardIndex--; showLightboxCard(); });
document.querySelector(".lightbox-next").addEventListener("click", () => { currentCardIndex++; showLightboxCard(); });
lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", event => {
  if (!lightbox.classList.contains("open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") { currentCardIndex--; showLightboxCard(); }
  if (event.key === "ArrowRight") { currentCardIndex++; showLightboxCard(); }
});

// Preview Modal Elements
const previewModal = document.querySelector("#preview-modal");
const closePreviewModalBtn = document.querySelector("#close-preview-modal-btn");
const previewMessageContent = document.querySelector("#preview-message-content");
const modalCopyBtn = document.querySelector("#modal-copy-btn");
const modalLaunchBtn = document.querySelector("#modal-launch-btn");
let pendingWhatsAppUrl = "";

function showPreviewModal(messageText, infoText) {
  if (!previewModal) return;
  previewMessageContent.textContent = messageText;
  if (infoText) {
    document.querySelector(".modal-info").textContent = infoText;
  }
  previewModal.style.display = "flex";
}

function closePreviewModal() {
  if (previewModal) previewModal.style.display = "none";
}

if (closePreviewModalBtn) closePreviewModalBtn.addEventListener("click", closePreviewModal);
if (previewModal) {
  previewModal.addEventListener("click", event => {
    if (event.target === previewModal) closePreviewModal();
  });
}

if (modalCopyBtn) {
  modalCopyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(previewMessageContent.textContent).then(() => {
      modalCopyBtn.textContent = "Copied! ✓";
      setTimeout(() => { modalCopyBtn.textContent = "Copy Message Text"; }, 1800);
    });
  });
}

if (modalLaunchBtn) {
  modalLaunchBtn.addEventListener("click", () => {
    if (pendingWhatsAppUrl) {
      window.open(pendingWhatsAppUrl, "_blank", "noopener,noreferrer");
    }
  });
}

const enquiryForm = document.querySelector("#enquiry-form");
if (enquiryForm) {
  enquiryForm.addEventListener("submit", event => {
    event.preventDefault();
    const nameInput = document.querySelector("#name");
    const eventInput = document.querySelector("#event");
    const dateInput = document.querySelector("#date");
    const messageInput = document.querySelector("#message");
    const status = document.querySelector("#form-status");

    nameInput.removeAttribute("aria-invalid");
    eventInput.removeAttribute("aria-invalid");

    const nameVal = nameInput.value.trim();
    const eventVal = eventInput.value;
    const dateVal = dateInput.value;
    const detailsVal = messageInput.value.trim();

    if (!nameVal || nameVal.length < 2) {
      nameInput.setAttribute("aria-invalid", "true");
      nameInput.focus();
      status.textContent = "Please enter your full name.";
      status.style.color = "#b8382b";
      return;
    }

    if (!eventVal) {
      eventInput.setAttribute("aria-invalid", "true");
      eventInput.focus();
      status.textContent = "Please select what event or session you are planning.";
      status.style.color = "#b8382b";
      return;
    }

    status.textContent = "";

    const messageLines = [
      "📸 *PHOTOGRAPHY BOOKING ENQUIRY — LENSCRAFT STUDIO (DEMO)*",
      "--------------------------------------------------",
      `• *Client Name:* ${nameVal}`,
      `• *Event / Session Type:* ${eventVal}`,
      `• *Target Date:* ${dateVal || "Not decided yet"}`,
      detailsVal ? `• *Session Notes:* ${detailsVal}` : "",
      "--------------------------------------------------",
      "Hi LensCraft Studio! I'd like to check your availability and package details.",
      "\n_Sent via LensCraft Photography Demo Website._"
    ];

    const cleanMessage = messageLines.filter(l => l !== "").join("\n");
    const encodedText = encodeURIComponent(cleanMessage);

    const isNumberConfigured = /^\d{10,15}$/.test(WHATSAPP_NUMBER) && !WHATSAPP_NUMBER.includes("X");
    pendingWhatsAppUrl = isNumberConfigured
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`
      : `https://wa.me/?text=${encodedText}`;

    if (!isNumberConfigured) {
      showPreviewModal(
        cleanMessage,
        "Demo Configuration Note: In a production photography deployment, replace '91XXXXXXXXXX' in lenscraft/script.js with the studio's real 10–15 digit WhatsApp number without '+' or spaces (e.g. 919876543210 for India). You can preview the exact message generated below or launch it to any contact!"
      );
      status.innerHTML = "Demo preview modal opened. You can also <a href='" + pendingWhatsAppUrl + "' target='_blank' rel='noopener noreferrer' style='text-decoration:underline;color:var(--accent);font-weight:600;'>launch directly in WhatsApp ↗</a>";
      status.style.color = "";
    } else {
      window.open(pendingWhatsAppUrl, "_blank", "noopener,noreferrer");
      status.textContent = "Your enquiry is ready to send in WhatsApp.";
      status.style.color = "#198754";
    }
  });
}
