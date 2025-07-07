// LexWolf + Claude AI Wrapper Integration
class LexWolfClaudeSystem extends LexWolfSystem {
    constructor() {
        super();
        this.claudeApiKey = null;
        this.claudeEnabled = false;
        this.setupClaudeIntegration();
    }

    setupClaudeIntegration() {
        // Verificar si hay API key configurada
        this.claudeApiKey = localStorage.getItem('claude_api_key');
        this.claudeEnabled = !!this.claudeApiKey;
        
        // Agregar botón de configuración de API
        this.addApiKeySettings();
    }

    addApiKeySettings() {
        const header = document.querySelector('.header');
        const settingsBtn = document.createElement('button');
        settingsBtn.innerHTML = '<i class="fas fa-cog"></i>';
        settingsBtn.className = 'settings-btn';
        settingsBtn.onclick = () => this.showApiKeyModal();
        
        header.appendChild(settingsBtn);
    }

    showApiKeyModal() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Configuración Claude AI</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>API Key de Anthropic</label>
                        <input type="password" id="claudeApiKeyInput" 
                               placeholder="sk-ant-api..." 
                               value="${this.claudeApiKey || ''}">
                        <small>Tu API key se guarda localmente en tu navegador</small>
                    </div>
                    <div class="claude-status">
                        <strong>Estado:</strong> 
                        <span class="${this.claudeEnabled ? 'status-online' : 'status-offline'}">
                            ${this.claudeEnabled ? 'Conectado' : 'Desconectado'}
                        </span>
                    </div>
                    <div class="form-actions">
                        <button onclick="this.closest('.modal').remove()" class="btn-secondary">Cancelar</button>
                        <button onclick="lexwolfSystem.saveApiKey()" class="btn-primary">Guardar</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    saveApiKey() {
        const apiKeyInput = document.getElementById('claudeApiKeyInput');
        const apiKey = apiKeyInput.value.trim();
        
        if (apiKey) {
            localStorage.setItem('claude_api_key', apiKey);
            this.claudeApiKey = apiKey;
            this.claudeEnabled = true;
            this.showNotification('Claude AI configurado correctamente');
        } else {
            localStorage.removeItem('claude_api_key');
            this.claudeApiKey = null;
            this.claudeEnabled = false;
            this.showNotification('Claude AI desconectado');
        }
        
        document.querySelector('.modal').remove();
        this.updateClaudeStatus();
    }

    updateClaudeStatus() {
        // Actualizar indicador en el dashboard
        const statusIndicator = document.querySelector('.status-indicator span');
        if (statusIndicator) {
            statusIndicator.textContent = this.claudeEnabled ? 'Claude AI Activo' : 'Sistema Local';
        }
    }

    // Override del método de análisis para usar Claude AI
    async analyzeSituation() {
        const input = document.getElementById('situationInput').value;
        const analysisContent = document.getElementById('analysisContent');
        const moduleReference = document.getElementById('moduleReference');
        const moduleText = document.getElementById('moduleText');

        if (!input.trim()) {
            analysisContent.textContent = 'Por favor, describe la situación legal para análisis.';
            moduleReference.style.display = 'none';
            return;
        }

        // Mostrar indicador de carga
        analysisContent.innerHTML = '<div class="loading">🔄 Analizando con Claude AI...</div>';
        moduleReference.style.display = 'none';

        try {
            let analysis;
            
            if (this.claudeEnabled) {
                // Análisis con Claude AI
                analysis = await this.analyzeWithClaude(input);
            } else {
                // Fallback al análisis local
                analysis = this.analyzeWithLocalSystem(input);
            }

            // Mostrar resultados
            analysisContent.innerHTML = analysis.text;
            
            if (analysis.modules && analysis.modules.length > 0) {
                moduleText.textContent = `LexWolf | ref: ${analysis.modules.join(', ')} | ${this.claudeEnabled ? 'Claude AI' : 'Local'}`;
                moduleReference.style.display = 'flex';
            }

            // Actualizar consejos operacionales
            this.updateOperationalTips(analysis.modules || []);

        } catch (error) {
            console.error('Error en análisis:', error);
            
            // Fallback automático al sistema local
            const localAnalysis = this.analyzeWithLocalSystem(input);
            analysisContent.innerHTML = localAnalysis.text + '<br><small><em>⚠️ Usando análisis local (Claude AI no disponible)</em></small>';
            
            if (localAnalysis.modules.length > 0) {
                moduleText.textContent = `LexWolf | ref: ${localAnalysis.modules.join(', ')} | Local`;
                moduleReference.style.display = 'flex';
            }
        }
    }

