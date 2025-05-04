import {
  EntitySubscriberInterface,
  EventSubscriber,
  RemoveEvent,
} from 'typeorm';
import { Survey } from './survey.entity';
import { Injectable } from '@nestjs/common';
import { SurveySchema } from './survey-schema/survey-schema.entity';

@Injectable()
@EventSubscriber()
export class SurveySubscriber implements EntitySubscriberInterface<Survey> {
  /**
   * Указывает, что этот подписчик слушает только события Survey.
   */
  listenTo() {
    return Survey;
  }

  async afterRemove(event: RemoveEvent<Survey>) {
    //region Удалить схему только что удаленной анкеты, если она не используется в других анкетах
    const surveySchemaRepository = event.manager.getRepository(SurveySchema);
    const surveyRepository = event.manager.getRepository(Survey);

    const schemaId = event.databaseEntity.schemaId;

    const isSchemaDangling = await surveyRepository.existsBy({
      schema: { id: schemaId },
    });

    if (isSchemaDangling) {
      await surveySchemaRepository.delete(schemaId);
    }
    //endregion
  }
}
