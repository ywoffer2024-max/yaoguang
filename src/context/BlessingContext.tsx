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
      passwordEnabled: enabled
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

// Generate a random 4-digit password with filtering rules
export function generatePassword(): string {
  const maxAttempts = 100;
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Generate 4 random digits (0-9, excluding 4)
    const allowedDigits = [0, 1, 2, 3, 5, 6, 7, 8, 9];
    const digits: number[] = [];
    
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * allowedDigits.length);
      digits.push(allowedDigits[randomIndex]);
    }
    
    const pin = digits.join('');
    
    // Check if all digits are the same (0000, 1111, etc.)
    if (digits.every(d => d === digits[0])) {
      continue;
    }
    
    // Check for sequential patterns (ascending)
    const ascending = ['0123', '1235', '2356', '3567', '5678', '6789'];
    // Check for sequential patterns (descending)  
    const descending = ['9876', '8765', '7658', '6587', '5876', '3210', '2103', '1032'];
    
    // More comprehensive sequential check
    let isSequential = false;
    
    // Check if digits form a +1 sequence
    if (digits[1] === digits[0] + 1 && 
        digits[2] === digits[1] + 1 && 
        digits[3] === digits[2] + 1) {
      isSequential = true;
    }
    
    // Check if digits form a -1 sequence
    if (digits[1] === digits[0] - 1 && 
        digits[2] === digits[1] - 1 && 
        digits[3] === digits[2] - 1) {
      isSequential = true;
    }
    
    if (isSequential) {
      continue;
    }
    
    // Passed all checks
    return pin;
  }
  
  // Fallback (should rarely happen)
  return '5782';
}
