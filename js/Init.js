
let m1 = new Matrix(2, 3, [
    [1, 2, 3],
    [4, 5, 6]
]);
let m2 = new Matrix(3, 2, [
    [7, 8],
    [9, 10],
    [11, 12]
]);


console.table(m1.data);
console.table(m2.data);
m2 = Matrix.dot(m1, m2);
console.table(m2.data);

