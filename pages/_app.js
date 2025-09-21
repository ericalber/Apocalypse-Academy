import '../styles/globals.css';
import '../styles/fonts.css';
import '../styles/bebas-neue-fixes.css';
import '../styles/cinematic-titles.css';
import '../styles/vibestream-adaptation.css';
import '../styles/typography-wcag.css';
import '../styles/legibility-fixes.css';
import '../styles/movie-ui-enhancements.css';
import { AuthProvider } from '../contexts/AuthContext';
// import '../lib/i18n'; // DESATIVADO TEMPORARIAMENTE

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
