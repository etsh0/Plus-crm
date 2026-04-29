import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { useTheme } from 'next-themes';

export const useAccount = () => {
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  const handleLogout = () => {
    const isDark = resolvedTheme === 'dark';

    Swal.fire({
      title: 'Sign Out?',
      text: "Are you sure you want to log out of your account?",
      icon: 'warning',
      showCancelButton: true,
      background: isDark ? '#111' : '#fff',
      color: isDark ? '#fff' : '#111',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: isDark ? '#3f3f46' : '#e4e4e7',
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: `rounded-3xl border ${isDark ? 'border-white/10' : 'border-gray-200'} shadow-xl`,
        confirmButton: 'rounded-xl px-6 py-2.5 font-bold',
        cancelButton: 'rounded-xl px-6 py-2.5 font-bold',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/login');
      }
    });
  };

  return {
    handleLogout,
  };
};
