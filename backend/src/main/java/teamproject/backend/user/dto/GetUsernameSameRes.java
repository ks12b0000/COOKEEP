package teamproject.backend.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GetUsernameSameRes {

    @JsonProperty("isDuplicate")
    private boolean duplicate; // false = 중복 X, 예외 터지면 = 중복 O
}
