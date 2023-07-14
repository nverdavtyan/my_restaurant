package my_restaurant.config;

import com.cloudinary.Cloudinary;

import io.github.cdimascio.dotenv.Dotenv;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {

    Dotenv dotenv = Dotenv.load();
    String dbName = dotenv.get("CLOUDINARY_NAME");
    String dbKey = dotenv.get("CLOUDINARY_API_KEY");
    String dbSecret = dotenv.get("CLOUDINARY_API_SECRET");

    private final String CLOUD_NAME = dbName;
    private final String API_KEY = dbKey;
    private final String API_SECRET = dbSecret;

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