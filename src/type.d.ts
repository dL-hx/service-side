interface Task {
    // id
    id:number;
    // 名称
    name:string;
    // 描述
    description: string;
    // 是否完成
    isDone:boolean;
}

// 定义了表示Task的接口,供其他Typescript文件引用