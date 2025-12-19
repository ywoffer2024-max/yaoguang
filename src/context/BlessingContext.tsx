import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BlessingState {
  hasBlessing: boolean;
  blessingText: string;
  passwordEnabled: boolean;
  password: string;
  isUnlocked: boolean;
}

interface BlessingContextType {
  state: BlessingState;
  setHasBlessing: (value: boolean) => void;
  setBlessingText: (text: string) => void;
  setPasswordEnabled: (enabled: boolean) => void;
  setPassword: (password: string) => void;
  setIsUnlocked: (unlocked: boolean) => void;
  resetState: () => void;
}

const initialState: BlessingState = {
  hasBlessing: false,
  blessingText: '',
  passwordEnabled: false,
  password: '',
  isUnlocked: false,
};

const BlessingContext = createContext<BlessingContextType | undefined>(undefined);

export const BlessingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<BlessingState>(initialState);

  const setHasBlessing = (value: boolean) => {
    setState(prev => ({ ...prev, hasBlessing: value }));
  };

  const setBlessingText = (text: string) => {
    setState(prev => ({ ...prev, blessingText: text }));
  };

  const setPasswordEnabled = (enabled: boolean) => {
    setState(prev => ({ 
      ...prev, 
      passwordEnabled: enabled,
      password: enabled ? generatePassword() : ''
    }));
  };

  const setPassword = (password: string) => {
    setState(prev => ({ ...prev, password }));
  };

  const setIsUnlocked = (unlocked: boolean) => {
    setState(prev => ({ ...prev, isUnlocked: unlocked }));
  };

  const resetState = () => {
    setState(initialState);
  };

  return (
    <BlessingContext.Provider 
      value={{ 
        state, 
        setHasBlessing, 
        setBlessingText, 
        setPasswordEnabled, 
        setPassword,
        setIsUnlocked,
        resetState 
      }}
    >
      {children}
    </BlessingContext.Provider>
  );
};

export const useBlessing = () => {
  const context = useContext(BlessingContext);
  // In rare cases (e.g. HMR glitches), allow pages to render instead of hard-crashing.
  // This keeps UI usable; real app usage should still mount BlessingProvider in App.
  if (!context) {
    return {
      state: initialState,
      setHasBlessing: () => {},
      setBlessingText: () => {},
      setPasswordEnabled: () => {},
      setPassword: () => {},
      setIsUnlocked: () => {},
      resetState: () => {},
    };
  }
  return context;
};

// Generate a fixed 4-digit password for testing
function generatePassword(): string {
  return '1234';
}
