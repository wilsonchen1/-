export interface ITodo {
    id: string
    ctime: string
    mtime: string
    // 内容
    content: string
    // 是否已完成
    finished: boolean
  
  }
  
  export class Todo implements ITodo {
    id: string
    ctime: string
    mtime: string
    content: string
    finished: boolean
  
    // // 重写JSON序列化
    // toJSON() {
    //   return {
    //     content: this.content,
    //     finished: this.finished,
    //     id: this.id,
    //     ctime: this.ctime,
    //     mtime: this.mtime
    //   }
    // }
  
    constructor(obj: ITodo) {
      this.id = obj.id
      this.ctime = obj.ctime
      this.mtime = obj.mtime
      this.content = obj.content
      this.finished = obj.finished
    }
  }