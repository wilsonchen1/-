第二次作业记录

- 下课前老师说一定要打开手机和电脑切换的模式，并没有理解，后来问了老师明白意图，调试时用了各种页面大小
- 本次作业实现了基础要求以及支持宽屏,电脑屏，ipad屏，用的是grid布局
- 封面的生成用的是和第一次作业一样的动态生成
- 菜单界面用的是js生成一个z轴上优先级高的页面，覆盖原本的页面。原本的页面头部用的是Position:fixed并调整top和left
- 菜单的点击直接在html文件里写了一个button,设置了点击事件，在js文件里生成菜单
- 但是菜单的返回用的是img监听点击事件，在生成菜单的函数里嵌套了删除菜单，直接把menu这个元素从body中删除，就回到了原本页面
- 封面内容都是flex布局，创建了一个list，随着页面不同可以自适应
- 字体上，找了很多字体但是都没能还原参考图的字体，只能用默认字体了，加粗等都还原了
- 这次作业把js文件和html文件分开了
