/**
 * ============================================================================
 * Unified Freelance Web Developer Portfolio — Interactive Engine
 * ============================================================================
 * 
/**
 * CONFIGURATION:
 * Replace '91XXXXXXXXXX' with the freelance developer's real WhatsApp number
 * in international format without '+' or spaces (e.g., 919876543210 for an Indian number,
 * or 12025550123 for US/Canada).
 */
const DEVELOPER_WHATSAPP_NUMBER = "91XXXXXXXXXX";
const DEVELOPER_NAME = "Sumit Waghade";

// DOM Elements
const navToggleBtn = document.getElementById("nav-toggle-btn");
const portfolioNav = document.getElementById("portfolio-nav");
const contactForm = document.getElementById("freelance-contact-form");
const clientNameInput = document.getElementById("client-name");
const clientTypeSelect = document.getElementById("client-type");
const clientPkgSelect = document.getElementById("client-package");
const clientNotesInput = document.getElementById("client-notes");
const formAlert = document.getElementById("form-general-alert");
const pkgButtons = document.querySelectorAll(".btn-pkg");
const toastContainer = document.getElementById("toast-container");

// Preview Modal Elements
const previewModal = document.getElementById("preview-modal");
const closePreviewModalBtn = document.getElementById("close-preview-modal-btn");
const previewMessageContent = document.getElementById("preview-message-content");
const modalCopyBtn = document.getElementById("modal-copy-btn");
const modalLaunchBtn = document.getElementById("modal-launch-btn");
let pendingWhatsAppUrl = "";

// Set copyright year
document.getElementById("year").textContent = new Date().getFullYear();

// ============================================================================
// Mobile Navigation
// ============================================================================
if (navToggleBtn && portfolioNav) {
  navToggleBtn.addEventListener("click", () => {
    const isOpen = portfolioNav.classList.toggle("open");
    navToggleBtn.setAttribute("aria-expanded", String(isOpen));
  });

  portfolioNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      portfolioNav.classList.remove("open");
      navToggleBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// ============================================================================
// Pre-Select Package From Services Grid
// ============================================================================
pkgButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const pkgName = btn.dataset.service;
    if (pkgName && clientPkgSelect) {
      clientPkgSelect.value = pkgName;
      showToast(`Selected "${pkgName}" in contact form`);
    }
  });
});

// ============================================================================
// Contact Form Validation & WhatsApp Dispatch
// ============================================================================
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    const nameVal = clientNameInput.value.trim();
    const typeVal = clientTypeSelect.value;
    const pkgVal = clientPkgSelect.value;
    const notesVal = clientNotesInput.value.trim();

    let hasErrors = false;

    // Validate Name
    if (!nameVal || nameVal.length < 2) {
      document.getElementById("err-client-name").textContent = "Please enter your name or business name.";
      clientNameInput.setAttribute("aria-invalid", "true");
      clientNameInput.focus();
      hasErrors = true;
    }

    // Validate Business Type
    if (!typeVal) {
      document.getElementById("err-client-type").textContent = "Please select your business category.";
      clientTypeSelect.setAttribute("aria-invalid", "true");
      if (!hasErrors) clientTypeSelect.focus();
      hasErrors = true;
    }

    if (hasErrors) {
      formAlert.textContent = "Please complete all required fields marked with *";
      formAlert.style.display = "block";
      return;
    }

    // Construct formatted WhatsApp message
    const lines = [
      "🚀 *NEW PROJECT INQUIRY — FREELANCE WEB DEV*",
      "---------------------------------------------",
      `• *Client / Business:* ${nameVal}`,
      `• *Business Niche:* ${typeVal}`,
      `• *Selected Package:* ${pkgVal}`,
      notesVal ? `• *Project Notes:* ${notesVal}` : "",
      "---------------------------------------------",
      `Hi ${DEVELOPER_NAME}! I checked your freelance portfolio demos (StyleCart / FitForge / LensCraft).`,
      "I would like to discuss building a custom, zero-monthly-cost website for my business.",
      "Please let me know your availability for a quick consultation!",
      "\n_Sent via Freelance Portfolio Homepage._"
    ];

    const cleanMessage = lines.filter(l => l !== "").join("\n");
    sendToWhatsApp(cleanMessage, "Project inquiry prepared for WhatsApp!");
  });
}

function clearErrors() {
  if (formAlert) formAlert.style.display = "none";
  const errName = document.getElementById("err-client-name");
  const errType = document.getElementById("err-client-type");
  if (errName) errName.textContent = "";
  if (errType) errType.textContent = "";
  if (clientNameInput) clientNameInput.removeAttribute("aria-invalid");
  if (clientTypeSelect) clientTypeSelect.removeAttribute("aria-invalid");
}

// ============================================================================
// WhatsApp Message Dispatcher
// ============================================================================
function sendToWhatsApp(messageText, toastSuccessText) {
  const encodedText = encodeURIComponent(messageText);
  const isNumberConfigured = /^\d{10,15}$/.test(DEVELOPER_WHATSAPP_NUMBER) && !DEVELOPER_WHATSAPP_NUMBER.includes("X");

  pendingWhatsAppUrl = isNumberConfigured
    ? `https://wa.me/${DEVELOPER_WHATSAPP_NUMBER}?text=${encodedText}`
    : `https://wa.me/?text=${encodedText}`;

  if (!isNumberConfigured) {
    // Show Preview Modal with instructions so anyone testing can inspect the message
    showPreviewModal(
      messageText,
      `Developer Configuration Note: In script.js, replace '91XXXXXXXXXX' with ${DEVELOPER_NAME}'s 10–15 digit WhatsApp number without '+' (e.g. 91 + 10 digits for India). You can preview the exact message generated below or test-launch it to any contact!`
    );
  } else {
    window.open(pendingWhatsAppUrl, "_blank", "noopener,noreferrer");
    showToast(toastSuccessText || "Opening WhatsApp...");
  }
}

// ============================================================================
// Preview Modal Handlers
// ============================================================================
function showPreviewModal(messageText, infoText) {
  previewMessageContent.textContent = messageText;
  if (infoText) {
    document.querySelector(".modal-info").textContent = infoText;
  }
  previewModal.style.display = "flex";
}

function closePreviewModal() {
  previewModal.style.display = "none";
}

closePreviewModalBtn.addEventListener("click", closePreviewModal);
previewModal.addEventListener("click", (e) => {
  if (e.target === previewModal) closePreviewModal();
});

modalCopyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(previewMessageContent.textContent).then(() => {
    modalCopyBtn.textContent = "Copied! ✓";
    setTimeout(() => { modalCopyBtn.textContent = "Copy Message Text"; }, 1800);
    showToast("Message copied to clipboard!");
  });
});

modalLaunchBtn.addEventListener("click", () => {
  if (pendingWhatsAppUrl) {
    window.open(pendingWhatsAppUrl, "_blank", "noopener,noreferrer");
  }
});

// ============================================================================
// Toast Notification
// ============================================================================
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.2s ease";
    setTimeout(() => toast.remove(), 250);
  }, 2600);
}
