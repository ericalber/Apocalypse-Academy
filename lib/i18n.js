import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  'pt-BR': {
    common: {
      welcome: 'Bem-vindo',
      home: 'Início',
      about: 'Sobre',
      contact: 'Contato',
      login: 'Entrar',
      logout: 'Sair',
      register: 'Registrar',
      search: 'Buscar',
      menu: 'Menu',
      close: 'Fechar',
      save: 'Salvar',
      cancel: 'Cancelar',
      delete: 'Excluir',
      edit: 'Editar',
      view: 'Ver',
      loading: 'Carregando',
      error: 'Erro',
      success: 'Sucesso'
    },
    navigation: {
      home: 'Início',
      documentaries: 'Documentários',
      courses: 'Cursos',
      magazines: 'Revistas',
      live: 'Ao Vivo',
      login: 'Entrar',
      logout: 'Sair',
      profile: 'Perfil',
      dashboard: 'Dashboard',
      settings: 'Configurações',
      language: 'Idioma',
      menu: 'Menu'
    },
    content: {
      hero_title: 'A Última Verdade Antes do Fim',
      hero_subtitle: 'Quando o sistema falhar, aqui ainda restará verdade. Acesse conhecimento exclusivo que as elites não querem que você saiba.',
      watch_now: 'Assistir Agora',
      exclusive_courses: 'Cursos Exclusivos',
      courses_description: 'Estude escatologia bíblica com profundidade e prepare-se para os últimos tempos.',
      documentaries_4k: 'Documentários 4K',
      documentaries_description: 'Conteúdo cinematográfico revelando os sinais dos tempos que estão se cumprindo.',
      digital_magazines: 'Revistas Digitais',
      magazines_description: 'Publicações exclusivas com análises proféticas e geopolíticas atuais.',
      devotionals: 'Devocionais',
      devotionals_description: 'Áudios proféticos e integração com Spotify para momentos de reflexão espiritual.'
    },
    auth: {
      login_title: 'Entrar na sua conta',
      email: 'E-mail',
      password: 'Senha',
      remember_me: 'Lembrar-me',
      forgot_password: 'Esqueci a senha',
      login_button: 'Entrar',
      register_link: 'Criar conta',
      google_login: 'Entrar com Google',
      facebook_login: 'Entrar com Facebook'
    }
  },
  en: {
    common: {
      welcome: 'Welcome',
      home: 'Home',
      about: 'About',
      contact: 'Contact',
      login: 'Login',
      logout: 'Logout',
      register: 'Register',
      search: 'Search',
      menu: 'Menu',
      close: 'Close',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      view: 'View',
      loading: 'Loading',
      error: 'Error',
      success: 'Success'
    },
    navigation: {
      home: 'Home',
      documentaries: 'Documentaries',
      courses: 'Courses',
      magazines: 'Magazines',
      live: 'Live',
      login: 'Login',
      logout: 'Logout',
      profile: 'Profile',
      dashboard: 'Dashboard',
      settings: 'Settings',
      language: 'Language',
      menu: 'Menu'
    },
    content: {
      hero_title: 'The Ultimate Truth Before the End',
      hero_subtitle: 'When the system fails, truth will still remain here. Access exclusive knowledge that elites don\'t want you to know.',
      watch_now: 'Watch Now',
      exclusive_courses: 'Exclusive Courses',
      courses_description: 'Study biblical eschatology in depth and prepare for the end times.',
      documentaries_4k: '4K Documentaries',
      documentaries_description: 'Cinematographic content revealing the signs of the times being fulfilled.',
      digital_magazines: 'Digital Magazines',
      magazines_description: 'Exclusive publications with prophetic and current geopolitical analyses.',
      devotionals: 'Devotionals',
      devotionals_description: 'Prophetic audios and Spotify integration for moments of spiritual reflection.'
    },
    auth: {
      login_title: 'Login to your account',
      email: 'Email',
      password: 'Password',
      remember_me: 'Remember me',
      forgot_password: 'Forgot password',
      login_button: 'Login',
      register_link: 'Create account',
      google_login: 'Login with Google',
      facebook_login: 'Login with Facebook'
    }
  },
  es: {
    common: {
      welcome: 'Bienvenido',
      home: 'Inicio',
      about: 'Acerca de',
      contact: 'Contacto',
      login: 'Iniciar sesión',
      logout: 'Cerrar sesión',
      register: 'Registrarse',
      search: 'Buscar',
      menu: 'Menú',
      close: 'Cerrar',
      save: 'Guardar',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      edit: 'Editar',
      view: 'Ver',
      loading: 'Cargando',
      error: 'Error',
      success: 'Éxito'
    },
    navigation: {
      home: 'Inicio',
      documentaries: 'Documentales',
      courses: 'Cursos',
      magazines: 'Revistas',
      live: 'En Vivo',
      login: 'Iniciar sesión',
      logout: 'Cerrar sesión',
      profile: 'Perfil',
      dashboard: 'Panel',
      settings: 'Configuraciones',
      language: 'Idioma',
      menu: 'Menú'
    },
    content: {
      hero_title: 'La Última Verdad Antes del Fin',
      hero_subtitle: 'Cuando el sistema falle, aquí aún quedará verdad. Accede a conocimiento exclusivo que las élites no quieren que sepas.',
      watch_now: 'Ver Ahora',
      exclusive_courses: 'Cursos Exclusivos',
      courses_description: 'Estudia escatología bíblica con profundidad y prepárate para los últimos tiempos.',
      documentaries_4k: 'Documentales 4K',
      documentaries_description: 'Contenido cinematográfico revelando las señales de los tiempos que se están cumpliendo.',
      digital_magazines: 'Revistas Digitales',
      magazines_description: 'Publicaciones exclusivas con análisis proféticos y geopolíticos actuales.',
      devotionals: 'Devocionales',
      devotionals_description: 'Audios proféticos e integración con Spotify para momentos de reflexión espiritual.'
    },
    auth: {
      login_title: 'Iniciar sesión en tu cuenta',
      email: 'Correo electrónico',
      password: 'Contraseña',
      remember_me: 'Recordarme',
      forgot_password: 'Olvidé la contraseña',
      login_button: 'Iniciar sesión',
      register_link: 'Crear cuenta',
      google_login: 'Iniciar sesión con Google',
      facebook_login: 'Iniciar sesión con Facebook'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt-BR',
    fallbackLng: 'pt-BR',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;