    async analyzeWithClaude(input) {
        if (!this.claudeApiKey) {
            throw new Error('API key de Claude no configurada');
        }

        // Preparar el prompt con contexto del JSON
        const systemPrompt = this.buildSystemPrompt();
        const userPrompt = `Analiza esta situación legal: "${input}"`;

        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.claudeApiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-sonnet-20240229',
                max_tokens: 1000,
                messages: [
                    {
                        role: 'user',
                        content: `${systemPrompt}\n\n${userPrompt}`
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`Error de API: ${response.status}`);
        }

        const data = await response.json();
        const claudeResponse = data.content[0].text;

        // Extraer módulos de la respuesta de Claude
        const modules = this.extractModulesFromResponse(claudeResponse);

        return {
            text: claudeResponse,
            modules: modules
        };
    }

    buildSystemPrompt() {
        return `Actúa como un asistente legal especializado que opera con el arsenal táctico-legal documentado en LexWolf v7.0.

INSTRUCCIONES CRÍTICAS:
1. Analiza la situación usando EXCLUSIVAMENTE los módulos del sistema LexWolf
2. SIEMPRE indica al final qué módulos específicos aplican con el formato: [MOD###]
3. Usa terminología directa y estratégica, sin jergas legales innecesarias

MÓDULOS DISPONIBLES:
- MOD033: Anti-evasión empresarial múltiple (92% efectividad)
  Activadores: outsourcing, múltiples empresas, casino, cambio razón social
  
- MOD034: Nulidad preventiva documentos en blanco (88% efectividad)  
  Activadores: firma documentos blanco, documentos sin contenido
  
- MOD051: Respuesta sistemática requerimientos SAT (95% efectividad)
  Activadores: SAT, requerimientos, verificación domicilio, problemas fiscales
  
- MOD048: Neutralización arsenal defensivo patronal (90% efectividad)
  Activadores: contestación patronal, ofrecimiento mejorado, abandono trabajo

PATRONES MAKARIO CORE:
- Evasión empresarial: múltiples entidades + cláusula "A QUIEN RESULTE"
- Documentos blanco: nulidad preventiva desde demanda inicial
- Casino/outsourcing: estructuras complejas de evasión

RESPONDE EN MÁXIMO 3 PÁRRAFOS con análisis táctico directo y módulos aplicables.

Arsenal LexWolf: ${JSON.stringify(this.lexwolfData.modulos_tacticos_ultimate, null, 2)}`;
    }

    extractModulesFromResponse(response) {
        const moduleRegex = /\[MOD\d{3}\]/g;
        const matches = response.match(moduleRegex);
        
        if (matches) {
            return matches.map(match => match.replace(/[\[\]]/g, ''));
        }
        
        // Fallback: detectar módulos por contenido
        const modules = [];
        if (response.toLowerCase().includes('evasión') || response.toLowerCase().includes('outsourcing')) {
            modules.push('MOD033');
        }
        if (response.toLowerCase().includes('documentos') && response.toLowerCase().includes('blanco')) {
            modules.push('MOD034');
        }
        if (response.toLowerCase().includes('sat') || response.toLowerCase().includes('fiscal')) {
            modules.push('MOD051');
        }
        
        return modules;
    }

