export const getServerSession = jest.fn(() => {
  return {
    user: {
      id: '123',
      name: 'Test User',
      email: 'test@example.com',
    },
  };
});
