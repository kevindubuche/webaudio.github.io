import './libs/webaudio-controls.js';

const getBaseURL = () => {
    return new URL('.', import.meta.url);
};


// border: none;
// color: white;
// padding: 20px;
// text-align: center;
// text-decoration: none;
// display: inline-block;
// font-size: 16px;
// margin: 4px 2px;
// cursor: pointer;
// width: 100%;


const template = document.createElement("template");
template.innerHTML = /*html*/`
<style>
*,
*:before,
*:after {
    margin: 0;
    padding: 0;
    font-family: inherit;
    box-sizing: border-box;
}
#main { 
    width: max-content;
    margin: 40px auto;
    font-family: "Segoe UI", sans-serif;
    padding: 25px 28px;
    background: #151414;
    border-radius: 4px;
    border: 1px solid #302d2d;

    background-color: rgba(201, 76, 76, 0.3);
    
    animation: popup 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
@keyframes popup {
    0% {
        transform: scale(0.2);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes wiggle {
    0% { transform: rotate(0deg); }
   80% { transform: rotate(0deg); }
   85% { transform: rotate(5deg); }
   95% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
}

div.wiggle {
  display: inline-block;
  animation: wiggle 2.5s infinite;
  width: 100%;
  display: flex;
}

div.wiggle:hover {
  animation: none;
 
}

button: {
    border-radius:25;
}
button:hover {   
  transform: scale(1.5);
 
}
button:focus {
  transform: scale(1.5);
}

.progress-indicator {
  display: flex;
  justify-content: flex-end;
  position: relative;
  flex: 1;
  font-size: 12px;
  align-items: center;
  height: 20px;
  color: white;
  width: 100%;
}

.progress-bar {
    flex: 1;
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 2;
    transform: translateY(-50%);
    width: 100%;
    appearance: none;
    margin: 0;
    overflow: hidden;
    background: #2245;
    cursor: pointer;
}
.progress-bar::-webkit-slider-thumb {
appearance: none;
height: 20px;
width: 0;
box-shadow: -300px 0 0 300px #ffffff38;
}

.progress-bar::-moz-range-thumb {
appearance: none;
height: 20px;
width: 0;
box-shadow: -300px 0 0 300px #ffffff21;
}

.progress-bar::-ms-thumb {
    appearance: none;
    height: 20px;
    width: 0;
    box-shadow: -300px 0 0 300px #ffffff21;
}
.duration,
.current-time {
  position: relative;
  z-index: 1;
  text-shadow: 0 0 2px #111;
}

.duration {
  margin-left: 2px;
  margin-right: 5px;
}

.duration::before {
  content: '/';
  display: inline-block;
  margin-right: 2px;
}
.buttonMultimedia {
    cursor: pointer;
    border : none;
    padding: 50px;

}

.flex-container {
display: flex;
justify-content: space-between;

}


.play-btn {
    background: url("https://img.icons8.com/ios/30/000000/play--v1.png") no-repeat;            
}

.play-btn.playing {
    background: url("https://img.icons8.com/windows/30/000000/pause--v1.png") no-repeat;
             
}

.loopBtn {
    background: url("https://img.icons8.com/fluency-systems-regular/30/000000/oval-loop.png") no-repeat;            
}

.loopBtn.looping {
    background: url("https://img.icons8.com/ios-glyphs/30/000000/repeat-one.png") no-repeat;
             
}
.visualizer{
    background-color: rgba(100, 0, 20, 0.5);
    border-radius:50px;
}

</style>



<audio id="myPlayer" crossorigin="anonymous">
</audio>
<div id="main">

    
    <div class="wiggle">
    <div style="padding-top:-30px; font-size:40px;">Lecteur Audi</div>
    <div>
    <canvas id="myCanvaso" 
    style="width: 50px; height: 50px; border-radius:25px;
   
    background-color: rgba(10, 0, 0);
     "> </canvas>
    </div>
    </div>   
    <canvas id="myCanvas" class="visualizer" style="width: 100%; height: 200px; "></canvas>
    <span>La sueur</span>
    <div class="progress-indicator">
        <span class="current-time">0:0</span>
        <input type="range" max="1000" value="0" class="progress-bar">
        <span class="duration">0:00</span>
    </div>
    <div class="flex-container">
        <div>
            <button id="remiseAzero"  
                class="buttonMultimedia"  
                style="background: url(https://img.icons8.com/ios/30/000000/recurring-appointment.png) 
                no-repeat;
                background-position: center;">
            </button>
        </div>
        <div>
            <button id="recule10"  
                class="buttonMultimedia"  
                style="background: url(https://img.icons8.com/ios/30/000000/rewind.png) 
                no-repeat;
                background-position: center;">
            </button>
        </div>  
        <div>
            <button class="buttonMultimedia play-btn"
            style=" background-position: center;"
            >
            </button>
        </div>
        <div>
            <button id="avance10"  
                class="buttonMultimedia"  
                style="background: url(https://img.icons8.com/ios/30/000000/fast-forward.png) 
                no-repeat;
                background-position: center;">
            </button>
        </div>
        <div>
            <button id="stop"  
                class="buttonMultimedia"  
                style="background: url(https://img.icons8.com/external-those-icons-lineal-those-icons/30/000000/external-stop-music-audio-those-icons-lineal-those-icons.png) 
                no-repeat;
                background-position: center;">
            </button>
        </div>  
        <div>
            <button id="loop"  
                class="buttonMultimedia loopBtn"  
                style="background-position: center;">
            </button>
        </div>
     
    </div>
    <div  class="flex-container">
        <div style="padding-right:20px">
            <webaudio-knob id="knobVolume" 
                tooltip="Volume: %s" 
                src="./assets/imgs/LittlePhatty.png" 
                sprites="100" value=0.5 min="0" max="1" 
                step=0.01
                diameter="50">
            </webaudio-knob>
        </div>
        <div>
            <webaudio-knob id="knobStereo" 
                tooltip="Balance:%s" 
                src="./assets/imgs/bouton2.png" 
                sprites="127" value=0 min="-1" max="1" 
                step=0.01
                diameter="50">
            </webaudio-knob>
        </div>
        <div style="padding-left:20px">
            <webaudio-knob id="vitesseLecture" 
                src="./assets/imgs/lineshadow.png" 
                sprites="100" value=1 min=0.2 max=4 step=0.1
                diameter="70">
            </webaudio-knob>
        </div>
    </div>
    <marquee>&copy; 2021 Kevin Dubuche</marquee>
</div>
  
  `;

