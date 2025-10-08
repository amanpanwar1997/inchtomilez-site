import { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ColorfulIcon } from '../ColorfulIcon';

export function LanguageSwitcher() {
  const { language, setLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = availableLanguages.find(lang => lang.code === language);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 glass-subtle rounded-lg hover:glass-card transition-smooth"
        aria-label="Change language"
      >
        <ColorfulIcon icon={Globe} color="blue" size={20} />
        <span className="body-sm font-semibold hidden sm:inline">
          {currentLang?.flag} {currentLang?.code.toUpperCase()}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 glass-premium rounded-lg border border-white/20 shadow-dramatic z-50 animate-fade-in-up">
          <div className="p-2">
            {availableLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-smooth ${
                  language === lang.code
                    ? 'bg-white shadow-award'
                    : 'hover:bg-white hover:shadow-award-md'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="body-md font-semibold">{lang.name}</span>
                </div>
                {language === lang.code && (
                  <Check className="h-4 w-4 text-green-600" />
                )}
              </button>
            ))}
          </div>

          {/* Info Footer */}
          <div className="p-3 border-t border-white/10">
            <p className="body-xs text-center text-gray-500">
              {availableLanguages.length} languages available
            </p>
          </div>
        </div>
      )}
    </div>
  );
}