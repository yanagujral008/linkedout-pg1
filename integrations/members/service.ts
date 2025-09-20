import { Member } from ".";

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

export const getCurrentMember = async (): Promise<Member | null> => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Check if user is logged in (mock implementation)
    const isLoggedIn = localStorage.getItem('demo-logged-in') === 'true';
    
    if (isLoggedIn) {
      return mockMember;
    }
    
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
