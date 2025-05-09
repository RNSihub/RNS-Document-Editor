import React, { useState, useRef, useEffect } from 'react';
import { Upload, Pause, Play, Music, Layers, RefreshCcw, ChevronLeft, Heart, X, Folder } from 'lucide-react';

const MusicVisualizer = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [audioURL, setAudioURL] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [analyzer, setAnalyzer] = useState(null);
  const [frequencies, setFrequencies] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [dominantColor, setDominantColor] = useState('#ff6b00');
  const [secondaryColor, setSecondaryColor] = useState('#4a00e0');
  const [beatDetected, setBeatDetected] = useState(false);
  const [selectedAnimation, setSelectedAnimation] = useState('bars');
  const [showTemplatePopup, setShowTemplatePopup] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const sourceRef = useRef(null);
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);
  const timelineRef = useRef(null);

  // Animation presets
  const animationTypes = [
    { id: 'bars', name: 'Circular Bars', description: 'Classic circular equalizer bars' },
    { id: 'waves', name: 'Wave Ripples', description: 'Flowing wave patterns that pulse with the beat' },
    { id: 'particles', name: 'Particle Storm', description: 'Dynamic particle system that reacts to music' },
    { id: 'spectrum', name: 'Spectrum Flow', description: 'Fluid spectrum analyzer with color transitions' },
    { id: 'starfield', name: 'Starfield', description: 'Dynamic star field that reacts to the music beat' },
  ];

  useEffect(() => {
    return () => {
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (sourceRef.current) {
        sourceRef.current.disconnect();
      }
    };
  }, [audioURL]);

  // Set up audio context and analyzer when file is loaded
  useEffect(() => {
    if (selectedFile && audioRef.current) {
      // Only create a new AudioContext if one doesn't exist
      const context = audioContext || new (window.AudioContext || window.webkitAudioContext)();
      const analyzerNode = context.createAnalyser();
      analyzerNode.fftSize = 2048;

      // Disconnect previous source if it exists
      if (sourceRef.current) {
        sourceRef.current.disconnect();
      }

      const source = context.createMediaElementSource(audioRef.current);
      source.connect(analyzerNode);
      analyzerNode.connect(context.destination);

      const frequencyData = new Uint8Array(analyzerNode.frequencyBinCount);

      setAudioContext(context);
      setAnalyzer(analyzerNode);
      setFrequencies(frequencyData);
      sourceRef.current = source;

      // Auto-play when file is loaded
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            toggleFullScreen();
          })
          .catch(err => {
            console.error("Autoplay failed:", err);
            // Handle autoplay failure - show play button prominently
            setIsPlaying(false);
          });
      }
    }
  }, [selectedFile, audioContext]);

  // Handle color changes safely
  const generateSafeColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 50%)`;
  };

  const updateColors = () => {
    const newDominantColor = generateSafeColor();
    const hue2 = (parseInt(newDominantColor.match(/\d+/)[0]) + 180) % 360;
    const newSecondaryColor = `hsl(${hue2}, 100%, 50%)`;

    setDominantColor(newDominantColor);
    setSecondaryColor(newSecondaryColor);
  };

  // Draw circular bars animation
  const drawCircularBars = (ctx, canvas, frequencies, centerX, centerY) => {
    const maxRadius = Math.min(canvas.width, canvas.height) * 0.4;

    // Draw frequency bars in a circle
    const barCount = 180;
    const barWidth = Math.PI * 2 / barCount;

    for (let i = 0; i < barCount; i++) {
      const freqIndex = Math.floor(i * frequencies.length / barCount);
      const value = frequencies[freqIndex] / 255;

      const barHeight = maxRadius * value * 0.8;
      const angle = i * barWidth;

      const gradient = ctx.createLinearGradient(
        centerX, centerY,
        centerX + Math.cos(angle) * (maxRadius + barHeight),
        centerY + Math.sin(angle) * (maxRadius + barHeight)
      );

      gradient.addColorStop(0, dominantColor);
      gradient.addColorStop(1, secondaryColor);

      ctx.beginPath();
      ctx.lineWidth = 4 + value * 10;
      ctx.strokeStyle = gradient;
      ctx.moveTo(
        centerX + Math.cos(angle) * maxRadius,
        centerY + Math.sin(angle) * maxRadius
      );
      ctx.lineTo(
        centerX + Math.cos(angle) * (maxRadius + barHeight),
        centerY + Math.sin(angle) * (maxRadius + barHeight)
      );
      ctx.stroke();
    }

    // Add pulsing center circle
    const innerRadius = 50 + (beatDetected ? 30 : 0) + (Math.sin(Date.now() / 500) * 20);
    const innerGradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, innerRadius * 2
    );
    innerGradient.addColorStop(0, `${secondaryColor}`);
    innerGradient.addColorStop(0.6, `${dominantColor}`);
    innerGradient.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.fillStyle = innerGradient;
    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
    ctx.fill();
  };

  // Draw wave ripples animation
  const drawWaveRipples = (ctx, canvas, frequencies) => {
    const waveCount = 5;
    ctx.globalAlpha = 0.7;

    for (let w = 0; w < waveCount; w++) {
      ctx.beginPath();
      ctx.lineWidth = 3 + (beatDetected ? 2 : 0);
      ctx.strokeStyle = w % 2 === 0 ? dominantColor : secondaryColor;

      const waveAmplitude = canvas.height * 0.15 * (1 - w / waveCount) * (beatDetected ? 1.3 : 1);
      const waveFrequency = 15 * (w + 1);
      const timeOffset = Date.now() / 1000 * (w + 1);

      ctx.moveTo(0, canvas.height / 2);
      for (let x = 0; x < canvas.width; x += 3) {
        const freqIndex = Math.floor(x / canvas.width * frequencies.length / 2);
        const freqValue = frequencies[freqIndex] / 255;

        const y = canvas.height / 2 +
                Math.sin(x / waveFrequency + timeOffset) * waveAmplitude *
                (1 + freqValue * 0.5);
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Central pulse
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const bassValue = frequencies.slice(0, 10).reduce((a, b) => a + b, 0) / 2550;
    const pulseSize = 100 + bassValue * 150;

    const pulseGradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, pulseSize
    );

    pulseGradient.addColorStop(0, `${dominantColor}`);
    pulseGradient.addColorStop(0.6, `${secondaryColor}`);
    pulseGradient.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.fillStyle = pulseGradient;
    ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 1;
  };

  // Draw particle storm animation
  const drawParticleStorm = (ctx, canvas, frequencies) => {
    // Create particle field
    const particleCount = 100;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Get overall energy for particle speed
    const avgEnergy = frequencies.reduce((sum, val) => sum + val, 0) / frequencies.length / 255;

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const freqIndex = Math.floor(i / particleCount * frequencies.length / 2);
      const freqValue = frequencies[freqIndex] / 255;

      const distance = 50 + freqValue * 200 + Math.sin(Date.now() / 1000 + i) * 50;
      const size = 2 + freqValue * 8;

      const x = centerX + Math.cos(angle + Date.now() / 2000) * distance;
      const y = centerY + Math.sin(angle + Date.now() / 1800) * distance;

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
      gradient.addColorStop(0, i % 2 === 0 ? dominantColor : secondaryColor);
      gradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();

      // Add particle trails
      if (freqValue > 0.5) {
        const trailLength = freqValue * 20;
        ctx.beginPath();
        ctx.strokeStyle = i % 2 === 0 ? dominantColor : secondaryColor;
        ctx.lineWidth = size / 3;
        ctx.globalAlpha = 0.3;
        ctx.moveTo(x, y);
        ctx.lineTo(
          x - Math.cos(angle + Date.now() / 2000) * trailLength * avgEnergy,
          y - Math.sin(angle + Date.now() / 1800) * trailLength * avgEnergy
        );
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    // Central vortex
    if (beatDetected) {
      const vortexGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, 100
      );
      vortexGradient.addColorStop(0, `${secondaryColor}`);
      vortexGradient.addColorStop(0.7, 'transparent');

      ctx.beginPath();
      ctx.fillStyle = vortexGradient;
      ctx.arc(centerX, centerY, 100, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // Draw spectrum flow animation
  const drawSpectrumFlow = (ctx, canvas, frequencies) => {
    const barCount = Math.min(frequencies.length / 4, canvas.width / 10);
    const spectrumBarWidth = canvas.width / barCount;
    const barSpacing = 2;

    // Draw flowing spectrum at bottom
    for (let i = 0; i < barCount; i++) {
      const freqIndex = Math.floor(i / barCount * frequencies.length / 2);
      const value = frequencies[freqIndex] / 255;
      const barHeight = value * canvas.height * 0.6;

      const x = i * spectrumBarWidth;
      const y = canvas.height - barHeight;

      const gradient = ctx.createLinearGradient(x, canvas.height, x, y);
      gradient.addColorStop(0, dominantColor);
      gradient.addColorStop(0.5, secondaryColor);
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.fillRect(x + barSpacing/2, y, spectrumBarWidth - barSpacing, barHeight);

      // Add mirror reflection
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = gradient;
      ctx.fillRect(x + barSpacing/2, 0, spectrumBarWidth - barSpacing, barHeight / 2);
      ctx.globalAlpha = 1;
    }

    // Add flowing waves
    const waveCount = 3;
    for (let w = 0; w < waveCount; w++) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = w % 2 === 0 ? `${dominantColor}66` : `${secondaryColor}66`;

      const centerY = canvas.height / 2;
      const waveHeight = canvas.height * 0.1;

      ctx.moveTo(0, centerY);
      for (let x = 0; x < canvas.width; x += 5) {
        const progress = x / canvas.width;
        const freqIndex = Math.floor(progress * frequencies.length / 2);
        const freqValue = frequencies[freqIndex] / 255;

        const y = centerY +
                Math.sin(x / 100 + Date.now() / (1000 + w * 500)) * waveHeight * (1 + freqValue);

        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Add beat-responsive central element
    if (beatDetected) {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const size = 80;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(Date.now() / 1000);

      ctx.beginPath();
      for (let a = 0; a < 6; a++) {
        const angle = (a / 6) * Math.PI * 2;
        const x1 = Math.cos(angle) * size;
        const y1 = Math.sin(angle) * size;
        ctx.moveTo(0, 0);
        ctx.lineTo(x1, y1);
      }

      const strokeGradient = ctx.createLinearGradient(-size, -size, size, size);
      strokeGradient.addColorStop(0, dominantColor);
      strokeGradient.addColorStop(1, secondaryColor);

      ctx.strokeStyle = strokeGradient;
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.restore();
    }
  };

  // Draw starfield animation
  const drawStarfield = (ctx, canvas, frequencies) => {
    const starCount = 200;
    const avgBass = frequencies.slice(0, 10).reduce((a, b) => a + b, 0) / 2550;
    const starSpeed = 0.5 + avgBass * 2;

    // Draw stars
    for (let i = 0; i < starCount; i++) {
      // Create a z-position for pseudo-3D effect
      const z = (i % 100) / 100;
      const speed = starSpeed * (1 - z) * 5;

      // Calculate position based on time
      const progress = ((Date.now() / 1000 * speed) + i) % 1;
      const size = (1 - progress) * 5 * (z + 0.5);

      // Position stars in a circular pattern from center
      const angle = (i / starCount) * Math.PI * 20 + Date.now() / 10000;
      const distance = progress * Math.min(canvas.width, canvas.height) / 1.8;

      const x = canvas.width / 2 + Math.cos(angle) * distance;
      const y = canvas.height / 2 + Math.sin(angle) * distance;

      // Star color based on frequency
      const freqIndex = Math.floor(i / starCount * frequencies.length / 2);
      const freqValue = frequencies[freqIndex] / 255;

      // Create star gradient
      const starGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      starGradient.addColorStop(0, i % 2 === 0 ? dominantColor : secondaryColor);
      starGradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.fillStyle = starGradient;
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();

      // Add trail for some stars
      if (freqValue > 0.7 && i % 5 === 0) {
        ctx.beginPath();
        ctx.strokeStyle = i % 2 === 0 ? `${dominantColor}66` : `${secondaryColor}66`;
        ctx.lineWidth = size / 2;
        ctx.moveTo(x, y);
        ctx.lineTo(
          x - Math.cos(angle) * size * 3,
          y - Math.sin(angle) * size * 3
        );
        ctx.stroke();
      }
    }

    // Add central starburst on beat
    if (beatDetected) {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const burstGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, 150
      );

      burstGradient.addColorStop(0, `${dominantColor}aa`);
      burstGradient.addColorStop(0.5, `${secondaryColor}55`);
      burstGradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.fillStyle = burstGradient;
      ctx.arc(centerX, centerY, 150, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // Handle visualization effect
  useEffect(() => {
    if (isPlaying && analyzer && frequencies && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const visualize = () => {
        if (!isPlaying || !analyzer) {
          return;
        }

        // Make canvas fill the screen
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Get frequency data
        analyzer.getByteFrequencyData(frequencies);

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate average bass frequency for beat detection
        const bassSum = frequencies.slice(0, 10).reduce((a, b) => a + b, 0);
        const bassAvg = bassSum / 10;

        // Beat detection (simple threshold-based)
        const isBeat = bassAvg > 200;
        if (isBeat !== beatDetected) {
          setBeatDetected(isBeat);

          // Change colors on strong beats
          if (isBeat) {
            updateColors();
          }
        }

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Draw selected animation
        switch (selectedAnimation) {
          case 'bars':
            drawCircularBars(ctx, canvas, frequencies, centerX, centerY);
            break;
          case 'waves':
            drawWaveRipples(ctx, canvas, frequencies);
            break;
          case 'particles':
            drawParticleStorm(ctx, canvas, frequencies);
            break;
          case 'spectrum':
            drawSpectrumFlow(ctx, canvas, frequencies);
            break;
          case 'starfield':
            drawStarfield(ctx, canvas, frequencies);
            break;
          default:
            drawCircularBars(ctx, canvas, frequencies, centerX, centerY);
        }

        // Add ambient background particles regardless of animation mode
        if (Math.random() < 0.3) {
          const particleSize = 1 + Math.random() * 3;
          ctx.beginPath();
          ctx.fillStyle = `${Math.random() > 0.5 ? dominantColor : secondaryColor}44`;
          ctx.arc(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            particleSize,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        // Request next frame
        animationRef.current = requestAnimationFrame(visualize);
      };

      visualize();

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [isPlaying, analyzer, frequencies, dominantColor, secondaryColor, beatDetected, selectedAnimation]);

  // Improved folder selection handler that works across different browsers
  const handleFolderSelect = async () => {
    try {
      // Try the modern File System Access API first (Chrome, Edge)
      if ('showDirectoryPicker' in window) {
        const dirHandle = await window.showDirectoryPicker().catch(err => {
          console.error("Directory selection was cancelled or failed:", err);
          return null;
        });

        if (!dirHandle) return;

        const musicFiles = [];

        try {
          for await (const entry of dirHandle.values()) {
            if (entry.kind === 'file') {
              const file = await entry.getFile();
              if (file.type.startsWith('audio/')) {
                musicFiles.push(file);
              }
            }
          }

          if (musicFiles.length > 0) {
            setFiles(musicFiles);
            // Select the first music file automatically
            handleSelectMusic(musicFiles[0]);
          } else {
            alert("No audio files found in the selected folder.");
          }
        } catch (err) {
          console.error("Error reading folder:", err);
          alert("Error reading folder contents. Please try again.");
        }
      } else {
        // Fallback for browsers without File System Access API
        // Trigger the folder input
        folderInputRef.current.click();
      }
    } catch (error) {
      console.error("Error in folder selection:", error);
      // Fallback to input method for any error
      if (folderInputRef.current) {
        folderInputRef.current.click();
      }
    }
  };

  // Handle files when selected through the folder input (fallback method)
  const handleFolderInputChange = (event) => {
    const fileList = event.target.files;
    if (!fileList || fileList.length === 0) return;

    const audioFiles = Array.from(fileList).filter(file => file.type.startsWith('audio/'));

    if (audioFiles.length > 0) {
      setFiles(audioFiles);
      // Select the first music file automatically
      handleSelectMusic(audioFiles[0]);
    } else {
      alert("No audio files found in the selected folder.");
    }

    // Reset the input to allow selecting the same folder again
    event.target.value = null;
  };

  const handleSelectMusic = (file) => {
    if (!file) return;

    // Clean up previous audio URL
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
    }

    const newAudioURL = URL.createObjectURL(file);
    setSelectedFile(file);
    setAudioURL(newAudioURL);
    setShowAnimation(true);

    // Wait briefly before hiding the animation overlay
    setTimeout(() => setShowAnimation(false), 2000);
  };

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            if (!isFullScreen) {
              toggleFullScreen();
            }
          })
          .catch(err => {
            console.error("Play failed:", err);
            alert("Unable to play audio. Please try again.");
          });
      }
    }
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(err => {
          console.error("Fullscreen request failed:", err);
        });
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen();
      }
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullScreen(false);
    }
  };

  // Back button functionality that stops animation and pauses music
  const handleBackToList = () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }

    // Exit fullscreen
    if (isFullScreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullScreen(false);
    }

    // Clean up audio resources
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    // Reset state
    setSelectedFile(null);
    setAudioURL('');
  };

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullScreenChange = () => {
      const isCurrentlyFullScreen =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;

      setIsFullScreen(!!isCurrentlyFullScreen);

      // If exiting fullscreen, pause music
      if (!isCurrentlyFullScreen && isPlaying && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    document.addEventListener('msfullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
      document.removeEventListener('msfullscreenchange', handleFullScreenChange);
    };
  }, [isPlaying]);

  // Template selection popup
  const TemplatePopup = () => {
    if (!showTemplatePopup) return null;

    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black bg-opacity-70"
          onClick={() => setShowTemplatePopup(false)}
        />

        {/* Popup content */}
        <div className="relative z-50 bg-gray-900 rounded-xl p-6 max-w-4xl w-full max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white text-2xl font-bold flex items-center">
              <Layers className="mr-2" />
              Select Animation Design
            </h2>
            <button
              onClick={() => setShowTemplatePopup(false)}
              className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {animationTypes.map((animation) => (
              <AnimationPreviewCard
                key={animation.id}
                animationType={animation}
                inPopup={true}
              />
            ))}
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setShowTemplatePopup(false)}
              className="px-6 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Animation preview card - for the popup
  const AnimationPreviewCard = ({ animationType, inPopup = false }) => {
    const canvasPreviewRef = useRef(null);
    const { id, name, description } = animationType;

    useEffect(() => {
      const canvas = canvasPreviewRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const preview = () => {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Create mock frequency data
        const mockFreq = new Uint8Array(1024);
        for (let i = 0; i < mockFreq.length; i++) {
          const value = Math.sin((i / mockFreq.length) * Math.PI * 2 + Date.now() / 1000) * 0.5 + 0.5;
          mockFreq[i] = value * 255;
        }

        // Draw simplified preview of animation style
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        switch (id) {
          case 'bars':
            // Simplified circular bars preview
            const barCount = 36;
            const barWidth = Math.PI * 2 / barCount;
            const maxRadius = Math.min(canvas.width, canvas.height) * 0.35;

            for (let i = 0; i < barCount; i++) {
              const freqIndex = Math.floor(i * mockFreq.length / barCount);
              const value = mockFreq[freqIndex] / 255;

              const barHeight = maxRadius * value * 0.6;
              const angle = i * barWidth;

              ctx.beginPath();
              ctx.lineWidth = 2 + value * 3;
              ctx.strokeStyle = i % 2 === 0 ? dominantColor : secondaryColor;
              ctx.moveTo(
                centerX + Math.cos(angle) * maxRadius,
                centerY + Math.sin(angle) * maxRadius
              );
              ctx.lineTo(
                centerX + Math.cos(angle) * (maxRadius + barHeight),
                centerY + Math.sin(angle) * (maxRadius + barHeight)
              );
              ctx.stroke();
            }

            // Add center circle
            ctx.beginPath();
            ctx.fillStyle = secondaryColor;
            ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
            ctx.fill();
            break;

          case 'waves':
            // Simplified wave ripples preview
            const waveCount = 3;

            for (let w = 0; w < waveCount; w++) {
              ctx.beginPath();
              ctx.lineWidth = 2;
              ctx.strokeStyle = w % 2 === 0 ? dominantColor : secondaryColor;

              const waveAmplitude = canvas.height * 0.1 * (1 - w / waveCount);
              const waveFrequency = 15 * (w + 1);
              const timeOffset = Date.now() / 1000 * (w + 1);

              ctx.moveTo(0, canvas.height / 2);
              for (let x = 0; x < canvas.width; x += 5) {
                const y = canvas.height / 2 +
                        Math.sin(x / waveFrequency + timeOffset) * waveAmplitude;
                ctx.lineTo(x, y);
              }
              ctx.stroke();
            }

            // Central pulse
            ctx.beginPath();
            ctx.fillStyle = `${dominantColor}88`;
            ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
            ctx.fill();
            break;

          case 'particles':
            // Simplified particle storm preview
            const particleCount = 30;

            for (let i = 0; i < particleCount; i++) {
              const angle = (i / particleCount) * Math.PI * 2;
              const freqIndex = Math.floor(i / particleCount * mockFreq.length / 2);
              const freqValue = mockFreq[freqIndex] / 255;

              const distance = 30 + freqValue * 50 + Math.sin(Date.now() / 1000 + i) * 20;
              const size = 1 + freqValue * 4;

              const x = centerX + Math.cos(angle + Date.now() / 2000) * distance;
              const y = centerY + Math.sin(angle + Date.now() / 1800) * distance;

              ctx.beginPath();
              ctx.fillStyle = i % 2 === 0 ? dominantColor : secondaryColor;
              ctx.arc(x, y, size, 0, Math.PI * 2);
              ctx.fill();
            }

            // Central vortex
            ctx.beginPath();
            ctx.fillStyle = `${secondaryColor}44`;
            ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
            ctx.fill();
            break;

          case 'spectrum':
            // Simplified spectrum preview
            const spectrumBarCount = 15;
            const spectrumBarWidth = canvas.width / spectrumBarCount;
            const barSpacing = 2;

            for (let i = 0; i < spectrumBarCount; i++) {
              const freqIndex = Math.floor(i / spectrumBarCount * mockFreq.length / 2);
              const value = mockFreq[freqIndex] / 255;
              const barHeight = value * canvas.height * 0.6;

              const x = i * spectrumBarWidth;
              const y = canvas.height - barHeight;

              ctx.fillStyle = i % 2 === 0 ? dominantColor : secondaryColor;
              ctx.fillRect(x + barSpacing/2, y, spectrumBarWidth - barSpacing, barHeight);

              // Mirrored reflection (simplified)
              ctx.globalAlpha = 0.3;
              ctx.fillRect(x + barSpacing/2, 0, spectrumBarWidth - barSpacing, barHeight / 3);
              ctx.globalAlpha = 1;
            }
            break;

          case 'starfield':
            // Simplified starfield preview
            const starCount = 40;

            for (let i = 0; i < starCount; i++) {
              const z = (i % 20) / 20;

              const progress = ((Date.now() / 1000) + i) % 1;
              const size = (1 - progress) * 3;

              const angle = (i / starCount) * Math.PI * 20;
              const distance = progress * Math.min(canvas.width, canvas.height) / 2;

              const x = centerX + Math.cos(angle) * distance;
              const y = centerY + Math.sin(angle) * distance;

              ctx.beginPath();
              ctx.fillStyle = i % 2 === 0 ? dominantColor : secondaryColor;
              ctx.arc(x, y, size, 0, Math.PI * 2);
              ctx.fill();
            }

            // Central starburst
            ctx.beginPath();
            ctx.fillStyle = `${dominantColor}44`;
            ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
            ctx.fill();
            break;

          default:
            // Fallback preview
            ctx.fillStyle = dominantColor;
            ctx.fillText("Preview unavailable", centerX - 50, centerY);
        }

        if (inPopup) {
          requestAnimationFrame(preview);
        }
      };

      preview();

      if (inPopup) {
        const previewInterval = requestAnimationFrame(preview);
        return () => cancelAnimationFrame(previewInterval);
      }
    }, [id, inPopup]);

    const handleSelectAnimation = () => {
      setSelectedAnimation(id);
      setShowTemplatePopup(false);
    };

    return (
      <div
        className={`p-4 rounded-xl ${selectedAnimation === id ? 'ring-2 ring-blue-500 bg-gray-800' : 'bg-gray-800 hover:bg-gray-700'} cursor-pointer transition-all overflow-hidden`}
        onClick={handleSelectAnimation}
      >
        <canvas
          ref={canvasPreviewRef}
          width={300}
          height={150}
          className="w-full h-36 rounded-lg bg-black mb-4"
        />

        <div>
          <h3 className="text-white font-medium text-lg mb-1">{name}</h3>
          <p className="text-gray-300 text-sm">{description}</p>
        </div>

        <div className="mt-3 flex justify-end">
          <button
            className={`px-4 py-1 rounded-lg text-sm ${selectedAnimation === id ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`}
            onClick={handleSelectAnimation}
          >
            {selectedAnimation === id ? 'Selected' : 'Select'}
          </button>
        </div>
      </div>
    );
  };

  // Handle next and previous buttons
  const handleNext = () => {
    const currentIndex = files.indexOf(selectedFile);
    if (currentIndex < files.length - 1) {
      handleSelectMusic(files[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const currentIndex = files.indexOf(selectedFile);
    if (currentIndex > 0) {
      handleSelectMusic(files[currentIndex - 1]);
    }
  };

  // Handle timeline change
  const handleTimelineChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Update current time and duration
  useEffect(() => {
    const updateTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
      }
    };

    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Return appropriate UI based on state
  return (
    <div ref={containerRef} className="bg-gray-900 min-h-screen flex flex-col">
      {/* Loading animation overlay */}
      {showAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-24 h-24 rounded-full border-4 border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent animate-spin mx-auto" />
            </div>
            <h2 className="text-white text-xl font-medium mb-2">
              Loading Music Visualizer
            </h2>
            <p className="text-gray-400">
              Preparing your audio experience...
            </p>
          </div>
        </div>
      )}

      {/* File list view */}
      {!selectedFile && (
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center">
              <Music className="mr-3" size={32} />
              Music Visualizer
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Transform your music into stunning visual experiences with our advanced audio visualizer.
              Select music from your device to begin.
            </p>
          </header>

          <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl p-6 shadow-lg">
            {/* Music selection buttons */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <button
                onClick={handleFolderSelect}
                className="flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg shadow transition-all"
              >
                <Folder className="mr-2" />
                Select Music Folder
              </button>

              <button
                onClick={() => fileInputRef.current.click()}
                className="flex-1 flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-lg shadow transition-all"
              >
                <Upload className="mr-2" />
                Upload Music Files
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                multiple
                onChange={handleFolderInputChange}
                className="hidden"
              />

              <input
                ref={folderInputRef}
                type="file"
                webkitdirectory="true"
                directory="true"
                onChange={handleFolderInputChange}
                className="hidden"
              />
            </div>

            {/* File list */}
            {files.length > 0 && (
              <div className="overflow-hidden rounded-lg bg-gray-900">
                <h2 className="text-white text-xl font-semibold px-4 py-3 border-b border-gray-700 flex items-center">
                  <Music className="mr-2" size={20} />
                  Available Tracks ({files.length})
                </h2>

                <div className="max-h-96 overflow-y-auto">
                  {files.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex items-center px-4 py-3 hover:bg-gray-800 border-b border-gray-800 cursor-pointer transition-all"
                      onClick={() => handleSelectMusic(file)}
                    >
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 mr-4">
                        <Music size={18} className="text-blue-400" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate">{file.name}</h3>
                        <p className="text-gray-400 text-sm">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>

                      <button
                        className="ml-4 p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectMusic(file);
                        }}
                      >
                        <Play size={16} className="text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {files.length === 0 && (
              <div className="py-16 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-700 flex items-center justify-center">
                  <Music size={28} className="text-gray-400" />
                </div>
                <p className="text-gray-300 mb-2">No music files selected</p>
                <p className="text-gray-500 text-sm">
                  Select a folder or upload files to get started
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Audio player and visualizer */}
      {selectedFile && (
        <>
          <div className="relative w-full h-screen overflow-hidden">
            {/* Visualizer canvas */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 z-0"
            />

            {/* Audio element */}
            <audio
              ref={audioRef}
              src={audioURL}
              className="hidden"
              onEnded={() => setIsPlaying(false)}
              onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
            />

            {/* Floating controls */}
            <div className="absolute bottom-8 left-0 right-0 z-10">
              <div className="max-w-md mx-auto px-4">
                <div className="bg-gray-900 bg-opacity-80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
                  {/* File info */}
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center">
                      <button
                        onClick={handleBackToList}
                        className="p-2 mr-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                      >
                        <ChevronLeft size={20} className="text-white" />
                      </button>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate">
                          {selectedFile.name}
                        </h3>
                        <p className="text-gray-300 text-sm truncate">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>

                      <button
                        onClick={() => setShowTemplatePopup(true)}
                        className="p-2 ml-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                      >
                        <Layers size={20} className="text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Playback controls */}
                  <div className="flex items-center justify-center p-4">
                    <button
                      onClick={handlePrevious}
                      className="w-10 h-10 rounded-full bg-gray-600 hover:bg-gray-700 flex items-center justify-center transition-colors mr-2"
                    >
                      <ChevronLeft size={20} className="text-white" />
                    </button>
                    <button
                      onClick={togglePlayback}
                      className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors mx-2"
                    >
                      {isPlaying ? (
                        <Pause size={24} className="text-white" />
                      ) : (
                        <Play size={24} className="text-white" />
                      )}
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-10 h-10 rounded-full bg-gray-600 hover:bg-gray-700 flex items-center justify-center transition-colors ml-2"
                    >
                      <ChevronLeft size={20} className="text-white" style={{ transform: 'rotate(180deg)' }} />
                    </button>
                  </div>

                  {/* Timeline */}
                  <div className="px-4 pb-4">
                    <input
                      type="range"
                      min="0"
                      max={duration}
                      value={currentTime}
                      onChange={handleTimelineChange}
                      ref={timelineRef}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      style={{ backgroundSize: `${(currentTime / duration) * 100}% 100%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Animation template popup */}
          <TemplatePopup />
        </>
      )}
    </div>
  );
};

export default MusicVisualizer;
