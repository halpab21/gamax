package window;

import org.springframework.context.ConfigurableApplicationContext;
import synth.MainSynth;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.layout.StackPane;
import javafx.scene.input.KeyEvent;
import javafx.stage.Stage;
import com.teamdev.jxbrowser.browser.Browser;
import com.teamdev.jxbrowser.engine.Engine;
import com.teamdev.jxbrowser.engine.EngineOptions;
import com.teamdev.jxbrowser.engine.RenderingMode;
import com.teamdev.jxbrowser.view.javafx.BrowserView;

public class HelloApplication extends Application {

    private MainSynth mainSynth;

    private static ConfigurableApplicationContext context;

    @Override
    public void start(Stage stage) throws Exception {
        mainSynth = context.getBean(MainSynth.class);
        /*AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(SynthConfig.class);

        MainSynth mainSynth = context.getBean(MainSynth.class);
        System.out.println(Arrays.stream(context.getBeanDefinitionNames()).toList());*/

        // Set up JxBrowser Engine

        EngineOptions options = EngineOptions.newBuilder(RenderingMode.HARDWARE_ACCELERATED)
                .licenseKey("3GC4U6A49ZY14FRR0X8DUJBD40XTLLTPYEFK8D66XVUU2ILLQBP5R1XUYGIB4KE48NV0H0KWXOWSFGCTTTAN0KCENN6NKBR9V79TAIR98FQB4ZMSNN2DU8M2LSY1VVA6R5NA55RNL7U86IG0")  // Ensure to secure your license key
                .build();

        Engine engine = Engine.newInstance(options);
        Browser browser = engine.newBrowser();
        browser.navigation().loadUrl("http://localhost:5173/");

        // Set up JavaFX layout
        BrowserView browserView = BrowserView.newInstance(browser);
        StackPane stackPane = new StackPane(browserView);
        Scene scene = new Scene(stackPane, 640, 480);

        // Handle key events for the synth
        scene.addEventFilter(KeyEvent.KEY_PRESSED, event -> {
            mainSynth.handleKeyPress(event.getCode());
            System.out.println("Key Pressed: " + event.getCode());  // Log key press
        });
        scene.addEventFilter(KeyEvent.KEY_RELEASED, event -> {
            mainSynth.handleKeyRelease(event.getCode());
            System.out.println("Key Released: " + event.getCode());  // Log key release
        });

        // Initialize and start the synth
        mainSynth.setup();
        mainSynth.start();

        // Set up the stage
        stage.setTitle("Gamax");
        stage.setResizable(true);
        stage.setScene(scene);
        stage.show();
    }

    public static void setContext(ConfigurableApplicationContext ctx) {
        context = ctx;
    }

    @Override
    public void stop() {
        if (mainSynth != null) {
            mainSynth.stop(); // Stop the synth when the application closes
        }
    }

    public static void main(String[] args) {
        launch(args); // Launch the JavaFX application
    }
}
