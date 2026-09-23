import { Router } from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { Server } from '../src/presentation/server.js';

describe('server.ts', () => {
  it('should respond with the expected payload for a registered route', async () => {
    const routes = Router();
    routes.get('/health', (_req, res) => {
      res.status(200).json({ status: 'ok' });
    });

    const server = new Server({
      port: 0,
      routes,
      public_path: 'public',
    });

    const response = await request(server.app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });
});