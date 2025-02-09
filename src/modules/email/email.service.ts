import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly mailerService: MailerService) {}

  public async sendMail(sendMailOptions: ISendMailOptions): Promise<void> {
    try {
      await this.mailerService.sendMail(sendMailOptions);

      this.logger.log(`Письмо успешно отправлено`);
    } catch (error) {
      this.logger.error(`Не удалось отправить письмо`, error);

      throw new Error('Не удалось отправить письмо');
    }
  }
}
