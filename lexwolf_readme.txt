# 🐺 LexWolf - Sistema Táctico Legal

Sistema de gestión de casos legales inspirado en Filevine, especializado para práctica laboral mexicana con módulos tácticos Makario integrados.

## 🚀 Características

- **Dashboard profesional** tipo Filevine
- **Análisis táctico automático** basado en patrones LexWolf
- **80+ módulos legales** con efectividad probada
- **Generación automática de referencias** (MOD###)
- **Sistema de casos** con fases y seguimiento
- **Arsenal de módulos Makario** integrado
- **Interfaz completamente en español**
- **Responsive design** para escritorio y móvil

## 📁 Estructura del Proyecto

```
lexwolf-app/
├── index.html              # Dashboard principal
├── css/
│   └── styles.css          # Estilos principales
├── js/
│   └── app.js              # Lógica de la aplicación
├── data/
│   └── lexwolf_v7.0.json   # Arsenal táctico (tu JSON)
├── assets/
│   └── screenshots/        # Capturas del sistema
└── README.md               # Este archivo
```

## 🛠️ Instalación

### Opción 1: GitHub Pages (Recomendado)

1. **Crear repositorio en GitHub**
   ```bash
   # Crear nuevo repositorio llamado 'lexwolf-app'
   # Configurar como público o privado según prefieras
   ```

2. **Subir archivos**
   ```bash
   git clone https://github.com/tu-usuario/lexwolf-app.git
   cd lexwolf-app
   
   # Copiar todos los archivos del sistema LexWolf
   # index.html, css/, js/, data/
   
   git add .
   git commit -m "Initial LexWolf system setup"
   git push origin main
   ```

3. **Activar GitHub Pages**
   - Ve a Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
   - Save

4. **Acceder al sistema**
   ```
   https://tu-usuario.github.io/lexwolf-app/
   ```

### Opción 2: Local (Desarrollo)

1. **Descargar archivos**
   ```bash
   git clone https://github.com/tu-usuario/lexwolf-app.git
   cd lexwolf-app
   ```

2. **Servidor local**
   ```bash
   # Con Python 3
   python -m http.server 8000
   
   # Con Node.js
   npx serve .
   
   # Con PHP
   php -S localhost:8000
   ```

3. **Abrir en navegador**
   ```
   http://localhost:8000
   ```

## 💻 Uso del Sistema

### Dashboard Principal

1. **Panel Izquierdo - Casos**
   - Lista de casos activos/pendientes/resueltos
   - Crear nuevo caso con botón "NUEVO CASO"
   - Filtros por estado y prioridad

2. **Panel Central - Análisis Táctico**
   - Describe la situación legal del cliente
   - Análisis automático con detección de patrones
   - Referencias de módulos (MOD###) activados
   - Estadísticas de misión en tiempo real

3. **Panel Derecho - Inteligencia**
   - Estado operacional del sistema
   - Consejos operacionales contextuales
   - Arsenal de módulos disponibles
   - Métricas de efectividad

### Análisis Automático

El sistema detecta automáticamente:

- **Evasión Empresarial** → MOD033
- **Documentos en Blanco** → MOD034  
- **Problemas SAT** → MOD051
- **Despido Injustificado** → MOD034 + MOD048

### Palabras Clave de Activación

```javascript
// Ejemplos de entrada que activan módulos:
"Me despidieron y me hicieron firmar documentos en blanco"
→ Activa MOD034 (Nulidad Preventiva)

"Trabajo para outsourcing con múltiples empresas"  
→ Activa MOD033 (Anti-Evasión Empresarial)

"El SAT me está pidiendo información fiscal"
→ Activa MOD051 (Respuesta SAT)
```

## ⚙️ Personalización

### Agregar Nuevos Módulos

1. **Editar `js/app.js`**
   ```javascript
   // Añadir en modulos_tacticos
   "MOD###": {
       nombre: "nombre_del_modulo",
       activadores: ["palabra1", "palabra2"],
       efectividad: 85,
       descripcion: "Descripción del módulo"
   }
   ```

2. **Actualizar detección**
   ```javascript
   // En función detectModules()
   if (this.containsKeywords(input, ['nueva_palabra_clave'])) {
       detectedModules.push('MOD###');
   }
   ```

### Personalizar Estilos

1. **Colores principales** en `css/styles.css`:
   ```css
   :root {
       --primary-blue: #2563eb;    /* Color principal */
       --secondary-blue: #1e40af;  /* Color secundario */
       --success-green: #10b981;   /* Color éxito */
   }
   ```

2. **Logo y branding**:
   ```css
   .wolf-logo {
       /* Cambiar emoji 🐺 por imagen */
       background-image: url('assets/logo.png');
   }
   ```

## 🔧 Configuración Avanzada

### Integración con APIs Externas

```javascript
// En app.js - para integrar APIs reales
async loadExternalData() {
    // OpenAI API para análisis avanzado
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer tu-api-key',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system', 
                    content: JSON.stringify(this.lexwolfData)
                },
                {
                    role: 'user',
                    content: situationInput
                }
            ]
        })
    });
}
```

### Base de Datos (Futuro)

```javascript
// Estructura para eventual backend
const caseSchema = {
    id: String,
    client: {
        name: String,
        email: String,
        phone: String
    },
    case: {
        type: String,
        status: String,
        modules: [String],
        documents: [String],
        timeline: [Object]
    },
    created: Date,
    updated: Date
};
```

## 📱 Responsive Design

El sistema se adapta automáticamente a:

- **Desktop** (1200px+): Layout completo de 3 columnas
- **Tablet** (768px-1199px): Layout comprimido
- **Móvil** (<768px): Layout vertical apilado

## 🔒 Seguridad y Privacidad

### Para Uso Personal
- Datos almacenados localmente en el navegador
- Sin conexiones externas por defecto
- Código fuente completamente visible

### Para Uso Profesional
- Considera implementar HTTPS
- Agregar autenticación si compartes acceso
- Backup regular de casos importantes
- No incluir datos sensibles en el código

## 🐛 Troubleshooting

### Problemas Comunes

1. **El análisis no funciona**
   ```javascript
   // Verificar que lexwolfData se cargó correctamente
   console.log(window.lexwolfSystem.lexwolfData);
   ```

2. **Estilos no se cargan**
   ```html
   <!-- Verificar rutas en index.html -->
   <link rel="stylesheet" href="css/styles.css">
   ```

3. **Modal no se abre**
   ```javascript
   // Verificar event listeners
   console.log('Modal button clicked');
   ```

### Debug Mode

```javascript
// Activar en consola del navegador
window.lexwolfDebug = true;
// Mostrará información detallada de análisis
```

## 🚧 Roadmap

### Versión 1.1
- [ ] Exportación de casos a PDF
- [ ] Calculadora de finiquitos integrada
- [ ] Templates de documentos legales
- [ ] Búsqueda avanzada de casos

### Versión 1.2  
- [ ] Integración con WhatsApp Business API
- [ ] Calendario de audiencias
- [ ] Notificaciones automáticas
- [ ] Dashboard para clientes

### Versión 2.0
- [ ] Backend con base de datos
- [ ] Multi-usuario y roles
- [ ] Integración con OpenAI
- [ ] App móvil nativa

## 📞 Soporte

Para problemas o sugerencias:

1. **Issues en GitHub**: Reportar bugs o solicitar features
2. **Documentación**: Revisar este README
3. **Código**: Examinar comentarios en `js/app.js`

## 📄 Licencia

Sistema LexWolf desarrollado para uso profesional de LexLaboral.

**Uso Permitido:**
- Uso personal y profesional
- Modificación y personalización
- Distribución interna en tu organización

**Uso NO Permitido:**
- Reventa como producto comercial
- Distribución masiva sin autorización
- Uso de módulos Makario fuera del contexto LexWolf

---

## 🎯 Quick Start

```bash
# 1. Crear directorio
mkdir lexwolf-app && cd lexwolf-app

# 2. Crear archivos principales
touch index.html
mkdir css js data
touch css/styles.css js/app.js data/lexwolf_v7.0.json

# 3. Copiar código de los artifacts
# (Copiar contenido de cada archivo desde los artifacts)

# 4. Abrir en navegador
open index.html
```

**¡Tu sistema LexWolf está listo para dominar el campo legal! 🐺⚖️**