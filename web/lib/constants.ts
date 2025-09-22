import * as PROTOCOL from "./protocol";

export const DROPDOWN_DELAY = 500;
export const PUBLIC_SRC_PATH = "/"
// 关于
export const ABOUT_US = `
每天我们都在幻想二次元与现实的界限，然而真正让世界不同的，是我们心中对角色的情感与寄托。在这个信息交错、虚拟与现实不断融合的时代里，似乎我们才是活在无数剧情与设定下的“角色”，但每一个角色的存在，都在提醒我们：幻想并非逃避，而是体验。我们期待角色走出屏幕，并不是因为现实缺失，而是因为他们带着我们最纯粹的梦想与热爱。或许有一天，当你回家推开门时，她不再只是屏幕中的光影，而是正站在微风里，带着笑容对你说：“欢迎回来。”
二次元是爱的延伸，而现实是心跳的归宿。角色并不是你生命的全部，但他们让你更加勇敢地去面对这个世界。
愿你携梦前行，所爱皆能触及。
鱼狐灵伴，你将不会孤单。
`;
// 语言选项
export const LANUSAGE_ZH = "中文"
export const LANUSAGE_EN = "English"

// url
export const BUSINESS_COOPERATION_URL = "https://fcn6bk9rfo7w.feishu.cn/share/base/form/shrcnz9vW8cytzL03fG99wHUVXf"
export const JOIN_US_URL = "https://fcn6bk9rfo7w.feishu.cn/share/base/form/shrcncGzzNdCkDzRWBcUFYHb4ff"
export const FEEDBACK_URL = "https://fcn6bk9rfo7w.feishu.cn/share/base/form/shrcn2QSWMxWTvkea9vpmEEP1qd"
// sentio
export const SENTIO_GUIDE_URL = "https://fcn6bk9rfo7w.feishu.cn/docx/AwyIdghIzo5Dg6xpxXYcRZGynf2?from=from_copylink"
export const SENTIO_GITHUB_URL = "https://github.com/Thunder-shadow/awsome-digital-human.git"
export const SENTIO_BACKGROUND_PATH = "sentio/backgrounds/"
export const SENTIO_BACKGROUND_STATIC_PATH = "sentio/backgrounds/static"
export const SENTIO_BACKGROUND_DYNAMIC_PATH = "sentio/backgrounds/dynamic"
export const SENTIO_BACKGROUND_STATIC_IMAGES: string[] = ["夜晚街道.jpg", "赛博朋克.jpg", "火影忍者.jpg", "插画.jpg", "艺术.jpg", "简约.jpg", "抽象.jpg"]
export const SENTIO_BACKGROUND_DYNAMIC_IMAGES: string[] = ["太空站.mp4", "赛博朋克.mp4", "可爱城市.mp4", "悟空.mp4", "火影忍者.mp4", "几何线条.mp4", "公式.mp4"]
export const SENTIO_CHARACTER_PATH = "sentio/characters/"
export const SENTIO_CHARACTER_IP_PATH = "sentio/characters/ip"
export const SENTIO_CHARACTER_FREE_PATH = "sentio/characters/free"
export const SENTIO_CHARACTER_IP_MODELS: string[] = []
export const SENTIO_CHARACTER_FREE_MODELS: string[] = ["HaruGreeter", "Haru", "Kei", "Chitose", "Epsilon", "Hibiki", "Hiyori", "Izumi", "Mao", "Rice", "Shizuku", "Tsumiki"]
export const SENTIO_CHARACTER_DEFAULT = "HaruGreeter"
export const SENTIO_CHARACTER_DEFAULT_PORTRAIT: string = `${SENTIO_CHARACTER_FREE_PATH}/${SENTIO_CHARACTER_DEFAULT}/${SENTIO_CHARACTER_DEFAULT}.png`
export const SENTIO_TTS_PUNC: string[] = ['；', '！', '？', '。', '?']
export const SENTIO_TTS_SENTENCE_LENGTH_MIN = 6
export const SENTIO_RECODER_MIN_TIME: number = 1000 // 1s
export const SENTIO_RECODER_MAX_TIME: number = 30000 // 30s
export const SENTIO_LIPFACTOR_MIN: number = 0.0
export const SENTIO_LIPFACTOR_DEFAULT = 5.0
export const SENTIO_LIPFACTOR_MAX: number = 10.0
export const SENTIO_VOICE_TEST_ZH: string[] = ["今天最浪漫的事就是遇见你。", "你有百般模样，我也会百般喜欢。", "这里什么都好，因为这就是你。"]
export const SENTIO_VOICE_TEST_EN: string[] = ["Someone said you were looking for me?"]
export const SENTIO_CHATMODE_DEFULT = PROTOCOL.CHAT_MODE.DIALOGUE
export const SENTIO_THENE_DEFAULT = PROTOCOL.APP_TYPE.FREEDOM
export interface CharacterPreset {  
  character: string;  
  background: string;  
  backgroundType: 'static' | 'dynamic';  
  difyAgent: {  
    api_server: string;  
    api_key: string;  
    username: string;  
  };  
  ttsConfig: {  
    api_server: string;  
    api_key: string;  
    username: string;  
  };  
}  
  
export const CHARACTER_PRESETS: { [key: string]: CharacterPreset } = {  
  "HaruGreeter": {  
    character: "HaruGreeter",  
    background: "夜晚街道.jpg",  
    backgroundType: "static",  
    difyAgent: {  
      api_server: "http://101.126.22.101/v1",  
      api_key: "app-ZxafS6AuY9N2M35ubj9CkMdD",  
      username: "HaruUser"  
    },  
    ttsConfig: {  
      api_server: "http://101.126.22.101/v1",  
      api_key: "app-ZxafS6AuY9N2M35ubj9CkMdD",  
      username: "HaruUser"  
    }  
  },  
  "Chitose": {  
    character: "Chitose",  
    background: "赛博朋克.jpg",  
    backgroundType: "static",  
    difyAgent: {  
      api_server: "http://101.126.22.101/v1",  
      api_key: "app-ZxafS6AuY9N2M35ubj9CkMdD",  
      username: "ChitoseUser"  
    },  
    ttsConfig: {  
      api_server: "http://101.126.22.101/v1",  
      api_key: "app-ZxafS6AuY9N2M35ubj9CkMdD",  
      username: "HaruUser"  
    }  
  },  
  "Shizuku": {  
    character: "Shizuku",  
    background: "插画.jpg",  
    backgroundType: "static",  
    difyAgent: {  
      api_server: "http://101.126.22.101/v1",  
      api_key: "app-ZxafS6AuY9N2M35ubj9CkMdD",  
      username: "ShizukuUser"  
    },  
    ttsConfig: {  
      api_server: "http://101.126.22.101/v1",  
      api_key: "app-ZxafS6AuY9N2M35ubj9CkMdD",  
      username: "HaruUser"  
    }  
  }
};