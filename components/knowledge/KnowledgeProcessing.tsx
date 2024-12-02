import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Brain } from 'lucide-react';

interface KnowledgeProcessingProps {
  onComplete?: () => void;
}

const KnowledgeProcessing: React.FC<KnowledgeProcessingProps> = ({ onComplete }) => {
  const { t } = useTranslation();

  React.useEffect(() => {
    // Artificial delay for processing animation
    const timer = setTimeout(() => {
      onComplete?.();
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer);
  }, [onComplete]);

  const brainVariants = {
    animate: {
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      opacity: [0.3, 1, 0.3],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const progressVariants = {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] relative p-6">
      <motion.div
        variants={pulseVariants}
        animate="animate"
        className="absolute w-[150px] h-[150px] rounded-full bg-accent-primary/10"
      />
      
      <motion.div
        variants={brainVariants}
        animate="animate"
        className="mb-8 text-accent-primary"
      >
        <Brain className="w-16 h-16" />
      </motion.div>

      <h2 className="text-xl font-display font-semibold text-text-primary mb-2">
        {t('knowledgeBase.processingTitle')}
      </h2>

      <p className="text-text-tertiary text-center max-w-md mb-6">
        {t('knowledgeBase.processingDescription')}
      </p>

      <motion.div
        variants={progressVariants}
        animate="animate"
        className="w-6 h-6 border-2 border-accent-primary border-t-transparent rounded-full"
      />

      <div className="mt-8 flex items-center space-x-2 text-text-tertiary">
        <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
        <span className="text-sm">
          {t('knowledgeBase.analyzingContent')}
        </span>
      </div>
    </div>
  );
};

export default KnowledgeProcessing;
