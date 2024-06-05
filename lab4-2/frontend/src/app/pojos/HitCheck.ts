export class HitCkeck {
    id: number = 0;
    x: number = 0;
    y: number = 0;
    r: number = 0;
    time: number = 0;
    status: string = "";
    date: string = "";
    user_id: number = 0;
  
    // Дополнительные методы или конструктор, если необходимо
    constructor(data?: Partial<HitCkeck>) {
      // Используйте Partial, чтобы сделать все поля необязательными при создании объекта
      if (data) {
        Object.assign(this, data);
      }
    }
  }
  