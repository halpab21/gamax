module com.syntherfull.syntherfull {
    requires javafx.controls;
    requires javafx.fxml;
    requires jxbrowser;
    requires jxbrowser.javafx;
    requires spring.boot;
    requires spring.boot.autoconfigure;


    // Spring Boot + Core
    requires spring.context;
    requires java.desktop;
    requires jsyn;

    requires java.sql;
    requires spring.web;
    requires spring.beans;
    requires org.apache.tomcat.embed.core;
    requires java.scripting;

    exports synth;

    // Exportiere dein Package, damit andere Module die public-API sehen
    exports spring;

    // Öffne dein Package für Reflection (Spring verwendet tiefe Reflection)
    opens spring to
            spring.beans,
            spring.context,
            spring.core,
            spring.boot,
            spring.boot.autoconfigure;


    opens window to javafx.fxml;
    exports window;
    opens synth to spring.beans, spring.boot, spring.boot.autoconfigure, spring.context, spring.core;
}