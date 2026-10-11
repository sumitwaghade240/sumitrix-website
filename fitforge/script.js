/**
 * ============================================================================
 * FitForge — Elite Strength & Fitness Club Interactive Logic
 * ============================================================================
 * 
 * CONFIGURATION:
 * Replace '91XXXXXXXXXX' with the gym manager's / reception WhatsApp number
 * in international digits-only format (e.g., 919876543210 for an Indian number).
 */
const GYM_WHATSAPP_NUMBER = "91XXXXXXXXXX";

// DOM Elements
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const gymNav = document.getElementById("gym-nav");
const trialForm = document.getElementById("free-trial-form");
const trialStatusAlert = document.getElementById("trial-form-status");
const planEnquireBtns = document.querySelectorAll(".btn-plan-enquire");
const directWhatsAppBtn = document.getElementById("direct-whatsapp-chat-btn");
const toastContainer = document.getElementById("toast-container");

// Preview Modal Elements
const previewModal = document.getElementById("preview-modal");
const closePreviewModalBtn = document.getElementById("close-preview-modal-btn");
const previewMessageContent = document.getElementById("preview-message-content");
const modalCopyBtn = document.getElementById("modal-copy-btn");
const modalLaunchBtn = document.getElementById("modal-launch-btn");
let pendingWhatsAppUrl = "";

// Set Copyright Year
document.getElementById("year").textContent = new Date().getFullYear();

// ============================================================================
// Mobile Navigation
// ============================================================================
if (mobileMenuBtn && gymNav) {
  mobileMenuBtn.addEventListener("click", () => {
    const isOpen = gymNav.classList.toggle("open");
    mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  gymNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      gymNav.classList.remove("open");
      mobileMenuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// ============================================================================
// Free 1-Day Trial Form Validation & WhatsApp Dispatch
// ============================================================================
if (trialForm) {
  trialForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Reset error messages
    clearTrialErrors();

    const nameInput = document.getElementById("trial-name");
    const phoneInput = document.getElementById("trial-phone");
    const slotInput = document.getElementById("trial-slot");
    const goalInput = document.getElementById("trial-goal");
    const dateInput = document.getElementById("trial-date");

    const nameVal = nameInput.value.trim();
    const phoneVal = phoneInput.value.trim();
    const slotVal = slotInput.value;
    const goalVal = goalInput.value;
    const dateVal = dateInput.value;

    let hasErrors = false;

    // Validate Name
    if (!nameVal || nameVal.length < 2) {
      showFieldError("trial-name-err", "Please enter your full name.");
      nameInput.setAttribute("aria-invalid", "true");
      nameInput.focus();
      hasErrors = true;
    }

    // Validate Phone (At least 10 digits)
    const phoneDigits = phoneVal.replace(/\D/g, "");
    if (!phoneVal || phoneDigits.length < 10) {
      showFieldError("trial-phone-err", "Please enter a valid 10-digit WhatsApp number.");
      phoneInput.setAttribute("aria-invalid", "true");
      if (!hasErrors) phoneInput.focus();
      hasErrors = true;
    }

    // Validate Time Slot
    if (!slotVal) {
      showFieldError("trial-slot-err", "Please choose your preferred workout slot.");
      slotInput.setAttribute("aria-invalid", "true");
      if (!hasErrors) slotInput.focus();
      hasErrors = true;
    }

    // Validate Goal
    if (!goalVal) {
      showFieldError("trial-goal-err", "Please choose your primary fitness focus.");
      goalInput.setAttribute("aria-invalid", "true");
      if (!hasErrors) goalInput.focus();
      hasErrors = true;
    }

    if (hasErrors) {
      trialStatusAlert.textContent = "Please fill in all required fields marked with *";
      trialStatusAlert.style.display = "block";
      return;
    }

    // Construct formatted WhatsApp message
    const formattedDate = dateVal ? dateVal : "Earliest Available Date";
    const trialMessage = [
      "⚡ *FREE 1-DAY TRIAL PASS REQUEST — FITFORGE GYM (DEMO)*",
      "--------------------------------------------------",
      `• *Name:* ${nameVal}`,
      `• *WhatsApp:* ${phoneVal}`,
      `• *Preferred Slot:* ${slotVal}`,
      `• *Primary Fitness Goal:* ${goalVal}`,
      `• *Target Visit Date:* ${formattedDate}`,
      "--------------------------------------------------",
      "Hi FitForge Team! I would like to book my complimentary 1-day workout trial pass and body composition scan.",
      "Please confirm slot availability and front-desk timing.",
      "\n_Sent via FitForge Gym Demo Website._"
    ].join("\n");

    sendToWhatsApp(
      trialMessage,
      "Free 1-Day Trial Pass enquiry ready for WhatsApp!"
    );
  });
}

function showFieldError(elementId, message) {
  const errEl = document.getElementById(elementId);
  if (errEl) errEl.textContent = message;
}

function clearTrialErrors() {
  trialStatusAlert.style.display = "none";
  ["trial-name", "trial-phone", "trial-slot", "trial-goal"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.removeAttribute("aria-invalid");
  });
  ["trial-name-err", "trial-phone-err", "trial-slot-err", "trial-goal-err"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = "";
  });
}

// ============================================================================
// Membership Plan Enquiries
// ============================================================================
planEnquireBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const planName = btn.dataset.plan || "Membership";

    const planMessage = [
      "🏋️ *MEMBERSHIP ENQUIRY — FITFORGE ATHLETIC CLUB*",
      "--------------------------------------------------",
      `• *Selected Plan:* ${planName}`,
      "--------------------------------------------------",
      "Hi FitForge Reception! I am interested in joining under this membership tier.",
      "Please share information on:",
      "1. Current admission timing & front-desk paperwork",
      "2. Locker and trainer consultation schedule",
      "3. Accepted payment options (UPI / Cash / Card at desk)",
      "\n_Sent via FitForge Gym Demo Website._"
    ].join("\n");

    sendToWhatsApp(
      planMessage,
      `Enquiry for ${planName} generated!`
    );
  });
});

// ============================================================================
// Direct Reception WhatsApp Enquiry
// ============================================================================
if (directWhatsAppBtn) {
  directWhatsAppBtn.addEventListener("click", () => {
    const generalMessage = [
      "👋 *GENERAL ENQUIRY — FITFORGE ATHLETIC CLUB*",
      "--------------------------------------------------",
      "Hi FitForge Team! I have a question about gym location, timings, and membership facilities. Could you please assist me?",
      "\n_Sent via FitForge Gym Demo Website._"
    ].join("\n");

    sendToWhatsApp(generalMessage, "Opening chat with gym reception...");
  });
}

// ============================================================================
// WhatsApp URL Dispatch & Preview Fallback
// ============================================================================
function sendToWhatsApp(messageText, toastSuccessText) {
  const encodedText = encodeURIComponent(messageText);
  const isNumberConfigured = /^\d{10,15}$/.test(GYM_WHATSAPP_NUMBER) && !GYM_WHATSAPP_NUMBER.includes("X");

  pendingWhatsAppUrl = isNumberConfigured
    ? `https://wa.me/${GYM_WHATSAPP_NUMBER}?text=${encodedText}`
    : `https://wa.me/?text=${encodedText}`;

  if (!isNumberConfigured) {
    // Show preview modal with instructions so client/examiner can inspect message
    showPreviewModal(
      messageText,
      "Demo Configuration Note: In a production gym deployment, replace '91XXXXXXXXXX' in fitforge/script.js with the gym reception's real 10–15 digit WhatsApp number without '+' or spaces (e.g. 919876543210 for India). You can review the exact formatted message below or test-launch it!"
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
