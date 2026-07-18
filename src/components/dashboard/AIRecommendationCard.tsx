import { Sparkles, ArrowRight, Zap } from 'lucide-react';
import { Card, Button } from '../common';
import type { AIRecommendation } from '../../types';

interface AIRecommendationCardProps {
  recommendation: AIRecommendation;
  onAction?: () => void;
}

const priorityColors: Record<AIRecommendation['priority'], string> = {
  low: 'text-success-400 bg-success-500/10 border-success-500/20',
  medium: 'text-warning-400 bg-warning-500/10 border-warning-500/20',
  high: 'text-primary-400 bg-primary-500/10 border-primary-500/20',
  critical: 'text-danger-400 bg-danger-500/10 border-danger-500/20',
};

export function AIRecommendationCard({ recommendation, onAction }: AIRecommendationCardProps) {
  return (
    <Card glow className="relative overflow-hidden animate-fade-in-up">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white">
            <Sparkles size={16} />
          </div>
          <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">
            AI Recommendation
          </span>
          <span
            className={`ml-auto px-2.5 py-1 rounded-lg text-xs font-medium border capitalize ${priorityColors[recommendation.priority]}`}
          >
            {recommendation.priority} priority
          </span>
        </div>

        <h3 className="font-display font-semibold text-white text-lg mb-2">
          {recommendation.title}
        </h3>
        <p className="text-sm text-navy-300 leading-relaxed mb-4">
          {recommendation.description}
        </p>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <Zap size={14} className="text-warning-400" />
              <span className="text-xs text-navy-400">Confidence</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-20 h-1.5 rounded-full bg-navy-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-success-400 rounded-full"
                  style={{ width: `${recommendation.confidence}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-white">{recommendation.confidence}%</span>
            </div>
          </div>
          <Button size="sm" rightIcon={<ArrowRight size={14} />} onClick={onAction}>
            {recommendation.action}
          </Button>
        </div>
      </div>
    </Card>
  );
}
