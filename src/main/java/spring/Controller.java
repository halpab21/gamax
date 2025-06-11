package spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import synth.MainSynth;

@RestController
@RequestMapping("/")
public class Controller {
    private final MainSynth mainSynth;

    @Autowired
    public Controller(MainSynth mainSynth) {
        this.mainSynth = mainSynth;
    }

    @GetMapping("/changeWaveType")
    public String changeWaveType() {
        mainSynth.switchOscillatorType(); // Switch the oscillator type
        return "Changed Wave Type";
    }

    @GetMapping("/update-envelope")
    public String updateEnvelope(
            @RequestParam double attack,
            @RequestParam double decay,
            @RequestParam double sustain,
            @RequestParam double release) {

        mainSynth.updateEnvelope(attack, decay, sustain, release);

        return String.format("Envelope updated: Attack = %.2f, Decay = %.2f, Sustain = %.2f, Release = %.2f", attack, decay, sustain, release);
    }
}
