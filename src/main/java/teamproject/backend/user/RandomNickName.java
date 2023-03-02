package teamproject.backend.user;

import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Map;

public final class RandomNickName {
    private static final String URL = "https://nickname.hwanmoo.kr";


    public static String get(int length) {
        String parameter = "?format=json&count=" + length;

        try {
            URL url = new URL(URL + "/" + parameter);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-Type", "application/json");

            int responseCode = conn.getResponseCode();
            if (responseCode != 200) {
                System.out.println(responseCode + " error ");
            } else {
                BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                StringBuilder sb = new StringBuilder();
                while (br.ready()) {
                    sb.append(br.readLine());
                }
                Gson gson = new Gson();
                Map<String, Object> map = gson.fromJson(sb.toString(), Map.class);
                List<String> list = (List<String>) map.get("words");
                return list.get(0);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return null;
}
}
