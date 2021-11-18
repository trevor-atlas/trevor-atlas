import { useRouter } from 'next/router';

const useToggleNavigation = () => {
  const { pathname } = useRouter();
  const disable = pathname === '/resume' || pathname.includes('webgl-portal');
  return disable;
};

export default useToggleNavigation;
