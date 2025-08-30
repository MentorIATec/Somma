// ============================================
// CONFIGURACIÓN INICIAL
// ============================================

const CONFIG = {
  SPREADSHEET_ID: '1IBh4GHHK-JLzaqjE9A7fDo7H0r7Gvonq_waIVsW08Xo', // Reemplaza con tu ID
  SHEET_DIAGNOSTICO: 'Diagnostico_Previo',
  SHEET_SESION: 'Sesion_Mentoria',
  SHEET_BANCO_METAS: 'Banco_Metas'
};

// ============================================
// FUNCIÓN PRINCIPAL - APLICACIÓN WEB
// ============================================

function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Generador de Metas - Sesión de Mentoría')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ============================================
// OBTENER DIAGNÓSTICO DEL ESTUDIANTE
// ============================================

function obtenerDiagnostico(matricula) {
  try {
    const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID)
                                .getSheetByName(CONFIG.SHEET_DIAGNOSTICO);
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const matriculaIndex = headers.indexOf('matricula');
    
    // Buscar estudiante por matrícula
    for (let i = 1; i < data.length; i++) {
      if (data[i][matriculaIndex] === matricula) {
        // Crear objeto con datos del estudiante
        const estudiante = {};
        headers.forEach((header, index) => {
          estudiante[header] = data[i][index];
        });
        
        // Agregar análisis de áreas débiles
        estudiante.areasDebiles = [];
        if (estudiante.score_carrera <= 2) estudiante.areasDebiles.push('carrera');
        if (estudiante.score_academico <= 2) estudiante.areasDebiles.push('academico');
        if (estudiante.score_practicas <= 2) estudiante.areasDebiles.push('practicas');
        if (estudiante.score_servicio <= 2) estudiante.areasDebiles.push('servicio');
        
        return {
          success: true,
          data: estudiante
        };
      }
    }
    
    return {
      success: false,
      error: 'Matrícula no encontrada en el diagnóstico'
    };
    
  } catch (error) {
    console.error('Error obteniendo diagnóstico:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

// ============================================
// OBTENER METAS DEL BANCO
// ============================================

function obtenerMetasDisponibles() {
  try {
    const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID)
                                .getSheetByName(CONFIG.SHEET_BANCO_METAS);
    
    // Si no existe la hoja, usar las metas por defecto del código
    if (!sheet) {
      console.log('No se encontró hoja Banco_Metas, usando metas por defecto');
      return obtenerMetasPorDefecto(); // Función con las metas hardcodeadas como respaldo
    }
    
    const data = sheet.getDataRange().getValues();
    
    // Verificar que hay datos
    if (data.length <= 1) {
      console.log('Hoja Banco_Metas vacía, usando metas por defecto');
      return obtenerMetasPorDefecto();
    }
    
    // Organizar metas por categoría
    const metasPrioritarias = {
      carrera: [],
      academico: [],
      practicas: [],
      servicio: []
    };
    
    const metasComplementarias = {
      fisica: [],
      emocional: [],
      social: [],
      intelectual: [],
      espiritual: [],
      financiera: []
    };
    
    // Procesar cada fila (empezando desde la fila 2, saltando headers)
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      // Saltar filas vacías
      if (!row[0] || !row[1]) continue;
      
      const meta = {
        id: row[0],                    // ID_Meta
        texto: row[3],                  // Meta_Texto
        pasos: row[4] ? String(row[4]).split(';').map(p => p.trim()) : [], // Pasos separados por ;
        dimension: row[2]               // Dimension
      };
      
      const categoria = row[1].toLowerCase(); // Categoria
      
      // Clasificar según categoría
      if (metasPrioritarias.hasOwnProperty(categoria)) {
        metasPrioritarias[categoria].push(meta);
      } else if (metasComplementarias.hasOwnProperty(categoria)) {
        metasComplementarias[categoria].push(meta);
      }
    }
    
    console.log('Metas cargadas desde Sheets exitosamente');
    return {
      prioritarias: metasPrioritarias,
      complementarias: metasComplementarias
    };
    
  } catch (error) {
    console.error('Error obteniendo metas desde Sheets:', error);
    // En caso de error, usar metas por defecto
    return obtenerMetasPorDefecto();
  }
}