class MyAudioPlayer extends HTMLElement {
    constructor() {
        super();
        // Récupération des attributs HTML
        //this.value = this.getAttribute("value");

        // On crée un shadow DOM
        this.attachShadow({ mode: "open" });

        console.log("URL de base du composant : " + getBaseURL())
    }

    connectedCallback() {
        // Appelée automatiquement par le browser
        // quand il insère le web component dans le DOM
        // de la page du parent..

        // On clone le template HTML/CSS (la gui du wc)
        // et on l'ajoute dans le shadow DOM
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // fix relative URLs
        this.fixRelativeURLs();

        this.player = this.shadowRoot.querySelector("#myPlayer");
        this.player.src = this.getAttribute("src");
        this.player.title = this.getAttribute("title");
        this.player.loop = false;


        this.playPauseBtn = this.shadowRoot.querySelector('.play-btn');
        this.loopBtn = this.shadowRoot.querySelector('.loopBtn');
        // récupérer le canvas
        this.canvas = this.shadowRoot.querySelector("#myCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.canvaso = this.shadowRoot.querySelector("#myCanvaso");
        this.canvasoCtx = this.canvaso.getContext("2d");
      


        this.progressIndicator = this.shadowRoot.querySelector('.progress-indicator');
        this.currentTimeEl = this.progressIndicator.children[0];
        this.progressBar = this.progressIndicator.children[1];
        this.durationEl = this.progressIndicator.children[2];
    
        // Récupération du contexte WebAudio
        this.audioCtx = new AudioContext();

        // on définit les écouteurs etc.
        this.defineListeners();

        // On construit un graphe webaudio pour capturer
        // le son du lecteur et pouvoir le traiter
        // en insérant des "noeuds" webaudio dans le graphe
        this.buildAudioGraph();

        // on démarre l'animation
        // requestAnimationFrame(() => {
        //     this.animationLoop();
        // });
    }

    buildAudioGraph() {
        let audioContext = this.audioCtx;

        let playerNode = audioContext.createMediaElementSource(this.player);

        // Create an analyser node
        this.analyserNode = audioContext.createAnalyser();

        this.pannerNode = audioContext.createStereoPanner();

        // Try changing for lower values: 512, 256, 128, 64...
        this.analyserNode.fftSize = 8192;
        this.bufferLength = this.analyserNode.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);

        // lecteur audio -> analyser -> haut parleurs
        playerNode
            .connect(this.pannerNode)
            .connect(this.analyserNode);
        this.analyserNode.connect(audioContext.destination);
    }


animationLoop() {
    if (this.player.paused){
        return;
    }
    // 1 on efface le canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasoCtx.clearRect(0, 0, this.canvaso.width, this.canvaso.height);

    // 2 on dessine les objets
    //this.ctx.fillRect(10+Math.random()*20, 10, 100, 100);
    // Get the analyser data
    this.analyserNode.getByteFrequencyData(this.dataArray);

    let barWidth = this.canvas.width / this.bufferLength;
    let barHeight;
    let x = 0;

    // values go from 0 to 256 and the canvas heigt is 100. Let's rescale
    // before drawing. This is the scale factor
    let heightScale = this.canvas.height / 128;

 
   

    for (let i = 0; i < this.bufferLength; i++) {
        barHeight = this.dataArray[i];
        // this.ctx.fillStyle = 'hsl(' + 300 * Math.random() + ', 50%, 50%)';
        this.ctx.fillStyle = 'rgb(' + (barHeight + 100) + ',150,160)';
        this.canvasoCtx.fillStyle = 'rgb(147,137,150)';
        // this.ctx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
        barHeight *= heightScale;
        this.ctx.fillRect(x, this.canvas.height - barHeight / 2, barWidth, barHeight / 2);
        this.canvasoCtx.fillRect(x, this.canvaso.height - barHeight / 2, 10, barHeight / 2);
        // this.canvasoCtx.fillRect(10+Math.random()*20, 10, 100, 100);
        // 2 is the number of pixels between bars
        x += barWidth + 1;
    }
    // 3 on deplace les objets

    // 4 On demande au navigateur de recommencer l'animation
    requestAnimationFrame(() => {
        this.animationLoop();
    });
}
fixRelativeURLs() {
    const elems = this.shadowRoot.querySelectorAll("webaudio-knob, webaudio-slider, webaudio-switch, img");
    elems.forEach(e => {
        const path = e.src;
        if (path.startsWith(".")) {
            e.src = getBaseURL() + path;
        }
    });
}
defineListeners() {
    this.playPauseBtn.addEventListener('click', this.togglePlay.bind(this), false);
        
    this.player.addEventListener('play', () => {
        this.animationLoop();
      }, false);

    this.shadowRoot
    .querySelector("#knobStereo")
    .addEventListener("input", (event) => {
      this.setBalance(event.target.value);
    });

    this.shadowRoot
    .querySelector("#knobVolume")
    .addEventListener("input", (event) => {
      this.setVolume(event.target.value);
    });

 

    this.shadowRoot.querySelector("#remiseAzero").addEventListener("click", (event) => {
        this.remiseAzero();
      });
    
    this.shadowRoot.querySelector("#stop").addEventListener("click", (event) => {
        this.player.pause();
        this.remiseAzero();
    });
  
    this.shadowRoot.querySelector("#avance10").onclick = () => {
        this.player.currentTime += 10;
    }
    this.shadowRoot.querySelector("#recule10").onclick = () => {
        this.player.currentTime -= 10;
    }
    this.shadowRoot.querySelector("#loop").onclick = () => {
        this.player.loop = !this.player.loop;
        console.log("loop is "+this.player.loop);
        if(this.player.loop) {
            this.loopBtn.classList.add('looping');
        }else {
            this.loopBtn.classList.remove('looping');
        }
        
    }

    this.shadowRoot.querySelector("#vitesseLecture").oninput = (event) => {
        this.player.playbackRate = parseFloat(event.target.value);
        console.log("vitesse =  " + this.player.playbackRate);
    }

    // this.shadowRoot.querySelector("#progress").onchange = (event) => {
    //     this.player.currentTime = parseFloat(event.target.value);
    // }

    

    // this.player.ontimeupdate = (event) => {
    //     let progressSlider = this.shadowRoot.querySelector("#progress");
    //     progressSlider.max = this.player.duration;
    //     progressSlider.min = 0;
    //     progressSlider.value = this.player.currentTime;
    // }

    this.player.addEventListener('timeupdate', (event) => {
        console.log(this.player.currentTime)
   
  
        this.progressBar.addEventListener('input', (e) => this.seekTo(this.progressBar.value), false);
  
        this.player.addEventListener('timeupdate', () => {
          this.updateAudioTime(this.player.currentTime);
        })
  
  
        this.player.addEventListener('loadedmetadata', () => {
          this.progressBar.max = this.player.duration;
          this.durationEl.textContent = this.getTimeString(this.player.duration);
          this.updateAudioTime();
        })
  
      })

      this.player.addEventListener('play', () => {
        this.playing = true;
        this.playPauseBtn.classList.add('playing');
      }, false);

      this.player.addEventListener('pause', () => {
        this.playing = false;
        this.playPauseBtn.classList.remove('playing');
      }, false);
}

    // L'API du Web Component
    async togglePlay() {
        if (this.audioCtx.state === 'suspended') {
          await this.audioCtx.resume();
          console.log("just resumed......")
        }
        
        if (this.playing) {
            console.log("just paused......")
          return this.player.pause();
        }
        console.log("just playing......")
        return this.player.play();
    }

    seekTo(value) {
        this.player.currentTime = value;
    }

    updateAudioTime() {
        this.progressBar.value = this.player.currentTime;
        this.currentTimeEl.textContent = this.getTimeString(this.player.currentTime);
    }
    getTimeString(time) {
        const secs = `${parseInt(`${time % 60}`, 10)}`.padStart(2, '0');
        const min = parseInt(`${(time / 60) % 60}`, 10);
    
        return `${min}:${secs}`;
    }

    setVolume(val) {
        this.player.volume = val;
    }

    remiseAzero() {
    this.player.currentTime = 0;
    }

    setBalance(val) {
        this.pannerNode.pan.value = val;
    }

   

}

customElements.define("my-player", MyAudioPlayer);
