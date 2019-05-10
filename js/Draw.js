// Draw Neural Network



const CANVAS_DIMENSIONS = {
    w: 1024,
    h: 720
}; // Size of canvas.


function drawNeuralNetwork() {

    // Create canvas & add to dom.
    let canvas = create(`<canvas id='canvas' width='${CANVAS_DIMENSIONS.w}' height='${CANVAS_DIMENSIONS.h}'></canvas>`);
    document.body.insertBefore(canvas, document.body.childNodes[0]);

    // Create canvas_pbject.
    let canvas_object = document.getElementById('canvas');

    // Draw a border arround the canvas_object.
    canvas_object.style.border = `1px solid purple`;

    // Get the context of canvas.
    let ctx = canvas_object.getContext('2d');

    let nn_d = new NeuralNetworkD(CANVAS_DIMENSIONS, NEURAL_NETWORK);

    // console.log("------------DIMENSIONS------------\n\n");

    // console.log("Full layer width: " + FULL_DIVISION_PER_LAYER);
    // console.log("\nLayer width: " + LAYERD_DIMENTIONS.w);
    // console.log("\nLayer offset x (one side): " + LAYERD_OFFSET.x);

    // console.log("\nFull neuron width: " + LAYERD_DIMENTIONS.w);
    // console.log("\nNeuron width: " + NEURON_DIMENTIONS.w);
    // console.log("\nNeuron offset x (one side): " + NEUROND_OFFSET.x);
    // console.log("\nNeuron radious: " + NEUROND_RAD);

    // Add neurons to layers    
    for (let i = 0; i < nn_d.numLayersD; i++) {

        let l;
        if (i == 0) {
            l = new LayerD(nn_d.partSize);

        } else {
            const prev_l = nn_d.getLayerD(i - 1);
            const x = prev_l.pos.x + nn_d.partSize.w + prev_l.offset.x;
            const y = prev_l.pos.y;

            l = new LayerD(nn_d.partSize, {
                x,
                y
            });
        }

        for (let j = 0; j < nn_d.u_layers_d[i].length; j++) {
            let n;
            if (j == 0) {
                n = new NeuronD(l.partialSize);

            } else {
                const perv_n = l.getNeuronD(j - 1);
                const x = perv_n.offset.x + perv_n.r;
                const y = perv_n.pos.y + perv_n.r * 2 + perv_n.offset.y;

                n = new NeuronD(l.partialSize, {
                    x,
                    y
                });
            }

            l.addNeuronD(n);
        }

        console.log(l);

        nn_d.addLayerD(l);

    }

    for (const l of nn_d.layers_d) {
        l.draw(ctx);
    }

    // for (const l of nn_d.layers_d) {
    //     for (const n of l.neurons) {
    //         n.draw(ctx);
    //     }
    // }

}

// Creation of dom elements
function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}


class LayerD {

    constructor(full_size, pos, neurons = []) {

        this._full_size = full_size; // Size of of layer.

        this._neurons = neurons;

        this._proportionality = {
            x: 3,
            y: 3
        }; // Divisions of layer.

        this._part_size = {
            w: this._full_size.w / this._proportionality.x,
            h: this._full_size.h / this._proportionality.y
        }; // Size of each part.

        this._offset = {
            x: this._part_size.w / 2,
            y: this._part_size.h / 2
        }; // Offset of layer.

        this._partial_size = {
            w: this._part_size.w * (this._proportionality.x - 1),
            h: this._part_size.h * (this._proportionality.y - 1)
        }; // Size to neuron.


        this._pos = pos ? {
            x: pos.x,
            y: pos.y
        } : {
            x: this._offset.x,
            y: this._offset.y
        }; // Position on cartesian plane.

        this._style = {
            border_color: '#000000',
            line_width: 2
        }; // Style to draw the layer.

    }


    /**
     * addNeuronD
     * @param {NeuronD} neuron_d
     * @description Adds neuron_d to _neurons 
     */
    addNeuronD(neuron_d) {
        this._neurons.push(neuron_d);
    }

