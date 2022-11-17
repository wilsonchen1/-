var Koa = require("koa");
var Router = require("koa-router");
const session = require("koa-session");
const server = require("koa-static");
const koaBody = require("koa-body");
const path = require("path");
var ChineseName = require("chinese-name");

var app = new Koa();
app.use(server("./public"));
var router = new Router();

var USERS = [];
function createRandomUser(index) {
  //创建数据
  return {
    id: index,
    age: parseInt(19 + Math.random() * 10),
    sex: Math.random() > 0.5 ? "男" : "女",
    name: ChineseName.random(),
    email: "645695312@qq.com",
    headimg: "https://joeschmoe.io/api/v1/random",
    phonenumber: "15905201698",
    grade: "2020级",
    major: "计算机",
  };
}
for (
  let index = 1;
  index <= 20;
  index++ //创建数据
)
  USERS.push(createRandomUser(index));

app.use(
  koaBody({
    // formidable: {
    //   uploadDir: __dirname + "/uploads",
    // },
    multipart: true,
  })
);

app.keys = ["some secret hurr"];
const CONFIG = {
  key: "koa.sess" /** (string) cookie key (default is koa.sess) */,
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true /** (boolean) automatically commit headers (default true) */,
  overwrite: true /** (boolean) can overwrite or not (default true) */,
  httpOnly: true /** (boolean) httpOnly or not (default true) */,
  signed: true /** (boolean) signed or not (default true) */,
  rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
  renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/,
  secure: false /** (boolean) secure cookie*/,
  sameSite:
    null /** (string) session cookie sameSite options (default null, don't set it) */,
};
app.use(session(CONFIG, app));

async function checkUser(ctx) {
  //首次登录接口
  console.log(ctx.request.body);
  const body = ctx.request.body;
  let { user, pwd } = body; //接收数据
  let isCorrect = user === "cyh" && pwd === "123123"; //验证账户号密码

  if (isCorrect) {
    // 写入 koa-session
    ctx.session.user = user;
    console.log(ctx.session.user)
    ctx.body = { code: 0, message: "登录成功" };
  } else {
    ctx.body = { code: -1, message: "用户名或密码错误" };
  }
}
async function checkUserOut(ctx) {
  //退出登录接口
  if (ctx.session.user) {
    console.log(ctx.session.user);
    delete ctx.session.user;
    console.log(ctx.session.user);
    ctx.body = {
      code: 0,
      message: "退出成功",
    };
  } else {
    ctx.body = {
      code: -1,
      message: "退出不成功，请先登录",
    };
  }
}
async function getUserInfo(ctx, next) {
  //获取用户信息接口，如果用户已登录，那么next()，目的是检查登录，方便前端做重定向
  console.log(ctx.session.user);
  if (ctx.session.user) {
    ctx.body = {
      code: 0,
      message: "获取用户信息成功",
      user: ctx.session.user,
    };
    await next();
  } else {
    ctx.body = {
      code: -1,
      message: "获取用户信息失败，未登录",
    };
  }
}
async function getStudents(ctx, next) {
  //获取所有学生信息
  ctx.body = {
    code: 0,
    message: "获取学生信息成功",
    students: USERS,
  };
}
async function searchStudent(ctx) {
  //查询用户的后端接口
  console.log(ctx.request.body);
  const body = ctx.request.body;
  let { searchname } = body;
  let USER = [];
  USER = USERS.find((props) => {
    //把符合条件的用户筛选一下
    return props.name === searchname;
  });
  console.log(USER);
  if (USER) {
    //如果找到了，那么返回给客户端
    ctx.body = {
      code: 0,
      message: "查询学生信息成功",
      student: USER,
    };
  } else {
    ctx.body = {
      code: -1,
      message: "没找到",
    };
  }
}
async function reset(ctx) {
  //重置列表
  ctx.body = {
    code: 0,
    message: "重置成功",
    students: USERS,//直接把数组原封不动返回即可
  };
}
async function addStudent(ctx) {
  //添加学生，并把学生列表返回客户端
  const body = ctx.request.body;
  console.log(body);
  body.id = USERS.length;
  USERS.unshift(body);//把学生放在第一个，这样可以立刻看到添加的结果
  console.log(body);
  ctx.body = {
    code: 0,
    message: "提交成功",
    students: USERS,
  };
}
async function deleteStudent(ctx) {
  //删除学生，并把学生列表返回客户端
  const body = ctx.request.body;
  console.log(body.name);
  let ischange = 0;
  // USERS=USERS.filter((element)=>{element.id!==body.id})
  USERS.forEach((element, index, USERS) => {
    if (element.name == body.name) {
      USERS.splice(index, 1);
      ischange = 1;
    }
  });
  console.log(body);
  if (ischange) {
    ctx.body = {
      code: 0,
      message: "删除成功",
      students: USERS,
    };
  } else {
    ctx.body = {
      code: -1,
      message: "该用户不存在！",
    };
  }
}
router.post("/api/user/login", checkUser); //登录
router.post("/api/user/logout", getUserInfo, checkUserOut); //退出登录
router.get("/api/students", getUserInfo, getStudents);//获取所有学生数据
// router.post("/api/students/create", getUserInfo, createUser);
// router.get("/api/students/:id", getStudentInfo);
router.post("/api/students/add", getUserInfo, addStudent); //添加
router.post("/api/students/delete", getUserInfo, deleteStudent); //删除
router.post("/api/students/search", getUserInfo, searchStudent); //查询
router.get("/api/students/reset", reset); //重置

app.use(router.routes()).use(router.allowedMethods());

app.listen(3001);
console.log(path.resolve(__dirname, "public"));
console.log("is running")