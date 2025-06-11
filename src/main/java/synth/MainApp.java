package synth;

import javafx.application.Application;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ConfigurableApplicationContext;
import window.HelloApplication;


@SpringBootApplication(scanBasePackages = {"spring", "synth", "window"})
public class MainApp {
    public static void main(String[] args) {
        ConfigurableApplicationContext context =
                new SpringApplicationBuilder(MainApp.class).run(args);

        HelloApplication.setContext(context);
        Application.launch(HelloApplication.class, args);
    }
}
