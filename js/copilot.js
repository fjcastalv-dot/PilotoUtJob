/**
 * BOLSA DE TRABAJO - UNIVERSIDAD TECNOLÓGICA DE CANCÚN (UT Cancún)
 * copilot.js - Lógica interactiva del Widget "Copiloto Laboral UT"
 * 
 * Asistente conversacional inteligente que apoya al estudiante con:
 * - /optimizar-cv : Guía y estructuración de CV de alto impacto
 * - /simular-entrevista : Simulación de entrevista situacional interactiva con feedback
 * - /ayuda-plataforma : Dudas frecuentes de estadías, IMSS y trámites UT
 */

class UtcCopilot {
  constructor() {
    this.isOpen = false;
    this.currentInterviewState = null; // Guarda el progreso si está en /simular-entrevista
    this.initElements();
    this.bindEvents();
    this.renderWelcome();
  }

  initElements() {
    this.bubbleBtn = document.getElementById("copilot-bubble-btn");
    this.chatWindow = document.getElementById("copilot-chat-window");
    this.closeBtn = document.getElementById("copilot-close-btn");
    this.messagesContainer = document.getElementById("copilot-messages");
    this.inputForm = document.getElementById("copilot-form");
    this.inputField = document.getElementById("copilot-input");
    this.badgeNotice = document.getElementById("copilot-badge-notice");
  }