// ============================================
// METAS POR DEFECTO (RESPALDO)
// ============================================

function obtenerMetasPorDefecto() {
  const metasPrioritarias = {
    carrera: [
        {
          id: 'CAR001',
          texto: 'Completar sesiones de orientación vocacional en las próximas 4 semanas',
          pasos: ['Agendar cita en orientación esta semana, consultar liga con Karen', 'Completar test Holland hoy', 'Preparar preguntas para la sesión'],
          dimension: 'ocupacional'
        },
        {
          id: 'CAR002',
          texto: 'Entrevistarte con Directores/as de Entrada/Programa de diferentes carreras de tu interés durante las próximas 3 semanas',
          pasos: ['Identificar 3 Directores/as hoy', 'Preparar preguntas para sesión', 'Agendar primera entrevista'],
          dimension: 'ocupacional'
        },
        {
          id: 'CAR003',
          texto: 'Asistir a 3 diferentes pláticas/eventos de mi área de interés y documentar aprendizajes este periodo',
          pasos: ['Revisar calendario de eventos', 'Inscribirte a 2 esta semana', 'Crear documento de reflexiones'],
          dimension: 'intelectual'
        }
      ],
      academico: [
        {
          id: 'ACA001',
          texto: 'Implementar técnica Pomodoro y subir promedio 0.5 puntos este periodo (5 semanas)',
          pasos: ['Descargar app Pomodoro hoy', 'Identificar 2 materias prioritarias', 'Establecer horario de estudio fijo'],
          dimension: 'intelectual'
        },
        {
          id: 'ACA002',
          texto: 'Formar grupo de estudio semanal para las 2 materias más difíciles durante 5 semanas',
          pasos: ['Identificar 3 compañeros comprometidos hoy', 'Agendar primera sesión esta semana', 'Crear grupo de WhatsApp'],
          dimension: 'social'
        },
        {
          id: 'ACA003',
          texto: 'Asistir a tutorías 2 veces por semana y completar todos los ejercicios extra durante 5 semanas',
          pasos: ['Inscribirte a tutorías hoy', 'Agendar horarios fijos', 'Preparar dudas específicas'],
          dimension: 'intelectual'
        }
      ],
      practicas: [
        {
          id: 'PRA001',
          texto: 'Crear perfil LinkedIn profesional y conectar con 20 profesionales de tu industria en 3 semanas',
          pasos: ['Tomar foto profesional esta semana', 'Completar perfil al 100% hoy', 'Enviar 5 solicitudes diarias'],
          dimension: 'ocupacional'
        },
        {
          id: 'PRA002',
          texto: 'Investigar y aplicar a 3 programas de prácticas antes del final del periodo (5 semanas)',
          pasos: ['Actualizar CV hoy', 'Investigar 10 empresas esta semana', 'Preparar carta de presentación base'],
          dimension: 'ocupacional'
        },
        {
          id: 'PRA003',
          texto: 'Asistir a feria de empleo del Tec y hacer networking efectivo con 5 empresas target',
          pasos: ['Registrarte al evento hoy', 'Investigar empresas participantes', 'Preparar elevator pitch de 30 segundos'],
          dimension: 'social'
        }
      ],
      servicio: [
        {
          id: 'SER001',
          texto: 'Investigar 5 opciones de servicio social alineadas a tu carrera y elegir una en 2 semanas',
          pasos: ['Revisar catálogo del Tec hoy', 'Contactar a 3 organizaciones', 'Visitar al menos una presencialmente'],
          dimension: 'social'
        },
        {
          id: 'SER002',
          texto: 'Inscribirte y completar 100 horas de servicio social antes del fin del periodo (5 semanas)',
          pasos: ['Completar registro esta semana', 'Establecer horario de 20 hrs/semana', 'Crear bitácora de actividades'],
          dimension: 'social'
        },
        {
          id: 'SER003',
          texto: 'Desarrollar proyecto de impacto social y completar primera fase de implementación en 5 semanas',
          pasos: ['Definir problemática específica hoy', 'Formar equipo de 3 personas', 'Crear cronograma de actividades'],
          dimension: 'espiritual'
        }
      ]
    };
    
    const metasComplementarias = {
      fisica: [
        {
          id: 'FIS001',
          texto: 'Entrenar para la carrera 5K del campus siguiendo plan de 5 semanas',
          pasos: ['Inscribirte a la carrera hoy', 'Correr 15 minutos hoy', 'Unirte al grupo de running del Tec'],
          dimension: 'fisica'
        },
        {
          id: 'FIS002',
          texto: 'Establecer rutina de sueño de 7+ horas durante 21 días consecutivos',
          pasos: ['Poner alarma de dormir a las 11pm', 'Dejar celular fuera del cuarto', 'Usar app de tracking de sueño'],
          dimension: 'fisica'
        },
        {
          id: 'FIS003',
          texto: 'Completar reto de 10,000 pasos diarios durante 30 días',
          pasos: ['Descargar app de conteo de pasos', 'Caminar al campus en lugar de transporte', 'Usar escaleras siempre'],
          dimension: 'fisica'
        }
      ],
      emocional: [
        {
          id: 'EMO001',
          texto: 'Practicar journaling de gratitud 5 minutos diarios durante 30 días',
          pasos: ['Comprar libreta especial hoy', 'Poner recordatorio a las 10pm', 'Escribir 3 gratitudes esta noche'],
          dimension: 'emocional'
        },
        {
          id: 'EMO002',
          texto: 'Completar curso de mindfulness de 4 semanas del departamento de bienestar',
          pasos: ['Inscribirte al curso hoy', 'Descargar app Headspace', 'Practicar 5 minutos hoy'],
          dimension: 'emocional'
        },
        {
          id: 'EMO003',
          texto: 'Implementar técnica de respiración 4-7-8 antes de cada examen durante el periodo',
          pasos: ['Aprender la técnica hoy (YouTube)', 'Practicar 3 veces al día', 'Usar antes de clase difícil'],
          dimension: 'emocional'
        }
      ],
      social: [
        {
          id: 'SOC001',
          texto: 'Unirte y participar activamente en grupo estudiantil durante 5 semanas',
          pasos: ['Elegir grupo afín a tus intereses hoy', 'Asistir a próxima reunión', 'Ofrecerte para una actividad'],
          dimension: 'social'
        },
        {
          id: 'SOC002',
          texto: 'Organizar reunión quincenal de estudio/convivencia con 5 compañeros del salón',
          pasos: ['Crear grupo de WhatsApp hoy', 'Proponer primera fecha', 'Reservar espacio en biblioteca'],
          dimension: 'social'
        },
        {
          id: 'SOC003',
          texto: 'Realizar 3 actividades de integración con compañeros fuera del campus este periodo',
          pasos: ['Proponer primera salida este fin de semana', 'Crear encuesta de intereses', 'Organizar primera actividad'],
          dimension: 'social'
        }
      ],
      intelectual: [
        {
          id: 'INT001',
          texto: 'Leer 1 libro no académico completo cada 2 semanas durante el periodo',
          pasos: ['Elegir primer libro hoy', 'Leer 20 páginas diarias', 'Unirte a club de lectura del Tec'],
          dimension: 'intelectual'
        },
        {
          id: 'INT002',
          texto: 'Completar curso online de habilidad complementaria (15 horas en 5 semanas)',
          pasos: ['Elegir curso en Coursera/edX hoy', 'Dedicar 3 horas semanales', 'Crear calendario de estudio'],
          dimension: 'intelectual'
        },
        {
          id: 'INT003',
          texto: 'Aprender básicos de programación completando curso Python de 20 horas en 5 semanas',
          pasos: ['Inscribirte a curso gratuito hoy', 'Completar primera lección', 'Practicar 30 min diarios'],
          dimension: 'intelectual'
        }
      ],
      espiritual: [
        {
          id: 'ESP001',
          texto: 'Definir misión personal y 3 valores fundamentales mediante reflexión semanal por 5 semanas',
          pasos: ['Hacer test de valores hoy', 'Escribir primera reflexión', 'Meditar 10 minutos sobre tu propósito'],
          dimension: 'espiritual'
        },
        {
          id: 'ESP002',
          texto: 'Realizar voluntariado 2 horas semanales en causa alineada a tus valores por 5 semanas',
          pasos: ['Identificar 3 causas de interés', 'Contactar organización esta semana', 'Comprometer horario fijo'],
          dimension: 'espiritual'
        },
        {
          id: 'ESP003',
          texto: 'Practicar meditación o reflexión personal 10 minutos diarios durante 30 días',
          pasos: ['Descargar app de meditación', 'Establecer horario fijo', 'Empezar con 5 minutos hoy'],
          dimension: 'espiritual'
        }
      ],
      financiera: [
        {
          id: 'FIN001',
          texto: 'Ahorrar 10% de mesada/ingresos durante 5 semanas consecutivas para meta específica',
          pasos: ['Abrir cuenta de ahorro', 'Definir meta de ahorro', 'Apartar dinero cada semana'],
          dimension: 'financiera'
        },
        {
          id: 'FIN002',
          texto: 'Completar curso de finanzas personales para universitarios (8 horas en 4 semanas)',
          pasos: ['Inscribirte a curso MOOC hoy', 'Ver primera lección', 'Crear presupuesto personal'],
          dimension: 'financiera'
        },
        {
          id: 'FIN003',
          texto: 'Reducir gastos innecesarios 20% mediante registro y análisis durante 30 días',
          pasos: ['Descargar app de gastos', 'Registrar todo gasto hoy', 'Identificar 3 gastos hormiga'],
          dimension: 'financiera'
        }
      ]
    };
  console.log('Usando metas por defecto (respaldo)');
  return {
    prioritarias: metasPrioritarias,
    complementarias: metasComplementarias
  };
}

