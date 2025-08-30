# 🎯 Sistema de Metas SMART - Mentoría Estudiantil

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Platform](https://img.shields.io/badge/platform-Google%20Apps%20Script-yellow.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

Sistema web para la generación y gestión de metas SMART durante sesiones de mentoría estudiantil. Desarrollado para el Tecnológico de Monterrey, permite asignar metas personalizadas basadas en diagnósticos previos de los estudiantes.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Demo](#-demo)
- [Requisitos](#-requisitos)
- [Instalación](#-instalación)
- [Configuración](#️-configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Personalización](#-personalización)
- [API](#-api)
- [Solución de Problemas](#-solución-de-problemas)
- [Contribuir](#-contribuir)
- [Roadmap](#-roadmap)
- [Licencia](#-licencia)
- [Contacto](#-contacto)

## ✨ Características

### 🎓 Para Estudiantes
- **Diagnóstico Personalizado**: Visualización clara de áreas de oportunidad
- **Metas Adaptativas**: Recomendaciones basadas en el perfil individual
- **Interfaz Intuitiva**: Proceso guiado paso a paso
- **Mobile-First**: Diseño responsive para cualquier dispositivo
- **Instrucciones Claras**: Guía para registro en Mi Vida Tec

### 👨‍🏫 Para Mentores
- **Gestión Centralizada**: Dashboard con estadísticas en tiempo real
- **Sin Código**: Actualización de metas desde Google Sheets
- **Tracking Automático**: Registro de participación y completitud
- **Exportable**: Datos listos para análisis y reportes

### 🔧 Técnicas
- **100% Cloud**: Sin necesidad de servidor propio
- **Escalable**: Soporta múltiples usuarios simultáneos
- **Seguro**: Autenticación mediante Google
- **Gratuito**: Usa servicios gratuitos de Google
- **Offline-Ready**: Funciona con conexiones lentas

## 🎬 Demo

### Vista del Diagnóstico
![Diagnóstico](https://via.placeholder.com/800x400?text=Vista+del+Diagnostico)

### Selección de Metas
![Metas](https://via.placeholder.com/800x400?text=Seleccion+de+Metas)

### Proceso Completo
```
1. Estudiante ingresa matrícula → 2. Ve su diagnóstico → 3. Elige metas
→ 4. Recibe instrucciones → 5. Registra en Mi Vida Tec → 6. Confirma
```

## 📦 Requisitos

- Cuenta de Google Workspace (preferiblemente educativa)
- Google Sheets
- Google Apps Script
- Navegador web moderno
- Acceso a Mi Vida Tec (para estudiantes del Tec)

## 🚀 Instalación

### Opción 1: Instalación Rápida (Recomendada)

1. **Clonar el template de Google Sheets**
   ```
   https://docs.google.com/spreadsheets/d/TEMPLATE_ID/copy
   ```

2. **Abrir Apps Script**
   - En Sheets: `Extensiones > Apps Script`

3. **Copiar el código**
   ```bash
   # Clonar este repositorio
   git clone https://github.com/tu-usuario/sistema-metas-smart.git
   
   # Copiar archivos a Apps Script
   - Code.gs → Pegar en archivo Code.gs
   - index.html → Crear archivo HTML y pegar
   ```

4. **Configurar y Desplegar**
   - Actualizar `SPREADSHEET_ID` en Code.gs
   - Click en `Implementar > Nueva implementación`
   - Tipo: `Aplicación web`
   - Ejecutar como: `Yo`
   - Acceso: `Cualquier persona en tu organización`

### Opción 2: Instalación Manual

<details>
<summary>Ver instrucciones detalladas</summary>

1. **Crear Google Sheets nuevo**
   - Crear 3 hojas: `Diagnostico_Previo`, `Sesion_Mentoria`, `Banco_Metas`
   - Copiar estructura de `/sheets-template/`

2. **Configurar Apps Script**
   - Ir a [script.google.com](https://script.google.com)
   - Nuevo proyecto
   - Copiar archivos del repositorio

3. **Configurar permisos**
   - Autorizar acceso a Sheets
   - Configurar OAuth si es necesario

</details>

## ⚙️ Configuración

### 1. Estructura de Google Sheets

#### Hoja: `Diagnostico_Previo`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| email | String | Correo del estudiante |
| name | String | Nombre completo |
| matricula | String | ID único (A########) |
| score_carrera | Number(1-5) | Evaluación definición de carrera |
| score_academico | Number(1-5) | Evaluación desempeño académico |
| score_practicas | Number(1-5) | Evaluación prácticas profesionales |
| score_servicio | Number(1-5) | Evaluación servicio social |
| version | String | Escenario: Oportunidad/Desarrollo/Consolidado |

#### Hoja: `Banco_Metas`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| ID_Meta | String | Identificador único |
| Categoria | String | carrera/academico/practicas/servicio/fisica/emocional/etc |
| Dimension | String | Dimensión del bienestar |
| Meta_Texto | String | Descripción SMART de la meta |
| Pasos | String | Pasos separados por punto y coma |

### 2. Variables de Entorno

En `Code.gs`, actualizar:
```javascript
const CONFIG = {
  SPREADSHEET_ID: 'tu-id-aqui',
  SHEET_DIAGNOSTICO: 'Diagnostico_Previo',
  SHEET_SESION: 'Sesion_Mentoria',
  SHEET_BANCO_METAS: 'Banco_Metas'
};
```

## 💻 Uso

### Para Mentores

1. **Preparación Pre-Sesión**
   ```
   - Cargar diagnósticos en Sheets
   - Verificar banco de metas actualizado
   - Generar URL de la aplicación
   ```

2. **Durante la Sesión**
   ```
   - Proyectar URL o compartir QR
   - Guiar a estudiantes en el proceso
   - Monitorear progreso en Sheets
   ```

3. **Post-Sesión**
   ```
   - Exportar datos desde Sheets
   - Revisar métricas de completitud
   - Ajustar metas para siguiente periodo
   ```

### Para Estudiantes

1. Ingresar matrícula
2. Revisar diagnóstico personal
3. Seleccionar 1 meta prioritaria + 1 complementaria
4. Copiar metas al portapapeles
5. Registrar en Mi Vida Tec
6. Confirmar registro

## 📁 Estructura del Proyecto

```
sistema-metas-smart/
│
├── 📂 apps-script/
│   ├── Code.gs                 # Backend - Lógica del servidor
│   └── index.html              # Frontend - Interfaz de usuario
│
├── 📂 sheets-template/
│   ├── diagnostico_template.csv
│   ├── banco_metas_template.csv
│   └── estructura.md
│
├── 📂 docs/
│   ├── manual_mentor.pdf
│   ├── guia_estudiante.pdf
│   └── api_documentation.md
│
├── 📂 assets/
│   ├── logo.png
│   └── screenshots/
│
├── 📝 README.md
├── 📝 LICENSE
└── 📝 CONTRIBUTING.md
```

## 🎨 Personalización

### Modificar Metas

1. **Desde Google Sheets** (Sin código)
   - Abrir hoja `Banco_Metas`
   - Editar/Agregar filas
   - Cambios inmediatos

2. **Personalización por Carrera**
   ```javascript
   // En Code.gs, agregar filtro
   if (estudiante.carrera === 'ITC') {
     // Mostrar metas específicas de sistemas
   }
   ```

### Cambiar Colores/Estilos

En `index.html`:
```css
/* Colores institucionales */
:root {
  --color-primario: #0066CC;  /* Azul Tec */
  --color-exito: #28a745;
  --color-alerta: #ffc107;
}
```

### Agregar Campos

Para agregar nuevos campos al diagnóstico:
1. Agregar columna en Sheets
2. Actualizar función `obtenerDiagnostico()`
3. Modificar visualización en HTML

## 🔌 API

### Funciones Disponibles

#### `obtenerDiagnostico(matricula)`
```javascript
// Retorna objeto con datos del estudiante
{
  success: boolean,
  data: {
    name: string,
    matricula: string,
    scores: {...},
    areasDebiles: array
  }
}
```

#### `guardarSeleccionMetas(datos)`
```javascript
// Guarda metas seleccionadas
{
  matricula: string,
  metaPrioritaria: string,
  metaComplementaria: string
}
```

#### `obtenerEstadisticas()`
```javascript
// Retorna métricas de la sesión
{
  total: number,
  completados: number,
  porcentajeCompletado: number
}
```

## 🐛 Solución de Problemas

### Error: "Matrícula no encontrada"
- Verificar que la matrícula existe en `Diagnostico_Previo`
- Confirmar formato (A########)
- Revisar mayúsculas/minúsculas

### Las metas no se cargan
- Verificar nombres de hojas en Sheets
- Confirmar que `SPREADSHEET_ID` es correcto
- Revisar permisos de la aplicación

### Error al guardar
- Verificar permisos de escritura en Sheets
- Confirmar estructura de columnas
- Revisar logs en Apps Script

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor lee [CONTRIBUTING.md](CONTRIBUTING.md) para detalles sobre nuestro código de conducta y el proceso para enviarnos pull requests.

### Cómo contribuir

1. Fork el proyecto
2. Crea tu Feature Branch (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Add: Nueva característica'`)
4. Push al Branch (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

### Guía de estilo

- Usar nombres descriptivos en español
- Comentar funciones complejas
- Seguir estructura existente
- Incluir documentación

## 🗺 Roadmap

### v1.1 (En desarrollo)
- [ ] Integración con API de Mi Vida Tec
- [ ] Notificaciones por correo
- [ ] Dashboard analítico avanzado
- [ ] Exportación a PDF

### v2.0 (Planificado)
- [ ] App móvil nativa
- [ ] Sistema de gamificación
- [ ] Tracking de progreso
- [ ] IA para generación de metas

### Futuro
- [ ] Multi-idioma
- [ ] Integración con Canvas LMS
- [ ] API pública
- [ ] Machine Learning para recomendaciones

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Equipo

- **Desarrollo**: [Tu Nombre]
- **Diseño Pedagógico**: Equipo de Mentoría
- **Testing**: Estudiantes voluntarios

## 📞 Contacto

**Soporte Técnico**: soporte@ejemplo.edu.mx  
**Reportar Bugs**: [Issues en GitHub](https://github.com/tu-usuario/sistema-metas-smart/issues)  
**Sugerencias**: [Discussions](https://github.com/tu-usuario/sistema-metas-smart/discussions)

## 🙏 Agradecimientos

- Tecnológico de Monterrey
- Equipo de Bienestar Estudiantil
- Google for Education
- Comunidad de mentores

---

<div align="center">
  Desarrollado con ❤️ para la comunidad estudiantil del Tec
  <br>
  <a href="https://github.com/tu-usuario/sistema-metas-smart">⭐ Dale una estrella si te fue útil</a>
</div>
