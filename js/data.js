/**
 * BOLSA DE TRABAJO - UNIVERSIDAD TECNOLÓGICA DE CANCÚN (UT Cancún)
 * data.js - Base de Datos Simulada y Modelos del Sistema
 */

const UTC_DATA = {
  // Catálogo de Divisiones Académicas y Carreras Oficiales UT Cancún
  divisions: [
    {
      id: "tic",
      name: "División de Tecnologías de la Información y Comunicación",
      careers: [
        "Ing. en Desarrollo y Gestión de Software",
        "TSU en Desarrollo de Software Multiplataforma",
        "Ing. en Redes Inteligentes y Ciberseguridad",
        "TSU en Infraestructura de Redes Digitales"
      ]
    },
    {
      id: "turismo",
      name: "División de Turismo y Gastronomía",
      careers: [
        "Lic. en Gestión y Desarrollo Turístico",
        "TSU en Turismo área Hotelería",
        "Lic. en Gastronomía",
        "TSU en Gastronomía"
      ]
    },
    {
      id: "administracion",
      name: "División de Administración y Negocios",
      careers: [
        "Lic. en Innovación de Negocios y Mercadotecnia",
        "TSU en Desarrollo de Negocios área Mercadotecnia",
        "Lic. en Gestión del Capital Humano",
        "TSU en Administración área Capital Humano"
      ]
    },
    {
      id: "ingenieria",
      name: "División de Ingeniería y Tecnología",
      careers: [
        "Ing. en Mantenimiento Industrial",
        "TSU en Mantenimiento área Instalaciones",
        "Ing. en Mecatrónica",
        "TSU en Mecatrónica área Automatización"
      ]
    }
  ],

  // Directorio inicial de Vacantes con empresas de Cancún y la región
  vacancies: [
    {
      id: "vac-01",
      title: "Desarrollador Web Frontend Jr (Estadía con Contratación)",
      company: "Grupo Xcaret - Dirección de Transformación Digital",
      logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=120&auto=format&fit=crop&q=80",
      modality: "Híbrido (Cancún Centro / Home Office)",
      type: "Estadía con Contratación",
      category: "estadia",
      targetCareer: "Ing. en Desarrollo y Gestión de Software",
      targetDivision: "tic",
      recommendedQuarter: [9, 10, 11],
      hireProjection: true,
      compensation: "$8,500 MXN Beca mensual + Alimentos + Transporte",
      skillsRequired: ["JavaScript (ES6+)", "Tailwind CSS o Bootstrap", "Consumo de APIs REST", "Git / GitHub"],
      recommendedSkills: ["Inglés Técnico B2", "Conocimientos de React o Vue", "Metodologías Ágiles (Scrum)"],
      description: "Buscamos estudiante de último cuatrimestre para integrarse al equipo de portales turísticos y reservas de Experiencias Xcaret. Participarás en proyectos reales con posibilidad directa de contratación al término de tu estadía.",
      locationZone: "Cancún Centro",
      postedAt: "Hace 2 días",
      featured: true
    },
    {
      id: "vac-02",
      title: "Practicante de Soporte de Redes y Telecomunicaciones",
      company: "The Palace Company (Moon Palace Cancún)",
      logo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=120&auto=format&fit=crop&q=80",
      modality: "Presencial (Carretera Cancún - Chetumal)",
      type: "Medio Tiempo",
      category: "medio_tiempo",
      targetCareer: "TSU en Infraestructura de Redes Digitales",
      targetDivision: "tic",
      recommendedQuarter: [3, 4, 5, 6, 7, 8],
      hireProjection: false,
      compensation: "$5,500 MXN Apoyo + Comedor de colaboradores + Transporte de personal",
      skillsRequired: ["Cableado estructurado", "Configuración de switches y routers", "Soporte técnico a usuarios", "Mantenimiento preventivo"],
      recommendedSkills: ["Certificación Cisco CCNA (básica)", "Inglés intermedio"],
      description: "Horario flexible de 4 horas diarias adaptado a tu carga de materias en la UT. Asistirás en la infraestructura de conectividad de los centros de convenciones del complejo hotelero.",
      locationZone: "Riviera Cancún",
      postedAt: "Hace 3 días",
      featured: false
    },
    {
      id: "vac-03",
      title: "Coordinador de Experiencia del Huésped (Guest Service Jr)",
      company: "Hyatt Ziva Cancún",
      logo: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=120&auto=format&fit=crop&q=80",
      modality: "Presencial (Zona Hotelera Km 9.5)",
      type: "Tiempo Completo",
      category: "tiempo_completo",
      targetCareer: "Lic. en Gestión y Desarrollo Turístico",
      targetDivision: "turismo",
      recommendedQuarter: ["egresado"],
      hireProjection: true,
      compensation: "$16,500 MXN Netos + Propinas + Vales de despensa + Seguro de Gastos Médicos",
      skillsRequired: ["Inglés C1 Avanzado Fluido", "Manejo de Sistema Opera PMS", "Atención a clientes VIP", "Resolución de conflictos"],
      recommendedSkills: ["Segundo idioma (Francés o Alemán)", "Liderazgo de equipos"],
      description: "Posición profesional exclusiva para egresados titulados de la UT Cancún. Supervisión de check-in VIP, resolución de solicitudes y aseguramiento de estándares de calidad internacional.",
      locationZone: "Zona Hotelera",
      postedAt: "Hace 1 día",
      featured: true
    },
    {
      id: "vac-04",
      title: "Estadía Profesional en Cocina de Especialidades / Garde Manger",
      company: "Grupo Anderson's (Restaurantes Porfirio's & Harry's)",
      logo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=120&auto=format&fit=crop&q=80",
      modality: "Presencial (Zona Hotelera Cancún)",
      type: "Estadía con Contratación",
      category: "estadia",
      targetCareer: "Lic. en Gastronomía",
      targetDivision: "turismo",
      recommendedQuarter: [9, 10, 11],
      hireProjection: true,
      compensation: "$7,800 MXN Beca mensual + Alimentos + Uniformes + Alta probabilidad de contratación",
      skillsRequired: ["Técnicas culinarias fundamentales", "Manejo higiénico de alimentos (Distintivo H)", "Montaje de alta cocina", "Control de mermas"],
      recommendedSkills: ["Cocina de vanguardia / sous-vide", "Costeo de recetas"],
      description: "Estadía intensiva para estudiantes de 11° cuatrimestre. Formación directa con Chefs Ejecutivos reconocidos en el corredor gastronómico de la Zona Hotelera.",
      locationZone: "Zona Hotelera",
      postedAt: "Hace 4 días",
      featured: true
    },
    {
      id: "vac-05",
      title: "Analista de Atracción de Talento y Clima Laboral Jr",
      company: "Best Day Travel / Grupo Despegar",
      logo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
      modality: "Híbrido (Av. Bonampak, Cancún)",
      type: "Tiempo Completo",
      category: "tiempo_completo",
      targetCareer: "Lic. en Gestión del Capital Humano",
      targetDivision: "administracion",
      recommendedQuarter: ["egresado"],
      hireProjection: true,
      compensation: "$15,000 MXN + Fondo de ahorro + Días de descanso adicionales",
      skillsRequired: ["Entrevistas por competencias", "Publicación en bolsas de empleo", "Inducción institucional", "Manejo de expedientes laborales"],
      recommendedSkills: ["Pruebas psicométricas digitales", "Excel intermedio/avanzado"],
      description: "Oportunidad para egresados UT de Administración o Capital Humano para sumarse a una de las empresas de viajes en línea más grandes de Latinoamérica con corporativo en Cancún.",
      locationZone: "Cancún Centro",
      postedAt: "Hace 5 días",
      featured: false
    },
    {
      id: "vac-06",
      title: "Auxiliar de Marketing Digital y Redes Sociales",
      company: "The Dolphin Company Cancún",
      logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=120&auto=format&fit=crop&q=80",
      modality: "Híbrido (Cancún Centro)",
      type: "Medio Tiempo",
      category: "medio_tiempo",
      targetCareer: "TSU en Desarrollo de Negocios área Mercadotecnia",
      targetDivision: "administracion",
      recommendedQuarter: [4, 5, 6, 7],
      hireProjection: false,
      compensation: "$6,200 MXN + Flexibilidad de horario para exámenes",
      skillsRequired: ["Copywriting y redacción creativa", "Manejo de Canva / Suite Adobe básica", "Monitoreo de métricas en Meta Business", "TikTok & Reels"],
      recommendedSkills: ["Inglés escrito intermedio", "Fotografía con smartphone"],
      description: "Vacante ideal para estudiantes de 4° a 7° cuatrimestre. Apoyo en la generación de contenidos digitales y monitoreo de comunidad en redes sociales turísticas.",
      locationZone: "Cancún Centro",
      postedAt: "Hace 1 semana",
      featured: false
    },
    {
      id: "vac-07",
      title: "Técnico de Mantenimiento de Equipos Electromecánicos",
      company: "Ultramar Ferry (Naviera Cancún - Isla Mujeres)",
      logo: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=120&auto=format&fit=crop&q=80",
      modality: "Presencial (Puerto Juárez, Cancún)",
      type: "Estadía con Contratación",
      category: "estadia",
      targetCareer: "Ing. en Mantenimiento Industrial",
      targetDivision: "ingenieria",
      recommendedQuarter: [9, 10, 11],
      hireProjection: true,
      compensation: "$8,000 MXN Beca mensual + Capacitación marítima certificada",
      skillsRequired: ["Sistemas hidráulicos y neumáticos", "Lectura de diagramas eléctricos", "Mantenimiento preventivo", "Uso de herramientas de medición"],
      recommendedSkills: ["Conocimiento de normas marítimas", "Soldadura básica industrial"],
      description: "Estadía profesional en la flota naval líder del Caribe Mexicano. Proyecto enfocado en la optimización de los planes de mantenimiento predictivo de embarcaciones y sistemas auxiliares.",
      locationZone: "Puerto Juárez",
      postedAt: "Hace 3 días",
      featured: true
    },
    {
      id: "vac-08",
      title: "Ingeniero de Automatización y Sensores IoT",
      company: "Quintana Roo Tech Hub / Softtek",
      logo: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&auto=format&fit=crop&q=80",
      modality: "Híbrido (Parque Tecnológico Cancún)",
      type: "Tiempo Completo",
      category: "tiempo_completo",
      targetCareer: "Ing. en Mecatrónica",
      targetDivision: "ingenieria",
      recommendedQuarter: ["egresado"],
      hireProjection: true,
      compensation: "$21,000 MXN + Bonos por certificación + Esquema de crecimiento",
      skillsRequired: ["Programación de PLC (Siemens / Allen Bradley)", "Diseño en SolidWorks o AutoCAD", "Protocolos de comunicación industrial (Modbus)", "Microcontroladores ESP32/Arduino"],
      recommendedSkills: ["Python para análisis de datos", "Inglés conversacional B2"],
      description: "Vacante para egresados con título o carta de pasante. Integración de celdas de automatización para clientes del sector logístico e industrial de la península de Yucatán.",
      locationZone: "Cancún Centro",
      postedAt: "Hace 6 días",
      featured: false
    }
  ],

  // Candidatos registrados para el "Explorador de Talento UT" de las empresas
  candidates: [
    {
      id: "cand-01",
      name: "Carlos Eduardo Méndez Gómez",
      matricula: "21030045",
      email: "carlos.mendez@utcancun.edu.mx",
      division: "División de Tecnologías de la Información y Comunicación",
      career: "Ing. en Desarrollo y Gestión de Software",
      quarter: "11° Cuatrimestre (Estadía)",
      quarterNum: 11,
      isGraduate: false,
      isVerifiedGraduate: false,
      gpa: 9.4,
      skills: ["JavaScript (ES6+)", "Tailwind CSS", "Node.js", "Git / GitHub", "MySQL"],
      bio: "Estudiante de último cuatrimestre enfocado en desarrollo web frontend y consumo de APIs. Busco estadía profesional con oportunidad de contratación.",
      whatsapp: "9981234567",
      linkedin: "https://linkedin.com/in/carlos-mendez-ut",
      privacyAllowWhatsApp: true,
      privacyShowLinkedIn: true,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "cand-02",
      name: "Valeria Sofía Pech May",
      matricula: "19020188",
      email: "valeria.pech@utcancun.edu.mx",
      division: "División de Turismo y Gastronomía",
      career: "Lic. en Gestión y Desarrollo Turístico",
      quarter: "Egresada Titulada",
      quarterNum: 12,
      isGraduate: true,
      isVerifiedGraduate: true,
      gpa: 9.7,
      skills: ["Inglés C1 Avanzado Fluido", "Francés B1", "Sistema Opera PMS", "Atención a clientes VIP", "Customer Experience"],
      bio: "Egresada con mención honorífica. Experiencia en hotelería de gran turismo en Cancún y Riviera Maya. Pasión por la excelencia en el servicio al huésped.",
      whatsapp: "9987654321",
      linkedin: "https://linkedin.com/in/valeria-pech-turismo",
      privacyAllowWhatsApp: true,
      privacyShowLinkedIn: true,
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "cand-03",
      name: "Mateo Alejandro Castillo Rivas",
      matricula: "23040012",
      email: "mateo.castillo@utcancun.edu.mx",
      division: "División de Administración y Negocios",
      career: "TSU en Desarrollo de Negocios área Mercadotecnia",
      quarter: "5° Cuatrimestre",
      quarterNum: 5,
      isGraduate: false,
      isVerifiedGraduate: false,
      gpa: 8.8,
      skills: ["Canva / Suite Adobe básica", "Copywriting y redacción creativa", "TikTok & Reels", "Meta Business Suite"],
      bio: "Estudiante de TSU apasionado por el marketing digital y la gestión de comunidades en redes sociales turísticas de Cancún. Busco empleo de medio tiempo.",
      whatsapp: "9982468102",
      linkedin: "https://linkedin.com/in/mateo-castillo-mkt",
      privacyAllowWhatsApp: false, // Privacidad activada: contacto por WhatsApp restringido
      privacyShowLinkedIn: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "cand-04",
      name: "Ana Paola Dzib Canché",
      matricula: "20010344",
      email: "ana.dzib@utcancun.edu.mx",
      division: "División de Ingeniería y Tecnología",
      career: "Ing. en Mantenimiento Industrial",
      quarter: "Egresada Titulada",
      quarterNum: 12,
      isGraduate: true,
      isVerifiedGraduate: true,
      gpa: 9.2,
      skills: ["Sistemas hidráulicos y neumáticos", "Mantenimiento preventivo", "Lectura de diagramas eléctricos", "Normas STPS / OSHA"],
      bio: "Ingeniera con cédula profesional validada por UT Cancún. Especializada en diagnósticos termográficos y mantenimiento preventivo para hoteles y parques temáticos.",
      whatsapp: "9988990011",
      linkedin: "https://linkedin.com/in/ana-dzib-industrial",
      privacyAllowWhatsApp: true,
      privacyShowLinkedIn: false, // Oculto por decisión de privacidad
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "cand-05",
      name: "Rodrigo Isaac Canul Poot",
      matricula: "21030099",
      email: "rodrigo.canul@utcancun.edu.mx",
      division: "División de Tecnologías de la Información y Comunicación",
      career: "TSU en Infraestructura de Redes Digitales",
      quarter: "6° Cuatrimestre (Estadía TSU)",
      quarterNum: 6,
      isGraduate: false,
      isVerifiedGraduate: false,
      gpa: 9.1,
      skills: ["Cableado estructurado", "Configuración de switches y routers", "Soporte técnico a usuarios", "Linux Server"],
      bio: "Concluyendo TSU con promedio destacado. Busco estadía profesional de TSU en infraestructuras de telecomunicación y conectividad hotelera.",
      whatsapp: "9983114477",
      linkedin: "https://linkedin.com/in/rodrigo-canul-redes",
      privacyAllowWhatsApp: true,
      privacyShowLinkedIn: true,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
    }
  ],

  // Perfil del Estudiante de Demostración Inicial
  defaultStudent: {
    name: "Javier Castro Alvarado",
    matricula: "21040892",
    email: "javier.castro@utcancun.edu.mx",
    division: "División de Tecnologías de la Información y Comunicación",
    career: "Ing. en Desarrollo y Gestión de Software",
    quarter: "10° Cuatrimestre",
    quarterNum: 10,
    isGraduate: false,
    isVerifiedGraduate: false,
    gpa: 9.4,
    skills: ["JavaScript (ES6+)", "Tailwind CSS o Bootstrap", "Consumo de APIs REST", "Git / GitHub", "MySQL"],
    whatsapp: "9981552233",
    linkedin: "https://linkedin.com/in/javier-castro-ut",
    privacyAllowWhatsApp: true,
    privacyShowLinkedIn: true
  },

  // Perfil de la Empresa de Demostración Inicial
  defaultCompany: {
    name: "Grupo Xcaret - Cancún",
    rfc: "XCA980214KJ2",
    sector: "Hotelería, Turismo y Entretenimiento",
    recruiterName: "Lic. Mariana Velázquez (Atracción de Talento UT)",
    email: "reclutamiento.cancun@xcaret.com",
    city: "Cancún, Quintana Roo"
  }
};
