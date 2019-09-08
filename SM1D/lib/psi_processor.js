// get magnitude of i value of psi function
let get_magnitude = function (c) {
    return c.real * c.real + c.imag * c.imag;
};

// returns an empty wavefunction of length n
function wavefunction(n){
    let psi = [];
    for(let i = 0; i < n; i++){
        psi[i] = {real: 0, imag: 0}
    }
    return psi;
}

// takes the start wavefunction value, and returns the wavefunction a short time later
function timestep(psi)
{
    // this is how many units of time we're going to try to step forward
    let dt = 0.002;
    let n = psi.length;
    let ret = wavefunction(n);
 
    for(let i = 1; i < n-1; i++)
    {
        let x = (i - n/2);
        let V = x*x * 0.0015;
        ret[i].real = psi[i].real;
        ret[i].imag = psi[i].imag;
                        
        // this is the kinetic energy, applied to psi
        let KPsi = {
            real: psi[i].real * 2 - psi[i-1].real - psi[i+1].real,
            imag: psi[i].imag * 2 - psi[i-1].imag - psi[i+1].imag
        };

        // this is the potential, applied to psi
        let VPsi = {
            real: psi[i].real * V,
            imag: psi[i].imag * V
        };

        // right hand side of the schrodinger equation
        let rhsReal = KPsi.real + VPsi.real;
        let rhsImag = KPsi.imag + VPsi.imag;
        // adds it, multiplied by dt, and multiplied by i
        // multiplication by i is what swaps the real and imaginary parts
        ret[i].real += rhsImag * dt;
        ret[i].imag -= rhsReal * dt;
    }
    return ret;
}
    
// returns the initial state of the wavefunction simulation
function state_1d(){
    let n = 128;
    let psi = wavefunction(n);
    for(let i = 0; i < n; i++){
        psi[i].real = Math.exp(-(i-20)*(i-20)/(5*5))*0.75;
        psi[i].imag = 0;
    }
    return psi;
}

module.exports = {
    state_1d: state_1d,
    timestep: timestep,
    get_magnitude: get_magnitude
};
