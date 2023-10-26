class TreeStore {
    items;
    
    constructor(items) {
      this.items = {};
      items.forEach((item) => {
        const { id, parent, ...rest } = item;
        this.items[id] = { id, parent, ...rest };
      });
    }
    
    getAll() {
      return Object.values(this.items);
    }
    
    getItem(id) {
      return this.items[id];
    }
    
    getChildren(id) {
      return Object.values(this.items).filter((item) => item.parent === id);
    }
    
    getAllChildren(id) {
      let children = [];
      const stack = [this.items[id]];
      
      while (stack.length > 0) {
        const item = stack.pop();
        children.push(item);
        
        const itemChildren = Object.values(this.items).filter((child) => child.parent === item.id);
        
        stack.push(...itemChildren);
      }
      
      return children;
    }
    
    getAllParents(id) {
      const parents = [];
      let currentId = id;
      
      while (this.items[currentId]) {
        const currentItem = this.items[currentId];
        parents.unshift(currentItem);
        currentId = currentItem.parent;
      }
      
      return parents;
    }
  }
  
  // Example of usage:
  const items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },
    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 4, type: 'test' },
  ];
  
  const store = new TreeStore(items);
  
  console.log(store.getAll()); // [{ id: 1, parent: 'root' }, { id: 2, parent: 1, type: 'test' }, ...]
  console.log(store.getItem(3)); // { id: 3, parent: 1, type: 'test' }
  console.log(store.getChildren(2)); // [{ id: 4, parent: 2, type: 'test' }, { id: 5, parent: 2, type: 'test' }]
  console.log(store.getAllChildren(2)); // [{ id: 4, parent: 2, type: 'test' }, { id: 5, parent: 2, type: 'test' }, ...]
  console.log(store.getAllParents(4)); // [{ id: 1, parent: 'root' }, { id: 2, parent: 1, type: 'test' }]