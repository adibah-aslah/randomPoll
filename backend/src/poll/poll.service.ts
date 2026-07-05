import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';

@Injectable()
export class PollService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePollDto) {
    return this.prisma.poll.create({
      data: {
        question: dto.question,
        category: dto.category ?? 'Community',
        options: {
          create: dto.options.map((text) => ({ text })),
        },
      },
      include: { options: true },
    });
  }

  async findAll() {
    return this.prisma.poll.findMany({
      include: { options: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const poll = await this.prisma.poll.findUnique({
      where: { id },
      include: { options: true },
    });
    if (!poll) throw new NotFoundException(`Poll ${id} tidak wujud`);
    return poll;
  }

  async update(id: string, dto: UpdatePollDto) {
    await this.findOne(id); // pastikan wujud dulu

    // Nota: kalau dto.options disertakan, kita cuma update question/category kat sini.
    // Update options (tambah/buang) perlu logic berasingan sebab ia relation.
    return this.prisma.poll.update({
      where: { id },
      data: {
        question: dto.question,
        category: dto.category,
      },
      include: { options: true },
    });
  }

  async vote(optionId: string) {
    const option = await this.prisma.pollOption.findUnique({
      where: { id: optionId },
    });
    if (!option) throw new NotFoundException(`Option ${optionId} tidak wujud`);

    return this.prisma.pollOption.update({
      where: { id: optionId },
      data: { votes: { increment: 1 } },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.poll.delete({ where: { id } });
  }
}
