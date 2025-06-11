package synth;

import com.jsyn.JSyn;
import com.jsyn.Synthesizer;
import com.jsyn.data.SegmentedEnvelope;
import com.jsyn.unitgen.*;
import javafx.scene.input.KeyCode;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class MainSynth {
    private Synthesizer synth;
    private LineOut lineOut;
    private Add mixer;
    private final Map<KeyCode, UnitOscillator> activeOscillators = new HashMap<KeyCode, UnitOscillator>();
    private final Map<KeyCode, VariableRateMonoReader> activeEnvelopes = new HashMap<KeyCode, VariableRateMonoReader>();
    private int baseOctave = 4;
    private final double MAX_AMPLITUDE = 0.5;
    private OscillatorType currentOscillatorType = OscillatorType.SINE;

    private double attack = 0.01; // Default values
    private double decay = 0.1;
    private double sustain = 0.7;
    private double release = 0.3;

    public enum OscillatorType {
        SINE, SAW, SQUARE
    }

    public MainSynth() {
        System.out.println("MainSynth created: " + this);
    }

    public void setup() {
        synth = JSyn.createSynthesizer();
        lineOut = new LineOut();
        mixer = new Add();

        synth.add(mixer);
        synth.add(lineOut);

        mixer.output.connect(0, lineOut.input, 0);
        mixer.output.connect(0, lineOut.input, 1);
    }

    public void start() {
        synth.start();
        lineOut.start();
    }

    public void stop() {
        synth.stop();
    }

    private double midiToFrequency(int midiNote) {
        return 440.0 * Math.pow(2, (midiNote - 69) / 12.0);
    }

    public void handleKeyPress(KeyCode keyCode) {
        // Handle key press logic here
        int midiNote = getMidiNoteForKey(keyCode);

        if (keyCode == KeyCode.TAB) {
            switchOscillatorType();
            return;
        }

        if (midiNote != -1 && !activeOscillators.containsKey(keyCode)) {
            double frequency = midiToFrequency(midiNote);
            UnitOscillator osc = createOscillator(frequency);
            osc.amplitude.set(0); // Controlled by envelope

            VariableRateMonoReader env = new VariableRateMonoReader();
            // Use current ADSR values
            SegmentedEnvelope attackDecaySustain = new SegmentedEnvelope(new double[]{
                    attack, 1.0,  // Attack to 1.0
                    decay, sustain   // Decay to sustain level
            });
            attackDecaySustain.setSustainBegin(1);
            attackDecaySustain.setSustainEnd(1);

            env.output.connect(osc.amplitude);

            synth.add(env);
            env.dataQueue.queueOn(attackDecaySustain);

            synth.add(osc);
            osc.output.connect(mixer.inputA);
            osc.start();

            activeOscillators.put(keyCode, osc);
            activeEnvelopes.put(keyCode, env);
            adjustOscillatorAmplitude();
        }
    }

    public void handleKeyRelease(KeyCode keyCode) {
        // Handle key release logic here
        VariableRateMonoReader env = activeEnvelopes.remove(keyCode);
        if (env != null) {
            // Release phase
            double[] releaseData = {release, 0.0}; // Fade to 0
            SegmentedEnvelope releaseSegment = new SegmentedEnvelope(releaseData);
            env.dataQueue.queue(releaseSegment);
        }

        UnitOscillator osc = activeOscillators.remove(keyCode);
        if (osc != null) {
            new Thread(() -> {
                try {
                    Thread.sleep(300); // Wait for release phase
                    synth.remove(osc);
                    adjustOscillatorAmplitude(); // Recalculate the amplitude
                } catch (InterruptedException ignored) {}
            }).start();
        }
    }

    private void adjustOscillatorAmplitude() {
        double total = activeOscillators.size();
        double scale = Math.min(MAX_AMPLITUDE / total, 1.0);
        for (UnitOscillator osc : activeOscillators.values()) {
            osc.amplitude.set(scale);
        }
    }

    private UnitOscillator createOscillator(double frequency) {
        UnitOscillator osc = null;
        switch (currentOscillatorType) {
            case SAW:
                osc = new SawtoothOscillator();
                break;
            case SQUARE:
                osc = new SquareOscillator();
                break;
            case SINE:
            default:
                osc = new SineOscillator();
                break;
        }
        osc.frequency.set(frequency);
        return osc;
    }

    public void switchOscillatorType() {
        switch (currentOscillatorType) {
            case SINE -> {
                currentOscillatorType = OscillatorType.SAW;
                System.out.println("Switching to Sawtooth Oscillator");
            }
            case SAW -> {
                currentOscillatorType = OscillatorType.SQUARE;
                System.out.println("Switching to Square Oscillator");
            }
            case SQUARE -> {
                currentOscillatorType = OscillatorType.SINE;
                System.out.println("Switching to Sine Oscillator");
            }
        }
    }

    public void updateEnvelope(double attack, double decay, double sustain, double release) {
        this.attack = attack;
        this.decay = decay;
        this.sustain = sustain;
        this.release = release;
        System.out.println("Envelope updated: Attack = " + attack + ", Decay = " + decay + ", Sustain = " + sustain + ", Release = " + release);
    }

    private int getMidiNoteForKey(KeyCode keyCode) {
        int baseNote = baseOctave * 12;
        return switch (keyCode) {
            case Q       -> baseNote + 0;   // C
            case DIGIT2  -> baseNote + 1;   // C#
            case W       -> baseNote + 2;   // D
            case DIGIT3  -> baseNote + 3;   // D#
            case E       -> baseNote + 4;   // E
            case R       -> baseNote + 5;   // F
            case DIGIT5  -> baseNote + 6;   // F#
            case T       -> baseNote + 7;   // G
            case DIGIT6  -> baseNote + 8;   // G#
            case Z       -> baseNote + 9;   // A
            case DIGIT7  -> baseNote + 10;  // A#
            case U       -> baseNote + 11;  // B
            case I       -> baseNote + 12;  // C (next octave)
            case DIGIT9  -> baseNote + 13;  // C#
            case O       -> baseNote + 14;  // D
            case DIGIT0  -> baseNote + 15;  // D#
            case P       -> baseNote + 16;  // E
            case A       -> baseNote + 17;  // F
            case Y       -> baseNote + 18;  // F#
            case S       -> baseNote + 19;  // G
            case X       -> baseNote + 20;  // G#
            case D       -> baseNote + 21;  // A
            case C       -> baseNote + 22;  // A#
            case F       -> baseNote + 23;  // B
            case V       -> baseNote + 24;  // C
            case B       -> baseNote + 25;  // C#
            case H       -> baseNote + 26;  // D
            case N       -> baseNote + 27;  // D#
            case J       -> baseNote + 28;  // E
            case M       -> baseNote + 29;  // F
            case COMMA   -> baseNote + 30;  // F#
            case L       -> baseNote + 31;  // G
            default      -> -1;
        };
    }
}
