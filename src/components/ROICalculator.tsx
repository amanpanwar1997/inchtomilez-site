import { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, DollarSign, Target, Calculator } from 'lucide-react';

export function ROICalculator() {
  const [monthlyBudget, setMonthlyBudget] = useState(50000);
  const [conversionRate, setConversionRate] = useState(2);
  const [avgOrderValue, setAvgOrderValue] = useState(5000);
  const [showResults, setShowResults] = useState(false);

  // Calculations
  const monthlyVisitors = Math.round(monthlyBudget / 5); // ₹5 per visitor (avg CPC)
  const monthlyConversions = Math.round((monthlyVisitors * conversionRate) / 100);
  const monthlyRevenue = monthlyConversions * avgOrderValue;
  const annualRevenue = monthlyRevenue * 12;
  const annualInvestment = monthlyBudget * 12;
  const netProfit = annualRevenue - annualInvestment;
  const roi = ((netProfit / annualInvestment) * 100).toFixed(1);

  const handleCalculate = () => {
    setShowResults(true);
  };

  return (
    <div className="glass-card p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="icon-container-glass w-12 h-12 flex items-center justify-center">
          <Calculator className="w-6 h-6 icon-color-purple icon-pulse-glow" />
        </div>
        <div>
          <h3 className="heading-md">ROI Calculator</h3>
          <p className="body-sm text-gray-600">Calculate your potential returns</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Monthly Budget */}
        <div>
          <label className="body-sm font-medium mb-2 block">
            Monthly Marketing Budget (₹)
          </label>
          <div className="relative">
            <input
              type="range"
              min="10000"
              max="500000"
              step="10000"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-gradient"
            />
            <div className="flex justify-between mt-2">
              <span className="body-xs text-gray-500">₹10,000</span>
              <span className="body-sm font-semibold text-black">
                ₹{monthlyBudget.toLocaleString('en-IN')}
              </span>
              <span className="body-xs text-gray-500">₹5,00,000</span>
            </div>
          </div>
        </div>

        {/* Conversion Rate */}
        <div>
          <label className="body-sm font-medium mb-2 block">
            Expected Conversion Rate (%)
          </label>
          <div className="relative">
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={conversionRate}
              onChange={(e) => setConversionRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-gradient"
            />
            <div className="flex justify-between mt-2">
              <span className="body-xs text-gray-500">1%</span>
              <span className="body-sm font-semibold text-black">
                {conversionRate}%
              </span>
              <span className="body-xs text-gray-500">10%</span>
            </div>
          </div>
        </div>

        {/* Average Order Value */}
        <div>
          <label className="body-sm font-medium mb-2 block">
            Average Order Value (₹)
          </label>
          <div className="relative">
            <input
              type="range"
              min="1000"
              max="50000"
              step="1000"
              value={avgOrderValue}
              onChange={(e) => setAvgOrderValue(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-gradient"
            />
            <div className="flex justify-between mt-2">
              <span className="body-xs text-gray-500">₹1,000</span>
              <span className="body-sm font-semibold text-black">
                ₹{avgOrderValue.toLocaleString('en-IN')}
              </span>
              <span className="body-xs text-gray-500">₹50,000</span>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <motion.button
          onClick={handleCalculate}
          className="btn-award w-full"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Calculate ROI
        </motion.button>

        {/* Results */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 mt-6"
          >
            {/* Main ROI Card */}
            <motion.div
              className="glass-premium p-6 text-center"
              style={{ background: 'rgba(255, 255, 255, 0.95)' }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <TrendingUp className="w-10 h-10 icon-color-green mx-auto mb-3 icon-bounce" />
              <p className="body-sm text-gray-600 mb-2">Projected Annual ROI</p>
              <h4 className="heading-xl text-green-600">{roi}%</h4>
              <p className="body-sm text-gray-600 mt-2">
                Net Profit: <span className="font-semibold text-black">
                  ₹{netProfit.toLocaleString('en-IN')}
                </span>
              </p>
            </motion.div>

            {/* Detailed Breakdown */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                className="glass-card p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 icon-color-blue" />
                  <p className="body-xs text-gray-600">Monthly Visitors</p>
                </div>
                <p className="heading-sm">{monthlyVisitors.toLocaleString('en-IN')}</p>
              </motion.div>

              <motion.div
                className="glass-card p-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 icon-color-green" />
                  <p className="body-xs text-gray-600">Monthly Revenue</p>
                </div>
                <p className="heading-sm">₹{(monthlyRevenue / 1000).toFixed(0)}K</p>
              </motion.div>

              <motion.div
                className="glass-card p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 icon-color-purple" />
                  <p className="body-xs text-gray-600">Monthly Conversions</p>
                </div>
                <p className="heading-sm">{monthlyConversions}</p>
              </motion.div>

              <motion.div
                className="glass-card p-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 icon-color-orange" />
                  <p className="body-xs text-gray-600">Annual Revenue</p>
                </div>
                <p className="heading-sm">₹{(annualRevenue / 100000).toFixed(1)}L</p>
              </motion.div>
            </div>

            {/* CTA */}
            <motion.div
              className="glass-subtle p-4 rounded-lg text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p className="body-sm text-gray-700 mb-3">
                Ready to achieve these results?
              </p>
              <motion.button
                className="btn-award"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Free Consultation
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .slider-gradient::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4285F4, #9333EA);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(66, 133, 244, 0.4);
        }

        .slider-gradient::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4285F4, #9333EA);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(66, 133, 244, 0.4);
        }

        .slider-gradient::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(66, 133, 244, 0.6);
        }
      `}</style>
    </div>
  );
}
