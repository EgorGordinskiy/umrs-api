## Локальная установка зависимостей

```bash
$ npm install
```

## Сборка и запуск проекта

```bash
# Запуск в режиме разработки
$ npm run start

# Запуск в режиме разработки с отслеживанием изменений (watch mode)
$ npm run start:dev

# Запуск в production-режиме
$ npm run start:prod
```

## Запуск тестов

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Работа с репозиторием

Принцип **"1 задача = 1 коммит = 1 Pull Request"**.

Мы придерживаемся принципа **"1 задача = 1 коммит = 1 Pull Request"**. Это означает, что каждая задача должна быть выполнена в отдельной ветке, содержать только один коммит и оформляться в виде одного Pull Request

Создавайте отдельную ветку для каждой задачи. Название ветки должно отражать суть задачи, например:

- `feature/add-user-auth`
- `fix/header-styles`
- `hotfix/login-bug`

Примеры сообщения коммита:

- feat: add email login
- fix: fix menu display on mobile devices
- docs: update setup instructions

См. [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary).

### Использование rebase вместо merge

Для поддержания чистоты истории коммитов следует использовать команду rebase, а не merge. Это помогает избежать лишних merge-коммитов, оставляя историю линейной и понятной.

### Процесс работы

Создайте ветку от актуальной основной ветки:

```bash
$ git checkout -b feature/your-feature-name
```

Выполните задачу и сделайте коммит:

```bash
$ git add .
$ git commit -m "feat:  add email login"
```

Если в процессе работы было сделано несколько коммитов, объедините их в один с помощью rebase

Подробнее можно почитать [здесь](https://habr.com/ru/companies/flant/articles/536698/).

После того как все изменения будут объединены в один коммит, выполните пуш ветки в удалённый репозиторий:

```bash
$ git push origin feature/your-feature-name
```

Создайте Pull Request (PR) в GitHub, направив его из вашей рабочей ветки в основную

В описание Pull Request нужно добавить ссылку на соответствующий тикет, связанный с этим изменением.

После завершения код-ревью и всех необходимых исправлений Pull Request может быть вмержен в основную ветку

**Тестирование**  
Перед созданием Pull Request убедитесь, что все тесты проходят успешно, и новые изменения не ломают существующий функционал.

## Работа с переменными окружения

Для работы с переменными окружения используйте файл `.env` в корне проекта. В нем можно хранить чувствительные данные, такие как:
- параметры подключения к базе данных, 
- API ключи
- другие важные настройки.


Пример `.env` файла:

```ini
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_NAME=your-database-name
```

## Работа с БД
Для миграций и других операций с БД используется [CLI typeorm](https://typeorm.io/using-cli).

### Создание миграции

Миграция требуется при:
- добавлении новой таблицы
- изменении структуры существующей таблицы
- удалении таблицы

```bash
npm run migration:generate
```

### Запуск миграции

```bash
npm run migration:run
```

### Откат миграции

```bash
npm run migration:revert
```
