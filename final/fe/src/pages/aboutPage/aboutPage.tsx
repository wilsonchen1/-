import "./aboutPage.css";
function AboutPage() {
  
  return (
    <>
      <div className="title">项目设计：</div>
      <div>1.主要完成了一些基本功能，完成的功能都和服务端结合</div>
      <div>
        2.登录采用了单用户的登录，并保存在session中，用户名：cyh 密码：123123
      </div>
      <div>
        3.做了非登录状态下的拦截功能，越过登录访问其他页面（不包含/About）的时候，首先主要管理页面不显示数据，其次会重定向到登陆界面
      </div>
      <div>
        4.做了精准查询删除，快捷删除，查询，添加，重置，退出登录功能。都做了拦截和失败反馈，以及一些表单的验证。如随意输入并不会提交而会反馈，以及输入为空的反馈，大多数用了message
      </div>
      <div>5.路由使用的browserroute，路由结构在App.tsx</div>
      <div>6.前端项目结构做了简略调整，分为三个部分：</div>
      <div>
        -fe
        <div> --components</div>
        <div> --pages</div>
        <div> --index.tsx</div>
      </div>
      <div>7.表单的提交都做了正则判断，防止非法数据导入服务端</div>
      <div>8.table表格里的操作写了编辑和快捷删除，查看详情页面是准备好了的，但是不是很清楚怎么在colunm里写组件外侧的大组件，就暂时搁置了</div>

      <div className="title">后端设计：</div>
      <div>1.语言为js</div>
      <div>
        2.关于前后端请求，使用的是axios，期间也尝试使用了fetch等，最后选择axios
      </div>
    </>
  );
}

export default AboutPage;
