import { Injectable } from '@nestjs/common';
// import { CreatePollDto } from './dto/create-poll.dto';
// import { UpdatePollDto } from './dto/update-poll.dto';
import { Poll } from '@/poll/entities/poll.entity';

@Injectable()
export class PollService {
  private polls: Poll[] = [
    {
      id: '1',
      question: 'What is your favorite tech stack?',
      options: [
        { text: 'React & NestJS', votes: 13 },
        { text: 'Next.js', votes: 53 },
      ],
    },
  ];

  // create(createPollDto: CreatePollDto) {
  //   return 'This action adds a new poll';
  // }

  findAll(): Poll[] {
    return this.polls;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} poll`;
  // }

  // update(id: number, updatePollDto: UpdatePollDto) {
  //   return `This action updates a #${id} poll`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} poll`;
  // }
}
