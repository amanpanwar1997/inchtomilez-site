import { LucideIcon, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface TimelineStep {
  title: string;
  description: string;
  icon: LucideIcon;
  duration?: string;
}

interface ProcessTimelineProps {
  title?: string;
  description?: string;
  steps: TimelineStep[];
  orientation?: 'vertical' | 'horizontal';
}

export function ProcessTimeline({ 
  title = 'Our Process',
  description = 'A proven methodology for delivering exceptional results',
  steps,
  orientation = 'vertical'
}: ProcessTimelineProps) {
  if (orientation === 'horizontal') {
    return (
      <section className="section-compact-md">
        <div className="container-award">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg mb-3">{title}</h2>
            <p className="body-md text-muted max-w-2xl mx-auto">{description}</p>
          </motion.div>

          {/* Horizontal Timeline */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-16 left-0 right-0 h-0.5 bg-gray-200">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#baff00] to-[#a3e600]"
                  initial={{ width: '0%' }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="flex flex-col items-center text-center"
                  >
                    {/* Icon */}
                    <div className="relative z-10 mb-4">
                      <div className="icon-container-glass w-16 h-16 p-4 mx-auto">
                        <step.icon className="w-full h-full text-black icon-animated" strokeWidth={2} />
                      </div>
                      {/* Step Number */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#baff00] rounded-full flex items-center justify-center">
                        <span className="text-xs text-black">{index + 1}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="heading-sm text-sm mb-2">{step.title}</h3>
                    <p className="body-sm text-muted">{step.description}</p>
                    {step.duration && (
                      <span className="badge-glass mt-3">
                        <span className="text-xs">{step.duration}</span>
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Vertical Fallback */}
          <div className="block md:hidden space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card card-compact-md flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="icon-container-glass w-12 h-12 p-3 relative">
                    <step.icon className="w-full h-full text-black icon-animated" strokeWidth={2} />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#baff00] rounded-full flex items-center justify-center">
                      <span className="text-xs text-black">{index + 1}</span>
                    </div>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="heading-sm text-base mb-1">{step.title}</h3>
                  <p className="body-sm text-muted">{step.description}</p>
                  {step.duration && (
                    <span className="badge-glass mt-2 inline-flex">
                      <span className="text-xs">{step.duration}</span>
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Vertical Timeline
  return (
    <section className="section-compact-md">
      <div className="container-award">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg mb-3">{title}</h2>
          <p className="body-md text-muted max-w-2xl mx-auto">{description}</p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200">
              <motion.div
                className="w-full bg-gradient-to-b from-[#baff00] to-[#a3e600]"
                initial={{ height: '0%' }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </div>

            <div className="space-y-12">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative flex gap-6"
                >
                  {/* Icon Container */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="icon-container-glass w-16 h-16 p-4">
                      <step.icon className="w-full h-full text-black icon-animated" strokeWidth={2} />
                    </div>
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#baff00] rounded-full flex items-center justify-center">
                      <span className="text-xs text-black">{index + 1}</span>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="glass-card card-compact-md flex-grow">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="heading-sm text-lg">{step.title}</h3>
                      {step.duration && (
                        <span className="badge-glass flex-shrink-0">
                          <span className="text-xs">{step.duration}</span>
                        </span>
                      )}
                    </div>
                    <p className="body-md">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}