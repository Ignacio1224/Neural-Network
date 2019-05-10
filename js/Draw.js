// Draw Neural Network


// Get the used Neural Network.
const NN = NEURAL_NETWORK;

const CANVAS_HEIGHT = 720; // Height of canvas in pixels.
const CANVAS_WIDTH = 1024; // Width of canvas in pixels.

const FULL_DIVISION_PER_LAYER = CANVAS_WIDTH / NN.num_layers; // Size of LayerD (included edges).

const K_P_LD = FULL_DIVISION_PER_LAYER / 3; // Constant of proportionality in LayerD.
let LAYERD_DIMENTIONS = {
    w: K_P_LD * 2, // Width
    y: 0
};
const LAYERD_DRAW = {
    border_color: '#000000', // Color of borders' shape.
    line_width: 2 // Line width in pixels.
};
let LAYERD_OFFSET = {
    x: K_P_LD / 2,
    y: 0
}; // Distance in pixels between LayersD edge and LyersD.pos in x direction.
const LAYERD_POS_INIT = {
    x: 0,
    y: 0
}; // Cartitian coordinates of layer in pixels.

const K_P_ND = LAYERD_DIMENTIONS.w / 3; // Constant of proportionality in LayerD.
const NEUROND_DRAWS = {
    border_color: '#FF00FF', // Color of borders' shape.
    fill_color: '#FF00FF', // Color of shape.
    line_width: 2 // Line width in pixels.
};
let NEURON_DIMENTIONS = {
    w: K_P_ND * 2,
    h: 0
};
const NEUROND_OFFSET = {
    x: K_P_ND / 2,
    y: 20
}; // Distance in pixels between NeuronsD edge and NeuronD.pos in x direction.
const NEUROND_POS_INIT = {
    x: 0,
    y: 0
}; // Cartitian coordinates of neuron in pixels.

const NEUROND_RAD = NEURON_DIMENTIONS.w / 2; // Radious of neuron in pixels.

function drawNeuralNetwork() {

    // Create canvas & add to dom.
    let canvas = create(`<canvas id='canvas' height='${CANVAS_HEIGHT}' width='${CANVAS_WIDTH}'></canvas>`);
    document.body.insertBefore(canvas, document.body.childNodes[0]);

    // Create canvas_pbject.
    let canvas_object = document.getElementById('canvas');

    // Draw a border arround the canvas_object.
    canvas_object.style.border = `1px solid purple`;

    // Get the context of canvas.
    let ctx = canvas_object.getContext('2d');

    let nn_d = new NeuralNetworkD([]);

    console.log("------------DIMENSIONS------------");
    
    console.log("Full layer width: " + FULL_DIVISION_PER_LAYER);
    console.log("Layer width: " + LAYERD_DIMENTIONS.w);
    console.log("Layer offset x (one side): " + LAYERD_OFFSET.x);

    console.log("Full neuron width: " + LAYERD_DIMENTIONS.w);
    console.log("Neuron width: " + NEURON_DIMENTIONS.w);
    console.log("Neuron offset x (one side): " + NEUROND_OFFSET.x);
    console.log("Neuron radious: " + NEUROND_RAD);
    
    // Add neurons to layers
    for (let i = 0; i < NN.num_layers; i++) {

        let l;
        if (i > 0) {
            const prev_l = nn_d.getLayerD(i - 1);
            const x = prev_l.pos.x + LAYERD_DIMENTIONS.w + LAYERD_OFFSET.x;
            const y = prev_l.pos.y;

            l = new LayerD({
                x,
                y
            }, []);
        } else {
            l = new LayerD({
                    x: LAYERD_POS_INIT.x + LAYERD_OFFSET.x * 2,
                    y: LAYERD_POS_INIT.y + LAYERD_OFFSET.y,
                },
                []);
        }
        console.log(l);

        for (let j = 0; j < NN.layers[i].length; j++) {
            let n;
            if (j > 0) {
                const perv_n = l.getNeuronD(j - 1);
                const x = l.pos.x + NEUROND_OFFSET.x + NEUROND_RAD;
                const y = perv_n.pos.y + NEUROND_RAD * 2 + NEUROND_OFFSET.y;

                n = new NeuronD({
                    x,
                    y
                }, NEUROND_RAD);
            } else {
                n = new NeuronD({
                    x: l.pos.x + NEUROND_OFFSET.x + NEUROND_RAD,
                    y: 0
                }, NEUROND_RAD);
            }

            l.addNeuronD(n);
        }

        nn_d.addLayerD(l);

    }

    // for (const l of nn_d.layers_d) {
    //     l.draw(ctx);
    // }

    // ctx.moveTo(0, 0);

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
    constructor(pos, neurons) {
        this._pos = pos;
        this._neurons = neurons;
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
        const fw = this.fullWidth();
        const fh = this.fullHeight();
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

        x = x + line_x_large + LAYERD_OFFSET.x;

        // ctx.moveTo(x + line_x_large + LAYERD_OFFSET.x, y);
        // ctx.lineTo(x + line_x_large + LAYERD_OFFSET.x + line_x_large, y);


        // ctx.moveTo(this._pos.x + line_x_large + LAYERD_OFFSET.x, this._pos.y + this.fullHeight());
        // ctx.lineTo(this._pos.x + line_x_large + LAYERD_OFFSET.x + line_x_large, this._pos.y + this.fullHeight());

        // ctx.moveTo(this._pos.x + line_x_large + LAYERD_OFFSET.x + line_x_large, this._pos.y);
        // ctx.lineTo(this._pos.x + line_x_large + LAYERD_OFFSET.x + line_x_large, this._pos.y + this.fullHeight());

        ctx.stroke();
    }

    /**
     * fullHeight
     * @returns {Number}
     * @description Returns the sum of al radious of neurons plus 12 pixels;
     */
    fullHeight() {
        let h = 0;
        for (const n of this._neurons) {
            h += n.r * 2;
        }
        h += NEUROND_OFFSET.y;
        h += 12;
        return h;
    }

    /**
     * fullWidth
     * @returns {Number}
     * @description Returns the sum of al radious of neurons plus 12 pixels;
     */
    fullWidth() {
        let w = 0;
        for (const n of this._neurons) {
            w += n.r * 2;
        }
        return w + LAYERD_OFFSET.y * 2;
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
    get pos() {
        return this._pos;
    }

    get neurons() {
        return this._neurons;
    }

    set pos(pos) {
        this._pos.x = pos.x;
        this._pos.y = pos.y;
    }

    set neurons(neurons) {
        this._neurons = neurons;
    }

}

class NeuralNetworkD {
    constructor(layers_d) {
        this._layers_d = layers_d;
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
    get layers_d() {
        return this._layers_d;
    }

    set layers_d(layers_d) {
        this._layers_d = layers_d;
    }
}

class NeuronD {
    constructor(pos, r) {
        this._pos = pos;
        this._r = r;
    }


    /**
     * draw
     * @param {Context} ctx
     * @description Draws the NeuronD on ctx
     */
    draw(ctx) {
        ctx.lineWidth = NEUROND_DRAWS.line_width;
        ctx.strokeStyle = NEUROND_DRAWS.border_color;
        ctx.fillStyle = NEUROND_DRAWS.fill_color;
        ctx.beginPath();
        ctx.arc(this._pos.x, this._pos.y, this._r, 0, 2 * Math.PI);
        ctx.stroke();
    }


    /* Getters & Setters */
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

    set r(r) {
        this._r = r;
    }
}