import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Heart, Shield, Wind } from 'lucide-react';

interface SomaticResetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Technique = 'sigh' | 'box' | 'grounding';

export const SomaticResetModal: React.FC<SomaticResetModalProps> = ({ isOpen, onClose }) => {
  const [technique, setTechnique] = useState<Technique>('sigh');
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'inhale2' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [countdown, setCountdown] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  useEffect(() => {
    let timer: any = null;
    if (isActive) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            // Transition phase based on technique
            if (technique === 'sigh') {
              // Physiological Sigh: Deep Inhale (4s) -> Second Top-up Inhale (1s) -> Long Exhale (6s)
              if (phase === 'inhale') {
                setPhase('inhale2');
                return 1;
              } else if (phase === 'inhale2') {
                setPhase('exhale');
                return 6;
              } else {
                setPhase('inhale');
                setCyclesCompleted((c) => c + 1);
                return 4;
              }
            } else if (technique === 'box') {
              // Box Breathing: Inhale (4s) -> Hold (4s) -> Exhale (4s) -> Hold (4s)
              if (phase === 'inhale') {
                setPhase('hold');
                return 4;
              } else if (phase === 'hold') {
                setPhase('exhale');
                return 4;
              } else if (phase === 'exhale') {
                setPhase('rest');
                return 4;
              } else {
                setPhase('inhale');
                setCyclesCompleted((c) => c + 1);
                return 4;
              }
            } else {
              // 4-7-8 Breathing: Inhale (4s) -> Hold (7s) -> Exhale (8s)
              if (phase === 'inhale') {
                setPhase('hold');
                return 7;
              } else if (phase === 'hold') {
                setPhase('exhale');
                return 8;
              } else {
                setPhase('inhale');
                setCyclesCompleted((c) => c + 1);
                return 4;
              }
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, phase, technique]);

  if (!isOpen) return null;

  const handleReset = () => {
    setIsActive(false);
    setPhase('inhale');
    setCountdown(4);
    setCyclesCompleted(0);
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale':
        return 'Deep Inhale Through Nose';
      case 'inhale2':
        return 'Quick Sharp Top-Up Inhale';
      case 'hold':
        return 'Gently Hold';
      case 'exhale':
        return 'Slow, Audible Exhale Through Mouth';
      case 'rest':
        return 'Soft Pause';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4">
      <div className="bg-stone-50 border border-stone-200 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-xl text-stone-900 relative">
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
          <Wind className="w-4 h-4" />
          <span>Physiological Grounding Protocol</span>
        </div>

        <h2 className="text-xl font-bold tracking-tight text-stone-900 mb-1">
          Nervous System Calibration
        </h2>
        <p className="text-xs text-stone-600 mb-6 leading-relaxed">
          Stanford neurobiology research (Huberman et al., 2023) demonstrates that double-inhale physiological sighs
          rapidly reset autonomic arousal by popping open collapsed alveoli and triggering vagal deceleration.
        </p>

        {/* Technique Picker */}
        <div className="grid grid-cols-3 gap-2 mb-8 p-1 bg-stone-200/70 rounded-xl text-xs font-medium">
          <button
            onClick={() => {
              setTechnique('sigh');
              handleReset();
            }}
            className={`cursor-pointer py-1.5 px-2 rounded-lg transition-colors ${
              technique === 'sigh' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Physiological Sigh
          </button>
          <button
            onClick={() => {
              setTechnique('box');
              handleReset();
            }}
            className={`cursor-pointer py-1.5 px-2 rounded-lg transition-colors ${
              technique === 'box' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Box (4-4-4-4)
          </button>
          <button
            onClick={() => {
              setTechnique('grounding');
              handleReset();
            }}
            className={`cursor-pointer py-1.5 px-2 rounded-lg transition-colors ${
              technique === 'grounding' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Vagal 4-7-8
          </button>
        </div>

        {/* Animated Breathing Orb */}
        <div className="flex flex-col items-center justify-center my-8">
          <div className="relative flex items-center justify-center w-48 h-48">
            {/* Outer Pulsing Aura */}
            <div
              className={`absolute rounded-full transition-all duration-1000 ease-in-out ${
                phase.startsWith('inhale')
                  ? 'w-48 h-48 bg-emerald-200/50 scale-100'
                  : phase === 'hold'
                  ? 'w-44 h-44 bg-amber-100/60 scale-95'
                  : 'w-28 h-28 bg-stone-200/60 scale-75'
              }`}
            />
            {/* Core Circle */}
            <div
              className={`relative z-10 w-28 h-28 rounded-full border border-stone-300 flex flex-col items-center justify-center bg-white shadow-md transition-all duration-1000 ease-in-out ${
                phase.startsWith('inhale') ? 'scale-110 border-emerald-500' : 'scale-90 border-stone-300'
              }`}
            >
              <span className="text-3xl font-mono font-bold text-stone-900">{countdown}</span>
              <span className="text-[10px] text-stone-400 uppercase tracking-widest mt-0.5">sec</span>
            </div>
          </div>

          <div className="text-center mt-6">
            <div className="text-sm font-bold text-stone-900 mb-1">{getPhaseInstruction()}</div>
            <div className="text-xs text-stone-500 font-mono">
              Completed Cycles: {cyclesCompleted}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 pt-4 border-t border-stone-200">
          <button
            onClick={() => setIsActive(!isActive)}
            className="cursor-pointer inline-flex items-center gap-2 px-6 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-emerald-900 transition-colors shadow-xs"
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isActive ? 'Pause Pacing' : 'Begin Pacing'}</span>
          </button>
          <button
            onClick={handleReset}
            className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2.5 bg-stone-100 text-stone-700 hover:text-stone-900 rounded-lg text-xs font-medium hover:bg-stone-200/80 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
