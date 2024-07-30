import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import Bottleneck from 'bottleneck';

const limiter = new Bottleneck({
  minTime: 333, // approximately 3 requests per second
  maxConcurrent: 1
});

const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({ baseURL });

  axiosRetry(instance, {
    retries: 3,
    retryDelay: (retryCount) => {
      console.log(`retry attempt: ${retryCount}`);
      return retryCount * 2000; // exponential backoff
    },
    retryCondition: (error) => {
      // Retry on rate limit and 5xx errors
      return (
        axiosRetry.isNetworkOrIdempotentRequestError(error) ||
        error.response?.status === 429
      );
    }
  });

  return instance;
};

export const requestWithRetry = async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
  await limiter.schedule(() => Promise.resolve());
  return axios(config);
};

export const createRateLimitedAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = createAxiosInstance(baseURL);

  instance.interceptors.request.use(async (config) => {
    await limiter.schedule(() => Promise.resolve());
    return config;
  });

  return instance;
};
