import { ReactNode, ElementType } from 'react';
import { Placement } from '@popperjs/core';

export interface BeaconRenderProps {
  continuous: boolean;
  index: number;
  isLastStep: boolean;
  size: number;
  step: Step;
}

export interface Step {
  target: string;
  content: ReactNode;
  placement?: Placement | 'center';
  title?: string;
  disableBeacon?: boolean;
  disableOverlay?: boolean;
  event?: string;
  isFixed?: boolean;
  offset?: number;
  styles?: object;
}

export interface Props {
  steps: Step[];
  run: boolean;
  continuous?: boolean;
  showProgress?: boolean;
  showSkipButton?: boolean;
  callback?: (data: CallBackProps) => void;
}

export interface CallBackProps {
  action: string;
  index: number;
  lifecycle: string;
  size: number;
  status: Status;
  step: Step;
  type: string;
}

export enum Status {
  IDLE = 'IDLE',
  READY = 'READY',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  FINISHED = 'FINISHED',
  SKIPPED = 'SKIPPED',
  ERROR = 'ERROR'
}