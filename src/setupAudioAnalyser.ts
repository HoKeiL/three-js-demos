import { Audio, AudioLoader, AudioListener, AudioAnalyser, PerspectiveCamera } from "three";

interface AudioAnalysisOptions { numBands: 16 | 32 | 64 | 128 }
export function setupAudioAnalyser(camera: PerspectiveCamera, options: AudioAnalysisOptions): AudioAnalyser {

    // create an AudioListener and add it to the camera
    const listener = new AudioListener();
    camera.add(listener);

    // create an Audio source
    const sound = new Audio(listener);


    // Load a sound and set it as the Audio object's buffer
    const audioLoader = new AudioLoader();
    audioLoader.load('assets/138142__nenadsimic__tight-beat-95bpm.wav', function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
        sound.play();
    });

    // create an AudioAnalyser, passing in the sound and desired fftSize
    const analyser = new AudioAnalyser(sound, options.numBands);
    return analyser;
    // get the average frequency of the sound
    // const data = analyser.getAverageFrequency();
}