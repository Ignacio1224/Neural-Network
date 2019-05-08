class Matrix {

    constructor (rows, cols, data = []) {
        this._rows = rows;
        this._cols = cols;
        this._data = data;

        // Initialize data with zeroes if no data
        if (data == null || data.length == 0) {
            this._data = [];
            for (let i = 0; i < this._rows; i++) {
                this._data[i] = [];
                for (let j = 0; j < this._cols; j++) {
                    this._data[i][j] = 0;
                }
            }

        } else {
            // Check integriy of data
            if (data.length != rows || data[0].length != cols) {
                throw new Error ("Incorrect data dimensions!");
            }
        }
    }


    // Add two matrices
    static add (m1, m2) {
        Matrix.checkDimensions (m1, m2);

        let s = new Matrix (m1.rows, m2.cols);

        for (let i = 0; i < m1.rows; i++) {
            for (let j = 0; j < m1.cols; j++) {
                s.data[i][j] = m1.data[i][j] + m2.data[i][j];
            }
        }

        return s;
    }

    // Check the dimensions of both matrices to operate with them
    static checkDimensions (m1, m2) {
        if (m1.rows != m2.rows | m1.cols != m2.cols) {
            throw new Error ("The numbers of rows are diferent!");
        }
    }

    // Multiply two crossed matrices
    static dot (m1, m2) {
        if (m1.cols != m2.rows) {
            throw new Error ("Error! The matrices are not 'dot' compatible");
        }

        let s = new Matrix (m1.rows, m2.cols);

        for (let i = 0; i < s.rows; i++) {
            for (let j = 0; j < s.cols; j++) {
                let sum = 0;
                
                for (let k = 0; k < m1.cols; k++) {
                    sum += m1.data[i][k] * m2.data[k][j];
                }
                
                s.data[i][j] = sum;
            }
        }

        return s;
    }

    // Multiply two matrices
    static multiply (m1, m2) {
        Matrix.checkDimensions (m1, m2);

        let s = new Matrix (m1.rows, m1.cols);

        for (let i = 0; i < s.rows; i++) {
            for (let j = 0; j < s.cols; j++) {
                s.data[i][j] = m1.data[i][j] * m2.data[i][j];
            }
        }

        return s;
    }

    // Set random weights between -1 & 1
    randomWeights () {
        for (let i = 0; i < this._rows; i++) {
            for (let j = 0; j < this._cols; j++) {
                this.data[i][j] = Math.random() * 2 - 1;
            }
        }
    }

    // Subtract two matrices
    static subtract (m1, m2) {
        Matrix.checkDimensions (m1, m2);

        let s = new Matrix (m1.rows, m1.cols);

        for (let i = 0; i < s.rows; i++) {
            for (let j = 0; j < s.cols; j++) {
                s.data[i][j] = m1.data[i][j] - m2.data[i][j];
            }
        }

        return s;
    }

    // Transpose a matrix
    static transpose (m1) {
        let s = new Matrix (m1.cols, m1.rows);

        for (let i = 0; i < s.rows; i++) {
            for (let j = 0; j < s.cols; j++) {
                s.data[i][j] = m1.data[j][i];
            }
        }

        return s;
    }

    /* Getter & Setters */
    get rows () {
        return this._rows;
    }

    get cols () {
        return this._cols;
    }

    get data () {
        return this._data;
    }

}

