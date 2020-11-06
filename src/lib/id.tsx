let id = 0

class Id {
  value: number;
  bigId() {
    return 10000 + id
    // 返回大id
  }
  constructor() {
    id += 1
    this.value = id
  }
}

export {Id}