    analyzeWithLocalSystem(input) {
        // Usar el sistema local original como fallback
        const detectedModules = this.detectModules(input.toLowerCase());
        const analysis = this.generateAnalysis(input, detectedModules);
        
        return {
            text: analysis.text,
            modules: analysis.modules
        };
    }

    // Método para probar la conexión con Claude
    async testClaudeConnection() {
        if (!this.claudeEnabled) {
            this.showNotification('Configure primero su API key de Claude AI');
            return;
        }

        try {
            const testResponse = await this.analyzeWithClaude('Test de conexión');
            this.showNotification('✅ Claude AI conectado correctamente');
            return true;
        } catch (error) {
            this.showNotification('❌ Error conectando con Claude AI: ' + error.message);
            return false;
        }
    }

    // Método para mostrar estadísticas de uso
    getUsageStats() {
        const stats = {
            claudeQueries: parseInt(localStorage.getItem('claude_queries') || '0'),
            localQueries: parseInt(localStorage.getItem('local_queries') || '0'),
            totalSaved: parseInt(localStorage.getItem('total_saved') || '0')
        };

        // Incrementar contador según el tipo de análisis usado
        if (this.claudeEnabled) {
            stats.claudeQueries++;
            localStorage.setItem('claude_queries', stats.claudeQueries.toString());
        } else {
            stats.localQueries++;  
            localStorage.setItem('local_queries', stats.localQueries.toString());
        }

        return stats;
    }

    // Override del método de estadísticas para incluir Claude
    updateStats() {
        super.updateStats();
        
        const stats = this.getUsageStats();
        
        // Agregar estadísticas de Claude si están disponibles
        const claudeStatsElement = document.getElementById('claudeStats');
        if (claudeStatsElement) {
            claudeStatsElement.innerHTML = `
                <div class="stat-item">
                    <span class="stat-label">Consultas Claude</span>
                    <span class="stat-value">${stats.claudeQueries}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Consultas Locales</span>
                    <span class="stat-value">${stats.localQueries}</span>
                </div>
            `;
        }
    }
}

// CSS adicional para Claude integration
const claudeStyles = `
.settings-btn {
    background: var(--gray-200);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    color: var(--gray-600);
    transition: all 0.2s;
}

.settings-btn:hover {
    background: var(--gray-300);
    color: var(--primary-blue);
}

.claude-status {
    background: var(--gray-50);
    padding: 1rem;
    border-radius: var(--border-radius);
    margin: 1rem 0;
}

.status-online {
    color: var(--success-green);
    font-weight: 600;
}

.status-offline {
    color: var(--danger-red);
    font-weight: 600;
}

.loading {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--primary-blue);
    font-style: italic;
}

.api-cost-warning {
    background: var(--warning-orange);
    color: white;
    padding: 0.5rem;
    border-radius: var(--border-radius);
    font-size: 0.75rem;
    margin-top: 0.5rem;
}
`;

// Inyectar estilos adicionales
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = claudeStyles;
    document.head.appendChild(style);
    
    // Reemplazar sistema básico con sistema Claude-enabled
    window.lexwolfSystem = new LexWolfClaudeSystem();
});

// Utilidades adicionales para Claude
const ClaudeUtils = {
    // Estimar costo de consulta
    estimateTokenCost(text) {
        const tokens = Math.ceil(text.length / 4); // Aproximación
        const costPer1k = 0.003; // Claude 3 Sonnet pricing
        return (tokens / 1000) * costPer1k;
    },

    // Formatear respuesta de Claude
    formatClaudeResponse(response) {
        // Agregar estilos específicos para respuestas de Claude
        return response
            .replace(/\[MOD\d{3}\]/g, '<span class="module-tag">$&</span>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
    },

    // Backup de configuración
    exportConfig() {
        const config = {
            claudeEnabled: window.lexwolfSystem.claudeEnabled,
            hasApiKey: !!window.lexwolfSystem.claudeApiKey,
            stats: window.lexwolfSystem.getUsageStats(),
            timestamp: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(config, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'lexwolf-claude-config.json';
        a.click();
        URL.revokeObjectURL(url);
    }
};