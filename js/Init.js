let m1 = new Matrix(2, 2);
let m2 = new Matrix(2, 2, [
    [1, 2],
    [3, 4]
]);


m1.randomWeights();
console.table(m1.data);
m2 = Matrix.add(m1, m2);
console.table(m2.data);