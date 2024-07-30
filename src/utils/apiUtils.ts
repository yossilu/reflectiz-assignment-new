import axios from 'axios';
import geoip from 'geoip-lite';
import { requestWithRetry, createRateLimitedAxiosInstance } from './requestUtils';
import { config } from '../config';

const virusTotalAxios = createRateLimitedAxiosInstance('https://www.virustotal.com/api/v3');
const whoisAxios = createRateLimitedAxiosInstance('https://www.whoisxmlapi.com/whoisserver');

export const fetchVirusTotalInfo = async (domain: string) => {
  const response = await virusTotalAxios.get(`/domains/${domain}`, {
    headers: { 'x-apikey': config.virusTotalApiKey }
  });
  return response.data;
};

export const fetchWhoisInfo = async (domain: string) => {
  const response = await whoisAxios.get(`WhoisService?domainName=${domain}&apiKey=${config.whoisApiKey}&outputFormat=JSON`);
  return response.data;
};

export const fetchGeoIpInfo = async (domain: string) => {
  const ip = await resolveDomainToIp(domain);
  const geo = geoip.lookup(ip);
  return geo;
};

export const resolveDomainToIp = async (domain: string): Promise<string> => {
  const response = await requestWithRetry({
    url: `https://api.ipify.org?format=json&domain=${domain}`,
    method: 'GET'
  });
  return response.data.ip;
};
