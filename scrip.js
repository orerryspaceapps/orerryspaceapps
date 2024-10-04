const planets = [
  { name: 'Mercury', distance: 120, speed: 4.7, size: 20, color: '#888' },
  { name: 'Venus', distance: 160, speed: 3.5, size: 30, color: '#e6e6a1' },
  { name: 'Earth', distance: 210, speed: 3, size: 35, color: '#4ca6ff' },
  { name: 'Mars', distance: 270, speed: 2.4, size: 25, color: '#ff6b3d' },
  { name: 'Jupiter', distance: 370, speed: 1.3, size: 70, color: '#e0ae6f' },
  { name: 'Saturn', distance: 480, speed: 0.9, size: 60, color: '#f4d47a' },
  { name: 'Uranus', distance: 580, speed: 0.7, size: 45, color: '#b3e5fc' },
  { name: 'Neptune', distance: 670, speed: 0.5, size: 40, color: '#82b1ff' }
];

const orrery = document.getElementById('orrery');
const infoPanel = document.getElementById('info-panel');
const planetName = document.getElementById('planet-name');
const planetInfo = document.getElementById('planet-info');
const closeInfo = document.getElementById('close-info');
const playPauseBtn = document.getElementById('play-pause');
const timeSlider = document.getElementById('time-slider');
const timeDisplay = document.getElementById('time-display');

let isPlaying = true;
let timeScale = 1;

// Create the orbits and planets dynamically
planets.forEach((planet) => {
  const orbit = document.createElement('div');
  orbit.className = 'orbit';
  orbit.style.width = `${planet.distance * 2}px`;
  orbit.style.height = `${planet.distance * 2}px`;
  orbit.style.top = `calc(50% - ${planet.distance}px)`;
  orbit.style.left = `calc(50% - ${planet.distance}px)`;
  orrery.appendChild(orbit);

  const planetEl = document.createElement('div');
  planetEl.className = 'planet';
  planetEl.style.width = `${planet.size}px`;
  planetEl.style.height = `${planet.size}px`;
  planetEl.style.backgroundColor = planet.color;
  planetEl.style.top = '50%';
  planetEl.style.left = `calc(50% - ${planet.size / 2}px)`;
  planetEl.dataset.name = planet.name;
  orrery.appendChild(planetEl);

  planetEl.addEventListener('click', showPlanetInfo);
});

// Show planet info on click
function showPlanetInfo(event) {
  const planet = event.target;
  planetName.textContent = planet.dataset.name;
  planetInfo.textContent = `Distance from Sun: ${planets.find(p => p.name === planet.dataset.name).distance} million km`;
  infoPanel.style.display = 'block';
}

// Close info panel
closeInfo.addEventListener('click', () => {
  infoPanel.style.display = 'none';
});

// Update planet positions
function updatePlanetPositions() {
  const time = Date.now() * 0.001 * timeScale;
  planets.forEach((planet, index) => {
      const planetEl = orrery.children[index + 2]; // Skip the Sun and orbits
      const angle = time * planet.speed;
      const x = Math.cos(angle) * planet.distance;
      const y = Math.sin(angle) * planet.distance;
      planetEl.style.transform = `translate(${x}px, ${y}px)`;
  });

  if (isPlaying) {
      requestAnimationFrame(updatePlanetPositions);
  }
}

// Play/pause functionality
playPauseBtn.addEventListener('click', () => {
  isPlaying = !isPlaying;
  playPauseBtn.textContent = isPlaying ? 'Pause' : 'Play';
  if (isPlaying) {
      updatePlanetPositions();
  }
});

// Time scale adjustment
timeSlider.addEventListener('input', () => {
  timeScale = Math.pow(10, (timeSlider.value - 50) / 25);
  timeDisplay.textContent = `${timeScale.toFixed(2)}x`;
});

// Start the animation initially
updatePlanetPositions();
