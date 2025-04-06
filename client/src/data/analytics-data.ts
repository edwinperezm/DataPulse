// Define the analytics data point type
export interface AnalyticsDataPoint {
  date: string;
  platform: string;
  device: string;
  country: string;
  city: string;
  sessions: number;
  revenue: number;
  bounceRate: number;
  conversionRate: number;
  avgSessionTime: string;
}

// Mock data based on the provided CSV
export const analyticsMockData: AnalyticsDataPoint[] = [
  {
    date: '2021-08-01',
    platform: 'Web',
    device: 'Desktop',
    country: 'USA',
    city: 'New York',
    sessions: 1200,
    revenue: 3500,
    bounceRate: 0.25,
    conversionRate: 0.04,
    avgSessionTime: '00:03:45'
  },
  {
    date: '2021-08-01',
    platform: 'iOS',
    device: 'Mobile',
    country: 'USA',
    city: 'Los Angeles',
    sessions: 980,
    revenue: 2900,
    bounceRate: 0.20,
    conversionRate: 0.05,
    avgSessionTime: '00:02:56'
  },
  {
    date: '2021-08-01',
    platform: 'Android',
    device: 'Mobile',
    country: 'Canada',
    city: 'Toronto',
    sessions: 750,
    revenue: 1800,
    bounceRate: 0.18,
    conversionRate: 0.03,
    avgSessionTime: '00:03:12'
  },
  {
    date: '2021-08-02',
    platform: 'Web',
    device: 'Desktop',
    country: 'Canada',
    city: 'Vancouver',
    sessions: 1100,
    revenue: 3200,
    bounceRate: 0.22,
    conversionRate: 0.04,
    avgSessionTime: '00:04:10'
  },
  {
    date: '2021-08-02',
    platform: 'Web',
    device: 'Desktop',
    country: 'UK',
    city: 'London',
    sessions: 900,
    revenue: 2800,
    bounceRate: 0.30,
    conversionRate: 0.03,
    avgSessionTime: '00:03:50'
  },
  {
    date: '2021-08-02',
    platform: 'iOS',
    device: 'Mobile',
    country: 'USA',
    city: 'Chicago',
    sessions: 1000,
    revenue: 2500,
    bounceRate: 0.15,
    conversionRate: 0.06,
    avgSessionTime: '00:03:05'
  },
  {
    date: '2021-08-03',
    platform: 'Android',
    device: 'Tablet',
    country: 'UK',
    city: 'Manchester',
    sessions: 400,
    revenue: 950,
    bounceRate: 0.27,
    conversionRate: 0.02,
    avgSessionTime: '00:02:45'
  },
  {
    date: '2021-08-03',
    platform: 'Web',
    device: 'Desktop',
    country: 'Australia',
    city: 'Sydney',
    sessions: 700,
    revenue: 2200,
    bounceRate: 0.24,
    conversionRate: 0.05,
    avgSessionTime: '00:03:30'
  },
  {
    date: '2021-08-03',
    platform: 'iOS',
    device: 'Mobile',
    country: 'Australia',
    city: 'Melbourne',
    sessions: 600,
    revenue: 2000,
    bounceRate: 0.19,
    conversionRate: 0.04,
    avgSessionTime: '00:02:58'
  },
  {
    date: '2021-08-04',
    platform: 'Android',
    device: 'Mobile',
    country: 'USA',
    city: 'San Francisco',
    sessions: 950,
    revenue: 2750,
    bounceRate: 0.17,
    conversionRate: 0.06,
    avgSessionTime: '00:03:15'
  },
  // Additional mock data to make the dashboard more comprehensive
  {
    date: '2021-08-04',
    platform: 'Web',
    device: 'Desktop',
    country: 'Germany',
    city: 'Berlin',
    sessions: 850,
    revenue: 2450,
    bounceRate: 0.21,
    conversionRate: 0.045,
    avgSessionTime: '00:03:22'
  },
  {
    date: '2021-08-04',
    platform: 'iOS',
    device: 'Mobile',
    country: 'France',
    city: 'Paris',
    sessions: 720,
    revenue: 1950,
    bounceRate: 0.23,
    conversionRate: 0.035,
    avgSessionTime: '00:02:48'
  },
  {
    date: '2021-08-05',
    platform: 'Web',
    device: 'Desktop',
    country: 'USA',
    city: 'New York',
    sessions: 1250,
    revenue: 3650,
    bounceRate: 0.24,
    conversionRate: 0.042,
    avgSessionTime: '00:03:52'
  },
  {
    date: '2021-08-05',
    platform: 'Android',
    device: 'Mobile',
    country: 'Japan',
    city: 'Tokyo',
    sessions: 680,
    revenue: 1850,
    bounceRate: 0.19,
    conversionRate: 0.038,
    avgSessionTime: '00:03:05'
  },
  {
    date: '2021-08-05',
    platform: 'iOS',
    device: 'Tablet',
    country: 'USA',
    city: 'Los Angeles',
    sessions: 520,
    revenue: 1650,
    bounceRate: 0.18,
    conversionRate: 0.047,
    avgSessionTime: '00:04:12'
  },
  {
    date: '2021-08-06',
    platform: 'Web',
    device: 'Desktop',
    country: 'Brazil',
    city: 'Sao Paulo',
    sessions: 780,
    revenue: 2100,
    bounceRate: 0.26,
    conversionRate: 0.032,
    avgSessionTime: '00:02:58'
  },
  {
    date: '2021-08-06',
    platform: 'Android',
    device: 'Mobile',
    country: 'India',
    city: 'Mumbai',
    sessions: 920,
    revenue: 2300,
    bounceRate: 0.28,
    conversionRate: 0.029,
    avgSessionTime: '00:02:35'
  },
  {
    date: '2021-08-06',
    platform: 'iOS',
    device: 'Mobile',
    country: 'USA',
    city: 'Chicago',
    sessions: 1050,
    revenue: 2750,
    bounceRate: 0.16,
    conversionRate: 0.058,
    avgSessionTime: '00:03:18'
  },
  {
    date: '2021-08-07',
    platform: 'Web',
    device: 'Desktop',
    country: 'UK',
    city: 'London',
    sessions: 930,
    revenue: 2950,
    bounceRate: 0.29,
    conversionRate: 0.033,
    avgSessionTime: '00:03:42'
  },
  {
    date: '2021-08-07',
    platform: 'iOS',
    device: 'Mobile',
    country: 'Canada',
    city: 'Toronto',
    sessions: 790,
    revenue: 1950,
    bounceRate: 0.17,
    conversionRate: 0.036,
    avgSessionTime: '00:03:25'
  }
];

