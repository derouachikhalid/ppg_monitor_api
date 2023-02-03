import { Test, TestingModule } from '@nestjs/testing';
import { NotesDeFraisService } from './notes-de-frais.service';

describe('NotesDeFraisService', () => {
  let service: NotesDeFraisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotesDeFraisService],
    }).compile();

    service = module.get<NotesDeFraisService>(NotesDeFraisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
