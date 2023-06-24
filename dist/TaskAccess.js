"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskAccessor = void 0;
class TaskAccessor {
    constructor() {
        this.tasks = [
            {
                id: 1,
                name: "完成报告",
                description: "完成上个月报告",
                isDone: false,
            },
        ];
        this.taskIdIndex = 1;
    }
    addTask(task) {
        let newTask = {
            id: ++this.taskIdIndex,
            name: task.name,
            description: task.description,
            isDone: false,
        };
        this.tasks.push(newTask);
        return newTask;
    }
    deleteTask(taskId) {
        let index = this.tasks.findIndex((p) => p.id == taskId);
        if (index < 0) { //未找到
            return false;
        }
        // 找到了删除
        this.tasks.splice(index, 1);
        return true;
    }
    setTaskDone(taskId) {
        let index = this.tasks.findIndex((p) => p.id == taskId);
        if (index < 0) { // 未找到
            return false;
        }
        // 找到了,修改isDone为完成
        this.tasks[index].isDone = true;
        return true;
    }
}
exports.taskAccessor = new TaskAccessor();
/**
 * 该文件提供了Task数据访问功能. 声明了TaskAccessor类,在代码最后实例化了该类并将其赋值给变量taskAccessor,然后以模块形式导出
 *
 * 下面分别介绍TaskAccessor类中的成员:
 *
 * - task属性:用于存放Task数组,并将其中初始化一个名称为"完成报告"的Task
 *
 * - taskIdIndex属性:用于存放当前最大的Task id,用于实现新建的Task id的自增
 *
 * - addTask(task: Task): Task  方法:要求传入一个新增的Task对象,传入的Task对象中需要包含number ,description属性.id属性根据taskIdIndex自增,而
 * isDone属性默认为false.新的Task对象将放到tasks数组中,返回值为当前新增的Task对象.
 *
 * - deleteTask(taskId: number): boolean方法:要求传入待删除的Task id, 返回值表示是否成功删除.如果没有找到匹配传入的id的Task,则表示删除失败.
 * 如果找到,则执行删除操作并返回true. 表示删除成功
 *
 * - setTaskDone(taskId:number):boolean方法:要求传入已完成的Task id,返回值表示是否成功将Task 设置为已完成.如果没有找到匹配传入的id的Task,则表示设置失败,
 * 返回false.如果找到则将Task 的isDone属性设置为true并返回true
 *
 */ 
