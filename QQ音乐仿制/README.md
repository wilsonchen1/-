# 2022.9.20
- 第一次着手作业，整个对于前端知识一无所知，上网再次查阅：

- 刚开始遇到了很大困难
首先是不清楚动态生成的createlement("")参数的含义，实际上是生成什么标签，就写什么标签
然后是设置样式，通过阅读json文件，找到了对应的javascript语法，进行样式设置。
后来经过武海涛老师的细心讲解，发现了className和classlist的dom用法，可以快速设置样式，至此，第一部分完结。
- 另外就是我对于前端网页的整体的框架和思路不熟悉，在向同学多次请教之后，把整体框架设置出来，至此思路已经明确。
- 在获取areaid的方法中，我的方法是，设立一个新的属性，并将它加入到tabs，在生成专辑的时候，将点击的标签的tab_id获取getAttribute()，用这个对应areaid，从而筛选要生成的专辑。
- 在做删除的时候，重新创建一个函数deletemask，我用的是找到点击是那个元素的父节点，直到找到最顶层的section，再将section的子节点album删除即可。
- 注：在切换页面时，tab标签的高亮，低亮，也是用的父亲节点的子节点。用QUERYSELECTOR找到“ul"标签，再把他的子节点全部低亮，再将刚才点击的标签高亮，即达到效果。