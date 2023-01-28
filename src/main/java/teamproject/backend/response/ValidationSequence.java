package teamproject.backend.response;

import javax.validation.GroupSequence;
import javax.validation.groups.Default;

import static teamproject.backend.response.ValidationGroup.*;

@GroupSequence({Default.class, NotBlankGroup.class,  EmailGroup.class, PatternGroup.class, NotNullGroup.class})
public interface ValidationSequence {
}
