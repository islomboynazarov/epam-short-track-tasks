import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    throttledGetDataFromApi.cancel();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: {} });
    (axios.create as jest.Mock).mockReturnValue({ get: mockGet });
    await throttledGetDataFromApi('/posts');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: {} });
    (axios.create as jest.Mock).mockReturnValue({ get: mockGet });
    await throttledGetDataFromApi('/posts');
    expect(mockGet).toHaveBeenCalledWith('/posts');
  });

  test('should return response data', async () => {
    const mockData = { id: 1, title: 'test' };
    const mockGet = jest.fn().mockResolvedValue({ data: mockData });
    (axios.create as jest.Mock).mockReturnValue({ get: mockGet });
    const result = await throttledGetDataFromApi('/posts');
    expect(result).toEqual(mockData);
  });
});