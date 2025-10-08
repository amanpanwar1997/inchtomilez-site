import { CheckCircle2, X } from 'lucide-react';
import { motion } from 'motion/react';

interface ComparisonTableProps {
  title?: string;
  description?: string;
  categories: Array<{
    name: string;
    features: string[];
  }>;
  plans: Array<{
    name: string;
    price?: string;
    features: boolean[];
    highlighted?: boolean;
  }>;
}

export function ComparisonTable({ 
  title = 'Compare Our Services',
  description,
  categories, 
  plans 
}: ComparisonTableProps) {
  return (
    <div className="w-full">
      {(title || description) && (
        <div className="text-center mb-10">
          {title && <h2 className="heading-lg mb-3">{title}</h2>}
          {description && <p className="body-md text-muted max-w-2xl mx-auto">{description}</p>}
        </div>
      )}

      {/* Mobile View - Accordion Style */}
      <div className="block lg:hidden space-y-4">
        {plans.map((plan, planIndex) => (
          <motion.div
            key={planIndex}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: planIndex * 0.1 }}
            className={`glass-card card-compact-md ${plan.highlighted ? 'ring-2 ring-[#baff00]' : ''}`}
          >
            <div className="mb-4">
              <h3 className="heading-sm">{plan.name}</h3>
              {plan.price && <p className="body-lg mt-2">{plan.price}</p>}
              {plan.highlighted && (
                <span className="badge-glass mt-2">
                  <span className="text-xs">MOST POPULAR</span>
                </span>
              )}
            </div>
            
            {categories.map((category, catIndex) => (
              <div key={catIndex} className="mb-4">
                <h4 className="heading-sm text-sm mb-2">{category.name}</h4>
                <div className="space-y-2">
                  {category.features.map((feature, featureIndex) => {
                    const globalIndex = categories
                      .slice(0, catIndex)
                      .reduce((sum, cat) => sum + cat.features.length, 0) + featureIndex;
                    
                    return (
                      <div key={featureIndex} className="flex items-center gap-2">
                        {plan.features[globalIndex] ? (
                          <CheckCircle2 className="w-4 h-4 text-[#baff00] flex-shrink-0" strokeWidth={2} />
                        ) : (
                          <X className="w-4 h-4 text-gray-300 flex-shrink-0" strokeWidth={2} />
                        )}
                        <span className="body-sm">{feature}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            
            <button className="btn-award w-full mt-4">
              Choose {plan.name}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-4 glass-card">
                <span className="heading-sm text-sm">Features</span>
              </th>
              {plans.map((plan, index) => (
                <th key={index} className={`p-4 glass-card ${plan.highlighted ? 'relative' : ''}`}>
                  {plan.highlighted && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <span className="badge-glass">
                        <span className="text-xs">MOST POPULAR</span>
                      </span>
                    </div>
                  )}
                  <div className="text-center">
                    <h3 className="heading-sm text-base mb-2">{plan.name}</h3>
                    {plan.price && <p className="body-lg">{plan.price}</p>}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((category, catIndex) => (
              <>
                <tr key={`cat-${catIndex}`} className="bg-gray-50">
                  <td colSpan={plans.length + 1} className="p-3">
                    <h4 className="heading-sm text-sm">{category.name}</h4>
                  </td>
                </tr>
                {category.features.map((feature, featureIndex) => {
                  const globalIndex = categories
                    .slice(0, catIndex)
                    .reduce((sum, cat) => sum + cat.features.length, 0) + featureIndex;
                  
                  return (
                    <tr key={`feat-${catIndex}-${featureIndex}`} className="border-b border-gray-100">
                      <td className="p-4">
                        <span className="body-sm">{feature}</span>
                      </td>
                      {plans.map((plan, planIndex) => (
                        <td key={planIndex} className={`p-4 text-center ${plan.highlighted ? 'glass-subtle' : ''}`}>
                          {plan.features[globalIndex] ? (
                            <CheckCircle2 className="w-5 h-5 text-[#baff00] mx-auto" strokeWidth={2} />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 mx-auto" strokeWidth={2} />
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </>
            ))}
            <tr>
              <td className="p-4"></td>
              {plans.map((plan, index) => (
                <td key={index} className="p-4">
                  <button className={`btn-award w-full ${plan.highlighted ? 'shadow-award-lg' : ''}`}>
                    Choose {plan.name}
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}