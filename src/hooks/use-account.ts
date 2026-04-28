import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export const useAccount = () => {
  const router = useRouter();

  const handleLogout = () => {
    Swal.fire({
      title: 'Sign Out?',
      text: "Are you sure you want to log out of your account?",
      icon: 'warning',
      showCancelButton: true,
      background: '#111',
      color: '#fff',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#3f3f46',
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'rounded-3xl border border-white/10',
        confirmButton: 'rounded-xl px-6 py-2.5 font-medium',
        cancelButton: 'rounded-xl px-6 py-2.5 font-medium',
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
