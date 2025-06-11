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

        try {
            // 🔁 Command to run
            ProcessBuilder pb = new ProcessBuilder("npm", "run", "dev");

            // 📍 Set the working directory to your frontend project
            pb.directory(new File("..../frontend"));

            // 🔊 Merge error stream with output
            pb.redirectErrorStream(true);

            // 🚀 Start the process
            Process process = pb.start();

            // 📥 Read output from the process
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;

            while ((line = reader.readLine()) != null) {
                System.out.println(line);  // Echo the terminal output
            }

            // 🧨 Wait for it to end (optional for dev servers)
            int exitCode = process.waitFor();
            System.out.println("Process exited with code " + exitCode);

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }

        HelloApplication.setContext(context);
        Application.launch(HelloApplication.class, args);
    }
}
