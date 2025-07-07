// LexWolf Dashboard - JavaScript Simplificado
console.log('🐺 LexWolf System Loading...');

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ LexWolf DOM Ready');
    
    // Datos básicos del sistema
    const lexwolfData = {
        modulos: {
            "MOD033": {
                nombre: "Anti-evasión empresarial múltiple",
                keywords: ["outsourcing", "multiple", "empresas", "casino"],
                efectividad: 92,
                descripcion: "Estrategia anti-evasión empresarial múltiple"
            },
            "MOD034": {
                nombre: "Nulidad preventiva documentos blanco", 
                keywords: ["documentos", "blanco", "firmar", "sin leer"],
                efectividad: 88,
                descripcion: "Neutralizar fabricación posterior de documentos"
            },
            "MOD051": {
                nombre: "Respuesta sistemática SAT",
                keywords: ["sat", "requerimiento", "fiscal", "cfdi"],
                efectividad: 95,
                descripcion: "Respuesta sistemática a requerimientos SAT"
            },
            "MOD048": {
                nombre: "Neutralización defensas patronales",
                keywords: ["patronal", "contestacion", "defensas"],
                efectividad: 90,
                descripcion: "Neutralizar defensas patronales sistemáticas"
            }
        }
    };

    // Función principal de análisis
    function analizarSituacion() {
        console.log('🔍 Iniciando análisis...');
        
        const input = document.getElementById('situationInput');
        const analysisContent = document.getElementById('analysisContent');
        const moduleReference = document.getElementById('moduleReference');
        const moduleText = document.getElementById('moduleText');

        if (!input || !analysisContent) {
            console.error('❌ Elementos no encontrados');
            return;
        }

        const texto = input.value.toLowerCase().trim();
        
        if (!texto) {
            analysisContent.innerHTML = '<p>Por favor, describe la situación legal para análisis.</p>';
            if (moduleReference) moduleReference.style.display = 'none';
            return;
        }

        console.log('📝 Analizando:', texto);

        // Detectar módulos
        const modulosDetectados = [];
        let analisisTexto = '';

        // Detectar evasión empresarial
        if (contieneKeywords(texto, ['outsourcing', 'multiple', 'empresas', 'casino'])) {
            modulosDetectados.push('MOD033');
            analisisTexto += '<p><strong>🎯 PATRÓN DETECTADO:</strong> Evasión empresarial múltiple. Se recomienda implementar estrategia anti-evasión con demanda simultánea de múltiples entidades.</p>';
        }

        // Detectar documentos en blanco
        if (contieneKeywords(texto, ['documentos', 'blanco', 'firmar', 'sin leer'])) {
            modulosDetectados.push('MOD034');
            analisisTexto += '<p><strong>🚨 ALERTA CRÍTICA:</strong> Posible firma de documentos en blanco detectada. Se debe solicitar nulidad preventiva desde la demanda inicial.</p>';
        }

        // Detectar problemas SAT
        if (contieneKeywords(texto, ['sat', 'requerimiento', 'fiscal', 'cfdi', 'spei'])) {
            modulosDetectados.push('MOD051');
            analisisTexto += '<p><strong>⚠️ RIESGO FISCAL:</strong> Situación con implicaciones SAT detectada. Se requiere respuesta sistemática y documentación preventiva.</p>';
        }

        // Detectar despido
        if (contieneKeywords(texto, ['despidieron', 'despido', 'termino', 'corrieron'])) {
            if (!modulosDetectados.includes('MOD034')) {
                modulosDetectados.push('MOD034');
            }
            modulosDetectados.push('MOD048');
            analisisTexto += '<p><strong>⚔️ CONTRAATAQUE REQUERIDO:</strong> Se anticipan defensas patronales. Preparar neutralización de arsenal defensivo.</p>';
        }

        // Si no se detectó nada
        if (modulosDetectados.length === 0) {
            analisisTexto = '<p>Situación analizada. No se detectaron patrones específicos en el arsenal LexWolf. Se recomienda análisis manual detallado.</p>';
        }

        // Mostrar resultados
        analysisContent.innerHTML = analisisTexto;
        
        if (modulosDetectados.length > 0 && moduleReference && moduleText) {
            moduleText.textContent = `LexWolf | ref: ${modulosDetectados.join(', ')} | Local`;
            moduleReference.style.display = 'flex';
        } else if (moduleReference) {
            moduleReference.style.display = 'none';
        }

        // Actualizar consejos
        actualizarConsejos(modulosDetectados);

        console.log('✅ Análisis completado. Módulos:', modulosDetectados);
    }

    // Función auxiliar para detectar keywords
    function contieneKeywords(texto, keywords) {
        return keywords.some(keyword => texto.includes(keyword));
    }

    // Actualizar consejos operacionales
    function actualizarConsejos(modulos) {
        const tipsElement = document.getElementById('operationalTips');
        if (!tipsElement) return;

        const tips = {
            'MOD033': 'Implementar cláusula "A QUIEN RESULTE RESPONSABLE" en demanda múltiple.',
            'MOD034': 'Solicitar nulidad preventiva de documentos desde demanda inicial.',
            'MOD051': 'Preparar respuesta sistemática SAT con documentación completa.',
            'MOD048': 'Anticipar y neutralizar defensas patronales sistemáticas.'
        };

        if (modulos.length > 0) {
            const activeTips = modulos.map(mod => tips[mod]).filter(Boolean);
            tipsElement.innerHTML = '<ul>' + activeTips.map(tip => `<li>${tip}</li>`).join('') + '</ul>';
        } else {
            tipsElement.innerHTML = '<p>Considera implementar módulos adicionales según evolucione el caso.</p>';
        }
    }

    // Mostrar modal nuevo caso
    function mostrarModalNuevoCaso() {
        console.log('📋 Abriendo modal nuevo caso...');
        const modal = document.getElementById('newCaseModal');
        if (modal) {
            modal.classList.add('active');
        }
    }

    // Cerrar modal nuevo caso
    function cerrarModalNuevoCaso() {
        console.log('❌ Cerrando modal nuevo caso...');
        const modal = document.getElementById('newCaseModal');
        if (modal) {
            modal.classList.remove('active');
            const form = document.getElementById('newCaseForm');
            if (form) form.reset();
        }
    }

    // Array para almacenar casos
    let casosCreados = [];

    // Crear nuevo caso
    function crearNuevoCaso(event) {
        if (event) event.preventDefault();
        
        console.log('✅ Creando nuevo caso...');
        
        const clientName = document.getElementById('clientName')?.value || '';
        const caseType = document.getElementById('caseType')?.value || '';
        const caseDescription = document.getElementById('caseDescription')?.value || '';

        if (!clientName || !caseType || !caseDescription) {
            mostrarNotificacion('⚠️ Complete todos los campos');
            return;
        }

        // Crear objeto del caso
        const nuevoCaso = {
            id: Date.now().toString(),
            cliente: clientName,
            tipo: caseType,
            descripcion: caseDescription,
            titulo: obtenerTituloCaso(caseType),
            hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
            tags: obtenerTagsCaso(caseType),
            estado: 'active'
        };

        // Agregar a la lista
        casosCreados.unshift(nuevoCaso);
        
        // Actualizar la lista visual
        actualizarListaCasos();
        
        mostrarNotificacion('✅ Caso creado exitosamente');
        cerrarModalNuevoCaso();
        
        console.log('📋 Nuevo caso creado:', nuevoCaso);
    }

    // Obtener título según tipo
    function obtenerTituloCaso(tipo) {
        const titulos = {
            'despido': 'Despido Injustificado',
            'outsourcing': 'Evasión Outsourcing',
            'discriminacion': 'Discriminación Laboral',
            'finiquito': 'Cálculo Finiquito'
        };
        return titulos[tipo] || 'Caso Laboral';
    }

    // Obtener tags según tipo
    function obtenerTagsCaso(tipo) {
        const tags = {
            'despido': ['ALTA', 'MOD034'],
            'outsourcing': ['CRÍTICA', 'MOD033'],
            'discriminacion': ['MEDIA', 'MOD037'],
            'finiquito': ['BAJA', 'MOD068']
        };
        return tags[tipo] || ['NUEVO'];
    }

    // Actualizar lista visual de casos
    function actualizarListaCasos() {
        const casesList = document.getElementById('casesList');
        if (!casesList) return;

        // Limpiar lista actual
        casesList.innerHTML = '';

        // Agregar casos creados
        casosCreados.forEach(caso => {
            const caseElement = crearElementoCaso(caso);
            casesList.appendChild(caseElement);
        });

        // Agregar casos por defecto
        const casosDefault = [
            {
                id: '001',
                titulo: 'Despido Injustificado',
                hora: '15:47',
                tags: ['ALTA', 'MOD034'],
                descripcion: 'Despido sin causa justificada en empresa de outsourcing',
                estado: 'active'
            },
            {
                id: '002',
                titulo: 'Terminación de Contrato',
                hora: '14:23',
                tags: ['MOD033'],
                descripcion: 'Terminación simulada de contrato laboral',
                estado: 'pending'
            },
            {
                id: '003',
                titulo: 'Evasión Empresarial',
                hora: '10:21',
                tags: ['RESUELTO', 'MOD033'],
                descripcion: 'Estructura de evasión empresarial múltiple',
                estado: 'resolved'
            }
        ];

        casosDefault.forEach(caso => {
            const caseElement = crearElementoCaso(caso);
            casesList.appendChild(caseElement);
        });

        console.log(`✅ Lista actualizada con ${casosCreados.length} casos nuevos`);
    }

    // Crear elemento visual del caso
    function crearElementoCaso(caso) {
        const caseDiv = document.createElement('div');
        caseDiv.className = 'case-item';
        caseDiv.dataset.case = caso.id;
        
        const statusClass = `status-${caso.estado}`;
        const tagsHtml = caso.tags.map(tag => {
            const tagClass = obtenerClaseTag(tag);
            return `<span class="tag ${tagClass}">${tag}</span>`;
        }).join('');

        caseDiv.innerHTML = `
            <div class="case-status ${statusClass}"></div>
            <div class="case-info">
                <h4>${caso.titulo}</h4>
                <p class="case-time">${caso.hora}</p>
                <div class="case-tags">${tagsHtml}</div>
            </div>
        `;

        // Agregar event listener al nuevo elemento
        caseDiv.addEventListener('click', function() {
            seleccionarCaso(caso);
        });
        caseDiv.style.cursor = 'pointer';

        return caseDiv;
    }

    // Obtener clase CSS para tags
    function obtenerClaseTag(tag) {
        if (['ALTA', 'CRÍTICA'].includes(tag)) return 'tag-priority';
        if (tag.startsWith('MOD')) return 'tag-module';
        if (['RESUELTO', 'COMPLETADO'].includes(tag)) return 'tag-success';
        return 'tag-module';
    }

    // Seleccionar caso y cargar datos
    function seleccionarCaso(caso) {
        console.log('📋 Seleccionando caso:', caso.titulo);
        
        // Remover selección anterior
        document.querySelectorAll('.case-item').forEach(item => {
            item.classList.remove('active');
        });

        // Seleccionar nuevo caso
        const caseElement = document.querySelector(`[data-case="${caso.id}"]`);
        if (caseElement) {
            caseElement.classList.add('active');
        }

        // Cargar descripción en el input
        const input = document.getElementById('situationInput');
        if (input && caso.descripcion) {
            input.value = caso.descripcion;
            
            // Auto-analizar después de un momento
            setTimeout(() => {
                analizarSituacion();
            }, 500);
        }

        mostrarNotificacion(`📋 Caso "${caso.titulo}" cargado`);
    }

    // Mostrar información de módulo
    function mostrarInfoModulo(moduleId) {
        const modulo = lexwolfData.modulos[moduleId];
        if (modulo) {
            const mensaje = `${moduleId}: ${modulo.descripcion}\nEfectividad: ${modulo.efectividad}%`;
            mostrarNotificacion(mensaje);
        }
    }

    // Mostrar notificación
    function mostrarNotificacion(mensaje) {
        console.log('📢 Notificación:', mensaje);
        
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2563eb;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
            z-index: 1001;
            max-width: 300px;
            font-size: 0.875rem;
            line-height: 1.4;
        `;
        notification.textContent = mensaje;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Configurar event listeners
    console.log('🔗 Configurando event listeners...');

    // Botón analizar
    const analyzeBtn = document.getElementById('analyzeBtn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', analizarSituacion);
        console.log('✅ Botón analizar configurado');
    } else {
        console.error('❌ Botón analizar no encontrado');
    }

    // Input de situación (Enter para analizar)
    const situationInput = document.getElementById('situationInput');
    if (situationInput) {
        situationInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && e.ctrlKey) {
                analizarSituacion();
            }
        });
        console.log('✅ Input situación configurado');
    }

    // Botón nuevo caso
    const newCaseBtn = document.getElementById('newCaseBtn');
    if (newCaseBtn) {
        newCaseBtn.addEventListener('click', mostrarModalNuevoCaso);
        console.log('✅ Botón nuevo caso configurado');
    } else {
        console.error('❌ Botón nuevo caso no encontrado');
    }

    // Botón cerrar modal
    const closeModal = document.getElementById('closeModal');
    if (closeModal) {
        closeModal.addEventListener('click', cerrarModalNuevoCaso);
        console.log('✅ Botón cerrar modal configurado');
    }

    // Botón cancelar caso
    const cancelCase = document.getElementById('cancelCase');
    if (cancelCase) {
        cancelCase.addEventListener('click', cerrarModalNuevoCaso);
        console.log('✅ Botón cancelar configurado');
    }

    // Formulario nuevo caso
    const newCaseForm = document.getElementById('newCaseForm');
    if (newCaseForm) {
        newCaseForm.addEventListener('submit', crearNuevoCaso);
        console.log('✅ Formulario nuevo caso configurado');
    }

    // Cerrar modal al hacer clic fuera
    const modal = document.getElementById('newCaseModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                cerrarModalNuevoCaso();
            }
        });
        console.log('✅ Click fuera del modal configurado');
    }

    // Arsenal de módulos
    const arsenalItems = document.querySelectorAll('.arsenal-item');
    arsenalItems.forEach(item => {
        const moduleId = item.dataset.module;
        if (moduleId) {
            item.addEventListener('click', () => mostrarInfoModulo(moduleId));
            item.style.cursor = 'pointer';
        }
    });
    console.log(`✅ ${arsenalItems.length} módulos del arsenal configurados`);

    // Inicializar lista de casos (esto reemplaza la configuración manual anterior)
    actualizarListaCasos();

    // Atajos de teclado
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'n':
                    e.preventDefault();
                    mostrarModalNuevoCaso();
                    break;
            }
        }
        
        if (e.key === 'Escape') {
            cerrarModalNuevoCaso();
        }
    });
    console.log('✅ Atajos de teclado configurados');

    console.log('🎉 LexWolf System Ready!');
});

// Test function para verificar que el JS está cargando
window.testLexWolf = function() {
    console.log('🧪 Test LexWolf - Sistema funcionando');
    alert('✅ LexWolf JavaScript está funcionando correctamente');
};

console.log('📁 LexWolf JavaScript file loaded');
