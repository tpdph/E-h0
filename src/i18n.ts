import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all translations
const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        knowledge: "Knowledge Base",
        assistant: {
          title: "Assistant Creation",
          sections: {
            voice: "Voice Training",
            avatar: "Avatar Training",
            shape: "Shape Customization"
          }
        },
        chat: "Chat",
        cantera: "Cantera Repository",
        settings: "Settings"
      },
      common: {
        loading: "Loading...",
        error: "Error",
        success: "Success",
        cancel: "Cancel",
        save: "Save",
        delete: "Delete",
        edit: "Edit",
        add: "Add",
        search: "Search",
        language: "Language",
        settings: "Settings",
        theme: "Theme",
        toggleTheme: "Toggle Theme",
        selectedFiles: "Selected Files",
        clear: "Clear All",
        process: "Process Files",
        selectFiles: "Select Files",
        addMore: "Add More Files",
        upload: "Upload",
        preview: "Preview",
        recording: "Recording",
        processing: "Processing...",
        dragAndDrop: "Drag and drop files here or click to browse",
        uploadInstructions: "Click to upload or drag and drop files here",
        supportedFormats: "Supported file types: PDF, DOC, TXT, MP3, MP4, WAV, JPG, PNG, GIF"
      },
      theme: {
        purple: "Purple",
        crimson: "Crimson",
        mono: "Monochrome",
        neon: "Neon",
        ocean: "Ocean"
      },
      assistant: {
        title: "Create Your Assistant",
        description: "Design and customize your AI assistant",
        uploadFiles: "Upload your files",
        dragAndDrop: "Drag and drop files here or click to browse",
        voice: {
          title: "Voice Customization",
          description: "Customize your assistant's voice with your own recordings",
          startRecording: "Start Recording",
          stopRecording: "Stop Recording",
          recordOnPhone: "Record on Phone",
          tips: "Recording Tips",
          recordings: "Your Recordings",
          scanQR: "Scan QR Code",
          scanInstructions: "Scan this QR code with your mobile device to continue recording"
        },
        shape: {
          title: "Shape Customization",
          description: "Customize your assistant's physical appearance"
        },
        avatar: {
          title: "Avatar Customization",
          description: "Create and customize your assistant's visual appearance",
          upload: {
            title: "Upload Photos",
            description: "Upload photos to train your avatar",
            button: "Upload Photos",
            dragAndDrop: "Drag and drop photos here or click to browse",
            processing: "Processing your photos...",
            success: "Photos uploaded successfully",
            error: "Error uploading photos"
          },
          preview: {
            title: "Avatar Preview",
            generating: "Generating preview...",
            error: "Error generating preview"
          }
        }
      },
      emotional: {
        title: "Emotional State",
        description: "Adjust your assistant's emotional expression",
        intensity: "Intensity",
        states: {
          neutral: "Neutral",
          happy: "Happy",
          sad: "Sad",
          excited: "Excited",
          concerned: "Concerned",
          professional: "Professional"
        }
      },
      knowledgeBase: {
        title: "Knowledge Base",
        description: "Manage and organize your knowledge items",
        add: "Add Knowledge",
        processing: "Processing your knowledge...",
        noItems: "No knowledge items found",
        upload: {
          title: "Upload Files",
          description: "Upload documents to enhance your assistant's knowledge",
          supported: "Supported file types: PDF, DOC, TXT"
        },
        url: {
          title: "Add URL",
          description: "Enter a URL to add as a knowledge source",
          placeholder: "Enter URL here"
        },
        items: {
          source: "Source",
          timestamp: "Added",
          type: "Type",
          status: "Status",
          actions: "Actions"
        },
        processingTitle: "Processing Files",
        processingDescription: "Your files are being analyzed and processed",
        uploadInstructions: "Upload documents to enhance your assistant's knowledge"
      },
      cantera: {
        title: "Cantera Repository",
        description: "Explore and manage your voice and avatar collection",
        voices: "Voice Collection",
        voicesDescription: "Select from our curated collection of voices",
        avatars: "Avatar Collection",
        avatarsDescription: "Choose your preferred avatar",
        select: "Select",
        selected: "Selected",
        preview: "Preview Voice",
        repository: {
          title: "Repository",
          description: "Browse and manage your repositories",
          stars: "stars",
          clone: "Clone",
          cloning: "Cloning...",
          viewOnGithub: "View on GitHub",
          localRepositories: "Local Repositories",
          lastUpdated: "Last updated: {{date}}"
        },
        error: {
          clone: "Error cloning repository",
          delete: "Error deleting repository",
          load: "Error loading repository"
        }
      },
      model: {
        title: "Select Model",
        select: "Select a Model",
        selected: "Selected",
        error: {
          fetch: "Failed to fetch models",
          load: "Failed to load model",
          select: "Failed to select model"
        },
        types: {
          'gpt-4': {
            name: "GPT-4",
            description: "Advanced language model with superior reasoning capabilities"
          },
          'gpt-3.5-turbo': {
            name: "GPT-3.5 Turbo",
            description: "Fast and efficient language model for most tasks"
          },
          'claude-2': {
            name: "Claude 2",
            description: "Anthropic's latest model with enhanced capabilities"
          }
        }
      },
      chat: {
        placeholder: "Type your message here...",
        send: "Send",
        clear: "Clear Chat",
        thinking: "Thinking...",
        error: "Error sending message",
        welcome: "Welcome! How can I help you today?",
        suggestions: {
          title: "Suggested Questions",
          help: "What can you help me with?",
          features: "What features do you have?",
          customize: "How can I customize you?"
        }
      },
      settings: {
        title: "Settings",
        description: "Configure your preferences",
        enableNotifications: "Enable Notifications",
        general: {
          title: "General",
          description: "Basic settings"
        },
        advanced: {
          title: "Advanced",
          description: "Advanced settings"
        },
        voice: {
          title: "Voice",
          description: "Voice settings"
        },
        display: {
          title: "Display",
          description: "Display settings"
        },
        notifications: "Notifications",
        dataCollection: null,
        shareAnalytics: null,
        privacy: null
      }
    }
  },
  es: {
    translation: {
      nav: {
        home: "Inicio",
        knowledge: "Base de Conocimiento",
        assistant: {
          title: "Creación del Asistente",
          sections: {
            voice: "Personalización de Voz",
            avatar: "Personalización de Avatar",
            shape: "Personalización de Forma"
          }
        },
        chat: "Chat",
        cantera: "Repositorio Cantera",
        settings: "Configuración"
      },
      common: {
        loading: "Cargando...",
        error: "Error",
        success: "Éxito",
        cancel: "Cancelar",
        save: "Guardar",
        delete: "Eliminar",
        edit: "Editar",
        add: "Agregar",
        search: "Buscar",
        language: "Idioma",
        settings: "Configuración",
        theme: "Tema",
        toggleTheme: "Cambiar Tema",
        selectedFiles: "Archivos Seleccionados",
        clear: "Limpiar Todo",
        process: "Procesar Archivos",
        selectFiles: "Seleccionar Archivos",
        addMore: "Agregar Más Archivos",
        upload: "Subir",
        preview: "Vista Previa",
        recording: "Grabando",
        processing: "Procesando...",
        dragAndDrop: "Arrastra y suelta archivos aquí o haz clic para explorar",
        uploadInstructions: "Haz clic para subir o arrastra y suelta archivos aquí",
        supportedFormats: "Tipos de archivo soportados: PDF, DOC, TXT, MP3, MP4, WAV, JPG, PNG, GIF"
      },
      theme: {
        purple: "Púrpura",
        crimson: "Carmesí",
        mono: "Monocromático",
        neon: "Neón",
        ocean: "Océano"
      },
      assistant: {
        title: "Crea tu Asistente",
        description: "Diseña y personaliza tu asistente de IA",
        uploadFiles: "Sube tus archivos",
        dragAndDrop: "Arrastra y suelta archivos aquí o haz clic para explorar",
        voice: {
          title: "Personalización de Voz",
          description: "Personaliza la voz de tu asistente con tus propias grabaciones",
          startRecording: "Iniciar Grabación",
          stopRecording: "Detener Grabación",
          recordOnPhone: "Grabar en el Teléfono",
          tips: "Consejos de Grabación",
          recordings: "Tus Grabaciones",
          scanQR: "Escanear Código QR",
          scanInstructions: "Escanea este código QR con tu dispositivo móvil para continuar la grabación"
        },
        shape: {
          title: "Personalización de Forma",
          description: "Personaliza la apariencia física de tu asistente"
        },
        avatar: {
          title: "Personalización de Avatar",
          description: "Crea y personaliza la apariencia visual de tu asistente",
          upload: {
            title: "Subir Fotos",
            description: "Sube fotos para entrenar tu avatar",
            button: "Subir Fotos",
            dragAndDrop: "Arrastra y suelta fotos aquí o haz clic para explorar",
            processing: "Procesando tus fotos...",
            success: "Fotos subidas exitosamente",
            error: "Error al subir fotos"
          },
          preview: {
            title: "Vista Previa del Avatar",
            generating: "Generando vista previa...",
            error: "Error al generar vista previa"
          }
        }
      },
      emotional: {
        title: "Estado Emocional",
        description: "Ajusta la expresión emocional de tu asistente",
        intensity: "Intensidad",
        states: {
          neutral: "Neutro",
          happy: "Feliz",
          sad: "Triste",
          excited: "Emocionado",
          concerned: "Preocupado",
          professional: "Profesional"
        }
      },
      knowledgeBase: {
        title: "Base de Conocimiento",
        description: "Administra y organiza tus elementos de conocimiento",
        add: "Agregar Conocimiento",
        processing: "Procesando tu conocimiento...",
        noItems: "No se encontraron elementos de conocimiento",
        upload: {
          title: "Subir Archivos",
          description: "Sube documentos para mejorar el conocimiento de tu asistente",
          supported: "Tipos de archivo soportados: PDF, DOC, TXT"
        },
        url: {
          title: "Agregar URL",
          description: "Ingresa una URL para agregar como fuente de conocimiento",
          placeholder: "Ingresa la URL aquí"
        },
        items: {
          source: "Fuente",
          timestamp: "Agregado",
          type: "Tipo",
          status: "Estado",
          actions: "Acciones"
        },
        processingTitle: "Procesando Archivos",
        processingDescription: "Tus archivos están siendo analizados y procesados",
        uploadInstructions: "Sube documentos para mejorar el conocimiento de tu asistente"
      },
      cantera: {
        title: "Repositorio Cantera",
        description: "Explora y administra tu colección de voces y avatares",
        voices: "Colección de Voces",
        voicesDescription: "Selecciona de nuestra colección de voces curada",
        avatars: "Colección de Avatares",
        avatarsDescription: "Elige tu avatar preferido",
        select: "Seleccionar",
        selected: "Seleccionado",
        preview: "Vista Previa de Voz",
        repository: {
          title: "Repositorio",
          description: "Explora y administra tus repositorios",
          stars: "estrellas",
          clone: "Clonar",
          cloning: "Clonando...",
          viewOnGithub: "Ver en GitHub",
          localRepositories: "Repositorios Locales",
          lastUpdated: "Última actualización: {{date}}"
        },
        error: {
          clone: "Error al clonar el repositorio",
          delete: "Error al eliminar el repositorio",
          load: "Error al cargar el repositorio"
        }
      },
      model: {
        title: "Seleccionar Modelo",
        select: "Selecciona un Modelo",
        selected: "Seleccionado",
        error: {
          fetch: "Error al obtener modelos",
          load: "Error al cargar el modelo",
          select: "Error al seleccionar el modelo"
        },
        types: {
          'gpt-4': {
            name: "GPT-4",
            description: "Modelo de lenguaje avanzado con capacidades superiores de razonamiento"
          },
          'gpt-3.5-turbo': {
            name: "GPT-3.5 Turbo",
            description: "Modelo de lenguaje rápido y eficiente para la mayoría de las tareas"
          },
          'claude-2': {
            name: "Claude 2",
            description: "El último modelo de Anthropic con capacidades mejoradas"
          }
        }
      },
      chat: {
        placeholder: "Escribe tu mensaje aquí...",
        send: "Enviar",
        clear: "Limpiar Chat",
        thinking: "Pensando...",
        error: "Error al enviar mensaje",
        welcome: "Bienvenido! ¿En qué puedo ayudarte hoy?",
        suggestions: {
          title: "Preguntas Sugeridas",
          help: "¿Con qué puedo ayudarte?",
          features: "¿Qué características tienes?",
          customize: "¿Cómo puedo personalizarte?"
        }
      },
      settings: {
        title: "Configuración",
        description: "Configura tus preferencias",
        enableNotifications: "Activar Notificaciones",
        general: {
          title: "General",
          description: "Configuración básica"
        },
        advanced: {
          title: "Avanzado",
          description: "Configuración avanzada"
        },
        voice: {
          title: "Voz",
          description: "Configuración de voz"
        },
        display: {
          title: "Pantalla",
          description: "Configuración de pantalla"
        },
        notifications: "Notificaciones",
        dataCollection: null,
        shareAnalytics: null,
        privacy: null
      }
    }
  }
} as const;

// Initialize i18next with debug mode
const i18nConfig = {
  resources,
  fallbackLng: 'en',
  defaultNS: 'translation',
  debug: true,
  detection: {
    order: ['navigator', 'querystring', 'localStorage'],
    lookupQuerystring: 'lng',
    lookupLocalStorage: 'i18nextLng',
    caches: ['localStorage'],
  },
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(i18nConfig)
  .then(() => {
    console.log('i18n initialized with language:', i18n.language);
    console.log('Available languages:', Object.keys(resources));
    console.log('Browser language:', navigator.language);
    console.log('Browser languages:', navigator.languages);
  });

export default i18n;
