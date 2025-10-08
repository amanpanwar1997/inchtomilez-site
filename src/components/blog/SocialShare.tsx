import { Facebook, Twitter, Linkedin, Link2, Mail, MessageCircle } from 'lucide-react';
import { ColorfulIcon } from '../ColorfulIcon';
import { useLanguage } from '../../contexts/LanguageContext';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

export function SocialShare({ url, title, description }: SocialShareProps) {
  const { t } = useLanguage();
  const fullUrl = typeof window !== 'undefined' ? window.location.href : url;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + fullUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description || '' + '\n\n' + fullUrl)}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareButtons = [
    { name: 'Twitter', icon: Twitter, color: 'cyan', url: shareLinks.twitter },
    { name: 'Facebook', icon: Facebook, color: 'blue', url: shareLinks.facebook },
    { name: 'LinkedIn', icon: Linkedin, color: 'indigo', url: shareLinks.linkedin },
    { name: 'WhatsApp', icon: MessageCircle, color: 'green', url: shareLinks.whatsapp },
    { name: 'Email', icon: Mail, color: 'red', url: shareLinks.email }
  ];

  return (
    <div className="glass-card p-6 rounded-lg border border-white/20">
      <h3 className="heading-sm mb-4">{t('blog.share')}</h3>
      
      <div className="flex flex-wrap gap-3">
        {shareButtons.map((button) => (
          <a
            key={button.name}
            href={button.url}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-container-glass p-3 hover-lift-sm"
            title={`Share on ${button.name}`}
          >
            <ColorfulIcon
              icon={button.icon}
              color={button.color as any}
              animation="bounce"
              hoverAnimation="jump"
              size={20}
            />
          </a>
        ))}
        
        <button
          onClick={copyToClipboard}
          className="icon-container-glass p-3 hover-lift-sm"
          title="Copy Link"
        >
          <ColorfulIcon
            icon={Link2}
            color="purple"
            animation="bounce"
            hoverAnimation="jump"
            size={20}
          />
        </button>
      </div>
    </div>
  );
}
