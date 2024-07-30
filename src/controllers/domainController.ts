import { Request, Response } from 'express';
import { Domain } from '../models/domainModel';
import { addDomainForAnalysis, getDomainInfo } from '../services/domainService';
import asyncHandler from 'express-async-handler';

export const getDomain = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { name } = req.params;
  const domain = await getDomainInfo(name);
  if (!domain) {
    await addDomainForAnalysis(name);
    res.status(202).json({ message: 'Domain added for analysis. Check back later.' });
  } else {
    res.json(domain);
  }
});

export const addDomain = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;
  const existingDomain = await Domain.findOne({ name });
  if (existingDomain) {
    res.status(400).json({ message: 'Domain already exists.' });
  } else {
    await addDomainForAnalysis(name);
    res.status(201).json({ message: 'Domain added for analysis.' });
  }
});
