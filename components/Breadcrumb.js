import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Breadcrumb.module.css';

const Breadcrumb = ({ customItems = null, className = '' }) => {
  const router = useRouter();
  
  // Se customItems for fornecido, usar eles; caso contrário, gerar automaticamente
  const getBreadcrumbItems = () => {
    if (customItems) {
      return customItems;
    }

    const pathSegments = router.asPath.split('/').filter(segment => segment);
    const items = [{ label: 'Home', href: '/' }];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Remover query parameters e hash
      const cleanSegment = segment.split('?')[0].split('#')[0];
      
      // Mapear segmentos para labels mais amigáveis
      const segmentLabels = {
        'documentarios': 'Documentários',
        'cursos': 'Cursos',
        'revistas': 'Revistas',
        'entrar': 'Login',
        'registrar': 'Cadastro',
        'admin': 'Administração',
        'midia': 'Mídia',
        'perfil': 'Perfil',
        'assinatura': 'Assinatura',
        'checkout': 'Checkout',
        'sobre': 'Sobre',
        'contato': 'Contato',
        'politica-privacidade': 'Política de Privacidade',
        'termos-uso': 'Termos de Uso'
      };

      const label = segmentLabels[cleanSegment] || 
                   cleanSegment.charAt(0).toUpperCase() + cleanSegment.slice(1);

      items.push({
        label: label,
        href: currentPath,
        isLast: index === pathSegments.length - 1
      });
    });

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  // Não mostrar breadcrumb na home
  if (router.pathname === '/') {
    return null;
  }

  return (
    <nav className={`${styles.breadcrumb} ${className}`} aria-label="Breadcrumb">
      <ol className={styles.breadcrumbList}>
        {breadcrumbItems.map((item, index) => (
          <li key={index} className={styles.breadcrumbItem}>
            {item.isLast || index === breadcrumbItems.length - 1 ? (
              <span className={styles.breadcrumbCurrent} aria-current="page">
                {item.label}
              </span>
            ) : (
              <>
                <Link href={item.href} className={styles.breadcrumbLink}>
                  {item.label}
                </Link>
                <span className={styles.breadcrumbSeparator} aria-hidden="true">
                  ›
                </span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

