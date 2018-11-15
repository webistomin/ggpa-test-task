# Тестовое задание на позицию Frontend-разработчика [![Build status][travis-image]][travis-url] [![dependencies Status](https://david-dm.org/webistomin/ggpa-test-task/status.svg)](https://david-dm.org/webistomin/ggpa-test-task) [![Dependency status][dependency-image]][dependency-url] 

<table>
  <thead>
    <tr>
      <th>Команда</th>
      <th>Результат</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="30%"><code>npm i</code></td>
      <td>Установить зависимости</td>
    </tr>
    <tr>
      <td><code>npm start</code></td>
      <td>Запустить сборку, сервер и слежение за файлами</td>
    </tr>
    <tr>
      <td><code>npm start ЗАДАЧА</code></td>
      <td>Запустить задачу с названием ЗАДАЧА (список задач в <code>gulpfile.js</code>)</td>
    </tr>
  </tbody>
</table>

---

## _Не удаляйте и не обращайте внимание на файлы:_
*	### `.editorconfig`
*	### `.gitignore`
*	### `.travis.yml`
*	### `package.json`
*	### `.csscomb.json`
---

## Проделанная работа
https://webistomin.github.io/ggpa-test-task/

Была выполнена адаптивная верстка главной страницы сайта. Старался верстать как можно ближе к макету. Сайт получился рабочим во всех современных браузерах (Safari нет возможности проверить) и IE11 на различных расширениях, начиная с 320px. Разобрался с SASS и Pug, насколько это возможно за короткий срок. Применял бест практисы которые знаю:
1. Сминифицировал все файлы
2. Там где была возможность использовать Webp графику – использовал. (srcset, @supports)
3. Для ретина дисплеев грузил графику @2x
4. Добавил Critical Css. Остальной css подгружал, после наступления события DomContentLoaded
5. Сделал сайт полностью доступных с клавиатуры
6. Применил подход Graceful Degradation. Сайт доступен с выключенным JavaScript
7. Шрифтам задал font-display: swap, чтобы текст был доступен, пока грузятся кастомные
8. Весь JS прогнал через Babel для трансформаций в ES5

Для слайдера использовал готовую библиотеку с хорошей поддержкой на чистом JS. Можно было написать свой простенький слайдер, но не знал как реализовать поддержку тач на мобильных устройствах. Также подключил скролл к якорным ссылкам. 

## Различные тесты
<img src="https://image.ibb.co/mqTppf/Screenshot-1.png">
<img src="https://image.ibb.co/ck0SS0/Screenshot-2.png">
<img src="https://image.ibb.co/ncJxS0/Screenshot-3.png">
<img src="https://image.ibb.co/cVb7c0/Screenshot-4.png">

[travis-image]: https://travis-ci.org/webistomin/ggpa-test-task.svg?branch=master
[travis-url]: https://travis-ci.org/webistomin/ggpa-test-task
[dependency-image]: https://david-dm.org/webistomin/ggpa-test-task/dev-status.svg
[dependency-url]: https://david-dm.org/webistomin/ggpa-test-task

