import { Truck } from 'lucide-react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 'medium', showText = true, className = '' }: LogoProps) {
  const sizes = {
    small: { icon: 'w-8 h-8', text: 'text-xl', container: 'p-2' },
    medium: { icon: 'w-12 h-12', text: 'text-3xl', container: 'p-3' },
    large: { icon: 'w-14 h-14', text: 'text-4xl', container: 'p-4' }
  };

  const s = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <div className={`absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 ${s.container} rounded-xl blur-md opacity-75`}></div>
        <div className={`relative bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 ${s.container} rounded-xl shadow-lg transform hover:scale-110 transition-transform duration-300`}>
          <Truck className={`${s.icon} text-white`} />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full shadow-lg animate-pulse"></div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <h1 className={`${s.text} font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent`}>
            BookYourDock
          </h1>
        </div>
      )}
    </div>
  );
}
