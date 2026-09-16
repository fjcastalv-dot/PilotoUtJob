# 🎓 Bolsa de Trabajo - Universidad Tecnológica de Cancún (UT Cancún)
> Prototipo Web Interactivo (SPA) de Vinculación e Inserción Laboral para Alumnos Activos, Egresados y Empresas de la Región de Cancún y la Riviera Maya.

---

## 📋 Descripción del Proyecto
Este proyecto es una plataforma interactiva tipo **Single Page Application (SPA)** desarrollada con estándares modernos de UI/UX (EdTech y HRTech) para elevar la tasa de inserción laboral de los estudiantes y egresados de la **Universidad Tecnológica de Cancún**.

La plataforma soluciona la desconexión habitual entre la academia y el sector productivo regional (hotelería, turismo, desarrollo de software, mantenimiento y logística), ofreciendo herramientas de **Match Scoring**, privacidad bajo la normativa **LFPDPPP**, un **Explorador de Talento** directo para empresas aliadas y un asistente interactivo inteligente: el **Copiloto Laboral UT**.

---

## 🎨 Identidad Visual y Paleta Institucional (UT Cancún)
- **Verde Institucional UT (Primario):** `#006837`
- **Verde Bosque / Oscuro:** `#004d28`
- **Verde Esmeralda / Acento:** `#008f4c`
- **Naranja / Oro Institucional:** `#F39200` y `#D97706` (Insignias de estadía y contratación)
- **Fondos y Superficies:** Slate neutro `#F8FAFC`, `#FFFFFF`
- **Tipografía:** *Inter*, *system-ui* (Google Fonts)
- **Iconografía:** *Lucide Icons* (vía CDN)

---

## 🚀 Módulos y Funcionalidades Principales

### 1. Onboarding y Selección de Rol (Demostración Rápida)
- **Modal de Selección Inicial:** Permite elegir entre **Estudiante / Egresado** o **Empresa / Reclutador** con formularios adaptativos.
- **Selector Discreto en el Header:** Durante una exposición en clase, puedes alternar de forma inmediata entre la **Vista Estudiante** y la **Vista Empresa** con un solo clic en la barra superior sin recargar la página.

### 2. Vista Estudiante / Egresado (Dashboard del Candidato)
- **Filtro Inteligente por Estatus Académico:**
  - *1° a 8° Cuatrimestre:* Prioridad automática a vacantes de **Medio Tiempo** y prácticas formativas.
  - *9° a 11° Cuatrimestre:* Prioridad a **Estadías Profesionales (600 hrs)** con etiqueta destacada *"Opción a contratación definitiva"*.
  - *Egresados:* Prioridad a ofertas laborales profesionales de **Tiempo Completo**.
- **Directorio de Vacantes con Semáforo de Compatibilidad (Match Scoring):**
  - Cada vacante calcula un porcentaje de afinidad con el perfil del estudiante.
  - Al hacer clic en el indicador de Match (ej. *92% Match*), se despliega un modal con los factores a favor y **recomendaciones accionables** de habilidades a reforzar (ej. *Inglés B2, Git, Excel avanzado*).
- **Módulo de Privacidad y Contacto (LFPDPPP):**
  - Toggles funcionales para permitir o restringir el contacto directo por WhatsApp y la visualización del perfil de LinkedIn, protegiendo los datos del alumno.
- **Insignia "Egresado UT Verificado":**
  - Sello institucional distintivo para candidatos graduados con plan de estudios acreditado.
- **Widget "Copiloto Laboral UT":**
  - Chatbot flotante con comandos interactivos:
    - `/optimizar-cv`: Estructura, verbos de acción y checklist para un CV de impacto.
    - `/simular-entrevista`: Simulador de preguntas situacionales bajo el método STAR con calificación y retroalimentación en tiempo real.
    - `/ayuda-plataforma`: Información sobre Seguro Facultativo IMSS, fechas y trámites de estadía.

### 3. Vista Empresa / Reclutador (Dashboard Corporativo)
- **Publicador Ágil de Vacantes:**
  - Formulario ágil para dar de alta ofertas vinculadas a carreras de la UT Cancún, con opción de marcar proyección a contratación. La vacante se suma en vivo al directorio.
- **Explorador de Talento UT:**
  - Catálogo de alumnos y egresados postulados con filtros por carrera, cuatrimestre y promedio.
  - Visualización del sello "Egresado UT Verificado".
  - **Trato Directo y Privacidad Condicionada:** Si el alumno autorizó el contacto por WhatsApp, se habilita un botón directo con mensaje predefinido; si el alumno lo restringió, la plataforma salvaguarda su número y canaliza por correo institucional.

---

## 📂 Estructura de Archivos
```
bolsa-trabajo-utcancun/
├── index.html                  # Estructura semántica SPA y contenedores
├── css/
│   └── styles.css             # Paleta institucional UT Cancún, animaciones y badges
├── js/
│   ├── data.js                # Catálogo oficial de carreras UT, vacantes regionales y candidatos
│   ├── copilot.js             # Lógica interactiva del Copiloto Laboral UT
│   └── app.js                 # Controlador principal, match scoring y reactividad
├── README.md                  # Documentación del proyecto
├── .gitignore                 # Exclusiones estándar para Git
└── Sincronizar_GitHub.bat      # Script automatizado para subir cambios a GitHub
```

---

## 💻 ¿Cómo ejecutar el proyecto localmente?
1. Abre la carpeta `bolsa-trabajo-utcancun`.
2. Haz **doble clic en `index.html`** para abrirlo en tu navegador web preferido (Google Chrome, Microsoft Edge, etc.).
3. No requiere Node.js, servidores web locales ni dependencias pesadas. Funciona 100% de manera autónoma en el navegador.

---

## 🌐 Repositorio Oficial en GitHub
- **URL del Repositorio:** [https://github.com/fjcastalv-dot/PilotoUtJob](https://github.com/fjcastalv-dot/PilotoUtJob)
- **Despliegue en Vivo (GitHub Pages sugerido):** `https://fjcastalv-dot.github.io/PilotoUtJob/`

### Sincronización de Cambios:
Para enviar cualquier modificación futura a GitHub, simplemente haz doble clic en el archivo **`Sincronizar_GitHub.bat`** incluido dentro de esta carpeta.

