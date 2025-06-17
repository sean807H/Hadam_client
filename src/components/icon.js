import { ReactComponent as CalendarIcon } from "../assets/calendar.svg";
import { ReactComponent as HomeIcon } from "../assets/home.svg";
import { ReactComponent as DiaryIcon } from "../assets/diary.svg";
import { ReactComponent as MyIcon } from "../assets/user.svg";
import { ReactComponent as CommunityIcon } from "../assets/community.svg";

import { ReactComponent as CalendarIconSelected } from "../assets/calendar_cg.svg";
import { ReactComponent as HomeIconSelected } from "../assets/home_cg.svg";
import { ReactComponent as DiaryIconSelected } from "../assets/diary_cg.svg";
import { ReactComponent as MyIconSelected } from "../assets/user_cg.svg";
import { ReactComponent as CommunityIconSelected } from "../assets/community_cg.svg";

export const icon = {
  calendar: {
    default: CalendarIcon,
    selected: CalendarIconSelected,
  },
  home: {
    default: HomeIcon,
    selected: HomeIconSelected,
  },
  diary: {
    default: DiaryIcon,
    selected: DiaryIconSelected,
  },
  my: {
    default: MyIcon,
    selected: MyIconSelected,
  },
  community: {
    default: CommunityIcon,
    selected: CommunityIconSelected,
  },
};