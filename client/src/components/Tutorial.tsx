import React, { useState } from 'react';
import Joyride, { Step } from 'react-joyride';

const steps: Step[] = [
  {
    target: '.dashboard-overview',
    content: 'Bienvenue sur ScripturaQuest ! Voici votre tableau de bord personnel.',
    placement: 'center'
  },
  {
    target: '.daily-verse',
    content: 'Découvrez un verset biblique inspirant chaque jour.',
    placement: 'bottom'
  },
  {
    target: '.modules-section',
    content: 'Explorez nos modules d\'apprentissage biblique interactifs.',
    placement: 'top'
  }
];

export function Tutorial() {
  const [run, setRun] = useState(true);

  const handleJoyrideCallback = (data: any) => {
    const { status } = data;
    if (status === 'finished' || status === 'skipped') {
      setRun(false);
    }
  };

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      run={run}
      scrollToFirstStep
      showProgress
      showSkipButton
      steps={steps}
      styles={{
        options: {
          zIndex: 10000,
        },
      }}
    />
  );
}