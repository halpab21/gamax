package spring;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import synth.MainSynth;

@Configuration(proxyBeanMethods = false)
public class SynthConfig {

    @Bean
    public MainSynth mainSynth() {
        // Create and return the MainSynth instance
        return new MainSynth();
    }
}
