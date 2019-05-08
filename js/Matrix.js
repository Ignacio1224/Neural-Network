class Matrix {

    constructor (rows, cols, data = []) {
        this._rows = rows;
        this._cols = cols;
        this._data = data;

        // Initialize with zeroes if no data
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



    static checkDimensions (m1, m2) {
        if (m1.rows != m2.rows | m1.cols != m2.cols) {
            throw new Error ("The numbers of rows are diferent!");
        }
    }

    // Set random weights between -1 & 1
    randomWeights () {
        for (let i = 0; i < this._rows; i++) {
            for (let j = 0; j < this._cols; j++) {
                this.data[i][j] = Math.random() * 2 - 1;
            }
        }
    }

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