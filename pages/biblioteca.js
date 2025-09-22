import { useEffect } from 'react';
import { useRouter } from 'next/router';

const LegacyLibraryRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard/biblioteca');
  }, [router]);

  return null;
};

export default LegacyLibraryRedirect;
