<template>
  <div class="container-fluid margins">
    <div class="row mt-4">
      <canvas id="plot_canvas" width="900" height ="530"></canvas>
    </div>
    <div class="row mt-3">
      <div class="col-sm-8">
        <div id="view_test">
          <DescriptionView/>
        </div>
      </div>
      <br>
      <div class="col-sm-4">
        <div class="row mt-2">
          <input type="button" class="btn btn-primary full-width" value="Plot"  v-on:click="plot_data"/>
        </div>
        <div class="row mt-2">
          <input type="button" class="btn btn-secondary full-width" value="Stop"  v-on:click="stop_plot"/>
        </div>
      </div>
    </div>
    <p class="small bottom">Data provided for free by
    <a href="https://iextrading.com/developer" target="_blank">IEX</a>.
    <br/> By using this application you agree to
    <a href="https://iextrading.com/api-exhibit-a" target="_blank">IEX terms of service</a>.
    </p> 
  </div>
</template>

<script>

import Description from "./description.vue";

//import, export for psi function plot processing
let psi_evaluate = require("../../lib/psi_processor");
let PIXEL_RATIO = window.devicePixelRatio;

module.exports = {
  data: function () { 
    return {
      psi_data: null,
      canvas: null,
      canvas_width: null,
      canvas_height: null,
      evaluate_handle: null
    }
  },
  components: {
    "DescriptionView": Description
  },
  methods:{
      init(){
      this.canvas = document.getElementById('plot_canvas');
      this.canvas_width = this.canvas.width * PIXEL_RATIO;
      this.canvas_height = this.canvas.height * PIXEL_RATIO;
    },
    draw_graph(){
      let ctx = this.canvas.getContext('2d');
      ctx.fillStyle = "#F0F0F0";
      ctx.fillRect(0, 0, this.canvas_width, this.canvas_height);
      ctx.beginPath();
      ctx.moveTo(0, this.canvas_height);
      ctx.fillStyle = "#2c2cae";
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;

      let currentPsi= 0;

      for (let i = 0; i < this.psi_data.length; i++) {
          this.psi_data = psi_evaluate.timestep(this.psi_data);
          currentPsi = psi_evaluate.get_magnitude(this.psi_data[i]);
          ctx.lineTo(i * this.canvas_width / this.psi_data.length, this.canvas_height - currentPsi * this.canvas_height);
      }
      
      ctx.lineTo(this.canvas_width, this.canvas_height);
      ctx.fill();
      ctx.stroke();
    },
    plot_data() {
      this.init();
      this.psi_data = psi_evaluate.state_1d();
      this.evaluate_handle = window.setInterval(this.draw_graph, 50);
    },
    stop_plot(){
      window.clearInterval(this.evaluate_handle);
    }
  }
};
</script>

<style>
.p {
  font-size: 8px;
}
.margins {
  padding: 40px 30px;
}
.full-width {
  width: 100%;
}
.small {
  font-size: 8px;
  color: #c0c0c0;
}
.bottom {
  position: absolute;
  bottom: 5px;
  margin: 0 auto;
}
</style>
