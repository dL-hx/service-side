"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const TaskAccess_1 = require("./TaskAccess");
const app = (0, express_1.default)();
const port = 8000;
// 由于各个路由请求中都涉及了Json对象的转换,因此需要引入json中间件
app.use(express_1.default.json());
// 在前端中调用下面的API,涉及跨域访问,需引入cors中间件
app.use((0, cors_1.default)());
app.get("/tasks", (req, res) => {
    res.send(TaskAccess_1.taskAccessor.tasks);
});
app.post("/task", (req, res) => {
    const { name, description } = req.body;
    if (!(name === null || name === void 0 ? void 0 : name.trim()) || !(description === null || description === void 0 ? void 0 : description.trim())) {
        return res.status(400).send('Name or description is null.');
    }
    let newTask = TaskAccess_1.taskAccessor.addTask(req.body);
    res.status(200).send(newTask);
});
app.delete("/task/:id", (req, res) => {
    let deleteSuccess = TaskAccess_1.taskAccessor.deleteTask(Number(req.params.id));
    if (!deleteSuccess) {
        return res.status(400).send('Task does not exist.');
    }
    res.status(200).send(deleteSuccess);
});
app.put("/task/:id", (req, res) => {
    let setSuccess = TaskAccess_1.taskAccessor.setTaskDone(Number(req.params.id));
    if (!setSuccess) {
        return res.status(400).send('Task does not exist.');
    }
    res.status(200).send(setSuccess);
});
app.listen(port, () => {
    console.log("Express is listening at http://localhost:" + port);
});
/**
 * 该文件用于提供后端服务,引用TaskAccess模块来查询或修改Task数据, 并将通过不同路由发布不同的数据操作API.
 *
 * 介绍index.ts文件中各个方法的作用:
 * -app.use(...).   引入中间件.这里引入了两个中间件,分别为json和cors.  json中间件用于处理各个路由请求中,涉及Json对象转换,
 * cors中间件用于支持前端页面以跨域形式调用各个API.
 *
 * - app.get("/tasks")    获取全部的Task数据的API
 *
 *
 * - app.post("/task")   创建Task的API.
 * 如果传入的name属性和description属性为空值, 将返回HTTP状态码400;
 * 如果传入的Task内容正确, 则调用taskAccessor的addTask()方法新增Task,然后返回新增的Task,且HTTP状态码为200
 *
 *
 * - app.delete("/task/:id")   删除Task的API,将调用taskAccessor的deleteTask()方法.
 * 如果删除失败,则返回HTTP状态码400;
 * 如果成功,则返回true,且HTTP状态码为200
 *
 * - app.put("/task/:id")   设置Task任务为已完成的API,将调用taskAccessor的setTaskDone()方法.
 * 如果设置失败,则返回HTTP状态码400;
 * 如果成功,则返回true,且HTTP状态码为200
 */ 
