import { faker } from '@faker-js/faker';

export const generateMockData = () => {
  console.log('[Mock Data] Generating mock data...');
  // Generate revenue data
  const revenueData = {
    daily: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
      amount: faker.number.float({ min: 1000, max: 5000 })
    })),
    monthly: Array.from({ length: 12 }, (_, i) => ({
      month: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toISOString(),
      amount: faker.number.float({ min: 30000, max: 150000 })
    })),
    yearToDate: faker.number.float({ min: 500000, max: 1000000 }),
    growth: faker.number.float({ min: -10, max: 30 })
  };

  // Generate user session data
  const userSessions = {
    total: faker.number.int({ min: 10000, max: 50000 }),
    trafficSources: [
      { source: 'Direct', count: faker.number.int({ min: 1000, max: 5000 }) },
      { source: 'Organic Search', count: faker.number.int({ min: 2000, max: 8000 }) },
      { source: 'Referral', count: faker.number.int({ min: 500, max: 3000 }) },
      { source: 'Social', count: faker.number.int({ min: 1000, max: 4000 }) }
    ],
    geoDistribution: [
      { country: 'United States', count: faker.number.int({ min: 5000, max: 20000 }) },
      { country: 'United Kingdom', count: faker.number.int({ min: 2000, max: 10000 }) },
      { country: 'Germany', count: faker.number.int({ min: 1000, max: 5000 }) },
      { country: 'France', count: faker.number.int({ min: 1000, max: 5000 }) }
    ],
    activeUsers: faker.number.int({ min: 500, max: 2000 })
  };

  // Generate clients
  const clients = Array.from({ length: 50 }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    company: faker.company.name(),
    email: faker.internet.email(),
    status: faker.helpers.arrayElement(['active', 'inactive', 'pending']),
    joinDate: faker.date.past(),
    lastActive: faker.date.recent(),
    projectCount: faker.number.int({ min: 1, max: 10 }),
    totalRevenue: faker.number.float({ min: 5000, max: 100000 })
  }));

  // Generate surveys
  const surveys = Array.from({ length: 20 }, (_, index) => {
    const responseCount = faker.number.int({ min: 50, max: 500 });
    const targetResponses = faker.number.int({ min: 100, max: 1000 });
    return {
      id: index + 1,
      type: faker.helpers.arrayElement(['wtp', 'csat', 'nps', 'custom']),
      title: faker.lorem.sentence(),
      createdAt: faker.date.past(),
      deadline: faker.date.future(),
      status: faker.helpers.arrayElement(['draft', 'active', 'completed']),
      questions: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, (_, qIndex) => ({
        id: qIndex + 1,
        text: faker.lorem.sentence(),
        type: faker.helpers.arrayElement(['scale', 'text', 'choice']),
        responses: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () => ({
          score: faker.number.int({ min: 1, max: 10 }),
          count: faker.number.int({ min: 10, max: 100 })
        }))
      })),
      responseCount,
      targetResponses,
      completionRate: Math.round((responseCount / targetResponses) * 100)
    };
  });

  const mockData = {
    revenue: revenueData,
    userSessions,
    clients,
    surveys
  };

  console.log('[Mock Data] Generated mock data:', {
    revenueDataPoints: revenueData.daily.length,
    userSessionsCount: userSessions.total,
    clientsCount: clients.length,
    surveysCount: surveys.length
  });

  return mockData;
};
