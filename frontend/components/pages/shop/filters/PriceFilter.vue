<template>
  <div class="track-container">
    <label>
      <input class="range-value min" type="number" v-model.lazy="minValue">
    </label>
    <label>
      <input type="number" class="range-value max" v-model.lazy="maxValue">
    </label>
    <div class="track" ref="_vpcTrack"></div>
    <div class="track-highlight" ref="trackHighlight"></div>
    <button class="track-btn track1" ref="track1"></button>
    <button class="track-btn track2" ref="track2"></button>
  </div>
</template>

<script>
    export default {
      name: "PriceFilter",
      props: ['minV','maxV','minValueV','maxValueV'],
      data() {
        return {
          min: 0,
          max: 10,
          minValue: 0,
          maxValue: 10,
          step: 10,
          totalSteps: 0,
          percentPerStep: 1,
          trackWidth: null,
          isDragging: false,
          pos: {
            curTrack: null
          },
          lazyTimeout: '',
          lazy: false,
          lazyTime: 1000
        }
      },
      methods: {
        moveTrack(track, ev){

          let percentInPx = this.getPercentInPx();

          let trackX = Math.round(this.$refs._vpcTrack.getBoundingClientRect().left);
          let clientX = ev.clientX;
          let moveDiff = clientX-trackX;

          let moveInPct = moveDiff / percentInPx
          // console.log(moveInPct)

          if(moveInPct<1 || moveInPct>100) return;
          let value = ( Math.round(moveInPct / this.percentPerStep) * this.step ) + this.min;
          if(track==='track1'){
            if(value >= (this.maxValue - this.step)) return;
            this.minValue = value;
          }

          if(track==='track2'){
            if(value <= (this.minValue + this.step)) return;
            this.maxValue = value;
          }
          this.lazy = false;
          clearTimeout(this.lazyTimeout);
          this.lazyTimeout = setTimeout(()=>{
            this.lazy = true;
          },this.lazyTime);
          this.$refs[track].style.left = moveInPct + '%';
          this.setTrackHightlight();
        },
        mousedown(ev, track){

          if(this.isDragging) return;
          this.isDragging = true;
          this.pos.curTrack = track;
        },

        touchstart(ev, track){
          this.mousedown(ev, track)
        },

        mouseup(ev, track){
          if(!this.isDragging) return;
          this.isDragging = false
        },

        touchend(ev, track){
          this.mouseup(ev, track)
        },

        mousemove(ev, track){
          if(!this.isDragging) return;
          this.moveTrack(track, ev)
        },

        touchmove(ev, track){
          this.mousemove(ev.changedTouches[0], track)
        },

        valueToPercent(value){
          return ((value - this.min) / this.step) * this.percentPerStep
        },

        setTrackHightlight(){
          this.$refs.trackHighlight.style.left = this.valueToPercent(this.minValue) + '%'
          this.$refs.trackHighlight.style.width = (this.valueToPercent(this.maxValue) - this.valueToPercent(this.minValue)) + '%'
        },

        getPercentInPx(){
          let trackWidth = this.$refs._vpcTrack.offsetWidth;
          let oneStepInPx = trackWidth / this.totalSteps;
          // 1 percent in px
          let percentInPx = oneStepInPx / this.percentPerStep;

          return percentInPx;
        },

        setClickMove(ev){
          let track1Left = this.$refs.track1.getBoundingClientRect().left;
          let track2Left = this.$refs.track2.getBoundingClientRect().left;
          // console.log('track1Left', track1Left)
          if(ev.clientX < track1Left){
            this.moveTrack('track1', ev)
          }else if((ev.clientX - track1Left) < (track2Left - ev.clientX) ){
            this.moveTrack('track1', ev)
          }else{
            this.moveTrack('track2', ev)
          }
        }
      },
      beforeMount() {
        this.min = parseInt(this.minV);
        this.max = parseInt(this.maxV);
        this.minValue = parseInt(this.minValueV);
        this.maxValue = parseInt(this.maxValueV);
      },
      mounted() {
        // calc per step value
        this.totalSteps = (this.max - this.min) / this.step;
        // percent the track button to be moved on each step
        this.percentPerStep = 100 / this.totalSteps;
        // console.log('percentPerStep', this.percentPerStep)

        // set track1 initilal
        document.querySelector('.track1').style.left = this.valueToPercent(this.minValue) + '%'
        // track2 initial position
        document.querySelector('.track2').style.left = this.valueToPercent(this.maxValue) + '%'
        // set initila track highlight
        this.setTrackHightlight()

        var self = this;

        ['mouseup', 'mousemove'].forEach( type => {
          document.body.addEventListener(type, (ev) => {
            // ev.preventDefault();
            if(self.isDragging && self.pos.curTrack){
              self[type](ev, self.pos.curTrack)
            }
          })
        });

        ['mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchmove', 'touchend'].forEach( type => {
          document.querySelector('.track1').addEventListener(type, (ev) => {
            ev.stopPropagation();
            self[type](ev, 'track1')
          });

          document.querySelector('.track2').addEventListener(type, (ev) => {
            ev.stopPropagation();
            self[type](ev, 'track2')
          })
        });

        // on track clik
        // determine direction based on click proximity
        // determine percent to move based on track.clientX - click.clientX
        document.querySelector('.track').addEventListener('click', function(ev) {
          ev.stopPropagation();
          self.setClickMove(ev)

        });

        document.querySelector('.track-highlight').addEventListener('click', function(ev) {
          ev.stopPropagation();
          self.setClickMove(ev)

        })
      },
      watch: {
        lazy(){
          if (this.lazy){
            let payload = {
              min: this.minValue,
              max: this.maxValue
            };
            this.$emit('change-values', payload);
          }
        }
      }
    }
</script>

<style scoped>
  .track-container {
    margin-top: 50px;
  }
  .range-value{
    position: absolute;
    top: -2rem;
  }
  .range-value.min{
    left: 0;
  }

  .range-value.max{
    right: 0;
  }
  .track-container{
    width: 100%;
    position: relative;
    cursor: pointer;
    height: 0.5rem;
  }

  .track,
  .track-highlight {
    display: block;
    position: absolute;
    width: 100%;
    height: 0.5rem;
  }

  .track{
    background-color: #ddd;
  }

  .track-highlight{
    background-color: black;
    z-index: 2;
  }

  .track-btn{
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    cursor: pointer;
    display: block;
    position: absolute;
    z-index: 2;
    width: 1.5rem;
    height: 1.5rem;
    top: calc(-50% - 0.25rem);
    margin-left: -1rem;
    border: none;
    background-color: black;
    -ms-touch-action: pan-x;
    touch-action: pan-x;
    transition: box-shadow .3s ease-out,background-color .3s ease,-webkit-transform .3s ease-out;
    transition: transform .3s ease-out,box-shadow .3s ease-out,background-color .3s ease;
    transition: transform .3s ease-out,box-shadow .3s ease-out,background-color .3s ease,-webkit-transform .3s ease-out;
  }
</style>
