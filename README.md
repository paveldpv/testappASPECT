```md
npm i 
npm run dev
```

##### Реализованный класc validatorFiled 
метод isValidValue() возвращает ошибку если:
- невозможно преобразовать входящие данные в json 
-  отсутствует  обязательное свойство у входящих данных например: 
	- ``{type: 'button', props: {caption: 'test', width:50,height:50}}, => {error:true,message:` visible отсутствует свойства button.props`,}``
	- ``{type: 'button'}, => {error:true,message:` `в типе button отсутствует свойства props`,}``
	- ``{type: 'button', => {error:true,message:` message: 'не верная запись',}``



- возвращает сл даннные(нет ошибки):
	- если path пустой - возвращает валидный объект данных
	- если path есть и последним из свойств пути является один из параметров props - строку
	- если path есть и последним из свойств пути НЕ является один из параметров props - валидный обьект


##### класс не валидирует сами данные если в компонент button label или panel *(visible:1234)* придут не валидные данные - они будут подменены на данные по умолчанию - можно реализовать и это если необходимо

##### test data (valid data)


| value                                                                                                                                                                     | path                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| ``[{type: 'button', props: {caption: 'test', width:50,height:50,visible: true}},{type: 'button', props: {caption: 'test', width:50,height:50,visible: true}}]``           | -                            |
| ``{content:[{type: 'button', props: {caption: 'test', width:50,height:50,visible: true}}]}``                                                                              | -                            |
| ``{type: 'label', props: {caption: 'test',visible: true}}``                                                                                                               | -                            |
| ``{type: 'panel', props: {height:50,width:53,visible:true}}``                                                                                                             | -                            |
| ``false``                                                                                                                                                                 | ``content[0].props.visible`` |
| ``testing``                                                                                                                                                               | ``content[0].props.caption`` |
| ``"false"``                                                                                                                                                               | ``content[0].props.visible`` |
| ``{content:[{type: 'button', props: {caption: 'test', width:50,height:50,visible: true}},{type: 'button', props: {caption: 'test', width:50,height:50,visible: true}}]}`` | ``content[0]``               |

