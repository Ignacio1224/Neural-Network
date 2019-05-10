class NeuralNetwork {

    /**
     * NeuralNetwork constructor
     * @param {Number} num_inputs 
     * @param {Number} num_layers
     * @param {Number} neurons_per_layer 
     * @param {Numbers} outputs 
     */
    constructor(num_inputs, num_layers, num_neurons_per_layer, num_outputs) {
        this._num_inputs = num_inputs;
        this._num_neurons_per_layer = num_neurons_per_layer;
        this._num_layers = num_layers;
        this._num_outputs = num_outputs;

        this._inputs = new Matrix(this._num_inputs, this._num_neurons_per_layer);
        this._layers = new Array(this._num_layers);
        this._outputs = new Matrix(this._num_neurons_per_layer, this._num_outputs);
        
        // Initializing the neurons of inputs with random weights
        this._inputs.randomWeights();
        
        // Creation the layers
        for (let i = 0; i < this._num_layers; i++) {
            this._layers[i] = new Array(this._num_neurons_per_layer);
        }

        // Adding the inputs matrices
        this._layers.unshift(new Array(this._num_inputs));
        for (let j = 0; j < this._num_inputs; j++) {
            this._layers[0][j] = this._inputs;
        }

        // Adding matrices in every layer
        for (let i = 1; i < this._layers.length; i++) {
            for (let j = 0; j < this._num_neurons_per_layer; j++) {
                this._layers[i][j] = new Matrix(this._layers[i - 1].length, this._num_neurons_per_layer);
            }
        }

        // Adding output layer
        this._layers.push(new Array(this._num_outputs));
        // Length of _layers in 0 base
        let layer_length = this._layers.length - 1;
        // Adding matrices to output layer
        for (let j = 0; j < this._num_outputs; j++) {
            this._layers[layer_length][j] = this._outputs;
        }

    }



    /**
     * sigmoid
     * @param {Number} x 
     * @param {Boolean} deriv
     * @returns {Number}
     * @description Applies the sigmoid or it's deriviate function to x 
     */
    sigmoid(x, deriv) {
        if (deriv) {
            throw new Error("Not implemented exception");
        }

        throw new Error("Not implemented exception");
    }


    /* Getters & Setters */
    get num_inputs() {
        return this._num_inputs;
    }

    get inputs() {
        return this._inputs;
    }

    get num_layers () {
        return this.layers.length;
    }

    get layers() {
        return this._layers;
    }

    get num_neurons_per_layer () {
        return this._num_neurons_per_layer;
    }

    get neurons_per_layer() {
        return this._neurons_per_layer;
    }

    get num_outputs () {
        return this._num_outputs;
    }

    get outputs() {
        return this._outputs;
    }

}
