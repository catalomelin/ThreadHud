// Base de datos embebida: productos, ventas y usuarios
const db = {
  users: [
    { id: 1, username: 'admin', password: 'admin123', name: 'Administrador' }
  ],
  products: [
    { id: 1, sku: 'TSHIRT-001', name: 'Camiseta Blanca', stock: 50, price: 12000 },
    { id: 2, sku: 'JEANS-001', name: 'Jeans Azul', stock: 30, price: 45000 },
    { id: 3, sku: 'DRESS-001', name: 'Vestido Estampado', stock: 20, price: 65000 }
  ],
  sales: [
    // ejemplo: { id:1, items:[{productId:1, qty:2, price:12000}], total:24000, date:'2025-11-22' }
  ],
  nextIds: {
    product: 4,
    sale: 1
  }
};

export default db;