// ============================================
// GUARDAR SELECCIÓN DE METAS
// ============================================

function guardarSeleccionMetas(datos) {
  try {
    const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID)
                                .getSheetByName(CONFIG.SHEET_SESION);
    
    // Si la hoja no existe, crearla con headers
    if (!sheet) {
      const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
      const newSheet = spreadsheet.insertSheet(CONFIG.SHEET_SESION);
      newSheet.getRange(1, 1, 1, 8).setValues([[
        'Timestamp',
        'Matricula',
        'Nombre',
        'Escenario_Diagnostico',
        'Meta_Prioritaria',
        'Meta_Complementaria',
        'Registrado_MiVidaTec',
        'Fecha_Confirmacion'
      ]]);
    }
    
    const targetSheet = sheet || SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID)
                                                .getSheetByName(CONFIG.SHEET_SESION);
    
    // Agregar nueva fila con los datos
    targetSheet.appendRow([
      new Date(),
      datos.matricula,
      datos.nombre,
      datos.escenario,
      datos.metaPrioritaria,
      datos.metaComplementaria,
      'Pendiente',
      ''
    ]);
    
    return { success: true };
    
  } catch (error) {
    console.error('Error guardando selección:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

// ============================================
// CONFIRMAR REGISTRO EN MI VIDA TEC
// ============================================

function confirmarRegistroMiVidaTec(matricula) {
  try {
    const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID)
                                .getSheetByName(CONFIG.SHEET_SESION);
    
    const data = sheet.getDataRange().getValues();
    
    // Buscar la última entrada de esta matrícula
    for (let i = data.length - 1; i >= 1; i--) {
      if (data[i][1] === matricula && data[i][6] === 'Pendiente') {
        // Actualizar estado
        sheet.getRange(i + 1, 7).setValue('Completado');
        sheet.getRange(i + 1, 8).setValue(new Date());
        
        return { success: true };
      }
    }
    
    return {
      success: false,
      error: 'No se encontró registro pendiente para esta matrícula'
    };
    
  } catch (error) {
    console.error('Error confirmando registro:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

// ============================================
// OBTENER ESTADÍSTICAS
// ============================================

function obtenerEstadisticas() {
  try {
    const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID)
                                .getSheetByName(CONFIG.SHEET_SESION);
    
    if (!sheet) return { total: 0, completados: 0, pendientes: 0 };
    
    const data = sheet.getDataRange().getValues();
    
    let total = data.length - 1; // Menos el header
    let completados = 0;
    let pendientes = 0;
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][6] === 'Completado') {
        completados++;
      } else if (data[i][6] === 'Pendiente') {
        pendientes++;
      }
    }
    
    return {
      total: total,
      completados: completados,
      pendientes: pendientes,
      porcentajeCompletado: total > 0 ? Math.round((completados / total) * 100) : 0
    };
    
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    return { total: 0, completados: 0, pendientes: 0 };
  }
}
