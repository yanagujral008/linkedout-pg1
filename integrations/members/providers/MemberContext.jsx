import { createContext, useContext } from 'react';

// Create the context
export const MemberContext = createContext(undefined);

// Custom hook to use the member context
export const useMember = () => {
  const context = useContext(MemberContext);
  if (context === undefined) {
    throw new Error('useMember must be used within a MemberProvider');
  }
  return context;
};
