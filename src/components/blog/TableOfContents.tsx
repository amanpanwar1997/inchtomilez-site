import { useState, useEffect } from 'react';
import { List } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentRef: React.RefObject<HTMLElement>;
}

export function TableOfContents({ contentRef }: TableOfContentsProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const { t } = useLanguage();

  useEffect(() => {
    if (!contentRef.current) return;

    // Extract headings from content
    const headings = contentRef.current.querySelectorAll('h2, h3, h4');
    const items: TOCItem[] = Array.from(headings).map((heading, index) => {
      const id = heading.id || `heading-${index}`;
      heading.id = id; // Ensure heading has ID
      
      return {
        id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName[1])
      };
    });

    setToc(items);

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -80% 0px'
      }
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [contentRef]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (toc.length === 0) return null;

  return (
    <div className="glass-premium p-6 rounded-lg border border-white/20 sticky top-24">
      <div className="flex items-center gap-3 mb-4">
        <List className="h-5 w-5 text-blue-600" />
        <h3 className="heading-sm">{t('blog.tableOfContents')}</h3>
      </div>

      <nav className="space-y-2">
        {toc.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToHeading(item.id)}
            className={`
              w-full text-left body-sm transition-all
              ${item.level === 2 ? 'pl-0' : item.level === 3 ? 'pl-4' : 'pl-8'}
              ${
                activeId === item.id
                  ? 'text-black font-semibold'
                  : 'text-gray-600 hover:text-black'
              }
            `}
          >
            <div className="flex items-start gap-2 py-1.5">
              <div
                className={`
                  w-1 h-1 rounded-full mt-2 flex-shrink-0
                  ${activeId === item.id ? 'bg-blue-600 w-2 h-2' : 'bg-gray-400'}
                `}
              />
              <span className="flex-1">{item.text}</span>
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
}
