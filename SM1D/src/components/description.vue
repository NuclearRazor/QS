<template>
  <div class="description">
    Solve Schrodinger equation for electron (1D projection) in a harmoic potential, overall equation is:
    <vue-mathjax :formula="formula_first"></vue-mathjax>
    <p>
      There some disadvantages in this simulation:<br/>
      - total amount of energy increases with time<br/>
      - there no approximation by fft<br/>
    </p>
    <p>*Schrodinger Modelling 1D</p>
  </div>
</template>

<script>
import { VueMathjax } from 'vue-mathjax'

export default {
  components: {
    'vue-mathjax': VueMathjax
  },
  name: 'DescriptionView',
  data () {
    return {
      formula_first: '$${i {\\frac{\\partial\\psi}{\\partial t}} = -{\\frac{\\partial^2}{\\partial^2 t}}\\psi + ax^2\\psi }.$$'
    }
  }
}
</script>

<style scoped>

.description {
    text-align: center;
    position: absolute;
    width: 100%;
    left: 0px;
}

</style>
