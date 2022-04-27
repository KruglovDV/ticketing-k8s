import express, { Request, Response } from 'express';
import { NotFoundError } from '@ticketing-kr/common';

import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findById(id);
    res.send(ticket);
  } catch (err) {
    throw new NotFoundError();
  }
});

export { router as showTicketRouter };