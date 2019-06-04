<template>
  <div class="container-fluid margins">
    <div class="row mt-3">
      <input type="button" class="btn btn-primary full-width" value="Plot"  v-on:click="plot_data"/>
    </div>
    <div class="row mt-4">
      <canvas id="plot_canvas" width="900" height ="400"> </canvas>
    </div>
    <div class="row">
    <div id="view_test">
      <DescriptionView/>
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
//import, export for mathajax using
import Description from "./description.vue";

export default {
  name: "view_test",
  components: {
    "DescriptionView": Description
  }
};

//import, export for psi function plot processing
let psi_evaluate = require("../../lib/psi_processor");
let PIXEL_RATIO = window.devicePixelRatio;

module.exports = {
  data: function () { 
    return {
      psi_data: null,
      canvas: null,
      canvas_width: null,
      canvas_height: null
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
      var ctx = this.canvas.getContext('2d');
      ctx.fillStyle = "#F0F0F0";
      ctx.fillRect(0, 0, this.canvas_width, this.canvas_height);
      ctx.beginPath();
      ctx.moveTo(0, this.canvas_height);
      ctx.fillStyle = "#2c2cae";
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      for (var i = 0; i < this.psi_data.length; i++) {
          this.psi_data = psi_evaluate.timestep(this.psi_data);
          var val = psi_evaluate.get_magnitude(this.psi_data[i]);
          ctx.lineTo(i * this.canvas_width / this.psi_data.length, this.canvas_height - val * this.canvas_height);
      }
      
      ctx.lineTo(this.canvas_width, this.canvas_height);
      ctx.fill();
      ctx.stroke();
    },
    plot_data() {
      this.init();
      this.psi_data = psi_evaluate.state_1d();
      this.timeoutHandle = window.setInterval(this.draw_graph, 20);
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
