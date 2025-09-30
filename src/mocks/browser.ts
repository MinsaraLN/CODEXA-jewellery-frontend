// src/mocks/browser.ts
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
import { RequestHandler } from 'msw';

export const worker = setupWorker(...handlers as RequestHandler[]);
