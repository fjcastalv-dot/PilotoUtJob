/**
 * BOLSA DE TRABAJO - UNIVERSIDAD TECNOLÓGICA DE CANCÚN (UT Cancún)
 * app.js - Controlador Principal, Enrutador de Vistas y Reactividad
 */

// Estado Global de la Aplicación
const appState = {
  currentRole: 'student', // 'student' | 'company'
  user: { ...UTC_DATA.defaultStudent },
  company: { ...UTC_DATA.defaultCompany },
  vacancies: [...UTC_DATA.vacancies],
  candidates: [...UTC_DATA.candidates],
  activeFilter: 'todas', // 'todas' | 'medio_tiempo' | 'estadia' | 'tiempo_completo'
  searchQuery: '',
  appliedVacancies: new Set()
};

// ==========================================================================
// INICIALIZACIÓN
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initHeaderRoleSwitcher();
  initOnboardingModal();
  initStudentView();
  initCompanyView();
  initModals();
  renderCurrentView();

  // Inicializar iconos de Lucide
  if (window.lucide) {
    lucide.createIcons();
  }
});

// ==========================================================================
// CONTROL DE VISTAS Y ALTERNANCIA DE ROLES
// ==========================================================================
function initHeaderRoleSwitcher() {
  const btnRoleStudent = document.getElementById('btn-role-student');
  const btnRoleCompany = document.getElementById('btn-role-company');
  const btnChangeProfile = document.getElementById('btn-change-profile');

  if (btnRoleStudent && btnRoleCompany) {
    btnRoleStudent.addEventListener('click', () => switchRole('student'));
    btnRoleCompany.addEventListener('click', () => switchRole('company'));
  }

  if (btnChangeProfile) {
    btnChangeProfile.addEventListener('click', () => {
      openOnboardingModal();
    });
  }
}

function switchRole(newRole) {
  if (appState.currentRole === newRole) return;
  appState.currentRole = newRole;
  renderCurrentView();
}

function renderCurrentView() {
  const studentView = document.getElementById('view-student');
  const companyView = document.getElementById('view-company');
  const btnRoleStudent = document.getElementById('btn-role-student');
  const btnRoleCompany = document.getElementById('btn-role-company');
  const currentRoleBadge = document.getElementById('current-role-badge');

  if (appState.currentRole === 'student') {
    // Transición visual
    studentView.classList.remove('view-hidden');
    studentView.classList.add('view-visible');
    companyView.classList.add('view-hidden');
    companyView.classList.remove('view-visible');

    // Botones Header
    btnRoleStudent.className = "px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 bg-[#006837] text-white shadow-sm";
    btnRoleCompany.className = "px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5";

    if (currentRoleBadge) {
      currentRoleBadge.innerHTML = `<i data-lucide="graduation-cap" class="w-3.5 h-3.5 text-[#F39200]"></i> Modo Estudiante`;
    }

    renderStudentDashboard();
  } else {
    // Vista Empresa
    companyView.classList.remove('view-hidden');
    companyView.classList.add('view-visible');
    studentView.classList.add('view-hidden');
    studentView.classList.remove('view-visible');

    // Botones Header
    btnRoleCompany.className = "px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 bg-[#006837] text-white shadow-sm";
    btnRoleStudent.className = "px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5";

    if (currentRoleBadge) {
      currentRoleBadge.innerHTML = `<i data-lucide="building-2" class="w-3.5 h-3.5 text-[#F39200]"></i> Modo Empresa`;
    }

    renderCompanyDashboard();
  }

  if (window.lucide) lucide.createIcons();
}

