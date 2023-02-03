import { Test, TestingModule } from '@nestjs/testing';
import { NotesDeFraisController } from './notes-de-frais.controller';

describe('NotesDeFraisController', () => {
  let controller: NotesDeFraisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesDeFraisController],
    }).compile();

    controller = module.get<NotesDeFraisController>(NotesDeFraisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