  bindEvents() {
    if (this.bubbleBtn) {
      this.bubbleBtn.addEventListener("click", () => this.toggleChat());
    }
    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.closeChat());
    }
    if (this.inputForm) {
      this.inputForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleUserSubmit();
      });
    }

    // Delegación de eventos para botones de acción rápida dentro del chat
    if (this.messagesContainer) {
      this.messagesContainer.addEventListener("click", (e) => {
        const cmdBtn = e.target.closest("[data-copilot-cmd]");
        if (cmdBtn) {
          const cmd = cmdBtn.getAttribute("data-copilot-cmd");
          this.executeCommand(cmd);
        }
      });
    }
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.chatWindow.classList.remove("hidden");
      if (this.badgeNotice) this.badgeNotice.classList.add("hidden");
      if (window.lucide) lucide.createIcons();
      setTimeout(() => this.inputField.focus(), 150);
      this.scrollToBottom();
    } else {
      this.chatWindow.classList.add("hidden");
    }
  }

  closeChat() {
    this.isOpen = false;
    this.chatWindow.classList.add("hidden");
  }

  scrollToBottom() {
    if (this.messagesContainer) {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
  }

  appendMessage(sender, htmlContent) {
    const isBot = sender === "bot";
    const msgDiv = document.createElement("div");
    msgDiv.className = `flex items-start gap-2.5 mb-3 ${isBot ? "" : "flex-row-reverse"}`;

    const avatarHtml = isBot
      ? `<div class="w-8 h-8 rounded-full bg-[#006837] text-white flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0">
           <i data-lucide="bot" class="w-4 h-4"></i>
         </div>`
      : `<div class="w-8 h-8 rounded-full bg-[#F39200] text-white flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0">
           <i data-lucide="user" class="w-4 h-4"></i>
         </div>`;

    const bubbleClasses = isBot
      ? "bg-white text-slate-800 border border-slate-200 rounded-2xl rounded-tl-none p-3.5 shadow-sm text-sm"
      : "bg-[#006837] text-white rounded-2xl rounded-tr-none p-3.5 shadow-sm text-sm";

    msgDiv.innerHTML = `
      ${avatarHtml}
      <div class="max-w-[82%] ${bubbleClasses}">
        ${htmlContent}
      </div>
    `;

    this.messagesContainer.appendChild(msgDiv);
    if (window.lucide) lucide.createIcons();
    this.scrollToBottom();
  }

  renderWelcome() {
    const welcomeHtml = `
      <p class="font-bold text-[#006837] mb-1 flex items-center gap-1.5">
        <i data-lucide="sparkles" class="w-4 h-4 text-[#F39200]"></i> ¡Hola! Soy tu Copiloto Laboral UT
      </p>
      <p class="text-xs text-slate-600 mb-2 leading-relaxed">
        Estoy entrenado para potenciar tu empleabilidad en Cancún y la Riviera Maya. Puedes seleccionar un comando rápido o escribirme cualquier duda:
      </p>
      <div class="flex flex-col gap-1.5 mt-2">
        <button data-copilot-cmd="/optimizar-cv" class="text-left text-xs bg-emerald-50 hover:bg-emerald-100 text-[#006837] px-2.5 py-1.5 rounded-lg border border-emerald-200 font-medium transition flex items-center justify-between">
          <span>📄 <strong>/optimizar-cv</strong> - Guía para CV de impacto</span>
          <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
        </button>
        <button data-copilot-cmd="/simular-entrevista" class="text-left text-xs bg-amber-50 hover:bg-amber-100 text-[#92400E] px-2.5 py-1.5 rounded-lg border border-amber-200 font-medium transition flex items-center justify-between">
          <span>🎯 <strong>/simular-entrevista</strong> - Práctica interactiva STAR</span>
          <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
        </button>
        <button data-copilot-cmd="/ayuda-plataforma" class="text-left text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-300 font-medium transition flex items-center justify-between">
          <span>❓ <strong>/ayuda-plataforma</strong> - Estadías, Seguro IMSS y fechas</span>
          <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    `;
    this.appendMessage("bot", welcomeHtml);
  }

  handleUserSubmit() {
    const text = this.inputField.value.trim();
    if (!text) return;

    this.appendMessage("user", text);
    this.inputField.value = "";

    // Si el usuario está en el flujo interactivo de entrevista simulada
    if (this.currentInterviewState && this.currentInterviewState.waitingForAnswer) {
      this.evaluateInterviewAnswer(text);
      return;
    }

    // Comandos directos o lenguaje natural
    const lower = text.toLowerCase();
    if (lower.startsWith("/optimizar-cv") || lower.includes("cv") || lower.includes("curriculum")) {
      this.executeCommand("/optimizar-cv");
    } else if (lower.startsWith("/simular-entrevista") || lower.includes("entrevista")) {
      this.executeCommand("/simular-entrevista");
    } else if (lower.startsWith("/ayuda-plataforma") || lower.includes("estadía") || lower.includes("imss") || lower.includes("tramite")) {
      this.executeCommand("/ayuda-plataforma");
    } else {
      this.handleGeneralQuery(text);
    }
  }

  executeCommand(cmd) {
    if (cmd === "/optimizar-cv") {
      const responseHtml = `
        <div class="space-y-2">
          <p class="font-bold text-[#006837] text-xs uppercase tracking-wider flex items-center gap-1">
            <i data-lucide="file-check" class="w-4 h-4"></i> Claves para un CV Exitoso en UT Cancún
          </p>
          <ul class="text-xs space-y-1.5 text-slate-700 list-disc list-inside">
            <li><strong>Encabezado Limpio:</strong> Nombre completo, carrera en la UT Cancún, teléfono WhatsApp, enlace a LinkedIn y correo institucional. (No incluyas dirección completa por seguridad LFPDPPP).</li>
            <li><strong>Proyectos de Estadía y Materias Clave:</strong> Si no tienes experiencia formal previa, detalla proyectos integradores de cuatrimestres anteriores (tecnologías, logros y resultados).</li>
            <li><strong>Verbos de Acción en Resultados:</strong> Usa verbos en primera persona como: <em>"Diseñé", "Automaticé", "Coordiné", "Reduje tiempos en 25%"</em> en lugar de frases pasivas como <em>"Estuve a cargo de"</em>.</li>
            <li><strong>Idiomas y Certificaciones:</strong> Para empresas de Cancún (Xcaret, Hotelería, Tech), especifica tu nivel de inglés con escala MCER (ej. B2 Conversacional).</li>
          </ul>
          <div class="pt-2 border-t border-slate-100 flex gap-2">
            <button onclick="window.print()" class="text-xs bg-[#006837] text-white px-3 py-1.5 rounded-md hover:bg-[#004d28] transition flex items-center gap-1 font-medium">
              <i data-lucide="printer" class="w-3.5 h-3.5"></i> Imprimir / Guardar Guía
            </button>
            <button data-copilot-cmd="/simular-entrevista" class="text-xs bg-amber-500 text-white px-3 py-1.5 rounded-md hover:bg-amber-600 transition flex items-center gap-1 font-medium">
              <i data-lucide="target" class="w-3.5 h-3.5"></i> Simular Entrevista
            </button>
          </div>
        </div>
      `;
      this.appendMessage("bot", responseHtml);
    } else if (cmd === "/simular-entrevista") {
      this.startInterviewSimulation();
    } else if (cmd === "/ayuda-plataforma") {
      const helpHtml = `
        <div class="space-y-2">
          <p class="font-bold text-[#006837] text-xs uppercase tracking-wider flex items-center gap-1">
            <i data-lucide="help-circle" class="w-4 h-4"></i> Trámites y Estadías Profesionales UT
          </p>
          <div class="text-xs space-y-1.5 text-slate-700">
            <div class="bg-slate-50 p-2 rounded border border-slate-200">
              <strong>📅 Periodo de Estadías:</strong> Se cursan en 6° Cuatrimestre (TSU) y en 11° Cuatrimestre (Ingeniería / Licenciatura). Son 600 horas de inmersión total en empresa.
            </div>
            <div class="bg-slate-50 p-2 rounded border border-slate-200">
              <strong>🏥 Seguro Facultativo IMSS:</strong> Obligatorio para realizar estadía. Debes tramitar tu Número de Seguridad Social (NSS) y estar dado de alta como alumno activo.
            </div>
            <div class="bg-slate-50 p-2 rounded border border-slate-200">
              <strong>📝 Carta de Presentación:</strong> La expide el Depto. de Prácticas y Estadías de tu División Académica una vez acordada la vacante con la empresa aliada.
            </div>
          </div>
          <p class="text-[11px] text-slate-500 italic mt-1">Contacto de Vinculación UT Cancún: vinculacion@utcancun.edu.mx</p>
        </div>
      `;
      this.appendMessage("bot", helpHtml);
    }
  }

  startInterviewSimulation() {
    this.currentInterviewState = {
      step: 1,
      waitingForAnswer: true,
      role: "Desarrollador / Profesional UT",
      question: "Cuéntame sobre una ocasión durante tu carrera o en un proyecto en la UT Cancún donde enfrentaste un obstáculo técnico o de equipo complejo. ¿Cómo lo resolviste y cuál fue el resultado?"
    };

    const simulationPrompt = `
      <div class="space-y-2">
        <span class="inline-block bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
          Simulador STAR Interactivo
        </span>
        <p class="text-xs font-semibold text-slate-800">
          Pregunta de Entrevista Situacional:
        </p>
        <blockquote class="text-xs italic bg-amber-50 p-2.5 rounded-lg border-l-4 border-amber-500 text-slate-700">
          "${this.currentInterviewState.question}"
        </blockquote>
        <p class="text-[11px] text-slate-600">
          ✍️ <strong>Escribe tu respuesta aquí abajo</strong> aplicando el método STAR (Situación, Tarea, Acción que realizaste y Resultado obtenido) para darte retroalimentación inmediata.
        </p>
      </div>
    `;
    this.appendMessage("bot", simulationPrompt);
  }

  evaluateInterviewAnswer(userAnswer) {
    this.currentInterviewState.waitingForAnswer = false;

    // Análisis básico de la longitud y estructura de la respuesta
    const wordCount = userAnswer.trim().split(/\s+/).length;
    let score = 8;
    let feedbackTips = [];

    if (wordCount < 15) {
      score = 5;
      feedbackTips.push("Tu respuesta fue muy breve. En una entrevista laboral en Cancún, los reclutadores buscan ejemplos detallados y evidencia tangible.");
    } else {
      score = 9;
      feedbackTips.push("¡Excelente desglose contextual! Explicaste la situación con claridad.");
    }

    if (!userAnswer.toLowerCase().includes("resultado") && !userAnswer.toLowerCase().includes("logr") && !userAnswer.toLowerCase().includes("aprend")) {
      feedbackTips.push("Te sugerimos reforzar el <strong>Resultado</strong>: menciona qué aprendió el equipo, si redujeron tiempos, entregaron a tiempo o mejoraron el producto.");
    } else {
      feedbackTips.push("Mencionaste el impacto o resultado final, lo cual demuestra orientación al logro.");
    }

    const feedbackHtml = `
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-[#006837] uppercase flex items-center gap-1">
            <i data-lucide="award" class="w-4 h-4 text-amber-500"></i> Evaluación de tu Respuesta
          </span>
          <span class="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
            ${score}/10 Puntos
          </span>
        </div>
        <ul class="text-xs space-y-1 text-slate-700 list-disc list-inside">
          ${feedbackTips.map(t => `<li>${t}</li>`).join("")}
        </ul>
        <div class="bg-emerald-50 p-2 rounded-lg border border-emerald-200 text-xs text-emerald-900 mt-2">
          <strong>Tip UT:</strong> Las empresas en Quintana Roo valoran mucho la resiliencia y el trabajo colaborativo multidisciplinario.
        </div>
        <div class="flex gap-2 pt-1">
          <button data-copilot-cmd="/simular-entrevista" class="text-xs bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1 rounded font-medium transition">
            Intentar otra pregunta
          </button>
          <button data-copilot-cmd="/optimizar-cv" class="text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-2.5 py-1 rounded font-medium transition">
            Revisar CV
          </button>
        </div>
      </div>
    `;

    this.appendMessage("bot", feedbackHtml);
    this.currentInterviewState = null; // Reiniciar estado
  }

  handleGeneralQuery(query) {
    const queryLower = query.toLowerCase();
    let reply = "";

    if (queryLower.includes("ingles") || queryLower.includes("idioma")) {
      reply = "El dominio del inglés es uno de los factores más valorados en la zona turística y tecnológica de Cancún (desde B1 en desarrollo de software hasta C1 en hotelería de lujo). En la UT Cancún cuentas con el Centro de Idiomas para validar tu nivel.";
    } else if (queryLower.includes("salario") || queryLower.includes("sueldo") || queryLower.includes("pago")) {
      reply = "En la UT Cancún, las estadías profesionales con empresas aliadas suelen ofrecer becas formativas de entre $6,000 y $9,500 MXN mensuales más prestaciones (transporte/alimentos). Los puestos profesionales para egresados oscilan entre $14,000 y $28,000 MXN según especialidad.";
    } else {
      reply = `He recibido tu mensaje: <em>"${query}"</em>. Recuerda que puedes usar los comandos rápidos como <strong>/optimizar-cv</strong>, <strong>/simular-entrevista</strong> y <strong>/ayuda-plataforma</strong> para entrenarte con herramientas de inserción laboral.`;
    }

    this.appendMessage("bot", `<p class="text-xs text-slate-700 leading-relaxed">${reply}</p>`);
  }
}

// Inicialización global cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  window.utcCopilotInstance = new UtcCopilot();
});
