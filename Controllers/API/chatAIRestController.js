// chatAIRestController.js - Controlador para las peticiones de Chat AI
const https = require('https');
const http = require('http');
const url = require('url');

// Configuración de la API desde variables de entorno
require('dotenv').config();

const AI_CONFIG = {
  // GROQ API - RÁPIDA Y CONFIABLE
  API_ENDPOINT: process.env.AI_API_ENDPOINT || "https://api.groq.com/openai/v1/chat/completions",
  API_KEY: process.env.AI_API_KEY || "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",
  MODEL: process.env.AI_MODEL || "meta-llama/llama-4-scout-17b-16e-instruct",
  USE_MOCK_RESPONSES: false // USAR IA REAL DE GROQ
};

/**
 * Procesar consulta de chat AI para Biomo
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
async function processChatMessage(req, res) {
  try {
    const { message, context = 'biomo' } = req.body;
    
    console.log(`Chat request - Context: ${context}, Message: "${message}"`);
    
    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Mensaje requerido'
      });
    }

    // Configurar contexto del sistema según el tipo
    let systemContent = '';
    switch (context) {
      case 'biomo':
        systemContent = "Eres un asistente especializado en biomonitoreo ambiental. Tu nombre es Mawi AI y ayudas a los usuarios con consultas sobre su Biomo (sistema de biomonitoreo). Proporciona respuestas útiles, técnicas pero comprensibles sobre biodiversidad, monitoreo ambiental, análisis de datos ecológicos y gestión de proyectos ambientales. Siempre mantén un tono profesional pero amigable.";
        break;
      case 'explorador':
        systemContent = "Eres un asistente especializado en ayudar con la exploración y gestión de anteproyectos ambientales. Ayudas a los usuarios a encontrar convocatorias, gestionar proyectos y proporcionar información sobre oportunidades de financiamiento ambiental.";
        break;
      default:
        systemContent = "Eres un asistente especializado en biomonitoreo y gestión ambiental. Proporciona respuestas útiles y técnicas sobre temas ambientales.";
    }    // Preparar los datos para Groq API (formato OpenAI)
    const apiData = {
      model: AI_CONFIG.MODEL,
      messages: [
        {
          role: "system",
          content: systemContent
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
      stream: false
    };// Hacer la petición a la API de AI
    console.log(`Making AI API request to: ${AI_CONFIG.API_ENDPOINT}`);
    
    // Si está activado el modo mock, usar respuestas inteligentes simuladas
    if (AI_CONFIG.USE_MOCK_RESPONSES) {
      console.log('🤖 Using intelligent mock responses');
      const mockResponse = getIntelligentMockResponse(context, message);
      return res.json({
        success: true,
        response: mockResponse,
        model: 'Mawi-AI-Local',
        note: 'Respuesta generada por IA local mientras se configura el servicio externo'
      });
    }
    
    const aiResponse = await makeAPIRequest(apiData);    if (aiResponse.success) {
      console.log('✅ AI API response successful');
      // Procesar respuesta de Groq/OpenAI
      let response = '';
      if (aiResponse.data && aiResponse.data.choices && aiResponse.data.choices.length > 0) {
        response = aiResponse.data.choices[0].message.content;
      } else {
        response = 'Lo siento, no pude generar una respuesta adecuada.';
      }
      
      res.json({
        success: true,
        response: response,
        model: AI_CONFIG.MODEL
      });
    } else {
      console.log('AI API failed, using fallback response:', aiResponse.error);
      // Enviar respuesta de fallback en caso de error
      res.json({
        success: false,
        error: aiResponse.error,
        fallbackResponse: getFallbackResponse(context, message)
      });
    }

  } catch (error) {
    console.error('Error en processChatMessage:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      fallbackResponse: getFallbackResponse(req.body.context || 'biomo', req.body.message || '')
    });
  }
}

/**
 * Hacer petición HTTP a la API de AI
 * @param {Object} data - Datos para enviar a la API
 * @returns {Promise} - Promesa con la respuesta
 */