// Helper functions for data analysis
export const calculateTotalSessions = (data: AnalyticsDataPoint[]): number => {
  return data.reduce((total, item) => total + item.sessions, 0);
};

export const calculateTotalRevenue = (data: AnalyticsDataPoint[]): number => {
  return data.reduce((total, item) => total + item.revenue, 0);
};

export const calculateAverageBounceRate = (data: AnalyticsDataPoint[]): number => {
  return data.reduce((total, item) => total + item.bounceRate, 0) / data.length;
};

export const calculateAverageConversionRate = (data: AnalyticsDataPoint[]): number => {
  return data.reduce((total, item) => total + item.conversionRate, 0) / data.length;
};

export const groupByPlatform = (data: AnalyticsDataPoint[]): Record<string, number> => {
  const result: Record<string, number> = {};
  
  data.forEach(item => {
    if (result[item.platform]) {
      result[item.platform] += item.sessions;
    } else {
      result[item.platform] = item.sessions;
    }
  });
  
  return result;
};

export const groupByDevice = (data: AnalyticsDataPoint[]): Record<string, number> => {
  const result: Record<string, number> = {};
  
  data.forEach(item => {
    if (result[item.device]) {
      result[item.device] += item.sessions;
    } else {
      result[item.device] = item.sessions;
    }
  });
  
  return result;
};

export const groupByCountry = (data: AnalyticsDataPoint[]): Record<string, number> => {
  const result: Record<string, number> = {};
  
  data.forEach(item => {
    if (result[item.country]) {
      result[item.country] += item.sessions;
    } else {
      result[item.country] = item.sessions;
    }
  });
  
  return result;
};

export const getRevenueByDate = (data: AnalyticsDataPoint[]): Record<string, number> => {
  const result: Record<string, number> = {};
  
  data.forEach(item => {
    if (result[item.date]) {
      result[item.date] += item.revenue;
    } else {
      result[item.date] = item.revenue;
    }
  });
  
  return result;
};

export const getSessionsByDate = (data: AnalyticsDataPoint[]): Record<string, number> => {
  const result: Record<string, number> = {};
  
  data.forEach(item => {
    if (result[item.date]) {
      result[item.date] += item.sessions;
    } else {
      result[item.date] = item.sessions;
    }
  });
  
  return result;
};
