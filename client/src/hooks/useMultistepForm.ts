import { useState } from "react";

type Step = React.ReactNode;

export function useMultiStepForm(steps: Step[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const next = () => {
    setCurrentStepIndex((i) => (i >= steps.length - 1 ? i : i + 1));
  };

  const back = () => {
    setCurrentStepIndex((i) => (i <= 0 ? i : i - 1));
  };

  return {
    currentStep: steps[currentStepIndex],
    currentStepIndex,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    isSubmitting,
    next,
    back,
    setIsSubmitting,
  };
}
