# Тестовое задание - парсинг отзывов delivery-club. 
## Исполнитель - Малышев Станислав.


### Запуск
``` bash
// stop and run containers
$ yarn docker:env:down
$ yarn docker:env:up

// stop all Docker containers
$ yarn docker:stop
```

###  Задание
Разработать инструмент, который выполняет две задачи:
- Стягивает отзывы с https://www.delivery-club.ru/srv/KFC_msk/feedbacks и записывает их в СУБД
- Отдает JSON для SPA-приложения
- Фильтрация и сортировка отзывов по рейтингу или дате,
- Пагинация

### Необходимые поля
  - Текст отзыва,
  - Рейтинг,
  - Дату/время создания,
  - Данные пользователя, который оставил отзыв,
  - Ответы у отзыва.

### Требования
- TypeScript.
- Чем проще парсинг-библиотека, тем лучше.
- При повторном запуске парсинга необходимо добавлять новые отзывы, обновлять старые. Важно: обновлять только то, что действительно изменилось.
- API необходимо задокументировать с помощью OpenAPI v3 (Swagger).
- Код опубликовать на GitHub, с понятными коммитами.

### Реализация
Для получения данных отзывов парсинг страниц не требуется. У компании delivery-club есть публичное API, ендпоинты которого используются для получения данных.
В проекте будет задействован основной эндпоинт:
-  https://api.delivery-club.ru/api1.2/reviews?chainId=48274&limit=100&offset=20&cacheBreaker=1664679021

База:
- NestJS
- MongoDB
- Swagger

### Комментарии
- дополнительно, но напрямую не относится к задаче:
  - вынести логику репозитория в общий раздел libs, отделив от бизнес логики
  - добавить конфиг и env файлы, применить их к Docker
  - добавить класс-валидатор и класс-трансформатор
  - добавить автотесты
  - запросить у Delivery-Club описание API для коррекции выгрузки
  - дополнить Swagger, дополнительно обработать ошибки
