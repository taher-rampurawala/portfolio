(() => {
  "use strict";

  /**
   * "Book a call" target.
   *
   * Recommended: a Google Calendar appointment schedule booking page
   * (Google Calendar → Create → Appointment schedule → "Open booking page" → copy link,
   * looks like https://calendar.app.google/XXXX). Visitors pick one of your free slots and
   * Google sends the invite from your Gmail with a Meet link automatically.
   *
   * While empty, the button opens a pre-filled Google Calendar event with you added as a
   * guest. When the visitor saves it, Google Calendar emails the invite to your Gmail.
   */
  const BOOK_CALL_URL = "";

  /**
   * Where the "Send a message" form submits. Paste an n8n Webhook node's Production URL
   * (method POST) to receive messages as JSON: { name, email, company, topic, message, page, sentAt }.
   * In n8n, wire it to Gmail "Send" (and Respond to Webhook with 200). Enable CORS for this site's
   * origin in the Webhook node options ("Allowed Origins").
   * While empty, the form opens the visitor's email app with the message pre-filled.
   */
  const FORM_ENDPOINT = "";

  const REPO ="https://github.com/taher-rampurawala/n8n_workflows_project/tree/main/";
  const repo = (folder) => REPO + encodeURIComponent(folder).replace(/%2F/g, "/");
  const img = (name, ext = "webp") => `assets/workflows/${name}.${ext}`;

  const CATS = {
    voice: "Voice AI",
    chat: "Chat & WhatsApp",
    agents: "AI Agents & RAG",
    content: "Content & Outreach",
    data: "Documents & Data",
  };

  /** All projects. `feature: true` spans two columns in the grid. */
  const PROJECTS = [
    {
      title: "AI Voice Receptionist for a Dental Clinic",
      platform: "Retell AI + n8n",
      cat: "voice",
      feature: true,
      summary: "Riya answers the clinic phone in English, Hindi and Hinglish, books same-day tokens, answers FAQs, moves or cancels bookings and transfers to reception.",
      points: [
        "Patients call the clinic and talk to Riya, a multi-prompt Retell AI voice agent that speaks English, Hindi and Hinglish. She books same-day appointment tokens, answers clinic FAQs, cancels or moves bookings and transfers to reception.",
        "Five agent functions (check availability, book, find, cancel, move) call one n8n webhook. The webhook verifies every request with a shared secret plus Retell's HMAC-SHA256 signature before forwarding it to a Google Apps Script booking engine.",
        "The engine applies the clinic rules under a script lock so simultaneous callers never get the same slot, and writes to the same Google Sheet as the WhatsApp bot, so both channels share one calendar.",
        "Engine or network failures return a safe response so the agent never claims a false booking, and an error-alert workflow emails the owner.",
      ],
      stack: ["Retell AI", "n8n", "Webhooks", "HMAC-SHA256", "Apps Script", "Google Sheets"],
      shots: [{ src: img("retell-voice"), label: "Retell webhook workflow" }],
      cover: "assets/covers/retell-voice.webp",
      nodes: "13 nodes · 2 workflows",
      folder: "Booking Appointment using Voice AI Agent",
    },
    {
      title: "WhatsApp Appointment Booking Bot",
      platform: "WhatsApp Cloud API",
      cat: "chat",
      summary: "A deterministic state-machine booking flow on the official WhatsApp API. No LLM in the booking path, so every step is predictable and auditable.",
      points: [
        "A deterministic, state-machine WhatsApp booking flow on the official WhatsApp Cloud API: it greets the patient, confirms intent, collects name, age and reason through interactive lists, and books a slot.",
        "Conversation state (current step, patient details, retry attempts) is stored in n8n Data Tables, so every message resumes exactly where the patient left off.",
        "It checks real-time slot availability (5 slots a day, 5 PM cutoff) against Google Sheets and offers the next day automatically when today is full.",
        "Every input is validated, with retry limits per step and a reset option. The flow is fully auditable with no LLM in the booking path.",
      ],
      stack: ["WhatsApp Cloud API", "n8n Data Tables", "Google Sheets", "State machine"],
      shots: [{ src: img("whatsapp-booking"), label: "WhatsApp booking state machine" }],
      nodes: "75 nodes",
      folder: "WhatsApp Doctor Appointment Booking",
      cover: "assets/covers/whatsapp-booking.webp",
    },
    {
      title: "WhatsApp CRM Automation",
      cover: "assets/covers/whatsapp-crm.webp",
      platform: "Next.js + Supabase + n8n",
      cat: "chat",
      summary: "A self-hosted WhatsApp CRM with a shared inbox, sales pipelines, broadcasts and no-code chatbot flows, wired into n8n for booking logic.",
      points: [
        "A self-hosted CRM on the official WhatsApp Business Cloud API, set up as the customer-facing layer for the n8n workflows. Built on the open-source wacrm template (Next.js 16 + Supabase) and configured for clinic and service-business use.",
        "Shared inbox with multiple agents on one number, per-conversation assignment, status and notes. Contacts with tags, custom fields, CSV import and deduplication.",
        "Kanban sales pipelines with deals linked to conversations, plus broadcasts using Meta-approved templates with delivery and read tracking.",
        "Two no-code automation engines: a linear Automations builder (trigger, send buttons or lists, wait, condition, webhook, tag) and a graph-based Flows builder for branching WhatsApp chatbots. Webhook steps hand booking logic to n8n.",
        "AI reply assistant (bring your own OpenAI or Anthropic key) with an optional knowledge base, a scoped REST API and an MCP server, AES-256-GCM token encryption and HMAC-verified webhooks.",
      ],
      stack: ["WhatsApp Cloud API", "Next.js 16", "Supabase", "pgvector", "MCP server", "n8n webhooks"],
      shots: [{ src: img("whatsapp-crm", "svg"), label: "Illustrative UI mock-up" }],
      nodes: "Full-stack app",
      folder: "WhatsApp CRM/wacrm",
    },
    {
      title: "UGC Image & Video Ad Generator",
      cover: "assets/covers/ugc-generator.webp",
      platform: "Telegram bot",
      cat: "content",
      summary: "Send one product photo on Telegram and get UGC-style image and video ads back, written by a vision agent that researches current short-form trends.",
      points: [
        "A Telegram bot that turns one product photo into UGC-style marketing assets. The user sends a photo and picks the mode (image, video or both), a caption and a visual style in a guided chat.",
        "A vision-enabled AI agent looks at the actual product, researches current short-form trends with Tavily, and writes separate image and video prompts through a structured, auto-fixing output parser.",
        "Images are generated with Nano Banana 2 and videos with Veo 3.1 (with native audio) through Kie.ai, using async create, wait, poll and deliver loops with bounded retries.",
        "Conversation state lives in Postgres. A separate workflow sends error alerts, and an hourly job clears out old sessions.",
      ],
      stack: ["Telegram", "Vision AI", "Tavily", "Nano Banana 2", "Veo 3.1", "Kie.ai", "Postgres"],
      shots: [{ src: img("ugc-generator"), label: "UGC Content Studio bot" }],
      nodes: "68 nodes · 3 workflows",
      folder: "UGC Image & Video Generator Automation",
    },
    {
      title: "LinkedIn Content Generator with Telegram Approval",
      cover: "assets/covers/linkedin-content.webp",
      platform: "Human-in-the-loop",
      cat: "content",
      summary: "Chat with a Telegram bot and get a researched LinkedIn post with an AI image. It's published only after you tap Approve.",
      points: [
        "A human-in-the-loop content engine. The owner chats with a Telegram bot, and an intake agent collects the topic, audience, description, optional GitHub workflow link and screenshot, asking for missing details one at a time.",
        "A research agent uses Tavily to write the post, or reads the real workflow JSON from GitHub for project showcases, so the post only describes features the workflow really has. A second agent art-directs an image generated with gpt-image-2.",
        "The exact post is previewed in Telegram with Approve / Decline buttons that resume a waiting n8n run. Approved posts publish to the owner's personal LinkedIn profile with one or two images.",
        "If a critical step fails, its error output sends one Telegram alert to the owner.",
      ],
      stack: ["Telegram", "OpenAI", "gpt-image-2", "Tavily", "GitHub API", "LinkedIn API"],
      shots: [{ src: img("linkedin-content"), label: "Content engine workflow" }],
      nodes: "68 nodes",
      folder: "LinkedIn Content Generator",
    },
    {
      title: "AI Travel Consultant Chat Widget",
      cover: "assets/covers/travel-chat-agent.webp",
      platform: "Website chat + n8n",
      cat: "chat",
      summary: "Musafir, a travel consultant embedded on a Next.js site, looks up packages and itineraries on demand and emails a branded enquiry to a human when it should.",
      points: [
        "Musafir, an AI travel consultant for a boutique agency, embedded as a floating chat widget on a companion Next.js website and powered by an n8n webhook.",
        "The agent calls 7 Google Sheets lookup tools on demand (destinations, packages, itineraries, FAQs, policies and more) instead of loading the whole knowledge base on every message.",
        "A private Think tool handles discovery and pricing logic. Structured JSON output drives a 3-condition escalation that emails a branded HTML enquiry to a human agent.",
        "If the model returns malformed output, the webhook sends back a clean error, so the chat widget always gets a reply.",
      ],
      stack: ["n8n AI Agent", "OpenAI", "7 Sheets tools", "Next.js", "Gmail"],
      shots: [{ src: img("travel-chat-agent"), label: "Musafir chat agent" }],
      nodes: "19 nodes + Next.js site",
      folder: "AI Automation ChatBot",
    },
    {
      title: "AI Lead Generation Agent on Telegram",
      cover: "assets/covers/lead-gen-agent.webp",
      platform: "Voice + text",
      cat: "agents",
      summary: "Describe the leads you want by voice note or text. The agent asks follow-ups, scrapes with Apify, dedupes and emails you a fresh Google Sheet.",
      points: [
        "Users describe the leads they need (location, industry, job title) by text or voice note on Telegram. Voice is transcribed with OpenAI Whisper before reaching the agent.",
        "A conversational GPT agent with per-chat memory gathers the criteria one question at a time, then calls a scraping sub-workflow as a tool.",
        "The sub-workflow runs an Apify actor, removes duplicates by LinkedIn URL, builds a fresh Google Sheet per request and emails the link to the requester through Gmail.",
      ],
      stack: ["Telegram", "Whisper", "GPT agent", "Apify", "Google Sheets", "Gmail"],
      shots: [
        { src: img("lead-gen-agent"), label: "Workflow 1 · Telegram lead agent" },
        { src: img("lead-gen-scraper"), label: "Workflow 2 · scraping sub-workflow" },
      ],
      nodes: "38 nodes · 2 workflows",
      folder: "AI Lead Generation Automation",
    },
    {
      title: "AI Cold Outreach with Human Approval",
      cover: "assets/covers/cold-outreach.webp",
      platform: "Email + LinkedIn",
      cat: "content",
      summary: "Personalised email and LinkedIn drafts for every lead land in a review sheet. Only the rows you approve get sent, a few at a time, and no address is emailed twice.",
      points: [
        "Workflow 1: a form takes a row range and the offer details, reads leads from Google Sheets, and drafts a personalised email and LinkedIn message for each lead with OpenAI (structured output, auto-fix, retries).",
        "Drafts land in a new, formatted review spreadsheet with approval dropdowns, so a human approves every message before it goes out.",
        "Workflow 2 runs every 15 minutes. It sends only Approved emails through Gmail (max 12 per run, 40 seconds apart), never emails the same address twice, and marks each row Sent, Rejected or Failed.",
      ],
      stack: ["n8n Forms", "OpenAI", "Google Sheets", "Gmail", "Rate limiting"],
      shots: [
        { src: img("outreach-drafts"), label: "Workflow 1 · generate drafts" },
        { src: img("outreach-send"), label: "Workflow 2 · send approved emails" },
      ],
      nodes: "2 workflows",
    },
    {
      title: "AI Gmail Inbox Assistant with RAG Replies",
      cover: "assets/covers/gmail-assistant.webp",
      platform: "Gmail + Pinecone",
      cat: "agents",
      summary: "Classifies and routes every new email, then drafts grounded replies to professional enquiries from a Pinecone knowledge base.",
      points: [
        "New emails are classified by an AI text classifier (Primary, Social, Promotions), labelled and routed: marked as read, forwarded or archived by category.",
        "A second classifier decides whether an email needs a reply. A retrieval-augmented agent backed by a Pinecone vector store of the owner's profile drafts grounded answers to professional and recruiter enquiries.",
        "Replies are either sent automatically or saved as Gmail drafts for review, using structured JSON output for reliable subject and body generation.",
      ],
      stack: ["Gmail", "Text Classifier", "Pinecone", "OpenAI", "RAG"],
      shots: [{ src: img("gmail-assistant"), label: "Inbox assistant workflow" }],
      nodes: "27 nodes",
      folder: "Gmail Inbox Assistant",
    },
    {
      title: "Invoice & Receipt Processing with AI OCR",
      platform: "Google Drive",
      cat: "data",
      result: "2 hours → 10 minutes",
      summary: "Drop an invoice into a Drive folder. A vision LLM reads the fields, logs them to a sheet and files the document.",
      points: [
        "Dropping an invoice or receipt into a watched Google Drive folder starts the workflow.",
        "A vision-capable LLM extracts structured fields (date, invoice number, supplier, tax, total, expense category, payment method), which are logged to a Google Sheet.",
        "The file is renamed to a consistent convention and moved to a Processed folder. If extraction fails, the file goes to an Error folder.",
      ],
      stack: ["Google Drive", "Vision LLM", "Gemini API", "Google Sheets"],
      shots: [{ src: img("invoice-ocr"), label: "Invoice processing workflow" }],
      nodes: "10 nodes",
      folder: "Invoice Processing Automation",
      cover: "assets/covers/invoice-ocr.webp",
    },
    {
      title: "RAG Recruitment Assistant",
      cover: "assets/covers/rag-recruitment.webp",
      platform: "Pinecone knowledge base",
      cat: "agents",
      summary: "A chat agent that answers recruiter questions only from a Pinecone knowledge base, and says so plainly when the answer isn't there.",
      points: [
        "A chat agent that answers recruiter questions about a candidate's profile, skills, projects and certifications.",
        "Before every answer it searches a Pinecone vector store (OpenAI embeddings) and answers only from what it finds in the CV.",
        "Window memory keeps multi-turn conversations coherent, and the agent clearly says when information is not in the knowledge base.",
      ],
      stack: ["n8n Chat", "Pinecone", "OpenAI Embeddings", "Window memory"],
      shots: [{ src: img("rag-recruitment"), label: "RAG agent" }],
      nodes: "6 nodes",
    },
  ];

  /* ---------- helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const arrow = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 10h10m-4-4 4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ---------- render grid ---------- */
  const grid = $("#projects");

  function render(filter = "all") {
    const list = PROJECTS.map((p, i) => ({ ...p, i })).filter((p) => filter === "all" || p.cat === filter);
    grid.innerHTML = list
      .map((p, k) => {
        const feature = filter === "all" && p.feature;
        const shot = p.shots[0];
        return `
        <button class="card${feature ? " card--feature" : ""}" type="button" data-i="${p.i}" style="animation-delay:${k * 45}ms" aria-label="${esc(p.title)}: view details">
          <div class="card__media${p.cover ? " card__media--cover" : ""}">
            <span class="card__num">${String(p.i + 1).padStart(2, "0")}</span>
            ${p.result ? `<span class="card__result">${esc(p.result)}</span>` : ""}
            <img src="${p.cover || shot.src}" alt="" loading="lazy" decoding="async" />
          </div>
          <div class="card__body">
            <span class="card__cat">${esc(CATS[p.cat])} · ${esc(p.platform)}</span>
            <h3 class="card__title">${esc(p.title)}</h3>
            <p class="card__sum">${esc(p.summary)}</p>
            <div class="card__foot">
              <ul class="tags">${p.stack.slice(0, feature ? 5 : 3).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
              <span class="card__more" aria-hidden="true">${arrow}</span>
            </div>
          </div>
        </button>`;
      })
      .join("");
  }

  render();

  /* ---------- filters ---------- */
  $$(".filter").forEach((btn) =>
    btn.addEventListener("click", () => {
      $$(".filter").forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-selected", b === btn ? "true" : "false");
      });
      render(btn.dataset.filter);
    })
  );

  /* ---------- modal ---------- */
  const modal = $("#modal");
  const body = $("#modal-body");
  let lastFocus = null;

  function open(i) {
    const p = PROJECTS[i];
    body.innerHTML = `
      <div class="modal__shots">
        ${[...(p.cover ? [{ src: p.cover, label: "Project overview" }] : []), ...p.shots]
          .map(
            (s) => `<a class="modal__shot" href="${s.src}" target="_blank" rel="noopener" title="Open full-size canvas">
              <img src="${s.src}" alt="n8n workflow canvas: ${esc(s.label)}" />
              <span>${esc(s.label)} ↗</span></a>`
          )
          .join("")}
      </div>
      <div class="modal__content">
        <div>
          <span class="card__cat">Project ${String(i + 1).padStart(2, "0")} · ${esc(CATS[p.cat])}</span>
          <h2 id="modal-title">${esc(p.title)}</h2>
          <ul class="modal__points">${p.points.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        </div>
        <aside class="modal__aside">
          ${p.result ? `<div><h3 class="mini">Result</h3><p class="modal__result">${esc(p.result)}</p></div>` : ""}
          <div><h3 class="mini">Stack</h3><ul class="tags">${p.stack.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>
          <div><h3 class="mini">Size</h3><p class="modal__meta">${esc(p.nodes)} · ${esc(p.platform)}</p></div>
          ${p.folder ? `<div class="hero__ctas" style="margin-top:4px"><a class="btn btn--ghost btn--sm" href="${repo(p.folder)}" target="_blank" rel="noopener">View on GitHub ↗</a></div>` : ""}
        </aside>
      </div>`;
    lastFocus = document.activeElement;
    modal.showModal();
    $(".modal__inner", modal).scrollTop = 0;
    $("[data-close]", modal).focus();
  }

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) open(Number(card.dataset.i));
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.closest("[data-close]")) modal.close();
  });
  modal.addEventListener("close", () => lastFocus && lastFocus.focus());

  /* ---------- nav state ---------- */
  const nav = $(".nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const links = $$(".nav__links a");
  const spy = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (en.isIntersecting) links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id));
      }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  ["work", "services", "process", "about"].forEach((id) => spy.observe(document.getElementById(id)));

  /* ---------- "Email Me": address assembled at click time, never shown on the page ---------- */
  const mail = ["taher.advisor", "gmail.com"].join("@");
  $$("[data-mail]").forEach((a) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "mailto:" + mail + "?subject=" + encodeURIComponent("Automation project enquiry");
    })
  );

  /* ---------- "Copy address" on the email card (address never rendered) ---------- */
  const toast = $(".toast");
  let toastTimer;
  $$("[data-copy-mail]").forEach((btn) =>
    btn.addEventListener("click", async () => {
      const label = $("[data-copy-label]", btn);
      try {
        await navigator.clipboard.writeText(mail);
        label.textContent = "Copied";
        btn.classList.add("is-done");
        if (toast) {
          toast.hidden = false;
          clearTimeout(toastTimer);
          toastTimer = setTimeout(() => (toast.hidden = true), 2200);
        }
      } catch {
        window.location.href = "mailto:" + mail; // clipboard blocked: fall back to opening the mail app
      }
      setTimeout(() => {
        label.textContent = "Copy address";
        btn.classList.remove("is-done");
      }, 2200);
    })
  );

  /* ---------- "Book a call" ---------- */
  const calendarInviteUrl = () => {
    // Default slot: next weekday at 11:00 local time, 30 minutes. The visitor can change it before saving.
    const d = new Date();
    d.setDate(d.getDate() + 1);
    while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
    d.setHours(11, 0, 0, 0);
    const end = new Date(d.getTime() + 30 * 60000);
    const fmt = (x) => x.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const q = new URLSearchParams({
      action: "TEMPLATE",
      text: "Discovery call with Taher Rampurawala (AI Automation)",
      dates: `${fmt(d)}/${fmt(end)}`,
      details:
        "Free 30-minute call to walk through your process and how it could be automated with n8n and AI agents.\n\n" +
        "Please add Google Meet (\"Add Google Meet video conferencing\") and a short note about what you'd like to automate.",
      add: mail,
      location: "Google Meet",
    });
    return "https://calendar.google.com/calendar/render?" + q.toString();
  };

  $$("[data-book]").forEach((a) => {
    a.target = "_blank";
    a.rel = "noopener";
    a.href = BOOK_CALL_URL || calendarInviteUrl();
    a.title = BOOK_CALL_URL ? "Pick a time on my calendar" : "Opens Google Calendar with an invite to Taher";
  });

  /* ---------- contact form ---------- */
  const form = $("#contact-form");
  if (form) {
    const status = $(".form__status", form);
    const submitBtn = $("button[type=submit]", form);
    const setStatus = (text, kind = "") => {
      status.textContent = text;
      status.className = "form__status" + (kind ? " is-" + kind : "");
    };
    const checks = {
      name: (v) => (v.trim().length >= 2 ? "" : "Please enter your name."),
      email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Please enter a valid email address."),
      message: (v) => (v.trim().length >= 10 ? "" : "Please add a few words about what you need."),
    };
    const validate = (el) => {
      const fn = checks[el.name];
      if (!fn) return true;
      const msg = fn(el.value);
      const field = el.closest(".field");
      field.classList.toggle("is-invalid", !!msg);
      $(".field__err", field).textContent = msg;
      el.setAttribute("aria-invalid", msg ? "true" : "false");
      return !msg;
    };
    Object.keys(checks).forEach((n) => {
      const el = form.elements[n];
      el.addEventListener("blur", () => validate(el));
      el.addEventListener("input", () => el.closest(".field").classList.contains("is-invalid") && validate(el));
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const invalid = Object.keys(checks).map((n) => form.elements[n]).filter((el) => !validate(el));
      if (invalid.length) {
        invalid[0].focus();
        setStatus("Please fix the highlighted fields.", "err");
        return;
      }
      if (form.elements.website.value) return; // spam trap filled: silently drop

      const data = {
        name: form.elements.name.value.trim(),
        email: form.elements.email.value.trim(),
        company: form.elements.company.value.trim(),
        topic: (form.querySelector("input[name=topic]:checked") || {}).value || "Not sure yet",
        message: form.elements.message.value.trim(),
        page: location.href,
        sentAt: new Date().toISOString(),
      };

      if (!FORM_ENDPOINT) {
        const body =
          `${data.message}\n\n— ${data.name}\n${data.email}` + (data.company ? `\n${data.company}` : "") + `\nTopic: ${data.topic}`;
        window.location.href =
          "mailto:" + mail + "?subject=" + encodeURIComponent(`${data.topic} · enquiry from ${data.name}`) + "&body=" + encodeURIComponent(body);
        setStatus("Your email app should open with the message ready to send.", "ok");
        return;
      }

      submitBtn.disabled = true;
      setStatus("Sending…");
      try {
        const res = await fetch(FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error(res.status);
        form.reset();
        setStatus("Thanks! Your message is on its way. I'll reply by email.", "ok");
      } catch {
        setStatus("Couldn't send right now. Please use “Email me” on the right instead.", "err");
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  /* ---------- reveal on scroll ---------- */
  const revealEls = $$(".section__head, .caps li, .steps li, .principles > div, .about__intro, .about__side, .contact .panel");
  revealEls.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      }),
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));

  $("#year").textContent = new Date().getFullYear();
})();