function makeAPIRequest(data) {
  return new Promise((resolve, reject) => {
    const apiUrl = url.parse(AI_CONFIG.API_ENDPOINT);
    const isHttps = apiUrl.protocol === 'https:';
    const httpModule = isHttps ? https : http;
    
    const postData = JSON.stringify(data);
    
    const options = {
      hostname: apiUrl.hostname,
      port: apiUrl.port || (isHttps ? 443 : 80),
      path: apiUrl.path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_CONFIG.API_KEY}`,
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = httpModule.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          if (res.statusCode === 200) {
            const jsonResponse = JSON.parse(responseData);
            resolve({
              success: true,
              data: jsonResponse
            });
          } else {
            resolve({
              success: false,
              error: `API returned status ${res.statusCode}: ${responseData}`
            });
          }
        } catch (error) {
          resolve({
            success: false,
            error: `Error parsing API response: ${error.message}`
          });
        }
      });
    });

    req.on('error', (error) => {
      resolve({
        success: false,
        error: `Request error: ${error.message}`
      });
    });

    req.setTimeout(30000, () => {
      req.abort();
      resolve({
        success: false,
        error: 'Request timeout'
      });
    });

    req.write(postData);
    req.end();
  });
}

/**
 * Generar respuesta de fallback cuando la API no está disponible
 * @param {string} context - Contexto de la consulta
 * @param {string} message - Mensaje del usuario
 * @returns {string} - Respuesta de fallback
 */
function getFallbackResponse(context, message) {
  const messageLower = message ? message.toLowerCase() : '';
  
  // Respuestas contextuales basadas en palabras clave del mensaje
  const keywordResponses = {
    biomo: {
      'datos|registros|información': '📊 Para consultar tus datos de biomonitoreo, puedes acceder al panel de administración donde encontrarás todos tus registros organizados por fecha y tipo de muestra.',
      'subir|cargar|upload': '📤 Para subir nuevos datos a tu Biomo, utiliza el botón "Subir Datos" ubicado en la parte superior de esta página. Asegúrate de que tus archivos estén en formato compatible.',
      'reporte|pdf|generar': '📋 Para generar reportes de biodiversidad, usa el botón "Generar PDF" que te permite crear documentos con análisis detallados de tus datos.',
      'especies|biodiversidad|flora|fauna': '🌱 Para información sobre especies específicas, consulta nuestra base de datos de biodiversidad integrada que incluye catálogos de flora y fauna regional.',
      'analisis|estadisticas|gráficos': '📈 Para análisis avanzados, utiliza las herramientas de visualización en tu dashboard que incluyen gráficos estadísticos y mapas de distribución.',
      'ayuda|help|como': '💡 Te puedo ayudar con consultas sobre biomonitoreo, gestión de datos ambientales, análisis de biodiversidad y generación de reportes. ¿Qué tema específico te interesa?'
    },
    explorador: {
      'buscar|encontrar|convocatorias': '🔍 Para buscar convocatorias activas, usa el campo de búsqueda en la parte superior. Puedes filtrar por tema, fecha límite o institución.',
      'crear|nuevo|proyecto': '📋 Para crear un nuevo anteproyecto, haz clic en "Crear Nuevo Anteproyecto" donde encontrarás plantillas predefinidas para diferentes tipos de proyectos ambientales.',
      'estado|mis proyectos|seguimiento': '📊 Para ver el estado de tus proyectos, revisa las pestañas "Abiertos" y "Cerrados" donde puedes hacer seguimiento del progreso de cada anteproyecto.',
      'financiamiento|fondos|presupuesto': '💰 Para obtener ideas de financiamiento, explora las convocatorias disponibles organizadas por tipo de fondo y monto disponible.',
      'editar|gestionar|modificar': '✏️ Para gestionar tus anteproyectos, cada proyecto tiene herramientas de edición que te permiten actualizar información, adjuntar documentos y hacer seguimiento.',
      'ayuda|help|como': '🎯 Te puedo ayudar con la exploración de convocatorias, creación y gestión de anteproyectos, búsqueda de financiamiento y seguimiento de proyectos. ¿En qué puedo asistirte específicamente?'
    }
  };
  
  // Respuestas generales por defecto
  const defaultResponses = {
    biomo: [
      "🔬 Como especialista en biomonitoreo, te puedo ayudar con análisis de datos ecológicos, gestión de registros de biodiversidad y generación de reportes ambientales.",
      "📊 Para trabajar con tu Biomo, puedes acceder a herramientas de visualización de datos, cargar nuevos registros o generar informes personalizados.",
      "🌿 El sistema Biomo te permite gestionar datos de biodiversidad, analizar tendencias ecológicas y crear reportes técnicos para tus proyectos ambientales."
    ],
    explorador: [
      "🎯 Como asistente del explorador de proyectos, te puedo ayudar a encontrar convocatorias, gestionar anteproyectos y buscar oportunidades de financiamiento.",
      "📋 El explorador te permite crear y gestionar anteproyectos ambientales, buscar convocatorias activas y hacer seguimiento a tus propuestas.",
      "💡 Puedes usar el explorador para descubrir nuevas oportunidades de financiamiento, organizar tus proyectos y acceder a herramientas de gestión."
    ]
  };

  const contextKeywords = keywordResponses[context] || keywordResponses.biomo;
  const contextDefaults = defaultResponses[context] || defaultResponses.biomo;
  
  // Buscar respuesta basada en palabras clave
  for (const [keywords, response] of Object.entries(contextKeywords)) {
    const keywordList = keywords.split('|');
    if (keywordList.some(keyword => messageLower.includes(keyword))) {
      return `${response}\n\n¿Necesitas más información sobre algún tema específico?`;
    }
  }
  
  // Si no encuentra palabras clave específicas, usar respuesta por defecto
  const randomDefault = contextDefaults[Math.floor(Math.random() * contextDefaults.length)];
  
  return `Lo siento, el servicio de AI está temporalmente no disponible. \n\n${randomDefault}\n\n¿En qué más puedo ayudarte?`;
}

module.exports = {
  processChatMessage
};