// ==========================================================================
// VISTA DEL ESTUDIANTE / EGRESADO
// ==========================================================================
function initStudentView() {
  // Filtros rápidos de vacantes
  const filterBtns = document.querySelectorAll('[data-filter]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-[#006837]', 'text-white');
        b.classList.add('bg-white', 'text-slate-700');
      });
      btn.classList.remove('bg-white', 'text-slate-700');
      btn.classList.add('bg-[#006837]', 'text-white');

      appState.activeFilter = btn.getAttribute('data-filter');
      renderVacanciesList();
    });
  });

  // Búsqueda de vacantes
  const searchInput = document.getElementById('search-vacancies-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      appState.searchQuery = e.target.value.toLowerCase().trim();
      renderVacanciesList();
    });
  }

  // Toggles de Privacidad LFPDPPP
  const toggleWhatsapp = document.getElementById('privacy-toggle-whatsapp');
  const toggleLinkedin = document.getElementById('privacy-toggle-linkedin');
  const inputWhatsapp = document.getElementById('student-whatsapp-input');
  const inputLinkedin = document.getElementById('student-linkedin-input');

  if (toggleWhatsapp) {
    toggleWhatsapp.checked = appState.user.privacyAllowWhatsApp;
    toggleWhatsapp.addEventListener('change', (e) => {
      appState.user.privacyAllowWhatsApp = e.target.checked;
      showToast(e.target.checked ? "WhatsApp habilitado para contacto de empresas aliadas." : "WhatsApp restringido. Las empresas te contactarán por correo institucional.", "info");
      // Sincronizar en el listado de candidatos si el usuario actual es uno de ellos
      syncUserPrivacyToCandidates();
    });
  }

  if (toggleLinkedin) {
    toggleLinkedin.checked = appState.user.privacyShowLinkedIn;
    toggleLinkedin.addEventListener('change', (e) => {
      appState.user.privacyShowLinkedIn = e.target.checked;
      showToast(e.target.checked ? "Enlace de LinkedIn visible en tu perfil público." : "Enlace de LinkedIn oculto.", "info");
      syncUserPrivacyToCandidates();
    });
  }

  if (inputWhatsapp) {
    inputWhatsapp.value = appState.user.whatsapp;
    inputWhatsapp.addEventListener('change', (e) => {
      appState.user.whatsapp = e.target.value.trim();
    });
  }

  if (inputLinkedin) {
    inputLinkedin.value = appState.user.linkedin;
    inputLinkedin.addEventListener('change', (e) => {
      appState.user.linkedin = e.target.value.trim();
    });
  }
}

function syncUserPrivacyToCandidates() {
  // Mantener actualizado el candidato de Javier Castro en el explorador de talento
  const found = appState.candidates.find(c => c.name === appState.user.name);
  if (found) {
    found.privacyAllowWhatsApp = appState.user.privacyAllowWhatsApp;
    found.privacyShowLinkedIn = appState.user.privacyShowLinkedIn;
  }
}

function renderStudentDashboard() {
  // Saludo y Tarjeta de Perfil Estudiantil
  const studentNameEl = document.getElementById('student-profile-name');
  const studentCareerEl = document.getElementById('student-profile-career');
  const studentQuarterEl = document.getElementById('student-profile-quarter');
  const verifiedBadgeContainer = document.getElementById('student-verified-badge-container');
  const smartFilterBanner = document.getElementById('student-smart-filter-banner');

  if (studentNameEl) studentNameEl.textContent = appState.user.name;
  if (studentCareerEl) studentCareerEl.textContent = appState.user.career;
  if (studentQuarterEl) studentQuarterEl.textContent = `${appState.user.quarter} • ${appState.user.matricula}`;

  // Insignia de Egresado UT Verificado
  if (verifiedBadgeContainer) {
    if (appState.user.isGraduate || appState.user.isVerifiedGraduate) {
      verifiedBadgeContainer.innerHTML = `
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold badge-egresado-verificado">
          <i data-lucide="shield-check" class="w-4 h-4"></i>
          <span>Egresado UT Verificado</span>
        </div>
      `;
    } else {
      verifiedBadgeContainer.innerHTML = `
        <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
          <i data-lucide="book-open" class="w-3.5 h-3.5"></i>
          <span>Alumno Regular Activo</span>
        </div>
      `;
    }
  }

  // Filtro Inteligente según Cuatrimestre
  if (smartFilterBanner) {
    let recommendationTitle = "";
    let recommendationDesc = "";
    let recommendationBadge = "";
    let recommendedCategory = "";

    const q = appState.user.quarterNum;
    if (appState.user.isGraduate || q >= 12) {
      recommendationTitle = "Recomendación para Egresados:";
      recommendationDesc = "Se priorizan oportunidades laborales de Tiempo Completo con prestaciones de ley y desarrollo profesional en Quintana Roo.";
      recommendationBadge = "Vacantes de Tiempo Completo";
      recommendedCategory = "tiempo_completo";
    } else if (q >= 9 && q <= 11) {
      recommendationTitle = "Recomendación para Cuatrimestres de Estadía (9° a 11°):";
      recommendationDesc = "Prioridad a Estadías Profesionales de 600 horas. Destacamos vacantes con 'Opción a contratación definitiva' tras concluir tu estadía.";
      recommendationBadge = "Estadías con Contratación";
      recommendedCategory = "estadia";
    } else {
      recommendationTitle = "Recomendación para Cuatrimestres Iniciales e Intermedios (1° a 8°):";
      recommendationDesc = "Prioridad a Vacantes de Medio Tiempo y prácticas formativas con horarios flexibles para que no descuides tus clases en la UT.";
      recommendationBadge = "Medio Tiempo / Prácticas";
      recommendedCategory = "medio_tiempo";
    }

    smartFilterBanner.innerHTML = `
      <div class="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-lg bg-[#006837] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
            <i data-lucide="sparkles" class="w-5 h-5 text-[#F39200]"></i>
          </div>
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-[#006837] flex items-center gap-1.5">
              <span>${recommendationTitle}</span>
              <span class="bg-[#006837] text-white text-[10px] px-2 py-0.5 rounded-full font-medium">${recommendationBadge}</span>
            </h4>
            <p class="text-xs text-slate-600 mt-0.5 leading-relaxed">${recommendationDesc}</p>
          </div>
        </div>
        <button onclick="applySmartFilter('${recommendedCategory}')" class="text-xs bg-white hover:bg-emerald-50 text-[#006837] border border-emerald-300 font-bold px-3 py-2 rounded-lg shadow-sm transition flex items-center gap-1.5 flex-shrink-0">
          <i data-lucide="filter" class="w-3.5 h-3.5"></i> Aplicar Filtro Recomendado
        </button>
      </div>
    `;
  }

  renderVacanciesList();
}

