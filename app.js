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

        // Simular creación de caso
        mostrarNotificacion('✅ Caso creado exitosamente');
        cerrarModalNuevoCaso();
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

    // Casos en sidebar
    const caseItems = document.querySelectorAll('.case-item');
    caseItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remover selección anterior
            caseItems.forEach(c => c.classList.remove('active'));
            // Seleccionar nuevo
            this.classList.add('active');
            
            // Cargar descripción del caso en el input
            const caseTitle = this.querySelector('h4')?.textContent || '';
            const input = document.getElementById('situationInput');
            if (input && caseTitle) {
                input.value = `Caso: ${caseTitle}`;
            }
            
            console.log('📋 Caso seleccionado:', caseTitle);
        });
        item.style.cursor = 'pointer';
    });
    console.log(`✅ ${caseItems.length} casos configurados`);

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
