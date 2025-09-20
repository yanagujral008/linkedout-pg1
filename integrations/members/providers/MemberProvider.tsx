import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { MemberActions, MemberContext, MemberState } from '.';
import { Member } from '..';

// Local storage key
const MEMBER_STORAGE_KEY = 'member-store';

// Mock member data
const mockMember: Member = {
  _id: 'mock-member-1',
  _createdDate: new Date('2024-01-01'),
  _updatedDate: new Date('2024-01-01'),
  loginEmail: 'user@example.com',
  profile: {
    nickname: 'Demo User',
    slug: 'demo-user',
    picture: 'https://static.wixstatic.com/media/409286_d3bf7cf4d5824f8996dee6732aaed013~mv2.jpg'
  },
  privacyStatus: 'PUBLIC',
  status: 'ACTIVE'
};

interface MemberProviderProps {
  children: ReactNode;
}

export const MemberProvider: React.FC<MemberProviderProps> = ({ children }) => {
  // Initialize state from localStorage or defaults
  const [state, setState] = useState<MemberState>(() => {
    let storedMemberData: Member | null = null;
    
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(MEMBER_STORAGE_KEY);
        if (stored) {
          const parsedData = JSON.parse(stored);
          storedMemberData = parsedData;
        }
      } catch (error) {
        console.error('Error loading member state from localStorage:', error);
      }
    }
    
    return {
      member: storedMemberData,
      isAuthenticated: !!storedMemberData,
      isLoading: false,
      error: null,
    };
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(MEMBER_STORAGE_KEY, JSON.stringify(state.member));
      } catch (error) {
        console.error('Error saving member state to localStorage:', error);
      }
    }
  }, [state.member]);

  // Update state helper
  const updateState = useCallback((updates: Partial<MemberState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  // Member actions
  const actions: MemberActions = {
    /**
     * Load current member (mock implementation)
     */
    loadCurrentMember: useCallback(async () => {
      try {
        updateState({ isLoading: true, error: null });
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // For demo purposes, we'll use mock data
        // In a real app, you'd check for actual authentication
        const isLoggedIn = localStorage.getItem('demo-logged-in') === 'true';
        
        if (isLoggedIn) {
          updateState({
            member: mockMember,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          updateState({
            member: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } catch (err) {
        updateState({
          error: err instanceof Error ? err.message : 'Failed to load member',
          member: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    }, [updateState]),

    /**
     * Login action (mock implementation)
     */
    login: useCallback(() => {
      // Mock login - just set a flag in localStorage
      localStorage.setItem('demo-logged-in', 'true');
      updateState({
        member: mockMember,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    }, [updateState]),

    /**
     * Logout action
     */
    logout: useCallback(() => {      
      // Clear localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem(MEMBER_STORAGE_KEY);
          localStorage.removeItem('demo-logged-in');
        } catch (error) {
          console.error('Error clearing member state from localStorage:', error);
        }
      }
      
      updateState({
        member: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }, [updateState]),

    /**
     * Clear member state
     */
    clearMember: useCallback(() => {
      updateState({
        member: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }, [updateState]),
  };

  // Auto-load member on mount
  useEffect(() => {
    actions.loadCurrentMember();
  }, [actions.loadCurrentMember]);

  // Context value
  const contextValue = {
    ...state,
    actions,
  };

  return (
    <MemberContext.Provider value={contextValue}>
      {children}
    </MemberContext.Provider>
  );
};