window.applySmartFilter = function(category) {
  const filterBtns = document.querySelectorAll('[data-filter]');
  filterBtns.forEach(btn => {
    if (btn.getAttribute('data-filter') === category) {
      btn.click();
    }
  });
};

// ==========================================================================
// CÁLCULO DE SEMÁFORO DE COMPATIBILIDAD (MATCH SCORING)
// ==========================================================================
function calculateMatchScore(student, vacancy) {
  let score = 40; // Base
  let reasonsMatch = [];
  let reasonsImprove = [];

  // 1. Compatibilidad por Carrera Afín (40 puntos)
  if (vacancy.targetCareer === student.career) {
    score += 40;
    reasonsMatch.push(`Carrera 100% compatible con tu plan de estudios (${student.career}).`);
  } else if (vacancy.targetDivision && vacancy.targetDivision === getDivisionIdByCareer(student.career)) {
    score += 25;
    reasonsMatch.push(`Carrera afín dentro de tu misma División Académica.`);
  } else {
    reasonsImprove.push(`El puesto prioriza perfiles de ${vacancy.targetCareer}, pero tus habilidades transversales te permiten postularte.`);
  }

  // 2. Compatibilidad por Cuatrimestre / Momento Académico (15 puntos)
  const q = student.quarterNum;
  if (vacancy.category === 'estadia' && q >= 9 && q <= 11) {
    score += 15;
    reasonsMatch.push(`Tu cuatrimestre (${student.quarter}) califica exactamente para el periodo oficial de Estadías Profesionales.`);
  } else if (vacancy.category === 'tiempo_completo' && (student.isGraduate || q >= 12)) {
    score += 15;
    reasonsMatch.push(`Cuentas con disponibilidad de tiempo completo requerida para egresados.`);
  } else if (vacancy.category === 'medio_tiempo' && q <= 8) {
    score += 15;
    reasonsMatch.push(`La jornada de medio tiempo es óptima para tus horarios de clase regulares.`);
  } else {
    score += 5;
  }

  // 3. Compatibilidad por Habilidades Técnicas (hasta 15 puntos)
  const studentSkills = student.skills.map(s => s.toLowerCase());
  let matchedSkillsCount = 0;

  vacancy.skillsRequired.forEach(req => {
    const isPresent = studentSkills.some(sk => sk.includes(req.toLowerCase()) || req.toLowerCase().includes(sk));
    if (isPresent) {
      matchedSkillsCount++;
    }
  });

  const skillBonus = Math.min(15, Math.round((matchedSkillsCount / Math.max(1, vacancy.skillsRequired.length)) * 15));
  score += skillBonus;

  if (matchedSkillsCount > 0) {
    reasonsMatch.push(`Cumples con ${matchedSkillsCount} de las habilidades técnicas requeridas.`);
  }

  // Habilidades recomendadas a reforzar
  vacancy.recommendedSkills.forEach(recSkill => {
    reasonsImprove.push(`Habilidad sugerida a reforzar: <strong>${recSkill}</strong>.`);
  });

  // Limitar entre 45 y 98%
  const finalScore = Math.min(98, Math.max(45, score));

  return {
    score: finalScore,
    reasonsMatch,
    reasonsImprove
  };
}

