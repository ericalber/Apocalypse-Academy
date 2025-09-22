import { useEffect } from 'react';
import { useRouter } from 'next/router';

const LegacyCoursesRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard/cursos');
  }, [router]);

  return null;
};

export default LegacyCoursesRedirect;
