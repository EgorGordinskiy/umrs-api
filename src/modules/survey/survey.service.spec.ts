import { Test, TestingModule } from '@nestjs/testing';
import { SurveyService } from './survey.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Survey } from './survey.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateSurveyDto } from './dto/create-survey.dto';

describe('SurveyService', () => {
  let service: SurveyService;

  const mockRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SurveyService,
        {
          provide: getRepositoryToken(Survey),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<SurveyService>(SurveyService);
  });

  describe('findOne', () => {
    it('по запросу должен возвращать опрос со схемой и ответами', async () => {
      const mockSurvey = {
        id: '395d14f9-e033-43cb-b50a-f1b1919a0694',
        title: 'Test Survey',
        description: 'Test Description',
        isActive: true,
        schema: { id: '123' },
        responses: [],
      };

      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(mockSurvey);

      const result = await service.findOne(
        mockSurvey.id,
        true, // withSchema
        true, // withResponses
      );

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockSurvey.id },
        relations: {
          schema: true,
          responses: true,
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        cache: expect.any(Number),
      });
      expect(result).toEqual(mockSurvey);
    });

    it('должен выбрасывать NotFoundException, если опрос не найден', async () => {
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('должен создать новый опрос', async () => {
      const createDtoData = {
        title: 'New Survey',
        description: 'New Description',
        schemaId: '3f52d000-e19b-4702-91e3-d5b2898464a7',
        isActive: true,
      };

      const createDto = plainToClass(CreateSurveyDto, createDtoData);

      const expectedSurvey = plainToClass(Survey, {
        id: '9044ff78-6afa-4f55-b0df-f81f9c69725d',
        ...createDtoData,
      });

      jest.spyOn(mockRepository, 'create').mockReturnValue(expectedSurvey);
      jest.spyOn(mockRepository, 'save').mockResolvedValue(expectedSurvey);

      const result = await service.create(createDtoData);

      expect(mockRepository.create).toHaveBeenCalledWith(createDto);
      expect(mockRepository.save).toHaveBeenCalledWith(expectedSurvey);
      expect(result).toEqual(expectedSurvey);
    });
  });

  describe('delete', () => {
    it('должен удалить опрос', async () => {
      const surveyId = '57324cea-fcfa-40f7-96ff-a6bca5d083e6';
      const deleteResult = { affected: 1 };

      jest.spyOn(mockRepository, 'delete').mockResolvedValue(deleteResult);
      await service.remove(surveyId);
      expect(mockRepository.delete).toHaveBeenCalledWith(surveyId);
    });
  });
});