function getDivisionIdByCareer(careerName) {
  for (const div of UTC_DATA.divisions) {
    if (div.careers.includes(careerName)) return div.id;
  }
  return null;
}

// ==========================================================================
// RENDERIZADO DEL DIRECTORIO DE VACANTES
// ==========================================================================
function renderVacanciesList() {
  const container = document.getElementById('vacancies-container');
  const countEl = document.getElementById('vacancies-count-badge');
  if (!container) return;

  // Filtrado
  let filtered = appState.vacancies.filter(vac => {
    // Filtro por categoría
    if (appState.activeFilter !== 'todas') {
      if (appState.activeFilter === 'estadia' && vac.category !== 'estadia') return false;
      if (appState.activeFilter === 'medio_tiempo' && vac.category !== 'medio_tiempo') return false;
      if (appState.activeFilter === 'tiempo_completo' && vac.category !== 'tiempo_completo') return false;
    }

    // Búsqueda por texto
    if (appState.searchQuery) {
      const q = appState.searchQuery;
      const matchTitle = vac.title.toLowerCase().includes(q);
      const matchComp = vac.company.toLowerCase().includes(q);
      const matchCarr = vac.targetCareer.toLowerCase().includes(q);
      const matchLoc = vac.locationZone.toLowerCase().includes(q);
      if (!matchTitle && !matchComp && !matchCarr && !matchLoc) return false;
    }

    return true;
  });

  if (countEl) countEl.textContent = `${filtered.length} vacantes disponibles`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full bg-white rounded-xl border border-slate-200 p-8 text-center">
        <div class="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
          <i data-lucide="search-x" class="w-6 h-6"></i>
        </div>
        <h4 class="font-bold text-slate-700 text-sm">No se encontraron vacantes con los criterios seleccionados</h4>
        <p class="text-xs text-slate-500 mt-1">Prueba cambiando el filtro rápido o limpiando la barra de búsqueda.</p>
        <button onclick="applySmartFilter('todas')" class="mt-4 text-xs font-semibold bg-[#006837] text-white px-4 py-2 rounded-lg hover:bg-[#004d28] transition">
          Ver todas las vacantes
        </button>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  container.innerHTML = filtered.map(vac => {
    const match = calculateMatchScore(appState.user, vac);
    const isApplied = appState.appliedVacancies.has(vac.id);

    // Color del semáforo según porcentaje
    let badgeColorClass = "bg-emerald-100 text-[#006837] border-emerald-300";
    let badgeIcon = "sparkles";
    if (match.score < 70) {
      badgeColorClass = "bg-amber-100 text-amber-800 border-amber-300";
      badgeIcon = "alert-circle";
    }

    return `
      <div class="job-card bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between shadow-sm relative">
        ${vac.hireProjection ? `
          <div class="absolute -top-2.5 right-4 hiring-projection-badge text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
            <i data-lucide="zap" class="w-3 h-3 text-[#D97706]"></i> Opción a Contratación Definitiva
          </div>
        ` : ''}

        <div>
          <!-- Header de la tarjeta -->
          <div class="flex items-start gap-3 mb-3">
            <img src="${vac.logo}" alt="${vac.company}" class="w-12 h-12 rounded-lg object-cover border border-slate-100 shadow-sm flex-shrink-0" />
            <div class="flex-1 pr-14">
              <h3 class="font-bold text-slate-900 text-sm leading-snug line-clamp-2">${vac.title}</h3>
              <p class="text-xs text-slate-600 font-medium mt-0.5 flex items-center gap-1">
                <i data-lucide="building" class="w-3.5 h-3.5 text-slate-400"></i> ${vac.company}
              </p>
            </div>
          </div>

          <!-- Metadatos de la vacante -->
          <div class="flex flex-wrap gap-1.5 mb-3 text-xs">
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
              <i data-lucide="map-pin" class="w-3 h-3 text-slate-500"></i> ${vac.modality}
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-[#006837] font-semibold border border-emerald-100">
              <i data-lucide="clock" class="w-3 h-3"></i> ${vac.type}
            </span>
          </div>

          <!-- Descripción breve y carrera vinculada -->
          <p class="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
            ${vac.description}
          </p>

          <div class="mb-3 text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
            <strong>Carrera UT Afín:</strong> ${vac.targetCareer}
          </div>

          <!-- Requisitos / Habilidades -->
          <div class="mb-4">
            <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Habilidades clave:</p>
            <div class="flex flex-wrap gap-1">
              ${vac.skillsRequired.slice(0, 3).map(sk => `
                <span class="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                  ${sk}
                </span>
              `).join('')}
              ${vac.skillsRequired.length > 3 ? `<span class="text-[11px] text-slate-400 self-center">+${vac.skillsRequired.length - 3} más</span>` : ''}
            </div>
          </div>
        </div>

        <!-- Footer con Semáforo de Compatibilidad y Botón de Postulación -->
        <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          <!-- Botón de Match Scoring con Semáforo Interactivo -->
          <button 
            onclick="openMatchScoreModal('${vac.id}')"
            class="match-score-pill inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold border ${badgeColorClass} shadow-xs"
            title="Haz clic para ver recomendaciones personalizadas de compatibilidad"
          >
            <i data-lucide="${badgeIcon}" class="w-3.5 h-3.5"></i>
            <span>${match.score}% Match</span>
            <i data-lucide="info" class="w-3 h-3 opacity-60"></i>
          </button>

          <!-- Botón de Postulación -->
          ${isApplied ? `
            <button disabled class="text-xs font-bold px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-400 cursor-not-allowed flex items-center gap-1">
              <i data-lucide="check" class="w-3.5 h-3.5"></i> Postulado
            </button>
          ` : `
            <button onclick="applyToVacancy('${vac.id}')" class="text-xs font-bold px-3.5 py-1.5 rounded-lg bg-[#006837] text-white hover:bg-[#004d28] shadow-sm transition flex items-center gap-1">
              <span>Postularme</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </button>
          `}
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

window.applyToVacancy = function(vacId) {
  const vac = appState.vacancies.find(v => v.id === vacId);
  if (!vac) return;

  appState.appliedVacancies.add(vacId);
  renderVacanciesList();

  showToast(`¡Postulación enviada con éxito a ${vac.company}! Tu perfil institucional y datos de contacto han sido remitidos al reclutador.`, "success");
};

// ==========================================================================
// MODAL DE DETALLE DE COMPATIBILIDAD (MATCH SCORING)
// ==========================================================================
window.openMatchScoreModal = function(vacId) {
  const vac = appState.vacancies.find(v => v.id === vacId);
  if (!vac) return;

  const match = calculateMatchScore(appState.user, vac);
  const modal = document.getElementById('match-score-modal');
  const modalContent = document.getElementById('match-score-modal-body');

  modalContent.innerHTML = `
    <div class="p-6">
      <div class="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Desglose de Compatibilidad UT</span>
          <h3 class="font-bold text-slate-900 text-base mt-0.5">${vac.title}</h3>
          <p class="text-xs text-slate-600">${vac.company}</p>
        </div>
        <div class="w-14 h-14 rounded-full bg-emerald-50 border-2 border-[#006837] flex flex-col items-center justify-center flex-shrink-0">
          <span class="text-xs font-extrabold text-[#006837] leading-none">${match.score}%</span>
          <span class="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Match</span>
        </div>
      </div>

      <!-- Factores Positivos -->
      <div class="mt-4">
        <h4 class="text-xs font-bold uppercase tracking-wider text-[#006837] flex items-center gap-1.5 mb-2">
          <i data-lucide="check-circle-2" class="w-4 h-4"></i> Factores a tu favor
        </h4>
        <ul class="space-y-1.5 text-xs text-slate-700 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
          ${match.reasonsMatch.map(r => `
            <li class="flex items-start gap-2">
              <i data-lucide="check" class="w-3.5 h-3.5 text-[#006837] flex-shrink-0 mt-0.5"></i>
              <span>${r}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Recomendaciones Accionables para Reforzar -->
      <div class="mt-4">
        <h4 class="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5 mb-2">
          <i data-lucide="lightbulb" class="w-4 h-4"></i> Recomendaciones para maximizar tu inserción laboral
        </h4>
        <ul class="space-y-1.5 text-xs text-slate-700 bg-amber-50/50 p-3 rounded-lg border border-amber-100">
          ${match.reasonsImprove.map(r => `
            <li class="flex items-start gap-2">
              <i data-lucide="arrow-right-circle" class="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5"></i>
              <span>${r}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Botón de acción con el Copiloto -->
      <div class="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
        <div class="text-xs text-slate-600">
          <strong>¿Deseas entrenar para este puesto?</strong> Usa el Copiloto Laboral UT para simular una entrevista.
        </div>
        <button onclick="triggerCopilotInterviewFor('${vac.title}')" class="text-xs font-bold bg-[#006837] text-white px-3 py-1.5 rounded-lg hover:bg-[#004d28] transition flex items-center gap-1 flex-shrink-0">
          <i data-lucide="bot" class="w-3.5 h-3.5"></i> Simular Entrevista
        </button>
      </div>

      <div class="mt-5 flex justify-end">
        <button onclick="closeModal('match-score-modal')" class="text-xs font-semibold px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 transition">
          Cerrar
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
};

window.triggerCopilotInterviewFor = function(jobTitle) {
  closeModal('match-score-modal');
  if (window.utcCopilotInstance) {
    if (!window.utcCopilotInstance.isOpen) {
      window.utcCopilotInstance.toggleChat();
    }
    window.utcCopilotInstance.executeCommand('/simular-entrevista');
  }
};

// ==========================================================================
// VISTA DE LA EMPRESA / RECLUTADOR
// ==========================================================================
function initCompanyView() {
  // Formulario de publicación de nueva vacante
  const postJobForm = document.getElementById('post-job-form');
  if (postJobForm) {
    postJobForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleCreateVacancy();
    });
  }

  // Filtros del Explorador de Talento UT
  const talentCareerFilter = document.getElementById('filter-talent-career');
  const talentQuarterFilter = document.getElementById('filter-talent-quarter');
  const talentVerifiedOnly = document.getElementById('filter-talent-verified');

  if (talentCareerFilter) talentCareerFilter.addEventListener('change', () => renderTalentExplorer());
  if (talentQuarterFilter) talentQuarterFilter.addEventListener('change', () => renderTalentExplorer());
  if (talentVerifiedOnly) talentVerifiedOnly.addEventListener('change', () => renderTalentExplorer());
}

function renderCompanyDashboard() {
  const companyNameEl = document.getElementById('company-name-display');
  const recruiterNameEl = document.getElementById('company-recruiter-display');

  if (companyNameEl) companyNameEl.textContent = appState.company.name;
  if (recruiterNameEl) recruiterNameEl.textContent = `${appState.company.recruiterName} • ${appState.company.sector}`;

  renderTalentExplorer();
}

function handleCreateVacancy() {
  const title = document.getElementById('job-title-input').value.trim();
  const type = document.getElementById('job-type-input').value;
  const career = document.getElementById('job-career-input').value;
  const modality = document.getElementById('job-modality-input').value;
  const compensation = document.getElementById('job-compensation-input').value.trim();
  const skills = document.getElementById('job-skills-input').value.split(',').map(s => s.trim()).filter(Boolean);
  const hireProjection = document.getElementById('job-hire-projection').checked;
  const description = document.getElementById('job-description-input').value.trim();

  if (!title || !description) {
    showToast("Por favor completa el título y la descripción de la vacante.", "error");
    return;
  }

  let category = "estadia";
  if (type.toLowerCase().includes("medio")) category = "medio_tiempo";
  if (type.toLowerCase().includes("completo")) category = "tiempo_completo";

  const newVacancy = {
    id: `vac-${Date.now()}`,
    title,
    company: appState.company.name,
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=120&auto=format&fit=crop&q=80",
    modality,
    type,
    category,
    targetCareer: career,
    targetDivision: getDivisionIdByCareer(career),
    recommendedQuarter: category === 'estadia' ? [9, 10, 11] : category === 'tiempo_completo' ? ["egresado"] : [3, 4, 5, 6, 7],
    hireProjection,
    compensation: compensation || "$7,500 MXN Apoyo institucional",
    skillsRequired: skills.length ? skills : ["Compromiso", "Trabajo en equipo", "Proactividad"],
    recommendedSkills: ["Inglés intermedio", "Habilidades digitales"],
    description,
    locationZone: modality.includes("Hotelera") ? "Zona Hotelera" : "Cancún Centro",
    postedAt: "Justo ahora",
    featured: hireProjection
  };

  appState.vacancies.unshift(newVacancy);

  // Limpiar formulario y notificar
  document.getElementById('post-job-form').reset();
  showToast("¡Vacante publicada exitosamente! Ya está visible en el directorio de alumnos de la UT Cancún.", "success");

  // Si cambiamos a vista de estudiante, estará disponible de inmediato
}

// ==========================================================================
// EXPLORADOR DE TALENTO UT (DIRECTORIO DE ALUMNOS Y EGRESADOS)
// ==========================================================================
function renderTalentExplorer() {
  const container = document.getElementById('talent-explorer-container');
  const countEl = document.getElementById('talent-count-badge');
  if (!container) return;

  const careerFilter = document.getElementById('filter-talent-career')?.value || 'todas';
  const quarterFilter = document.getElementById('filter-talent-quarter')?.value || 'todos';
  const verifiedOnly = document.getElementById('filter-talent-verified')?.checked || false;

  let filtered = appState.candidates.filter(cand => {
    if (careerFilter !== 'todas' && cand.career !== careerFilter) return false;
    if (quarterFilter === 'egresados' && !cand.isGraduate) return false;
    if (quarterFilter === 'estadias' && (cand.quarterNum < 9 || cand.quarterNum > 11)) return false;
    if (quarterFilter === 'iniciales' && cand.quarterNum > 8) return false;
    if (verifiedOnly && !cand.isVerifiedGraduate) return false;
    return true;
  });

  if (countEl) countEl.textContent = `${filtered.length} perfiles encontrados`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full bg-white rounded-xl border border-slate-200 p-8 text-center">
        <p class="text-xs text-slate-500">No se encontraron candidatos con los filtros seleccionados.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(cand => {
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between shadow-sm hover:border-[#006837] transition">
        <div>
          <!-- Cabecera de Candidato -->
          <div class="flex items-start gap-3 mb-3">
            <img src="${cand.avatar}" alt="${cand.name}" class="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-sm flex-shrink-0" />
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <h4 class="font-bold text-slate-900 text-sm leading-snug">${cand.name}</h4>
              </div>
              <p class="text-xs text-slate-600 font-medium">${cand.career}</p>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-[11px] font-semibold text-[#006837] bg-emerald-50 px-2 py-0.5 rounded">
                  ${cand.quarter}
                </span>
                <span class="text-[11px] font-semibold text-slate-500">
                  Promedio: <strong>${cand.gpa}</strong>
                </span>
              </div>
            </div>
          </div>

          <!-- Insignia de Egresado Verificado si aplica -->
          ${cand.isVerifiedGraduate ? `
            <div class="mb-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold badge-egresado-verificado">
              <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
              <span>Egresado UT Verificado (Validado por UT Cancún)</span>
            </div>
          ` : ''}

          <!-- Bio -->
          <p class="text-xs text-slate-600 mb-3 leading-relaxed">
            "${cand.bio}"
          </p>

          <!-- Habilidades Técnicas -->
          <div class="flex flex-wrap gap-1 mb-4">
            ${cand.skills.map(sk => `
              <span class="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                ${sk}
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Módulo de Contacto Condicionado a Permisos de Privacidad (LFPDPPP) -->
        <div class="pt-3 border-t border-slate-100 space-y-2 mt-auto">
          <!-- WhatsApp directo condicionado -->
          ${cand.privacyAllowWhatsApp ? `
            <a 
              href="https://wa.me/52${cand.whatsapp}?text=Hola%20${encodeURIComponent(cand.name)},%20te%20contactamos%20de%20${encodeURIComponent(appState.company.name)}%20a%20trav%C3%A9s%20de%20la%20Bolsa%20de%20Trabajo%20de%20la%20UT%20Canc%C3%BAn%20para%20una%20oportunidad%20laboral." 
              target="_blank"
              class="w-full text-xs font-bold py-2 px-3 rounded-lg bg-[#25D366] text-white hover:bg-[#1EBE5D] transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <i data-lucide="message-circle" class="w-4 h-4"></i> Contactar por WhatsApp Directo
            </a>
          ` : `
            <div class="w-full text-[11px] py-1.5 px-2.5 rounded-lg bg-slate-100 text-slate-500 border border-slate-200 flex items-center justify-center gap-1" title="El estudiante configuró la privacidad de su número celular">
              <i data-lucide="lock" class="w-3.5 h-3.5 text-slate-400"></i> WhatsApp restringido por el alumno
            </div>
          `}

          <div class="flex gap-2">
            <!-- Correo institucional siempre disponible para empresas validadas -->
            <a 
              href="mailto:${cand.email}?subject=Contacto%20Laboral%20UT%20Cancun%20-%20${encodeURIComponent(appState.company.name)}"
              class="flex-1 text-xs font-semibold py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center justify-center gap-1 text-center"
            >
              <i data-lucide="mail" class="w-3.5 h-3.5"></i> Correo UT
            </a>

            <!-- LinkedIn condicionado -->
            ${cand.privacyShowLinkedIn ? `
              <a 
                href="${cand.linkedin}" 
                target="_blank"
                class="text-xs font-semibold py-1.5 px-3 rounded-lg bg-[#0A66C2] hover:bg-[#084e96] text-white transition flex items-center justify-center gap-1"
                title="Ver perfil de LinkedIn"
              >
                <i data-lucide="linkedin" class="w-3.5 h-3.5"></i> LinkedIn
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

// ==========================================================================
// MODAL DE ONBOARDING Y CAMBIO DE PERFIL
// ==========================================================================
function initOnboardingModal() {
  const modal = document.getElementById('onboarding-modal');
  const roleRadioStudent = document.getElementById('onboard-role-student');
  const roleRadioCompany = document.getElementById('onboard-role-company');
  const formStudent = document.getElementById('onboard-form-student');
  const formCompany = document.getElementById('onboard-form-company');
  const divisionSelect = document.getElementById('onboard-student-division');
  const careerSelect = document.getElementById('onboard-student-career');

  // Llenar carreras dinámicamente según división
  if (divisionSelect && careerSelect) {
    divisionSelect.addEventListener('change', () => {
      const selectedDiv = UTC_DATA.divisions.find(d => d.id === divisionSelect.value);
      careerSelect.innerHTML = selectedDiv
        ? selectedDiv.careers.map(c => `<option value="${c}">${c}</option>`).join('')
        : '<option value="">Selecciona primero una división</option>';
    });
  }

  // Alternar formulario según opción A o B
  if (roleRadioStudent && roleRadioCompany) {
    roleRadioStudent.addEventListener('change', () => {
      formStudent.classList.remove('hidden');
      formCompany.classList.add('hidden');
    });
    roleRadioCompany.addEventListener('change', () => {
      formCompany.classList.remove('hidden');
      formStudent.classList.add('hidden');
    });
  }

  // Guardar datos de Estudiante
  const submitStudentBtn = document.getElementById('btn-save-onboard-student');
  if (submitStudentBtn) {
    submitStudentBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.getElementById('onboard-student-name').value.trim();
      const matricula = document.getElementById('onboard-student-matricula').value.trim();
      const career = document.getElementById('onboard-student-career').value;
      const quarterValue = document.getElementById('onboard-student-quarter').value;

      if (!name || !career) {
        showToast("Por favor completa tu nombre y carrera.", "error");
        return;
      }

      const isGrad = quarterValue === 'egresado';
      const qNum = isGrad ? 12 : parseInt(quarterValue, 10);

      appState.user.name = name;
      appState.user.matricula = matricula || "21040000";
      appState.user.career = career;
      appState.user.quarterNum = qNum;
      appState.user.isGraduate = isGrad;
      appState.user.isVerifiedGraduate = isGrad;
      appState.user.quarter = isGrad ? "Egresado Titulado" : `${qNum}° Cuatrimestre`;

      closeModal('onboarding-modal');
      switchRole('student');
      showToast(`¡Bienvenido(a), ${name}! Tu perfil ha sido configurado.`, "success");
    });
  }

  // Guardar datos de Empresa
  const submitCompanyBtn = document.getElementById('btn-save-onboard-company');
  if (submitCompanyBtn) {
    submitCompanyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const companyName = document.getElementById('onboard-company-name').value.trim();
      const rfc = document.getElementById('onboard-company-rfc').value.trim();
      const sector = document.getElementById('onboard-company-sector').value;
      const recruiter = document.getElementById('onboard-company-recruiter').value.trim();

      if (!companyName || !recruiter) {
        showToast("Por favor completa el nombre de la empresa y del reclutador.", "error");
        return;
      }

      appState.company.name = companyName;
      appState.company.rfc = rfc || "RFC990101ABC";
      appState.company.sector = sector;
      appState.company.recruiterName = recruiter;

      closeModal('onboarding-modal');
      switchRole('company');
      showToast(`¡Bienvenido(a), ${recruiter}! Tu espacio corporativo está listo.`, "success");
    });
  }
}

window.openOnboardingModal = function() {
  const modal = document.getElementById('onboarding-modal');
  if (modal) modal.classList.remove('hidden');
};

// ==========================================================================
// MODALES Y TOAST HELPERS
// ==========================================================================
function initModals() {
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close-modal');
      closeModal(modalId);
    });
  });
}

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('hidden');
};

function showToast(message, type = "info") {
  const toast = document.createElement('div');
  let bgClass = "bg-slate-900 text-white";
  let iconName = "info";

  if (type === "success") {
    bgClass = "bg-[#006837] text-white";
    iconName = "check-circle";
  } else if (type === "error") {
    bgClass = "bg-rose-600 text-white";
    iconName = "alert-octagon";
  }

  toast.className = `fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-medium transition transform duration-300 translate-y-[-20px] opacity-0 ${bgClass}`;
  toast.innerHTML = `
    <i data-lucide="${iconName}" class="w-4 h-4 flex-shrink-0"></i>
    <span>${message}</span>
  `;

  document.body.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-[-20px]', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-[-20px]');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
