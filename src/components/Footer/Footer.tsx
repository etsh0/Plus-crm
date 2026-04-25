import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="w-full bg-black border-t border-white/5 pt-16 pb-8 px-6 flex flex-col items-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-white tracking-tight">PLUS <span className='bg-linear-to-r from-fuchsia-400 via-violet-400 to-purple-400 bg-clip-text text-transparent'>CRM</span></span>
          </div>
          <p className="text-sm text-white/40 leading-relaxed max-w-[240px]">
            The next-generation workspace for high-velocity sales teams. Control your pipeline, conversations, and growth.
          </p>
        </div>

        {/* Links Column 1 */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-widest">Product</h4>
          <ul className="flex flex-col gap-2">
            <li><Link href="#" className="text-sm text-white/40 hover:text-violet-400 transition-colors">Features</Link></li>
            <li><Link href="#" className="text-sm text-white/40 hover:text-violet-400 transition-colors">Integrations</Link></li>
            <li><Link href="#" className="text-sm text-white/40 hover:text-violet-400 transition-colors">Pricing</Link></li>
            <li><Link href="#" className="text-sm text-white/40 hover:text-violet-400 transition-colors">Changelog</Link></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-widest">Company</h4>
          <ul className="flex flex-col gap-2">
            <li><Link href="#" className="text-sm text-white/40 hover:text-violet-400 transition-colors">About Us</Link></li>
            <li><Link href="#" className="text-sm text-white/40 hover:text-violet-400 transition-colors">Careers</Link></li>
            <li><Link href="#" className="text-sm text-white/40 hover:text-violet-400 transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="text-sm text-white/40 hover:text-violet-400 transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Social Column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-widest">Connect</h4>
          <div className="flex gap-4">
            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
               <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.48.75 2.78 1.89 3.54-.7 0-1.35-.22-1.92-.53v.05c0 2.06 1.47 3.78 3.42 4.17-.36.1-.74.15-1.13.15-.27 0-.54-.03-.8-.08.54 1.69 2.11 2.92 3.98 2.95-1.46 1.15-3.3 1.84-5.3 1.84-.34 0-.68-.02-1.02-.06C3.9 20.29 6.16 21 8.58 21 16.21 21 20.38 14.68 20.38 9.21c0-.18 0-.36-.01-.53.81-.59 1.52-1.32 2.09-2.15z"/></svg>
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
               <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4.162 4.162 0 110-8.324 4.162 4.162 0 010 8.324zM18.406 3.996a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl w-full border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-white/20">
          © {new Date().getFullYear()} PLUS CRM. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link href="#" className="text-xs text-white/20 hover:text-white/40 transition-colors">Status</Link>
          <Link href="#" className="text-xs text-white/20 hover:text-white/40 transition-colors">Privacy</Link>
          <Link href="#" className="text-xs text-white/20 hover:text-white/40 transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
};
