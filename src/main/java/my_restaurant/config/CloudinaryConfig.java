package my_restaurant.config;

import com.cloudinary.Cloudinary;

import io.github.cdimascio.dotenv.Dotenv;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {

    private final String CLOUD_NAME;
    private final String API_KEY;
    private final String API_SECRET;

    public CloudinaryConfig() {
        if (System.getenv("CLOUDINARY_NAME") != null) {
            CLOUD_NAME = System.getenv("CLOUDINARY_NAME");
            API_KEY = System.getenv("CLOUDINARY_API_KEY");
            API_SECRET = System.getenv("CLOUDINARY_API_SECRET");
        } else {
            Dotenv dotenv = Dotenv.load();
            CLOUD_NAME = dotenv.get("CLOUDINARY_NAME");
            API_KEY = dotenv.get("CLOUDINARY_API_KEY");
            API_SECRET = dotenv.get("CLOUDINARY_API_SECRET");
        }
    }

    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", CLOUD_NAME);
        config.put("api_key", API_KEY);
        config.put("api_secret", API_SECRET);

        return new Cloudinary(config);
    }

    public Object uploader() {
        return null;
    }
}