    /**
     * draw
     * @param {Context} ctx 
     * @description Draws the LayerD
     */
    draw(ctx) {
        const fw = this._part_size.w;
        const fh = this._part_size.h;
        const line_x_large = Math.floor(fw / 5);
        let x = this._pos.x;
        let y = this._pos.y;

        ctx.moveTo(x, y);
        ctx.lineTo(x + line_x_large, y);

        ctx.moveTo(x, y);
        ctx.lineTo(x, y + fh);

        ctx.moveTo(x, y + fh);
        ctx.lineTo(x + line_x_large, y + fh);

        console.log(x);

        x = x + line_x_large + this._offset.x;

        ctx.moveTo(x, this._pos.y);
        ctx.lineTo(x + line_x_large, this._pos.y);

        ctx.moveTo(x, this._pos.y + fh);
        ctx.lineTo(x + line_x_large, this._pos.y + fh);

        ctx.moveTo(x + line_x_large, this._pos.y);
        ctx.lineTo(x + line_x_large, this._pos.y + fh);

        ctx.stroke();
    }

    /**
     * getNeuronD
     * @param {Number} index
     * @returns {NeuronD}
     * @description Returns the NeuronD of _neurons at given index 
     */
    getNeuronD(index) {
        return this._neurons[index];
    }


    /* Getters & Setters */
    get fullSize() {
        return this._full_size;
    }

    get neurons() {
        return this._neurons;
    }

    get offset() {
        return this._offset;
    }

    get partialSize() {
        return this._part_size;
    }

    get pos() {
        return this._pos;
    }


    set neurons(neurons) {
        this._neurons = neurons;
    }

    set pos(pos) {
        this._pos.x = pos.x;
        this._pos.y = pos.y;
    }

}

class NeuralNetworkD {

    constructor(full_size, used_neural_network) {

        this._layers_d = []; // Phisic layers.

        this._u_layers_d = used_neural_network.layers; // Logic layers.

        this._num_u_layers_d = this._u_layers_d.length; // Number of layers.

        this._full_size = full_size; // Full size of neural network.

        this._proportionality = {
            x: this._num_u_layers_d,
            y: 3
        }; // Divisions of layer.

        this._part_size = {
            w: this._full_size.w / this._proportionality.x,
            h: this._full_size.h / this._proportionality.y
        }; // Size of each layer.

    }


    /**
     * addLayerD
     * @param {LayerD} layer_d
     * @description Adds a layer_d to _layers_d 
     */
    addLayerD(layer_d) {
        this._layers_d.push(layer_d);
    }

    /**
     * getLayerD
     * @param {Number} index
     * @returns {LayerD}
     * @description Returns a LayerD of _layers_d at given index. 
     */
    getLayerD(index) {
        return this._layers_d[index];
    }


    /* Getters & Setters */
    get fullSize() {
        return this._full_size;
    }

    get layers_d() {
        return this._layers_d;
    }

    get u_layers_d() {
        return this._u_layers_d;
    }

    get numLayersD() {
        return this._num_u_layers_d;
    }

    get partSize() {
        return this._part_size;
    }


    set layers_d(layers_d) {
        this._layers_d = layers_d;
    }

}

class NeuronD {

    constructor(full_size, pos = null) {

        this._proportionality = {
            x: 3,
            y: 3
        }; // Divisions of layer.

        this._full_size = full_size // Size of of layer.

        this._part_size = {
            w: this._full_size.w / this._proportionality.x,
            h: this._full_size.h / this._proportionality.y
        }; // Size of each part.

        this._partial_size = {
            w: this._part_size.w * (this._proportionality.x - 1),
            h: this._part_size.h * (this._proportionality.y - 1)
        }; // Size to neuron.

        this._offset = {
            x: this._part_size.w / 2,
            y: this._part_size.h / 2
        }; // Offset of layer.

        this._r = this._partial_size.w / 2; // Radious of neuron.

        this._pos = pos ? {
            x: pos.x,
            y: pos.y
        } : {
            x: this._offset.x + this._r,
            y: this._offset.y
        }; // Position on cartesian plane.

        this._style = {
            border_color: '#FF00FF',
            fill_color: '#FF00FF',
            line_width: 2
        }; // Style to draw the neuron.

    }


    /**
     * draw
     * @param {Context} ctx
     * @description Draws the NeuronD on ctx
     */
    draw(ctx) {
        ctx.lineWidth = this._style.line_width;
        ctx.strokeStyle = this._style.border_color;
        ctx.fillStyle = this._style.fill_color;
        ctx.beginPath();
        ctx.arc(this._pos.x, this._pos.y, this._r, 0, 2 * Math.PI);
        ctx.stroke();
    }


    /* Getters & Setters */
    get fullSize() {
        return this._full_size;
    }

    get partialSize() {
        return this._part_size;
    }

    get offset() {
        return this._offset;
    }

    get pos() {
        return this._pos;
    }

    get r() {
        return this._r
    }


    set pos(pos) {
        this._pos.x = pos.x;
        this._pos.y = pos.y;
    }

}