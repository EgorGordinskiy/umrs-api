import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

/**
 * Определяет структуру ответов на ошибки HTTP.
 */
interface ErrorResponse {
  /** Код состояния HTTP. */
  statusCode: number;
  /** Метка времени ответа. */
  timestamp: string;
  /** Сообщение об ошибке. */
  message: string;
  /** Путь запроса. */
  path?: string;
  /** Трассировка стека. */
  stack?: string;
  /** Имя ошибки. */
  name?: string;
}

@Catch()
export class DebugExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  private readonly skipExceptions = [UnauthorizedException];

  /**
   * Обрабатывает исключения, пойманные во время обработки HTTP-запроса, пропуская указанные типы исключений.
   * Формирует исключение в структурированный ответ об ошибке.
   *
   * @param exception - Исключение, брошенное во время обработки запроса.
   * @param host - Текущий хост аргументов, содержащий контекст запроса.
   */
  catch(exception: unknown, host: ArgumentsHost): void {
    // не обрабатывать исключения, для которых, например, есть другой фильтр
    if (
      this.skipExceptions.some((_exception) => exception instanceof _exception)
    ) {
      return;
    }

    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = DebugExceptionsFilter.createErrorResponse(
      exception,
      httpStatus,
    );

    Logger.error(exception);

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  /**
   * Создает структурированный объект ответа на ошибку на основе предоставленного исключения и кода состояния.
   * Обрабатывает HttpException, общие Error и другие типы, включая трассировку стека и имя, если оно доступно.
   *
   * @param exception Исключение для форматирования.
   * @param statusCode Код состояния HTTP для включения в ответ.
   * @returns Объект `ErrorResponse`, содержащий сведения об ошибке.
   */
  private static createErrorResponse(
    exception: unknown,
    statusCode: number,
  ): ErrorResponse {
    const base: ErrorResponse = {
      statusCode,
      timestamp: new Date().toISOString(),
      message: '',
    };

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      if (
        typeof exceptionResponse === 'object' &&
        'message' in exceptionResponse &&
        typeof exceptionResponse.message === 'string'
      ) {
        base.message = exceptionResponse.message;
      } else if (typeof exceptionResponse === 'string') {
        base.message = exceptionResponse;
      } else {
        base.message = JSON.stringify(exceptionResponse);
      }
    } else if (exception instanceof Error) {
      base.message = exception.message;
      base.stack = exception.stack;
      base.name = exception.name;
    } else {
      base.message = String(exception);
    }

    return base;
  }
}
